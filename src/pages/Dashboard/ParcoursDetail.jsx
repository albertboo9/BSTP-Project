import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  PlayCircle,
  Users,
  ChevronRight,
  Lock,
  CheckCircle,
  X,
  Maximize2,
  Download,
  Info,
  Clock,
  ArrowRight,
  TrendingUp,
  Target,
  MessageCircle,
  Award,
  Building2,
  AlertTriangle,
  Lightbulb,
  Shield,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { mockParcours } from "../../data/parcours.mock";
import { useParcours } from "../../context/ParcoursContext";
import {
  ResourceCard,
  FormationsCard,
  PartnersCard,
  SocialCard,
  InfoPointCard,
  OpportunitiesCard,
  PremiumTabs,
  BentoGrid,
  GlassContainer,
  DirectoryCard,
  CommunityCard,
} from "../../components/parcours/ParcoursSections";
import ResourceViewerModal from "../../components/ui/ResourceViewerModal";
import CompanyCompletionModal from "../../components/ui/CompanyCompletionModal";

function ParcoursDetail() {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [viewingResource, setViewingResource] = useState(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [selectedFinancingFormation, setSelectedFinancingFormation] =
    useState(null);
  const [financingRequestStep, setFinancingRequestStep] = useState(1);
  const [financingReason, setFinancingReason] = useState("");
  const [financingUsage, setFinancingUsage] = useState("");
  const [financingGoals, setFinancingGoals] = useState("");
  const [hasBusinessAnswer, setHasBusinessAnswer] = useState(null);

  const {
    canAccessParcours,
    completeParcours,
    saveCompanyInfo,
    isParcoursCompleted,
    companyInfo,
  } = useParcours();

  const parcours = mockParcours.find((p) => p.id === id);

  // Vérifier l'accès au parcours
  useEffect(() => {
    if (parcours && parcours.accessLevel === "conditionnel") {
      if (!canAccessParcours(parcours.id, parcours.accessLevel)) {
        setAccessDenied(true);
      }
    }
  }, [parcours]);

  // Gérer la fermeture du modal - rediriger vers la liste des parcours
  const handleCloseAccessDenied = () => {
    window.location.href = '/dashboard/parcours';
  };

  // Gérer le clic sur le bouton entreprise existante
  const handleHasBusiness = () => {
    setHasBusinessAnswer(true);
  };

  // Gérer le clic sur le bouton création d'entreprise  
  const handleNoBusiness = () => {
    window.location.href = '/dashboard/parcours/creation';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  if (!parcours) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Parcours introuvable
        </h2>
        <Link
          to="/dashboard/parcours"
          className="text-primaryBlue font-bold flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const iconMap = {
    BookOpen,
    FileText,
    PlayCircle,
    Users,
    Info,
    MessageCircle,
    Target,
    TrendingUp,
  };

  const steps = parcours.steps.map((step) => ({
    ...step,
    icon: iconMap[step.icon] || Info,
  }));

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const renderStepContent = (stepId) => {
    switch (stepId) {
      case "toolbox":
        return (
          <BentoGrid>
            {parcours.toolbox?.map((tool, idx) => (
              <div
                key={tool.id}
                className={`${idx === 0 ? "md:col-span-12 lg:col-span-8" : "md:col-span-6 lg:col-span-4"}`}
              >
                <ResourceCard item={tool} onClick={setViewingResource} />
              </div>
            ))}
          </BentoGrid>
        );
      case "info":
        return (
          <BentoGrid>
            <div className="md:col-span-12 lg:col-span-7">
              <InfoPointCard items={parcours.infoPoint || []} />
            </div>
            <div className="md:col-span-12 lg:col-span-5 space-y-6">
              <GlassContainer className="bg-primary/5 border-primary/10">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="text-primaryBlue" size={18} /> Vision
                  Stratégique
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed italic">
                  "{parcours.concept}"
                </p>
              </GlassContainer>
              <GlassContainer className="bg-amber-500/5 border-amber-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                    <Info size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900">Note de l'Expert</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  "La réussite de votre parcours dépend de la compréhension
                  rigoureuse des textes en vigueur."
                </p>
              </GlassContainer>
            </div>
          </BentoGrid>
        );
      case "formations":
        return (
          <div className="space-y-8">
            <FormationsCard
              formations={parcours.formations || []}
              onFormationClick={(formation) => {
                if (formation.lmsUrl) {
                  window.open(formation.lmsUrl, "_blank");
                }
              }}
              onFinancingClick={(formation) => {
                setSelectedFinancingFormation(formation);
              }}
            />
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-900 p-12 rounded-[48px] flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primaryBlue/20 rounded-full blur-[120px] -mr-32 -mt-32" />
              <div className="relative z-10 flex-1">
                <span className="text-primaryBlue font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
                  Assistance Live
                </span>
                <h4 className="text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                  Besoin d'un éclairage personnalisé ?
                </h4>
                <p className="text-gray-400 text-lg font-medium leading-relaxed">
                  Nos conseillers techniques sont à votre écoute pour lever vos
                  doutes stratégiques.
                </p>
              </div>
              <button className="relative z-10 px-10 py-5 bg-primaryBlue text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-white hover:text-gray-900 transition-all shadow-xl shadow-primaryBlue/20">
                Parler à un expert
              </button>
            </motion.div>
          </div>
        );
      case "partners":
        return (
          <BentoGrid>
            <div className="md:col-span-12">
              <DirectoryCard 
                items={parcours.directory || []} 
                title="Annuaire des Partenaires"
                subtitle="Centres de Formalités & Organisations"
              />
            </div>
          </BentoGrid>
        );
      case "projects":
        return (
          <BentoGrid>
            {parcours.projects?.map((project, idx) => (
              <div key={project.id} className="md:col-span-6">
                <GlassContainer
                  className={`${idx === 0 ? "bg-indigo-50/30" : "bg-emerald-50/30"}`}
                >
                  <div className="mb-8">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${idx === 0 ? "bg-indigo-600 text-white" : "bg-emerald-600 text-white"}`}
                    >
                      {idx === 0 ? (
                        <TrendingUp size={28} />
                      ) : (
                        <Target size={28} />
                      )}
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                      {project.title}
                    </h4>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      Accélérez votre croissance en soumettant votre dossier aux
                      commissions d'expertise dédiées.
                    </p>
                  </div>
                  <button
                    className={`w-full py-5 rounded-[20px] font-black uppercase tracking-widest text-xs shadow-xl transition-all ${idx === 0 ? "bg-indigo-600 text-white shadow-indigo-100" : "bg-emerald-600 text-white shadow-emerald-100"}`}
                  >
                    {project.action === "invest"
                      ? "Explorer les projets"
                      : "Nouvelle soumission"}
                  </button>
                </GlassContainer>
              </div>
            ))}
          </BentoGrid>
        );
      case "opportunities":
        return (
          <BentoGrid>
            <div className="md:col-span-12 lg:col-span-8">
              <OpportunitiesCard items={parcours.opportunities || []} />
            </div>
            <div className="md:col-span-12 lg:col-span-4">
              <SocialCard />
            </div>
          </BentoGrid>
        );
      case "social":
        return (
          <BentoGrid>
            <div className="md:col-span-12">
              <CommunityCard 
                channels={parcours.community?.channels || []}
                recentMessages={parcours.community?.recentMessages || []}
                onlineMembers={parcours.community?.onlineMembers || []}
                stats={parcours.community?.stats || { members: 0, messages: 0, connections: 0 }}
              />
            </div>
          </BentoGrid>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{parcours.title} — Campus PME</title>
      </Helmet>

      {/* Navbar minimaliste - z-60 pour être AU-DESSUS du header global */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-[60]">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link
            to="/dashboard/parcours"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Retour</span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {parcours.progress}%
              </span>
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${parcours.progress}%` }}
                  className="h-full bg-primaryBlue"
                />
              </div>
            </div>

            {/* Finish parcours button - only for creation parcours */}
            {id === "creation" && (
              <button
                onClick={() => setShowCompanyModal(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isParcoursCompleted("creation")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:from-indigo-700 hover:to-purple-700"
                }`}
              >
                {isParcoursCompleted("creation") ? (
                  <>
                    <CheckCircle size={14} /> Terminé
                  </>
                ) : (
                  <>
                    <Building2 size={14} /> Finaliser
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Tabs fines - z-59 */}
      <div className="sticky top-12 z-[59] bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <PremiumTabs
            steps={steps}
            activeStep={activeStep}
            onStepClick={setActiveStep}
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[activeStep].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent(steps[activeStep].id)}

            {/* Navigation simple */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
                className={`text-sm font-medium transition-colors ${activeStep === 0 ? "text-gray-300" : "text-gray-500 hover:text-gray-900"}`}
              >
                ← Précédent
              </button>
              {activeStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-primaryBlue text-white text-sm font-medium rounded-lg hover:bg-primaryBlueDark transition-colors"
                >
                  Suivant →
                </button>
              ) : id === "creation" ? (
                <button
                  onClick={() => setShowCompanyModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center gap-2"
                >
                  {isParcoursCompleted("creation") ? (
                    <>
                      <CheckCircle size={16} /> Parcours terminé
                    </>
                  ) : (
                    "Terminer le parcours"
                  )}
                </button>
              ) : (
                <Link
                  to="/dashboard/parcours"
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
                >
                  Terminer
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Resource Viewer Modal - Nouveau composant intégré */}
      <ResourceViewerModal
        isOpen={!!viewingResource}
        onClose={() => setViewingResource(null)}
        resource={viewingResource}
        size="xl"
      />

      {/* Company Completion Modal - Pour le parcours Création */}
      <CompanyCompletionModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        onSubmit={(companyData) => {
          saveCompanyInfo(companyData);
          completeParcours("creation");
          setShowCompanyModal(false);
        }}
      />

      {/* Access Denied Modal - First ask if user has business */}
      {accessDenied && hasBusinessAnswer === null && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]" />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center pointer-events-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
                Accès restreint
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Pour accéder au parcours{" "}
                <strong className="text-indigo-600">{parcours?.title}</strong>,
                vous devez d'abord valider votre entreprise.
              </p>

              <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-indigo-800 font-medium">
                  Avez-vous déjà une entreprise créée et immatriculée au
                  Cameroun ?
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleHasBusiness}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Oui, j'ai une entreprise
                </button>
                <button
                  onClick={handleNoBusiness}
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <Building2 size={20} />
                  Non, je veux la créer
                </button>
                <button
                  onClick={handleCloseAccessDenied}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  ← Retour aux parcours
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* If no business - redirect to creation parcours */}
      {accessDenied && hasBusinessAnswer === false && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]" />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center pointer-events-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                <BookOpen className="w-8 h-8 text-indigo-500" />
                Créez votre entreprise
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Pour accéder au parcours{" "}
                <strong className="text-indigo-600">{parcours?.title}</strong>,
                vous devez d'abord suivre le parcours{" "}
                <strong>Création d'Entreprise</strong>.
              </p>

              <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-indigo-800 font-medium flex items-center gap-2">
                  <Lightbulb size={16} className="text-amber-500" />
                  Ce parcours vous guidera pour formaliser votre entreprise au
                  Cameroun.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleNoBusiness}
                  className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <Building2 size={20} />
                  Commencer le parcours Création
                </button>
                <button
                  onClick={handleCloseAccessDenied}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  ← Retour aux parcours
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* If has business - show company form */}
      {accessDenied && hasBusinessAnswer === true && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]" />
          <CompanyCompletionModal
            isOpen={true}
            onClose={handleCloseAccessDenied}
            onSubmit={(companyData) => {
              saveCompanyInfo(companyData);
              completeParcours("creation");
              setAccessDenied(false);
              setHasBusinessAnswer(null);
            }}
          />
        </>
      )}

      {/* Formation Financing Request Modal */}
      {selectedFinancingFormation && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]" onClick={() => {
            setSelectedFinancingFormation(null);
            setFinancingRequestStep(1);
            setFinancingReason("");
            setFinancingUsage("");
            setFinancingGoals("");
          }} />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center pointer-events-auto max-h-[90vh] overflow-y-auto relative">
              {/* Close button */}
              <button
                onClick={() => {
                  setSelectedFinancingFormation(null);
                  setFinancingRequestStep(1);
                  setFinancingReason("");
                  setFinancingUsage("");
                  setFinancingGoals("");
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Step 1: Initial Info */}
              {financingRequestStep === 1 && (
                <>
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <GraduationCap className="w-10 h-10 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                    <Shield className="w-8 h-8 text-amber-500" />
                    Formation financée par le MINPMEESA
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    La formation <strong className="text-indigo-600">{selectedFinancingFormation.title}</strong> est financée par le MINPMEESA.
                  </p>
                  <div className="bg-amber-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-amber-800 font-medium flex items-start gap-2">
                      <Lightbulb size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                      Pour accéder à cette formation, veuillez nous décrire pourquoi vous avez besoin de cette formation et comment vous comptez l'utiliser.
                    </p>
                  </div>
                  <button
                    onClick={() => setFinancingRequestStep(2)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <FileText size={18} />
                    Soumettre une demande
                  </button>
                </>
              )}

              {/* Step 2: Request Form */}
              {financingRequestStep === 2 && (
                <>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Votre demande de financement
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Formation: <strong className="text-indigo-600">{selectedFinancingFormation.title}</strong>
                  </p>

                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pourquoi avez-vous besoin de cette formation ?
                      </label>
                      <textarea
                        value={financingReason}
                        onChange={(e) => setFinancingReason(e.target.value)}
                        placeholder="Décrivez votre motivation..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Comment allez-vous utiliser cette formation ?
                      </label>
                      <textarea
                        value={financingUsage}
                        onChange={(e) => setFinancingUsage(e.target.value)}
                        placeholder="Expliquez comment vous appliquerez ces connaissances..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quels objectifs professionnels visez-vous ?
                      </label>
                      <textarea
                        value={financingGoals}
                        onChange={(e) => setFinancingGoals(e.target.value)}
                        placeholder="Définissez vos objectifs..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setFinancingRequestStep(1)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      ← Retour
                    </button>
                    <button
                      onClick={() => {
                        setFinancingRequestStep(3);
                        // Simulate agent review
                        setTimeout(() => {
                          setFinancingRequestStep(4);
                        }, 3000);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all font-semibold"
                    >
                      Envoyer ma demande
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Agent Review Simulation */}
              {financingRequestStep === 3 && (
                <>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Traitement en cours
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Un agent du MINPMEESA examine votre demande...
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Analyse de votre profil...
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Vérification des informations...
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      Finalisation de l'approbation...
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: Approval Result */}
              {financingRequestStep === 4 && (
                <>
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Demande approuvée !
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Félicitations ! Votre demande de financement pour la formation <strong className="text-indigo-600">{selectedFinancingFormation.title}</strong> a été approuvée par un agent du MINPMEESA.
                  </p>
                  <div className="bg-green-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-green-800 font-medium flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      Vous pouvez maintenant accéder à cette formation gratuitement.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setSelectedFinancingFormation(null);
                        setFinancingRequestStep(1);
                        setFinancingReason("");
                        setFinancingUsage("");
                        setFinancingGoals("");
                        if (selectedFinancingFormation?.lmsUrl) {
                          window.open(selectedFinancingFormation.lmsUrl, "_blank");
                        }
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <PlayCircle size={18} />
                      Commencer la formation
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFinancingFormation(null);
                        setFinancingRequestStep(1);
                        setFinancingReason("");
                        setFinancingUsage("");
                        setFinancingGoals("");
                      }}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Fermer
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ParcoursDetail;
