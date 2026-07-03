import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Clock, ChevronRight } from 'lucide-react';
import FlagIndicator from '../../components/ui/FlagIndicator';
import { observatoireData } from '../../data/observatoire.mock';

export default function VigilancePage() {
  const { vigilance } = observatoireData;
  const { drapeauxRouges, drapeauxTotal, pourcentage, contratsCritiques } = vigilance;
  const [selectedContract, setSelectedContract] = useState(contratsCritiques[0]);

  const severityColor = pourcentage > 15 ? 'danger' : pourcentage > 8 ? 'warning' : 'success';
  const colorMap = {
    danger: { bar: 'bg-danger-500', text: 'text-danger-700', bg: 'bg-danger-50', border: 'border-danger-100', dot: 'bg-danger-500' },
    warning: { bar: 'bg-warning-500', text: 'text-warning-700', bg: 'bg-warning-50', border: 'border-warning-100', dot: 'bg-warning-500' },
    success: { bar: 'bg-success-500', text: 'text-success-700', bg: 'bg-success-50', border: 'border-success-100', dot: 'bg-success-500' },
  };
  const c = colorMap[severityColor];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-danger-400 font-bold uppercase tracking-widest flex items-center gap-1">
            <AlertTriangle size={12} /> Vigilance Opérationnelle
          </span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Contrats & Stagnations</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Supervisez les chantiers en stagnation et les drapeaux rouges actifs sur l'ensemble des contrats tripartites.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={24} className="text-danger-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Bloc 1: FlagIndicator (thermometer/jauge) + KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FlagIndicator count={drapeauxRouges} total={drapeauxTotal} percent={pourcentage} />
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-danger-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Drapeaux Rouges</span>
            </div>
            <span className="text-3xl font-black text-gray-900">{drapeauxRouges}</span>
            <span className="text-sm text-gray-400 font-semibold ml-1">actifs</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contrats Tripartites</span>
            </div>
            <span className="text-3xl font-black text-gray-900">{drapeauxTotal}</span>
            <span className="text-sm text-gray-400 font-semibold ml-1">suivis</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pourcentage > 15 ? '#ef4444' : pourcentage > 8 ? '#f59e0b' : '#10b981' }} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Taux d'Alerte</span>
            </div>
            <span className="text-3xl font-black text-gray-900">{pourcentage.toFixed(1)}%</span>
            <span className="text-sm text-gray-400 font-semibold ml-1">des contrats</span>
          </div>
        </div>
      </div>

      {/* Bloc 2: Liste détaillée des contrats critiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: List of critical contracts */}
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Contrats Critiques</h3>
          <div className="space-y-2">
            {contratsCritiques.map(contract => (
              <button
                key={contract.id}
                onClick={() => setSelectedContract(contract)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                  selectedContract?.id === contract.id
                    ? 'bg-danger-50 border-danger-200'
                    : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${selectedContract?.id === contract.id ? 'text-danger-700' : 'text-gray-900'}`}>
                    {contract.id}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-danger-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-danger-600">{contract.joursStagnation}j</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-gray-500">{contract.pme}</span>
                  <ChevronRight size={10} className="text-gray-300" />
                  <span className="text-gray-500">{contract.do}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">
                  Bloqué: {contract.jalonsBloque}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Contract details */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
          {selectedContract ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[10px] text-danger-500 font-bold uppercase tracking-wider">Contrat en alerte</span>
                  <h3 className="text-lg font-black text-gray-900 mt-1">{selectedContract.id}</h3>
                </div>
                <div className="flex items-center gap-2 bg-danger-50 border border-danger-100 rounded-xl px-4 py-2">
                  <Clock size={14} className="text-danger-500" />
                  <span className="text-xs font-black text-danger-700">{selectedContract.joursStagnation} jours de stagnation</span>
                </div>
              </div>

              {/* PME & DO info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">PME</span>
                  <p className="text-sm font-black text-gray-900 mt-1">{selectedContract.pme}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={10} className="text-gray-400" />
                    <span className="text-[10px] text-gray-500 font-semibold">Sous-traitant</span>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Donneur d'Ordre</span>
                  <p className="text-sm font-black text-gray-900 mt-1">{selectedContract.do}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] text-gray-500 font-semibold">Maître d'ouvrage</span>
                  </div>
                </div>
              </div>

              {/* Bloqué jalon */}
              <div className="bg-danger-50 border border-danger-100 rounded-xl p-5">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-danger-500" />
                  <span className="text-xs font-bold text-danger-700 uppercase tracking-wider">Jalon bloqué</span>
                </div>
                <p className="text-base font-black text-danger-800 mt-2">{selectedContract.jalonsBloque}</p>
                <p className="text-xs text-danger-600 font-medium mt-1">
                  Aucune progression depuis {selectedContract.joursStagnation} jours. Une médiation est recommandée.
                </p>
              </div>

              {/* Action suggestion */}
              <div className="bg-nexus-50 border border-nexus-100 rounded-xl p-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-nexus-700 uppercase tracking-wider">Action recommandée</span>
                </div>
                <p className="text-sm font-semibold text-nexus-800 mt-1">
                  Activation de la médiation tripartite — contacter l'agent BSTP référent pour initier le processus de déblocage.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 font-semibold">
              Sélectionnez un contrat critique pour voir les détails.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}