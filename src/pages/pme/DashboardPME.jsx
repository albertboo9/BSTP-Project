import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import TrustBadge from '../../components/ui/TrustBadge';
import RadarChartCard from '../../components/ui/RadarChartCard';
import PasseportSummaryCard from '../../components/pme/PasseportSummaryCard';
import OpportunityFeed from '../../components/pme/OpportunityFeed';
import AcademyProgressWidget from '../../components/pme/AcademyProgressWidget';
import { MessageSquare, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Mock PME data — will come from useMaturityQuery later
const maturityData = {
  scoreGlobal: 78,
  axes: [
    { axe: "Juridique", score: 15 },
    { axe: "Fiscal", score: 18 },
    { axe: "CNPS", score: 12 },
    { axe: "Qualité", score: 14 },
    { axe: "Financier", score: 14 },
    { axe: "Références", score: 17 },
  ],
  trustLevel: "argent",
};

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

export default function DashboardPME() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 pb-16">

      {/* ─── HERO HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-soft"
      >
        <div>
          <p className="text-nexus-500 text-sm font-bold uppercase tracking-widest mb-2">Espace Croissance PME</p>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Bonjour, 
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-sm max-w-lg">
            Votre tableau de bord de pilotage. Complétez votre Passeport pour accéder aux appels d'offres qualifiés.
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

      {/* ─── LIGNE 1 : Radar Maturité + Passeport Numérique ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashCard delay={1}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Radar de Maturité</h2>
            <button
              onClick={() => toast.loading('Analyse ONUDI en cours...', { id: 'onudi', duration: 3000 })}
              className="text-xs font-bold text-nexus-500 hover:text-nexus-700 bg-nexus-50 hover:bg-nexus-100 px-3 py-1.5 rounded-lg transition-all"
            >
              Générer l'Analyse ONUDI
            </button>
          </div>
          <div className="flex-1">
            <RadarChartCard data={maturityData.axes} scoreGlobal={maturityData.scoreGlobal} />
          </div>
        </DashCard>

        <DashCard delay={2}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Passeport Numérique</h2>
            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">Coffre-Fort BSTP</span>
          </div>
          <PasseportSummaryCard />
        </DashCard>
      </div>

      {/* ─── LIGNE 2 : Flux Opportunités (pleine largeur) ─── */}
      <DashCard delay={3}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Flux d'Opportunités Poussées</h2>
            <p className="text-xs font-semibold text-gray-400 mt-0.5">Appels d'offres matchés à votre profil par l'IA BSTP</p>
          </div>
          <Link to="/dashboard/opportunites" className="flex items-center gap-1 text-xs font-bold text-nexus-500 hover:text-nexus-700 transition-colors">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
        <OpportunityFeed maxItems={3} />
      </DashCard>

      {/* ─── LIGNE 3 : Academy + Accès Rapide ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashCard delay={4}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">BSTP Academy</h2>
            <Link to="/dashboard/academy" className="flex items-center gap-1 text-xs font-bold text-nexus-500 hover:text-nexus-700 transition-colors">
              Voir <ArrowRight size={14} />
            </Link>
          </div>
          <AcademyProgressWidget />
        </DashCard>

        <div className="grid grid-rows-2 gap-4">
          {/* Assistant IA */}
          <motion.button
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => toast.info('Assistant Juridique IA', { description: 'Disponible depuis le menu principal.' })}
            className="bg-gradient-to-br from-nexus-900 to-nexus-700 text-white rounded-2xl p-6 flex items-center gap-4 hover:opacity-90 transition-opacity text-left"
          >
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base">Assistant Juridique IA</h3>
              <p className="text-white/60 text-xs font-medium mt-1">Analysez vos contrats, droit OHADA & Cameroun</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-white/40 group-hover:text-white" />
          </motion.button>

          {/* Hub Communautaire */}
          <motion.button
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => toast.info('Hub Communautaire B2B', { description: 'Connectez-vous avec les autres PME du réseau BSTP.' })}
            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex items-center gap-4 hover:border-nexus-100 hover:bg-nexus-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-nexus-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-100 transition-colors">
              <Users size={24} className="text-nexus-500" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Hub Communautaire B2B</h3>
              <p className="text-gray-400 text-xs font-medium mt-1">Mutualisation, partenariats, offres de groupement</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-gray-200 group-hover:text-nexus-500 transition-colors" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
