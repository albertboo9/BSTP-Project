import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

function PublicLayout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if we're on home page for special header background
  const isHomePage = location.pathname === "/";

  const isTransparent = !scrolled;

  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/parcours", label: "Parcours" },
    { path: "/formations", label: "Formations" },
    { path: "/partenaires", label: "Partenaires" },
  ];

  // Resources - directly in nav with short labels
  const resourcesItems = [
    {
      path: "/ressources/outils-bons-plans",
      label: "Outils",
      color: "#8B5CF6",
    },
    { path: "/ressources/informations", label: "Information", color: "#3B82F6" },
    { path: "/ressources/annuaire", label: "Annuaire", color: "#10B981" },
    { path: "/ressources/innovation", label: "Innovation", color: "#7c3aed" },
    { path: "/ressources/projets", label: "Projets", color: "#7c3aed" },
    { path: "/ressources/communaute", label: "Communeauté", color: "#06B6D4" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff11" }}>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          transform: "translateX(-243px)",
          zIndex: 1000,
          width: "calc(100% + 294px)",
          background: isTransparent
            ? isHomePage
              ? "url(/heàder-bàckground.png) center/cover no-repeat"
              : "rgba(255, 255, 255, 0.15)"
            : "rgba(255, 255, 255, 0.85)", // Home page: image background, Other pages: transparent at top, Scrolled: opaque
          backdropFilter: "blur(20px)", // Always blur for glass effect
          borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
          transition: "all 0.3s ease",
          pointerEvents: "auto",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                marginRight: "20px",
                marginLeft: "20px",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                // background: "white", // Removed as requested
              }}
            >
              <img
                src="https://www.minpmeesa.cm/site/inhoud/uploads/2018/11/logo-1.png"
                alt="MINPMEESA"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            className="desktop-nav"
          >
            {/* Main nav items */}
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: isActive ? "#635bff" : "#4b5563",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    background: isActive
                      ? "rgba(99, 91, 255, 0.1)"
                      : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = "rgba(99, 91, 255, 0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = "transparent";
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}


            {/* Resources items */}
            {resourcesItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: isActive ? item.color : "#4b5563",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    background: isActive ? `${item.color}12` : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = `${item.color}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = "transparent";
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginLeft: "35px",
            }}
            className="desktop-actions"
          >
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                background: "rgba(99, 91, 255, 0.08)",
                border: "none",
                borderRadius: "8px",
                color: "#635bff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  opacity: language === "fr" ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }}
              >
                FR
              </span>
              <span style={{ color: "#d1d5db" }}>/</span>
              <span
                style={{
                  opacity: language === "en" ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }}
              >
                EN
              </span>
            </button>

            {/* Commencer Button */}
            <Link to="/signup">
              <button
                style={{
                  padding: "10px 20px",
                  background:
                    "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(99, 91, 255, 0.3)",
                  transition: "all 0.2s ease",
                }}
              >
                Commencer
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              zIndex: 1001,
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: "24px",
                height: "2px",
                background: "#1a1a2e",
                marginBottom: "6px",
                borderRadius: "2px",
              }}
            />
            <motion.div
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: "24px",
                height: "2px",
                background: "#1a1a2e",
                marginBottom: "6px",
                borderRadius: "2px",
              }}
            />
            <motion.div
              animate={{
                rotate: mobileMenuOpen ? -90 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: "24px",
                height: "2px",
                background: "#1a1a2e",
                borderRadius: "2px",
              }}
            />
          </button>
        </div>
      </header>

      {/* Bannière Cameroon - Drapeau officiel avec étoile centrée */}
      <div
        style={{
          height: "7px",
          width: "100%",
          background:
            "linear-gradient(90deg, #009E49 0%, #009E49 33.33%, #CE1126 33.33%, #CE1126 66.66%, #FCD116 66.66%, #FCD116 100%)",
          position: "fixed",
          top: scrolled ? "72px" : "72px",
          left: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Étoile centrée dans la partie jaune */}
        <span
          style={{
            color: "#FCD116",
            fontSize: "14px",
            // Centre de la partie jaune (66.66% + 16.5% = 83.16%)
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))",
          }}
        >
          ★
        </span>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
            />

            {/* Mobile Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "280px",
                background: "white",
                zIndex: 1000,
                padding: "100px 24px 40px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.1)",
              }}
              className="mobile-menu-drawer"
            >
              {/* Navigation Links */}
              <nav
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      color: "#1a1a2e",
                      fontSize: "16px",
                      fontWeight: 500,
                      background:
                        location.pathname === item.path
                          ? "rgba(99, 91, 255, 0.1)"
                          : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Resources Links in Mobile */}
                <div style={{ padding: "8px 0" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "8px",
                      paddingLeft: "12px",
                    }}
                  >
                    Ressources
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {resourcesMenu.slice(0, 3).map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          color: "#4b5563",
                          fontSize: "14px",
                          fontWeight: 500,
                          background:
                            location.pathname === item.path
                              ? "rgba(99, 91, 255, 0.1)"
                              : "transparent",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <item.icon size={16} color={item.color} />
                        {item.label}
                      </Link>
                    ))}
                    {resourcesMenu.slice(3).map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          color: "#4b5563",
                          fontSize: "14px",
                          fontWeight: 500,
                          background:
                            location.pathname === item.path
                              ? "rgba(99, 91, 255, 0.1)"
                              : "transparent",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <item.icon size={16} color={item.color} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Divider */}
              <div style={{ height: "1px", background: "#e5e7eb" }} />

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Language Toggle Mobile */}
                <button
                  onClick={toggleLanguage}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px",
                    background: "rgba(99, 91, 255, 0.1)",
                    border: "none",
                    borderRadius: "12px",
                    color: "#635bff",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      opacity: language === "fr" ? 1 : 0.5,
                    }}
                  >
                    Francais
                  </span>
                  <span style={{ color: "#635bff" }}>/</span>
                  <span
                    style={{
                      opacity: language === "en" ? 1 : 0.5,
                    }}
                  >
                    English
                  </span>
                </button>

                <Link to="/login" style={{ width: "100%" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "transparent",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      color: "#1a1a2e",
                      fontSize: "15px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Connexion
                  </button>
                </Link>

                <Link to="/signup" style={{ width: "100%" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      background:
                        "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(99, 91, 255, 0.3)",
                    }}
                  >
                    Commencer
                  </button>
                </Link>
              </div>

              {/* Footer in Menu */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "24px",
                  borderTop: "1px solid #e5e7eb",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#9ca3af",
                  }}
                >
                  © 2025 STARTERKITCM
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            paddingTop: location.pathname === "/" ? "72px" : "78px",
          }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer style={{ background: "#1a1a2e", padding: "60px 24px 30px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    background: "white",
                  }}
                >
                  <img
                    src="https://www.minpmeesa.cm/site/inhoud/uploads/2018/11/logo-1.png"
                    alt="MINPMEESA"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <span
                  style={{ fontSize: "16px", fontWeight: 700, color: "white" }}
                >
                  STARTERKITCM
                </span>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                }}
              >
                La porte d'entrée officielle de l'entrepreneuriat au Cameroun.
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                Plateforme
              </h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Parcours", "Formations", "Certification"].map((item) => (
                  <li key={item} style={{ marginBottom: "10px" }}>
                    <a
                      href="#"
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.6)",
                        textDecoration: "none",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                Contact
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "8px",
                }}
              >
                contact@starterkitcm.cm
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Yaoundé, Cameroun
              </p>
            </div>
          </div>
          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
              © 2025 STARTERKITCM. Tous droits réservés.
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              <a
                href="#"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                }}
              >
                Confidentialité
              </a>
              <a
                href="#"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                }}
              >
                Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .desktop-actions {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
          
          .mobile-menu-drawer {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default PublicLayout;
