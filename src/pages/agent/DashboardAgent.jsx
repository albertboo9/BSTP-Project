import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { auditQueue, planningTerrain, mediationDossiers } from '../../data/agent-tasks.mock';
import DocumentReviewCard from '../../components/agent/DocumentReviewCard';
import MilestonePipeline from '../../components/ui/MilestonePipeline';
import FlagIndicator from '../../components/ui/FlagIndicator';
import { ClipboardCheck, Calendar, Scale, ShieldCheck, AlertTriangle, Clock, ChevronRight } from 'lucide-react';

const TABS = [
  { id: 'audit', label: 'Audit Documentaire', icon: <ClipboardCheck size={18} /> },
  { id: 'terrain', label: 'Planification Terrain', icon: <Calendar size={18} /> },
  { id: 'mediation', label: 'Médiation Tripartite', icon: <Scale size={18} /> },
];

const formatCFA = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';

export default function DashboardAgent() {
  const [activeTab, setActiveTab] = useState('audit');
  const [queue, setQueue] = useState(auditQueue);

  const pendingCount = queue.length;
  const urgentCount = queue.filter(t => t.urgent).length;

  const handleValidatePiece = (pmeId, docType, statut) => {
    setQueue(q => q.map(pme => {
      if (pme.id !== pmeId) return pme;
      const docs = pme.documents.map(d => d.type === docType ? { ...d, statut } : d);
      const allDone = docs.every(d => d.statut === 'valide' || d.statut === 'rejete');
      return { ...pme, documents: docs };
    }));
    if (statut === 'valide') {
      toast.success('Document validé', { description: `La PME sera notifiée automatiquement.` });
    } else {
      toast.error('Document rejeté', { description: 'Un motif de rejet a été enregistré.' });
    }
  };

  const handleOCR = (pmeId, docType) => {
    toast.loading('Extraction IA en cours (Llama Scout)...', { id: `ocr-${pmeId}-${docType}` });
    setTimeout(() => {
      toast.success('Extraction terminée', { id: `ocr-${pmeId}-${docType}`, description: 'Données pré-remplies pour vérification. Validez ou corrigez.' });
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-16">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full mb-3">
            <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Back-Office Agent BSTP</span>
          </div>
          <h1 className="text-3xl font-black">Workflow de Certification</h1>
          <p className="text-white/60 mt-2 text-sm">Auditez, planifiez et arbitrez pour certifier les PME du réseau.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 rounded-2xl px-5 py-4 text-center">
            <p className="text-3xl font-black">{pendingCount}</p>
            <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mt-1">En attente</p>
          </div>
          {urgentCount > 0 && (
            <div className="bg-danger-500 rounded-2xl px-5 py-4 text-center">
              <p className="text-3xl font-black">{urgentCount}</p>
              <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mt-1">Urgents</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl w-full overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-white shadow-sm text-nexus-700'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.id === 'audit' && pendingCount > 0 && (
              <span className="bg-nexus-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'audit' && (
          <motion.div key="audit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {queue.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center text-success-500 mx-auto mb-6">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-xl font-black text-gray-900">Bannette vide</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto text-sm">Excellent travail. Toutes les PME en attente ont été auditées.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {queue.sort((a, b) => b.urgent - a.urgent || b.joursAttente - a.joursAttente)
                  .map(pme => (
                    <DocumentReviewCard
                      key={pme.id}
                      pme={pme}
                      onValidate={handleValidatePiece}
                      onOCR={handleOCR}
                    />
                  ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'terrain' && (
          <motion.div key="terrain" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Planification des Descentes Terrain</h2>
                <button onClick={() => toast.info('Planifier une visite', { description: 'Sélectionnez une PME, une date et un agent.' })}
                  className="text-xs font-bold bg-nexus-500 text-white px-4 py-2 rounded-xl hover:bg-nexus-600 transition-colors">
                  + Planifier une visite
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {planningTerrain.map((visit, idx) => (
                  <motion.div
                    key={visit.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="bg-nexus-50 rounded-2xl p-4 text-center flex-shrink-0 min-w-[72px]">
                      <p className="text-lg font-black text-nexus-700">{new Date(visit.dateVisite).getDate()}</p>
                      <p className="text-[10px] font-bold text-nexus-400 uppercase">
                        {new Date(visit.dateVisite).toLocaleDateString('fr-FR', { month: 'short' })}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{visit.pme}</h4>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${visit.statut === 'confirme' ? 'bg-success-50 text-success-700' : 'bg-warning-50 text-warning-700'}`}>
                          {visit.statut === 'confirme' ? 'Confirmé' : 'En attente'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{visit.adresse}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock size={11} /> {visit.heure} — Agent : {visit.agent}</p>
                    </div>
                    <button onClick={() => toast.info(`Rapport de visite: ${visit.pme}`, { description: 'Remplissez le compte-rendu d\'audit de terrain.' })}
                      className="flex items-center gap-1 text-xs font-bold text-nexus-500 hover:text-nexus-700 transition-colors flex-shrink-0">
                      Compte-rendu <ChevronRight size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'mediation' && (
          <motion.div key="mediation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="flex items-center gap-3 mb-4">
              <FlagIndicator count={mediationDossiers.length} total={312} percent={7.4} compact />
              <p className="text-sm font-semibold text-gray-500">dossiers nécessitant une intervention d'arbitrage</p>
            </div>
            <div className="space-y-4">
              {mediationDossiers.map((c, idx) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-danger-100 shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black text-danger-700 bg-danger-50 px-2 py-0.5 rounded-full border border-danger-100">{c.id}</span>
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertTriangle size={10} className="text-danger-500" /> {c.joursStagnation} jours de stagnation
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900">{c.pme} <span className="text-gray-400 font-semibold">→</span> {c.do}</h3>
                      <p className="text-sm text-gray-500 mt-1">Bloqué à : <span className="font-bold text-danger-700">"{c.jalonsBloque}"</span></p>
                      <p className="text-xs text-gray-400 mt-1 italic">"{c.motifDeclare}"</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-black text-gray-900">{(c.budgetFcfa / 1e6).toFixed(0)}M</p>
                      <p className="text-xs text-gray-400 font-bold">FCFA</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Historique des jalons</p>
                    <div className="flex flex-wrap gap-2">
                      {c.historique.map((h, i) => (
                        <span key={i} className={`text-[11px] font-semibold px-2 py-1 rounded-lg ${h.startsWith('BLOQUÉ') ? 'bg-danger-50 text-danger-700 font-bold' : 'bg-gray-50 text-gray-600'}`}>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => toast.info(`Arbitrage ${c.id}`, { description: 'Ouvrez le dossier pour rédiger une note d\'arbitrage et notifier les deux parties.' })}
                    className="w-full flex items-center justify-center gap-2 bg-nexus-50 hover:bg-nexus-100 text-nexus-700 border border-nexus-100 rounded-xl py-3 text-sm font-bold transition-colors"
                  >
                    <Scale size={16} /> Ouvrir le dossier de médiation
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
