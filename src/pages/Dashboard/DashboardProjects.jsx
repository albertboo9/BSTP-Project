import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Briefcase,
  Target,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Eye,
  MessageSquare,
  Send,
  X,
  ChevronRight,
  FileText,
  DollarSign,
  Calendar,
  Building,
  Building2,
  GraduationCap,
} from "lucide-react";

// Project purposes/goals
const PROJECT_PURPOSES = [
  { id: "financement", label: "Demande de Financement", icon: DollarSign, color: "#10b981" },
  { id: "partenariat", label: "Partenariat Stratégique", icon: Users, color: "#6366f1" },
  { id: "commercial", label: "Opportunité Commerciale", icon: TrendingUp, color: "#f59e0b" },
  { id: "certification", label: "Certification/Qualité", icon: CheckCircle, color: "#8b5cf6" },
  { id: "formation", label: "Formation/Sensibilisation", icon: Briefcase, color: "#ec4899" },
  { id: "autre", label: "Autre", icon: AlertCircle, color: "#6b7280" },
];

// Mock projects data (visible to all)
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Extension unité de production boulangerie",
    description: "Projet d'extension de notre unité de production de boulangerie pour répondre à la demande croissante.",
    objective: "Augmenter la capacité de production de 50%",
    budget: 15000000,
    purpose: "financement",
    companyName: "Bakery Plus SARL",
    status: "approved",
    submittedBy: "user1@example.com",
    submittedAt: "2024-01-15",
    agentReview: {
      reviewedAt: "2024-01-20",
      agentName: "Agent MINPMEESA",
      comments: "Projet validé. Bien fondé économique confirmé.",
    },
  },
  {
    id: 2,
    title: "Partenariat distribution produits artisanaux",
    description: "Recherche de partenaires pour la distribution de produits artisanaux camerounais en Europe.",
    objective: "Établir un réseau de distribution en France et en Belgique",
    budget: 5000000,
    purpose: "partenariat",
    companyName: "Artisanart Cameroon",
    status: "pending",
    submittedBy: "user2@example.com",
    submittedAt: "2024-02-01",
    agentReview: null,
  },
  {
    id: 3,
    title: "Certification ISO 9001",
    description: "Mise en place d'un système de management qualité pour obtenir la certification ISO 9001.",
    objective: "Obtenir la certification ISO 9001 dans les 12 mois",
    budget: 8000000,
    purpose: "certification",
    companyName: "TechServices SARL",
    status: "rejected",
    submittedBy: "user3@example.com",
    submittedAt: "2024-01-20",
    agentReview: {
      reviewedAt: "2024-01-25",
      agentName: "Agent MINPMEESA",
      comments: "Projet rejeté. Veuillez fournir un business plan détaillé avant nouvelle soumission.",
    },
  },
];

export default function DashboardProjects() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEligibilityModal, setShowEligibilityModal] = useState(() => {
    // Don't show modal if user already completed parcours
    const hasCompletedParcours = user?.parcoursProgress?.creation?.status === "completed" || 
      user?.parcoursProgress?.creation?.progress >= 100;
    return !hasCompletedParcours;
  });
  const [hasConfirmedEligibility, setHasConfirmedEligibility] = useState(false);

  // Check if user can submit projects (must have completed creation parcours or confirmed eligibility)
  const canSubmitProjects = 
    hasConfirmedEligibility || 
    user?.parcoursProgress?.creation?.status === "completed" || 
    user?.parcoursProgress?.creation?.progress >= 100;

  // Handle eligibility confirmation
  const handleEligibilityConfirm = (hasEnterprise) => {
    setHasConfirmedEligibility(true);
    setShowEligibilityModal(false);
    if (!hasEnterprise) {
      navigate("/dashboard/parcours/creation");
    }
  };

  // Load projects from localStorage or use initial
  useEffect(() => {
    const stored = localStorage.getItem("dashboard_projects");
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem("dashboard_projects", JSON.stringify(INITIAL_PROJECTS));
    }
  }, []);

  // Save projects to localStorage
  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem("dashboard_projects", JSON.stringify(newProjects));
  };

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    objective: "",
    budget: "",
    purpose: "",
    companyName: "",
    businessPlan: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, businessPlan: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmitProjects) return;

    setIsSubmitting(true);

    // Simulate agent review after 2 seconds
    setTimeout(() => {
      const newProject = {
        id: Date.now(),
        ...formData,
        budget: parseInt(formData.budget),
        status: "pending",
        submittedBy: user?.email || "user@example.com",
        submittedAt: new Date().toISOString().split("T")[0],
        agentReview: null,
      };

      const updatedProjects = [newProject, ...projects];
      saveProjects(updatedProjects);

      setFormData({
        title: "",
        description: "",
        objective: "",
        budget: "",
        purpose: "",
        companyName: "",
        businessPlan: null,
      });

      setShowForm(false);
      setShowSuccessModal(true);
      setIsSubmitting(false);

      // Close success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }, 2000);
  };

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { icon: Clock, label: "En attente", color: "#f59e0b", bg: "#fef3c7" },
      approved: { icon: CheckCircle, label: "Approuvé", color: "#10b981", bg: "#d1fae5" },
      rejected: { icon: XCircle, label: "Rejeté", color: "#ef4444", bg: "#fee2e2" },
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
        style={{ backgroundColor: badge.bg, color: badge.color }}
      >
        <Icon size={12} />
        {badge.label}
      </span>
    );
  };

  const getPurposeInfo = (purposeId) => {
    return PROJECT_PURPOSES.find((p) => p.id === purposeId) || PROJECT_PURPOSES[5];
  };

  const formatBudget = (amount) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Eligibility Modal - Show on first visit */}
      <AnimatePresence>
        {showEligibilityModal && hasConfirmedEligibility === false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="text-indigo-600" size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Accès aux Projets</h2>
                <p className="text-gray-600">
                  Pour soumettre un projet, vous devez avoir une entreprise immatriculée au Cameroun.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleEligibilityConfirm(true)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-colors flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Building className="text-green-600" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">J'ai une entreprise</p>
                    <p className="text-sm text-gray-500">Je peux soumettre mes projets</p>
                  </div>
                </button>

                <button
                  onClick={() => handleEligibilityConfirm(false)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-colors flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="text-amber-600" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Je vais créer mon entreprise</p>
                    <p className="text-sm text-gray-500">Commencer le parcours de création</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projets & Opportunités</h1>
        <p className="text-gray-600">
          Soumettez vos projets pour demandes de financement, partenariats et plus encore.
        </p>
      </div>

      {/* Access Warning */}
      {!canSubmitProjects && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-amber-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-amber-800">Accès restreint</h3>
            <p className="text-amber-700 text-sm">
              Pour soumettre un projet, vous devez d'abord compléter le parcours « Création d'Entreprise ».
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Projets</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Briefcase className="text-indigo-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">En Attente</p>
              <p className="text-2xl font-bold text-amber-600">
                {projects.filter((p) => p.status === "pending").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="text-amber-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approuvés</p>
              <p className="text-2xl font-bold text-green-600">
                {projects.filter((p) => p.status === "approved").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejetés</p>
              <p className="text-2xl font-bold text-red-600">
                {projects.filter((p) => p.status === "rejected").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="text-red-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Filter */}
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {f === "all" ? "Tous" : f === "pending" ? "En attente" : f === "approved" ? "Approuvés" : "Rejetés"}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        {canSubmitProjects && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Soumettre un Projet
          </motion.button>
        )}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredProjects.map((project, index) => {
            const purposeInfo = getPurposeInfo(project.purpose);
            const PurposeIcon = purposeInfo.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${purposeInfo.color}20` }}
                    >
                      <PurposeIcon size={24} style={{ color: purposeInfo.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                        {getStatusBadge(project.status)}
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Building size={14} />
                          {project.companyName}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} />
                          {formatBudget(project.budget)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(project.submittedAt).toLocaleDateString("fr-CM")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 flex-shrink-0" size={24} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-500">Aucun projet ne correspond au filtre sélectionné.</p>
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Soumettre un Projet</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du Projet *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Ex: Extension unité de production"
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objectif du Projet *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {PROJECT_PURPOSES.map((purpose) => {
                      const Icon = purpose.icon;
                      const isSelected = formData.purpose === purpose.id;
                      return (
                        <button
                          key={purpose.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, purpose: purpose.id }))}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Icon
                            size={20}
                            style={{ color: isSelected ? purpose.color : "#6b7280" }}
                            className="mb-2"
                          />
                          <p
                            className={`text-xs font-medium ${
                              isSelected ? "text-indigo-700" : "text-gray-600"
                            }`}
                          >
                            {purpose.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'Entreprise *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Ex: Entreprise ABC SARL"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du Projet *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Décrivez votre projet en quelques lignes..."
                  />
                </div>

                {/* Objective */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objectif Spécifique *
                  </label>
                  <input
                    type="text"
                    name="objective"
                    value={formData.objective}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Ex: Augmenter la capacité de production de 50%"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Estimatif (en XAF) *
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Ex: 15000000"
                  />
                </div>

                {/* Business Plan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan d'Affaires (optionnel)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="businessPlan"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <label htmlFor="businessPlan" className="cursor-pointer">
                      <FileText className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-600">
                        {formData.businessPlan || "Cliquez pour télécharger un fichier PDF ou Word"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Max 10Mo</p>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.purpose}
                    className="flex-1 px-5 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Soumettre le Projet
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-md"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Projet Soumis !</h2>
              <p className="text-gray-600 mb-4">
                Votre projet a été soumis avec succès. Un agent MINPMEESA l'examinera sous peu.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                <span>Temps d'examen: 3-5 jours ouvrés</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Détails du Projet</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  {(() => {
                    const purposeInfo = getPurposeInfo(selectedProject.purpose);
                    const Icon = purposeInfo.icon;
                    return (
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${purposeInfo.color}20` }}
                      >
                        <Icon size={28} style={{ color: purposeInfo.color }} />
                      </div>
                    );
                  })()}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{selectedProject.title}</h3>
                      {getStatusBadge(selectedProject.status)}
                    </div>
                    <p className="text-gray-600">{selectedProject.companyName}</p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Budget</p>
                    <p className="font-semibold text-gray-900">{formatBudget(selectedProject.budget)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Soumis le</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedProject.submittedAt).toLocaleDateString("fr-CM")}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>

                {/* Objective */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Objectif</h4>
                  <p className="text-gray-600">{selectedProject.objective}</p>
                </div>

                {/* Agent Review */}
                {selectedProject.agentReview && (
                  <div
                    className={`rounded-lg p-4 ${
                      selectedProject.status === "approved"
                        ? "bg-green-50 border border-green-200"
                        : selectedProject.status === "rejected"
                        ? "bg-red-50 border border-red-200"
                        : "bg-amber-50 border border-amber-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare
                        size={18}
                        className={
                          selectedProject.status === "approved"
                            ? "text-green-600"
                            : selectedProject.status === "rejected"
                            ? "text-red-600"
                            : "text-amber-600"
                        }
                      />
                      <h4 className="font-medium text-gray-900">Avis de l'Agent</h4>
                    </div>
                    <p className="text-gray-700 mb-2">{selectedProject.agentReview.comments}</p>
                    <p className="text-sm text-gray-500">
                      {selectedProject.agentReview.agentName} •{" "}
                      {new Date(selectedProject.agentReview.reviewedAt).toLocaleDateString("fr-CM")}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
