import { useState } from 'react';
import { motion } from 'framer-motion';
import { useChatbot } from '../../hooks/useChatbot';
import { GraduationCap, ExternalLink, MessageSquare, Send, Sparkles, Award, BookOpen, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const COURSES = [
  { id: 1, title: "Comprendre le Local Content au Cameroun", category: "Réglementation", duration: "4h", progress: 80, modules: 4, done: 3 },
  { id: 2, title: "Système de Management Qualité ISO 9001", category: "Qualité", duration: "12h", progress: 45, modules: 6, done: 2 },
  { id: 3, title: "Initiation aux normes HSE en Afrique Centrale", category: "Sécurité", duration: "6h", progress: 0, modules: 3, done: 0 },
  { id: 4, title: "RSE & Développement Durable en Industrie", category: "RSE", duration: "8h", progress: 0, modules: 4, done: 0 },
  { id: 5, title: "Réponse aux Appels d'Offres Internationaux", category: "AO", duration: "10h", progress: 20, modules: 5, done: 1 },
];

const CATEGORIES = ['Tous', 'Réglementation', 'Qualité', 'Sécurité', 'RSE', 'AO'];

export default function AcademyPage() {
  const [courses, setCourses] = useState(COURSES);
  const [filter, setFilter] = useState('Tous');
  const { messages, isTyping, sendMessage } = useChatbot('PME');
  const [chatInput, setChatInput] = useState('');

  const filtered = filter === 'Tous' ? courses : courses.filter(c => c.category === filter);
  const totalProgress = Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    sendMessage(chatInput);
    setChatInput('');
  };

  const handleRequestTraining = (courseTitle) => {
    toast.success("Demande enregistrée !", {
      description: `Votre demande pour "${courseTitle}" a été envoyée pour validation.`
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">BSTP Academy</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Plateforme E-learning & Causerie IA</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">Montez en compétences pour décrocher de plus grands marchés industriels.</p>
        </div>
        <div className="flex gap-3">
          <a href="http://campus.studieslearning.com/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-black rounded-xl transition-all border border-white/15">
            Aller sur le Campus <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-nexus-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Modules</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{courses.length}</span>
          <span className="text-xs text-gray-400 font-semibold ml-1">disponibles</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-success-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Complétés</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{courses.filter(c => c.progress === 100).length}</span>
          <span className="text-xs text-gray-400 font-semibold ml-1">modules</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-warning-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Progression</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{totalProgress}%</span>
          <span className="text-xs text-gray-400 font-semibold ml-1">globale</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-gold-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Prochain Badge</span>
          </div>
          <span className="text-3xl font-black text-gray-900">Argent</span>
          <span className="text-xs text-gray-400 font-semibold ml-1">à débloquer</span>
        </div>
      </div>

      {/* Main grid: Courses + Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Course catalog */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter capsules */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${filter === cat ? 'bg-nexus-50 border-nexus-500 text-nexus-700' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Course cards */}
          <div className="space-y-3">
            {filtered.map(course => (
              <motion.div key={course.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-black text-nexus-600 bg-nexus-50 px-2 py-0.5 rounded border border-nexus-100 uppercase">{course.category}</span>
                      <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1"><Clock size={10} /> {course.duration}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">{course.title}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-1">{course.done}/{course.modules} modules complétés</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <span className="text-lg font-black text-gray-900">{course.progress}%</span>
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div className="h-full rounded-full bg-nexus-500" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleRequestTraining(course.title)}
                        className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 hover:text-gray-700 text-[11px] font-bold transition-all hover:bg-gray-100">
                        Demande PEC
                      </button>
                      <a href="https://campus.studieslearning.com/course/view.php?id=104" target="_blank" rel="noopener noreferrer"
                        className="px-3 py-2 bg-nexus-500 hover:bg-nexus-600 text-white rounded-xl text-[11px] font-black flex items-center gap-1 transition-all">
                        Étudier <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right col: Chat IA */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-soft flex flex-col h-[520px]">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-nexus-500 rounded-xl flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Causerie Juridique IA</h3>
                <p className="text-[10px] text-gray-400 font-medium">Posez vos questions sur le Local Content</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {messages.map((m, i) => (
              <div key={m.id || i} className={`flex flex-col max-w-[85%] ${m.role === 'user' ? 'ml-auto items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-nexus-500 text-white rounded-tr-none font-semibold'
                    : 'bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-none font-medium'
                }`}>{m.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1 p-3 max-w-[60px] bg-gray-50 border border-gray-100 rounded-full">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-nexus-500 placeholder:text-gray-400" />
              <button onClick={handleSend}
                className="p-2.5 bg-nexus-500 hover:bg-nexus-600 text-white rounded-xl transition-all">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}