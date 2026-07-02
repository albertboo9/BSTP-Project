import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  ChevronRight,
  Filter,
  Plus,
  CheckCircle,
  Calendar,
  Building2,
} from "lucide-react";

// Mock data - Professional Directory
const professionals = [
  {
    id: 1,
    name: "Cabinet Juridique SOS",
    category: "Expertise juridique",
    description:
      "Cabinet spécialisé en droit des affaires, accompagnement des PME dans leurs procédures légales et fiscales.",
    phone: "+237 6XX XXX XXX",
    email: "contact@sos-juridique.cm",
    website: "https://sos-juridique.cm",
    location: "Yaoundé, Centre",
    years: 15,
    isVerified: true,
    rating: 4.8,
    reviews: 124,
    events: [
      { title: "Séminaire fiscal 2024", date: "2024-02-15" },
      { title: "Atelier création d'entreprise", date: "2024-03-10" },
    ],
    featured: true,
  },
  {
    id: 2,
    name: "FinanceGrow S.A",
    category: "Accompagnement financier",
    description:
      "Accompagnement des PME pour la levée de fonds, gestion financière et conseil en investissement.",
    phone: "+237 6XX XXX XXX",
    email: "info@financegrow.cm",
    website: "https://financegrow.cm",
    location: "Douala, Littoral",
    years: 10,
    isVerified: true,
    rating: 4.5,
    reviews: 89,
    events: [
      { title: "Session de pitch investisseurs", date: "2024-02-20" },
    ],
    featured: true,
  },
  {
    id: 3,
    name: "IncubaDouala",
    category: "Incubateur",
    description:
      "Incubateur de startups accompagneant les entrepreneurs dans le développement de leur projet.",
    phone: "+237 6XX XXX XXX",
    email: "hello@incubadouala.cm",
    website: "https://incubadouala.cm",
    location: "Douala, Littoral",
    years: 5,
    isVerified: true,
    rating: 4.7,
    reviews: 56,
    events: [
      { title: "Demo Day Batch 5", date: "2024-03-01" },
      { title: "Programme d'incubation 2024", date: "2024-04-15" },
    ],
    featured: false,
  },
  {
    id: 4,
    name: "Chambre de Commerce et d'Industrie",
    category: "Association",
    description:
      "Organisation professionnelle représentant les intérêts des entreprises auprès des pouvoirs publics.",
    phone: "+237 6XX XXX XXX",
    email: "contact@cci.cm",
    website: "https://cci.cm",
    location: "Douala, Littoral",
    years: 75,
    isVerified: true,
    rating: 4.3,
    reviews: 201,
    events: [
      { title: "Salon de l'entrepreneuriat", date: "2024-05-20" },
    ],
    featured: false,
  },
  {
    id: 5,
    name: "Consult'Up",
    category: "Cabinet de conseils",
    description:
      "Cabinet de conseil en stratégie et management aidant les entreprises à se développer.",
    phone: "+237 6XX XXX XXX",
    email: "info@consultup.cm",
    website: "https://consultup.cm",
    location: "Yaoundé, Centre",
    years: 8,
    isVerified: true,
    rating: 4.6,
    reviews: 45,
    events: [],
    featured: false,
  },
  {
    id: 6,
    name: "LegalTech Cameroon",
    category: "Expertise juridique",
    description:
      "Solution numérique pour les démarches juridiques et administratives des entreprises.",
    phone: "+237 6XX XXX XXX",
    email: "contact@legaltech.cm",
    website: "https://legaltech.cm",
    location: "Yaoundé, Centre",
    years: 3,
    isVerified: true,
    rating: 4.4,
    reviews: 32,
    events: [
      { title: "Webinar: digitaliser ses procédures", date: "2024-02-25" },
    ],
    featured: false,
  },
];

const categories = [
  { id: "all", label: "Tous", icon: Users },
  { id: "Expertise juridique", label: "Expertise juridique", icon: Building2 },
  { id: "Accompagnement financier", label: "Accompagnement financier", icon: Star },
  { id: "Incubateur", label: "Incubateur", icon: Star },
  { id: "Association", label: "Association", icon: Users },
  { id: "Cabinet de conseils", label: "Cabinet de conseils", icon: Star },
];

function ProfessionalDirectory() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPros = professionals.filter((pro) => {
    const matchesCategory =
      selectedCategory === "all" || pro.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPros = filteredPros.filter((pro) => pro.featured);
  const regularPros = filteredPros.filter((pro) => !pro.featured);

  return (
    <div className="directory-page">
      <Helmet>
        <title>
          Annuaire des professionnels | STARTERKIT CM - Experts et partenaires
        </title>
        <meta
          name="description"
          content="Découvrez notre annuaire de professionnels partenaires: experts juridiques, accompagnateurs financiers, incubateurs et conseils."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="directory-hero">
        <div className="directory-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="directory-badge">
              <Users size={18} />
              <span>250+ Professionnels</span>
            </div>
            <h1>
              Annuaire des<br />
              <span className="gradient-text">Professionnels</span>
            </h1>
            <p>
              Découvrez notre réseau d'experts, partenaires et accompagnateurs pour
              développer votre entreprise au Cameroun.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="directory-search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Search size={22} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un professionnel, cabinet ou service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">Rechercher</button>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="directory-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p>Vous êtes un professionnel ?</p>
            <button className="register-btn">
              <Plus size={18} />
              Référencer mon entreprise
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="directory-content">
        {/* Categories */}
        <div className="categories-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${
                selectedCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <cat.icon size={18} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Professionals */}
        {featuredPros.length > 0 && (
          <div className="featured-section">
            <h2>
              <Star size={24} />
              Partenaires recommandés
            </h2>
            <div className="featured-grid">
              {featuredPros.map((pro, index) => (
                <ProfessionalCard key={pro.id} pro={pro} featured index={index} />
              ))}
            </div>
          </div>
        )}

        {/* All Professionals */}
        <div className="directory-section">
          <h2>
            <Users size={24} />
            {selectedCategory === "all"
              ? "Tous les professionnels"
              : selectedCategory}
            <span className="count">({regularPros.length})</span>
          </h2>
          <div className="directory-grid">
            {regularPros.map((pro, index) => (
              <ProfessionalCard key={pro.id} pro={pro} index={index} />
            ))}
          </div>
          {regularPros.length === 0 && (
            <div className="no-results">
              <Search size={48} />
              <p>Aucun professionnel trouvé pour "{searchQuery}"</p>
              <button onClick={() => setSearchQuery("")}>
                Effacer la recherche
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .directory-page {
          min-height: 100vh;
          background: #f8fafc;

        }

        /* Hero */
        .directory-hero {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          padding: 80px 24px;
        }

        .directory-hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .directory-badge {
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

        .directory-hero h1 {
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

        .directory-hero p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.85);
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        /* Search */
        .directory-search {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 16px;
          padding: 8px 8px 8px 20px;
          max-width: 700px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .directory-search .search-icon {
          color: #9ca3af;
          margin-right: 12px;
        }

        .directory-search input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          color: #1a1a2e;
        }

        .search-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
        }

        /* CTA */
        .directory-cta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
        }

        .directory-cta p {
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
        .directory-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        /* Categories */
        .categories-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 32px;
        }

        .category-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .category-chip:hover {
          border-color: #10b981;
          color: #10b981;
        }

        .category-chip.active {
          background: #10b981;
          border-color: #10b981;
          color: white;
        }

        /* Sections */
        .featured-section,
        .directory-section {
          margin-bottom: 48px;
        }

        .featured-section h2,
        .directory-section h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 24px;
        }

        .directory-section .count {
          font-size: 16px;
          font-weight: 400;
          color: #9ca3af;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .directory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }

        /* Featured Card */
        .featured-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .featured-header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          padding: 24px;
          color: white;
          position: relative;
        }

        .featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.25);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .featured-header h3 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .featured-category {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
        }

        .featured-body {
          padding: 24px;
        }

        .featured-body p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .featured-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #f59e0b;
          font-weight: 600;
        }

        .location {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #9ca3af;
          font-size: 13px;
        }

        .featured-contacts {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .contact {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #6b7280;
        }

        .contact svg {
          color: #10b981;
        }

        /* Regular Card */
        .pro-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .pro-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .pro-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .pro-info h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 6px;
        }

        .pro-category {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f3f4f6;
          color: #6b7280;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
        }

        .pro-verified {
          color: #10b981;
        }

        .pro-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .pro-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pro-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #9ca3af;
        }

        .pro-action {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          font-size: 14px;
          font-weight: 500;
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
          background: #10b981;
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
          .directory-grid {
            grid-template-columns: 1fr;
          }

          .directory-cta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

// Professional Card Component
function ProfessionalCard({ pro, featured, index }) {
  if (featured) {
    return (
      <motion.div
        className="featured-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <div className="featured-header">
          <div className="featured-badge">
            <Star size={14} fill="currentColor" />
            Partenaire recommandé
          </div>
          <h3>{pro.name}</h3>
          <span className="featured-category">
            <Building2 size={14} />
            {pro.category}
          </span>
        </div>
        <div className="featured-body">
          <p>{pro.description}</p>
          <div className="featured-meta">
            <span className="rating">
              <Star size={16} fill="currentColor" />
              {pro.rating} ({pro.reviews} avis)
            </span>
            <span className="location">
              <MapPin size={14} />
              {pro.location}
            </span>
          </div>
          <div className="featured-contacts">
            <span className="contact">
              <Phone size={16} />
              {pro.phone}
            </span>
            <span className="contact">
              <Mail size={16} />
              {pro.email}
            </span>
            {pro.website && (
              <span className="contact">
                <Globe size={16} />
                {pro.website}
              </span>
            )}
          </div>
          <a href="/signup?redirect=/ressources/annuaire" className="search-btn">
            Voir le profil
            <ChevronRight size={18} />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="pro-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="pro-header">
        <div className="pro-info">
          <h3>{pro.name}</h3>
          <span className="pro-category">{pro.category}</span>
        </div>
        {pro.isVerified && (
          <div className="pro-verified">
            <CheckCircle size={20} />
          </div>
        )}
      </div>
      <p>{pro.description}</p>
      <div className="pro-footer">
        <span className="pro-location">
          <MapPin size={14} />
          {pro.location}
        </span>
        <span className="pro-action">
          Voir le profil
          <ChevronRight size={18} />
        </span>
      </div>
    </motion.div>
  );
}

export default ProfessionalDirectory;
