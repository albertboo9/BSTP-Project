// src/services/ai/mockAdapter.js
// Simule le backend IA avec latence réaliste + taux d'échec configurable

import { matchmakingFixture } from './mock/fixtures/smartMatchmaking.fixture';
import { maturityRadarFixture } from './mock/fixtures/maturityRadar.fixture';
import { legalAssistantFixture } from './mock/fixtures/legalAssistant.fixture';
import { chatbotFixture } from './mock/fixtures/chatbot.fixture';

const MOCK_ERROR_RATE = 0.05; // 5% d'échec pour tester le fallback

function randomLatency(min = 600, max = 1800) {
  return new Promise(r => setTimeout(r, min + Math.random() * (max - min)));
}

const FIXTURES = {
  smart_matchmaking: matchmakingFixture,
  maturity_radar: maturityRadarFixture,
  legal_assistant: legalAssistantFixture,
  chatbot: chatbotFixture,
  doc_ocr: { typeDocumentDetecte: 'RCCM', champsExtraits: { numeroRCCM: 'RC/DLA/2021/B/4421', raisonSociale: 'EXEMPLE SARL', dateEmission: '2021-03-15', dateExpiration: null }, niveauConfianceOCR: 0.94, lisibiliteDocument: 'bonne' },
  audio_transcription: { transcription: 'Visite du site effectuée ce jour, installations conformes HSQE.', langueDetectee: 'fr', niveauConfianceTranscription: 0.92 },
};

export async function mockCall(feature, payload) {
  await randomLatency();

  if (Math.random() < MOCK_ERROR_RATE) {
    return {
      requestId: `mock-err-${Date.now()}`,
      success: false,
      modelUsed: null,
      latencyMs: 800,
      data: null,
      error: { code: 'MODEL_UNAVAILABLE', message: 'Service IA temporairement indisponible (mode démo).' },
    };
  }

  return {
    requestId: `mock-${Date.now()}`,
    success: true,
    modelUsed: feature === 'smart_matchmaking' ? 'qwen' : feature === 'maturity_radar' ? 'kimi' : 'llama',
    latencyMs: Math.round(600 + Math.random() * 1200),
    data: FIXTURES[feature] || {},
    error: null,
  };
}
