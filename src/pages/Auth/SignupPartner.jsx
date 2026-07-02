import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Building2,
  User,
  FileText,
  Lock,
  Globe,
  Landmark,
  Rocket,
  Users,
  Store,
  Building,
  Clock,
  Award,
  MapPin,
  Target,
} from "lucide-react";
import FloatingLabelInput from "../../components/auth/FloatingLabelInput";
import StepIndicator from "../../components/auth/StepIndicator";
import { partnerTypes, partnerDomains } from "../../data/auth-options";

// Mapping des icônes pour les types d'organisation
const typeIcons = {
  "gouvernement": Landmark,
  "ong": Globe,
  "chambre": Building,
  "banque": Landmark,
  "incubateur": Rocket,
  "association": Users,
  "entreprise": Store,
  "autre": Building2,
};

function SignupPartner() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Step 1: Organisation
    organizationName: "",
    organizationType: "",
    website: "",
    // Step 2: Contact
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
    // Step 3: Mission
    description: "",
    domains: [],
    motivation: "",
    // Step 4: Accès
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const stepLabels = ["Organisation", "Contact", "Mission", "Accès"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDomainToggle = (domain) => {
    setFormData((prev) => ({
      ...prev,
      domains: prev.domains.includes(domain)
        ? prev.domains.filter((d) => d !== domain)
        : [...prev.domains, domain],
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = "Le nom de l'organisation est requis";
        isValid = false;
      }
      if (!formData.organizationType) {
        newErrors.organizationType = "Le type d'organisation est requis";
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.contactName.trim()) {
        newErrors.contactName = "Le nom du contact est requis";
        isValid = false;
      }
      if (!formData.contactRole.trim()) {
        newErrors.contactRole = "La fonction est requise";
        isValid = false;
      }
      if (!formData.contactEmail.trim()) {
        newErrors.contactEmail = "L'email est requis";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
        newErrors.contactEmail = "Email invalide";
        isValid = false;
      }
    }

    if (step === 3) {
      if (!formData.description.trim()) {
        newErrors.description = "La description est requise";
        isValid = false;
      }
      if (formData.domains.length === 0) {
        newErrors.domains = "Sélectionnez au moins un domaine";
        isValid = false;
      }
    }

    if (step === 4) {
      if (formData.password.length < 8) {
        newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        isValid = false;
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "Vous devez accepter les conditions";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <>
      <Helmet>
        <title>Inscription Partenaire - STARTERKIT CM</title>
      </Helmet>

      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* Left Side - Form */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px",
            background: "white",
            overflowY: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", maxWidth: "500px" }}
          >
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginBottom: "24px" }}
            >
              <button
                onClick={() => navigate(-1)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#6b7280",
                  background: "none",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <ArrowLeft size={18} />
                Retour
              </button>
            </motion.div>

            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Building2 size={24} style={{ color: "white" }} />
                </div>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  STARTERKIT CM
                </span>
              </Link>
            </div>

            {/* Title */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: "8px",
                }}
              >
                Inscription Partenaire
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                Rejoignez notre réseau d'institutions, financeurs et incubateurs
              </p>
            </div>

            {/* Step Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ marginBottom: "32px" }}
            >
              <StepIndicator
                currentStep={currentStep}
                totalSteps={4}
                stepLabels={stepLabels}
              />
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid #e5e7eb",
              }}
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Organisation */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Building2 size={22} />
                      Organisation
                    </h2>

                    <FloatingLabelInput
                      label="Nom de l'organisation"
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      iconType="building"
                      required
                      error={errors.organizationName}
                      placeholder="MINPMEESA / PNUD / CCIM..."
                    />

                    {/* Organization Type */}
                    <div style={{ marginBottom: "16px" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#1a1a2e",
                          marginBottom: "10px",
                        }}
                      >
                        Type d'organisation{" "}
                        <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "8px",
                        }}
                      >
                        {partnerTypes.map((type) => (
                          <motion.button
                            key={type.value}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                organizationType: type.value,
                              }))
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 12px",
                              background:
                                formData.organizationType === type.value
                                  ? "rgba(16, 185, 129, 0.1)"
                                  : "#f8fafc",
                              border:
                                formData.organizationType === type.value
                                  ? "2px solid #10B981"
                                  : "2px solid transparent",
                              borderRadius: "10px",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            {(function () {
                              const Icon = typeIcons[type.value];
                              return Icon ? (
                                <Icon
                                  size={18}
                                  style={{
                                    color:
                                      formData.organizationType === type.value
                                        ? "#10B981"
                                        : "#6b7280",
                                  }}
                                />
                              ) : null;
                            })()}
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 500,
                                color:
                                  formData.organizationType === type.value
                                    ? "#10B981"
                                    : "#4b5563",
                              }}
                            >
                              {type.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                      {errors.organizationType && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#EF4444",
                            marginTop: "4px",
                            display: "block",
                          }}
                        >
                          {errors.organizationType}
                        </span>
                      )}
                    </div>

                    <FloatingLabelInput
                      label="Site web"
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      iconType="text"
                      placeholder="https://www.votre-organisation.cm"
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background:
                          "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        marginTop: "20px",
                        boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                      }}
                    >
                      Suivant
                      <ArrowRight size={18} />
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 2: Contact */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <User size={22} />
                      Contact principal
                    </h2>

                    <FloatingLabelInput
                      label="Nom complet"
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      iconType="text"
                      required
                      error={errors.contactName}
                    />

                    <FloatingLabelInput
                      label="Fonction / Poste"
                      type="text"
                      name="contactRole"
                      value={formData.contactRole}
                      onChange={handleChange}
                      iconType="text"
                      required
                      error={errors.contactRole}
                      placeholder="Directeur / Coordinateur / Chargé de mission..."
                    />

                    <FloatingLabelInput
                      label="Email professionnel"
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      iconType="email"
                      required
                      error={errors.contactEmail}
                    />

                    <FloatingLabelInput
                      label="Téléphone"
                      type="phone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      iconType="phone"
                      placeholder="+237 6XX XXX XXX"
                    />

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "20px",
                      }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background: "#f8fafc",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          color: "#6b7280",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Retour
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background:
                            "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                          border: "none",
                          borderRadius: "12px",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        Suivant
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Mission */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Target size={22} />
                      Mission & Domaines
                    </h2>

                    <div style={{ marginBottom: "16px" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#1a1a2e",
                          marginBottom: "8px",
                        }}
                      >
                        Description de l'organisation{" "}
                        <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Décrivez brièvement la mission et les activités de votre organisation..."
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          border: errors.description
                            ? "2px solid #EF4444"
                            : "2px solid #e5e7eb",
                          borderRadius: "10px",
                          fontSize: "14px",
                          color: "#1a1a2e",
                          background: "white",
                          resize: "vertical",
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                      {errors.description && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#EF4444",
                            marginTop: "4px",
                            display: "block",
                          }}
                        >
                          {errors.description}
                        </span>
                      )}
                    </div>

                    {/* Domaines d'intervention */}
                    <div style={{ marginBottom: "8px" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#1a1a2e",
                          marginBottom: "10px",
                        }}
                      >
                        Domaines d'intervention{" "}
                        <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "8px",
                        }}
                      >
                        {partnerDomains.map((domain) => (
                          <motion.button
                            key={domain.value}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDomainToggle(domain.value)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "8px 10px",
                              background: formData.domains.includes(domain.value)
                                ? "rgba(16, 185, 129, 0.1)"
                                : "#f8fafc",
                              border: formData.domains.includes(domain.value)
                                ? "2px solid #10B981"
                                : "2px solid transparent",
                              borderRadius: "8px",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            <span
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "4px",
                                background: formData.domains.includes(domain.value)
                                  ? "#10B981"
                                  : "#e5e7eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {formData.domains.includes(domain.value) && (
                                <Check
                                  size={12}
                                  style={{ color: "white" }}
                                />
                              )}
                            </span>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 500,
                                color: formData.domains.includes(domain.value)
                                  ? "#10B981"
                                  : "#4b5563",
                              }}
                            >
                              {domain.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                      {errors.domains && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#EF4444",
                            marginTop: "4px",
                            display: "block",
                          }}
                        >
                          {errors.domains}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "20px",
                      }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background: "#f8fafc",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          color: "#6b7280",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Retour
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background:
                            "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                          border: "none",
                          borderRadius: "12px",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        Suivant
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Accès */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Lock size={22} />
                      Création du compte
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        marginBottom: "20px",
                      }}
                    >
                      Définissez votre mot de passe pour accéder à l'espace partenaire
                    </p>

                    <FloatingLabelInput
                      label="Mot de passe"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      iconType="password"
                      required
                      showStrength
                      error={errors.password}
                    />

                    <FloatingLabelInput
                      label="Confirmer le mot de passe"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      iconType="password"
                      required
                      error={errors.confirmPassword}
                    />

                    {/* Terms checkbox */}
                    <div
                      style={{
                        marginTop: "8px",
                        marginBottom: "20px",
                      }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          style={{
                            marginTop: "2px",
                            width: "16px",
                            height: "16px",
                            accentColor: "#10B981",
                            cursor: "pointer",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            lineHeight: 1.4,
                          }}
                        >
                          Je confirme être habilité à représenter mon organisation et
                          j'accepte les{" "}
                          <Link
                            to="/conditions"
                            style={{
                              color: "#10B981",
                              textDecoration: "underline",
                            }}
                          >
                            conditions d'utilisation
                          </Link>
                        </span>
                      </label>
                      {errors.acceptTerms && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#EF4444",
                            marginTop: "4px",
                            display: "block",
                            marginLeft: "26px",
                          }}
                        >
                          {errors.acceptTerms}
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background: "#f8fafc",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          color: "#6b7280",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Retour
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background:
                            "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                          border: "none",
                          borderRadius: "12px",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: loading ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          opacity: loading ? 0.7 : 1,
                        }}
                      >
                        {loading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Clock size={18} />
                            </motion.span>
                            Soumission...
                          </>
                        ) : (
                          <>
                            <Check size={18} />
                            Soumettre la demande
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Footer */}
            <p
              style={{
                textAlign: "center",
                marginTop: "24px",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Vous avez déjà un compte ?{" "}
              <Link
                to="/login"
                style={{
                  color: "#10B981",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Se connecter
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Right Side - Inspiring Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0f3d3e 0%, #1a1a2e 50%, #0f3d3e 100%)",
            padding: "48px",
            overflow: "hidden",
          }}
        >
          {/* Illustration Image */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.12,
            }}
          >
            <img
              src="/img/plan_analize_illustration.jpg"
              alt="Analyse stratégique"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "10%",
              width: "350px",
              height: "350px",
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "5%",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(80px)",
            }}
          />

          {/* Floating particles */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "20%",
              right: "25%",
              width: "8px",
              height: "8px",
              background: "rgba(16, 185, 129, 0.6)",
              borderRadius: "50%",
            }}
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{
              position: "absolute",
              bottom: "30%",
              left: "15%",
              width: "12px",
              height: "12px",
              background: "rgba(139, 92, 246, 0.4)",
              borderRadius: "50%",
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: "center",
              maxWidth: "420px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(16, 185, 129, 0.15)",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 32px",
              }}
            >
              <Users size={40} style={{ color: "#34d399" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "16px",
                  lineHeight: 1.2,
                }}
              >
                Ensemble, innovons
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: "32px",
                  lineHeight: 1.6,
                }}
              >
                Rejoignez un réseau de plus de 50 organisations qui accompagnent
                les entrepreneurs camerounais
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                {
                  icon: MapPin,
                  text: "Visibilité nationale",
                  color: "#34d399",
                },
                {
                  icon: Users,
                  text: "Réseau de 500+ entrepreneurs",
                  color: "#a78bfa",
                },
                {
                  icon: Award,
                  text: "Impact mesurable",
                  color: "#fbbf24",
                },
                {
                  icon: Globe,
                  text: "Collaboration internationale",
                  color: "#60a5fa",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "14px",
                    padding: "16px 20px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: `${item.color}20`,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 992px) {
            div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
            div[style*="background: linear-gradient(135deg, #0f3d3e"] {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default SignupPartner;
