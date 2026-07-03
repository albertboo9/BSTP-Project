import { useState } from 'react';
import { usePasseportStore } from '../../../stores/passeportStore';
import RadarChartCard from '../../../components/pme/passeport/RadarChartCard';
import DocumentStatusList from '../../../components/pme/passeport/DocumentStatusList';
import DocumentUploadModal from '../../../components/pme/passeport/DocumentUploadModal';
import KpiScoreCard from '../../../components/pme/passeport/KpiScoreCard';
import { Info, ShieldCheck, FileCheck, AlertTriangle, UploadCloud, ChevronRight } from 'lucide-react';
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
    toast.success(`${selectedDocName} validé !`, { id: 'upload-passeport', description: 'Le score de maturité a été mis à jour par l\'IA.' });
  };

  const validDocs = data.documents.filter(d => d.status === 'valid').length;
  const totalDocs = data.documents.length;

  return (
    <div className="space-y-8 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Premium White Theme */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-50/80 px-3 py-1.5 rounded-full mb-4">
            <ShieldCheck size={16} className="text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">Coffre-Fort Documentaire & Légal</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Passeport Numérique PME</h1>
          <p className="text-gray-500 mt-2 font-medium text-sm max-w-xl leading-relaxed">
            Centralisez vos documents légaux pour rassurer les donneurs d'ordres. 
            L'IA BSTP audite vos pièces instantanément pour certifier votre entreprise et augmenter votre score de maturité.
          </p>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-3 flex-shrink-0 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-200">
              <span className="text-xl font-black text-indigo-600">{validDocs}</span>
            </div>
            <span className="text-gray-400 font-bold text-xl">/</span>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
              <span className="text-xl font-black text-gray-500">{totalDocs}</span>
            </div>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Info size={14} className="text-indigo-400"/> Documents validés par l'IA
          </p>
        </div>
      </motion.div>

      {/* KPI Flash Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Documents Actifs', value: `${validDocs}/${totalDocs}`, icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Score de Maturité', value: `${data.scoreGlobal}%`, icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: 'Actions Requises', value: `${totalDocs - validDocs}`, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Badge BSTP', value: data.isPremium ? 'Premium' : 'Standard', icon: UploadCloud, color: data.isPremium ? 'text-amber-600' : 'text-gray-600', bg: data.isPremium ? 'bg-amber-50' : 'bg-gray-50', border: data.isPremium ? 'border-amber-100' : 'border-gray-200' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-white rounded-2xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-default`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.bg} ${stat.border} border`}>
              <stat.icon size={22} className={stat.color} />
            </div>
            <div>
              <p className="text-xl font-black text-gray-900">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visuals & Score */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Smart Score Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShieldCheck size={18} className="text-indigo-500" /> Indice de Confiance
              </h3>
              <KpiScoreCard score={data.scoreGlobal} isPremium={data.isPremium} />
            </div>
          </div>

          {/* Radar Compliance */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
               Radar de Conformité Légal
            </h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">Analyse comparative via BSTP IA</p>
            <div className="flex-1 min-h-[300px]">
              <RadarChartCard scores={data.scores} />
            </div>
          </div>
        </div>

        {/* Right Column: Documents List */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Vos Pièces Justificatives</h3>
                <p className="text-xs font-medium text-gray-500 mt-1">Glissez-déposez ou uploadez vos fichiers pour analyse OCR.</p>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <DocumentStatusList 
                documents={data.documents} 
                onUploadClick={handleUploadClick} 
                isUploading={isUploading}
                uploadProgress={uploadProgress}
              />
            </div>
          </div>
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