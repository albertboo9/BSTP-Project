import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Send, Check, ChevronRight, ChevronLeft, Building2, MapPin, BadgeDollarSign, FileText, Sparkles } from 'lucide-react';

const SECTEURS = ['BTP', 'Informatique', 'Agro-industrie', 'Transport', 'Énergie', 'Hydrocarbures', 'Télécoms', 'Industrie'];
const REGIONS = ['Littoral', 'Centre', 'Ouest', 'Sud-Ouest', 'Nord-Ouest', 'Adamaoua', 'Nord', 'Extrême-Nord', 'Est', 'Sud'];
const BADGES = [
  { value: 'bronze', label: 'Bronze', desc: 'Auto-évaluation validée', color: 'bg-bronze-500' },
  { value: 'argent', label: 'Argent', desc: 'Vérification Terrain validée', color: 'bg-silver-500' },
  { value: 'or', label: 'Or', desc: 'Audit complet + Certifications ISO', color: 'bg-gold-500' },
];

const STEPS = [
  { id: 'info', label: 'Infos générales', icon: FileText },
  { id: 'ciblage', label: 'Ciblage', icon: MapPin },
  { id: 'budget', label: 'Budget & Qualité', icon: BadgeDollarSign },
  { id: 'review', label: 'Vérification', icon: Sparkles },
];

export default function PublishOpportunityForm({ onSuccess }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    titre: '',
    description: '',
    secteur: '',
    region: '',
    budgetFcfa: '',
    badgeMinimum: 'bronze',
  });

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const canProceed = () => {
    if (step === 0) return form.titre.length >= 10 && form.description.length >= 20;
    if (step === 1) return form.secteur && form.region;
    if (step === 2) return form.budgetFcfa >= 100000;
    return true;
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Appel d\'Offres Publié !', {
        description: 'Le Smart Matchmaking IA a ciblé les PME éligibles et envoyé les notifications.',
      });
      setForm({ titre: '', description: '', secteur: '', region: '', budgetFcfa: '', badgeMinimum: 'bronze' });
      setStep(0);
      if (onSuccess) onSuccess(form);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-3xl mx-auto"
    >
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isDone = i < step;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive ? 'bg-nexus-500 text-white shadow-md' :
                isDone ? 'bg-success-50 text-success-700' : 'bg-gray-50 text-gray-400'
              }`}>
                {isDone ? <Check size={14} /> : <Icon size={14} />}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded-full ${i < step ? 'bg-success-500' : 'bg-gray-100'}`} />
              )}
            </div>
          );
        })}
      </div>

      {step === 0 && (
        <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Titre du marché</label>
            <input type="text" placeholder="Ex: Construction de hangars de stockage industriels"
              value={form.titre} onChange={e => update('titre', e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent transition-all" />
            <p className="text-xs text-gray-400 mt-1.5 font-medium">{form.titre.length}/10 caractères min</p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Description détaillée</label>
            <textarea rows={4} placeholder="Décrivez précisément votre besoin technique, les jalons de livraison requis..."
              value={form.description} onChange={e => update('description', e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent transition-all resize-none" />
            <p className="text-xs text-gray-400 mt-1.5 font-medium">{form.description.length}/20 caractères min</p>
          </div>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Secteur d'activité</label>
            <div className="flex flex-wrap gap-2">{SECTEURS.map(s => (
              <button key={s} onClick={() => update('secteur', s)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${form.secteur === s ? 'bg-nexus-50 border-nexus-500 text-nexus-700 shadow-sm' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50'}`}>{s}</button>
            ))}</div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Région de réalisation <span className="text-danger-500">*</span></label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">{REGIONS.map(r => (
              <button key={r} onClick={() => update('region', r)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${form.region === r ? 'bg-nexus-50 border-nexus-500 text-nexus-700 shadow-sm' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'}`}>{r}</button>
            ))}</div>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Budget estimé (FCFA)</label>
            <div className="relative">
              <input type="number" placeholder="Ex: 25000000" value={form.budgetFcfa}
                onChange={e => update('budgetFcfa', e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent transition-all" />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">FCFA</span>
            </div>
            {form.budgetFcfa >= 100000 && <p className="text-xs text-success-600 font-bold mt-1.5">{(form.budgetFcfa / 1e6).toFixed(1)} Millions FCFA</p>}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Badge qualité minimum requis</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{BADGES.map(b => (
              <button key={b.value} onClick={() => update('badgeMinimum', b.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${form.badgeMinimum === b.value ? 'border-nexus-500 bg-nexus-50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                <div className={`w-3 h-3 rounded-full mb-2 ${b.color}`} />
                <p className="text-sm font-bold text-gray-900">{b.label}</p>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">{b.desc}</p>
              </button>
            ))}</div>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div className="bg-nexus-50 border border-nexus-100 rounded-2xl p-6">
            <h3 className="font-bold text-nexus-900 mb-4">Récapitulatif de votre appel d'offres</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Titre</span><span className="font-bold text-gray-900 text-right max-w-[60%]">{form.titre}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Secteur</span><span className="font-bold text-gray-900">{form.secteur}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Région</span><span className="font-bold text-gray-900">{form.region}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Budget</span><span className="font-bold text-gray-900">{(form.budgetFcfa / 1e6).toFixed(1)}M FCFA</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Badge min.</span><span className="font-bold text-gray-900 capitalize">{form.badgeMinimum}</span></div>
            </div>
          </div>
          <div className="bg-success-50 border border-success-100 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-success-600" />
              <span className="text-xs font-bold text-success-700">Le Smart Matchmaking IA va cibler automatiquement les PME éligibles dès la publication.</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} /> Retour
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 bg-nexus-500 text-white rounded-xl font-bold text-sm hover:bg-nexus-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-nexus-100"
          >
            Suivant <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-nexus-500 text-white rounded-xl font-bold text-sm hover:bg-nexus-600 transition-all disabled:opacity-40 shadow-md shadow-nexus-100"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <><Send size={16} /> Publier et Matcher</>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}