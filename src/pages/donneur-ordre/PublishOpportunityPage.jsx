import { motion } from 'framer-motion';
import PublishOpportunityForm from '../../components/donneur-ordre/PublishOpportunityForm';
import { FilePlus2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PublishOpportunityPage() {
  const navigate = useNavigate();

  const handleSuccess = (data) => {
    // Navigate to sourcing analytics to see candidates
    navigate('/donneur-ordre/analytics');
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

      {/* Form Form */}
      <PublishOpportunityForm onSuccess={handleSuccess} />

    </div>
  );
}
