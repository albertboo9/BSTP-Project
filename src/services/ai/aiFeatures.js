// src/services/ai/features/smartMatchmaking.service.js
import { callAI } from './aiGateway';

/**
 * @param {{ opportunity: object, candidats: object[] }} payload
 */
export function runSmartMatchmaking(payload) {
  return callAI('smart_matchmaking', payload);
}

// src/services/ai/features/maturityRadar.service.js (exported below for single file convenience)
export function runMaturityRadar(payload) {
  return callAI('maturity_radar', payload);
}

// src/services/ai/features/legalAssistant.service.js
export function runLegalAssistant(texteContrat) {
  return callAI('legal_assistant', { texteContrat });
}

// src/services/ai/features/chatbot.service.js
export function sendChatMessage({ sessionId, profilUtilisateur, historique, nouveauMessage }) {
  return callAI('chatbot', { sessionId, profilUtilisateur, historique: historique.slice(-10), nouveauMessage });
}

// src/services/ai/features/docOcr.service.js
export function runDocOCR({ typeDocumentAttendu, fichierBase64, mimeType, tailleOctets }) {
  return callAI('doc_ocr', { typeDocumentAttendu, fichierBase64, mimeType, tailleOctets });
}

// src/services/ai/features/audioTranscription.service.js
export function runAudioTranscription({ fichierAudioBase64, mimeType, dureeSecondes, contexteUsage }) {
  return callAI('audio_transcription', { fichierAudioBase64, mimeType, dureeSecondes, contexteUsage });
}
