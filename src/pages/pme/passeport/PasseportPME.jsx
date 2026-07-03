import { useState } from 'react';
import { usePasseportStore } from '../../../stores/passeportStore';
import RadarChartCard from '../../../components/pme/passeport/RadarChartCard';
import DocumentStatusList from '../../../components/pme/passeport/DocumentStatusList';
import DocumentUploadModal from '../../../components/pme/passeport/DocumentUploadModal';
import KpiScoreCard from '../../../components/pme/passeport/KpiScoreCard';
import { Info, ShieldCheck, FileCheck, AlertTriangle, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function PasseportPME() {
  const { data, isUploading, uploadProgress, uploadDocument } = usePasseportStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedDocName, setSelectedDocName] = useState('');

  const handleUploadClick = (id, name) => {
    setSelectedDocId(id);
    setSelectedDocName(name);
    setModalOpen(true);
  };

  const handleConfirmUpload = async () => {
    if (!selectedDocId) return;
    setModalOpen(false);
    toast.loading(`Analyse du document ${selectedDocName}...`, { id: 'upload-passeport' });
    await uploadDocument(selectedDocId);
    toast.success(`${selectedDocName} validé !`, { id: 'upload-passeport', description: 'Le score de maturité a été mis à jour.' });
  };

  const validDocs = data.documents.filter(d => d.status === 'valid').length;
  const totalDocs = data.documents.length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-nexus-50 px-3 py-1 rounded-full mb-3">
            <ShieldCheck size={14} className="text-nexus-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-nexus-700">Coffre-Fort Documentaire</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Passeport Numérique</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">
            Centralisez vos documents légaux pour rassurer les donneurs d'ordres et monter votre score de maturité.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-nexus-50 text-nexus-700 px-4 py-2.5 rounded-xl text-sm font-bold border border-nexus-100 flex-shrink-0">
          <Info size={16} />
          <span>IA active sur {validDocs}/{totalDocs} documents</span>
        </div>
      </motion.div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Documents validés', value: `${validDocs}/${totalDocs}`, icon: FileCheck, color: 'text-success-600', bg: 'bg-success-50' },
          { label: 'Score de maturité', value: `${data.scoreGlobal}%`, icon: ShieldCheck, color: 'text-nexus-600', bg: 'bg-nexus-50' },
          { label: 'En attente', value: `${totalDocs - validDocs}`, icon: AlertTriangle, color: 'text-warning-600', bg: 'bg-warning-50' },
          { label: 'Statut', value: data.isPremium ? 'Premium' : 'Standard', icon: UploadCloud, color: data.isPremium ? 'text-gold-600' : 'text-gray-600', bg: data.isPremium ? 'bg-gold-50' : 'bg-gray-50' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`${stat.bg} rounded-2xl p-4 flex items-center gap-3 border border-transparent`}
          >
            <stat.icon size={20} className={stat.color} />
            <div>
              <p className="text-lg font-black text-gray-900">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Score + Radar */}
        <div className="lg:col-span-5 space-y-6">
          <KpiScoreCard score={data.scoreGlobal} isPremium={data.isPremium} />
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Radar de Conformité</h3>
            <RadarChartCard scores={data.scores} />
          </div>
        </div>

        {/* Right: Documents */}
        <div className="lg:col-span-7">
          <DocumentStatusList 
            documents={data.documents} 
            onUploadClick={handleUploadClick} 
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />
        </div>
      </div>

      <DocumentUploadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleConfirmUpload}
        docName={selectedDocName}
        isUploading={isUploading}
      />
    </div>
  );
}