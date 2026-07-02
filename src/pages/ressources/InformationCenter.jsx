import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Scale,
  Calendar,
  Link as LinkIcon,
  Download,
  Bookmark,
  ChevronRight,
  Filter,
  BookOpen,
  Gavel,
  Landmark,
  Briefcase,
  Users,
  Calculator,
  Building,
  Shield,
  GraduationCap,
  Heart,
  Car,
  Package,
  Globe,
  FileSignature,
  Scroll,
  ClipboardList,
} from "lucide-react";

// Mock data - Information Center with comprehensive legislation
const informations = [
  // ==================== LÉGISLATION PRINCIPALE ====================
  {
    id: 1,
    title:
      "Loi n° 2015/020 du 21 décembre 2015 relative à l'entrepreneuriat au Cameroun",
    type: "Loi",
    category: "Législation",
    subcategory: "Entrepreneuriat",
    date: "2015-12-21",
    description:
      "Texte de loi fondateur définissant le cadre juridique de l'entrepreneuriat au Cameroun. Établit les droits et obligations des entrepreneurs.",
    link: "/documents/loi-entrepreneuriat-2015.pdf",
    isNew: false,
    isKey: true,
  },
  {
    id: 2,
    title: "Loi n° 2019/018 du 24 juillet 2019 portant Code General des Impôts",
    type: "Loi",
    category: "Législation",
    subcategory: "Fiscalité",
    date: "2019-07-24",
    description:
      "Code Général des Impôts camerounais regroupant l'ensemble des dispositions fiscales en vigueur.",
    link: "/documents/cgi-2019.pdf",
    isNew: false,
    isKey: true,
  },
  {
    id: 3,
    title: "Loi n° 92/007 du 14 août 1992 portant Code du Travail",
    type: "Loi",
    category: "Législation",
    subcategory: "Social",
    date: "1992-08-14",
    description:
      "Code du travail camerounais définissant les relations entre employeurs et employés.",
    link: "/documents/code-travail.pdf",
    isNew: false,
    isKey: true,
  },
  {
    id: 4,
    title:
      "Loi n° 2000/011 du 19 décembre 2000 relative aux Sociétés Coopératives",
    type: "Loi",
    category: "Législation",
    subcategory: "Coopératives",
    date: "2000-12-19",
    description:
      "Loi régissant la création et le fonctionnement des sociétés coopératives au Cameroun.",
    link: "/documents/loi-cooperatives.pdf",
    isNew: false,
    isKey: false,
  },
  {
    id: 5,
    title:
      "Loi n° 2016/007 du 12 juillet 2016 relative aux Partenariats Public-Privé",
    type: "Loi",
    category: "Législation",
    subcategory: "PPP",
    date: "2016-07-12",
    description:
      "Cadre juridique des partenariats entre le secteur public et le secteur privé.",
    link: "/documents/loi-ppp.pdf",
    isNew: false,
    isKey: true,
  },
  // ==================== DÉCRETS ====================
  {
    id: 6,
    title:
      "Décret n° 2018/1912/PM du 26 mars 2018 fixant les conditions de création d'entreprise",
    type: "Décret",
    category: "Décrets",
    subcategory: "Création d'entreprise",
    date: "2018-03-26",
    description:
      "Décret fixant les procédures administratives pour la création d'entreprise au Cameroun.",
    link: "/documents/decret-creation.pdf",
    isNew: false,
    isKey: true,
  },
  {
    id: 7,
    title:
      "Décret n° 2019/001/PM du 24 janvier 2019 portant création du Guichet Unique",
    type: "Décret",
    category: "Décrets",
    subcategory: "Administration",
    date: "2019-01-24",
    description:
      "Création et organisation du Guichet Unique des formalités d'entreprise.",
    link: "/documents/decret-guichet-unique.pdf",
    isNew: false,
    isKey: true,
  },
  {
    id: 8,
    title:
      "Décret n° 2017/093 du 23 février 2017 fixant le régime des Auto-entrepreneurs",
    type: "Décret",
    category: "Décrets",
    subcategory: "Auto-entrepreneur",
    date: "2017-02-23",
    description:
      "Décret définissant les conditions d'exercice et le régime fiscal des auto-entrepreneurs.",
    link: "/documents/decret-auto-entrepreneur.pdf",
    isNew: false,
    isKey: true,
  },
  {
    id: 9,
    title:
      "Décret n° 2020/365 du 22 mai 2020 relatif à la Zone Economique à Regime Privilégié",
    type: "Décret",
    category: "Décrets",
    subcategory: "Zones économiques",
    date: "2020-05-22",
    description:
      "Dispositions relatives aux Zones Economiques à Regime Privilégié (ZERP) au Cameroun.",
    link: "/documents/decret-zerp.pdf",
    isNew: false,
    isKey: false,
  },
  // ==================== ARRÊTÉS ====================
  {
    id: 10,
    title:
      "Arrêté n° 045/MINMIDT/SG relative aux conditions d'agrément des Startups",
    type: "Arrêté",
    category: "Arrêtés",
    subcategory: "Startups",
    date: "2020-03-15",
    description:
      "Critères et procédures d'agrément des entreprises startups au Cameroun.",
    link: "/documents/arret-startup.pdf",
    isNew: true,
    isKey: true,
  },
  {
    id: 11,
    title: "Arrêté n° 078/MINFI fixant les taux d'imposition des PME",
    type: "Arrêté",
    category: "Arrêtés",
    subcategory: "Fiscalité",
    date: "2019-06-20",
    description:
      "Tableau des taux d'imposition applicables aux petites et moyennes entreprises.",
    link: "/documents/arret-taux-pme.pdf",
    isNew: false,
    isKey: false,
  },
  {
    id: 12,
    title: "Arrêté n° 023/MINTSS fixant le SMIG",
    type: "Arrêté",
    category: "Arrêtés",
    subcategory: "Social",
    date: "2024-01-01",
    description:
      "Salaire Minimum Interprofessionnel Garanti en vigueur au Cameroun.",
    link: "/documents/arret-smig.pdf",
    isNew: true,
    isKey: true,
  },
  // ==================== CIRCULAIRES ====================
  {
    id: 13,
    title:
      "Circulaire n° 001/PM relative à la simplification des procédures administratives",
    type: "Circulaire",
    category: "Circulaires",
    subcategory: "Administration",
    date: "2021-04-10",
    description:
      "Mesures de simplification des procédures administratives pour les entreprises.",
    link: "/documents/circ-admin.pdf",
    isNew: false,
    isKey: false,
  },
  {
    id: 14,
    title:
      "Circulaire n° 005/MINFI relative aux déclarations fiscales numériques",
    type: "Circulaire",
    category: "Circulaires",
    subcategory: "Fiscalité",
    date: "2022-08-15",
    description:
      "Obligations relatives à la déclaration fiscale par voie électronique.",
    link: "/documents/circ-fiscal-numerique.pdf",
    isNew: false,
    isKey: false,
  },
  // ==================== GUIDES PRATIQUES ====================
  {
    id: 15,
    title: "Guide des procédures de création d'entreprise 2024",
    type: "Guide",
    category: "Guides",
    subcategory: "Création d'entreprise",
    date: "2024-01-15",
    description:
      "Guide pratique détaillant toutes les étapes pour créer votre entreprise au Cameroun.",
    link: "/documents/guide-creation-2024.pdf",
    isNew: true,
    isKey: true,
  },
  {
    id: 16,
    title: "Guide des aides et financements pour les PME",
    type: "Guide",
    category: "Guides",
    subcategory: "Financement",
    date: "2023-11-20",
    description:
      "Compilation des dispositifs d'aide et de financement disponibles pour les PME camerounaises.",
    link: "/documents/guide-financement.pdf",
    isNew: false,
    isKey: true,
  },
  {
    id: 17,
    title: "Guide de la Fiscalité des PME au Cameroun",
    type: "Guide",
    category: "Guides",
    subcategory: "Fiscalité",
    date: "2023-09-10",
    description: "Comprendre et optimiser la gestion fiscale de votre PME.",
    link: "/documents/guide-fiscalite-pme.pdf",
    isNew: false,
    isKey: false,
  },
  {
    id: 18,
    title: "Guide des Zones Economiques à Regime Privilégié",
    type: "Guide",
    category: "Guides",
    subcategory: "Zones économiques",
    date: "2023-06-05",
    description:
      "Avantages et procédures pour s'implanter dans les ZERP du Cameroun.",
    link: "/documents/guide-zerp.pdf",
    isNew: false,
    isKey: false,
  },
  // ==================== FORMULAIRES ====================
  {
    id: 19,
    title: "Formulaire de demande d'agrément au statut Auto-entrepreneur",
    type: "Formulaire",
    category: "Formulaires",
    subcategory: "Auto-entrepreneur",
    date: "2024-01-01",
    description:
      "Formulaire officiel de demande d'agrément au statut d'auto-entrepreneur.",
    link: "/documents/formulaire-auto-entrepreneur.xlsx",
    isNew: true,
    isKey: true,
  },
  {
    id: 20,
    title: "Formulaire de demande de financement MINPMEESA",
    type: "Formulaire",
    category: "Formulaires",
    subcategory: "Financement",
    date: "2023-10-20",
    description:
      "Formulaire à remplir pour soumettre votre dossier de demande de financement.",
    link: "/documents/formulaire-financement.xlsx",
    isNew: false,
    isKey: true,
  },
  {
    id: 21,
    title:
      "Formulaire d'immatriculation au Registre du Commerce et du Crédit Mobilier",
    type: "Formulaire",
    category: "Formulaires",
    subcategory: "Création d'entreprise",
    date: "2023-05-15",
    description:
      "Formulaire d'immatriculation au RCCM pour les personnes morales.",
    link: "/documents/formulaire-rccm.xlsx",
    isNew: false,
    isKey: true,
  },
  {
    id: 22,
    title: "Déclaration mensuelle des charges sociales CNPS",
    type: "Formulaire",
    category: "Formulaires",
    subcategory: "Social",
    date: "2023-01-01",
    description:
      "Formulaire de déclaration mensuelle des cotisations sociales CNPS.",
    link: "/documents/formulaire-cnps.xlsx",
    isNew: false,
    isKey: false,
  },
  // ==================== CONVENTIONS ====================
  {
    id: 23,
    title: "Convention Collective Nationale des Employees des PME",
    type: "Convention",
    category: "Conventions",
    subcategory: "Social",
    date: "2020-03-15",
    description:
      "Convention collective applicable aux employés des petites et moyennes entreprises.",
    link: "/documents/convention-collective-pme.pdf",
    isNew: false,
    isKey: false,
  },
  {
    id: 24,
    title: "Accord sectoriel de la promotion de l'Entrepreneuriat Jeune",
    type: "Convention",
    category: "Conventions",
    subcategory: "Emploi",
    date: "2022-06-20",
    description:
      "Accord entre l'État et le secteur privé pour la promotion de l'entrepreneuriat jeune.",
    link: "/documents/accord-jeune.pdf",
    isNew: false,
    isKey: false,
  },
  // ==================== ÉVÉNEMENTS ====================
  {
    id: 25,
    title: "Salon International des PME 2024",
    type: "Événement",
    category: "Événements",
    subcategory: "Salons",
    date: "2024-09-15",
    description:
      "Plus grand rendez-vous des PME camerounaises - Yaoundé, Palais des Congrès.",
    link: "/evenements/salon-pme-2024",
    isNew: true,
    isKey: false,
  },
  {
    id: 26,
    title: "Journée Nationale de l'Entrepreneur 2024",
    type: "Événement",
    category: "Événements",
    subcategory: "Journées",
    date: "2024-08-15",
    description:
      "Célébration de la journée nationale de l'entrepreneur - Toutes les régions du Cameroun.",
    link: "/evenements/journee-entrepreneur",
    isNew: false,
    isKey: false,
  },
  // ==================== LIENS UTILES ====================
  {
    id: 27,
    title: "Annuaire des institutions publiques liées aux PME",
    type: "Liens",
    category: "Liens utiles",
    subcategory: "Institutions",
    date: "2024-01-10",
    description:
      "Compilation des liens vers les institutions publiques et organismes de soutien aux PME.",
    link: "/ressources/annuaire-institutions",
    isNew: false,
    isKey: false,
  },
  {
    id: 28,
    title: "Plateformes numériques administratives",
    type: "Liens",
    category: "Liens utiles",
    subcategory: "Services en ligne",
    date: "2023-12-01",
    description:
      "Liste des plateformes numériques pour les démarches administratives.",
    link: "/ressources/plateformes-admin",
    isNew: false,
    isKey: false,
  },
];

const categories = [
  { id: "all", label: "Tout voir", count: 28, icon: Landmark },
  { id: "Législation", label: "Législation", count: 5, icon: Scale },
  { id: "Décrets", label: "Décrets", count: 4, icon: FileSignature },
  { id: "Arrêtés", label: "Arrêtés", count: 3, icon: Gavel },
  { id: "Circulaires", label: "Circulaires", count: 2, icon: Scroll },
  { id: "Guides", label: "Guides", count: 4, icon: BookOpen },
  { id: "Formulaires", label: "Formulaires", count: 4, icon: ClipboardList },
  { id: "Conventions", label: "Conventions", count: 2, icon: FileText },
  { id: "Événements", label: "Événements", count: 2, icon: Calendar },
  { id: "Liens utiles", label: "Liens utiles", count: 2, icon: LinkIcon },
];

function InformationCenter() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarked, setBookmarked] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredInfos = informations.filter((info) => {
    const matchesCategory =
      selectedCategory === "all" || info.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      info.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  };

  const typeIcons = {
    Loi: Scale,
    Décret: FileSignature,
    Arrêté: Gavel,
    Circulaire: Scroll,
    Guide: BookOpen,
    Formulaire: ClipboardList,
    Convention: FileText,
    Événement: Calendar,
    Liens: LinkIcon,
  };

  const typeColors = {
    Loi: "bg-red-100 text-red-600",
    Décret: "bg-blue-100 text-blue-600",
    Arrêté: "bg-purple-100 text-purple-600",
    Circulaire: "bg-orange-100 text-orange-600",
    Guide: "bg-green-100 text-green-600",
    Formulaire: "bg-amber-100 text-amber-600",
    Convention: "bg-pink-100 text-pink-600",
    Événement: "bg-cyan-100 text-cyan-600",
    Liens: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="info-page">
      <Helmet>
        <title>
          Point d'informations | STARTERKIT CM - Centre de ressources
          administratives
        </title>
        <meta
          name="description"
          content="Accédez aux textes de loi, décrets, réglementations et informations administratives du Cameroun."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="info-hero">
        <div className="info-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-badge">
              <Search size={18} />
              <span>Moteur de recherche</span>
            </div>
            <h1>
              Point
              <br />
              <span className="gradient-text">d'informations</span>
            </h1>
            <p>
              Accédez à toutes les informations administratives, textes de loi,
              décrets et ressources officielles pour votre entreprise au
              Cameroun.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="info-search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Search size={22} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un texte de loi, décret, réglementation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">Rechercher</button>
          </motion.div>

          {/* Quick Filters */}
          <div className="quick-filters">
            <span>Rechercher par:</span>
            {["Textes de loi", "Décrets", "Formulaires", "Événements"].map(
              (filter) => (
                <button
                  key={filter}
                  className="quick-filter"
                  onClick={() => setSearchQuery(filter)}
                >
                  {filter}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="info-content">
        <div className="info-layout">
          {/* Sidebar Categories */}
          <aside className="info-sidebar">
            <h3>
              <Landmark size={20} />
              Catégories
            </h3>
            <div className="category-list">
              {categories.map((cat) => {
                const CatIcon = cat.icon || FileText;
                return (
                  <button
                    key={cat.id}
                    className={`category-item ${
                      selectedCategory === cat.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="cat-icon">
                      <CatIcon size={18} />
                    </span>
                    <span className="cat-name">{cat.label}</span>
                    <span className="cat-count">{cat.count}</span>
                  </button>
                );
              })}
            </div>

            {/* Bookmarks */}
            <div className="bookmarks-section">
              <h4>
                <Bookmark size={18} />
                Mes favoris
              </h4>
              {bookmarked.length > 0 ? (
                <ul className="bookmark-list">
                  {bookmarked.slice(0, 3).map((id) => {
                    const info = informations.find((i) => i.id === id);
                    return info ? (
                      <li key={id}>
                        <a href={info.link}>{info.title}</a>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p className="no-bookmarks">
                  Aucun favori ajouté. Cliquez sur l'icône pour ajouter.
                </p>
              )}
            </div>
          </aside>

          {/* Results */}
          <main className="info-main">
            {/* Results Header */}
            <div className="results-header">
              <h2>
                <FileText size={24} />
                {selectedCategory === "all"
                  ? "Toutes les ressources"
                  : selectedCategory}
                <span className="count">({filteredInfos.length})</span>
              </h2>
              <button
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filtres
              </button>
            </div>

            {/* Results List */}
            <div className="info-list">
              {filteredInfos.map((info, index) => {
                const TypeIcon = typeIcons[info.type] || FileText;
                const isBookmarked = bookmarked.includes(info.id);
                const colorClass = typeColors[info.type] || "bg-gray-100 text-gray-600";

                return (
                  <motion.div
                    key={info.id}
                    className="info-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <div className={`info-icon ${colorClass}`}>
                      <TypeIcon size={24} />
                    </div>
                    <div className="info-content">
                      <div className="info-header">
                        {info.isNew && (
                          <span className="new-badge">Nouveau</span>
                        )}
                        {info.isKey && (
                          <span className="key-badge">Important</span>
                        )}
                        <span className={`type-badge ${colorClass}`}>{info.type}</span>
                      </div>
                      <h3>{info.title}</h3>
                      <p>{info.description}</p>
                      <div className="info-meta">
                        <span className="info-date">
                          <Calendar size={14} />
                          {new Date(info.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="info-category">{info.category}</span>
                        {info.subcategory && (
                          <span className="info-subcategory">{info.subcategory}</span>
                        )}
                      </div>
                    </div>
                    <div className="info-actions">
                      <button
                        className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
                        onClick={() => toggleBookmark(info.id)}
                      >
                        <Bookmark
                          size={20}
                          fill={isBookmarked ? "currentColor" : "none"}
                        />
                      </button>
                      <a href={info.link} className="download-btn">
                        <Download size={20} />
                        <span>Télécharger</span>
                      </a>
                      <ChevronRight size={20} className="arrow" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredInfos.length === 0 && (
              <div className="no-results">
                <Search size={48} />
                <p>Aucun résultat trouvé pour "{searchQuery}"</p>
                <button onClick={() => setSearchQuery("")}>
                  Effacer la recherche
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      <style>{`
        .info-page {
          min-height: 100vh;
          background: #f8fafc;

        }

        /* Hero */
        .info-hero {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          padding: 80px 24px;
        }

        .info-hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .info-badge {
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

        .info-hero h1 {
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

        .info-hero p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        /* Search */
        .info-search {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 16px;
          padding: 8px 8px 8px 20px;
          max-width: 700px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .info-search .search-icon {
          color: #9ca3af;
          margin-right: 12px;
        }

        .info-search input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          color: #1a1a2e;
        }

        .info-search .search-btn {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .info-search .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
        }

        /* Quick Filters */
        .quick-filters {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .quick-filters span {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
        }

        .quick-filter {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-filter:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Content */
        .info-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        .info-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
        }

        /* Sidebar */
        .info-sidebar {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          height: fit-content;
          position: sticky;
          top: 96px;
        }

        .info-sidebar h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 16px;
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .category-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .category-item:hover {
          background: #f3f4f6;
        }

        .category-item.active {
          background: #e0f2fe;
          color: #0284c7;
        }

        .cat-name {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .cat-count {
          font-size: 12px;
          color: #9ca3af;
          background: #f3f4f6;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .category-item.active .cat-count {
          background: #bae6fd;
          color: #0284c7;
        }

        /* Bookmarks */
        .bookmarks-section {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
        }

        .bookmarks-section h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
        }

        .bookmark-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .bookmark-list li {
          margin-bottom: 8px;
        }

        .bookmark-list a {
          font-size: 13px;
          color: #6b7280;
          text-decoration: none;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .bookmark-list a:hover {
          color: #0284c7;
        }

        .no-bookmarks {
          font-size: 13px;
          color: #9ca3af;
          line-height: 1.5;
        }

        /* Main */
        .info-main {
          min-height: 500px;
        }

        .results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .results-header h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 22px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .results-header .count {
          font-size: 16px;
          font-weight: 400;
          color: #9ca3af;
        }

        .filter-toggle {
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

        .filter-toggle:hover {
          border-color: #0284c7;
          color: #0284c7;
        }

        /* Info Cards */
        .info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .info-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .info-icon {
          width: 56px;
          height: 56px;
          background: #e0f2fe;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0284c7;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
          min-width: 0;
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .new-badge {
          background: #fef3c7;
          color: #d97706;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }

        .info-type {
          background: #f3f4f6;
          color: #6b7280;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .info-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 8px;
        }

        .info-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .info-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .info-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #9ca3af;
        }

        .info-category {
          font-size: 12px;
          color: #0284c7;
          background: #e0f2fe;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .info-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .bookmark-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: transparent;
          color: #9ca3af;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .bookmark-btn:hover {
          border-color: #0284c7;
          color: #0284c7;
        }

        .bookmark-btn.active {
          border-color: #0284c7;
          color: #0284c7;
        }

        .download-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #0284c7;
          color: white;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .download-btn:hover {
          background: #0369a1;
          transform: translateY(-1px);
        }

        .arrow {
          color: #d1d5db;
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
          background: #0284c7;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .info-layout {
            grid-template-columns: 1fr;
          }

          .info-sidebar {
            position: static;
          }

          .category-list {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .info-card {
            flex-direction: column;
          }

          .info-actions {
            width: 100%;
            margin-top: 16px;
          }

          .download-btn {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default InformationCenter;
