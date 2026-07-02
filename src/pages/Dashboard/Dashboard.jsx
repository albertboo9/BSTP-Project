import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Target,
  Award,
  Clock,
  ChevronRight,
  Lock,
  CheckCircle,
  PlayCircle,
  BookOpen,
  FileText,
  Bell,
  TrendingUp,
  Calendar,
} from "lucide-react";

function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(35);

  const stats = [
    {
      label: "Progression globale",
      value: "35%",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      color: "#635bff",
    },
    {
      label: "Formations terminées",
      value: "3",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      color: "#10b981",
    },
    {
      label: "Certifications",
      value: "1",
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      color: "#f59e0b",
    },
    {
      label: "Heures de formation",
      value: "24h",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#ec4899",
    },
  ];

  const parcours = [
    {
      title: "Sensibilisation",
      progress: 100,
      status: "completed",
      modules: 6,
    },
    {
      title: "Création d'entreprise",
      progress: 45,
      status: "in_progress",
      modules: 12,
    },
    {
      title: "Recherche de financement",
      progress: 0,
      status: "locked",
      modules: 8,
    },
  ];

  const recentActivity = [
    {
      type: "lesson",
      title: "Completed: Business Model Canvas",
      time: "2 hours ago",
    },
    {
      type: "cert",
      title: "Certificate obtained: Sensibilisation",
      time: "1 day ago",
    },
    {
      type: "start",
      title: "Started: Création d'entreprise",
      time: "2 days ago",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - STARTERKITCM</title>
      </Helmet>

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "32px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(99, 91, 255, 0.3)",
            }}
          >
            <User size={28} style={{ color: "white" }} />
          </div>
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: "4px",
              }}
            >
              Bonjour, {user?.firstName || "Entrepreneur"}
            </h1>
            <p style={{ fontSize: "15px", color: "#6b7280" }}>
              Voici l'état de votre parcours entrepreneurial
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: `${stat.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={stat.color}
                  strokeWidth="2"
                >
                  <path d={stat.icon} />
                </svg>
              </div>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              {stat.label}
            </p>
            <p style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e" }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        {/* Current Parcours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e" }}>
              Mes parcours
            </h2>
            <Link
              to="/parcours"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "14px",
                color: "#635bff",
                textDecoration: "none",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
            >
              Voir tout
              <ChevronRight size={16} />
            </Link>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {parcours.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "16px",
                  background:
                    item.status === "in_progress"
                      ? "rgba(99, 91, 255, 0.04)"
                      : "#f8f9fa",
                  borderRadius: "12px",
                  border:
                    item.status === "in_progress"
                      ? "1px solid rgba(99, 91, 255, 0.2)"
                      : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#1a1a2e",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6b7280" }}>
                      {item.modules} modules •{" "}
                      {item.progress === 100
                        ? "Terminé"
                        : item.progress === 0
                          ? "Verrouillé"
                          : "En cours"}
                    </p>
                    {item.status === "locked" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginTop: "8px",
                          padding: "6px 10px",
                          background: "rgba(107, 114, 128, 0.08)",
                          borderRadius: "8px",
                        }}
                      >
                        <Lock size={12} style={{ color: "#6b7280" }} />
                        <span style={{ fontSize: "11px", color: "#6b7280" }}>
                          Condition: Terminer "Sensibilisation" d'abord
                        </span>
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background:
                        item.status === "completed"
                          ? "rgba(16, 185, 129, 0.1)"
                          : item.status === "in_progress"
                            ? "rgba(99, 91, 255, 0.1)"
                            : "rgba(107, 114, 128, 0.1)",
                      color:
                        item.status === "completed"
                          ? "#10b981"
                          : item.status === "in_progress"
                            ? "#635bff"
                            : "#6b7280",
                    }}
                  >
                    {item.status === "completed" ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <CheckCircle size={14} />
                        Terminé
                      </span>
                    ) : item.status === "in_progress" ? (
                      `${item.progress}%`
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Lock size={14} />
                        Verrouillé
                      </span>
                    )}
                  </span>
                </div>
                {item.status !== "locked" && (
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      background: "#e5e7eb",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      style={{
                        height: "100%",
                        background:
                          item.status === "completed"
                            ? "#10b981"
                            : "linear-gradient(90deg, #635bff 0%, #7c3aed 100%)",
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1a1a2e",
              marginBottom: "20px",
            }}
          >
            Activité récente
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  paddingBottom: "16px",
                  borderBottom:
                    index < recentActivity.length - 1
                      ? "1px solid #f3f4f6"
                      : "none",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background:
                      activity.type === "cert"
                        ? "rgba(245, 158, 11, 0.1)"
                        : activity.type === "lesson"
                          ? "rgba(99, 91, 255, 0.1)"
                          : "rgba(16, 185, 129, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {activity.type === "cert" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    >
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00.946 3-.806 1.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )}
                  {activity.type === "lesson" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#635bff"
                      strokeWidth="2"
                    >
                      <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {activity.type === "start" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#1a1a2e",
                      marginBottom: "4px",
                    }}
                  >
                    {activity.title}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          border: "1px solid #f3f4f6",
          marginTop: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1a1a2e",
                marginBottom: "4px",
              }}
            >
              Timeline de votre parcours
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Visualisez votre progression vers la certification MINPEEMSA
            </p>
          </div>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#635bff",
              background: "rgba(99, 91, 255, 0.1)",
              padding: "6px 14px",
              borderRadius: "20px",
            }}
          >
            35% complété
          </span>
        </div>

        {/* Horizontal Timeline */}
        <div style={{ position: "relative", padding: "20px 0" }}>
          {/* Progress Line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "40px",
              right: "40px",
              height: "4px",
              background: "#e5e7eb",
              transform: "translateY(-50%)",
              borderRadius: "2px",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "35%" }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #635bff 0%, #10b981 100%)",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Steps */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              {
                step: 1,
                title: "Inscription",
                status: "completed",
                date: "01 janv. 2025",
                icon: CheckCircle,
              },
              {
                step: 2,
                title: "Sensibilisation",
                status: "completed",
                date: "15 janv. 2025",
                icon: CheckCircle,
              },
              {
                step: 3,
                title: "Formation",
                status: "in_progress",
                date: "En cours",
                icon: PlayCircle,
              },
              {
                step: 4,
                title: "Certification",
                status: "locked",
                date: "En attente",
                icon: Lock,
              },
              {
                step: 5,
                title: "Diplôme",
                status: "locked",
                date: "En attente",
                icon: Award,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: item.status === "in_progress" ? "52px" : "44px",
                    height: item.status === "in_progress" ? "52px" : "44px",
                    borderRadius: "50%",
                    background:
                      item.status === "completed"
                        ? "#10b981"
                        : item.status === "in_progress"
                          ? "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)"
                          : "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: item.status === "in_progress" ? "20px" : "16px",
                    color: item.status === "locked" ? "#9ca3af" : "white",
                    fontWeight: 700,
                    boxShadow:
                      item.status === "in_progress"
                        ? "0 8px 24px rgba(99, 91, 255, 0.4)"
                        : "none",
                    border: "4px solid white",
                    marginBottom: "12px",
                  }}
                >
                  {item.status === "completed" ? (
                    <CheckCircle
                      size={item.status === "in_progress" ? 28 : 24}
                      style={{ color: "#10b981" }}
                    />
                  ) : item.status === "in_progress" ? (
                    <PlayCircle size={28} style={{ color: "#635bff" }} />
                  ) : (
                    <Lock size={20} style={{ color: "#9ca3af" }} />
                  )}
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: item.status === "locked" ? "#9ca3af" : "#1a1a2e",
                    marginBottom: "2px",
                  }}
                >
                  {item.title}
                </p>
                <p style={{ fontSize: "11px", color: "#6b7280" }}>
                  {item.date}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          border: "1px solid #f3f4f6",
          marginTop: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Award size={20} style={{ color: "white" }} />
            </div>
            <div>
              <h2
                style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a2e" }}
              >
                Mes certifications
              </h2>
              <p style={{ fontSize: "13px", color: "#6b7280" }}>
                Certificats obtenus et en cours
              </p>
            </div>
          </div>
          <Link
            to="/certification"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "14px",
              color: "#635bff",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Voir tout
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Certification Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Completed Certification */}
          <div
            style={{
              padding: "20px",
              background: "rgba(16, 185, 129, 0.04)",
              borderRadius: "12px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Award size={24} style={{ color: "white" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1a1a2e",
                  }}
                >
                  Sensibilisation à l'entrepreneuriat
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#10b981",
                    fontWeight: 500,
                  }}
                >
                  Obtenu le 15 janv. 2025
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                style={{
                  padding: "8px 12px",
                  background: "#10b981",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FileText size={14} />
                Voir certificat
              </button>
            </div>
          </div>

          {/* In Progress Certification */}
          <div
            style={{
              padding: "20px",
              background: "rgba(99, 91, 255, 0.04)",
              borderRadius: "12px",
              border: "1px solid rgba(99, 91, 255, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BookOpen size={24} style={{ color: "white" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1a1a2e",
                  }}
                >
                  Création d'entreprise
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#635bff",
                    fontWeight: 500,
                  }}
                >
                  45% complété
                </p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "#e5e7eb",
                borderRadius: "3px",
                overflow: "hidden",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "45%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #635bff 0%, #7c3aed 100%)",
                  borderRadius: "3px",
                }}
              />
            </div>
            <button
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "rgba(99, 91, 255, 0.1)",
                border: "none",
                borderRadius: "8px",
                color: "#635bff",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <PlayCircle size={14} />
              Continuer la formation
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {[
          {
            label: "Continuer le parcours",
            icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z",
            link: "/parcours",
          },
          {
            label: "Nouvelle formation",
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            link: "/formations",
          },
          {
            label: "Mes certifications",
            icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
            link: "/certification",
          },
        ].map((action, index) => (
          <Link
            key={index}
            to={action.link}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 20px",
              background:
                "linear-gradient(135deg, rgba(99, 91, 255, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)",
              borderRadius: "12px",
              textDecoration: "none",
              border: "1px solid rgba(99, 91, 255, 0.15)",
              transition: "all 0.2s",
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
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d={action.icon} />
              </svg>
            </div>
            <span
              style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}
            >
              {action.label}
            </span>
          </Link>
        ))}
      </motion.div>
    </>
  );
}

export default Dashboard;
