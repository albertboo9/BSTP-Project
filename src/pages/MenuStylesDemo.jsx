import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Users,
  Lightbulb,
  Rocket,
  Building2,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const resourcesMenu = [
  {
    path: "/ressources/outils-bons-plans",
    label: "Boîtes à outils & Bons plans",
    icon: BookOpen,
    color: "#8B5CF6",
    description: "Articles, modèles et conseils pratiques",
  },
  {
    path: "/ressources/informations",
    label: "Point d'informations",
    icon: Search,
    color: "#3B82F6",
    description: "Textes de loi, décrets, réglementations",
  },
  {
    path: "/ressources/annuaire",
    label: "Annuaire des professionnels",
    icon: Users,
    color: "#10B981",
    description: "Experts, partenaires et conseils",
  },
  {
    path: "/ressources/innovation",
    label: "Innovation & Compétitivité",
    icon: Lightbulb,
    color: "#EC4899",
    description: "Programmes, concours et outils d'innovation",
  },
  {
    path: "/ressources/projets",
    label: "Projets d'entrepreneurs",
    icon: Rocket,
    color: "#F59E0B",
    description: "Découvrez les projets des PME",
  },
  {
    path: "/ressources/communaute",
    label: "Communauté Starter",
    icon: Building2,
    color: "#06B6D4",
    description: "Échangez avec d'autres entrepreneurs",
  },
];

// ============================================
// STYLE 1: MEGA MENU FULL-WIDTH (Amazon style)
// ============================================
function MegaMenuFullWidth({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              zIndex: 998,
            }}
          />

          {/* Mega Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              zIndex: 999,
              padding: "40px 0",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
              {/* Header */}
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e" }}>
                  Explorer nos ressources
                </h3>
                <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
                  Tout ce dont vous avez besoin pour développer votre entreprise
                </p>
              </div>

              {/* Grid 3x2 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }}
              >
                {resourcesMenu.map((item, index) => (
                  <motion.a
                    key={item.path}
                    href={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      padding: "20px",
                      background: "#f8fafc",
                      borderRadius: "16px",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                        flexShrink: 0,
                      }}
                    >
                      <item.icon size={28} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#1a1a2e",
                          marginBottom: "4px",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "13px",
                          color: "#6b7280",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.description}
                      </span>
                    </div>
                    <ArrowRight size={20} style={{ color: item.color, opacity: 0, transition: "opacity 0.2s" }} className="arrow-show" />
                  </motion.a>
                ))}
              </div>

              {/* Footer CTA */}
              <div
                style={{
                  marginTop: "32px",
                  padding: "20px",
                  background: "linear-gradient(135deg, rgba(99, 91, 255, 0.05), rgba(124, 58, 237, 0.05))",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}>
                    Nouvelle fonctionnalité disponible
                  </span>
                  <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>
                    Découvrez nos outils d'analyse prédictive pour votre entreprise
                  </p>
                </div>
                <button
                  style={{
                    padding: "10px 20px",
                    background: "#635bff",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Découvrir
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// STYLE 2: FLYOUT PANEL RIGHT (Slide-in drawer)
// ============================================
function FlyoutPanelRight({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 998,
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "420px",
              maxWidth: "90vw",
              background: "white",
              zIndex: 999,
              boxShadow: "-20px 0 60px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "24px 28px",
                borderBottom: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e" }}>
                  Ressources
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                  6 catégories disponibles
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#f1f5f9",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: "20px", overflowY: "auto", height: "calc(100% - 85px)" }}>
              {resourcesMenu.map((item, index) => (
                <motion.a
                  key={item.path}
                  href={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ background: "#f8fafc" }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "18px 16px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    marginBottom: "8px",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
                    }}
                  >
                    <item.icon size={24} color={item.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#1a1a2e",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginTop: "2px",
                      }}
                    >
                      {item.description}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    style={{
                      color: "#d1d5db",
                      transform: "rotate(-90deg)",
                    }}
                  />
                </motion.a>
              ))}

              {/* Quick Links */}
              <div style={{ marginTop: "32px", padding: "20px", background: "#f8fafc", borderRadius: "16px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "12px" }}>
                  Accès rapide
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Formations", "Parcours", "Partenaires", "Contact"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      style={{
                        padding: "8px 14px",
                        background: "white",
                        borderRadius: "8px",
                        fontSize: "13px",
                        color: "#4b5563",
                        textDecoration: "none",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// STYLE 3: GRID CARDS HORIZONTAL (Pinterest style)
// ============================================
function GridCardsHorizontal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              zIndex: 998,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "16px",
              background: "white",
              borderRadius: "24px",
              boxShadow: "0 25px 80px rgba(0,0,0,0.18)",
              padding: "28px",
              zIndex: 999,
            }}
          >
            {/* Pills Navigation */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "24px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {resourcesMenu.map((item, index) => (
                <motion.a
                  key={item.path}
                  href={item.path}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    background: `${item.color}12`,
                    borderRadius: "30px",
                    textDecoration: "none",
                    border: `1px solid ${item.color}25`,
                    transition: "all 0.2s",
                  }}
                >
                  <item.icon size={18} color={item.color} />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: item.color,
                    }}
                  >
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Featured Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {[0, 1].map((featuredIndex) => {
                const item = resourcesMenu[featuredIndex];
                return (
                  <motion.div
                    key={`featured-${featuredIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + featuredIndex * 0.1 }}
                    whileHover={{ y: -4 }}
                    style={{
                      padding: "20px",
                      background: `linear-gradient(135deg, ${item.color}08, ${item.color}03)`,
                      borderRadius: "18px",
                      border: `1px solid ${item.color}20`,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <item.icon size={22} color="white" />
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#1a1a2e",
                          }}
                        >
                          {item.label}
                        </span>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                          }}
                        >
                          Populaire
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// STYLE 4: BUBBLE ORBITAL (Animation premium)
// ============================================
function BubbleOrbital({ isOpen, onClose }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.2)",
              zIndex: 998,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "20px",
              width: "380px",
              height: "380px",
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              zIndex: 999,
              overflow: "hidden",
            }}
          >
            {/* Central hub */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <Sparkles size={32} color="#635bff" />
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginTop: "4px",
                }}
              >
                Ressources
              </p>
            </div>

            {/* Orbital bubbles */}
            {resourcesMenu.map((item, index) => {
              const angle = (index / resourcesMenu.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 140;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isHovered = hoveredItem === item.path;

              return (
                <motion.a
                  key={item.path}
                  href={item.path}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: isHovered ? 1.3 : 1,
                    x: x + 190,
                    y: y + 190,
                  }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  style={{
                    position: "absolute",
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isHovered
                      ? `linear-gradient(135deg, ${item.color}, ${item.color}dd)`
                      : `${item.color}15`,
                    boxShadow: isHovered
                      ? `0 10px 30px ${item.color}40`
                      : "0 4px 15px rgba(0,0,0,0.1)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <item.icon
                    size={isHovered ? 28 : 24}
                    color={isHovered ? "white" : item.color}
                  />
                </motion.a>
              );
            })}

            {/* Connecting rings */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <circle
                cx="190"
                cy="190"
                r="140"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// MAIN DEMO COMPONENT
// ============================================
export default function MenuStylesDemo() {
  const [activeStyle, setActiveStyle] = useState(1);
  const [menuStates, setMenuStates] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const toggleMenu = (styleId) => {
    setMenuStates((prev) => ({ ...prev, [styleId]: !prev[styleId] }));
  };

  const styles = [
    {
      id: 1,
      name: "Mega Menu",
      description: "Full-width avec grille 3x2",
      component: MegaMenuFullWidth,
    },
    {
      id: 2,
      name: "Flyout Panel",
      description: "Panneau latéral droit",
      component: FlyoutPanelRight,
    },
    {
      id: 3,
      name: "Grid Cards",
      description: "Pills navigation + cartes",
      component: GridCardsHorizontal,
    },
    {
      id: 4,
      name: "Bubble Orbital",
      description: "Animation orbitale",
      component: BubbleOrbital,
    },
  ];

  const ActiveComponent = styles.find((s) => s.id === activeStyle)?.component;

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "system-ui, sans-serif" }}>
      {/* Fake Header for Demo */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #635bff, #7c3aed)",
            }}
          />
          <span style={{ fontWeight: 700, fontSize: "18px", color: "#1a1a2e" }}>
            STARTERKIT CM
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {["Accueil", "Parcours", "Formations", "Partenaires"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                padding: "10px 16px",
                color: "#4b5563",
                fontSize: "14px",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "background 0.2s",
              }}
            >
              {item}
            </a>
          ))}

          {/* Demo Resources Button */}
          <div style={{ position: "relative", marginLeft: "8px" }}>
            <button
              onClick={() => toggleMenu(activeStyle)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                background: "linear-gradient(135deg, #635bff, #7c3aed)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Ressources
              <ChevronDown size={16} />
            </button>

            {ActiveComponent && (
              <ActiveComponent
                isOpen={menuStates[activeStyle]}
                onClose={() => toggleMenu(activeStyle)}
              />
            )}
          </div>
        </nav>

        <button
          style={{
            padding: "10px 20px",
            background: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Commencer
        </button>
      </header>

      {/* Demo Content */}
      <main style={{ padding: "60px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1a1a2e", marginBottom: "12px" }}>
              Styles de Menu Démonstration
            </h1>
            <p style={{ fontSize: "16px", color: "#6b7280" }}>
              Cliquez sur chaque style ci-dessous pour prévisualiser l'interaction
            </p>
          </div>

          {/* Style Selector */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            {styles.map((style) => (
              <motion.button
                key={style.id}
                onClick={() => {
                  setActiveStyle(style.id);
                  setMenuStates((prev) => ({ ...prev, [style.id]: true }));
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "24px",
                  background: activeStyle === style.id ? "white" : "#f8fafc",
                  border: activeStyle === style.id ? "2px solid #635bff" : "2px solid transparent",
                  borderRadius: "16px",
                  cursor: "pointer",
                  textAlign: "left",
                  boxShadow: activeStyle === style.id ? "0 8px 30px rgba(99, 91, 255, 0.15)" : "none",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: activeStyle === style.id
                      ? "linear-gradient(135deg, #635bff, #7c3aed)"
                      : "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                  }}
                >
                  {activeStyle === style.id && <ChevronDown size={24} color="white" />}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" }}>
                  {style.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280" }}>{style.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Current Style Preview */}
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "48px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e" }}>
                  Aperçu: {styles.find((s) => s.id === activeStyle)?.name}
                </h2>
                <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
                  Regardez le bouton "Ressources" dans le header ci-dessus pour tester
                </p>
              </div>
              <button
                onClick={() => toggleMenu(activeStyle)}
                style={{
                  padding: "12px 24px",
                  background: "#635bff",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Ouvrir le menu
              </button>
            </div>

            {/* Feature comparison */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "12px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                  Avantages
                </h4>
                <ul style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.8, paddingLeft: "16px" }}>
                  <li>Grande visibilité des contenus</li>
                  <li>6 items bien espacés</li>
                  <li>Possibilité d'ajouter des CTA</li>
                </ul>
              </div>
              <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "12px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                  Inconvénients
                </h4>
                <ul style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.8, paddingLeft: "16px" }}>
                  <li>Prend plus de place verticalement</li>
                  <li>Peut cacher le contenu temporairement</li>
                  <li>Plus complexe à implémenter</li>
                </ul>
              </div>
              <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "12px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                  Recommandation
                </h4>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>
                  {activeStyle === 1 && "Idéal pour un site e-commerce ou un dashboard avec beaucoup de catégories."}
                  {activeStyle === 2 && "Parfait pour une navigation latérale élégante, adapté aux apps modernes."}
                  {activeStyle === 3 && "Excellent compromis visuel, bonne hiérarchie avec les cards mises en avant."}
                  {activeStyle === 4 && "Design unique et mémorable, idéal pour un projet créatif ou une startup."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
