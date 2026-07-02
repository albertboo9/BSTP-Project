import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  FileText,
  Download,
  Upload,
  Eye,
  Trash2,
  Folder,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function DashboardDocuments() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // User's documents
  const documents = [
    {
      id: 1,
      name: "Plan d'affaires_MonEntreprise.pdf",
      type: "pdf",
      category: "business",
      size: "2.4 MB",
      uploadedAt: "2025-01-15",
      status: "verified",
    },
    {
      id: 2,
      name: "Pièce d'identité_recto.jpg",
      type: "image",
      category: "personal",
      size: "1.2 MB",
      uploadedAt: "2025-01-10",
      status: "verified",
    },
    {
      id: 3,
      name: "Pièce d'identité_verso.jpg",
      type: "image",
      category: "personal",
      size: "1.1 MB",
      uploadedAt: "2025-01-10",
      status: "verified",
    },
    {
      id: 4,
      name: "Statuts de l'entreprise.pdf",
      type: "pdf",
      category: "legal",
      size: "3.8 MB",
      uploadedAt: "2025-01-20",
      status: "pending",
    },
    {
      id: 5,
      name: "Relevé de compte_2024.pdf",
      type: "pdf",
      category: "financial",
      size: "856 KB",
      uploadedAt: "2025-02-01",
      status: "verified",
    },
    {
      id: 6,
      name: "Diplôme_Licence.pdf",
      type: "pdf",
      category: "education",
      size: "4.2 MB",
      uploadedAt: "2025-01-05",
      status: "rejected",
    },
  ];

  const categories = [
    { id: "all", label: "Tous" },
    { id: "personal", label: "Personnel" },
    { id: "business", label: "Business" },
    { id: "legal", label: "Légal" },
    { id: "financial", label: "Financier" },
    { id: "education", label: "Éducation" },
  ];

  const folders = [
    { id: "personal", name: "Documents personnels", count: 2, icon: "👤" },
    { id: "business", name: "Business", count: 1, icon: "💼" },
    { id: "legal", name: "Légaux", count: 1, icon: "⚖️" },
    { id: "financial", name: "Financiers", count: 1, icon: "💰" },
    { id: "education", name: "Éducation", count: 1, icon: "🎓" },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText size={20} style={{ color: "#ef4444" }} />
          </div>
        );
      case "image":
        return (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(59, 130, 246, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText size={20} style={{ color: "#3b82f6" }} />
          </div>
        );
      default:
        return (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(107, 114, 128, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText size={20} style={{ color: "#6b7280" }} />
          </div>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 600,
              background: "rgba(16, 185, 129, 0.1)",
              color: "#10b981",
            }}
          >
            <CheckCircle size={12} />
            Vérifié
          </span>
        );
      case "pending":
        return (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 600,
              background: "rgba(245, 158, 11, 0.1)",
              color: "#f59e0b",
            }}
          >
            <Clock size={12} />
            En attente
          </span>
        );
      case "rejected":
        return (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 600,
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
            }}
          >
            <AlertCircle size={12} />
            Rejeté
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Mes documents - Dashboard STARTERKITCM</title>
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
          Mes documents
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280" }}>
          Gérez vos documents et téléversez de nouveaux fichiers
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {[
          {
            label: "Total documents",
            value: documents.length,
            color: "#635bff",
          },
          {
            label: "Vérifiés",
            value: documents.filter((d) => d.status === "verified").length,
            color: "#10b981",
          },
          {
            label: "En attente",
            value: documents.filter((d) => d.status === "pending").length,
            color: "#f59e0b",
          },
          {
            label: "Rejetés",
            value: documents.filter((d) => d.status === "rejected").length,
            color: "#ef4444",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: stat.color,
                margin: 0,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Folders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ marginBottom: "32px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedCategory(folder.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "20px 16px",
                background:
                  selectedCategory === folder.id
                    ? "rgba(99, 91, 255, 0.08)"
                    : "white",
                border:
                  selectedCategory === folder.id
                    ? "1px solid rgba(99, 91, 255, 0.3)"
                    : "1px solid #f3f4f6",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: "28px" }}>{folder.icon}</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#1a1a2e",
                  textAlign: "center",
                }}
              >
                {folder.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                {folder.count} fichiers
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300px",
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
            placeholder="Rechercher un document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px 12px 44px",
              border: "2px solid #e5e7eb",
              borderRadius: "10px",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "#635bff",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Upload size={18} />
          Téléverser un document
        </button>
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          border: "1px solid #f3f4f6",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto",
            gap: "16px",
            padding: "16px 24px",
            background: "#f8f9fa",
            borderBottom: "1px solid #f3f4f6",
            fontSize: "12px",
            fontWeight: 600,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          <span>Document</span>
          <span>Taille</span>
          <span>Date</span>
          <span>Statut</span>
        </div>

        <div style={{ padding: "8px" }}>
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto auto",
                gap: "16px",
                padding: "16px",
                alignItems: "center",
                borderRadius: "10px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f8f9fa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Name */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {getFileIcon(doc.type)}
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1a1a2e",
                      margin: 0,
                    }}
                  >
                    {doc.name}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "2px 0 0",
                      textTransform: "capitalize",
                    }}
                  >
                    {doc.type.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Size */}
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                {doc.size}
              </span>

              {/* Date */}
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                {new Date(doc.uploadedAt).toLocaleDateString("fr-FR")}
              </span>

              {/* Status & Actions */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {getStatusBadge(doc.status)}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    style={{
                      padding: "8px",
                      background: "rgba(99, 91, 255, 0.08)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#635bff",
                      cursor: "pointer",
                    }}
                    title="Télécharger"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    style={{
                      padding: "8px",
                      background: "rgba(107, 114, 128, 0.08)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#6b7280",
                      cursor: "pointer",
                    }}
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default DashboardDocuments;
