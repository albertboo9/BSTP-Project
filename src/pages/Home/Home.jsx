import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import OrbitalBubbles from "../../components/orbital/OrbitalBubbles";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

// ============================================
// PROFESSIONAL ICONS FROM LUCIDE-REACT
// ============================================

import {
  Lightbulb,
  Users,
  UserPlus,
  TrendingUp,
  Scale,
  Rocket,
  ArrowRight,
  Sparkles,
  Target,
  Briefcase,
  Shield,
  Globe,
  Zap,
  Heart,
  Building2,
  FileText,
  Search,
  MessageCircle,
  Check,
  Lock,
  Building,
  Award,
  DollarSign,
  Truck,
  GraduationCap,
  BookOpen,
  Factory,
  Badge,
  Coins,
} from "lucide-react";

// ============================================
// NEED OPTIONS DATA
// ============================================

const needOptions = [
  {
    id: "sensibiliser",
    title: "Me sensibiliser",
    subtitle: "Decouvrez l'ecosysteme entrepreneurial",
    icon: Lightbulb,
    color: "#635bff",
    bgColor: "rgba(99, 91, 255, 0.08)",
    borderColor: "rgba(99, 91, 255, 0.2)",
    parcours: [
      { title: "M'informer", badge: "Gratuit", badgeColor: "#10b981" },
      {
        title: "Debuter dans l'entrepreneuriat",
        badge: "Guide",
        badgeColor: "#635bff",
      },
    ],
  },
  {
    id: "reseau",
    title: "Developper mon reseau",
    subtitle: "Rencontrez des pairs et partenaires",
    icon: Users,
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.2)",
    parcours: [
      {
        title: "Reseau de partenaires",
        badge: "Gratuit",
        badgeColor: "#10b981",
      },
      {
        title: "Evenements networking",
        badge: "Calendrier",
        badgeColor: "#635bff",
      },
    ],
  },
  {
    id: "equipe",
    title: "Trouver une equipe",
    subtitle: "Recrutez ou rejoignez une equipe",
    icon: UserPlus,
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.08)",
    borderColor: "rgba(139, 92, 246, 0.2)",
    parcours: [
      { title: "Co-fondateurs", badge: "Plateforme", badgeColor: "#635bff" },
      { title: "Recrutement", badge: "Outils", badgeColor: "#f59e0b" },
    ],
  },
  {
    id: "activite",
    title: "Developper mon activite",
    subtitle: "Augmentez votre chiffre d'affaires",
    icon: TrendingUp,
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.08)",
    borderColor: "rgba(6, 182, 212, 0.2)",
    parcours: [
      { title: "Marketing digital", badge: "Formation", badgeColor: "#635bff" },
      {
        title: "Strategie commerciale",
        badge: "Conseil",
        badgeColor: "#f59e0b",
      },
    ],
  },
  {
    id: "probleme",
    title: "Resoudre un probleme",
    subtitle: "RH, fiscal, juridique ou financier",
    icon: Scale,
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.08)",
    borderColor: "rgba(249, 115, 22, 0.2)",
    parcours: [
      {
        title: "Assistance technique",
        badge: "Gratuit",
        badgeColor: "#10b981",
      },
      { title: "Mise en relation APME", badge: "Agent", badgeColor: "#635bff" },
    ],
  },
  {
    id: "autrement",
    title: "Entreprendre autrement",
    subtitle: "Vous avez un projet atypique?",
    icon: Rocket,
    color: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.08)",
    borderColor: "rgba(236, 72, 153, 0.2)",
    parcours: [
      {
        title: "Innovation sociale",
        badge: "Programme",
        badgeColor: "#635bff",
      },
      { title: "Projet alternatif", badge: "Conseil", badgeColor: "#f59e0b" },
    ],
  },
  // ============================================
  // NOUVELLES OPTIONS ENRICHIES
  // ============================================
  {
    id: "creer-entreprise",
    title: "Creer mon entreprise",
    subtitle: "Guide complet de creation d'entreprise",
    icon: Building,
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.08)",
    borderColor: "rgba(139, 92, 246, 0.2)",
    parcours: [
      {
        title: "Guide de creation",
        badge: "Complet",
        badgeColor: "#8b5cf6",
      },
      {
        title: "Formalites administratives",
        badge: "Checklist",
        badgeColor: "#10b981",
      },
      {
        title: "Statut juridique",
        badge: "Conseil",
        badgeColor: "#f59e0b",
      },
    ],
  },
  {
    id: "certifier-produits",
    title: "Normaliser, certifier",
    subtitle: "Labelliser vos produits et services",
    icon: Award,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.08)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    parcours: [
      {
        title: "Certification produits",
        badge: "Procedures",
        badgeColor: "#f59e0b",
      },
      {
        title: "Label qualite",
        badge: "Normes",
        badgeColor: "#10b981",
      },
      {
        title: "Homologation",
        badge: "Regulation",
        badgeColor: "#635bff",
      },
    ],
  },
  {
    id: "financement",
    title: "Trouver un financement",
    subtitle: "Subventions, prets et investissements",
    icon: DollarSign,
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.2)",
    parcours: [
      {
        title: "Appui financier MINPMEESA",
        badge: "Subvention",
        badgeColor: "#10b981",
      },
      {
        title: "Banques partenaires",
        badge: "Prets",
        badgeColor: "#0ea5e9",
      },
      {
        title: "Investisseurs",
        badge: "Seed funding",
        badgeColor: "#8b5cf6",
      },
    ],
  },
  {
    id: "distribution",
    title: "Reseau de distribution",
    subtitle: "Partenaires et marketplaces",
    icon: Truck,
    color: "#0ea5e9",
    bgColor: "rgba(14, 165, 233, 0.08)",
    borderColor: "rgba(14, 165, 233, 0.2)",
    parcours: [
      {
        title: "Partenaires distribution",
        badge: "Annuaire",
        badgeColor: "#0ea5e9",
      },
      {
        title: "Marketplaces",
        badge: "Plateformes",
        badgeColor: "#10b981",
      },
      {
        title: "Export",
        badge: "International",
        badgeColor: "#8b5cf6",
      },
    ],
  },
  {
    id: "mentor",
    title: "Trouver un mentor",
    subtitle: "Accompagnement par des experts",
    icon: GraduationCap,
    color: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.08)",
    borderColor: "rgba(236, 72, 153, 0.2)",
    parcours: [
      {
        title: "Mentorat individuel",
        badge: "Matching",
        badgeColor: "#ec4899",
      },
      {
        title: "Reseau de mentors",
        badge: "Annuaire",
        badgeColor: "#8b5cf6",
      },
      {
        title: "Coaching",
        badge: "Sessions",
        badgeColor: "#f59e0b",
      },
    ],
  },
  {
    id: "formation",
    title: "Demarrer une formation",
    subtitle: "Campus e-learning certifiant",
    icon: BookOpen,
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.08)",
    borderColor: "rgba(99, 102, 241, 0.2)",
    parcours: [
      {
        title: "Campus e-learning",
        badge: "Formations",
        badgeColor: "#6366f1",
      },
      {
        title: "Certifications",
        badge: "Programme",
        badgeColor: "#10b981",
      },
      {
        title: "Webinaires",
        badge: "Evenements",
        badgeColor: "#0ea5e9",
      },
    ],
  },
];

// ============================================
// PARCOURS DATA
// ============================================

const parcoursData = [
  {
    id: "informer",
    title: "M'informer",
    subtitle: "Decouvrez l'ecosysteme entrepreneurial camerounais",
    description:
      "Accedez a des ressources completes sur l'environnement entrepreneurial, les opportunites et les acteurs cles.",
    conditions: "libre",
    icon: Lightbulb,
  },
  {
    id: "former",
    title: "Me former",
    subtitle: "Developpez vos competences entrepreneuriales",
    description:
      "Suivez des formations certifiantes dispensees par notre campus e-learning partenaire.",
    conditions: "libre",
    icon: Users,
  },
  {
    id: "financement",
    title: "Soumettre dossier appui financier",
    subtitle: "Obtenez un financement pour votre projet",
    description:
      "Presentez votre dossier pour obtenir un appui financier de nos partenaires.",
    conditions: "formelle",
    icon: Check,
  },
  {
    id: "investisseurs",
    title: "Mise en relation investisseurs",
    subtitle: "Trouvez des partenaires financiers",
    description:
      "Connectez-vous avec des investisseurs interesses par votre projet.",
    conditions: "formelle",
    icon: Users,
  },
  {
    id: "apme",
    title: "Mise en relation APME",
    subtitle: "Etre accompagne par un agent specialise",
    description:
      "Planifiez des rendez-vous avec des agents de l'APME pour un accompagnement personnalise.",
    conditions: "libre",
    icon: Users,
  },
  {
    id: "creer",
    title: "Aide a la creation d'entreprise",
    subtitle: "Formalisez votre entreprise",
    description:
      "Guide etape par etape pour la creation et la formalisation de votre entreprise.",
    conditions: "libre",
    icon: Check,
  },
  {
    id: "normalisation",
    title: "Procedure de normalisation",
    subtitle: "Obtenez la certification MINPEEMSA",
    description:
      "Validez vos competences et recevez une reconnaissance officielle du Ministere.",
    conditions: "formations",
    icon: Check,
  },
  {
    id: "partenaires",
    title: "Reseau de partenaires",
    subtitle: "Developpez votre ecosysteme",
    description:
      "Etablissez des collaborations avec des partenaires strategiques.",
    conditions: "libre",
    icon: Users,
  },
];

// ============================================
// NEED CARD COMPONENT
// ============================================

const NeedCard = ({ option, isSelected, onSelect, index }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(option)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        padding: "20px 24px",
        background: isSelected ? option.bgColor : "white",
        border: `2px solid ${isSelected ? option.color : option.borderColor}`,
        borderRadius: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: isSelected
          ? `0 8px 30px ${option.color}25`
          : "0 4px 20px rgba(0,0,0,0.05)",
        minWidth: "160px",
        flex: "1 1 160px",
        maxWidth: "200px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: isSelected ? option.color : option.bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
      >
        <option.icon size={24} color={isSelected ? "white" : option.color} />
      </div>
      <div style={{ textAlign: "left" }}>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: isSelected ? option.color : "#1a1a2e",
            marginBottom: "4px",
          }}
        >
          {option.title}
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            lineHeight: 1.4,
          }}
        >
          {option.subtitle}
        </p>
      </div>
    </motion.button>
  );
};

// ============================================
// PARCOURS CARD COMPONENT
// ============================================

const ParcoursCard = ({ parcours, index }) => {
  const isConditionne = parcours.conditions !== "libre";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <parcours.icon size={26} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: "4px",
            }}
          >
            {parcours.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              lineHeight: 1.5,
            }}
          >
            {parcours.subtitle}
          </p>
        </div>
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#4b5563",
          lineHeight: 1.6,
          marginBottom: "16px",
        }}
      >
        {parcours.description}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            background: isConditionne
              ? "rgba(245, 158, 11, 0.1)"
              : "rgba(16, 185, 129, 0.1)",
            borderRadius: "20px",
          }}
        >
          {isConditionne ? (
            <Lock size={14} color="#f59e0b" />
          ) : (
            <Check size={14} color="#10b981" />
          )}
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: isConditionne ? "#f59e0b" : "#10b981",
            }}
          >
            {isConditionne
              ? `Conditions: ${parcours.conditions}`
              : "Acces libre"}
          </span>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Commencer
          <ArrowRight size={16} color="white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// ============================================
// HERO SECTION - IMPACT DESIGN
// ============================================

const needsBubbles = [
  {
    id: "sensibiliser",
    title: "Me sensibiliser",
    icon: Lightbulb,
    color: "#635bff",
    bgColor: "rgba(99, 91, 255, 0.15)",
    delay: 0,
    parcours: [
      { title: "M'informer", badge: "Gratuit", badgeColor: "#10b981" },
      {
        title: "Debuter dans l'entrepreneuriat",
        badge: "Guide",
        badgeColor: "#635bff",
      },
    ],
  },
  {
    id: "reseau",
    title: "Developper mon reseau",
    icon: Users,
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.15)",
    delay: 150,
    parcours: [
      {
        title: "Reseau de partenaires",
        badge: "Gratuit",
        badgeColor: "#10b981",
      },
      {
        title: "Evenements networking",
        badge: "Calendrier",
        badgeColor: "#635bff",
      },
    ],
  },
  {
    id: "equipe",
    title: "M'entourer",
    icon: UserPlus,
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.15)",
    delay: 300,
    parcours: [
      { title: "Co-fondateurs", badge: "Plateforme", badgeColor: "#635bff" },
      { title: "Recrutement", badge: "Outils", badgeColor: "#f59e0b" },
    ],
  },
  {
    id: "activite",
    title: "Developper mon activite",
    icon: TrendingUp,
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.15)",
    delay: 450,
    parcours: [
      { title: "Marketing digital", badge: "Formation", badgeColor: "#635bff" },
      {
        title: "Strategie commerciale",
        badge: "Conseil",
        badgeColor: "#f59e0b",
      },
    ],
  },
  {
    id: "probleme",
    title: "Resoudre un probleme",
    icon: Scale,
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.15)",
    delay: 600,
    parcours: [
      {
        title: "Assistance technique",
        badge: "Gratuit",
        badgeColor: "#10b981",
      },
      { title: "Mise en relation APME", badge: "Agent", badgeColor: "#635bff" },
    ],
  },
  {
    id: "autrement",
    title: "Entreprendre autrement",
    icon: Rocket,
    color: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.15)",
    delay: 750,
    parcours: [
      {
        title: "Innovation sociale",
        badge: "Programme",
        badgeColor: "#635bff",
      },
      { title: "Projet alternatif", badge: "Conseil", badgeColor: "#f59e0b" },
    ],
  },
];

// Bubble Card Component - RECTANGULAR GLASSMORPHISM DESIGN
function BubbleCard({ item, index, onSelect }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{
        opacity: 0,
        scale: 0.8,
        y: 50,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.5,
        delay: item.delay / 1000,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "200px",
        height: "72px",
        borderRadius: "16px",
        background: `linear-gradient(135deg, ${item.bgColor} 0%, rgba(255, 255, 255, 0.5) 10%)`,
        backdropFilter: "blur(10px)",
        border: `2px solid ${item.color}50`,
        cursor: "pointer",
        boxShadow: `0 4px 20px ${item.color}15`,
        transition: "all 0.3s ease",
        padding: "0 20px",
        gap: "16px",
      }}
    >
      {/* Icon */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: item.delay / 1000 + 0.5,
        }}
        style={{
          flexShrink: 0,
        }}
      >
        <item.icon size={32} color={item.color} />
      </motion.div>

      {/* Title */}
      <span
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#1a1a2e",
          textAlign: "left",
          lineHeight: 1.4,
        }}
      >
        {item.title}
      </span>
    </motion.div>
  );
}

function HeroSection() {
  const [selectedNeeds, setSelectedNeeds] = useState([]);

  // Fonction pour effacer la sélection
  const clearSelection = () => setSelectedNeeds([]);

  // Fonction pour scroller vers la section Assistant
  const scrollToAssistant = () => {
    // Petit délai pour laisser le DOM se mettre à jour
    setTimeout(() => {
      const assistantSection = document.getElementById("assistant-section");
      if (assistantSection) {
        assistantSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const toggleNeed = (option) => {
    setSelectedNeeds((prev) => {
      const isSelected = prev.some((n) => n.id === option.id);
      if (isSelected) {
        return prev.filter((n) => n.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "#ffffff27",
        overflow: "hidden",
      }}
    >
      {/* Background Effects */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 91, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 91, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 91, 255, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

    <div style={{ minHeight: "80vh", position: "relative", transform: "translateY(-60px)" }}>
      <OrbitalBubbles />
    </div>

    {/* APME Split Screen Section */}
    <motion.section
      id="apme-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        minHeight: "500px",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: "-100px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99, 91, 255, 0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-150px",
        right: "-100px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />

      {/* Left side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.15)",
          }}
        >
          <img
            src="/employees-explaining-business.jpg"
            alt="Équipe APME - Accompagnement des entrepreneurs"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              display: "block",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(99, 91, 255, 0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />
        </motion.div>
      </motion.div>

      {/* Right side - Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px 60px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "50px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            width: "100%",
          }}
        >
          <img
            src="/logos/partners/APME.png"
            alt="APME Cameroun"
            style={{
              width: "95px",
              height: "95px",
              objectFit: "contain",
            }}
          />
          <span style={{
            fontSize: "34px",
            fontWeight: 700,
            color: "#1a1a2e",
            letterSpacing: "0.5px",
          }}>
            AGENCE DES PME
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 800,
            color: "#1a1a2e",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          L'<span style={{ color: "#635bff" }}>APME</span> vous accompagne
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            fontSize: "16px",
            color: "#475569",
            lineHeight: 1.7,
            marginBottom: "16px",
          }}
        >
          Informations, accompagnement, conseils, l'<strong>AGENCE DES PME</strong> est là pour vous aider à chaque étape de votre projet.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: "16px",
            color: "#475569",
            lineHeight: 1.7,
            marginBottom: "24px",
          }}
        >
          De nombreux acteurs innovent pour donner plus d'impact à leur projet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              background: "linear-gradient(135deg, #635bff 0%, #4f46e5 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(99, 91, 255, 0.35)",
              transition: "all 0.3s ease",
            }}
          >
            À votre tour d'être l'entrepreneur que vous rêvez!
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>

      {/* Assistant Section */}
      <motion.div
        id="assistant-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
          marginTop: "60px",
          marginBottom: "60px",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Assistant Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MessageCircle size={28} color="white" />
          </div>
          <div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: "4px",
              }}
            >
              Comment pouvons-nous vous aider aujourd'hui?
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Choisissez ce que vous souhaitez faire et laissez-vous guider
            </p>
          </div>
        </motion.div>

        {/* Need Options Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
            marginBottom: selectedNeeds.length > 0 ? "32px" : 0,
          }}
        >
          {needOptions.map((option, index) => (
            <NeedCard
              key={option.id}
              option={option}
              isSelected={selectedNeeds.some((n) => n.id === option.id)}
              onSelect={toggleNeed}
              index={index}
            />
          ))}
        </div>

        {/* Selected Parcours */}
        <AnimatePresence>
          {selectedNeeds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  paddingTop: "32px",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                      }}
                    >
                      {selectedNeeds.length} besoin
                      {selectedNeeds.length > 1 ? "x" : ""} selectionne
                      {selectedNeeds.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearSelection}
                    style={{
                      padding: "6px 14px",
                      background: "transparent",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      color: "#6b7280",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      marginLeft: "auto",
                    }}
                  >
                    Effacer la selection
                  </motion.button>
                </div>

                {/* Selected Needs Summary */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "24px",
                  }}
                >
                  {selectedNeeds.map((need) => (
                    <motion.div
                      key={need.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        background: need.bgColor,
                        borderRadius: "20px",
                        border: `1px solid ${need.color}30`,
                      }}
                    >
                      <need.icon size={16} color={need.color} />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: need.color,
                        }}
                      >
                        {need.title}
                      </span>
                      <button
                        onClick={() => toggleNeed(need)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "2px",
                          display: "flex",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={need.color}
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Recommended Parcours Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {selectedNeeds.map((need) =>
                    need.parcours.map((parcours, index) => (
                      <motion.div
                        key={`${need.id}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          background: "white",
                          borderRadius: "14px",
                          padding: "20px",
                          border: "1px solid #e5e7eb",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        whileHover={{
                          borderColor: "#635bff",
                          boxShadow: "0 4px 20px rgba(99, 91, 255, 0.15)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <div
                              style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "12px",
                                background:
                                  "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Check size={20} color="white" />
                            </div>
                            <div>
                              <h4
                                style={{
                                  fontSize: "15px",
                                  fontWeight: 600,
                                  color: "#1a1a2e",
                                  marginBottom: "2px",
                                }}
                              >
                                {parcours.title}
                              </h4>
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: "#6b7280",
                                }}
                              >
                                {parcours.subtitle}
                              </p>
                            </div>
                          </div>
                          <span
                            style={{
                              padding: "4px 10px",
                              background: `${parcours.badgeColor}15`,
                              color: parcours.badgeColor,
                              fontSize: "11px",
                              fontWeight: 600,
                              borderRadius: "12px",
                            }}
                          >
                            {parcours.badge}
                          </span>
                        </div>
                      </motion.div>
                    )),
                  )}
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      background:
                        "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(99, 91, 255, 0.35)",
                    }}
                  >
                    Acceder a ces parcours
                    <ArrowRight size={18} color="white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedNeed(null)}
                    style={{
                      padding: "14px 28px",
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      color: "#4b5563",
                      fontSize: "15px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Poser une autre question
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Fin de la section Hero */}
    </section>
  );
}

// ============================================
// PARCOURS SECTION
// ============================================

function ParcoursSection() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "#f8fafc",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "#1a1a2e",
              marginBottom: "16px",
            }}
          >
            Decouvrez nos parcours
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Chaque parcours est concu pour vous accompagner dans votre demarche
            entrepreneuriale
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {parcoursData.map((parcours, index) => (
            <ParcoursCard key={parcours.id} parcours={parcours} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FEATURES SECTION
// ============================================

function FeaturesSection() {
  const features = [
    {
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      title: "Orientation Strategique",
      description:
        "Decouvrez le parcours adapte a votre profil, vos competences et vos ambitions.",
    },
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: "Formation de Qualite",
      description:
        "Accedez a des formations certifiantes sur notre campus e-learning partenaire.",
    },
    {
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      title: "Certification Officielle",
      description:
        "Validez vos competences avec une reconnaissance du Ministere.",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      title: "Reseau Entrepreneurial",
      description:
        "Rejoignez une communaute dynamique d'entrepreneurs et de partenaires.",
    },
  ];

  return (
    <section
      style={{
        padding: "100px 24px",
        background: "white",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "#1a1a2e",
              marginBottom: "16px",
            }}
          >
            Pourquoi choisir STARTERKITCM?
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "32px",
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              style={{
                background: "#f8fafc",
                borderRadius: "20px",
                padding: "32px",
                textAlign: "center",
                border: "1px solid #e5e7eb",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={feature.icon} />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: "12px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================

function CTASection() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #1a1a2e 100%)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "white",
              marginBottom: "20px",
            }}
          >
            Pret a demarrer votre parcours entrepreneurial?
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "40px",
              lineHeight: 1.7,
            }}
          >
            Rejoignez des milliers d'entrepreneurs camerounais qui ont choisi
            STARTERKITCM pour les accompagner dans leur projet.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "18px 36px",
                  background:
                    "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                  border: "none",
                  borderRadius: "14px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 8px 30px rgba(99, 91, 255, 0.4)",
                }}
              >
                Commencer mon parcours
                <ArrowRight size={20} color="white" />
              </motion.button>
            </Link>
            <Link to="/parcours">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  background: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "18px 36px",
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: "14px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Decouvrir les parcours
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// MAIN HOME COMPONENT
// ============================================

function Home() {
  return (
    <>
      <Helmet>
        <title>STARTERKITCM - L'Entrepreneuriat au Cameroun</title>
        <meta
          name="description"
          content="Portez votre projet entrepreneurial au Cameroun. Orientation, formation et certification MINPEEMSA."
        />
      </Helmet>

      {/* Hero with Intelligent Assistant */}
      <HeroSection />

      {/* Parcours Section */}
      <ParcoursSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />

      <style>{`
        @media (max-width: 768px) {
          section {
            padding: 60px 16px !important;
          }
        }
      `}</style>
    </>
  );
}

export default Home;
