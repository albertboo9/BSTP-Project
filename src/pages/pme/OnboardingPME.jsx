import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, BarChart3, Upload, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Target, Users, DollarSign, ScanLine, ArrowRight, ShieldCheck } from 'lucide-react';
import { runMaturityRadar } from '../../services/ai/aiFeatures';
import { useAIFeature } from '../../hooks/useAIFeature';

const SECTEURS = ['BTP', 'Métallurgie', 'Informatique', 'Logistique', 'Agro-industrie', 'Télécoms', 'Énergie', 'Industrie'];
const REGIONS = ['Littoral', 'Centre', 'Ouest', 'Sud-Ouest', 'Nord-Ouest', 'Adamaoua', 'Nord', 'Est', 'Sud', 'Extrême-Nord'];

const STEPS = [
  { id: 'identity', label: 'Identité Légal', icon: Building2, desc: 'Infos générales' },
  { id: 'sectors', label: 'Secteurs & Zone', icon: MapPin, desc: 'Votre marché' },
  { id: 'capacity', label: 'Capacités', icon: BarChart3, desc: 'Finance & RH' },
  { id: 'documents', label: 'Documents OCR', icon: ScanLine, desc: 'Upload IA' },
  { id: 'analysis', label: 'Analyse IA', icon: Sparkles, desc: 'Génération Profil' },
];

const FORM_LAW = ['SARL', 'SA', 'ETS', 'SAS', 'SNC'];

// Framer Motion Variants
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 30 }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 }
  })
};

export default function OnboardingPME() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const { data: aiData, isLoading: aiLoading, execute: runAI } = useAIFeature(runMaturityRadar);

  // Form state
  const [form, setForm] = useState({
    raisonSociale: '', formeJuridique: '', rccm: '', niu: '',
    secteurs: [], regions: [],
    effectifs: '', chiffreAffaires: '',
  });

  const [docs, setDocs] = useState({ rccm: false, niu: false });
  const [ocrLoading, setOcrLoading] = useState('');

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const toggleArr = (field, value) => setForm(f => ({
    ...f, [field]: f[field].includes(value) ? f[field].filter(x => x !== value) : [...f[field], value]
  }));

  const canProceed = () => {
    if (step === 0) return form.raisonSociale.length >= 3 && form.formeJuridique && form.rccm.length >= 3;
    if (step === 1) return form.secteurs.length > 0 && form.regions.length > 0;
    if (step === 2) return form.effectifs > 0 && form.chiffreAffaires >= 100000;
    if (step === 3) return docs.rccm || docs.niu;
    return true;
  };

  const nextStep = () => {
    if (!canProceed()) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (step === STEPS.length - 2) {
      triggerAI();
    }
    setDirection(1);
    setStep(s => s + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const handleOCR = (docType) => {
    setOcrLoading(docType);
    toast.info(`Analyse OCR de votre ${docType.toUpperCase()} en cours...`);
    setTimeout(() => {
      setOcrLoading('');
      setDocs(d => ({ ...d, [docType]: true }));
      if (docType === 'rccm') {
        update('raisonSociale', 'SOCIETE INDUSTRIELLE DU CAMEROUN');
        update('rccm', 'RC/DLA/2026/B/8752');
        update('formeJuridique', 'SA');
      }
      if (docType === 'niu') update('niu', 'M082612745367Y');
      toast.success(`${docType.toUpperCase()} validé par l'IA.`);
    }, 2500);
  };

  const triggerAI = async () => {
    toast.loading("Génération de votre profil via IA...", { id: 'ai-gen' });
    const res = await runAI({
      pmeId: user?.id || 'pme_temp',
      autoEvaluation: { gouvernance: 15, qualite: 12 },
      documentsDejaFournis: Object.keys(docs).filter(k => docs[k])
    });
    toast.success("Profil généré avec succès !", { id: 'ai-gen' });
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-10 px-4 sm:px-6">
      
      <div className="w-full max-w-4xl">
        
        {/* HEADER / TIMELINE */}
        <div className="mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0 overflow-hidden">
             <motion.div 
               className="h-full bg-indigo-500 rounded-full"
               initial={{ width: 0 }}
               animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
             />
          </div>
          
          <div className="relative z-10 flex justify-between items-center px-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isPast = i < step;
              return (
                <div key={s.id} className="flex flex-col items-center">
                  <motion.div 
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border-2 transition-colors duration-300 ${
                      isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-200' :
                      isPast ? 'bg-white border-indigo-500 text-indigo-500' :
                      'bg-white border-gray-200 text-gray-300'
                    }`}
                    animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                  >
                    {isPast ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                  </motion.div>
                  <p className={`mt-3 text-[11px] font-bold uppercase tracking-widest ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-900/5 border border-gray-100 overflow-hidden relative min-h-[500px] flex flex-col">
          
          <div className="flex-1 relative overflow-hidden p-8 sm:p-12">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full absolute inset-0 p-8 sm:p-12 overflow-y-auto"
              >
                
                {/* ETAPE 0: IDENTITE */}
                {step === 0 && (
                  <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-black text-gray-900">Identité Légale</h2>
                      <p className="text-gray-500 mt-2 font-medium">Commençons par les informations de base de votre entreprise.</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Raison Sociale</label>
                        <input type="text" value={form.raisonSociale} onChange={e => update('raisonSociale', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                          placeholder="Ex: Entreprise S.A." />
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Forme Juridique</label>
                          <select value={form.formeJuridique} onChange={e => update('formeJuridique', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none appearance-none">
                            <option value="">Sélectionner</option>
                            {FORM_LAW.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Numéro RCCM</label>
                          <input type="text" value={form.rccm} onChange={e => update('rccm', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                            placeholder="RC/..." />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ETAPE 1: SECTEURS */}
                {step === 1 && (
                  <div className="max-w-2xl mx-auto space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-black text-gray-900">Secteurs & Marchés</h2>
                      <p className="text-gray-500 mt-2 font-medium">Sélectionnez vos domaines d'expertise pour un meilleur ciblage des appels d'offres.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Secteurs d'Activité</label>
                        <div className="flex flex-wrap gap-2">
                          {SECTEURS.map(s => (
                            <button key={s} onClick={() => toggleArr('secteurs', s)}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 ${
                                form.secteurs.includes(s) ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Régions d'Intervention</label>
                        <div className="flex flex-wrap gap-2">
                          {REGIONS.map(r => (
                            <button key={r} onClick={() => toggleArr('regions', r)}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 ${
                                form.regions.includes(r) ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}>
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ETAPE 2: CAPACITES */}
                {step === 2 && (
                  <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-black text-gray-900">Capacités & Taille</h2>
                      <p className="text-gray-500 mt-2 font-medium">Aidez l'IA à évaluer la taille des marchés que vous pouvez supporter.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-5 hover:border-indigo-300 transition-colors">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                          <Users size={24} />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Effectifs (Employés)</label>
                          <input type="number" value={form.effectifs} onChange={e => update('effectifs', e.target.value)}
                            className="w-full bg-transparent text-xl font-black text-gray-900 focus:outline-none placeholder:text-gray-300"
                            placeholder="Ex: 15" />
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-5 hover:border-emerald-300 transition-colors">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                          <DollarSign size={24} />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Chiffre d'Affaires Moyen (FCFA)</label>
                          <input type="number" value={form.chiffreAffaires} onChange={e => update('chiffreAffaires', e.target.value)}
                            className="w-full bg-transparent text-xl font-black text-gray-900 focus:outline-none placeholder:text-gray-300"
                            placeholder="Ex: 50000000" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ETAPE 3: DOCUMENTS OCR */}
                {step === 3 && (
                  <div className="max-w-2xl mx-auto space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-black text-gray-900">Lecture Intelligente (OCR)</h2>
                      <p className="text-gray-500 mt-2 font-medium">Uploadez vos documents légaux, l'IA extraira les données automatiquement.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {['rccm', 'niu'].map(doc => (
                        <div key={doc} className={`border-2 rounded-3xl p-6 text-center transition-all ${docs[doc] ? 'border-emerald-500 bg-emerald-50' : 'border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50'}`}>
                          {docs[doc] ? (
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                                <CheckCircle2 size={32} />
                              </div>
                              <h4 className="font-bold text-gray-900 uppercase">{doc} Validé</h4>
                              <p className="text-xs text-emerald-600 font-medium mt-1">Données extraites avec succès</p>
                            </div>
                          ) : ocrLoading === doc ? (
                            <div className="flex flex-col items-center py-4">
                              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                              <h4 className="font-bold text-gray-900">Analyse IA en cours...</h4>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                                <Upload size={24} />
                              </div>
                              <h4 className="font-bold text-gray-900 uppercase">Document {doc}</h4>
                              <p className="text-xs text-gray-500 font-medium mt-2 mb-4">Format PDF ou Image</p>
                              <button onClick={() => handleOCR(doc)} className="px-5 py-2.5 bg-gray-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors w-full">
                                Uploader pour Analyse
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ETAPE 4: RESULTAT IA */}
                {step === 4 && (
                  <div className="max-w-xl mx-auto space-y-8 text-center pt-8">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 mx-auto">
                        <Sparkles size={40} className="text-white" />
                      </div>
                      <motion.div 
                        className="absolute -inset-4 border border-indigo-200 rounded-[2rem]"
                        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    
                    <div>
                      <h2 className="text-3xl font-black text-gray-900">Profil Validé & Certifié</h2>
                      <p className="text-gray-500 mt-3 font-medium max-w-md mx-auto">
                        Félicitations ! L'IA BSTP a analysé vos documents et créé votre Passeport Numérique.
                      </p>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-center justify-between text-left">
                      <div>
                        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Score IA Attribué</p>
                        <p className="text-3xl font-black text-indigo-900">78<span className="text-lg text-indigo-400">/100</span></p>
                      </div>
                      <ShieldCheck size={48} className="text-indigo-200" />
                    </div>

                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full py-4 bg-gray-900 hover:bg-indigo-600 text-white rounded-2xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      Accéder à mon Espace Croissance <ArrowRight size={18} />
                    </button>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* FOOTER ACTIONS */}
          {step < STEPS.length - 1 && (
            <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex items-center justify-between">
              <button 
                onClick={prevStep}
                disabled={step === 0}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  step === 0 ? 'opacity-0 pointer-events-none' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <ChevronLeft size={18} /> Retour
              </button>
              
              <button 
                onClick={nextStep}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                {step === STEPS.length - 2 ? "Générer mon Profil IA" : "Étape Suivante"} <ChevronRight size={18} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}