import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { runMaturityRadar } from '../../services/ai/aiFeatures';
import RadarChartCard from '../../components/ui/RadarChartCard';
import {
  Building2, MapPin, BarChart3, Upload, Sparkles, CheckCircle2, ChevronRight, ChevronLeft,
  Shuffle, Target, Users, DollarSign, Briefcase, ScanLine, PartyPopper, Rocket, ArrowRight
} from 'lucide-react';

const SECTEURS = ['BTP', 'Métallurgie', 'Informatique', 'Logistique', 'Agro-industrie', 'Télécoms', 'Énergie', 'Industrie'];
const REGIONS = ['Littoral', 'Centre', 'Ouest', 'Sud-Ouest', 'Nord-Ouest', 'Adamaoua', 'Nord', 'Est', 'Sud', 'Extrême-Nord'];

const STEPS = [
  { id: 'identity', label: 'Identité', icon: Building2, desc: 'Vos informations légales' },
  { id: 'sectors', label: 'Ciblage', icon: MapPin, desc: 'Secteurs & régions' },
  { id: 'capacity', label: 'Capacité', icon: BarChart3, desc: 'Indicateurs clés' },
  { id: 'evaluation', label: 'Auto-évaluation', icon: Target, desc: 'Votre maturité' },
  { id: 'documents', label: 'Documents', icon: Upload, desc: 'Pièces justificatives' },
  { id: 'analysis', label: 'Analyse IA', icon: Sparkles, desc: 'Radar & scoring' },
];

const FORM_LAW = ['SARL', 'SA', 'ETS', 'SAS', 'SNC'];

function ProgressParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-nexus-400/30"
          initial={{ x: '50%', y: '100%', opacity: 1 }}
          animate={{ x: `${30 + i * 30}%`, y: '-10%', opacity: 0 }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}
    </div>
  );
}

function StepIcon({ step, currentStep, index }) {
  const Icon = step.icon;
  const isDone = currentStep > index;
  const isActive = currentStep === index;
  return (
    <motion.div
      className={`relative w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
        isDone ? 'bg-success-500 text-white shadow-lg shadow-success-200' :
        isActive ? 'bg-nexus-500 text-white shadow-lg shadow-nexus-200' :
        'bg-gray-100 text-gray-400'
      }`}
      animate={isActive ? { scale: [1, 1.08, 1] } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      {isDone ? <CheckCircle2 size={18} /> : <Icon size={18} />}
      {isActive && <span className="absolute -inset-1 rounded-2xl border-2 border-nexus-200 animate-ping opacity-40" />}
    </motion.div>
  );
}

function SlidePanel({ children, isVisible }) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={isVisible}
          initial={{ opacity: 0, x: 30, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function OnboardingPME() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maturityResults, setMaturityResults] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [form, setForm] = useState({
    raisonSociale: '', formeJuridique: '', rccm: '', niu: '',
    secteurs: [], regions: [],
    effectifs: '', chiffreAffaires: '', marchesRealises: '',
  });

  const [evaluation, setEvaluation] = useState({ gouvernance: 12, qualite: 10, conformiteLegale: 8, capaciteFinanciere: 14, capaciteTechnique: 13, rseHqse: 9 });
  const [docs, setDocs] = useState({ rccm: false, niu: false, cnps: false, fiscal: false });
  const [ocrLoading, setOcrLoading] = useState('');

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const toggleArr = (field, value) => setForm(f => ({
    ...f, [field]: f[field].includes(value) ? f[field].filter(x => x !== value) : [...f[field], value]
  }));

  const canProceed = () => {
    if (step === 0) return form.raisonSociale.length >= 3 && form.formeJuridique && form.rccm.length >= 3;
    if (step === 1) return form.secteurs.length > 0 && form.regions.length > 0;
    if (step === 2) return form.effectifs > 0 && form.chiffreAffaires >= 100000;
    if (step === 3) return true;
    if (step === 4) return Object.values(docs).some(v => v);
    return true;
  };

  const handleOCR = (docType) => {
    setOcrLoading(docType);
    toast.info(`Analyse intelligente du ${docType.toUpperCase()}...`, {
      description: "Extraction des champs par Llama Scout OCR"
    });
    setTimeout(() => {
      setOcrLoading('');
      setDocs(d => ({ ...d, [docType]: true }));
      if (docType === 'rccm') {
        update('raisonSociale', 'SOCIETE INDUSTRIELLE DU CAMEROUN');
        update('rccm', 'RC/DLA/2026/B/8752');
        update('formeJuridique', 'SA');
      }
      if (docType === 'niu') update('niu', 'M082612745367Y');
      toast.success(`${docType.toUpperCase()} analysé avec succès !`, {
        description: "Champs pré-remplis automatiquement."
      });
    }, 2000);
  };

  const triggerAI = async () => {
    setLoading(true);
    toast.loading('Analyse de maturité en cours...', { id: 'maturity' });
    try {
      const res = await runMaturityRadar({
        pmeId: 'temp',
        autoEvaluation: evaluation,
        documentsDejaFournis: Object.keys(docs).filter(k => docs[k])
      });
      if (res.success) {
        setMaturityResults(res.data);
        toast.success('Analyse IA terminée !', { id: 'maturity', description: 'Votre radar de maturité a été généré.' });
        setStep(5);
      } else {
        toast.error('Erreur d\'analyse', { id: 'maturity' });
      }
    } catch {
      toast.error('Service IA indisponible', { id: 'maturity' });
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success('Félicitations ! Votre profil est complet.', {
      description: 'Vous allez être redirigé vers votre tableau de bord.',
      icon: <PartyPopper className="text-success-500" />
    });
    setTimeout(() => window.location.href = '/dashboard', 2000);
  };

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nexus-900 via-nexus-800 to-nexus-900 flex items-center justify-center p-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <PartyPopper size={48} className="text-gold-400" />
          </motion.div>
          <h1 className="text-4xl font-black text-white mb-4">Profil Complété !</h1>
          <p className="text-white/60 text-lg mb-8">Votre entreprise est désormais prête à recevoir des opportunités. Bienvenue dans l'écosystème BSTP.</p>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-white flex flex-col lg:flex-row">
      {/* Left sidebar — Steps timeline */}
      <div className="lg:w-80 bg-white border-r border-gray-100 p-6 lg:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-nexus-500 rounded-2xl flex items-center justify-center">
            <Rocket size={20} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] text-nexus-500 font-black uppercase tracking-widest">Espace Croissance</p>
            <h2 className="text-lg font-black text-gray-900">Profilage Guidé</h2>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-nexus-500 to-nexus-400 rounded-full"
            initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.6 }} />
          <ProgressParticles />
        </div>

        <div className="space-y-1">
          {STEPS.map((s, i) => {
            const isActive = step === i;
            const isDone = step > i;
            return (
              <motion.button
                key={s.id}
                onClick={() => isDone && setStep(i)}
                className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left ${
                  isActive ? 'bg-nexus-50 border border-nexus-100' :
                  isDone ? 'opacity-70 hover:opacity-100 cursor-pointer' : 'opacity-40'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <StepIcon step={s} currentStep={step} index={i} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${isActive ? 'text-nexus-700' : isDone ? 'text-gray-700' : 'text-gray-400'}`}>
                    {s.label}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium truncate">{s.desc}</p>
                </div>
                {isDone && <CheckCircle2 size={14} className="text-success-500 flex-shrink-0" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 flex flex-col p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
          {/* Current step header */}
          <motion.div key={step} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <span className="text-[10px] text-nexus-500 font-black uppercase tracking-widest">ÉTAPE {step + 1}/{STEPS.length}</span>
            <h2 className="text-2xl font-black text-gray-900 mt-1">{STEPS[step].label}</h2>
            <p className="text-sm text-gray-500 mt-1">{STEPS[step].desc}</p>
          </motion.div>

          {/* Step content */}
          <div className="flex-1">
            <SlidePanel isVisible={step === 0}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Raison Sociale</label>
                    <input type="text" value={form.raisonSociale} onChange={e => update('raisonSociale', e.target.value)}
                      placeholder="Ex: SARL Cameroun Industrie"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Forme Juridique</label>
                    <div className="flex gap-2">{FORM_LAW.map(f => (
                      <button key={f} onClick={() => update('formeJuridique', f)}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold border-2 transition-all ${form.formeJuridique === f ? 'bg-nexus-50 border-nexus-500 text-nexus-700' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'}`}>{f}</button>
                    ))}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Numéro RCCM</label>
                    <input type="text" value={form.rccm} onChange={e => update('rccm', e.target.value)}
                      placeholder="Ex: RC/DLA/2026/B/1234"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">NIU</label>
                    <input type="text" value={form.niu} onChange={e => update('niu', e.target.value)}
                      placeholder="Ex: M123456789012X"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent transition-all" />
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-gradient-to-r from-nexus-50 to-indigo-50/50 border border-nexus-100 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ScanLine size={24} className="text-nexus-500" />
                    <div>
                      <h4 className="text-sm font-bold text-nexus-800">OCR Intelligent</h4>
                      <p className="text-xs text-gray-500">Importez votre RCCM pour préremplir automatiquement</p>
                    </div>
                  </div>
                  <button onClick={() => handleOCR('rccm')} disabled={!!ocrLoading}
                    className="px-5 py-2.5 bg-nexus-500 hover:bg-nexus-600 text-white text-xs font-black rounded-xl transition-all flex items-center gap-2 shadow-md shadow-nexus-200">
                    {ocrLoading === 'rccm' ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : <><ScanLine size={14} /> Scanner RCCM</>}
                  </button>
                </motion.div>
              </div>
            </SlidePanel>

            <SlidePanel isVisible={step === 1}>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Secteurs d'activité <span className="text-danger-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {SECTEURS.map(s => {
                      const sel = form.secteurs.includes(s);
                      return (
                        <motion.button key={s} whileTap={{ scale: 0.95 }} onClick={() => toggleArr('secteurs', s)}
                          className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                            sel ? 'bg-nexus-50 border-nexus-500 text-nexus-700 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}>
                          {sel && <CheckCircle2 size={14} className="inline mr-1.5" />}{s}
                        </motion.button>
                      );
                    })}
                  </div>
                  {form.secteurs.length > 0 && <p className="text-xs text-success-600 font-bold mt-2 flex items-center gap-1"><CheckCircle2 size={12} /> {form.secteurs.length} secteur(s) sélectionné(s)</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Régions de présence <span className="text-danger-500">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {REGIONS.map(r => {
                      const sel = form.regions.includes(r);
                      return (
                        <motion.button key={r} whileTap={{ scale: 0.95 }} onClick={() => toggleArr('regions', r)}
                          className={`px-3 py-3 rounded-xl text-xs font-bold border-2 transition-all ${
                            sel ? 'bg-nexus-50 border-nexus-500 text-nexus-700 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}>
                          {sel && <CheckCircle2 size={12} className="inline mr-1" />}{r}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SlidePanel>

            <SlidePanel isVisible={step === 2}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={18} className="text-nexus-500" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Effectifs</span>
                    </div>
                    <input type="number" value={form.effectifs} onChange={e => update('effectifs', e.target.value)}
                      placeholder="Ex: 24"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-nexus-500" />
                  </div>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign size={18} className="text-gold-500" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">CA annuel</span>
                    </div>
                    <div className="relative">
                      <input type="number" value={form.chiffreAffaires} onChange={e => update('chiffreAffaires', e.target.value)}
                        placeholder="Ex: 50000000"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-nexus-500" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">FCFA</span>
                    </div>
                  </div>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase size={18} className="text-success-500" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Marchés réalisés</span>
                    </div>
                    <input type="number" value={form.marchesRealises} onChange={e => update('marchesRealises', e.target.value)}
                      placeholder="Ex: 12"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-nexus-500" />
                  </div>
                </div>
                {form.effectifs > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-success-50 border border-success-100 rounded-xl flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-success-500" />
                    <div>
                      <p className="text-sm font-bold text-success-700">Profil technique renseigné</p>
                      <p className="text-xs text-success-600">Ces données seront vérifiées lors de l'audit terrain.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </SlidePanel>

            <SlidePanel isVisible={step === 3}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'gouvernance', label: 'Gouvernance' },
                    { key: 'qualite', label: 'Qualité' },
                    { key: 'conformiteLegale', label: 'Conformité Légale' },
                    { key: 'capaciteFinanciere', label: 'Capacité Financière' },
                    { key: 'capaciteTechnique', label: 'Capacité Technique' },
                    { key: 'rseHqse', label: 'RSE & HQSE' },
                  ].map(axe => (
                    <div key={axe.key} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-700">{axe.label}</span>
                        <motion.span key={evaluation[axe.key]} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-sm font-black text-nexus-600 bg-white px-2 py-0.5 rounded-lg border border-nexus-100">
                          {evaluation[axe.key]}/20
                        </motion.span>
                      </div>
                      <input type="range" min="0" max="20" value={evaluation[axe.key]}
                        onChange={e => setEvaluation(prev => ({ ...prev, [axe.key]: parseInt(e.target.value) }))}
                        className="w-full accent-nexus-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                      <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
                        <span>Débutant</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  ))}
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-gradient-to-r from-nexus-500 to-nexus-600 text-white rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles size={24} />
                    <div>
                      <p className="font-bold">Analyse IA prête</p>
                      <p className="text-xs text-white/70">Générer le benchmark ONUDI/OHADA</p>
                    </div>
                  </div>
                  <span className="text-2xl font-black">{Math.round(Object.values(evaluation).reduce((a, b) => a + b, 0) / 6 * 5 / 6)}%</span>
                </motion.div>
              </div>
            </SlidePanel>

            <SlidePanel isVisible={step === 4}>
              <div className="space-y-4">
                {[
                  { key: 'rccm', label: 'Registre du Commerce (RCCM)' },
                  { key: 'niu', label: 'Identifiant Unique (NIU)' },
                  { key: 'cnps', label: 'Attestation CNPS' },
                  { key: 'fiscal', label: 'Attestation Fiscale' },
                ].map(doc => (
                  <motion.div key={doc.key} whileHover={{ scale: 1.005 }}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      docs[doc.key] ? 'bg-success-50 border-success-200' : 'bg-gray-50 border-gray-100 hover:border-nexus-200'
                    }`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {docs[doc.key] ? (
                          <CheckCircle2 size={22} className="text-success-500" />
                        ) : (
                          <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
                            <Upload size={18} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className={`text-sm font-bold ${docs[doc.key] ? 'text-success-700' : 'text-gray-900'}`}>{doc.label}</p>
                          <p className="text-[10px] text-gray-400 font-medium">Format PDF ou PNG</p>
                        </div>
                      </div>
                      {!docs[doc.key] ? (
                        <button onClick={() => handleOCR(doc.key)} disabled={!!ocrLoading}
                          className="px-4 py-2.5 bg-nexus-500 hover:bg-nexus-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2">
                          {ocrLoading === doc.key ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                          ) : <><ScanLine size={14} /> Scanner</>}
                        </button>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-success-600">
                          <CheckCircle2 size={14} /> Validé
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center gap-3 p-4 bg-nexus-50 border border-nexus-100 rounded-xl">
                  <ScanLine size={20} className="text-nexus-500" />
                  <p className="text-xs text-nexus-700 font-medium">L'IA extrait automatiquement les dates de validité de chaque document.</p>
                </div>
              </div>
            </SlidePanel>

            <SlidePanel isVisible={step === 5}>
              {maturityResults ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Radar de Maturité</h3>
                      <RadarChartCard data={[
                        { axe: 'Juridique', score: evaluation.gouvernance },
                        { axe: 'Fiscal', score: evaluation.capaciteFinanciere },
                        { axe: 'CNPS', score: evaluation.conformiteLegale },
                        { axe: 'Qualité', score: evaluation.qualite },
                        { axe: 'Technique', score: evaluation.capaciteTechnique },
                        { axe: 'RSE', score: evaluation.rseHqse },
                      ]} scoreGlobal={maturityResults.scoreGlobal} />
                    </div>
                    <div className="space-y-4">
                      <div className="p-5 bg-gradient-to-br from-nexus-500 to-nexus-600 text-white rounded-2xl">
                        <p className="text-xs font-bold uppercase tracking-wider opacity-70">Score Global</p>
                        <p className="text-5xl font-black mt-1">{maturityResults.scoreGlobal}<span className="text-2xl opacity-70">/100</span></p>
                        <p className="text-sm text-white/70 mt-2">Éligible au programme d'accompagnement BSTP</p>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recommandations IA</p>
                        {maturityResults.ecarts.map((e, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                            <p className="text-[10px] font-black text-nexus-600 uppercase">{e.axe}</p>
                            <p className="text-xs text-gray-600 mt-1">{e.constat}</p>
                            <p className="text-xs text-success-600 font-semibold mt-1">✓ {e.recommandation}</p>
                            {e.referenceNormative && <p className="text-[9px] text-gray-400 font-bold mt-1">Ref: {e.referenceNormative}</p>}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="w-16 h-16 border-3 border-nexus-200 border-t-nexus-500 rounded-full mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900">Génération de l'analyse...</h3>
                  <p className="text-sm text-gray-500 mt-2">Comparaison avec les normes ONUDI, OHADA et Loi 2025/010 en cours</p>
                </div>
              )}
            </SlidePanel>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0 || loading}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-30">
              <ChevronLeft size={16} /> Retour
            </button>

            {step === 3 ? (
              <motion.button onClick={triggerAI} disabled={loading} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-nexus-500 to-nexus-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-nexus-200 hover:shadow-xl hover:shadow-nexus-300 transition-all">
                {loading ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> Analyse en cours...</>
                ) : (
                  <><Sparkles size={16} /> Générer l'Analyse IA</>
                )}
              </motion.button>
            ) : step === 5 && maturityResults ? (
              <motion.button onClick={handleSubmit} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-success-200 hover:shadow-xl transition-all">
                <Rocket size={16} /> Finaliser mon Profil <ArrowRight size={16} />
              </motion.button>
            ) : (
              <motion.button onClick={() => setStep(s => s + 1)} disabled={!canProceed() || loading} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-nexus-500 text-white rounded-xl font-bold text-sm hover:bg-nexus-600 transition-all disabled:opacity-40 shadow-md">
                Suivant <ChevronRight size={16} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}