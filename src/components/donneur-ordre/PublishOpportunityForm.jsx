import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Send, FileText, CheckCircle } from 'lucide-react';

const schema = z.object({
  titre: z.string().min(10, "Le titre doit faire au moins 10 caractères"),
  description: z.string().min(20, "La description doit faire au moins 20 caractères"),
  secteur: z.string().min(1, "Veuillez sélectionner un secteur"),
  region: z.string().min(1, "Veuillez sélectionner une région (obligatoire pour le géofencing)"),
  budgetFcfa: z.coerce.number().min(100000, "Le budget doit être d'au moins 100 000 FCFA"),
  badgeMinimum: z.enum(["bronze", "argent", "or"]),
});

const SECTEURS = ['BTP', 'Informatique', 'Agro-industrie', 'Transport', 'Énergie', 'Hydrocarbures'];
const REGIONS = ['Littoral', 'Centre', 'Ouest', 'Sud-Ouest', 'Nord-Ouest', 'Adamaoua', 'Nord', 'Est', 'Sud'];

export default function PublishOpportunityForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      badgeMinimum: 'bronze',
    }
  });

  const onSubmit = (data) => {
    setLoading(true);
    // Simulate API Matchmaking score calculation
    setTimeout(() => {
      setLoading(false);
      toast.success('Appel d\'Offres Publié !', {
        description: 'Le Smart Matchmaking IA a ciblé les PME éligibles et envoyé les notifications.',
        icon: <CheckCircle className="text-success-500" />
      });
      reset();
      if (onSuccess) onSuccess(data);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-nexus-500 text-white rounded-xl flex items-center justify-center">
          <FileText size={20} />
        </div>
        <div>
          <h2 className="text-lg font-black text-gray-900">Publier un Appel d'Offres / Consultation</h2>
          <p className="text-xs font-semibold text-gray-400 mt-0.5">Le ciblage géographique (géofencing) est appliqué automatiquement</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Titre */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Titre du marché</label>
          <input
            type="text"
            placeholder="Ex: Construction de hangars de stockage industriels"
            {...register('titre')}
            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 ${errors.titre ? 'border-danger-500' : 'border-gray-200'}`}
          />
          {errors.titre && <p className="text-xs font-bold text-danger-700 mt-1">{errors.titre.message}</p>}
        </div>

        {/* Secteur & Region */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Secteur d'Activité</label>
            <select
              {...register('secteur')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500"
            >
              <option value="">Sélectionner...</option>
              {SECTEURS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.secteur && <p className="text-xs font-bold text-danger-700 mt-1">{errors.secteur.message}</p>}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Région de réalisation</label>
            <select
              {...register('region')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500"
            >
              <option value="">Sélectionner...</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.region && <p className="text-xs font-bold text-danger-700 mt-1">{errors.region.message}</p>}
          </div>
        </div>

        {/* Budget & Badge Min */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Budget estimé (FCFA)</label>
            <input
              type="number"
              placeholder="Ex: 25000000"
              {...register('budgetFcfa')}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 ${errors.budgetFcfa ? 'border-danger-500' : 'border-gray-200'}`}
            />
            {errors.budgetFcfa && <p className="text-xs font-bold text-danger-700 mt-1">{errors.budgetFcfa.message}</p>}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Badge Qualité requis (Certifié BSTP)</label>
            <select
              {...register('badgeMinimum')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500"
            >
              <option value="bronze">Bronze (Auto-évaluation validée)</option>
              <option value="argent">Argent (Vérification Terrain validée)</option>
              <option value="or">Or (Audit complet + Certifications ISO)</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Description détaillée des travaux</label>
          <textarea
            rows={4}
            placeholder="Décrivez précisément votre besoin technique, les jalons de livraison requis..."
            {...register('description')}
            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 ${errors.description ? 'border-danger-500' : 'border-gray-200'}`}
          />
          {errors.description && <p className="text-xs font-bold text-danger-700 mt-1">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-nexus-500 hover:bg-nexus-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <Send size={16} />
              <span>Publier et Matcher les PME</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
