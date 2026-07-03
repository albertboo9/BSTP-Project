import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useAuthStore } from "../../stores/authStore";
import Assistant from "../assistant/Assistant";
import TrustBadge from "../ui/TrustBadge";
import {
  LayoutDashboard,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  FileCheck,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Menu,
  X,
  User,
  RefreshCw,
  ChevronDown,
  Sparkles
} from "lucide-react";

const ROLES = [
  { id: "pme", label: "Cockpit PME", color: "text-nexus-500", bg: "bg-nexus-50", path: "/dashboard" },
  { id: "donneur_ordre", label: "Donneur d'Ordre", color: "text-purple-600", bg: "bg-purple-50", path: "/donneur-ordre" },
  { id: "agent_bstp", label: "Agent BSTP", color: "text-amber-600", bg: "bg-amber-50", path: "/agent" },
  { id: "dg", label: "Direction Générale", color: "text-emerald-600", bg: "bg-emerald-50", path: "/observatoire" }
];

export default function SharedPrivateLayout({ menuItems = [], userRoleLabel = "Utilisateur" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { setDevUser } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRoleSwitch = (roleId, path) => {
    setDevUser(roleId);
    setRoleSwitcherOpen(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-surface-50 text-gray-900 font-sans">
      {/* Desktop Sidebar — White Premium */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-white border-r border-gray-200/80 transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        } hidden md:flex`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexus-500 to-nexus-700 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Sparkles className="text-white" size={18} />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-black text-sm tracking-tight text-gray-900 uppercase">BSTPKIT CM</span>
                <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Nexus 2026</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-nexus-50 text-nexus-700 font-semibold"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} className={`${isActive ? "text-nexus-500" : "text-gray-400 group-hover:text-gray-600"}`} />
                {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-nexus-500 rounded-r"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Role Switcher & User Panel */}
        <div className="p-3 border-t border-gray-100 bg-white">
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-nexus-50 text-nexus-500 flex items-center justify-center flex-shrink-0">
                  <RefreshCw size={14} />
                </div>
                {sidebarOpen && (
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Acteur Actuel</p>
                    <p className="text-xs font-bold text-gray-900 truncate">{userRoleLabel}</p>
                  </div>
                )}
              </div>
              {sidebarOpen && <ChevronDown size={14} className={`text-gray-400 transition-transform ${roleSwitcherOpen ? "rotate-180" : ""}`} />}
            </button>

            <AnimatePresence>
              {roleSwitcherOpen && sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-elevated overflow-hidden z-50 p-1.5 space-y-1"
                >
                  <p className="text-[9px] text-gray-400 font-bold uppercase px-3 py-1 tracking-widest">Changer d'acteur (Démo)</p>
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSwitch(role.id, role.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-colors ${
                        user?.role === role.id ? `${role.bg} ${role.color}` : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${role.color.replace('text-', 'bg-')}`} />
                      <span>{role.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User info & Logout */}
          <div className="mt-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-nexus-50 border border-nexus-100 flex items-center justify-center font-bold text-sm text-nexus-600">
              {user?.firstName?.[0] || "U"}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">{user?.firstName || "Utilisateur"}</p>
                <p className="text-[10px] text-gray-400 truncate">Connecté</p>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-danger-500 transition-colors"
                title="Déconnexion"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div
        className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Topbar / Header — White Premium */}
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Desktop sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title={sidebarOpen ? "Réduire la sidebar" : "Agrandir la sidebar"}
            >
              <Menu size={20} />
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600 md:hidden"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {menuItems.find((item) => item.path === location.pathname)?.label || "Espace Sécurisé"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* TrustBadge if PME */}
            {user?.role === "pme" && (
              <div className="hidden sm:block">
                <TrustBadge level="argent" size="sm" />
              </div>
            )}

            {/* Cmd+K Search */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 text-xs w-44 hover:border-gray-300 transition-colors cursor-pointer">
              <Search size={14} />
              <span className="font-medium flex-1">Rechercher...</span>
              <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] border border-gray-200 text-gray-400">⌘K</kbd>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-700 relative transition-colors"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-nexus-500 rounded-full border-2 border-white" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-elevated z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Notifications</span>
                        <span className="text-[10px] text-nexus-500 font-bold bg-nexus-50 px-2 py-0.5 rounded">3 Nouvelles</span>
                      </div>
                      <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                        <div className="p-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
                          <p className="text-xs font-bold text-gray-900 leading-tight">Nouvelle recommandation IA</p>
                          <p className="text-[10px] text-gray-500 mt-1">Analyse du radar de maturité disponible.</p>
                          <p className="text-[9px] text-nexus-500 mt-1 font-bold">Il y a 10m</p>
                        </div>
                        <div className="p-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
                          <p className="text-xs font-bold text-gray-900 leading-tight">Nouveau marché détecté</p>
                          <p className="text-[10px] text-gray-500 mt-1">Un appel d'offres correspond à votre profil.</p>
                          <p className="text-[9px] text-nexus-500 mt-1 font-bold">Il y a 2h</p>
                        </div>
                        <div className="p-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
                          <p className="text-xs font-bold text-gray-900 leading-tight">Formation débloquée</p>
                          <p className="text-[10px] text-gray-500 mt-1">Accédez à votre nouveau module de formation.</p>
                          <p className="text-[9px] text-nexus-500 mt-1 font-bold">Hier</p>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-white border-r border-gray-200 z-50 flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nexus-500 to-nexus-700 flex items-center justify-center">
                    <Sparkles className="text-white" size={16} />
                  </div>
                  <span className="font-black text-sm text-gray-900 uppercase tracking-tight">BSTPKIT CM</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-nexus-50 text-nexus-700 font-semibold"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-gray-100 pt-4 space-y-3">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Changer d'acteur (Démo)</p>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        handleRoleSwitch(role.id, role.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-left text-[11px] font-bold border transition-colors ${
                        user?.role === role.id
                          ? `${role.bg} border-nexus-200 ${role.color}`
                          : "bg-white border-gray-200 text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-lg bg-nexus-50 flex items-center justify-center font-bold text-xs text-nexus-600">
                    {user?.firstName?.[0] || "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-900 leading-tight">{user?.firstName}</p>
                    <p className="text-[10px] text-gray-400">Connecté</p>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-danger-500">
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <Assistant />
    </div>
  );
}