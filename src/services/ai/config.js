// src/services/ai/config.js
export const AI_CONFIG = {
  mode: import.meta.env.VITE_AI_MODE || 'mock', // 'real' | 'mock'
  baseUrl: import.meta.env.VITE_AI_GATEWAY_URL || 'https://bstp-readme.hf.space',
  timeouts: {
    default: 8000,     // one-shot features
    chatbot: 12000,    // conversation
    file: 15000,       // OCR + audio
  },
  maxRetries: 1,
};
