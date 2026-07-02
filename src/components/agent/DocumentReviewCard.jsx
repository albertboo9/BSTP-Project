import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { FileText, CheckCircle2, XCircle, Bot, Clock, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

const statusConfig = {
  valide:     { icon: <CheckCircle2 size={14} />, text: "text-success-700", bg: "bg-success-50 border-success-100",  label: "Validé" },
  en_attente: { icon: <Clock size={14} />,        text: "text-warning-700", bg: "bg-warning-50 border-warning-100",  label: "En attente" },
  rejete:     { icon: <XCircle size={14} />,      text: "text-danger-700",  bg: "bg-danger-50 border-danger-100",    label: "Rejeté" },
};

export default function DocumentReviewCard({ pme, onValidate, onOCR }) {
  const [expanded, setExpanded] = useState(false);
  const validated = pme.documents.filter(d => d.statut === 'valide').length;
  const total = pme.documents.length;
  const allResolved = pme.documents.every(d => d.statut !== 'en_attente');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className={clsx(
        "bg-white rounded-2xl border shadow-sm overflow-hidden transition-all",
        pme.urgent ? "border-danger-200" : "border-gray-100"
      )}
    >
      {/* Header row */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between gap-4 p-5 hover:bg-gray-50/50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-white flex-shrink-0", pme.urgent ? "bg-danger-500" : "bg-nexus-500")}>
            {pme.nom.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900">{pme.nom}</h3>
              {pme.urgent && (
                <span className="flex items-center gap-1 text-[10px] font-black bg-danger-50 text-danger-700 border border-danger-100 px-2 py-0.5 rounded-full">
                  <AlertTriangle size={10} /> URGENT
                </span>
              )}
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{pme.id}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{pme.secteur} · {pme.region} · En attente depuis {pme.joursAttente} jour(s)</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <span className="text-xl font-black text-gray-900">{validated}/{total}</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase">validées</p>
          </div>
          {expanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>

      {/* Expandable doc list */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-50"
          >
            <div className="p-5 space-y-3">
              {pme.documents.map((doc) => {
                const s = statusConfig[doc.statut];
                return (
                  <div key={doc.type} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 flex-1">
                      <FileText size={16} className="text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">{doc.label}</p>
                        {doc.extraction && (
                          <p className="text-[11px] text-nexus-600 font-semibold mt-0.5">
                            IA: {Object.entries(doc.extraction).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                      <span className={clsx("flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border", s.text, s.bg)}>
                        {s.icon}{s.label}
                      </span>
                      {doc.statut === 'en_attente' && (
                        <>
                          <button
                            onClick={() => onOCR(pme.id, doc.type)}
                            className="flex items-center gap-1 text-[11px] font-bold text-nexus-600 bg-nexus-50 border border-nexus-100 px-2 py-1 rounded-lg hover:bg-nexus-100 transition-colors"
                          >
                            <Bot size={12} /> Extraire IA
                          </button>
                          <button
                            onClick={() => onValidate(pme.id, doc.type, 'valide')}
                            className="text-[11px] font-bold text-success-700 bg-success-50 border border-success-100 px-2 py-1 rounded-lg hover:bg-success-100 transition-colors"
                          >
                            Valider
                          </button>
                          <button
                            onClick={() => {
                              const motif = window.prompt('Motif de rejet (obligatoire) :');
                              if (motif) onValidate(pme.id, doc.type, 'rejete');
                            }}
                            className="text-[11px] font-bold text-danger-700 bg-danger-50 border border-danger-100 px-2 py-1 rounded-lg hover:bg-danger-100 transition-colors"
                          >
                            Rejeter
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {allResolved && (
              <div className="px-5 pb-5">
                <button
                  onClick={() => toast.success(`Dossier ${pme.nom} clôturé`, { description: 'Statut mis à jour. La PME a été notifiée.' })}
                  className="w-full bg-nexus-500 hover:bg-nexus-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} /> Clôturer le dossier
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
