import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useChatbot } from "../../hooks/useChatbot";
import { runAudioTranscription } from "../../services/ai/aiFeatures";
import { MessageSquare, Send, Mic, MicOff, X, Sparkles, ChevronRight, Loader2, StopCircle } from "lucide-react";

export default function Assistant() {
  const { user } = useAuth();
  const { messages, isTyping, sendMessage, clearHistory } = useChatbot(user?.role || 'PME');
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = useCallback((text = inputValue) => {
    if (!text.trim() || isTyping) return;
    sendMessage(text);
    setInputValue("");
  }, [inputValue, isTyping, sendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const transcribeAudio = async (audioBlob) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        const result = await runAudioTranscription({
          fichierAudioBase64: base64Audio,
          mimeType: 'audio/webm',
          dureeSecondes: Math.round(audioBlob.size / 16000),
          contexteUsage: 'saisie_chatbot',
        });
        if (result.success && result.data?.transcription) {
          sendMessage(result.data.transcription);
        }
        setIsTranscribing(false);
      };
    } catch {
      setIsTranscribing(false);
    }
  };

  const quickQuestions = [
    "Comment créer mon entreprise ?",
    "Où trouver un financement ?",
    "Quelles formations suivre ?",
    "Comment obtenir ma certification ?",
  ];

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-nexus-500 to-nexus-700 border-none shadow-lg shadow-nexus-500/30 cursor-pointer z-[1000] flex items-center justify-center"
      >
        <MessageSquare size={24} className="text-white" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl z-[1000] flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-nexus-500 to-nexus-700 px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Assistant BSTP</h3>
                  <p className="text-[11px] text-white/70">{isTyping ? 'En train d\'écrire...' : 'En ligne'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={clearHistory} className="p-2 hover:bg-white/10 rounded-xl transition-colors" title="Nouvelle conversation">
                  <X size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-nexus-500 text-white rounded-tr-none'
                      : msg.isError
                        ? 'bg-danger-50 border border-danger-100 text-danger-700 rounded-tl-none'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.suggestedAction && (
                      <button
                        onClick={() => window.location.href = msg.suggestedAction.route}
                        className="mt-2 flex items-center gap-1 text-xs font-bold text-nexus-600 bg-nexus-50 px-3 py-1.5 rounded-lg hover:bg-nexus-100 transition-colors"
                      >
                        {msg.suggestedAction.label} <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.timestamp?.toLocaleTimeString?.('fr-FR', { hour: '2-digit', minute: '2-digit' }) || ''}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-nexus-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-nexus-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-nexus-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              {isTranscribing && (
                <div className="flex items-center justify-center py-2">
                  <div className="flex items-center gap-2 text-xs text-nexus-500 font-semibold">
                    <Loader2 size={14} className="animate-spin" />
                    Transcription vocale en cours...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto">
              {quickQuestions.map((q, i) => (
                <button key={i} onClick={() => { setInputValue(q); handleSend(q); }}
                  className="whitespace-nowrap px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[11px] font-medium text-gray-500 hover:bg-nexus-50 hover:text-nexus-600 hover:border-nexus-100 transition-all flex-shrink-0">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                  isRecording ? 'bg-danger-500 text-white animate-pulse' : 'bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title={isRecording ? 'Arrêter l\'enregistrement' : 'Enregistrer un message vocal'}
              >
                {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-nexus-300 focus:ring-1 focus:ring-nexus-200 transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-nexus-500 text-white rounded-xl hover:bg-nexus-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}