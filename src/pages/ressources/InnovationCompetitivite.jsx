import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Trophy,
  TrendingUp,
  Rocket,
  Target,
  Zap,
  ChevronRight,
  Search,
  Star,
  Calendar,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Mock data - Innovation & Competitiveness
const programs = [
  {
    id: 1,
    title: "Prix National de l'Innovation",
    type: "Concours",
    description:
      "Le Prix National de l'Innovation célèbre les entrepreneurs camerounais qui proposent des solutions innovantes à des problèmes locaux.",
    benefits: [
      "Prix en espèces de 10 à 50 millions FCFA",
      "Accompagnement technique personnalisé",
      "Exposition médiatique nationale",
      "Accès au réseau des anciens vainqueurs",
    ],
    deadline: "2024-03-31",
    isOpen: true,
    category: "Concours",
    participants: 245,
    icon: Trophy,
    color: "#f59e0b",
  },
  {
    id: 2,
    title: "Programme Innovation Lab",
    type: "Programme",
    description:
      "Un programme d'incubation de 6 mois pour transformer votre prototype en entreprise viable avec un accompagnement intensif.",
    benefits: [
      "Espace de coworking gratuit",
      "Mentorat par des experts internationaux",
      "Formation en méthodologie lean startup",
      "Financement initial jusqu'à 5 millions FCFA",
    ],
    deadline: "2024-02-28",
    isOpen: true,
    category: "Incubation",
    participants: 48,
    icon: Rocket,
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Challenge Digitalisation PME",
    type: "Appel à projets",
    description:
      "Accompagnement des PME traditionnelles dans leur transformation digitale pour améliorer leur compétitivité.",
    benefits: [
      "Audit digital gratuit",
      "Subvention jusqu'à 3 millions FCFA",
      "Formation aux outils numériques",
      "Accompagnement technique 12 mois",
    ],
    deadline: "2024-04-15",
    isOpen: true,
    category: "Transformation",
    participants: 128,
    icon: Zap,
    color: "#10b981",
  },
  {
    id: 4,
    title: "Programme Export Booster",
    type: "Programme",
    description:
      "Accompagnement des PME souhaitant développer leurs activités à l'international et conquérir de nouveaux marchés.",
    benefits: [
      "Formation à l'export",
      "Mise en relation avec partenaires internationaux",
      "Soutien logistique et administratif",
      "Participation salons internationaux",
    ],
    deadline: "2024-05-01",
    isOpen: true,
    category: "International",
    participants: 67,
    icon: TrendingUp,
    color: "#0ea5e9",
  },
];

const successStories = [
  {
    id: 1,
    company: "AgriTech Solutions",
    founder: "Marie Claire D.",
    sector: "Agriculture",
    achievement:
      "De startup à leader du marché en 2 ans, avec 50% d'augmentation de rendement pour les agriculteurs partenaires.",
    image: "/images/success-agri.jpg",
    quote:
      "Le programme Innovation Lab nous a donné les outils et le réseau pour passer de l'idée à l'impact.",
  },
  {
    id: 2,
    company: "MediConnect",
    founder: "Dr. Thomas N.",
    sector: "Santé",
    achievement:
      "Solution de télémédecine couvrant maintenant 200 villages ruraux avec plus de 50 000 consultations réalisées.",
    image: "/images/success-health.jpg",
    quote:
      "Le Prix National de l'Innovation a été le tremplin qui nous a permis de lever nos premiers fonds.",
  },
  {
    id: 3,
    company: "EcoPack",
    founder: "Pierre M.",
    sector: "Environnement",
    achievement:
      "Emballages biodégradables utilisés par 30 grandes enseignes, avec une réduction de 80% du plastique.",
    image: "/images/success-eco.jpg",
    quote:
      "L'accompagnement technique nous a permis d'industrialiser notre solution en un temps record.",
  },
];

const tools = [
  {
    title: "Diagnostic compétitivité",
    description: "Évaluez votre position concurrentielle et identifiez les axes d'amélioration.",
    icon: Target,
    color: "#f59e0b",
  },
  {
    title: "Calculateur ROI innovation",
    description: "Estimez le retour sur investissement de vos projets d'innovation.",
    icon: TrendingUp,
    color: "#10b981",
  },
  {
    title: "Benchmark sectoriel",
    description: "Comparez votre performance aux standards du secteur.",
    icon: Lightbulb,
    color: "#8b5cf6",
  },
];

function InnovationCompetitivite() {
  const [activeTab, setActiveTab] = useState("programs");

  return (
    <div className="innovation-page">
      <Helmet>
        <title>
          Innovation et compétitivité | STARTERKIT CM - Programmes et concours
        </title>
        <meta
          name="description"
          content="Découvrez les programmes d'innovation, concours et outils pour renforcer la compétitivité de votre entreprise au Cameroun."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="innovation-hero">
        <div className="innovation-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="innovation-badge">
              <Lightbulb size={18} />
              <span>Innovation</span>
            </div>
            <h1>
              Innovation et<br />
              <span className="gradient-text">Compétitivité</span>
            </h1>
            <p>
              Stimulez votre créativité, renforcez votre avantage concurrentiel et
              participez aux programmes d'excellence du Cameroun.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="innovation-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="stat">
              <Trophy size={32} />
              <div>
                <span className="stat-value">250+</span>
                <span className="stat-label">Entrepreneurs accompagnés</span>
              </div>
            </div>
            <div className="stat">
              <Award size={32} />
              <div>
                <span className="stat-value">85M€</span>
                <span className="stat-label">Financements obtenus</span>
              </div>
            </div>
            <div className="stat">
              <Rocket size={32} />
              <div>
                <span className="stat-value">120+</span>
                <span className="stat-label">Startups créées</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="innovation-content">
        {/* Tabs */}
        <div className="innovation-tabs">
          <button
            className={`tab ${activeTab === "programs" ? "active" : ""}`}
            onClick={() => setActiveTab("programs")}
          >
            <Lightbulb size={20} />
            Programmes & Concours
          </button>
          <button
            className={`tab ${activeTab === "stories" ? "active" : ""}`}
            onClick={() => setActiveTab("stories")}
          >
            <Star size={20} />
            Histoires de succès
          </button>
          <button
            className={`tab ${activeTab === "tools" ? "active" : ""}`}
            onClick={() => setActiveTab("tools")}
          >
            <Target size={20} />
            Outils
          </button>
        </div>

        {/* Programs Tab */}
        {activeTab === "programs" && (
          <div className="programs-section">
            <div className="section-header">
              <h2>
                <Rocket size={28} />
                Programmes et appels à projets
              </h2>
              <p>
                Découvrez les opportunités pour développer votre innovation et
                renforcer votre compétitivité.
              </p>
            </div>

            <div className="programs-grid">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  className="program-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div
                    className="program-header"
                    style={{ background: `${program.color}15` }}
                  >
                    <div
                      className="program-icon"
                      style={{ background: program.color }}
                    >
                      <program.icon size={24} color="white" />
                    </div>
                    <span className="program-category">{program.category}</span>
                    {program.isOpen && <span className="open-badge">Ouvert</span>}
                  </div>
                  <div className="program-body">
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    <ul className="benefits">
                      {program.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i}>
                          <Sparkles size={14} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <div className="program-meta">
                      <span className="deadline">
                        <Calendar size={14} />
                        Date limite:{" "}
                        {new Date(program.deadline).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                      <span className="participants">
                        <Users size={14} />
                        {program.participants} participants
                      </span>
                    </div>
                  </div>
                  <div className="program-footer">
                    <button className="details-btn">
                      En savoir plus
                      <ChevronRight size={18} />
                    </button>
                    <button className="apply-btn" onClick={() => window.location.href = "/signup?redirect=/ressources/innovation"}>Postuler</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === "stories" && (
          <div className="stories-section">
            <div className="section-header">
              <h2>
                <Star size={28} />
                Histoires de succès
              </h2>
              <p>
                Inspirez-vous des parcours d'entrepreneurs qui ont transformé
                leurs idées en entreprises à impact.
              </p>
            </div>

            <div className="stories-grid">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  className="story-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="story-image">
                    <div
                      className="story-placeholder"
                      style={{ background: `linear-gradient(135deg, ${[
                        "#10b981",
                        "#059669",
                        "#0ea5e9",
                      ][index % 3]} 0%, ${[
                        "#059669",
                        "#0284c7",
                        "#7c3aed",
                      ][index % 3]} 100%)` }}
                    >
                      <Award size={48} color="white" opacity={0.5} />
                    </div>
                  </div>
                  <div className="story-content">
                    <span className="story-sector">{story.sector}</span>
                    <h3>{story.company}</h3>
                    <p className="story-founder">Par {story.founder}</p>
                    <blockquote className="story-quote">
                      "{story.quote}"
                    </blockquote>
                    <div className="story-achievement">
                      <Trophy size={16} />
                      <span>{story.achievement}</span>
                    </div>
                    <button className="story-btn">
                      Lire l'histoire complète
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === "tools" && (
          <div className="tools-section">
            <div className="section-header">
              <h2>
                <Target size={28} />
                Outils d'évaluation
              </h2>
              <p>
                Utilisez nos outils pour évaluer votre compétitivité et identifier
                les opportunités d'amélioration.
              </p>
            </div>

            <div className="tools-grid">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  className="tool-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div
                    className="tool-icon"
                    style={{ background: `${tool.color}15` }}
                  >
                    <tool.icon size={32} style={{ color: tool.color }} />
                  </div>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <button className="tool-btn">
                    Accéder à l'outil
                    <ChevronRight size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      <style>{`
        .innovation-page {
          min-height: 100vh;
          background: #f8fafc;

        }

        /* Hero */
        .innovation-hero {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          padding: 80px 24px;
        }

        .innovation-hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .innovation-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .innovation-hero h1 {
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .innovation-hero p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.85);
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 48px;
        }

        /* Stats */
        .innovation-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 20px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat svg {
          color: #fbbf24;
        }

        .stat-value {
          display: block;
          font-size: 28px;
          font-weight: 800;
          color: white;
        }

        .stat-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Content */
        .innovation-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        /* Tabs */
        .innovation-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 16px;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab:hover {
          background: #f3f4f6;
        }

        .tab.active {
          background: #8b5cf6;
          color: white;
        }

        /* Section Header */
        .section-header {
          margin-bottom: 32px;
        }

        .section-header h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 12px;
        }

        .section-header p {
          font-size: 16px;
          color: #6b7280;
          max-width: 600px;
        }

        /* Programs */
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }

        .program-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .program-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .program-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
        }

        .program-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .program-category {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .open-badge {
          margin-left: auto;
          background: #10b981;
          color: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }

        .program-body {
          padding: 0 24px 24px;
        }

        .program-body h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 12px;
        }

        .program-body p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
        }

        .benefits li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: #4b5563;
          margin-bottom: 8px;
        }

        .benefits svg {
          color: #8b5cf6;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .program-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 12px;
          color: #9ca3af;
        }

        .program-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .program-footer {
          display: flex;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid #f3f4f6;
        }

        .details-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .apply-btn {
          margin-left: auto;
          background: #8b5cf6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apply-btn:hover {
          background: #7c3aed;
        }

        /* Stories */
        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }

        .story-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .story-image {
          height: 160px;
        }

        .story-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .story-content {
          padding: 24px;
        }

        .story-sector {
          display: inline-block;
          background: #f3f4f6;
          color: #6b7280;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .story-content h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 4px;
        }

        .story-founder {
          font-size: 14px;
          color: #9ca3af;
          margin-bottom: 16px;
        }

        .story-quote {
          font-size: 15px;
          color: #4b5563;
          font-style: italic;
          border-left: 3px solid #8b5cf6;
          padding-left: 16px;
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .story-achievement {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #10b981;
          margin-bottom: 20px;
        }

        .story-achievement span {
          color: #4b5563;
        }

        .story-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #8b5cf6;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Tools */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .tool-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .tool-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .tool-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .tool-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 12px;
        }

        .tool-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .tool-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f3f4f6;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a2e;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tool-btn:hover {
          background: #e5e7eb;
        }

        @media (max-width: 768px) {
          .innovation-stats {
            grid-template-columns: 1fr;
          }

          .innovation-tabs {
            flex-wrap: wrap;
          }

          .programs-grid,
          .stories-grid,
          .tools-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default InnovationCompetitivite;
