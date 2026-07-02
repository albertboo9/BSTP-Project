import { useState } from 'react';
import { motion } from 'framer-motion';
import { useChatbot } from '../../hooks/useChatbot';
import { GraduationCap, ExternalLink, MessageSquare, Send, Sparkles, Award } from 'lucide-react';
import { toast } from 'sonner';

const COURSES = [
  { id: 1, title: "Comprendre le Local Content au Cameroun", category: "Réglementation", duration: "4h", progress: 80 },
  { id: 2, title: "Système de Management Qualité ISO 9001", category: "Qualité", duration: "12h", progress: 45 },
  { id: 3, title: "Initiation aux normes HSE en Afrique Centrale", category: "Sécurité", duration: "6h", progress: 0 }
];

export default function AcademyPage() {
  const [courses, setCourses] = useState(COURSES);
  const { messages, isTyping, sendMessage } = useChatbot('PME');
  const [chatInput, setChatInput] = useState('');

  const handleSend = () => {
    if (!chatInput.trim()) return;
    sendMessage(chatInput);
    setChatInput('');
  };

  const handleRequestTraining = (courseTitle) => {
    toast.success("Demande enregistrée !", {
      description: `Votre demande pour la formation "${courseTitle}" a été envoyée pour validation de prise en charge.`
    });
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">BSTP Academy</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Plateforme E-learning & Causerie IA</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Montez en compétences pour décrocher de plus grands marchés industriels. Nos formations sont certifiées par la BSTP.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="http://campus.studieslearning.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-black rounded-xl transition-all border border-white/15"
          >
            Aller sur le Campus <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>

      {/* Grid: Formations list & Chat IA causerie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Course Catalog & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-850 pb-3">
              <h3 className="text-sm font-bold text-white">Catalogue & Parcours de Formations</h3>
              <span className="text-[10px] text-gray-500 font-bold">3 Modules actifs</span>
            </div>

            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className="p-4 bg-gray-950 border border-gray-850 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-nexus-400 bg-nexus-500/10 px-1.5 py-0.5 rounded border border-nexus-500/20 uppercase">{course.category}</span>
                      <span className="text-[9px] text-gray-500 font-semibold">{course.duration}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">{course.title}</h4>
                    {course.progress > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[200px] bg-gray-800 h-1 rounded-full overflow-hidden">
                          <div className="bg-nexus-500 h-full rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">{course.progress}%</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestTraining(course.title)}
                      className="px-3 py-2 bg-gray-900 hover:bg-gray-850 border border-gray-800 rounded-xl text-gray-400 hover:text-white text-[11px] font-bold transition-all"
                    >
                      Demande de Prise en Charge
                    </button>
                    <a
                      href="http://campus.studieslearning.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-nexus-500 hover:bg-nexus-600 text-white rounded-xl text-[11px] font-black flex items-center gap-1 transition-all"
                    >
                      Étudier <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Causerie IA */}
        <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col h-[480px]">
          <div className="border-b border-gray-850 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles size={16} className="text-nexus-400" /> Causerie Juridique IA
              </h3>
              <p className="text-[9px] text-gray-500 mt-0.5">Posez vos questions sur le Local Content et la conformité.</p>
            </div>
          </div>

          {/* Conversation history viewport */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
            {messages.map((m, i) => (
              <div
                key={m.id || i}
                className={`flex flex-col max-w-[85%] ${m.role === 'user' ? 'ml-auto items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-[11px] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-nexus-500 text-white rounded-tr-none font-semibold'
                      : 'bg-gray-950 border border-gray-850 text-gray-300 rounded-tl-none font-medium'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1 p-2 max-w-[50px] bg-gray-950 border border-gray-850 rounded-full">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Chat input form */}
          <div className="flex items-center gap-2 border-t border-gray-850 pt-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-gray-950 border border-gray-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-500"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-nexus-500 hover:bg-nexus-600 text-white rounded-xl transition-all"
            >
              <Send size={14} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
