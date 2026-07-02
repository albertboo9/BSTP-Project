import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  Camera,
  Save,
  Shield,
  Bell,
  LogOut,
} from "lucide-react";

function DashboardProfile() {
  const { user, logout } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "BO'O",
    lastName: user?.lastName || "ALBERT",
    email: user?.email || "bo.albert@email.com",
    phone: "+237 6XX XXX XXX",
    city: "Yaoundé",
    entrepreneurType: "entrepreneur",
    companyName: "Mon Entreprise",
    sector: "Commerce",
    experience: "3-5 ans",
  });

  const [activeTab, setActiveTab] = useState("personal");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    // Save logic here
  };

  return (
    <>
      <Helmet>
        <title>Mon profil - Dashboard STARTERKITCM</title>
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
          Mon profil
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280" }}>
          Gérez vos informations personnelles et professionnelles
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "24px",
        }}
      >
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
            height: "fit-content",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              margin: "0 auto 20px",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "48px",
                fontWeight: 700,
              }}
            >
              {formData.firstName[0]}
              {formData.lastName[0]}
            </div>
            <button
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#635bff",
                border: "3px solid white",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={16} />
            </button>
          </div>

          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1a1a2e",
                marginBottom: "4px",
              }}
            >
              {formData.firstName} {formData.lastName}
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
              Entrepreneur
            </p>
          </div>

          {/* Quick Stats */}
          <div
            style={{
              borderTop: "1px solid #f3f4f6",
              paddingTop: "20px",
            }}
          >
            {[
              { label: "Membre depuis", value: "Janvier 2025", icon: Calendar },
              { label: "Parcours terminés", value: "2", icon: Briefcase },
              { label: "Certificats", value: "1", icon: User },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                <stat.icon size={18} style={{ color: "#6b7280" }} />
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 2px",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1a1a2e",
                      margin: 0,
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #f3f4f6",
              padding: "0 24px",
            }}
          >
            {[
              {
                id: "personal",
                label: "Informations personnelles",
                icon: User,
              },
              {
                id: "business",
                label: "Informations professionnelles",
                icon: Building2,
              },
              { id: "security", label: "Sécurité", icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 20px",
                  background:
                    activeTab === tab.id
                      ? "rgba(99, 91, 255, 0.04)"
                      : "transparent",
                  border: "none",
                  borderBottom:
                    activeTab === tab.id
                      ? "2px solid #635bff"
                      : "2px solid transparent",
                  color: activeTab === tab.id ? "#635bff" : "#6b7280",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: "24px" }}>
            {activeTab === "personal" && (
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1a1a2e",
                    marginBottom: "20px",
                  }}
                >
                  Informations personnelles
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {/* First Name */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Prénom
                    </label>
                    <div style={{ position: "relative" }}>
                      <User
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
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
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
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Nom
                    </label>
                    <div style={{ position: "relative" }}>
                      <User
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
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
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
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Email
                    </label>
                    <div style={{ position: "relative" }}>
                      <Mail
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
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Téléphone
                    </label>
                    <div style={{ position: "relative" }}>
                      <Phone
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
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
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
                  </div>

                  {/* City */}
                  <div style={{ gridColumn: "span 2" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Ville
                    </label>
                    <div style={{ position: "relative" }}>
                      <MapPin
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
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
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
                  </div>
                </div>

                {/* Save Button */}
                <div style={{ marginTop: "24px" }}>
                  <button
                    onClick={handleSave}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      background: "#635bff",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Save size={18} />
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            )}

            {activeTab === "business" && (
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1a1a2e",
                    marginBottom: "20px",
                  }}
                >
                  Informations professionnelles
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {/* Entrepreneur Type */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Type d'entrepreneur
                    </label>
                    <select
                      name="entrepreneurType"
                      value={formData.entrepreneurType}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "2px solid #e5e7eb",
                        borderRadius: "10px",
                        fontSize: "14px",
                        outline: "none",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="investor">Investisseur</option>
                      <option value="partner">Partenaire</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Expérience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "2px solid #e5e7eb",
                        borderRadius: "10px",
                        fontSize: "14px",
                        outline: "none",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      <option value="debutant">Débutant (0-2 ans)</option>
                      <option value="intermediaire">
                        Intermédiaire (3-5 ans)
                      </option>
                      <option value="expert">Expert (5+ ans)</option>
                    </select>
                  </div>

                  {/* Company Name */}
                  <div style={{ gridColumn: "span 2" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Nom de l'entreprise
                    </label>
                    <div style={{ position: "relative" }}>
                      <Building2
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
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
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
                  </div>

                  {/* Sector */}
                  <div style={{ gridColumn: "span 2" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Secteur d'activité
                    </label>
                    <div style={{ position: "relative" }}>
                      <Briefcase
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
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
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
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1a1a2e",
                    marginBottom: "20px",
                  }}
                >
                  Sécurité du compte
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      padding: "20px",
                      background: "#f8f9fa",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#1a1a2e",
                          marginBottom: "4px",
                        }}
                      >
                        Mot de passe
                      </h4>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        Dernière modification: il y a 2 mois
                      </p>
                    </div>
                    <button
                      style={{
                        padding: "10px 20px",
                        background: "rgba(99, 91, 255, 0.1)",
                        border: "none",
                        borderRadius: "8px",
                        color: "#635bff",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Modifier
                    </button>
                  </div>

                  <div
                    style={{
                      padding: "20px",
                      background: "#f8f9fa",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#1a1a2e",
                          marginBottom: "4px",
                        }}
                      >
                        Authentification à deux facteurs
                      </h4>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        Non activée
                      </p>
                    </div>
                    <button
                      style={{
                        padding: "10px 20px",
                        background: "#10b981",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Activer
                    </button>
                  </div>

                  <div
                    style={{
                      padding: "20px",
                      background: "#fef2f2",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#dc2626",
                          marginBottom: "4px",
                        }}
                      >
                        Supprimer le compte
                      </h4>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        Cette action est irréversible
                      </p>
                    </div>
                    <button
                      style={{
                        padding: "10px 20px",
                        background: "#dc2626",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default DashboardProfile;
