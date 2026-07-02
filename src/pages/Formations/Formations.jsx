import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// Formation card component with image and professional design
const FormationCard = ({ formation, index }) => {
  const categoryColors = {
    "Sensibilisation": { bg: "rgba(16, 185, 129, 0.1)", text: "#059669", border: "#10b981" },
    "Création": { bg: "rgba(99, 91, 255, 0.1)", text: "#635bff", border: "#6366f1" },
    "Gestion": { bg: "rgba(245, 158, 11, 0.1)", text: "#d97706", border: "#f59e0b" },
    "Marketing": { bg: "rgba(236, 72, 153, 0.1)", text: "#db2777", border: "#ec4899" },
    "Finance": { bg: "rgba(14, 165, 233, 0.1)", text: "#0284c7", border: "#0ea5e9" },
  };

  const colors = categoryColors[formation.category] || categoryColors["Sensibilisation"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        background: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      className="formation-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
      }}
    >
      {/* Image Header */}
      <div
        style={{
          height: "160px",
          backgroundImage: `linear-gradient(135deg, rgba(99, 91, 255, 0.2) 0%, rgba(124, 58, 237, 0.4) 100%), url(${formation.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: colors.bg,
            color: colors.text,
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            border: `1px solid ${colors.border}`,
          }}
        >
          {formation.category}
        </div>
        {/* Badge certifiant */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.95)",
            padding: "6px 10px",
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#1a1a2e",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          Certifiant
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: "10px",
            lineHeight: "1.3",
          }}
        >
          {formation.title}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            lineHeight: "1.6",
            marginBottom: "16px",
          }}
        >
          {formation.description}
        </p>

        {/* Meta information */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748b" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {formation.duration}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748b" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            {formation.level}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748b" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formation.hours}
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open("https://campus.studieslearning.com/", "_blank")}
          style={{
            width: "100%",
            padding: "14px 20px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Acceder a la formation
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

function Formations() {
  const [filter, setFilter] = useState("all");

  const formations = [
    {
      title: "Fondamentaux de l'entrepreneuriat",
      category: "Sensibilisation",
      description: "Apprenez les bases de la creation d'entreprise au Cameroun, de l'idee a la realisation de votre projet.",
      duration: "2 semaines",
      level: "Debutant",
      hours: "8h de cours",
      image: "/training.jpg",
    },
    {
      title: "Business Model Canvas",
      category: "Creation",
      description: "Masterisez l'outil Canvas pour structurer et valider votre modele d'affaires de maniere visuelle.",
      duration: "1 semaine",
      level: "Debutant",
      hours: "4h de cours",
      image: "/training2.jpg",
    },
    {
      title: "Etude de marche",
      category: "Creation",
      description: "Apprenez a analyser votre marche, identifier vos clients et quantifier vos opportunites commerciales.",
      duration: "2 semaines",
      level: "Intermediaire",
      hours: "6h de cours",
      image: "/training.jpg",
    },
    {
      title: "Gestion financiere",
      category: "Gestion",
      description: "Maitrisez la comptabilite, les flux de tresorerie et les indicateurs financiers de votre entreprise.",
      duration: "4 semaines",
      level: "Intermediaire",
      hours: "12h de cours",
      image: "/training2.jpg",
    },
    {
      title: "Marketing digital",
      category: "Marketing",
      description: "Apprenez a promouvoir votre entreprise sur les reseaux sociaux et les plateformes numeriques.",
      duration: "3 semaines",
      level: "Intermediaire",
      hours: "9h de cours",
      image: "/training.jpg",
    },
    {
      title: "Introduction a la comptabilite",
      category: "Finance",
      description: "Les bases de la comptabilite generale pour entrepreneurs debutants sans formation comptable.",
      duration: "3 semaines",
      level: "Debutant",
      hours: "8h de cours",
      image: "/training2.jpg",
    },
  ];

  const categories = [
    { key: "all", label: "Toutes", icon: "grid" },
    { key: "Sensibilisation", label: "Sensibilisation", icon: "eye" },
    { key: "Creation", label: "Creation", icon: "plus-circle" },
    { key: "Gestion", label: "Gestion", icon: "settings" },
    { key: "Marketing", label: "Marketing", icon: "trending-up" },
    { key: "Finance", label: "Finance", icon: "dollar-sign" },
  ];

  const filteredFormations = filter === "all" 
    ? formations 
    : formations.filter(f => f.category === filter);

  return (
    <>
      <Helmet>
        <title>Formations - STARTERKITCM</title>
      </Helmet>

      <div
        style={{
          padding: "100px 24px 60px",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          {/* Header Section */}

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "48px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "12px 24px",
                  borderRadius: "25px",
                  border: "none",
                  background: filter === cat.key
                    ? "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)"
                    : "white",
                  color: filter === cat.key ? "white" : "#64748b",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: filter === cat.key
                    ? "0 4px 15px rgba(99, 91, 255, 0.4)"
                    : "0 2px 10px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                {cat.key === "all" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                )}
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Formation Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
            }}
          >
            {filteredFormations.map((formation, index) => (
              <FormationCard key={index} formation={formation} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredFormations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                style={{ margin: "0 auto 20px" }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" }}>
                Aucune formation trouvee
              </h3>
              <p style={{ fontSize: "14px", color: "#64748b" }}>
                Aucune formation ne correspond a cette categorie.
              </p>
            </motion.div>
          )}

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: "48px",
              padding: "24px 32px",
              background: "linear-gradient(135deg, rgba(99, 91, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
              borderRadius: "16px",
              border: "1px solid rgba(99, 91, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a2e", marginBottom: "4px" }}>
                Acces au campus e-learning
              </h4>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                Vous serez redirige vers notre plateforme partenaire <strong>campus.studieslearning.com</strong> pour suivre les formations en ligne.
                Votre progression sera synchronisee avec STARTERKITCM.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open("https://campus.studieslearning.com/", "_blank")}
              style={{
                padding: "12px 24px",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#635bff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Visiter le campus
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .formation-card {
            margin: 0 -8px;
          }
        }
      `}</style>
    </>
  );
}

export default Formations;
