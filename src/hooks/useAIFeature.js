// src/hooks/useAIFeature.js
// Hook générique pour les appels IA "one-shot"
import { useState, useCallback } from 'react';

export function useAIFeature(serviceFunction) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  const execute = useCallback(async (payload) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setIsFallback(false);
    try {
      const result = await serviceFunction(payload);
      if (result.success) {
        setData(result.data);
        setIsFallback(!!result._fallback);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError({ code: 'INTERNAL_ERROR', message: err.message });
    } finally {
      setIsLoading(false);
    }
    return null;
  }, [serviceFunction]);

  return { data, isLoading, error, isFallback, execute };
}
