import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, Lock, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const docs = [
  { type: "RCCM", label: "Registre de Commerce", statut: "valide" },
  { type: "NIU", label: "Numéro Identifiant Unique", statut: "valide" },
  { type: "CNPS", label: "Attestation CNPS", statut: "en_attente" },
  { type: "FISCAL", label: "Attestation Fiscale", statut: "en_attente" },
];

const statusConfig = {
  valide:     { icon: <CheckCircle2 size={16} />, color: "text-success-700", bg: "bg-success-50", label: "Validé" },
  en_attente: { icon: <Clock size={16} />,        color: "text-warning-700", bg: "bg-warning-50", label: "En attente" },
  rejete:     { icon: <XCircle size={16} />,      color: "text-danger-700",  bg: "bg-danger-50",  label: "Rejeté" },
};

export default function PasseportSummaryCard({ documents = docs }) {
  const validated = documents.filter(d => d.statut === 'valide').length;
  const total = documents.length;
  const progress = Math.round((validated / total) * 100);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-black text-gray-900">{validated}</span>
          <span className="text-lg font-bold text-gray-400">/{total}</span>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Pièces validées</p>
        </div>
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#f1f5f9" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke={progress === 100 ? '#22c55e' : '#635bff'}
              strokeWidth="3"
              strokeDasharray={`${progress * 0.942} 100`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-900">{progress}%</span>
        </div>
      </div>

      {/* Docs list */}
      <div className="space-y-2">
        {documents.map((doc, idx) => {
          const s = statusConfig[doc.statut] || statusConfig.en_attente;
          return (
            <motion.div
              key={doc.type}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5"
            >
              <FileText size={14} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-gray-700 flex-1 truncate">{doc.label}</span>
              <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${s.color} ${s.bg}`}>
                {s.icon}
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <Link
        to="/dashboard/passeport"
        className="mt-auto flex items-center justify-center gap-2 text-xs font-bold text-nexus-500 hover:text-nexus-700 py-2 border-t border-gray-100 transition-colors"
      >
        <Lock size={12} /> Accéder au Coffre-Fort documentaire <ExternalLink size={12} />
      </Link>
    </div>
  );
}
