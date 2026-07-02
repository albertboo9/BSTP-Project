import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnnuaireStore } from '../../../stores/annuaireStore';
import PmeCard from '../../../components/donneur-ordre/annuaire/PmeCard';
import PmeDetailDrawer from '../../../components/donneur-ordre/annuaire/PmeDetailDrawer';
import { Search, ShieldCheck } from 'lucide-react';

export default function AnnuaireCertifie() {
  const { 
    filteredPmes, 
    searchQuery, setSearchQuery, 
    selectedSector, setSector,
    minScore, setMinScore,
    selectedPme, setSelectedPme 
  } = useAnnuaireStore();

  const sectors = ['Tous', 'BTP', 'Informatique', 'Logistique', 'Services'];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Marketplace DO</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Annuaire Certifié</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium max-w-xl">
            Identifiez instantanément les PME qualifiées grâce à leur Indice de Confiance validé par l'IA BSTP.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center">
            <p className="text-3xl font-black text-[#635bff]">{filteredPmes.length}</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">PME Trouvées</p>
          </div>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher une compétence, un nom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all text-sm font-medium"
          />
        </div>

        {/* Sectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setSector(sector)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedSector === sector 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Quick Filter (Score > 80) */}
        <button 
          onClick={() => setMinScore(minScore === 80 ? 0 : 80)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap w-full md:w-auto ${
            minScore === 80 
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm' 
              : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <ShieldCheck size={18} />
          <span>Top Fiabilité (&gt;80)</span>
        </button>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredPmes.map(pme => (
            <PmeCard 
              key={pme.id} 
              pme={pme} 
              onClick={(p) => setSelectedPme(p)} 
            />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredPmes.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Aucune PME trouvée</h3>
          <p className="text-gray-500 mt-1 max-w-sm">Ajustez vos filtres de recherche pour voir plus de résultats.</p>
        </div>
      )}

      {/* Drawer */}
      <PmeDetailDrawer 
        pme={selectedPme} 
        isOpen={!!selectedPme} 
        onClose={() => setSelectedPme(null)} 
      />
    </div>
  );
}
