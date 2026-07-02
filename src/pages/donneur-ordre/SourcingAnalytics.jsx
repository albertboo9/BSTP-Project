import { useState } from 'react';
import { motion } from 'framer-motion';
import { aoPublies } from '../../data/opportunities.mock';
import OfferComparisonTable from '../../components/donneur-ordre/OfferComparisonTable';
import { BarChart3, Briefcase, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const formatCFA = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';

export default function SourcingAnalytics() {
  const [selectedAo, setSelectedAo] = useState(aoPublies[0]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Espace Sourcing Sécurisé</p>
          <h1 className="text-3xl font-black tracking-tight">Sourcing Analytics</h1>
          <p className="text-white/70 mt-2 font-medium text-sm max-w-lg">
            Analysez les candidatures reçues pour vos appels d'offres et comparez la fiabilité des PME soumissionnaires.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <BarChart3 size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: List of Published Tenders */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <h3 className="font-bold text-gray-900 text-sm border-b border-gray-50 pb-3">Vos Appels d'Offres</h3>
          <div className="space-y-3">
            {aoPublies.map((ao) => (
              <button
                key={ao.id}
                onClick={() => setSelectedAo(ao)}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex flex-col gap-2 ${
                  selectedAo?.id === ao.id
                    ? 'bg-nexus-50 border-nexus-200 text-nexus-900 shadow-sm'
                    : 'bg-gray-50 border-gray-100 hover:bg-gray-100/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-nexus-600 bg-white px-2 py-0.5 rounded border border-nexus-100">
                    {ao.id}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    {ao.statut}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 leading-snug line-clamp-2">
                  {ao.titre}
                </h4>
                <div className="flex justify-between items-center mt-1 border-t border-gray-100/50 pt-2">
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {ao.soumissionnaires.length} candidats
                  </span>
                  <span className="font-black text-gray-900">
                    {(ao.budgetFcfa / 1e6).toFixed(0)}M FCFA
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Bidders Comparison Table */}
        <div className="lg:col-span-2">
          <OfferComparisonTable offer={selectedAo} />
        </div>

      </div>

    </div>
  );
}
