// src/services/ai/aiGateway.js
// Point d'entrée UNIQUE pour tous les appels IA
// Routes validées par tests live le 2026-07-03

import { AI_CONFIG } from './config';
import { mockCall } from './mockAdapter';

let idCounter = 0;
function genRequestId() {
  return `req_${Date.now()}_${++idCounter}`;
}

// Mapping feature → route réelle (validé par tests Postman/curl)
const ROUTE_MAP = {
  chat:              '/api/chat',
  voice:             '/api/voice',
  document_audit:    '/api/document-audit',
  matchmaking:       '/api/features/matchmaking',
  maturity_radar:    '/api/features/maturity-radar',
  legal_assistant:   '/api/features/legal-assistant',
  // aliases
  chatbot:           '/api/chat',
  smart_matchmaking: '/api/features/matchmaking',
  doc_ocr:           '/api/document-audit',
  audio_transcription: '/api/voice',
};

async function realCall(feature, payload) {
  const route = ROUTE_MAP[feature] || `/api/features/${feature.replace(/_/g, '-')}`;
  const url = `${AI_CONFIG.baseUrl}${route}`;

  const timeoutKey = feature.includes('voice') || feature.includes('audio') || feature.includes('doc')
    ? 'file'
    : feature.includes('chat')
      ? 'chatbot'
      : 'default';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_CONFIG.timeouts[timeoutKey]);

  try {
    let fetchOptions;

    // Les routes voice et document-audit acceptent form-data (fichier)
    if (feature === 'voice' || feature === 'audio_transcription') {
      // payload doit être un FormData
      fetchOptions = {
        method: 'POST',
        body: payload instanceof FormData ? payload : (() => {
          const fd = new FormData();
          if (payload.file) fd.append('file', payload.file);
          return fd;
        })(),
        signal: controller.signal,
      };
    } else if (feature === 'document_audit' || feature === 'doc_ocr') {
      fetchOptions = {
        method: 'POST',
        body: payload instanceof FormData ? payload : (() => {
          const fd = new FormData();
          if (payload.file) fd.append('file', payload.file);
          if (payload.document_type) fd.append('document_type', payload.document_type);
          return fd;
        })(),
        signal: controller.signal,
      };
    } else {
      fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: genRequestId(),
          feature,
          locale: 'fr',
          payload,
        }),
        signal: controller.signal,
      };
    }

    const res = await fetch(url, fetchOptions);
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const json = await res.json();
    // Normalise la réponse en enveloppe standard
    return { requestId: genRequestId(), success: true, modelUsed: 'groq', latencyMs: 0, data: json, error: null };
  } catch (err) {
    clearTimeout(timer);
    const code = err.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR';
    return { requestId: genRequestId(), success: false, modelUsed: null, latencyMs: 0, data: null, error: { code, message: err.message } };
  }
}

export async function callAI(feature, payload) {
  if (AI_CONFIG.mode === 'mock') {
    return mockCall(feature, payload);
  }

  const result = await realCall(feature, payload);

  // Auto-retry once on transient errors
  if (!result.success && (result.error?.code === 'TIMEOUT' || result.error?.code === 'NETWORK_ERROR')) {
    const retry = await realCall(feature, payload);
    if (!retry.success) {
      const fallback = await mockCall(feature, payload);
      return { ...fallback, _fallback: true };
    }
    return retry;
  }

  return result;
}
