import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function TestLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes: bypass authentication and redirect to dashboard
    login(email, password);
    navigate("/dashboard", { replace: true });
  };

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
              <p style={{ fontSize: "15px", color: "#6b7280" }}>
                Connectez-vous pour accéder à votre espace
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
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
                  Email
                </label>
                <div style={{ position: "relative" }}>
                  <Mail
                    size={20}
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.cm"
                    style={{
                      width: "100%",
                      padding: "14px 48px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      fontSize: "15px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
              </div>

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
                  Mot de passe
                </label>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={20}
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "14px 48px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      fontSize: "15px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
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
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 15px rgba(99, 91, 255, 0.3)",
                }}
              >
                Me connecter
                <ArrowRight size={18} />
              </motion.button>
            </form>

            {/* Footer */}
            <p
              style={{
                textAlign: "center",
                marginTop: "24px",
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
          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "20%",
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
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "white",
                marginBottom: "16px",
                lineHeight: 1.2,
              }}
            >
              Votre prochaine grande aventure commence ici
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "40px",
                lineHeight: 1.6,
              }}
            >
              Rejoignez des milliers d'entrepreneurs camerounais qui
              transforment leurs idées en entreprises prospères.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default TestLogin;
