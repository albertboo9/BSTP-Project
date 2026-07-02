import React, { useState } from 'react';
import { usePasseportStore } from '../../../stores/passeportStore';
import RadarChartCard from '../../../components/pme/passeport/RadarChartCard';
import DocumentStatusList from '../../../components/pme/passeport/DocumentStatusList';
import DocumentUploadModal from '../../../components/pme/passeport/DocumentUploadModal';
import KpiScoreCard from '../../../components/pme/passeport/KpiScoreCard';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PasseportPME() {
  const { data } = usePasseportStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedDocName, setSelectedDocName] = useState('');

  const handleUploadClick = (id, name) => {
    setSelectedDocId(id);
    setSelectedDocName(name);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Passeport Numérique</h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            Centralisez vos documents légaux pour rassurer les donneurs d'ordres
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm border border-indigo-100">
          <Info size={18} />
          <span>L'IA analyse vos documents en temps réel</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI Score - Gauche */}
        <div className="lg:col-span-1">
          <KpiScoreCard score={data.scoreGlobal} isPremium={data.isPremium} />
        </div>

        {/* Radar - Milieu */}
        <div className="lg:col-span-1">
          <RadarChartCard scores={data.scores} />
        </div>

        {/* Documents - Droite */}
        <div className="lg:col-span-1">
          <DocumentStatusList documents={data.documents} onUploadClick={handleUploadClick} />
        </div>
      </div>

      <DocumentUploadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        docId={selectedDocId}
        docName={selectedDocName}
      />
    </div>
  );
}
