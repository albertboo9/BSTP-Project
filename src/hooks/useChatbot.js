// src/hooks/useChatbot.js
// Hook dédié chatbot — gère l'historique + état de conversation
import { useState, useCallback, useRef } from 'react';
import { sendChatMessage } from '../services/ai/aiFeatures';

export function useChatbot(profilUtilisateur = 'PME') {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Bonjour ! Je suis l'assistant **BSTPKIT CM**. Je peux vous aider avec vos démarches de certification, les appels d'offres, les formations ou toute question sur la plateforme. Comment puis-je vous aider ?`,
      suggestedAction: null,
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const sessionId = useRef(`session_${Date.now()}`);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = { id: `u_${Date.now()}`, role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const historique = messages
      .filter(m => m.id !== 'welcome')
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const result = await sendChatMessage({
        sessionId: sessionId.current,
        profilUtilisateur,
        historique,
        nouveauMessage: text,
      });

      const data = result.success ? result.data : null;
      const assistantMsg = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: data?.reponse || "Je rencontre une difficulté technique. Veuillez réessayer dans un instant.",
        suggestedAction: data?.suggestedAction || null,
        timestamp: new Date(),
        isError: !result.success,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: "Une erreur est survenue. Je ne suis pas disponible pour le moment.",
        isError: true,
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, profilUtilisateur]);

  const clearHistory = useCallback(() => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: "Conversation réinitialisée. Comment puis-je vous aider ?",
      suggestedAction: null,
      timestamp: new Date(),
    }]);
  }, []);

  return { messages, isTyping, sendMessage, clearHistory };
}
