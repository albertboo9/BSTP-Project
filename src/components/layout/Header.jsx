import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  BookOpen,
  ChevronDown,
  Search,
  Users,
  Lightbulb,
  Rocket,
  Briefcase,
  Building2,
  Heart,
} from "lucide-react";

function Header() {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/parcours", label: language === "fr" ? "Parcours" : "Paths" },
    {
      path: "/formations",
      label: language === "fr" ? "Formations" : "Training",
    },
  ];

  const resourcesMenu = [
    {
      path: "/ressources/outils-bons-plans",
      label: language === "fr" ? "Boîtes à outils & Bons plans" : "Tools & Tips",
      icon: BookOpen,
      color: "#8B5CF6",
      description: language === "fr"
        ? "Articles, modèles et conseils pratiques"
        : "Articles, templates and practical tips",
    },
    {
      path: "/ressources/informations",
      label: language === "fr" ? "Point d'informations" : "Information Center",
      icon: Search,
      color: "#3B82F6",
      description: language === "fr"
        ? "Textes de loi, décrets, réglementations"
        : "Laws, decrees, regulations",
    },
    {
      path: "/ressources/annuaire",
      label: language === "fr" ? "Annuaire des professionnels" : "Professional Directory",
      icon: Users,
      color: "#10B981",
      description: language === "fr"
        ? "Experts, partenaires et conseils"
        : "Experts, partners and advisors",
    },
    {
      path: "/ressources/innovation",
      label: language === "fr" ? "Innovation & Compétitivité" : "Innovation & Competitiveness",
      icon: Lightbulb,
      color: "#EC4899",
      description: language === "fr"
        ? "Blog sur l'innovation et les tendances"
        : "Blog on innovation and trends",
    },
    {
      path: "/ressources/projets",
      label: language === "fr" ? "Projets d'entrepreneurs" : "Entrepreneur Projects",
      icon: Rocket,
      color: "#F59E0B",
      description: language === "fr"
        ? "Découvrez les projets des PME"
        : "Discover SME projects",
    },
    {
      path: "/ressources/communaute",
      label: language === "fr" ? "Communauté Starter" : "Starter Community",
      icon: Building2,
      color: "#06B6D4",
      description: language === "fr"
        ? "Entreprises référencées et réseau"
        : "Listed companies and network",
    },
  ];

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <div className="header-logo-icon">
            <img
              src="https://www.minpmeesa.cm/site/inhoud/uploads/2018/11/logo-1.png"
              alt="logo minpmeesa"
              srcset=""
            />
          </div>
          <span className="header-logo-text">STARTERKITCM</span>
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Resources Dropdown */}
          <div
            className={`nav-dropdown ${resourcesOpen ? "open" : ""}`}
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <Link
              to="/ressources"
              className={`nav-link dropdown-toggle ${
                location.pathname.startsWith("/ressources") ? "active" : ""
              }`}
            >
              {language === "fr" ? "Ressources" : "Resources"}
              <ChevronDown
                size={16}
                style={{
                  marginLeft: "4px",
                  transition: "transform 0.2s",
                  transform: resourcesOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Link>

            {resourcesOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-content">
                  {resourcesMenu.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="dropdown-item"
                    >
                      <div
                        className="dropdown-icon"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <item.icon size={20} color={item.color} />
                      </div>
                      <div className="dropdown-text">
                        <span className="dropdown-label">{item.label}</span>
                        <span className="dropdown-description">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button
            className="lang-switch"
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            title={language === "fr" ? "English" : "Français"}
          >
            {language === "fr" ? "EN" : "FR"}
          </button>
          <Link to="/login">
            <button
              className="btn-outline"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "white",
                padding: "10px 20px",
              }}
            >
              {language === "fr" ? "Connexion" : "Login"}
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn-primary" style={{ padding: "10px 20px" }}>
              {language === "fr" ? "Inscription" : "Sign Up"}
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .header-logo-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-logo-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .header-logo-text {
          font-size: 20px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.5px;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          padding: 10px 16px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover,
        .nav-link.active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-link.active {
          background: rgba(99, 91, 255, 0.2);
        }

        /* Dropdown styles */
        .nav-dropdown {
          position: relative;
        }

        .dropdown-toggle {
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding-top: 12px;
          z-index: 1001;
        }

        .dropdown-content {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 8px;
          min-width: 360px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          background: #f3f4f6;
        }

        .dropdown-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dropdown-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dropdown-label {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .dropdown-description {
          font-size: 12px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lang-switch {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lang-switch:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .btn-outline {
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: transparent;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .btn-primary {
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #635bff 0%, #7c3aed 100%);
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(99, 91, 255, 0.4);
        }
      `}</style>
    </header>
  );
}

export default Header;
