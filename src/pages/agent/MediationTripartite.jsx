import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { mediationDossiers } from '../../data/agent-tasks.mock';
import { Scale, AlertTriangle, Clock, User, Building2, FileText } from 'lucide-react';
import FlagIndicator from '../../components/ui/FlagIndicator';

export default function MediationTripartite() {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-soft"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-nexus-50 px-3 py-1 rounded-full mb-3">
            <div className="w-2 h-2 rounded-full bg-nexus-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-nexus-700">Back-Office Agent BSTP</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">Médiation Tripartite</h1>
          <p className="text-gray-500 mt-2 text-sm">Arbitrez les litiges et débloquez les contrats en stagnation entre PME et donneurs d'ordre.</p>
        </div>
        <div className="flex gap-4">
          <FlagIndicator count={mediationDossiers.length} total={312} percent={7.4} compact />
        </div>
      </motion.div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dossiers Actifs</span>
          <p className="text-3xl font-black text-danger-600 mt-1">{mediationDossiers.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stagnation Moy.</span>
          <p className="text-3xl font-black text-gray-900 mt-1">
            {Math.round(mediationDossiers.reduce((a, d) => a + d.joursStagnation, 0) / mediationDossiers.length)}j
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Volume Total Bloqué</span>
          <p className="text-3xl font-black text-gray-900 mt-1">
            {(mediationDossiers.reduce((a, d) => a + d.budgetFcfa, 0) / 1e6).toFixed(0)}M
          </p>
          <span className="text-xs text-gray-400 font-medium">FCFA</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Jalon Critique</span>
          <p className="text-3xl font-black text-gray-900 mt-1">
            {mediationDossiers.filter(d => d.joursStagnation > 20).length}
          </p>
          <span className="text-xs text-danger-500 font-medium">+20 jours</span>
        </div>
      </div>

      {/* Dossier details */}
      <div className="space-y-4">
        {mediationDossiers.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border border-danger-100 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Left: contract info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black text-danger-700 bg-danger-50 px-2 py-0.5 rounded-full border border-danger-100">
                    {c.id}
                  </span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle size={10} className="text-danger-500" /> {c.joursStagnation}j de stagnation
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base">
                  <span className="text-gray-700">{c.pme}</span>
                  <span className="text-gray-400 mx-2">→</span>
                  <span className="text-gray-700">{c.do}</span>
                </h3>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={12} className="text-gray-400" />
                      <span className="font-bold">Jalon bloqué</span>
                    </div>
                    <p className="text-sm font-black text-danger-700 mt-1">"{c.jalonsBloque}"</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <AlertTriangle size={12} className="text-gray-400" />
                      <span className="font-bold">Motif déclaré</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 mt-1 italic">"{c.motifDeclare}"</p>
                  </div>
                </div>

                {/* Historique timeline */}
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Historique</p>
                  <div className="flex flex-wrap gap-2">
                    {c.historique.map((h, i) => (
                      <span
                        key={i}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                          h.startsWith('BLOQUÉ')
                            ? 'bg-danger-50 text-danger-700 font-bold border border-danger-100'
                            : 'bg-gray-50 text-gray-600 border border-gray-100'
                        }`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: budget + action */}
              <div className="flex flex-col items-end gap-4 flex-shrink-0">
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">{(c.budgetFcfa / 1e6).toFixed(0)}M</p>
                  <p className="text-xs text-gray-400 font-bold">FCFA</p>
                </div>
                <button
                  onClick={() => toast.info(`Arbitrage ${c.id}`, {
                    description: 'Rédigez une note d\'arbitrage et notifiez PME + Donneur d\'Ordre.',
                    duration: 4000,
                  })}
                  className="flex items-center gap-2 bg-nexus-50 hover:bg-nexus-100 text-nexus-700 border border-nexus-100 rounded-xl px-5 py-3 text-sm font-bold transition-colors w-full sm:w-auto"
                >
                  <Scale size={16} /> Ouvrir la médiation
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}