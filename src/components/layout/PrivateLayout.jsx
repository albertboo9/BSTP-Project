import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Assistant from "../assistant/Assistant";
import {
  LayoutDashboard,
  Route,
  BookOpen,
  Award,
  FileText,
  User,
  Bell,
  LogOut,
  ChevronRight,
  Briefcase,
} from "lucide-react";

function PrivateLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/dashboard/parcours",
      label: "Mes parcours",
      icon: Route,
    },
    {
      path: "/dashboard/formations",
      label: "Mes formations",
      icon: BookOpen,
    },
    {
      path: "/dashboard/certification",
      label: "Mes certifications",
      icon: Award,
    },
    {
      path: "/dashboard/documents",
      label: "Documents",
      icon: FileText,
    },
    {
      path: "/dashboard/profile",
      label: "Mon profil",
      icon: User,
    },
    {
      path: "/dashboard/messages",
      label: "Messages",
      icon: Bell,
    },
    {
      path: "/dashboard/projects",
      label: "Projets",
      icon: Briefcase,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
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
                zIndex: 99,
              }}
              className="mobile-overlay"
            />

            {/* Mobile Sidebar Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: "280px",
                background: "#1a1a2e",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
              }}
              className="mobile-sidebar"
            >
              {/* Logo */}
              <div
                style={{
                  height: "72px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      background: "white",
                      flexShrink: 0,
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
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                  >
                    STARTERKITCM
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    padding: "8px",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Nav */}
              <nav style={{ flex: 1, padding: "20px 12px" }}>
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        marginBottom: "4px",
                        textDecoration: "none",
                        background: isActive
                          ? "rgba(99, 91, 255, 0.2)"
                          : "transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                        transition: "all 0.2s",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={item.icon} />
                      </svg>
                      <span style={{ marginLeft: "14px" }}>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* User */}
              <div
                style={{
                  padding: "20px 12px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.05)",
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
                      color: "white",
                      fontSize: "18px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {user?.firstName?.[0] || "U"}
                  </div>
                  <div style={{ marginLeft: "12px", flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {user?.firstName || "Utilisateur"} {user?.lastName || ""}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12px",
                        margin: 0,
                      }}
                    >
                      Entrepreneur
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    marginTop: "12px",
                    padding: "14px",
                    background: "rgba(233, 69, 96, 0.1)",
                    border: "1px solid rgba(233, 69, 96, 0.3)",
                    borderRadius: "12px",
                    color: "#e94560",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  Deconnexion
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "260px" : "72px",
          background: "#1a1a2e",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
        className="desktop-sidebar"
      >
        {/* Logo */}
        <div
          style={{
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "flex-start" : "center",
            padding: sidebarOpen ? "0 20px" : "0",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: "white",
              flexShrink: 0,
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
          {sidebarOpen && (
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "white",
                marginLeft: "12px",
                whiteSpace: "nowrap",
              }}
            >
              STARTERKITCM
            </span>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "20px 12px" }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  marginBottom: "4px",
                  textDecoration: "none",
                  background: isActive
                    ? "rgba(99, 91, 255, 0.2)"
                    : "transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  transition: "all 0.2s",
                }}
              >
                <item.icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && (
                  <span
                    style={{
                      marginLeft: "12px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div
          style={{
            padding: "20px 12px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {user?.firstName?.[0] || "U"}
            </div>
            {sidebarOpen && (
              <div style={{ marginLeft: "12px", flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {user?.firstName || "Utilisateur"} {user?.lastName || ""}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                    margin: 0,
                  }}
                >
                  Entrepreneur
                </p>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            right: "-12px",
            top: "84px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#635bff",
            border: "2px solid #1a1a2e",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="sidebar-toggle"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: sidebarOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.3s",
            }}
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Main Content Wrapper */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          marginLeft: sidebarOpen ? "260px" : "72px",
          width: sidebarOpen ? "calc(100% - 260px)" : "calc(100% - 72px)",
          transition: "all 0.3s ease",
        }}
        className="main-content-wrapper"
      >
        {/* Top bar */}
        <header
          style={{
            height: "72px",
            background: "white",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                display: "none",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
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

            {/* Page Title */}
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1a1a2e",
                margin: 0,
              }}
              className="page-title"
            >
              {menuItems.find((item) => item.path === location.pathname)
                ?.label || "Dashboard"}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                background: "#f8f9fa",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
              className="search-box"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher..."
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: "14px",
                  width: "180px",
                }}
                className="search-input"
              />
            </div>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#f8f9fa",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="2"
                >
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    width: "16px",
                    height: "16px",
                    background: "#e94560",
                    borderRadius: "50%",
                    fontSize: "10px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                  }}
                >
                  3
                </span>
              </button>

              {notificationsOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    width: "320px",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "16px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <h3
                      style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}
                    >
                      Notifications
                    </h3>
                  </div>
                  <div>
                    {[
                      {
                        title: "Nouvelle formation disponible",
                        desc: "Marketing digital pour PME",
                        time: "2h",
                      },
                      {
                        title: "Certificate valide",
                        desc: "Business Model Canvas",
                        time: "1j",
                      },
                      {
                        title: "Rappel",
                        desc: "Completez votre parcours dans 3 jours",
                        time: "2j",
                      },
                    ].map((notif, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "14px 16px",
                          borderBottom: i < 2 ? "1px solid #f3f4f6" : "none",
                          cursor: "pointer",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#1a1a2e",
                            margin: "0 0 4px",
                          }}
                        >
                          {notif.title}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            margin: "0 0 4px",
                          }}
                        >
                          {notif.desc}
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#9ca3af",
                            margin: 0,
                          }}
                        >
                          {notif.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: "32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Assistant */}
      <Assistant />

      {/* Responsive Styles */}
      <style>{`
        /* Mobile (< 768px) */
        @media (max-width: 767px) {
          .desktop-sidebar {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .main-content-wrapper {
            margin-left: 0 !important;
            width: 100% !important;
          }
          
          main {
            padding: 20px !important;
          }
          
          header {
            padding: 0 20px !important;
          }
          
          .search-box {
            display: none !important;
          }
          
          .page-title {
            font-size: 18px !important;
          }
        }
        
        /* Tablette (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .desktop-sidebar {
            width: 72px !important;
          }
          
          .main-content-wrapper {
            margin-left: 72px !important;
            width: calc(100% - 72px) !important;
          }
          
          .sidebar-toggle {
            display: none !important;
          }
          
          main {
            padding: 24px !important;
          }
        }
        
        /* Desktop (> 1024px) */
        @media (min-width: 1024px) {
          .mobile-sidebar {
            display: none !important;
          }
          
          .mobile-overlay {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default PrivateLayout;
