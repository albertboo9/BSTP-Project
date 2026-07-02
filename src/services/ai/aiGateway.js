// src/services/ai/aiGateway.js
// Point d'entrée UNIQUE pour tous les appels IA — jamais importé directement par les composants
import { AI_CONFIG } from './config';
import { mockCall } from './mockAdapter';

let idCounter = 0;
function genRequestId() {
  return `req_${Date.now()}_${++idCounter}`;
}

async function realCall(feature, payload) {
  const controller = new AbortController();
  const timeoutKey = feature === 'chatbot' ? 'chatbot' : (feature === 'doc_ocr' || feature === 'audio_transcription') ? 'file' : 'default';
  const timeout = setTimeout(() => controller.abort(), AI_CONFIG.timeouts[timeoutKey]);

  try {
    const res = await fetch(`${AI_CONFIG.baseUrl}/api/features/${feature.replace('_', '-')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId: genRequestId(), feature, locale: 'fr', payload }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timeout);
    const code = err.name === 'AbortError' ? 'TIMEOUT' : 'INTERNAL_ERROR';
    return { requestId: genRequestId(), success: false, modelUsed: null, latencyMs: 0, data: null, error: { code, message: err.message } };
  }
}

export async function callAI(feature, payload) {
  if (AI_CONFIG.mode === 'mock') {
    return mockCall(feature, payload);
  }

  const result = await realCall(feature, payload);

  // Auto-retry on TIMEOUT or MODEL_UNAVAILABLE (once)
  if (!result.success && (result.error?.code === 'TIMEOUT' || result.error?.code === 'MODEL_UNAVAILABLE')) {
    const retry = await realCall(feature, payload);
    if (!retry.success) {
      // Graceful fallback to mock
      const fallback = await mockCall(feature, payload);
      return { ...fallback, _fallback: true };
    }
    return retry;
  }

  return result;
}
