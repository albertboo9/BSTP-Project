import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublishOpportunityForm from '../../components/donneur-ordre/PublishOpportunityForm';
import SmartMatchmakingIA from '../../components/donneur-ordre/SmartMatchmakingIA';
import { FilePlus2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PublishOpportunityPage() {
  const navigate = useNavigate();
  const [publishedData, setPublishedData] = useState(null);

  const handleSuccess = (data) => {
    // Reveal the AI matchmaking view
    setPublishedData(data);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Espace Sourcing Sécurisé</p>
          <h1 className="text-3xl font-black tracking-tight">Publier un Marché / Appel d'Offres</h1>
          <p className="text-white/70 mt-2 font-medium text-sm max-w-lg">
            Diffusez votre besoin technique auprès de l'écosystème. Notre algorithme intelligent sélectionnera les PME les plus adaptées.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <FilePlus2 size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Dynamic Content */}
      <AnimatePresence mode="wait">
        {!publishedData ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PublishOpportunityForm onSuccess={handleSuccess} />
          </motion.div>
        ) : (
          <motion.div key="matchmaking" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-success-50 border border-success-200 rounded-2xl p-6 text-center shadow-soft">
              <h2 className="text-xl font-black text-success-700">Appel d'Offres Publié avec Succès !</h2>
              <p className="text-sm font-medium text-success-600 mt-2">Le moteur d'intelligence artificielle a déjà présélectionné les PME les plus pertinentes pour votre besoin.</p>
            </div>
            
            {/* The SmartMatchmaking Component directly analyzing the new AO */}
            <SmartMatchmakingIA defaultAoId="NEW-AO" titleOverride={`Recommandations IA pour : ${publishedData.titre}`} />
            
            <div className="flex justify-center mt-6">
              <button onClick={() => navigate('/donneur-ordre/analytics')} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold text-sm shadow-sm transition-all">
                Voir toutes mes analyses <ArrowLeft size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
