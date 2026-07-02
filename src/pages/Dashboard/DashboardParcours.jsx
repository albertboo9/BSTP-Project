import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useParcours } from "../../context/ParcoursContext";
import {
  CheckCircle,
  Lock,
  PlayCircle,
  Award,
  FileText,
  GraduationCap,
  Target,
  Users,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  Unlock,
} from "lucide-react";

// Mock Data
import { mockParcours } from "../../data/parcours.mock";

function DashboardParcours() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { canAccessParcours, isParcoursCompleted, companyInfo } = useParcours();

  // Filtrer les parcours selon l'accès
  const activeParcours = mockParcours.filter((p) => {
    if (p.accessLevel === "libre") return true;
    return canAccessParcours(p.id, p.accessLevel);
  });

  const lockedParcours = mockParcours.filter((p) => {
    if (p.accessLevel === "libre") return false;
    return !canAccessParcours(p.id, p.accessLevel);
  });

  const getStatusBadge = (item) => {
    // Badge pour parcours conditionnel non complété
    if (
      item.accessLevel === "conditionnel" &&
      !isParcoursCompleted("creation")
    ) {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
          <Lock size={12} /> Accès conditionnel
        </span>
      );
    }
    if (
      item.status === "valide" ||
      item.status === "completed" ||
      isParcoursCompleted(item.id)
    ) {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 border border-green-100">
          <CheckCircle size={12} /> Terminé
        </span>
      );
    }
    if (item.status === "en_cours" || item.status === "in_progress") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
          <PlayCircle size={12} /> En cours
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-100">
        <Lock size={12} /> Verrouillé
      </span>
    );
  };

  const renderParcoursCard = (item, index) => {
    const isLocked =
      item.accessLevel === "conditionnel" &&
      !canAccessParcours(item.id, item.accessLevel);

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * index }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-6 cursor-pointer group hover:shadow-xl transition-all ${isLocked ? "opacity-75" : ""}`}
        onClick={() => navigate(`/dashboard/parcours/${item.id}`)}
      >
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white transform group-hover:scale-105 transition-transform relative"
            style={{
              background:
                item.gradient ||
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            {item.icon === "Target" && <Target size={32} />}
            {item.icon === "TrendingUp" && <TrendingUp size={32} />}
            {item.icon === "ShieldCheck" && <Award size={32} />}
            {isLocked && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-md border border-amber-100">
                <Lock size={12} />
              </div>
            )}
            {!isLocked && item.accessLevel === "libre" && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-50 rounded-full flex items-center justify-center text-green-500 shadow-md border border-green-100">
                <Unlock size={12} />
              </div>
            )}
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-3">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primaryBlue transition-colors tracking-tight">
                {item.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {item.category}
                </span>
                {getStatusBadge(item)}
              </div>
            </div>

            <p className="text-gray-500 mb-6 text-sm font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
              {item.description}
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Avancement
                  </span>
                  <span className="text-xs font-bold text-gray-900">
                    {item.progress}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    className="h-full rounded-full"
                    style={{
                      background:
                        item.status === "valide" || item.status === "completed"
                          ? "#10b981"
                          : "#1a1a2e",
                    }}
                  />
                </div>
              </div>

              <div
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all active:scale-95 ${isLocked ? "bg-gray-50 text-gray-400" : "bg-primaryBlue text-white shadow-lg shadow-primaryBlue/20 hover:bg-primaryBlueDark"}`}
              >
                <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  {isLocked
                    ? "Débloquer"
                    : item.status === "en_cours"
                      ? "Continuer"
                      : "Commencer"}
                </span>
                <ArrowRight
                  size={14}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Helmet>
        <title>Mes parcours - Campus PME</title>
      </Helmet>

      {/* Hero Segment */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Mes parcours
        </h1>
        <p className="text-gray-500 max-w-2xl leading-relaxed">
          Suivez vos parcours structurés et accédez aux ressources exclusives du
          MINPMEESA pour propulser votre entreprise.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
        {[
          {
            label: "Validés",
            value: activeParcours.filter(
              (p) => p.status === "valide" || p.status === "completed",
            ).length,
            color: "text-green-600",
            bg: "bg-green-50",
            icon: CheckCircle,
          },
          {
            label: "En cours",
            value: activeParcours.filter((p) => p.status === "en_cours").length,
            color: "text-blue-600",
            bg: "bg-blue-50",
            icon: PlayCircle,
          },
          {
            label: "Ressources",
            value: 45,
            color: "text-amber-600",
            bg: "bg-amber-50",
            icon: FileText,
          },
          {
            label: "Formations",
            value: 12,
            color: "text-purple-600",
            bg: "bg-purple-50",
            icon: GraduationCap,
          },
          {
            label: "Badges",
            value: activeParcours.filter((p) => p.certificate).length,
            color: "text-pink-600",
            bg: "bg-pink-50",
            icon: Award,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`${stat.bg} p-5 rounded-2xl border border-white/50 shadow-sm flex flex-col items-center justify-center text-center`}
          >
            <stat.icon className={`${stat.color} mb-1`} size={18} />
            <span className="text-xl font-bold text-gray-800">
              {stat.value}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Active Sections */}
      <div className="mb-8 flex items-center gap-4">
        <span className="text-xs font-bold text-primaryBlue uppercase tracking-[0.2em] whitespace-nowrap">
          Mes Parcours Actifs
        </span>
        <div className="h-px w-full bg-gray-100" />
      </div>

      <div className="mb-20">
        {activeParcours.map((item, index) => renderParcoursCard(item, index))}
      </div>

      {/* Locked Sections - only show if there are locked parcours */}
      {lockedParcours.length > 0 && (
        <>
          <div className="mb-8 flex items-center gap-4">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] whitespace-nowrap">
              Accès conditionnel
            </span>
            <div className="h-px w-full bg-gray-100" />
          </div>

          <div className="mb-20">
            {lockedParcours.map((item, index) =>
              renderParcoursCard(item, index + activeParcours.length),
            )}
          </div>
        </>
      )}

      {/* Premium Support CTA */}
      <div className="bg-primary rounded-[40px] p-12 text-white overflow-hidden relative shadow-2xl">
        <div className="relative z-10 max-w-xl">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20">
            <MessageCircle size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-4 tracking-tight">
            Besoin d'un accompagnement sur mesure ?
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed text-sm">
            Nos experts sont à votre disposition pour vous aider à lever les
            verrous de votre croissance.
          </p>
          <button className="px-8 py-3.5 bg-white text-primary rounded-2xl font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl text-sm">
            Contacter un conseiller
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none transform rotate-12">
          <Target size={400} />
        </div>
      </div>
    </div>
  );
}

export default DashboardParcours;
