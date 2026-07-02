import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import FloatingLabelInput from "../../components/auth/FloatingLabelInput";
import { Building2, Mail, Lock, ArrowRight, Sparkles, AlertCircle, Clock } from "lucide-react";

function LoginPartner() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion Partenaire - STARTERKIT CM</title>
      </Helmet>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ marginBottom: "48px" }}
        >
          <Link
            to="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255, 255, 255, 0.7)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
          >
            ← Retour vers connexion
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            maxWidth: "420px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Building2 size={28} style={{ color: "white" }} />
              </div>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #ffffff 0%, #10B981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                STARTERKIT CM
              </span>
            </div>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Title */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "20px",
                  marginBottom: "16px",
                }}
              >
                <Building2 size={16} style={{ color: "#10B981" }} />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#10B981",
                    fontWeight: 600,
                  }}
                >
                  Espace Partenaires
                </span>
              </div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: "8px",
                }}
              >
                Connexion partenaire
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                Accédez à votre espace dédié institutions et partenaires
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "14px 16px",
                  background: "rgba(239, 68, 68, 0.1)",
                  borderRadius: "12px",
                  color: "#EF4444",
                  fontSize: "14px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <FloatingLabelInput
                label="Email professionnel"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                iconType="email"
                required
                placeholder="vous@organisation.cm"
              />

              <div style={{ marginBottom: "16px" }}>
                <FloatingLabelInput
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  iconType="password"
                  required
                />
                <div style={{ textAlign: "right", marginTop: "8px" }}>
                  <Link
                    to="/forgot-password"
                    style={{
                      fontSize: "13px",
                      color: "#10B981",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  border: "none",
                  borderRadius: "14px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                  opacity: loading ? 0.7 : 1,
                  marginBottom: "24px",
                }}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock size={18} />
                    </motion.span>
                    Connexion...
                  </>
                ) : (
                  <>
                    Accéder à l'espace partenaire
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Vous n'avez pas de compte partenaire ?{" "}
              <Link
                to="/signup/partner"
                style={{
                  color: "#10B981",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Demander l'accès
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default LoginPartner;
