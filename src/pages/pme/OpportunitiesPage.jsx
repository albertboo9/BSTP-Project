import { useState } from 'react';
import { motion } from 'framer-motion';
import { opportunities } from '../../data/opportunities.mock';
import { Briefcase, MapPin, ShieldCheck, Search, SlidersHorizontal, Zap } from 'lucide-react';
import TrustBadge from '../../components/ui/TrustBadge';
import { toast } from 'sonner';

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tous');

  const sectors = ['Tous', ...new Set(opportunities.map(o => o.secteur))];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'Tous' || opp.secteur === selectedSector;
    return matchesSearch && matchesSector;
  });

  const handleApply = (oppId) => {
    toast.success("Candidature transmise !", {
      description: "Votre profil de maturité et vos pièces justificatives ont été envoyés."
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
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Marchés de Sous-traitance</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Appels d'Offres & Opportunités</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Postulez directement aux marchés des donneurs d'ordres nationaux. Votre badge de maturité est joint automatiquement.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Briefcase size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gray-900 border border-gray-800 p-4 rounded-2xl">
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un marché..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-white placeholder-gray-500 w-full"
          />
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal size={16} className="text-gray-500" />
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white font-semibold outline-none"
          >
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp) => (
          <motion.div
            key={opp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/60 border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between gap-4 backdrop-blur hover:border-gray-700 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black text-nexus-400 bg-nexus-500/10 border border-nexus-500/20 px-2 py-0.5 rounded uppercase">
                  {opp.secteur}
                </span>
                <span className="text-sm font-black text-white">
                  {new Intl.NumberFormat('fr-FR').format(opp.budgetFcfa)} FCFA
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug group-hover:text-nexus-400 transition-colors">
                {opp.titre}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                {opp.description}
              </p>

              <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold pt-1 border-t border-gray-800/60">
                <div className="flex items-center gap-1">
                  <MapPin size={12} /> {opp.region}
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={12} /> Badge requis : <TrustBadge level={opp.badgeMinimum} size="sm" showLabel={true} />
                </div>
              </div>
            </div>

            <button
              onClick={() => handleApply(opp.id)}
              className="w-full mt-2 py-3 bg-nexus-500 hover:bg-nexus-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Zap size={14} /> Postuler via Fast-Track IA
            </button>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
