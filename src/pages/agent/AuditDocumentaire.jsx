import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { auditQueue } from '../../data/agent-tasks.mock';
import DocumentReviewCard from '../../components/agent/DocumentReviewCard';
import { ClipboardCheck, ShieldCheck, Clock, AlertTriangle, Search, Filter } from 'lucide-react';

export default function AuditDocumentaire() {
  const [queue, setQueue] = useState(auditQueue);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUrgent, setFilterUrgent] = useState(false);

  const pendingCount = queue.length;
  const urgentCount = queue.filter(t => t.urgent).length;

  const filteredQueue = queue
    .filter(pme => filterUrgent ? pme.urgent : true)
    .filter(pme => pme.nom.toLowerCase().includes(searchTerm.toLowerCase()) || pme.id.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.urgent - a.urgent || b.joursAttente - a.joursAttente);

  const handleValidatePiece = (pmeId, docType, statut) => {
    setQueue(q => q.map(pme => {
      if (pme.id !== pmeId) return pme;
      const docs = pme.documents.map(d => d.type === docType ? { ...d, statut } : d);
      return { ...pme, documents: docs };
    }));
    if (statut === 'valide') {
      toast.success('Document validé', { description: 'La PME sera notifiée automatiquement.' });
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
        className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-soft"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-nexus-50 px-3 py-1 rounded-full mb-3">
            <div className="w-2 h-2 rounded-full bg-nexus-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-nexus-700">Back-Office Agent BSTP</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">Audit Documentaire</h1>
          <p className="text-gray-500 mt-2 text-sm">Validez ou rejetez les pièces justificatives des PME en attente de certification.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-nexus-50 rounded-2xl px-5 py-4 text-center">
            <p className="text-3xl font-black text-nexus-700">{pendingCount}</p>
            <p className="text-[11px] font-bold text-nexus-400 uppercase tracking-widest mt-1">En attente</p>
          </div>
          {urgentCount > 0 && (
            <div className="bg-danger-500 rounded-2xl px-5 py-4 text-center">
              <p className="text-3xl font-black text-white">{urgentCount}</p>
              <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mt-1">Urgents</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-400 outline-none focus:border-nexus-300 transition-colors"
          />
        </div>
        <button
          onClick={() => setFilterUrgent(!filterUrgent)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-bold transition-all ${
            filterUrgent ? 'bg-danger-50 border-danger-200 text-danger-700' : 'bg-white border-gray-100 text-gray-500 hover:text-gray-700'
          }`}
        >
          <AlertTriangle size={16} />
          Urgents uniquement
          {urgentCount > 0 && <span className="text-[10px] font-black bg-danger-500 text-white w-5 h-5 rounded-full flex items-center justify-center">{urgentCount}</span>}
        </button>
      </div>

      {/* Queue */}
      {filteredQueue.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center text-success-500 mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h3 className="text-xl font-black text-gray-900">Bannette vide</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto text-sm">Excellent travail. Toutes les PME en attente ont été auditées.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQueue.map(pme => (
            <DocumentReviewCard
              key={pme.id}
              pme={pme}
              onValidate={handleValidatePiece}
              onOCR={handleOCR}
            />
          ))}
        </div>
      )}
    </div>
  );
}