import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Loader2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  User,
  Home,
  Hash,
  ArrowRight,
} from "lucide-react";

// Formes juridiques camerounaises
const LEGAL_FORMS = [
  { value: "ei", label: "Entreprise Individuelle (EI)" },
  { value: "sarl", label: "Société à Responsabilité Limitée (SARL)" },
  { value: "snc", label: "Société en Nom Collectif (SNC)" },
  { value: "scs", label: "Société en Commandite Simple (SCS)" },
  { value: "sa", label: "Société Anonyme (SA)" },
  { value: "sas", label: "Société par Actions Simplifiée (SAS)" },
  { value: "gie", label: "Groupement d'Intérêt Économique (GIE)" },
  { value: "autoentrepreneur", label: "Auto-Entrepreneur" },
];

// Secteurs d'activité
const SECTORS = [
  { value: "commerce", label: "Commerce" },
  { value: "services", label: "Services" },
  { value: "industrie", label: "Industrie" },
  { value: "agriculture", label: "Agriculture" },
  { value: "btp", label: "BTP / Construction" },
  { value: "transport", label: "Transport" },
  { value: "sante", label: "Santé" },
  { value: "education", label: "Éducation" },
  { value: "telecom", label: "Télécommunications" },
  { value: " restauration", label: "Restauration" },
  { value: "autre", label: "Autre" },
];

// Régions du Cameroun
const REGIONS = [
  { value: "adamawa", label: "Adamaoua" },
  { value: "centre", label: "Centre (Yaoundé)" },
  { value: "est", label: "Est" },
  { value: "extreme_nord", label: "Extrême-Nord" },
  { value: "littoral", label: "Littoral (Douala)" },
  { value: "nord", label: "Nord" },
  { value: "nord_oueste", label: "Nord-Ouest" },
  { value: "ouest", label: "Ouest" },
  { value: "sud", label: "Sud" },
  { value: "sud_oueste", label: "Sud-Ouest" },
];

const STEPS = [
  {
    id: 1,
    title: "Identité",
    icon: Building2,
    description: "Informations de base",
  },
  {
    id: 2,
    title: "Localisation",
    icon: MapPin,
    description: "Adresse du siège",
  },
  {
    id: 3,
    title: "Identifiants",
    icon: Hash,
    description: "Documents officiels",
  },
];

export default function CompanyCompletionModal({
  isOpen,
  onClose,
  onSubmit,
  isDemoMode = false,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    legalForm: "",
    creationDate: "",
    sector: "",
    region: "",
    siege: "",
    rccm: "",
    niu: "",
    acf: "",
    nif: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        companyName: "",
        legalForm: "",
        creationDate: "",
        sector: "",
        region: "",
        siege: "",
        rccm: "",
        niu: "",
        acf: "",
        nif: "",
      });
      setErrors({});
      setIsProcessing(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.companyName || formData.companyName.trim().length < 2) {
        newErrors.companyName = "Le nom de l'entreprise est requis";
      }
      if (!formData.legalForm) {
        newErrors.legalForm = "Sélectionnez une forme juridique";
      }
      if (!formData.creationDate) {
        newErrors.creationDate = "La date de création est requise";
      }
      if (!formData.sector) {
        newErrors.sector = "Sélectionnez un secteur";
      }
    }

    if (step === 2) {
      if (!formData.region) {
        newErrors.region = "Sélectionnez une région";
      }
      if (!formData.siege || formData.siege.trim().length < 5) {
        newErrors.siege = "L'adresse du siège est requise";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      setIsProcessing(true);

      // Simulate agent processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);

        setTimeout(() => {
          onSubmit(formData);
        }, 2000);
      }, 2500);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  // Processing Step
  if (isProcessing) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Traitement en cours
                </h3>
                <p className="text-gray-600 mb-6">
                  Un agent MINPMEESA verifie vos informations.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Temps estime: quelques secondes
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Success Step
  if (isSuccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Acces accorde
                </h3>
                <p className="text-gray-600 mb-6">
                  Votre demande a ete validée. Vous avez maintenant acces aux
                  parcours financement et normalisation.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-green-800 font-medium">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    Acces valide jusqu'au:{" "}
                    {new Date(
                      Date.now() + 365 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Form Steps
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Informations Entreprise
                    </h2>
                    <p className="text-indigo-100 text-sm">
                      Completez votre profil pour acceder aux parcours
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center mt-6 gap-2">
                  {STEPS.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                          currentStep > step.id
                            ? "bg-green-500 text-white"
                            : currentStep === step.id
                              ? "bg-white text-indigo-600"
                              : "bg-white/30 text-white"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle size={16} />
                        ) : (
                          step.id
                        )}
                      </div>
                      {index < STEPS.length - 1 && (
                        <div
                          className={`w-8 h-0.5 mx-1 ${
                            currentStep > step.id
                              ? "bg-green-500"
                              : "bg-white/30"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center mt-2">
                  <span className="text-white text-sm font-medium">
                    Etape {currentStep} sur {STEPS.length}
                  </span>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-indigo-600" />
                        Identite de l'entreprise
                      </h3>

                      <div>
                        <label className={labelClass}>
                          Denomination sociale *
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={`${inputClass} ${errors.companyName ? "border-red-500" : ""}`}
                          placeholder="Ex: ABC Solutions SARL"
                        />
                        {errors.companyName && (
                          <p className={errorClass}>{errors.companyName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>
                            Forme juridique *
                          </label>
                          <select
                            name="legalForm"
                            value={formData.legalForm}
                            onChange={handleChange}
                            className={`${inputClass} ${errors.legalForm ? "border-red-500" : ""}`}
                          >
                            <option value="">Selectionnez</option>
                            {LEGAL_FORMS.map((form) => (
                              <option key={form.value} value={form.value}>
                                {form.label}
                              </option>
                            ))}
                          </select>
                          {errors.legalForm && (
                            <p className={errorClass}>{errors.legalForm}</p>
                          )}
                        </div>

                        <div>
                          <label className={labelClass}>
                            Date de creation *
                          </label>
                          <input
                            type="date"
                            name="creationDate"
                            value={formData.creationDate}
                            onChange={handleChange}
                            className={`${inputClass} ${errors.creationDate ? "border-red-500" : ""}`}
                          />
                          {errors.creationDate && (
                            <p className={errorClass}>{errors.creationDate}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>
                          Secteur d'activite *
                        </label>
                        <select
                          name="sector"
                          value={formData.sector}
                          onChange={handleChange}
                          className={`${inputClass} ${errors.sector ? "border-red-500" : ""}`}
                        >
                          <option value="">Selectionnez</option>
                          {SECTORS.map((sector) => (
                            <option key={sector.value} value={sector.value}>
                              {sector.label}
                            </option>
                          ))}
                        </select>
                        {errors.sector && (
                          <p className={errorClass}>{errors.sector}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Home className="w-5 h-5 text-indigo-600" />
                        Localisation du siege
                      </h3>

                      <div>
                        <label className={labelClass}>Region *</label>
                        <select
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          className={`${inputClass} ${errors.region ? "border-red-500" : ""}`}
                        >
                          <option value="">Selectionnez</option>
                          {REGIONS.map((region) => (
                            <option key={region.value} value={region.value}>
                              {region.label}
                            </option>
                          ))}
                        </select>
                        {errors.region && (
                          <p className={errorClass}>{errors.region}</p>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>Adresse du siege *</label>
                        <input
                          type="text"
                          name="siege"
                          value={formData.siege}
                          onChange={handleChange}
                          className={`${inputClass} ${errors.siege ? "border-red-500" : ""}`}
                          placeholder="BP, Rue, Quartier, Ville"
                        />
                        {errors.siege && (
                          <p className={errorClass}>{errors.siege}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        Identifiants (Optionnel pour nouvelles entreprises)
                      </h3>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                        <p className="text-sm text-blue-800">
                          Ces informations sont optionnelles si vous etes en
                          cours de creation. Vous pourrez les ajouter plus tard.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>RCCM</label>
                          <input
                            type="text"
                            name="rccm"
                            value={formData.rccm}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="RC/YA/2023/000123"
                          />
                        </div>

                        <div>
                          <label className={labelClass}>NIU</label>
                          <input
                            type="text"
                            name="niu"
                            value={formData.niu}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="M01234567890"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>NIF (Optionnel)</label>
                          <input
                            type="text"
                            name="nif"
                            value={formData.nif}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Numero d'Identification Fiscale"
                          />
                        </div>

                        <div>
                          <label className={labelClass}>ACF (Optionnel)</label>
                          <input
                            type="text"
                            name="acf"
                            value={formData.acf}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Attestation de Conformite Fiscale"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-100 flex justify-between">
                <button
                  onClick={currentStep === 1 ? onClose : handleBack}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                >
                  <ChevronLeft size={18} />
                  {currentStep === 1 ? "Annuler" : "Retour"}
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
                  >
                    Suivant
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Soumettre ma demande
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
