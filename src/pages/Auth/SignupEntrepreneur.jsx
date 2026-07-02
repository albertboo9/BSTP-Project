import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  User,
  Building2,
  Lightbulb,
  Clock,
  GraduationCap,
  Banknote,
  UserCheck,
  UserPlus,
  TrendingUp,
  Home,
  Users,
  Rocket,
  Globe,
  Lightbulb as LightbulbIcon,
  Award,
} from "lucide-react";
import FloatingLabelInput from "../../components/auth/FloatingLabelInput";
import StepIndicator from "../../components/auth/StepIndicator";
import {
  camerounCities,
  businessDuration,
  entrepreneurNeeds,
} from "../../data/auth-options";

// Mapping des icônes pour les besoins entrepreneur
const needIcons = {
  "formation": GraduationCap,
  "financement": Banknote,
  "mentorat": UserCheck,
  "reseau": UserPlus,
  "informations": LightbulbIcon,
  "marketing": TrendingUp,
  "local": Home,
  "equipe": Users,
};

function SignupEntrepreneur() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    businessDuration: "",
    city: "",
    needs: [],
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const stepLabels = ["Identité", "Projet", "Motivation"];

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

  const handleNeedToggle = (need) => {
    setFormData((prev) => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter((n) => n !== need)
        : [...prev.needs, need],
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "Le prénom est requis";
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Le nom est requis";
        isValid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = "L'email est requis";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email invalide";
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Le nom de l'entreprise/projet est requis";
        isValid = false;
      }
      if (!formData.city) {
        newErrors.city = "La ville est requise";
        isValid = false;
      }
    }

    if (step === 3) {
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
    if (validateStep(3)) {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Helmet>
        <title>Inscription Entrepreneur - STARTERKIT CM</title>
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
                    background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Rocket size={24} style={{ color: "white" }} />
                </div>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
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
                Créer mon compte entrepreneur
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                Rejoignez l'écosystème entrepreneurial le plus dynamique du Cameroun
              </p>
            </div>

            {/* Step Indicator */}
            <StepIndicator
              currentStep={currentStep}
              totalSteps={3}
              stepLabels={stepLabels}
            />

            {/* Form Steps */}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Identity */}
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
                      <User size={22} />
                      Vos informations personnelles
                    </h2>

                    {/* TEMP: Simple inputs instead of FloatingLabelInput */}
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        style={{
                          width: "100%",
                          padding: "14px",
                          border: errors.firstName ? "2px solid #EF4444" : "2px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />
                      {errors.firstName && <span style={{ color: "#EF4444", fontSize: "12px" }}>{errors.firstName}</span>}
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        style={{
                          width: "100%",
                          padding: "14px",
                          border: errors.lastName ? "2px solid #EF4444" : "2px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />
                      {errors.lastName && <span style={{ color: "#EF4444", fontSize: "12px" }}>{errors.lastName}</span>}
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="vous@exemple.cm"
                        style={{
                          width: "100%",
                          padding: "14px",
                          border: errors.email ? "2px solid #EF4444" : "2px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />
                      {errors.email && <span style={{ color: "#EF4444", fontSize: "12px" }}>{errors.email}</span>}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      type="button"
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
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
                        boxShadow: "0 4px 15px rgba(99, 91, 255, 0.3)",
                      }}
                    >
                      Suivant
                      <ArrowRight size={18} />
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 2: Project */}
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
                      <Building2 size={22} />
                      Votre projet
                    </h2>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                        Nom de l'entreprise/projet *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Le nom de votre entreprise ou projet"
                        style={{
                          width: "100%",
                          padding: "14px",
                          border: errors.companyName ? "2px solid #EF4444" : "2px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />
                      {errors.companyName && <span style={{ color: "#EF4444", fontSize: "12px" }}>{errors.companyName}</span>}
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                        Ville *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "14px",
                          border: errors.city ? "2px solid #EF4444" : "2px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "15px",
                          outline: "none",
                          background: "white",
                        }}
                      >
                        <option value="">Sélectionnez une ville</option>
                        {camerounCities.map((city) => (
                          <option key={city.value} value={city.value}>
                            {city.label}
                          </option>
                        ))}
                      </select>
                      {errors.city && <span style={{ color: "#EF4444", fontSize: "12px" }}>{errors.city}</span>}
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        type="button"
                        style={{
                          padding: "14px",
                          background: "#f3f4f6",
                          border: "none",
                          borderRadius: "12px",
                          color: "#6b7280",
                          fontSize: "15px",
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
                        type="button"
                        style={{
                          flex: 1,
                          padding: "14px",
                          background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
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
                        }}
                      >
                        Suivant
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Motivation */}
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
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Lightbulb size={22} />
                      Vos besoins
                    </h2>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "12px" }}>
                        Quels sont vos besoins ? *
                      </label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        {entrepreneurNeeds.map((need) => {
                          const Icon = needIcons[need.value];
                          const isSelected = formData.needs.includes(need.value);
                          return (
                            <motion.button
                              key={need.value}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleNeedToggle(need.value)}
                              style={{
                                padding: "12px",
                                background: isSelected ? "linear-gradient(135deg, rgba(99, 91, 255, 0.1) 0%, rgba(99, 91, 255, 0.05) 100%)" : "#f8fafc",
                                border: isSelected ? "2px solid #635bff" : "2px solid transparent",
                                borderRadius: "10px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                textAlign: "left",
                              }}
                            >
                              <Icon size={18} style={{ color: isSelected ? "#635bff" : "#6b7280" }} />
                              <span style={{ fontSize: "12px", fontWeight: 500, color: isSelected ? "#635bff" : "#4b5563" }}>
                                {need.label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                        Mot de passe *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Au moins 8 caractères"
                        style={{
                          width: "100%",
                          padding: "14px",
                          border: errors.password ? "2px solid #EF4444" : "2px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />
                      {errors.password && <span style={{ color: "#EF4444", fontSize: "12px" }}>{errors.password}</span>}
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                        Confirmer le mot de passe *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmez votre mot de passe"
                        style={{
                          width: "100%",
                          padding: "14px",
                          border: errors.confirmPassword ? "2px solid #EF4444" : "2px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />
                      {errors.confirmPassword && <span style={{ color: "#EF4444", fontSize: "12px" }}>{errors.confirmPassword}</span>}
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          style={{ marginTop: "2px", width: "18px", height: "18px", accentColor: "#635bff" }}
                        />
                        <span style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.4 }}>
                          J'accepte les conditions d'utilisation et la politique de confidentialité de STARTERKIT CM
                        </span>
                      </label>
                      {errors.acceptTerms && <span style={{ color: "#EF4444", fontSize: "12px", display: "block", marginTop: "4px" }}>{errors.acceptTerms}</span>}
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        type="button"
                        style={{
                          padding: "14px",
                          background: "#f3f4f6",
                          border: "none",
                          borderRadius: "12px",
                          color: "#6b7280",
                          fontSize: "15px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Retour
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background: loading ? "#9ca3af" : "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                          border: "none",
                          borderRadius: "12px",
                          color: "white",
                          fontSize: "15px",
                          fontWeight: 600,
                          cursor: loading ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        {loading ? (
                          <>
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                              <Clock size={18} />
                            </motion.span>
                            Création...
                          </>
                        ) : (
                          <>
                            <Award size={18} />
                            Créer mon compte
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Right Side - Inspiring Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)",
            padding: "48px",
            overflow: "hidden",
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "10%",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(99, 91, 255, 0.2) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(80px)",
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: "center",
              maxWidth: "450px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: "48px" }}
            >
              <span style={{ fontSize: "48px", color: "rgba(167, 139, 250, 0.3)", lineHeight: 0 }}>"</span>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "white",
                  lineHeight: 1.6,
                  marginTop: "16px",
                }}
              >
                Chaque grand projet commence par un premier pas. Rejoignez des milliers d'entrepreneurs qui transforment leurs rêves en réalité.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "48px",
                  marginBottom: "48px",
                }}
              >
                {[
                  { value: "+500", label: "Entrepreneurs" },
                  { value: "+50", label: "Partenaires" },
                  { value: "+1000", label: "Projets" },
                ].map((stat, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.6)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div style={{ textAlign: "left" }}>
                {[
                  { icon: GraduationCap, label: "Formations gratuites" },
                  { icon: UserCheck, label: "Mentors expérimentés" },
                  { icon: Banknote, label: "Opportunités de financement" },
                  { icon: Users, label: "Communauté active" },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "rgba(99, 91, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <benefit.icon size={20} style={{ color: "#a78bfa" }} />
                    </div>
                    <span style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.9)" }}>
                      {benefit.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SignupEntrepreneur;
