import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Briefcase,
  Heart,
  Users,
  MapPin,
  Calendar,
  ChevronRight,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Target,
  Eye,
  DollarSign,
  Network,
} from "lucide-react";

// Mock data - Entrepreneur Projects
const projects = [
  {
    id: 1,
    title: "AgriTech Solutions",
    entrepreneur: "Marie Claire D.",
    category: "Agriculture",
    location: "Yaoundé, Centre",
    budget: 15000000,
    raised: 8500000,
    investors: 12,
    description:
      "Plateforme numérique connectant les agriculteurs aux marchés et aux intrants agricoles. Solution déjà déployée dans 50 villages.",
    impact: "2000+ agriculteurs accompagnés",
    stage: "Croissance",
    image: "/images/project-agri.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "EcoDelivery",
    entrepreneur: "Thomas N.",
    category: "Logistique",
    location: "Douala, Littoral",
    budget: 8000000,
    raised: 6000000,
    investors: 8,
    description:
      "Service de livraison écologique utilisant des véhicules électriques et des points de relais écologiques.",
    impact: "50 tonnes CO2 économisées",
    stage: "Extension",
    image: "/images/project-delivery.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "MediConnect",
    entrepreneur: "Dr. Paul M.",
    category: "Santé",
    location: "Yaoundé, Centre",
    budget: 25000000,
    raised: 12000000,
    investors: 15,
    description:
      "Application de télémédecine permettant aux patients ruraux d'accéder à des consultations médicales spécialisées.",
    impact: "50000+ consultations réalisées",
    stage: "Expansion",
    image: "/images/project-health.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "EduLearn",
    entrepreneur: "Sophie B.",
    category: "Éducation",
    location: "Bafoussam, Ouest",
    budget: 12000000,
    raised: 4000000,
    investors: 5,
    description:
      "Plateforme d'apprentissage en ligne pour les élèves du primaire et secondaire camerounais.",
    impact: "10000+ élèves inscrits",
    stage: "Amorçage",
    image: "/images/project-edu.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "CleanWater Tech",
    entrepreneur: "Jean-Pierre K.",
    category: "Environnement",
    location: "Garoua, Nord",
    budget: 18000000,
    raised: 9000000,
    investors: 10,
    description:
      "Systèmes de purification d'eau solaires pour les communautés rurales sans accès à l'eau potable.",
    impact: "15000 personnes avec accès à l'eau",
    stage: "Croissance",
    image: "/images/project-water.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "FinPay",
    entrepreneur: "Alain M.",
    category: "Fintech",
    location: "Douala, Littoral",
    budget: 30000000,
    raised: 20000000,
    investors: 22,
    description:
      "Solution de paiement mobile pour les PME africaines avec fonctionnalités de micro-crédit.",
    impact: "5000+ PME partenaires",
    stage: "Expansion",
    image: "/images/project-fintech.jpg",
    featured: true,
  },
];

const categories = [
  { id: "all", label: "Tous" },
  { id: "Agriculture", label: "Agriculture" },
  { id: "Santé", label: "Santé" },
  { id: "Éducation", label: "Éducation" },
  { id: "Environnement", label: "Environnement" },
  { id: "Logistique", label: "Logistique" },
  { id: "Fintech", label: "Fintech" },
];

const stages = [
  { id: "all", label: "Tous les stades" },
  { id: "Amorçage", label: "Amorçage" },
  { id: "Croissance", label: "Croissance" },
  { id: "Extension", label: "Extension" },
  { id: "Expansion", label: "Expansion" },
];

function EntrepreneurProjects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesStage =
      selectedStage === "all" || project.stage === selectedStage;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.entrepreneur.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStage && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (raised, budget) => {
    return Math.min((raised / budget) * 100, 100);
  };

  return (
    <div className="projects-page">
      <Helmet>
        <title>
          Projets d'entrepreneurs | STARTERKIT CM - Investissez dans l'avenir
        </title>
        <meta
          name="description"
          content="Découvrez et investissez dans les projets d'entrepreneurs camerounais. Trouvez des opportunités d'investissement à fort impact."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="projects-hero">
        <div className="projects-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="projects-badge">
              <Briefcase size={18} />
              <span>250+ Projets</span>
            </div>
            <h1>
              Projets
              <br />
              <span className="gradient-text">d'Entrepreneurs</span>
            </h1>
            <p>
              Découvrez les projets innovants des entrepreneurs camerounais et
              participez à leur financement pour un avenir économique plus fort.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="projects-search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Search size={22} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un projet, entrepreneur ou secteur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filtres
            </button>
          </motion.div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              className="filters-panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="filter-group">
                <label>Secteur</label>
                <div className="filter-chips">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`filter-chip ${
                        selectedCategory === cat.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <label>Stade de développement</label>
                <div className="filter-chips">
                  {stages.map((stage) => (
                    <button
                      key={stage.id}
                      className={`filter-chip ${
                        selectedStage === stage.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedStage(stage.id)}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            className="projects-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p>Vous avez un projet ?</p>
            <button
              className="register-btn"
              onClick={() =>
                (window.location.href =
                  "/signup?type=entrepreneur&redirect=/ressources/projets")
              }
            >
              <Plus size={18} />
              Soumettre mon projet
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="projects-content">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="featured-section">
            <h2>
              <Target size={24} />
              Projets en vedettes
            </h2>
            <div className="featured-grid">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="stats-summary">
          <div className="stat-card">
            <DollarSign size={28} />
            <div>
              <span className="stat-value">2.5M€</span>
              <span className="stat-label">Levés cette année</span>
            </div>
          </div>
          <div className="stat-card">
            <Users size={28} />
            <div>
              <span className="stat-value">150+</span>
              <span className="stat-label">Investisseurs actifs</span>
            </div>
          </div>
          <div className="stat-card">
            <Network size={28} />
            <div>
              <span className="stat-value">85%</span>
              <span className="stat-label">Taux de réussite</span>
            </div>
          </div>
          <div className="stat-card">
            <TrendingUp size={28} />
            <div>
              <span className="stat-value">x3.2</span>
              <span className="stat-label">Retour moyen</span>
            </div>
          </div>
        </div>

        {/* All Projects */}
        <div className="projects-section">
          <div className="section-header">
            <h2>
              <Briefcase size={24} />
              Tous les projets
              <span className="count">({regularProjects.length})</span>
            </h2>
            <div className="view-toggle">
              <button className="view-btn active">
                <Eye size={18} />
                Grille
              </button>
              <button className="view-btn">
                <Target size={18} />
                Liste
              </button>
            </div>
          </div>

          <div className="projects-grid">
            {regularProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {regularProjects.length === 0 && (
            <div className="no-results">
              <Search size={48} />
              <p>Aucun projet trouvé pour "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedStage("all");
                }}
              >
                Effacer les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .projects-page {
          min-height: 100vh;
          background: #f8fafc;

        }

        /* Hero */
        .projects-hero {
          background: #7c3aed;
          padding: 80px 24px;
        }

        .projects-hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .projects-badge {
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

        .projects-hero h1 {
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects-hero p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.85);
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        /* Search */
        .projects-search {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 16px;
          padding: 8px 8px 8px 20px;
          max-width: 700px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          margin-bottom: 16px;
        }

        .projects-search .search-icon {
          color: #9ca3af;
          margin-right: 12px;
        }

        .projects-search input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          color: #1a1a2e;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f3f4f6;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-toggle:hover {
          background: #e5e7eb;
        }

        /* Filters Panel */
        .filters-panel {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .filter-group {
          margin-bottom: 16px;
        }

        .filter-group:last-child {
          margin-bottom: 0;
        }

        .filter-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 10px;
        }

        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-chip {
          background: #f3f4f6;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-chip:hover {
          background: #e5e7eb;
        }

        .filter-chip.active {
          background: #d97706;
          color: white;
        }

        /* CTA */
        .projects-cta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
        }

        .projects-cta p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
        }

        .register-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .register-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Content */
        .projects-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        /* Sections */
        .featured-section,
        .projects-section {
          margin-bottom: 48px;
        }

        .featured-section h2,
        .projects-section h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 24px;
        }

        .projects-section .count {
          font-size: 16px;
          font-weight: 400;
          color: #9ca3af;
        }

        /* Featured Grid */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }

        /* Stats Summary */
        .stats-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .stat-card svg {
          color: #f59e0b;
        }

        .stat-value {
          display: block;
          font-size: 24px;
          font-weight: 800;
          color: #1a1a2e;
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
        }

        /* View Toggle */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .view-toggle {
          display: flex;
          gap: 8px;
        }

        .view-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-btn:hover,
        .view-btn.active {
          border-color: #f59e0b;
          color: #f59e0b;
        }

        /* Project Card */
        .project-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .project-image {
          height: 160px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-placeholder {
          display: flex;
          background: #7c3aed;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .project-content {
          padding: 24px;
        }

        .project-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .project-category {
          display: inline-flex;
          background: #fef3c7;
          color: #d97706;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .project-stage {
          font-size: 12px;
          color: #9ca3af;
        }

        .project-content h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 4px;
        }

        .project-entrepreneur {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .project-description {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        /* Funding Progress */
        .funding-progress {
          margin-bottom: 20px;
        }

        .progress-bar {
          height: 8px;
          background: #f3f4f6;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .funding-details {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .raised {
          color: #10b981;
          font-weight: 600;
        }

        .budget {
          color: #6b7280;
        }

        /* Project Meta */
        .project-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 20px;
        }

        .project-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .project-impact {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ecfdf5;
          color: #10b981;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        /* CTA Button */
        .project-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .details-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid #e5e7eb;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
        }

        .invest-btn {
          background: #7c3aed;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .invest-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #9ca3af;
        }

        .no-results svg {
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .no-results p {
          font-size: 18px;
          margin-bottom: 16px;
        }

        .no-results button {
          background: #f59e0b;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .featured-grid,
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .projects-cta {
            flex-direction: column;
            align-items: flex-start;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, featured, index }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (raised, budget) => {
    return Math.min((raised / budget) * 100, 100);
  };

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="project-image">
        <div className="project-placeholder">
          <Briefcase size={48} color="white" opacity={0.5} />
        </div>
      </div>
      <div className="project-content">
        <div className="project-header">
          <span className="project-category">{project.category}</span>
          <span className="project-stage">{project.stage}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-entrepreneur">Par {project.entrepreneur}</p>
        <p className="project-description">{project.description}</p>

        {/* Funding Progress */}
        <div className="funding-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${calculateProgress(project.raised, project.budget)}%`,
              }}
            />
          </div>
          <div className="funding-details">
            <span className="raised">
              {formatCurrency(project.raised)} levés
            </span>
            <span className="budget">
              Objectif: {formatCurrency(project.budget)}
            </span>
          </div>
        </div>

        <div className="project-meta">
          <span>
            <MapPin size={14} />
            {project.location}
          </span>
          <span>
            <Users size={14} />
            {project.investors} investisseurs
          </span>
        </div>

        <div className="project-impact">
          <Heart size={16} />
          <span>{project.impact}</span>
        </div>

        <div className="project-cta">
          <button className="details-btn">
            Voir les détails
            <ChevronRight size={16} />
          </button>
          <button
            className="invest-btn"
            onClick={() =>
              (window.location.href =
                "/signup?type=investor&redirect=/ressources/projets")
            }
          >
            Investir
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default EntrepreneurProjects;
