import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  BookOpen,
  Search,
  Users,
  Lightbulb,
  Rocket,
  Building2,
} from "lucide-react";

const resourcesItems = [
  {
    path: "/ressources/outils-bons-plans",
    label: "Boîtes à outils",
    icon: BookOpen,
    color: "#8B5CF6",
    description: "Articles & modèles",
  },
  {
    path: "/ressources/informations",
    label: "Informations",
    icon: Search,
    color: "#3B82F6",
    description: "Lois & décrets",
  },
  {
    path: "/ressources/annuaire",
    label: "Annuaire",
    icon: Users,
    color: "#10B981",
    description: "Experts & conseils",
  },
  {
    path: "/ressources/innovation",
    label: "Innovation",
    icon: Lightbulb,
    color: "#EC4899",
    description: "Programmes & concours",
  },
  {
    path: "/ressources/projets",
    label: "Projets",
    icon: Rocket,
    color: "#F59E0B",
    description: "PME & opportunités",
  },
  {
    path: "/ressources/communaute",
    label: "Communauté",
    icon: Building2,
    color: "#06B6D4",
    description: "Échanges & réseau",
  },
];

// ============================================
// MEGA MENU ALWAYS VISIBLE
// ============================================
function MegaMenuAlwaysVisible() {
  const [activePath, setActivePath] = useState("/ressources/informations");

  return (
    <div>
      {/* Header with Mega Menu */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #635bff, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontWeight: 700, fontSize: "18px" }}>S</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: "18px", color: "#1a1a2e" }}>
              STARTERKIT CM
            </span>
          </div>

          {/* Main Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {["Accueil", "Parcours", "Formations", "Partenaires"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </a>
            ))}

            {/* Resources Button (always visible) */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 16px",
                background: "#1a1a2e",
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
          </nav>

          {/* CTA */}
          <button
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #635bff, #7c3aed)",
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
        </div>

        {/* MEGA MENU BAR - ALWAYS VISIBLE */}
        <div
          style={{
            background: "#fafafa",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Label */}
            <div
              style={{
                padding: "12px 16px",
                background: "linear-gradient(135deg, #635bff, #7c3aed)",
                color: "white",
                borderRadius: "0 0 12px 12px",
                fontSize: "12px",
                fontWeight: 600,
                marginRight: "16px",
              }}
            >
              RESSOURCES
            </div>

            {/* All 6 items visible */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 0",
                flex: 1,
              }}
            >
              {resourcesItems.map((item, index) => {
                const isActive = activePath === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ position: "relative" }}
                  >
                    <button
                      onClick={() => setActivePath(item.path)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 14px",
                        background: isActive ? `${item.color}12` : "transparent",
                        borderRadius: "10px",
                        border: isActive ? `1px solid ${item.color}30` : "1px solid transparent",
                        cursor: "pointer",
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = `${item.color}08`;
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isActive
                            ? `linear-gradient(135deg, ${item.color}, ${item.color}dd)`
                            : `${item.color}15`,
                          flexShrink: 0,
                        }}
                      >
                        <item.icon
                          size={14}
                          color={isActive ? "white" : item.color}
                        />
                      </div>

                      {/* Text */}
                      <div style={{ textAlign: "left" }}>
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: isActive ? item.color : "#374151",
                            lineHeight: 1.2,
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "10px",
                            color: "#9ca3af",
                            lineHeight: 1.2,
                          }}
                        >
                          {item.description}
                        </span>
                      </div>
                    </button>

                    {/* Active indicator bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        style={{
                          position: "absolute",
                          bottom: "-1px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "70%",
                          height: "3px",
                          background: item.color,
                          borderRadius: "3px 3px 0 0",
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Quick CTA */}
            <div
              style={{
                paddingLeft: "16px",
                borderLeft: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  textAlign: "right",
                }}
              >
               Besoin d'aide ?
                <br />
                <strong style={{ color: "#1a1a2e" }}>Contactez-nous</strong>
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ArrowRight size={16} color="#635bff" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Content */}
      <main
        style={{
          padding: "60px 24px",
          background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
          minHeight: "calc(100vh - 150px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "48px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: `linear-gradient(135deg, ${resourcesItems.find(i => i.path === activePath)?.color || "#635bff"}, ${resourcesItems.find(i => i.path === activePath)?.color || "#7c3aed"}dd)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {(() => {
                  const item = resourcesItems.find((i) => i.path === activePath);
                  const Icon = item?.icon || BookOpen;
                  return <Icon size={28} color="white" />;
                })()}
              </div>
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e" }}>
                  {resourcesItems.find((i) => i.path === activePath)?.label || "Ressources"}
                </h2>
                <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
                  Page active: {resourcesItems.find((i) => i.path === activePath)?.description}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.7 }}>
              Le mega menu ci-dessus est <strong>toujours visible</strong> — toutes les 6 ressources
              sont affichées horizontalement sous l'en-tête. Les utilisateurs peuvent voir et
              accéder à n'importe quelle section d'un seul coup d'œil, sans avoir à ouvrir un
              dropdown. L'indicateur coloré montre clairement la page active.
            </p>

            <div
              style={{
                marginTop: "32px",
                padding: "20px",
                background: "#f8fafc",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#635bff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronDown size={24} color="white" />
              </div>
              <div>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}>
                  Cliquez sur les boutons ci-dessus pour tester la navigation
                </span>
                <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>
                  L'indicateur coloré suit la page active avec une animation fluide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function MegaMenuDemo() {
  return <MegaMenuAlwaysVisible />;
}
