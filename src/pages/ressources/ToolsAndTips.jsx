import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  ArrowRight,
  Download,
  Star,
  Tag,
  ChevronRight,
} from "lucide-react";

// Mock data - Tools & Tips
const toolsAndTips = [
  {
    id: 1,
    title: "Comment rédiger un business plan efficace",
    category: "Conseils",
    type: "article",
    image: "/training.jpg",
    summary:
      "Guide complet pour structurer votre projet et convaincre vos investisseurs.",
    date: "2024-01-15",
    readTime: "8 min",
    tags: ["business plan", "création", "guide"],
    isFeatured: true,
  },
  {
    id: 2,
    title: "Modèle de facture gratuit - Format Excel & Word",
    category: "Modèles",
    type: "download",
    image: "/training2.jpg",
    summary:
      "Télécharger notre modèle de facture professionnel adapté aux PME camerounaises.",
    date: "2024-01-10",
    downloads: 1250,
    tags: ["facturation", "modèle", "téléchargement"],
    isFeatured: false,
  },
  {
    id: 3,
    title: "Checklist de création d'entreprise au Cameroun",
    category: "Outils",
    type: "article",
    image: "/training3.jpg",
    summary:
      "Toutes les étapes et documents nécessaires pour créer votre entreprise.",
    date: "2024-01-08",
    readTime: "5 min",
    tags: ["création", "checklist", "administratif"],
    isFeatured: false,
  },
  {
    id: 4,
    title: "Guide des aides et financements disponibles",
    category: "Opportunités",
    type: "article",
    image: "/training4.jpg",
    summary:
      "Découvrez tous les dispositifs de financement pour votre projet au Cameroun.",
    date: "2024-01-05",
    readTime: "12 min",
    tags: ["financement", "aides", "subventions"],
    isFeatured: true,
  },
  {
    id: 5,
    title: "Modèle de statuts SARL",
    category: "Modèles",
    type: "download",
    image: "/training5.jpg",
    summary: "Statuts type pour SARL adaptés à la législation camerounaise.",
    date: "2024-01-03",
    downloads: 890,
    tags: ["juridique", "SARL", "documents"],
    isFeatured: false,
  },
  {
    id: 6,
    title: "Comment trouver des associés pour votre projet",
    category: "Conseils",
    type: "article",
    image: "/training6.jpg",
    summary: "Stratégies pour rencontrer et sélectionner vos cofondateurs.",
    date: "2024-01-01",
    readTime: "7 min",
    tags: ["équipe", "cofondateurs", "réseau"],
    isFeatured: false,
  },
  {
    id: 7,
    title: "Outil de calcul du seuil de rentabilité",
    category: "Outils",
    type: "tool",
    image: "/training7.jpg",
    summary: "Calculez facilement le point mort de votre entreprise.",
    date: "2023-12-28",
    tags: ["finance", "calculateur", "gestion"],
    isFeatured: false,
  },
  {
    id: 8,
    title: "Top 10 des erreurs à éviter lors du démarrage",
    category: "Conseils",
    type: "article",
    image: "/training3.jpg",
    summary:
      "Les pièges courants des jeunes entrepreneurs et comment les éviter.",
    date: "2023-12-25",
    readTime: "6 min",
    tags: ["débutant", "erreurs", "conseils"],
    isFeatured: false,
  },
];

const categories = [
  { id: "all", label: "Tout", icon: Filter },
  { id: "Conseils", label: "Conseils", icon: Star },
  { id: "Modèles", label: "Modèles", icon: Download },
  { id: "Outils", label: "Outils", icon: BookOpen },
  { id: "Opportunités", label: "Opportunités", icon: ArrowRight },
];

function ToolsAndTips() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  const filteredTools = toolsAndTips.filter((tool) => {
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const featuredTools = filteredTools.filter((tool) => tool.isFeatured);
  const regularTools = filteredTools.filter((tool) => !tool.isFeatured);

  return (
    <div className="resources-page">
      <Helmet>
        <title>
          Boîtes à outils & Bons plans | STARTERKIT CM - La plateforme des
          entrepreneurs du Cameroun
        </title>
        <meta
          name="description"
          content="Accédez à des conseils pratiques, des modèles gratuits et des outils pour créer et développer votre entreprise au Cameroun."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="tools-hero">
        <div className="tools-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="tools-badge">
              <BookOpen size={18} />
              <span>Ressources gratuites</span>
            </div>
            <h1>
              Boîtes à outils &<br />
              <span className="gradient-text">Bons plans</span>
            </h1>
            <p>
              Tout ce dont vous avez besoin pour lancer et développer votre
              entreprise au Cameroun. Articles, modèles, outils et opportunités.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="tools-search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Search size={22} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un outil, modèle ou conseil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">Rechercher</button>
          </motion.div>

          {/* Quick Tags */}
          <div className="quick-tags">
            {[
              "Business plan",
              "Facture",
              "Statuts",
              "Financement",
              "Marketing",
            ].map((tag) => (
              <button
                key={tag}
                className="quick-tag"
                onClick={() => setSearchQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="tools-content">
        {/* Categories */}
        <div className="categories-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${
                selectedCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <cat.icon size={18} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <div className="featured-section">
            <h2>
              <Star size={24} />
              Sélectionnés pour vous
            </h2>
            <div className="featured-grid">
              {featuredTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} featured index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Tools Grid */}
        <div className="tools-grid-section">
          <h2>
            <BookOpen size={24} />
            {selectedCategory === "all"
              ? "Toutes les ressources"
              : `${selectedCategory}s`}
          </h2>
          <div className="tools-grid">
            {regularTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
          {regularTools.length === 0 && (
            <div className="no-results">
              <Search size={48} />
              <p>Aucun résultat trouvé pour "{searchQuery}"</p>
              <button onClick={() => setSearchQuery("")}>
                Effacer la recherche
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .resources-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        /* Hero */
        .tools-hero {
          background: #7c3aed ;
          padding: 80px 24px;
        }

        .tools-hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .tools-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(139, 92, 246, 0.2);
          color: #a78bfa;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .tools-hero h1 {
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tools-hero p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        /* Search */
        .tools-search {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 16px;
          padding: 8px 8px 8px 20px;
          max-width: 600px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .search-icon {
          color: #9ca3af;
          margin-right: 12px;
        }

        .tools-search input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          color: #1a1a2e;
        }

        .search-btn {
          background: linear-gradient(135deg, #635bff 0%, #7c3aed 100%);
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
          box-shadow: 0 8px 20px rgba(99, 91, 255, 0.4);
        }

        /* Quick Tags */
        .quick-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .quick-tag {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-tag:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Content */
        .tools-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        /* Categories */
        .categories-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .category-btn {
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

        .category-btn:hover {
          border-color: #8b5cf6;
          color: #8b5cf6;
        }

        .category-btn.active {
          background: #8b5cf6;
          border-color: #8b5cf6;
          color: white;
        }

        /* Sections */
        .featured-section,
        .tools-grid-section {
          margin-bottom: 48px;
        }

        .featured-section h2,
        .tools-grid-section h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 24px;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        /* Featured Card */
        .featured-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          transition: all 0.3s ease;
        }

        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .featured-card-image {
          width: 200px;
          height: 200px;
          object-fit: cover;
          flex-shrink: 0;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        }

        .featured-card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fef3c7;
          color: #d97706;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 12px;
          width: fit-content;
        }

        .featured-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .featured-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        /* Regular Card */
        .tool-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .tool-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .card-image {
          height: 160px;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        }

        .card-content {
          padding: 20px;
        }

        .card-category {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f3f4f6;
          color: #6b7280;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .card-category.download {
          background: #dcfce7;
          color: #16a34a;
        }

        .card-category.tool {
          background: #dbeafe;
          color: #2563eb;
        }

        .tool-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .tool-card p {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .card-tag {
          background: #f3f4f6;
          color: #9ca3af;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
        }

        .card-action {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #8b5cf6;
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
          background: #8b5cf6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .featured-card {
            flex-direction: column;
          }

          .featured-card-image {
            width: 100%;
            height: 180px;
          }

          .featured-grid,
          .tools-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

// Tool Card Component
function ToolCard({ tool, featured, index }) {
  const typeLabels = {
    article: { label: "Article", icon: BookOpen },
    download: { label: "Téléchargement", icon: Download },
    tool: { label: "Outil", icon: ChevronRight },
  };

  const typeInfo = typeLabels[tool.type];

  return featured ? (
    <motion.div
      className="featured-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="featured-card-image">
        <img
          src={tool.image}
          alt={tool.title}
          srcset=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="featured-card-content">
        <div className="featured-badge">
          <Star size={14} />
          Sélectionné
        </div>
        <h3>{tool.title}</h3>
        <p>{tool.summary}</p>
        <div className="card-meta">
          <div className="card-tags">
            {tool.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="card-tag">
                #{tag}
              </span>
            ))}
          </div>
          <span className="card-action">
            {typeInfo.label}
            <ChevronRight size={16} />
          </span>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      className="tool-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="card-image">
        {" "}
        <img
          src={tool.image}
          alt={tool.title}
          srcset=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="card-content">
        <span className={`card-category ${tool.type}`}>
          <typeInfo.icon size={12} />
          {typeInfo.label}
        </span>
        <h3>{tool.title}</h3>
        <p>{tool.summary}</p>
        <div className="card-meta">
          <div className="card-tags">
            {tool.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="card-tag">
                #{tag}
              </span>
            ))}
          </div>
          <span className="card-action">
            Lire
            <ChevronRight size={16} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ToolsAndTips;
