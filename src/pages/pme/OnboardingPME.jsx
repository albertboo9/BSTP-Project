import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  ShieldCheck,
  Building,
  MapPin,
  Cpu,
  BarChart,
  UploadCloud,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Wand2,
  Sparkles
} from 'lucide-react';
import { runMaturityRadar, runDocOCR } from '../../services/ai/aiFeatures';
import TrustBadge from '../../components/ui/TrustBadge';
import RadarChartCard from '../../components/ui/RadarChartCard';

// Step Zod schemas
const identitySchema = z.object({
  raisonSociale: z.string().min(3, "La raison sociale est requise"),
  rccm: z.string().min(5, "RCCM invalide"),
  niu: z.string().min(5, "NIU invalide"),
  formeJuridique: z.string().min(1, "Veuillez sélectionner la forme juridique")
});

const sectorsSchema = z.object({
  secteurs: z.array(z.string()).min(1, "Sélectionnez au moins un secteur"),
  regions: z.array(z.string()).min(1, "Sélectionnez au moins une région de présence")
});

const capacitiesSchema = z.object({
  effectifs: z.coerce.number().min(1, "Le nombre d'employés est requis"),
  chiffreAffaires: z.coerce.number().min(100000, "Le chiffre d'affaires annuel est requis"),
  marchesRealises: z.coerce.number().min(0, "Valeur invalide")
});

const SECTEURS = ['BTP', 'Métallurgie', 'Informatique', 'Logistique', 'Agro-industrie', 'Télécoms', 'Énergie'];
const REGIONS = ['Littoral', 'Centre', 'Ouest', 'Sud-Ouest', 'Nord-Ouest', 'Adamaoua', 'Nord', 'Est', 'Sud', 'Extrême-Nord'];

export default function OnboardingPME() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [maturityResults, setMaturityResults] = useState(null);

  // Auto-evaluation scores (1-20)
  const [evaluation, setEvaluation] = useState({
    gouvernance: 12,
    qualite: 10,
    conformiteLegale: 8,
    capaciteFinanciere: 14,
    capaciteTechnique: 13,
    rseHqse: 9
  });

  // Uploaded docs list
  const [documents, setDocuments] = useState({
    rccm: null,
    niu: null,
    cnps: null,
    attestationFiscale: null
  });

  // React hook form setups
  const { register: regId, handleSubmit: handleId, formState: { errors: errId }, setValue: setIdVal } = useForm({
    resolver: zodResolver(identitySchema)
  });
  const [sectorsSelected, setSectorsSelected] = useState([]);
  const [regionsSelected, setRegionsSelected] = useState([]);
  
  const { register: regCap, handleSubmit: handleCap, formState: { errors: errCap } } = useForm({
    resolver: zodResolver(capacitiesSchema)
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Simulation OCR
  const handleDocUpload = (docType) => {
    setOcrLoading(true);
    toast.info(`Analyse intelligente du document ${docType.toUpperCase()}...`, {
      description: "Extraction automatique des champs légaux par Llama Scout OCR."
    });

    setTimeout(() => {
      setOcrLoading(false);
      setDocuments(prev => ({ ...prev, [docType]: true }));
      toast.success(`${docType.toUpperCase()} analysé avec succès`, {
        description: "Les informations de l'entreprise ont été synchronisées."
      });
      // Pre-fill some fields based on simulated OCR
      if (docType === 'rccm') {
        setIdVal('raisonSociale', 'SOCIETE INDUSTRIELLE DU CAMEROUN');
        setIdVal('rccm', 'RC/DLA/2026/B/8752');
        setIdVal('formeJuridique', 'SA');
      }
      if (docType === 'niu') {
        setIdVal('niu', 'M082612745367Y');
      }
    }, 1500);
  };

  // Run AI maturity radar benchmark
  const triggerMaturityAI = async () => {
    setLoading(true);
    try {
      const payload = {
        pmeId: 'temp_pme',
        autoEvaluation: evaluation,
        documentsDejaFournis: Object.keys(documents).filter(k => documents[k])
      };
      const res = await runMaturityRadar(payload);
      if (res.success) {
        setMaturityResults(res.data);
        toast.success("Benchmark IA Complété !", {
          description: "Le radar de maturité a été calibré avec succès."
        });
        nextStep();
      } else {
        toast.error("Erreur d'analyse IA");
      }
    } catch {
      toast.error("Erreur serveur de scoring");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = () => {
    toast.success("Profilage & Onboarding Terminé !", {
      description: "Votre dossier a été soumis pour validation finale par la BSTP."
    });
    // Redirect or update status
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4 lg:p-8 relative">
      {/* Glow Effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nexus-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8 z-10">
        
        {/* Navigation Sidebar Timeline */}
        <div className="lg:col-span-1 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 backdrop-blur">
          <div className="mb-8">
            <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-wider">Parcours Guidé PME</span>
            <h2 className="text-xl font-black text-white mt-1">Profilage Interactif</h2>
          </div>

          <div className="space-y-6 relative">
            {/* Ligne verticale de liaison */}
            <div className="absolute left-[15px] top-3 bottom-3 w-[2px] bg-gray-800" />
            
            {[
              { num: 1, label: "Identité Légale", icon: Building },
              { num: 2, label: "Secteur & Implantation", icon: MapPin },
              { num: 3, label: "Indicateurs Techniques", icon: Cpu },
              { num: 4, label: "Auto-évaluation", icon: BarChart },
              { num: 5, label: "Pièces Justificatives", icon: UploadCloud },
              { num: 6, label: "Analyse IA & Radar", icon: Sparkles }
            ].map(s => {
              const Icon = s.icon;
              const isPassed = currentStep > s.num;
              const isActive = currentStep === s.num;
              return (
                <div key={s.num} className="flex items-center gap-4 relative z-10">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isPassed ? 'bg-success-500 border-success-500 text-white' :
                    isActive ? 'bg-nexus-500 border-nexus-500 text-white shadow-lg shadow-nexus-500/30' :
                    'bg-gray-900 border-gray-800 text-gray-500'
                  }`}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isActive ? 'text-white' : isPassed ? 'text-gray-400' : 'text-gray-500'}`}>
                      {s.label}
                    </p>
                    <p className="text-[9px] text-gray-600 font-semibold uppercase">Étape {s.num}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-3 bg-gray-900/40 border border-gray-800 rounded-3xl p-6 lg:p-8 backdrop-blur flex flex-col justify-between min-h-[500px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {/* Step 1: Identity */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Identité Légale de la PME</h3>
                    <p className="text-xs text-gray-400 mt-1">Saisissez vos identifiants ou importez un document pour préremplir automatiquement.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Raison Sociale</label>
                      <input
                        type="text"
                        {...regId('raisonSociale')}
                        placeholder="Ex: SARL Cameroun Industrie"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-nexus-500 text-white"
                      />
                      {errId.raisonSociale && <p className="text-xs text-danger-500 mt-1 font-semibold">{errId.raisonSociale.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Forme Juridique</label>
                      <select
                        {...regId('formeJuridique')}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-nexus-500 text-white"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="SARL">SARL</option>
                        <option value="SA">SA</option>
                        <option value="ETS">Établissement (ETS)</option>
                      </select>
                      {errId.formeJuridique && <p className="text-xs text-danger-500 mt-1 font-semibold">{errId.formeJuridique.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Numéro RCCM</label>
                      <input
                        type="text"
                        {...regId('rccm')}
                        placeholder="Ex: RC/DLA/2026/B/1234"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-nexus-500 text-white"
                      />
                      {errId.rccm && <p className="text-xs text-danger-500 mt-1 font-semibold">{errId.rccm.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Numéro d'Identifiant Unique (NIU)</label>
                      <input
                        type="text"
                        {...regId('niu')}
                        placeholder="Ex: M123456789012X"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-nexus-500 text-white"
                      />
                      {errId.niu && <p className="text-xs text-danger-500 mt-1 font-semibold">{errId.niu.message}</p>}
                    </div>
                  </div>

                  {/* OCR Trigger CTA */}
                  <div className="p-4 bg-nexus-500/5 border border-nexus-500/10 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-nexus-400 uppercase tracking-wider">Fast-track OCR Intelligent</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Importez votre RCCM ou NIU pour remplir automatiquement ces champs légaux en 2s.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDocUpload('rccm')}
                      disabled={ocrLoading}
                      className="px-4 py-2 bg-nexus-500 hover:bg-nexus-600 text-white text-xs font-black rounded-xl transition-all"
                    >
                      Scanner RCCM
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Secteurs & Régions */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Secteurs & Zone d'Activité</h3>
                    <p className="text-xs text-gray-400 mt-1">Ceci permet le Smart Matchmaking géographique et sectoriel.</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Secteur(s) d'Activité principal</label>
                    <div className="flex flex-wrap gap-2">
                      {SECTEURS.map(s => {
                        const isSel = sectorsSelected.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setSectorsSelected(prev => isSel ? prev.filter(x => x !== s) : [...prev, s]);
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                              isSel ? 'bg-nexus-500/10 border-nexus-500 text-nexus-400' : 'bg-gray-950 border-gray-800 text-gray-500'
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Région(s) de présence</label>
                    <div className="flex flex-wrap gap-2">
                      {REGIONS.map(r => {
                        const isSel = regionsSelected.includes(r);
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              setRegionsSelected(prev => isSel ? prev.filter(x => x !== r) : [...prev, r]);
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                              isSel ? 'bg-nexus-500/10 border-nexus-500 text-nexus-400' : 'bg-gray-950 border-gray-800 text-gray-500'
                            }`}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Capacities */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Indicateurs de Performance & Capacité</h3>
                    <p className="text-xs text-gray-400 mt-1">Ces chiffres seront vérifiés lors de l'audit terrain par l'Agent BSTP.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Nombre d'employés</label>
                      <input
                        type="number"
                        {...regCap('effectifs')}
                        placeholder="Ex: 24"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-nexus-500 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Chiffre d'Affaires annuel (FCFA)</label>
                      <input
                        type="number"
                        {...regCap('chiffreAffaires')}
                        placeholder="Ex: 50000000"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-nexus-500 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Marchés Publics / Privés Réalisés</label>
                      <input
                        type="number"
                        {...regCap('marchesRealises')}
                        placeholder="Ex: 12"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-nexus-500 text-white font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Auto-évaluation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Auto-évaluation Préliminaire</h3>
                    <p className="text-xs text-gray-400 mt-1">Evaluez vous-même le score de maturité actuel de votre entreprise sur ces 6 axes clés (Note sur 20).</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'gouvernance', label: "Gouvernance & Management" },
                      { key: 'qualite', label: "Production & Qualité" },
                      { key: 'conformiteLegale', label: "Conformité Légale" },
                      { key: 'capaciteFinanciere', label: "Capacité Financière" },
                      { key: 'capaciteTechnique', label: "Capacité Technique" },
                      { key: 'rseHqse', label: "Gestion RSE & HQSE" }
                    ].map(axe => (
                      <div key={axe.key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{axe.label}</span>
                          <span className="text-xs font-black text-nexus-400">{evaluation[axe.key]}/20</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={evaluation[axe.key]}
                          onChange={(e) => setEvaluation(prev => ({ ...prev, [axe.key]: parseInt(e.target.value) }))}
                          className="w-full accent-nexus-500 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Documents */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Téléversement des Pièces Justificatives</h3>
                    <p className="text-xs text-gray-400 mt-1">Importez vos pièces obligatoires. L'IA extrait les dates de validité en temps réel.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'rccm', label: "Registre du Commerce (RCCM)" },
                      { key: 'niu', label: "Identifiant Unique (NIU)" },
                      { key: 'cnps', label: "Attestation CNPS" },
                      { key: 'attestationFiscale', label: "Attestation de Situation Fiscale" }
                    ].map(doc => (
                      <div key={doc.key} className="p-5 bg-gray-950 border border-gray-800 rounded-2xl flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold text-white">{doc.label}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Format PDF ou PNG supporté.</p>
                        </div>
                        {documents[doc.key] ? (
                          <div className="flex items-center gap-1.5 text-xs text-success-400 font-bold bg-success-500/10 px-3 py-1.5 rounded-xl border border-success-500/20">
                            <FileCheck size={14} /> Validé
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDocUpload(doc.key)}
                            className="p-2 bg-gray-900 hover:bg-gray-850 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors"
                          >
                            <UploadCloud size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Recapitulative Analysis */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Wand2 size={20} className="text-nexus-400" /> Analyse IA & Profil Qualifié Généré
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Calibré par rapport aux normes ONUDI, OHADA et Loi Cameroun Local Content 2025.</p>
                  </div>

                  {maturityResults && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      {/* Interactive Radar */}
                      <div>
                        <RadarChartCard
                          scores={{
                            gouvernance: evaluation.gouvernance,
                            qualite: evaluation.qualite,
                            conformiteLegale: evaluation.conformiteLegale,
                            capaciteFinanciere: evaluation.capaciteFinanciere,
                            capaciteTechnique: evaluation.capaciteTechnique,
                            rseHqse: evaluation.rseHqse
                          }}
                        />
                      </div>

                      {/* AI Diagnostics & Recommendations */}
                      <div className="space-y-4">
                        <div className="p-4 bg-nexus-500/5 border border-nexus-500/10 rounded-2xl">
                          <p className="text-xs font-bold text-nexus-400 uppercase tracking-wider">Diagnostic Global</p>
                          <p className="text-xs text-gray-300 mt-1 font-semibold">
                            Score prévisionnel de maturité : <span className="text-white font-black text-sm">{maturityResults.scoreGlobal}/100</span>.
                            Votre entreprise est éligible au programme d'accompagnement de la BSTP.
                          </p>
                        </div>

                        <div className="space-y-2.5 max-h-56 overflow-y-auto">
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Écarts et actions correctives IA</p>
                          {maturityResults.ecarts.map((ecart, i) => (
                            <div key={i} className="p-3 bg-gray-950 border border-gray-850 rounded-xl space-y-1">
                              <p className="text-[10px] text-nexus-400 font-black uppercase">{ecart.axe}</p>
                              <p className="text-[11px] text-gray-300 font-medium">{ecart.constat}</p>
                              <p className="text-[10px] text-success-400 font-semibold">✓ {ecart.recommandation}</p>
                              {ecart.referenceNormative && (
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Ref: {ecart.referenceNormative}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-gray-800/80 pt-6 mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 1 || loading}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Précédent
            </button>

            {currentStep === 4 ? (
              <button
                onClick={triggerMaturityAI}
                disabled={loading}
                className="flex items-center gap-1.5 px-5 py-3 bg-nexus-500 hover:bg-nexus-600 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-nexus-500/20"
              >
                {loading ? "Calcul en cours..." : (
                  <>
                    Générer Analyse IA <ChevronRight size={16} />
                  </>
                )}
              </button>
            ) : currentStep === 6 ? (
              <button
                onClick={handleFinalSubmit}
                className="flex items-center gap-1.5 px-5 py-3 bg-success-600 hover:bg-success-700 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-success-600/20"
              >
                Valider & Soumettre le Dossier
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={currentStep === 5 && !Object.values(documents).some(v => v)}
                className="flex items-center gap-1.5 px-5 py-3 bg-nexus-500 hover:bg-nexus-600 text-white text-xs font-black rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continuer <ChevronRight size={16} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
