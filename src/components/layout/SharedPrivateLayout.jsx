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
  FolderLock
} from "lucide-react";

const ROLES = [
  { id: "pme", label: "Cockpit PME", color: "from-blue-500 to-indigo-600", path: "/dashboard" },
  { id: "donneur_ordre", label: "Donneur d'Ordre", color: "from-purple-500 to-pink-600", path: "/donneur-ordre" },
  { id: "agent_bstp", label: "Agent BSTP", color: "from-amber-500 to-orange-600", path: "/agent" },
  { id: "dg", label: "Direction Générale", color: "from-emerald-500 to-teal-600", path: "/observatoire" }
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
    <div className="flex min-h-screen bg-gray-900 text-gray-100 font-sans overflow-x-hidden">
      {/* Dynamic Grid Background for Futuristic Vibe */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none z-0" />

      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-gray-950 border-r border-gray-800 transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        } hidden md:flex`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-white/5">
              <img
                src="https://www.minpmeesa.cm/site/inhoud/uploads/2018/11/logo-1.png"
                alt="BSTPKIT"
                className="w-8 h-8 object-contain"
              />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-black text-sm tracking-tight text-white uppercase">BSTPKIT CM</span>
                <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Nexus 2026</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-nexus-500 text-white font-semibold shadow-lg shadow-nexus-500/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                <Icon size={20} className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-nexus-400"}`} />
                {sidebarOpen && <span className="text-sm truncate">{item.label}</span>}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1.5 bg-white rounded-r"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Role Switcher & User Panel */}
        <div className="p-4 border-t border-gray-800 bg-gray-950/80 backdrop-blur">
          {/* Active Switcher Option */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-all text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-nexus-500/10 text-nexus-400 flex items-center justify-center flex-shrink-0">
                  <RefreshCw size={16} />
                </div>
                {sidebarOpen && (
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Acteur Actuel</p>
                    <p className="text-xs font-bold text-white truncate">{userRoleLabel}</p>
                  </div>
                )}
              </div>
              {sidebarOpen && <ChevronRight size={14} className={`text-gray-500 transition-transform ${roleSwitcherOpen ? "rotate-90" : ""}`} />}
            </button>

            {/* Dropdown Role Switcher */}
            <AnimatePresence>
              {roleSwitcherOpen && sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-gray-950 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 p-1.5 space-y-1"
                >
                  <p className="text-[9px] text-gray-500 font-bold uppercase px-3 py-1 tracking-widest">Changer d'acteur (Démo)</p>
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSwitch(role.id, role.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs font-semibold transition-colors ${
                        user?.role === role.id ? "bg-nexus-500/10 text-nexus-400" : "text-gray-400 hover:text-white hover:bg-gray-900"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-tr ${role.color}`} />
                      <span>{role.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User info & Logout */}
          <div className="mt-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center font-bold text-sm text-nexus-400">
              {user?.firstName?.[0] || "U"}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.firstName || "Utilisateur"}</p>
                <p className="text-[10px] text-gray-500 truncate">Connecté</p>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-danger-400 transition-colors"
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
        className={`flex-1 min-w-0 flex flex-col transition-all duration-300 z-10 relative ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Topbar / Header */}
        <header className="h-20 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-white md:hidden"
            >
              <Menu size={24} />
            </button>

            {/* Path description / Section Title */}
            <div>
              <h1 className="text-lg font-black text-white uppercase tracking-tight">
                {menuItems.find((item) => item.path === location.pathname)?.label || "Espace Sécurisé"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* TrustBadge if PME */}
            {user?.role === "pme" && (
              <div className="hidden sm:block">
                <TrustBadge level="argent" size="sm" />
              </div>
            )}

            {/* Cmd+K Search Simulation */}
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800/80 text-gray-500 text-xs w-48 hover:border-gray-700 transition-colors cursor-pointer">
              <Search size={14} />
              <span className="font-semibold flex-1">Rechercher...</span>
              <kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-[10px] border border-gray-700">⌘K</kbd>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800/80 text-gray-400 hover:text-white relative transition-colors"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-nexus-500 rounded-full border-2 border-gray-950" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3.5 border-b border-gray-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                        <span className="text-[10px] text-nexus-500 font-bold bg-nexus-500/10 px-2 py-0.5 rounded">3 Nouvelles</span>
                      </div>
                      <div className="divide-y divide-gray-800/60 max-h-80 overflow-y-auto">
                        <div className="p-3.5 hover:bg-gray-900 transition-colors cursor-pointer">
                          <p className="text-xs font-bold text-white leading-tight">Nouvelle recommandation IA</p>
                          <p className="text-[10px] text-gray-400 mt-1">Analyse du radar de maturité disponible.</p>
                          <p className="text-[9px] text-nexus-500 mt-1 font-bold">Il y a 10m</p>
                        </div>
                        <div className="p-3.5 hover:bg-gray-900 transition-colors cursor-pointer">
                          <p className="text-xs font-bold text-white leading-tight">Nouveau marché détecté</p>
                          <p className="text-[10px] text-gray-400 mt-1">Un appel d'offres correspond à votre profil.</p>
                          <p className="text-[9px] text-nexus-500 mt-1 font-bold">Il y a 2h</p>
                        </div>
                        <div className="p-3.5 hover:bg-gray-900 transition-colors cursor-pointer">
                          <p className="text-xs font-bold text-white leading-tight">Formation débloquée</p>
                          <p className="text-[10px] text-gray-400 mt-1">Accédez à votre nouveau module de formation.</p>
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
        <main className="flex-1 p-6 lg:p-8 z-10 relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/80"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-gray-950 border-r border-gray-800 z-50 flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-white/5">
                    <img
                      src="https://www.minpmeesa.cm/site/inhoud/uploads/2018/11/logo-1.png"
                      alt="BSTPKIT"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="font-black text-sm text-white uppercase tracking-tight">BSTPKIT CM</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Mobile menu nav */}
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
                          ? "bg-nexus-500 text-white font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-gray-900"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile switcher */}
              <div className="mt-auto border-t border-gray-850 pt-4 space-y-3">
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Changer d'acteur (Démo)</p>
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
                          ? "bg-nexus-500/10 border-nexus-500/30 text-nexus-400"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center font-bold text-xs text-nexus-400">
                    {user?.firstName?.[0] || "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white leading-tight">{user?.firstName}</p>
                    <p className="text-[10px] text-gray-500">Connecté</p>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-white">
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Floating chatbot assistant */}
      <Assistant />
    </div>
  );
}
