import { useState } from 'react';
import { motion } from 'framer-motion';
import { opportunities } from '../../data/opportunities.mock';
import { Briefcase, MapPin, ShieldCheck, Search, Zap, Clock, Star, ChevronRight } from 'lucide-react';
import TrustBadge from '../../components/ui/TrustBadge';
import { toast } from 'sonner';

const SECTEURS = ['Tous', ...new Set(opportunities.map(o => o.secteur))];

const scoreColor = (s) => s >= 85 ? 'bg-success-50 text-success-700' : s >= 70 ? 'bg-warning-50 text-warning-700' : 'bg-gray-50 text-gray-500';

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tous');

  const filtered = opportunities
    .filter(o => {
      const matchSearch = o.titre.toLowerCase().includes(searchTerm.toLowerCase()) || o.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSector = selectedSector === 'Tous' || o.secteur === selectedSector;
      return matchSearch && matchSector;
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const handleApply = (oppId) => {
    toast.success("Candidature transmise !", {
      description: "Votre profil de maturité et vos pièces justificatives ont été envoyés."
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Marchés de Sous-traitance</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Appels d'Offres & Opportunités</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">Postulez directement aux marchés des donneurs d'ordres nationaux. Votre badge de maturité est joint automatiquement.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-5 py-4">
          <span className="text-3xl font-black text-white">{filtered.length}</span>
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Opportunités<br/>trouvées</span>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher un marché..." value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-400 outline-none focus:border-nexus-300 transition-colors" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SECTEURS.map(s => (
              <button key={s} onClick={() => setSelectedSector(s)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${selectedSector === s ? 'bg-nexus-50 border-nexus-500 text-nexus-700' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center shadow-soft">
          <Briefcase size={40} className="text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900">Aucune opportunité trouvée</h3>
          <p className="text-sm text-gray-500 mt-1">Modifiez vos filtres de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(opp => (
            <motion.div key={opp.id} layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft hover:shadow-md transition-all group">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] font-black text-nexus-600 bg-nexus-50 px-2 py-0.5 rounded border border-nexus-100 uppercase">{opp.secteur}</span>
                      {opp.nouveau && <span className="bg-nexus-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1"><Zap size={10} /> NOUVEAU</span>}
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${scoreColor(opp.matchScore)}`}>
                        Match {opp.matchScore}%
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-nexus-700 transition-colors">{opp.titre}</h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-lg font-black text-gray-900">{(opp.budgetFcfa / 1e6).toFixed(0)}M</span>
                    <p className="text-[9px] text-gray-400 font-bold">FCFA</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{opp.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold flex-wrap">
                  <span className="flex items-center gap-1"><Star size={12} /> {opp.donneur}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {opp.region}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {opp.deadline}</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} /> Badge min : <TrustBadge level={opp.badgeMinimum} size="sm" showLabel={true} />
                  </span>
                </div>

                {/* Action */}
                <button onClick={() => handleApply(opp.id)}
                  className="w-full py-3 bg-nexus-500 hover:bg-nexus-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-nexus-100">
                  <Zap size={14} /> Postuler via Fast-Track IA <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}