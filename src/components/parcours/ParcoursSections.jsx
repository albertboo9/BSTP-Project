import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Video,
  ExternalLink,
  Download,
  PlayCircle,
  CheckCircle,
  Clock,
  Award,
  Users,
  MessageCircle,
  Share2,
  TrendingUp,
  Target,
  Eye,
  Maximize2,
  File,
  Lock,
  RefreshCw,
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  Globe,
  Search,
  Building2,
  Filter,
  Send,
  Heart,
  MessageSquare,
  Calendar,
  Briefcase,
  UserPlus,
  Zap,
  Hash,
} from "lucide-react";
import { partnersData } from "../../data/partners.data";
import ResourceViewerModal from "../ui/ResourceViewerModal";

// --- Premium Glass Container ---
export const GlassContainer = ({ children, className = "", onClick }) => (
  <motion.div
    whileHover={{ y: -4, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
    onClick={onClick}
    className={`bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl sm:rounded-[24px] lg:rounded-[32px] p-4 sm:p-6 lg:p-8 shadow-sm transition-all duration-500 overflow-hidden relative group ${className}`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-primaryBlue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primaryBlue/10 transition-colors" />
    {children}
  </motion.div>
);

// --- Bento Grid Utility ---
export const BentoGrid = ({ children, className = "" }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto ${className}`}
  >
    {children}
  </div>
);

// --- Premium Tabs ---
export const PremiumTabs = ({ steps, activeStep, onStepClick }) => (
  <div className="flex overflow-x-auto snap-x snap-mandatory items-center gap-2 sm:gap-3 bg-gray-50/50 p-2 sm:p-3 rounded-[32px] border border-gray-100/50 backdrop-blur-md scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
    {steps.map((step, index) => {
      const Icon = step.icon;
      const isActive = activeStep === index;
      const hasExternalUrl = !!step.externalUrl;
      return (
        <button
          key={step.id}
          onClick={() => onStepClick(index)}
          className={`relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-500 shrink-0 ${isActive ? "bg-white shadow-xl shadow-primaryBlue/10 text-primaryBlue border border-primaryBlue/10" : "text-gray-400 hover:text-gray-600 hover:bg-white/50"}`}
        >
          <div
            className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${isActive ? "bg-primaryBlue/10" : "bg-gray-100"}`}
          >
            <Icon size={16} />
          </div>
          <div className="flex flex-col items-start">
            <span className="hidden sm:block text-[9px] font-black uppercase tracking-widest opacity-50 leading-tight">
              {step.sub}
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              {step.label}
            </span>
          </div>
          {hasExternalUrl && (
            <Link
              to={step.externalUrl}
              onClick={(e) => {
                e.stopPropagation();
                // Navigate to external URL
              }}
              className={`ml-1 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${isActive ? "bg-primaryBlue text-white" : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"}`}
              title={`Voir ${step.label} sur le site public`}
            >
              <ExternalLink size={12} />
              <span className="hidden sm:inline">Voir</span>
            </Link>
          )}
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 border-2 border-primaryBlue/20 rounded-2xl pointer-events-none"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      );
    })}
  </div>
);

// --- Resource Preview Card (Premium Bento) ---
export const ResourceCard = ({ item, onClick, className = "" }) => {
  // Determine icon based on type
  const getIcon = () => {
    if (item.type === "video") return Video;
    if (item.type === "docx") return FileText;
    return FileText;
  };
  const TypeIcon = getIcon();

  return (
    <GlassContainer
      onClick={() => onClick && onClick(item)}
      className={`cursor-pointer h-full ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Preview Image */}
        {item.previewUrl ? (
          <div className="mb-4 rounded-xl overflow-hidden h-40 sm:h-48 relative">
            <img
              src={item.previewUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {item.type === "video" && (
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-pink-500 text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                <PlayCircle size={12} /> {item.duration}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-between">
            <div
              className={`p-3 rounded-2xl ${item.type === "video" ? "bg-pink-50 text-pink-500" : "bg-blue-50 text-blue-500"}`}
            >
              <TypeIcon size={20} />
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        )}

        <span
          className={`text-[10px] font-black uppercase tracking-widest mb-2 ${item.type === "video" ? "text-pink-500" : "text-primaryBlue"}`}
        >
          {item.type === "video"
            ? "Production Vidéo"
            : item.type === "docx"
              ? "Document Word"
              : "Ressource Outil"}
        </span>
        <h5 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primaryBlue transition-colors">
          {item.title}
        </h5>
        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 flex-1">
          {item.preview_text ||
            "Un guide essentiel conçu par les experts du ministère pour sécuriser votre démarche."}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100/50">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Clock size={12} /> {item.duration || item.size || "Lecture 5min"}
          </div>
          <div className="flex items-center gap-2">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
                title="Télécharger"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={14} />
              </a>
            )}
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
              <Maximize2 size={14} />
            </div>
          </div>
        </div>
      </div>
    </GlassContainer>
  );
};

// --- Formation Card (Advanced Bento) ---
export const FormationsCard = ({
  formations = [],
  span = "w-full",
  onFormationClick,
  onFinancingClick, // New prop for financing info
}) => (
  <div className={`space-y-4 ${span}`}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {formations.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => {
            if (f.accessLevel === "conditionnel") {
              // Show financing info modal or trigger callback
              if (onFinancingClick) {
                onFinancingClick(f);
              }
            } else if (onFormationClick) {
              onFormationClick(f);
            }
          }}
          className={`p-0 rounded-[32px] border group transition-all duration-300 flex flex-col justify-between h-full overflow-hidden cursor-pointer ${f.completed ? "bg-green-50/20 border-green-100" : f.accessLevel === "conditionnel" ? "bg-amber-50/20 border-amber-200" : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primaryBlue/5"}`}
        >
          {/* Preview Image */}
          {f.previewImage && (
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={f.previewImage}
                alt={f.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Access Level Badge */}
              <div className="absolute top-3 right-3">
                {f.accessLevel === "conditionnel" ? (
                  <div className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                    <Lock size={10} /> Financé MINPMEESA
                  </div>
                ) : (
                  <div className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                    <PlayCircle size={10} /> Gratuit
                  </div>
                )}
              </div>
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-primaryBlue text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                <Clock size={10} /> {f.duration}
              </div>
            </div>
          )}

          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              {!f.previewImage && (
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${f.completed ? "bg-green-100 text-green-600" : f.accessLevel === "conditionnel" ? "bg-amber-100 text-amber-600" : "bg-primaryBlue/5 text-primaryBlue"}`}
                >
                  {f.completed ? (
                    <CheckCircle size={24} />
                  ) : f.accessLevel === "conditionnel" ? (
                    <Lock size={24} />
                  ) : (
                    <PlayCircle size={24} />
                  )}
                </div>
              )}
              <div className="flex flex-col flex-1">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    f.accessLevel === "conditionnel"
                      ? "text-amber-500"
                      : "text-gray-400"
                  }`}
                >
                  {f.completed
                    ? "Maîtrisé"
                    : f.accessLevel === "conditionnel"
                      ? "Financement requis"
                      : "Disponible"}
                </span>
                <h5 className="font-bold text-gray-900 text-lg group-hover:text-primaryBlue transition-colors leading-tight">
                  {f.title}
                </h5>
              </div>
            </div>

            {/* Description */}
            {f.description && (
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4 line-clamp-2">
                {f.description}
              </p>
            )}

            {/* Financing Info for conditionnel formations */}
            {f.accessLevel === "conditionnel" && f.financingInfo && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                <p className="text-xs text-amber-800 font-medium flex items-center gap-2">
                  <Lightbulb
                    size={14}
                    className="text-amber-500 flex-shrink-0"
                  />
                  {f.financingInfo}
                </p>
              </div>
            )}

            {!f.previewImage && (
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-500 tracking-tight">
                    {f.duration}
                  </span>
                </div>
                <div className="h-1 w-1 rounded-full bg-gray-200" />
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-amber-500" />
                  <span className="text-xs font-bold text-gray-500 tracking-tight">
                    Accrédité
                  </span>
                </div>
              </div>
            )}

            <div className="mt-auto">
              <button
                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${f.completed ? "border-2 border-green-100 text-green-600 hover:bg-green-600 hover:text-white" : f.accessLevel === "conditionnel" ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-200" : "bg-gray-900 text-white hover:bg-primaryBlue shadow-lg shadow-gray-200"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (f.accessLevel === "conditionnel") {
                    // Show financing info
                    if (onFinancingClick) {
                      onFinancingClick(f);
                    } else {
                      alert(
                        f.financingInfo ||
                          "Cette formation nécessite un financement du MINPMEESA. Veuillez soumettre une demande de financement.",
                      );
                    }
                  } else if (f.lmsUrl) {
                    window.open(f.lmsUrl, "_blank");
                  }
                }}
              >
                {f.completed ? (
                  <>
                    <RefreshCw size={16} /> Revoir le module
                  </>
                ) : f.accessLevel === "conditionnel" ? (
                  <>
                    <FileText size={16} /> Demander le financement
                  </>
                ) : (
                  <>
                    <ExternalLink size={16} /> Commencer la formation
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- Partners Card (Premium Bento) ---
export const PartnersCard = ({ partnerIds = [] }) => {
  const allPartners = [
    ...partnersData.gouvernement,
    ...partnersData.ong,
    ...partnersData.financeurs,
    ...partnersData.incubateurs,
  ];
  const relevantPartners = allPartners.filter((p) =>
    partnerIds.includes(p.id.toLowerCase()),
  );

  return (
    <GlassContainer className="h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <Users size={24} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900">Accompagnateurs</h4>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Réseau d'experts certifiés
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {relevantPartners.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -5, scale: 1.1 }}
            className="aspect-square rounded-2xl bg-gray-50/50 border border-gray-100 p-3 flex items-center justify-center group/p relative overflow-hidden"
          >
            <img
              src={p.logo}
              alt={p.name}
              className="max-w-full max-h-full object-contain grayscale group-hover/p:grayscale-0 transition-all duration-500 z-10"
            />
            <div className="absolute inset-0 bg-primaryBlue/5 opacity-0 group-hover/p:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-purple-50/50 rounded-2xl border border-purple-100/50">
        <p className="text-xs font-medium text-purple-700 leading-relaxed italic">
          "Ces institutions sont habilitées par le gouvernement à vous
          accompagner officiellement dans cette phase."
        </p>
      </div>
    </GlassContainer>
  );
};

// --- Info Point Card (Premium Bento) ---
export const InfoPointCard = ({ items = [] }) => (
  <GlassContainer className="h-full border-amber-100 bg-amber-50/10">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
        <Target size={24} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900 tracking-tight">
          Vigilance
        </h4>
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
          Points critiques & Alertes
        </span>
      </div>
    </div>

    <div className="space-y-6">
      {items.map((item, idx) => (
        <div key={item.id} className="relative pl-10 group/item">
          <div className="absolute left-0 top-0 w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-amber-500 border border-amber-50 group-hover/item:bg-amber-500 group-hover/item:text-white transition-all">
            0{idx + 1}
          </div>
          <h6 className="text-[15px] font-bold text-gray-900 mb-1 leading-tight group-hover/item:text-amber-600 transition-colors uppercase tracking-tight">
            {item.title}
          </h6>
          <p className="text-xs text-gray-500 font-medium leading-normal mb-2">
            {item.description}
          </p>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Download size={12} />
              Télécharger
            </a>
          )}
        </div>
      ))}
    </div>
  </GlassContainer>
);

// --- Social Card (Premium Bento) ---
export const SocialCard = () => (
  <GlassContainer className="h-full border-pink-100 bg-pink-50/10">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
        <MessageCircle size={24} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900 tracking-tight">
          Salon Privé
        </h4>
        <span className="text-[10px] font-black uppercase tracking-widest text-pink-500">
          Networking & Entraide
        </span>
      </div>
    </div>

    <div className="bg-white/50 rounded-3xl p-6 border border-pink-100 shadow-inner mb-8">
      <div className="flex -space-x-3 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/150?u=${i}`}
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
            alt="User"
          />
        ))}
        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400">
          +124
        </div>
      </div>
      <p className="text-sm font-medium text-pink-700 leading-relaxed mb-4 italic">
        "Plusieurs créateurs ont déjà validé cette étape aujourd'hui. Partagez
        votre feedback !"
      </p>
    </div>

    <button className="w-full py-5 bg-pink-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-pink-700 hover:scale-[1.02] transition-all shadow-xl shadow-pink-200">
      <Users size={16} /> Rejoindre le salon
    </button>
  </GlassContainer>
);

// --- Opportunities Card (Premium Bento) ---
export const OpportunitiesCard = ({ items = [] }) => (
  <GlassContainer className="h-full border-green-100 bg-green-50/10">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
        <TrendingUp size={24} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900 tracking-tight">
          Opportunités
        </h4>
        <span className="text-[10px] font-black uppercase tracking-widest text-green-500">
          Concours & Appels à projets
        </span>
      </div>
    </div>

    <div className="space-y-4">
      {items.map((opp) => (
        <motion.div
          key={opp.id}
          whileHover={{ x: 5 }}
          className="p-5 rounded-2xl border border-green-100 bg-white group/opp"
        >
          <div className="flex justify-between items-start mb-2">
            <h6 className="text-[14px] font-bold text-gray-900 group-hover/opp:text-green-600 transition-colors leading-tight">
              {opp.title}
            </h6>
            <ExternalLink
              size={14}
              className="text-gray-300 group-hover/opp:text-primaryBlue transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
            <Clock size={12} />{" "}
            {opp.deadline ? `Clôture: ${opp.deadline}` : "Accès illimité"}
          </div>
        </motion.div>
      ))}
    </div>
  </GlassContainer>
);

// --- Directory Card (CFCE & APME) ---
export const DirectoryCard = ({
  items = [],
  title = "Annuaire",
  subtitle = "Centres de Formalités",
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("all");

  // Get unique regions from items
  const regions = [
    ...new Set(items.map((item) => item.region).filter(Boolean)),
  ];

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" || item.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <GlassContainer className="h-full border-blue-100 bg-blue-50/10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <Building2 size={24} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900 tracking-tight">
            {title}
          </h4>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
            {subtitle}
          </span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Rechercher par nom, ville ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <Filter
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            <option value="all">Toutes les régions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 mb-4">
        {filteredItems.length} résultat{filteredItems.length !== 1 ? "s" : ""}{" "}
        trouvé{filteredItems.length !== 1 ? "s" : ""}
      </p>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
          >
            {/* Header with icon */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === "apme" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}
              >
                <Building2 size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h5>
                {item.type && (
                  <span className="text-[10px] font-medium text-gray-400 uppercase">
                    {item.type}
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <MapPin size={14} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {item.city}
                {item.region ? `, ${item.region}` : ""}
              </span>
            </div>

            {/* Address */}
            {item.address && (
              <div className="flex items-start gap-2 text-xs text-gray-500 mb-2 pl-0.5">
                <span className="text-gray-400 flex-shrink-0 mt-0.5">•</span>
                <span className="truncate">{item.address}</span>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
              {item.phone && (
                <a
                  href={`tel:${item.phone}`}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                >
                  <Phone size={12} />
                  <span className="hidden sm:inline">{item.phone}</span>
                </a>
              )}
              {item.email && (
                <a
                  href={`mailto:${item.email}`}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                >
                  <Mail size={12} />
                  <span className="hidden sm:inline truncate max-w-[100px]">
                    {item.email}
                  </span>
                </a>
              )}
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors"
                >
                  <Globe size={12} />
                  <span className="hidden sm:inline">Site</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <Search size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">
            Aucun résultat pour cette recherche
          </p>
        </div>
      )}
    </GlassContainer>
  );
};

// --- Community Card (Social Network Style) ---
export const CommunityCard = ({
  channels = [],
  recentMessages = [],
  onlineMembers = [],
  stats = { members: 0, messages: 0, connections: 0 },
}) => {
  const [activeChannel, setActiveChannel] = React.useState(null);

  const channelIcons = {
    help: MessageSquare,
    partnership: UserPlus,
    events: Calendar,
    offers: Briefcase,
  };

  const channelColors = {
    help: "bg-blue-100 text-blue-600",
    partnership: "bg-purple-100 text-purple-600",
    events: "bg-green-100 text-green-600",
    offers: "bg-amber-100 text-amber-600",
  };

  return (
    <GlassContainer className="h-full border-pink-100 bg-pink-50/10">
      {/* Header with Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 tracking-tight">
              Communauté MINPMEESA
            </h4>
            <span className="text-[10px] font-black uppercase tracking-widest text-pink-500">
              Réseau d'Entrepreneurs
            </span>
          </div>
        </div>
        {/* Stats badges */}
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-green-100 rounded-full flex items-center gap-1.5">
            <Zap size={12} className="text-green-600" />
            <span className="text-xs font-bold text-green-700">
              {stats.members}+ en ligne
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Channels */}
        <div className="lg:col-span-1 space-y-4">
          <h5 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Hash size={16} className="text-pink-500" />
            Canaux
          </h5>
          <div className="space-y-2">
            {channels.map((channel) => {
              const Icon = channelIcons[channel.id] || MessageSquare;
              const colorClass =
                channelColors[channel.id] || "bg-gray-100 text-gray-600";
              const isActive = activeChannel === channel.id;
              return (
                <motion.button
                  key={channel.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${isActive ? "bg-white shadow-md border-2 border-pink-200" : "bg-white/50 hover:bg-white border-2 border-transparent"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-gray-900">
                      {channel.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {channel.messages} messages
                    </p>
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-pink-100">
            <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
              <MessageSquare size={16} />
              Nouvelle discussion
            </button>
          </div>
        </div>

        {/* Middle Column - Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h5 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle size={16} className="text-pink-500" />
            Discussions récentes
          </h5>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg, idx) => (
                <motion.div
                  key={msg.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-white rounded-2xl border border-pink-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={
                        msg.avatar ||
                        `https://i.pravatar.cc/150?u=${msg.author}`
                      }
                      alt={msg.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900">
                          {msg.author}
                        </span>
                        {msg.channel && (
                          <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {msg.channel}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {msg.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-pink-500 transition-colors">
                          <Heart size={14} />
                          {msg.likes || 0}
                        </button>
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-pink-500 transition-colors">
                          <MessageSquare size={14} />
                          Répondre
                        </button>
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-pink-500 transition-colors">
                          <Share2 size={14} />
                          Partager
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-2xl border border-pink-100">
                <MessageCircle
                  size={40}
                  className="mx-auto text-pink-300 mb-3"
                />
                <p className="text-sm text-gray-500">
                  Aucune discussion récente
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Soyez le premier à poster!
                </p>
              </div>
            )}
          </div>

          {/* Online Members */}
          <div className="pt-4 border-t border-pink-100">
            <h5 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <Users size={16} className="text-green-500" />
              Membres en ligne ({onlineMembers.length})
            </h5>
            <div className="flex -space-x-2">
              {onlineMembers.slice(0, 8).map((member, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={
                      member.avatar ||
                      `https://i.pravatar.cc/150?u=${member.name}`
                    }
                    alt={member.name}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {member.name}
                  </div>
                </div>
              ))}
              {onlineMembers.length > 8 && (
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  +{onlineMembers.length - 8}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GlassContainer>
  );
};
