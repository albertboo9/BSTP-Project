// src/hooks/useAIFeature.js
// Hook générique pour les appels IA "one-shot"
import { useState, useCallback } from 'react';

export function useAIFeature(serviceFunction) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const execute = useCallback(async (payload) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setIsFallback(false);
    setShowResult(false);
    try {
      const result = await serviceFunction(payload);
      if (result.success) {
        setData(result.data);
        setIsFallback(!!result._fallback);
        setShowResult(true);
      } else {
        setError(result.error);
        setShowResult(true);
      }
    } catch (err) {
      setError({ code: 'INTERNAL_ERROR', message: err.message });
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
    return null;
  }, [serviceFunction]);

  const closeResult = useCallback(() => setShowResult(false), []);

  return { data, isLoading, error, isFallback, showResult, closeResult, execute };
}
