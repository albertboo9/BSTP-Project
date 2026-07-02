import { useState } from 'react';
import { motion } from 'framer-motion';
import MilestonePipeline from '../../components/ui/MilestonePipeline';
import { HelpCircle, Users, ShieldAlert, Award } from 'lucide-react';

const FUNNEL_DATA = [
  { step: "Inscrit / Auto-évalué", count: 342, desc: "PMEs ayant validé leur premier radar préliminaire." },
  { step: "Audit Documentaire", count: 184, desc: "Dossiers administratifs (RCCM, NIU) vérifiés." },
  { step: "Visite Terrain", count: 96, desc: "Vérification des capacités réelles sur site." },
  { step: "Certifié BSTP", count: 62, desc: "PMEs qualifiées officiellement et visibles." }
];

export default function PipelinePage() {
  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Suivi Stratégique</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Funnel & Pipeline Statutaire</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Pilotez le flux d'onboarding et de certification des PME locales de l'auto-évaluation à la labellisation.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Award size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Funnel visualization */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {FUNNEL_DATA.map((f, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between gap-4">
            <div>
              <span className="text-3xl font-black text-white">{f.count}</span>
              <h4 className="text-xs font-bold text-gray-300 mt-2">{f.step}</h4>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="bg-nexus-500 h-full rounded-full" style={{ width: `${(f.count / 342) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Pipeline component */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Milestone Pipeline Global</h3>
        <MilestonePipeline currentMilestone="terrain" />
      </div>

    </div>
  );
}
