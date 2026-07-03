import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  PlayCircle,
  CheckCircle,
  Lock,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

function DashboardFormations() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // All available formations
  const formations = [
    {
      id: 1,
      title: "Fondamentaux de l'entrepreneuriat",
      description:
        "Apprenez les bases de la création et de la gestion d'une entreprise",
      category: "business",
      duration: "8h",
      level: "Débutant",
      enrolled: true,
      progress: 100,
      modules: 12,
      completedModules: 12,
      instructor: "Dr. Marie Nguema",
      rating: 4.8,
      students: 1250,
      image: "/training.jpg",
    },
    {
      id: 2,
      title: "Marketing digital pour PME",
      description:
        "Maîtrisez les stratégies de marketing digital pour développer votre clientèle",
      category: "marketing",
      duration: "6h",
      level: "Intermédiaire",
      enrolled: true,
      progress: 45,
      modules: 8,
      completedModules: 4,
      instructor: "Pierre Mendy",
      rating: 4.6,
      students: 890,
      image: "/training2.jpg",
    },
    {
      id: 3,
      title: "Gestion financière simplifiée",
      description:
        "Apprenez à gérer les finances de votre entreprise sans expertise comptable",
      category: "finance",
      duration: "10h",
      level: "Débutant",
      enrolled: false,
      progress: 0,
      modules: 10,
      completedModules: 0,
      instructor: "Dr. Anne Robert",
      rating: 4.9,
      students: 2100,
      image: "/training3.jpg",
    },
    {
      id: 4,
      title: "Leadership et gestion d'équipe",
      description:
        "Développez vos compétences de leader pour motiver vos collaborateurs",
      category: "management",
      duration: "7h",
      level: "Intermédiaire",
      enrolled: false,
      progress: 0,
      modules: 9,
      completedModules: 0,
      instructor: "Jean Claude Bilé",
      rating: 4.7,
      students: 750,
      image: "/training4.jpg",
    },
    {
      id: 5,
      title: "E-commerce au Cameroun",
      description:
        "Créez et gérez votre boutique en ligne adaptée au marché africain",
      category: "business",
      duration: "5h",
      level: "Débutant",
      enrolled: false,
      progress: 0,
      modules: 7,
      completedModules: 0,
      instructor: "Sarah Fouda",
      rating: 4.5,
      students: 1680,
      image: "/training5.jpg",
    },
    {
      id: 6,
      title: "Pitch efficace pour investisseurs",
      description: "Present your business idea to investors with confidence",
      category: "business",
      duration: "4h",
      level: "Avancé",
      enrolled: false,
      progress: 0,
      modules: 6,
      completedModules: 0,
      instructor: "Marc Assogba",
      rating: 4.8,
      students: 620,
      image: "/training6.jpg",
    },
  ];

  const categories = [
    { id: "all", label: "Toutes" },
    { id: "business", label: "Business" },
    { id: "marketing", label: "Marketing" },
    { id: "finance", label: "Finance" },
    { id: "management", label: "Management" },
  ];

  const filteredFormations = formations.filter((formation) => {
    const matchesSearch =
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || formation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enrolledFormations = formations.filter((f) => f.enrolled);
  const availableFormations = formations.filter((f) => !f.enrolled);

  const getLevelColor = (level) => {
    switch (level) {
      case "Débutant":
        return { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981" };
      case "Intermédiaire":
        return { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" };
      case "Avancé":
        return { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444" };
      default:
        return { bg: "rgba(107, 114, 128, 0.1)", color: "#6b7280" };
    }
  };

  return (
    <>
      <Helmet>
        <title>Mes formations - Dashboard STARTERKITCM</title>
      </Helmet>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "32px" }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: "8px",
          }}
        >
          Mes formations
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280" }}>
          Continuez votre apprentissage et débloquez de nouvelles compétences
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            maxWidth: "400px",
          }}
        >
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px 12px 44px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "4px",
            background: "#f3f4f6",
            borderRadius: "12px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background:
                  selectedCategory === cat.id ? "white" : "transparent",
                color: selectedCategory === cat.id ? "#1a1a2e" : "#6b7280",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow:
                  selectedCategory === cat.id
                    ? "0 1px 3px rgba(0,0,0,0.1)"
                    : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <a
            href="http://campus.studieslearning.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
          >
            Accéder au Campus E-Learning
          </a>
          <button
            onClick={() => {
              // Triggering a toast or modal in real app
              alert("Votre demande de formation sur-mesure a été initiée. Un conseiller vous contactera.");
            }}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-bold transition-all shadow-sm"
          >
            Demander une Formation
          </button>
        </div>
      </motion.div>

      {/* Enrolled Formations */}
      {enrolledFormations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: "40px" }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1a1a2e",
              marginBottom: "16px",
            }}
          >
            Formations en cours
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "20px",
            }}
          >
            {enrolledFormations.map((formation, index) => {
              const levelStyle = getLevelColor(formation.level);
              return (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    border: "1px solid #f3f4f6",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      height: "140px",
                      background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                      position: "relative",
                    }}
                  >
                    <img
                      src={formation.image}
                      alt={formation.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: levelStyle.bg,
                        color: levelStyle.color,
                      }}
                    >
                      {formation.level}
                    </span>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40px",
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.4))",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "16px" }}>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#1a1a2e",
                        marginBottom: "8px",
                        lineHeight: 1.4,
                      }}
                    >
                      {formation.title}
                    </h3>

                    {/* Progress */}
                    <div style={{ marginBottom: "12px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "6px",
                        }}
                      >
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>
                          {formation.completedModules} / {formation.modules}{" "}
                          modules
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#635bff",
                          }}
                        >
                          {formation.progress}%
                        </span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "6px",
                          background: "#e5e7eb",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${formation.progress}%`,
                            height: "100%",
                            background:
                              "linear-gradient(90deg, #635bff 0%, #7c3aed 100%)",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Instructor */}
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 12px",
                      }}
                    >
                      Par {formation.instructor}
                    </p>

                    {/* Continue Button */}
                    <button
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "10px",
                        background: "#635bff",
                        border: "none",
                        borderRadius: "10px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {formation.progress === 100 ? (
                        <>
                          <CheckCircle size={16} />
                          Terminer
                        </>
                      ) : (
                        <>
                          <PlayCircle size={16} />
                          Continuer
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Available Formations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#1a1a2e",
            marginBottom: "16px",
          }}
        >
          Formations disponibles
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px",
          }}
        >
          {availableFormations.map((formation, index) => {
            const levelStyle = getLevelColor(formation.level);
            return (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  border: "1px solid #f3f4f6",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "140px",
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    position: "relative",
                  }}
                >
                  <img
                    src={formation.image}
                    alt={formation.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: levelStyle.bg,
                      color: levelStyle.color,
                    }}
                  >
                    {formation.level}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "16px" }}>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#1a1a2e",
                      marginBottom: "8px",
                      lineHeight: 1.4,
                    }}
                  >
                    {formation.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      margin: "0 0 12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {formation.description}
                  </p>

                  {/* Meta Info */}
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "16px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={14} style={{ color: "#6b7280" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {formation.duration}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <BookOpen size={14} style={{ color: "#6b7280" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {formation.modules} modules
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Star size={14} style={{ color: "#f59e0b" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {formation.rating}
                      </span>
                    </div>
                  </div>

                  {/* Instructor & Enroll */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      Par {formation.instructor}
                    </span>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "8px 14px",
                        background: "rgba(99, 91, 255, 0.1)",
                        border: "none",
                        borderRadius: "8px",
                        color: "#635bff",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      S'inscrire
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

export default DashboardFormations;
