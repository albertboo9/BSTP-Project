import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  Building2,
  Sparkles,
  Users,
  Globe,
  TrendingUp,
  Award,
  Lightbulb,
} from "lucide-react";

function SignupChoice() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const choices = [
    {
      id: "entrepreneur",
      icon: Rocket,
      title: "Entrepreneur",
      subtitle: "Accès complet aux ressources",
      color: "#635bff",
      features: [
        "Formations gratuites",
        "Mentorat personnalisé",
        "Opportunités de financement",
        "Communauté d'entrepreneurs",
      ],
      iconBg: "rgba(99, 91, 255, 0.1)",
    },
    {
      id: "partner",
      icon: Building2,
      title: "Partenaire",
      subtitle: "Institution, financeur, incubateur",
      color: "#10B981",
      features: [
        "Espace dédié partenaires",
        "Visibilité de votre organisation",
        "Mise en relation avec entrepreneurs",
        "Suivi des impacts",
      ],
      iconBg: "rgba(16, 185, 129, 0.1)",
    },
  ];

  const handleSelect = (choice) => {
    setSelected(choice.id);
    setTimeout(() => {
      if (choice.id === "entrepreneur") {
        navigate("/signup/entrepreneur");
      } else {
        navigate("/signup/partner");
      }
    }, 300);
  };

  // Stats for right panel
  const stats = [
    { value: "+500", label: "Entrepreneurs", icon: Users },
    { value: "+50", label: "Partenaires", icon: Globe },
    { value: "+1000", label: "Projets", icon: TrendingUp },
  ];

  return (
    <>
      <Helmet>
        <title>Créer un compte - STARTERKIT CM</title>
      </Helmet>

      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* Left Side - Form / Choices */}
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
              style={{ marginBottom: "32px" }}
            >
              <Link
                to="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#6b7280",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                }}
              >
                <ArrowLeft size={18} />
                Retour à la connexion
              </Link>
            </motion.div>

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
                    background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
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
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: "8px",
                }}
              >
                Choisissez votre type de compte
              </h1>
              <p
                style={{
                  fontSize: "15px",
                  color: "#6b7280",
                  maxWidth: "320px",
                  margin: "0 auto",
                }}
              >
                Rejoignez l'écosystème entrepreneurial camerounais
              </p>
            </div>

            {/* Choices */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {choices.map((choice, index) => (
                <motion.div
                  key={choice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => handleSelect(choice)}
                  style={{
                    background:
                      selected === choice.id
                        ? `linear-gradient(135deg, ${choice.color} 0%, ${choice.color}dd 100%)`
                        : "#f8fafc",
                    borderRadius: "20px",
                    padding: "24px",
                    cursor: "pointer",
                    border:
                      selected === choice.id
                        ? "none"
                        : "2px solid transparent",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{
                      width: "56px",
                      height: "56px",
                      background:
                        selected === choice.id
                          ? "rgba(255, 255, 255, 0.2)"
                          : choice.iconBg,
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <choice.icon
                      size={28}
                      style={{
                        color: selected === choice.id ? "white" : choice.color,
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: selected === choice.id ? "white" : "#1a1a2e",
                      marginBottom: "4px",
                    }}
                  >
                    {choice.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "13px",
                      color: selected === choice.id
                        ? "rgba(255, 255, 255, 0.8)"
                        : "#6b7280",
                      marginBottom: "12px",
                    }}
                  >
                    {choice.subtitle}
                  </p>

                  {/* Features */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {choice.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "4px 0",
                          color: selected === choice.id
                            ? "rgba(255, 255, 255, 0.9)"
                            : "#4b5563",
                          fontSize: "12px",
                        }}
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            background: selected === choice.id
                              ? "white"
                              : choice.color,
                            borderRadius: "50%",
                            flexShrink: 0,
                          }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Arrow */}
                  <motion.div
                    animate={{
                      x: selected === choice.id ? 5 : 0,
                      opacity: selected === choice.id ? 1 : 0.5,
                    }}
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                      color: selected === choice.id ? "white" : choice.color,
                    }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Vous hésitez ?{" "}
              <Link
                to="/"
                style={{
                  color: "#635bff",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Découvrir STARTERKIT CM
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
              opacity: 0.12,
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
              style={{ marginBottom: "48px" }}
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
                Rejoignez plus de 500 entrepreneurs qui construisent l'avenir du Cameroun
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

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {[
                { icon: Lightbulb, text: "Accompagnement personnalisé" },
                { icon: Award, text: "Programmes certifiants" },
                { icon: Users, text: "Réseau national d'entrepreneurs" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    justifyContent: "center",
                  }}
                >
                  <item.icon
                    size={18}
                    style={{ color: "#a78bfa" }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.8)",
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
            div[style*="background: linear-gradient(135deg, #1a1a2e"] {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default SignupChoice;
