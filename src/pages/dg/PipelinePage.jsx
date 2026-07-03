import { motion } from 'framer-motion';
import StatusPipeline from '../../components/dg/StatusPipeline';
import { Award } from 'lucide-react';
import { observatoireData } from '../../data/observatoire.mock';

export default function PipelinePage() {
  const { pipeline } = observatoireData;

  const total = pipeline[0]?.count || 1;

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

      {/* Funnel visualization — 3 stages from real data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pipeline.map((f, i) => (
          <div key={f.label} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-soft">
            <div>
              <span className="text-3xl font-black text-gray-900">{f.count.toLocaleString()}</span>
              <h4 className="text-xs font-bold text-gray-600 mt-2">{f.label}</h4>
              <p className="text-[10px] text-gray-400 mt-1 leading-relaxed font-medium">
                {i === 0 && "PMEs ayant complété le profil initial."}
                {i === 1 && "Audit terrain validé par un agent BSTP."}
                {i === 2 && "Parcours certifiant complet, éligibles aux AO."}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400">{f.percent}% du total</span>
              <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ backgroundColor: f.color, width: `${(f.count / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed StatusPipeline */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
        <h3 className="text-base font-bold text-gray-900 mb-4">Répartition Détaillée</h3>
        <StatusPipeline pipeline={pipeline} />
      </div>

      {/* Key metrics summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-nexus-50 border border-nexus-100 rounded-2xl p-5">
          <span className="text-xs font-bold text-nexus-600 uppercase tracking-wider">Taux de Rétention</span>
          <p className="text-2xl font-black text-nexus-900 mt-1">{((pipeline[2]?.count / pipeline[0]?.count) * 100).toFixed(1)}%</p>
          <p className="text-xs text-nexus-500 font-medium mt-1">des profilées deviennent éligibles AO</p>
        </div>
        <div className="bg-success-50 border border-success-100 rounded-2xl p-5">
          <span className="text-xs font-bold text-success-600 uppercase tracking-wider">Taux d'Audit Terrain</span>
          <p className="text-2xl font-black text-success-700 mt-1">{((pipeline[1]?.count / pipeline[0]?.count) * 100).toFixed(1)}%</p>
          <p className="text-xs text-success-500 font-medium mt-1">des profilées ont reçu une visite terrain</p>
        </div>
        <div className="bg-warning-50 border border-warning-100 rounded-2xl p-5">
          <span className="text-xs font-bold text-warning-600 uppercase tracking-wider">Gap Certification</span>
          <p className="text-2xl font-black text-warning-700 mt-1">{pipeline[1]?.count - pipeline[2]?.count}</p>
          <p className="text-xs text-warning-500 font-medium mt-1">PME vérifiées terrain non encore éligibles</p>
        </div>
      </div>
    </div>
  );
}