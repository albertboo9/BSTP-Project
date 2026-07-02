import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Users, TrendingUp, Calendar } from "lucide-react";

// Variantes d'animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 25px 50px rgba(99, 91, 255, 0.12)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.2
    }
  }
};

function PartnerCard({ partner, index }) {
  // Icône selon la catégorie
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Gouvernement":
      case "Institution":
        return <TrendingUp size={14} />;
      case "Organisation internationale":
        return <Users size={14} />;
      case "Financeur":
        return <TrendingUp size={14} />;
      case "Incubateur":
      case "Accélérateur":
        return <ArrowRight size={14} />;
      default:
        return <ArrowRight size={14} />;
    }
  };

  // Couleur de fond selon le statut
  const getStatusGradient = (color) => {
    return `linear-gradient(135deg, ${color}15 0%, ${color}10 100%)`;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-20px" }}
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "0",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer"
      }}
      className="partner-card"
    >
      {/* Header avec dégradé subtil */}
      <div
        style={{
          height: "8px",
          background: `linear-gradient(90deg, ${partner.color}, ${partner.color}80)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
      />

      {/* Badge catégorie */}
      <motion.div
        variants={badgeVariants}
        initial="hidden"
        whileInView="visible"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          background: `${partner.color}12`,
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: 600,
          color: partner.color,
          zIndex: 2
        }}
      >
        {getCategoryIcon(partner.category)}
        {partner.category}
      </motion.div>

      {/* Logo container */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        whileInView="visible"
        style={{
          width: "100px",
          height: "100px",
          margin: "50px auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          borderRadius: "20px",
          border: "1px solid #e2e8f0"
        }}
      >
        {/* Si le logo existe, l'afficher, sinon afficher les initiales */}
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "contain",
              borderRadius: "12px"
            }}
            onError={(e) => {
              // Fallback : afficher les initiales
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <span
          style={{
            display: partner.logo ? "none" : "flex",
            width: "70px",
            height: "70px",
            alignItems: "center",
            justifyContent: "center",
            background: partner.color,
            color: "white",
            borderRadius: "16px",
            fontSize: "24px",
            fontWeight: 700
          }}
        >
          {partner.name.substring(0, 2).toUpperCase()}
        </span>
      </motion.div>

      {/* Content */}
      <div style={{ padding: "0 24px 24px" }}>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1a1a2e",
            textAlign: "center",
            marginBottom: "4px",
            lineHeight: 1.2
          }}
        >
          {partner.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: "13px",
            color: "#6b7280",
            textAlign: "center",
            marginBottom: "16px",
            lineHeight: 1.4
          }}
        >
          {partner.description}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
            padding: "16px",
            background: "#f8fafc",
            borderRadius: "16px"
          }}
        >
          {partner.projects && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: partner.color,
                  lineHeight: 1
                }}
              >
                {partner.projects}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: "4px"
                }}
              >
                Projets
              </div>
            </div>
          )}
          {partner.funding && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: partner.color,
                  lineHeight: 1
                }}
              >
                {partner.funding}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: "4px"
                }}
              >
                Financé
              </div>
            </div>
          )}
          {partner.startups && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: partner.color,
                  lineHeight: 1
                }}
              >
                {partner.startups}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: "4px"
                }}
              >
                Startups
              </div>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: partner.color,
                lineHeight: 1
              }}
            >
              {partner.since}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginTop: "4px"
              }}
            >
              Depuis
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "14px 20px",
              background: `linear-gradient(135deg, ${partner.color} 0%, ${partner.color}dd 100%)`,
              color: "white",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 25px ${partner.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Visiter le site
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>

      {/* Effet de brillance au hover */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 0.5 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />
    </motion.div>
  );
}

export default PartnerCard;
