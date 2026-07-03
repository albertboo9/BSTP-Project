import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import TrustBadge from '../../components/ui/TrustBadge';
import PasseportSummaryCard from '../../components/pme/PasseportSummaryCard';
import OpportunityFeed from '../../components/pme/OpportunityFeed';
import AcademyProgressWidget from '../../components/pme/AcademyProgressWidget';
import RadarMaturiteIA from '../../components/pme/RadarMaturiteIA';
import AssistantJuridiqueIA from '../../components/pme/AssistantJuridiqueIA';
import OCRDocumentUpload from '../../components/pme/OCRDocumentUpload';
import { MessageSquare, Users, ArrowRight, ScanLine, Scale, BarChart3, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.09, duration: 0.45 } }),
};

function DashCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Panneau coulissant pour les modules IA
function IAPanel({ title, icon: Icon, color, children, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 p-5 text-left transition-colors hover:bg-gray-50/50 ${isOpen ? 'border-b border-gray-100' : ''}`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`} style={{ background: color + '15' }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">Propulsé par BSTP IA Engine</p>
        </div>
        <ChevronRight size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );
}

export default function DashboardPME() {
  const { user } = useAuth();
  const [openPanel, setOpenPanel] = useState(null);

  const togglePanel = (key) => setOpenPanel(prev => prev === key ? null : key);

  const maturityData = {
    scoreGlobal: 78,
    trustLevel: 'argent',
  };

  return (
    <div className="space-y-6 pb-16">

      {/* ─── HERO HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm"
      >
        <div>
          <p className="text-indigo-500 text-xs font-bold uppercase tracking-widest mb-2">Espace Croissance PME</p>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Bonjour, {user?.name || 'PME BSTP'} 👋
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-sm max-w-lg">
            Tableau de bord de pilotage. Complétez votre Passeport pour accéder aux appels d'offres qualifiés.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <TrustBadge level={maturityData.trustLevel} size="lg" />
          <div className="text-right">
            <span className="text-4xl font-black text-gray-900">{maturityData.scoreGlobal}</span>
            <span className="text-gray-400 text-sm font-bold">/100</span>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Score de maturité</p>
          </div>
        </div>
      </motion.div>

      {/* ─── LIGNE 1 : Passeport + Opportunités ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashCard delay={1}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Passeport Numérique</h2>
            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">Coffre-Fort BSTP</span>
          </div>
          <PasseportSummaryCard />
        </DashCard>

        <DashCard delay={2}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Flux d'Opportunités</h2>
              <p className="text-xs text-gray-400 mt-0.5">Matchés à votre profil par l'IA</p>
            </div>
            <Link to="/dashboard/opportunites" className="flex items-center gap-1 text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <OpportunityFeed maxItems={3} />
        </DashCard>
      </div>

      {/* ─── LIGNE 2 : MODULES IA ─── */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Modules IA BSTPKIT</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>
        <div className="space-y-3">
          <IAPanel
            title="Radar de Maturité Industrielle"
            icon={BarChart3}
            color="#6366f1"
            isOpen={openPanel === 'radar'}
            onToggle={() => togglePanel('radar')}
          >
            <RadarMaturiteIA pmeId={user?.id || 'pme_bstpkit'} />
          </IAPanel>

          <IAPanel
            title="Assistant Juridique — Analyse de Contrat OHADA"
            icon={Scale}
            color="#8b5cf6"
            isOpen={openPanel === 'juridique'}
            onToggle={() => togglePanel('juridique')}
          >
            <AssistantJuridiqueIA />
          </IAPanel>

          <IAPanel
            title="Audit Visuel de Documents (OCR)"
            icon={ScanLine}
            color="#06b6d4"
            isOpen={openPanel === 'ocr'}
            onToggle={() => togglePanel('ocr')}
          >
            <OCRDocumentUpload />
          </IAPanel>
        </div>
      </div>

      {/* ─── LIGNE 3 : Academy + Hub ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashCard delay={4}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">BSTP Academy</h2>
            <Link to="/dashboard/academy" className="flex items-center gap-1 text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors">
              Voir <ArrowRight size={14} />
            </Link>
          </div>
          <AcademyProgressWidget />
        </DashCard>

        <div className="grid grid-rows-2 gap-4">
          {/* Hub Communautaire */}
          <motion.button
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex items-center gap-4 hover:border-indigo-100 hover:bg-indigo-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
              <Users size={24} className="text-indigo-500" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Hub Communautaire B2B</h3>
              <p className="text-gray-400 text-xs font-medium mt-1">Mutualisation, partenariats, groupements</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-gray-200 group-hover:text-indigo-500 transition-colors" />
          </motion.button>

          {/* Chat IA rapide */}
          <motion.button
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-6 flex items-center gap-4 hover:opacity-90 transition-opacity text-left"
          >
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base">Assistant BSTPKIT</h3>
              <p className="text-white/60 text-xs font-medium mt-1">Posez vos questions en direct à l'IA</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-white/40" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
