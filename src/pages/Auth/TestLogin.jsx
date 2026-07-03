import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Building2, 
  ShieldCheck, 
  Activity, 
  Users, 
  Sparkles, 
  ChevronRight,
  Search,
  Globe2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function TestLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "pme",
      title: "Espace PME",
      desc: "Accédez au Passeport Numérique et postulez aux offres",
      icon: <Building2 size={28} />,
      color: "text-blue-600",
      bgHover: "hover:bg-blue-50",
      borderHover: "hover:border-blue-200",
      redirect: "/dashboard/passeport"
    },
    {
      id: "donneur_ordre",
      title: "Donneur d'Ordres",
      desc: "Consultez l'Annuaire Certifié et publiez vos marchés",
      icon: <Search size={28} />,
      color: "text-purple-600",
      bgHover: "hover:bg-purple-50",
      borderHover: "hover:border-purple-200",
      redirect: "/donneur-ordre/annuaire"
    },
    {
      id: "agent_bstp",
      title: "Agent BSTP",
      desc: "Gérez la Bannette de Validation et les certifications",
      icon: <ShieldCheck size={28} />,
      color: "text-green-600",
      bgHover: "hover:bg-green-50",
      borderHover: "hover:border-green-200",
      redirect: "/agent"
    },
    {
      id: "dg",
      title: "Direction Générale",
      desc: "Pilotez avec le Cockpit Stratégique et les KPI",
      icon: <Activity size={28} />,
      color: "text-amber-600",
      bgHover: "hover:bg-amber-50",
      borderHover: "hover:border-amber-200",
      redirect: "/observatoire"
    }
  ];

  const handleRoleSelect = (roleId, redirectUrl) => {
    setIsLoggingIn(true);
    setSelectedRole(roleId);
    // Simulate network delay for premium feel
    setTimeout(() => {
      login(`demo.${roleId}@bstp.cm`, "password", roleId);
      navigate(redirectUrl, { replace: true });
    }, 800);
  };

  return (
    <>
      <Helmet>
        <title>Portail de Connexion - BSTP</title>
      </Helmet>

      <div className="min-h-screen bg-white flex">
        
        {/* Left Side - Brand & Institutional Context */}
        <div className="hidden lg:flex lg:w-5/12 bg-[#0A1128] relative overflow-hidden flex-col justify-between p-12 text-white">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <img src="/logos/logo-bstp.jpeg" alt="BSTP" className="w-12 h-12 rounded-xl object-cover shadow-lg" />
            <span className="text-2xl font-black tracking-tight">BSTP</span>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <Globe2 size={16} className="text-indigo-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-100">Plateforme Nationale</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
                L'excellence de la sous-traitance.
              </h1>
              <p className="text-lg text-indigo-100/80 font-medium leading-relaxed">
                Connectez-vous pour accéder au portail centralisé. Un écosystème sécurisé, transparent et performant pour les acteurs économiques.
              </p>
            </motion.div>
          </div>

          {/* Bottom Footer */}
          <div className="relative z-10">
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest">
              © 2026 Bourse de Sous-Traitance et de Partenariat
            </p>
          </div>
        </div>

        {/* Right Side - Login / Role Switcher */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-16 xl:p-24 bg-gray-50/50">
          <div className="max-w-xl w-full mx-auto">
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 text-center lg:text-left"
            >
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Accès Environnement de Démonstration</h2>
              <p className="text-gray-500 font-medium text-lg">
                Veuillez sélectionner votre profil utilisateur pour continuer vers votre espace de travail.
              </p>
            </motion.div>

            <div className="space-y-4">
              {roles.map((role, idx) => (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={() => handleRoleSelect(role.id, role.redirect)}
                  disabled={isLoggingIn}
                  className={`w-full group bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6 transition-all duration-300 shadow-sm
                    ${role.borderHover} ${role.bgHover}
                    ${selectedRole === role.id ? 'ring-2 ring-indigo-500 border-transparent shadow-md' : 'hover:shadow-md'}
                    ${isLoggingIn && selectedRole !== role.id ? 'opacity-50 grayscale cursor-not-allowed' : ''}
                  `}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${role.color}`}>
                    {role.icon}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{role.title}</h3>
                    <p className="text-gray-500 font-medium text-sm">{role.desc}</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-gray-900 group-hover:shadow-sm transition-all">
                    {isLoggingIn && selectedRole === role.id ? (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full"
                      />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-12 text-center lg:text-left">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg text-indigo-700 text-sm font-bold">
                <ShieldCheck size={18} />
                <span>Prototype Sécurisé • Version d'évaluation 1.0</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
