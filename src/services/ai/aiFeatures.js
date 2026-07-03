// src/services/ai/aiFeatures.js
// Fonctions haut-niveau — wrappent callAI avec les bons payloads/parseurs
// Aligné avec les réponses réelles validées par tests live (2026-07-03)
import { callAI } from './aiGateway';

/**
 * Matchmaking B2B
 * Entrée : { opportunity: {...}, candidats: [...] }
 * Sortie normalisée : { opportunityId, classement: [{ pmeId, scorePertinence, justification }] }
 */
export async function runSmartMatchmaking(payload) {
  const result = await callAI('matchmaking', payload);
  // La vraie API renvoie directement { opportunityId, classement }
  if (result.success && result.data) {
    return { ...result, data: result.data };
  }
  return result;
}

/**
 * Radar de maturité PME
 * Entrée : { pmeId, autoEvaluation: { Gouvernance, Production_Qualite, ... }, documentsDejaFournis }
 * Sortie normalisée : { pmeId, axesFaibles, ecartsIdentifies, diagnostique }
 */
export async function runMaturityRadar(payload) {
  const result = await callAI('maturity_radar', payload);
  if (result.success && result.data) {
    // La vraie API renvoie les données dans result.data.payload (mirror du body)
    // On normalise pour les composants
    const raw = result.data;
    const ecartsIdentifies = raw.payload?.ecartsIdentifies || raw.ecartsIdentifies || [];
    const axesFaibles = ecartsIdentifies.map(e => e.axe);
    const diagnostique = raw.diagnostique || {
      constats: ecartsIdentifies.map(e => e.constat).join(' '),
      recommandations: ecartsIdentifies.map(e => e.recommandation),
      referencesLegales: ecartsIdentifies.map(e => e.referenceNormative).filter(Boolean),
    };
    return {
      ...result,
      data: {
        pmeId: raw.payload?.pmeId || payload.pmeId,
        axesFaibles,
        ecartsIdentifies,
        diagnostique,
        autoEvaluation: payload.autoEvaluation,
      },
    };
  }
  return result;
}

/**
 * Assistant Juridique OHADA
 * Entrée : texteContrat (string)
 * Sortie : { syntheseGlobale, clausesRisque: [{ extraitCourt, niveauRisque, explication, articleReference }] }
 */
export async function runLegalAssistant(texteContrat) {
  return callAI('legal_assistant', { texteContrat });
}

/**
 * Chat texte
 * Entrée : { message, historique }
 * Sortie : { responseId, reply, status }
 */
export async function sendChatMessage({ message, historique = [] }) {
  const result = await callAI('chat', { message, historique: historique.slice(-10) });
  if (result.success && result.data) {
    return {
      ...result,
      data: {
        reply: result.data.reply || result.data.response || '',
        status: result.data.status || 'success',
      },
    };
  }
  return result;
}

/**
 * Audit visuel de document (OCR)
 * Entrée : { file: File, document_type: string }
 * Sortie : { is_valid, extracted_info, compliance_report }
 */
export async function runDocumentAudit({ file, document_type }) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('document_type', document_type || 'rccm');
  return callAI('document_audit', fd);
}

/**
 * Transcription vocale (Whisper)
 * Entrée : { file: Blob/File }
 * Sortie : { user_said, ai_response }
 */
export async function runVoiceChat(file) {
  const fd = new FormData();
  fd.append('file', file, 'recording.webm');
  return callAI('voice', fd);
}
