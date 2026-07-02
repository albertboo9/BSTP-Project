import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Users,
  Lightbulb,
  Rocket,
  Building2,
  ArrowRight,
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

export default function ResourcesMegaMenu() {
  const location = useLocation();

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        background: "white",
        borderTop: "1px solid #f1f5f9",
        borderBottom: "1px solid #f1f5f9",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        zIndex: 998,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 0",
          }}
        >
          {resourcesItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{ position: "relative" }}
              >
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    background: isActive ? `${item.color}12` : "transparent",
                    borderRadius: "12px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    border: isActive ? `1px solid ${item.color}30` : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = `${item.color}08`;
                      e.currentTarget.style.transform = "translateY(-2px)";
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
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
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
                      size={16}
                      color={isActive ? "white" : item.color}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ textAlign: "left" }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
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
                        fontSize: "11px",
                        color: "#9ca3af",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.description}
                    </span>
                  </div>

                  {/* Arrow on hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    style={{
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <ArrowRight size={14} color={item.color} />
                  </motion.div>
                </Link>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "60%",
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

        {/* CTA Right */}
        <div
          style={{
            marginLeft: "auto",
            paddingLeft: "24px",
            borderLeft: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#6b7280",
              textAlign: "right",
            }}
          >
            Toutes vos ressources
            <br />
            <strong style={{ color: "#1a1a2e" }}>en un clic</strong>
          </span>
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
            <Rocket size={20} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
