import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import FloatingLabelInput from "../../components/auth/FloatingLabelInput";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp,
  Rocket,
  Globe,
  ArrowLeft,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // For demo purposes: bypass authentication and redirect to dashboard
      console.log("Demo login - redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  // Stats data
  const stats = [
    { value: "+500", label: "Entrepreneurs", icon: Users },
    { value: "+50", label: "Partenaires", icon: TrendingUp },
    { value: "+1000", label: "Projets", icon: Rocket },
  ];

  return (
    <>
      <Helmet>
        <title>Connexion - STARTERKIT CM</title>
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
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", maxWidth: "420px" }}
          >
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
                    width: "52px",
                    height: "52px",
                    background:
                      "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sparkles size={28} style={{ color: "white" }} />
                </div>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  STARTERKIT CM
                </span>
              </Link>
            </div>

            {/* Title */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: "8px",
                }}
              >
                Bon retour parmi nous
              </h1>
              <p
                style={{
                  fontSize: "15px",
                  color: "#6b7280",
                  maxWidth: "320px",
                  margin: "0 auto",
                }}
              >
                Votre prochaine grande aventure commence ici
              </p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
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
                  <span style={{ fontSize: "18px" }}>
                    <Lock size={18} />
                  </span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <FloatingLabelInput
                label="Adresse email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                iconType="email"
                required
                placeholder="vous@email.com"
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
                <div
                  style={{
                    textAlign: "right",
                    marginTop: "8px",
                  }}
                >
                  <Link
                    to="/forgot-password"
                    style={{
                      fontSize: "13px",
                      color: "#635bff",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>

              {/* Remember me */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "24px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "#635bff",
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>
                  Se souvenir de moi
                </span>
              </label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "16px",
                  background:
                    "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
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
                  boxShadow: "0 4px 15px rgba(99, 91, 255, 0.3)",
                  opacity: loading ? 0.7 : 1,
                  marginBottom: "24px",
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
                      <Rocket size={18} />
                    </motion.span>
                    Connexion...
                  </>
                ) : (
                  <>
                    Me connecter
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "#e5e7eb",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                }}
              >
                ou continuer avec
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "#e5e7eb",
                }}
              />
            </div>

            {/* Social Login */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1a1a2e",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1a1a2e",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </motion.button>
            </div>

            {/* Footer */}
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Pas encore de compte ?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#635bff",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Créer un compte
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
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)",
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
              opacity: 0.15,
            }}
          >
            <img
              src="/img/team_work_illustration.jpg"
              alt="Équipe entrepreneur"
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
              top: "15%",
              left: "10%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(99, 91, 255, 0.2) 0%, transparent 70%)",
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
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
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
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: "20%",
              right: "25%",
              width: "8px",
              height: "8px",
              background: "rgba(167, 139, 250, 0.6)",
              borderRadius: "50%",
            }}
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              position: "absolute",
              bottom: "30%",
              left: "15%",
              width: "12px",
              height: "12px",
              background: "rgba(99, 91, 255, 0.4)",
              borderRadius: "50%",
            }}
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{
              position: "absolute",
              top: "40%",
              left: "20%",
              width: "6px",
              height: "6px",
              background: "rgba(139, 92, 246, 0.5)",
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
              style={{ marginBottom: "40px" }}
            >
              <span
                style={{
                  fontSize: "48px",
                  color: "rgba(167, 139, 250, 0.3)",
                  lineHeight: 0,
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                "
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.4,
                  fontStyle: "italic",
                }}
              >
                Chaque grand projet commence par un premier pas
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "rgba(255, 255, 255, 0.6)",
                  marginTop: "20px",
                }}
              >
                Rejoignez plus de 500 entrepreneurs qui construisent l'avenir du
                Cameroun
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                marginBottom: "48px",
              }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "20px 16px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <stat.icon
                    size={24}
                    style={{
                      color: "#a78bfa",
                      marginBottom: "8px",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "white",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.6)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.5)",
                  marginBottom: "16px",
                }}
              >
                Vous représentez une institution ou un partenaire ?
              </p>
              <Link
                to="/login/partner"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 24px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Globe size={16} />
                Espace Partenaires
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 992px) {
            div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
            div[style*="background: linear-gradient(135deg, #1a1a2e"] {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default Login;
