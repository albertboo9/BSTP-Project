import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  MessageSquare,
  Send,
  Search,
  User,
  Clock,
  Paperclip,
  MoreVertical,
  Star,
  Archive,
  Trash2,
} from "lucide-react";

function DashboardMessages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  // Conversations data
  const conversations = [
    {
      id: 1,
      name: "Marie Nguema",
      role: "Conseillère entrepreneuriat",
      avatar: null,
      lastMessage: "Bonjour ! Votre dossier a été traité avec succès.",
      time: "10:30",
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Bonjour Marie, je voulais savoir où en était mon dossier de demande de subvention.",
          time: "09:15",
        },
        {
          id: 2,
          sender: "advisor",
          text: "Bonjour ! Je vais vérifier cela pour vous. Un petit instant...",
          time: "09:20",
        },
        {
          id: 3,
          sender: "advisor",
          text: "Bonjour ! Votre dossier a été traité avec succès. Vous recevrez une confirmation par email sous 48h.",
          time: "10:30",
        },
      ],
    },
    {
      id: 2,
      name: "Support Technique",
      role: "Équipe support",
      avatar: null,
      lastMessage: "N'hésitez pas à nous contacter si vous avez des questions.",
      time: "Hier",
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Bonjour, j'ai un problème avec mon tableau de bord.",
          time: "14:00",
        },
        {
          id: 2,
          sender: "advisor",
          text: "Bonjour ! Pouvez-vous décrire le problème que vous rencontrez ?",
          time: "14:30",
        },
        {
          id: 3,
          sender: "user",
          text: "Les graphiques ne s'affichent pas correctement.",
          time: "14:45",
        },
        {
          id: 4,
          sender: "advisor",
          text: "Merci pour votre retour. Nos développeurs travaillent sur ce problème. Vous serez informé dès qu'une solution sera disponible.",
          time: "15:00",
        },
        {
          id: 5,
          sender: "advisor",
          text: "N'hésitez pas à nous contacter si vous avez des questions.",
          time: "15:05",
        },
      ],
    },
    {
      id: 3,
      name: "Pierre Mendy",
      role: "Formateur Marketing",
      avatar: null,
      lastMessage: "À bientôt dans la prochaine session !",
      time: "Hier",
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Bonjour Pierre, quand aura lieu la prochaine session de formation en marketing digital ?",
          time: "11:00",
        },
        {
          id: 2,
          sender: "advisor",
          text: "La prochaine session débutera le 15 février. Les inscriptions sont ouvertes !",
          time: "11:30",
        },
        {
          id: 3,
          sender: "user",
          text: "Parfait, je vais m'inscrire. Merci !",
          time: "11:45",
        },
        {
          id: 4,
          sender: "advisor",
          text: "À bientôt dans la prochaine session !",
          time: "12:00",
        },
      ],
    },
    {
      id: 4,
      name: "Ministère des PME",
      role: "Communications officielles",
      avatar: null,
      lastMessage: "Invitation à la journée nationale de l'entrepreneuriat",
      time: "Mardi",
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          sender: "advisor",
          text: "Invitation à la journée nationale de l'entrepreneuriat - 20 février 2025",
          time: "Mardi 10:00",
        },
      ],
    },
  ];

  const selectedChat = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Helmet>
        <title>Messages - Dashboard STARTERKITCM</title>
      </Helmet>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "24px" }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: "8px",
          }}
        >
          Messages
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280" }}>
          Communicatez avec vos conseillers et l'équipe de support
        </p>
      </motion.div>

      {/* Messages Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "20px",
          height: "calc(100vh - 240px)",
          minHeight: "500px",
        }}
      >
        {/* Conversations List */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search */}
          <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <input
                type="text"
                placeholder="Rechercher..."
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 40px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Conversation Items */}
          <div style={{ flex: 1, overflow: "auto" }}>
            {conversations.map((conv, index) => (
              <motion.button
                key={conv.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => setSelectedConversation(conv.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "16px",
                  background:
                    selectedConversation === conv.id
                      ? "rgba(99, 91, 255, 0.06)"
                      : "transparent",
                  border: "none",
                  borderBottom: "1px solid #f3f4f6",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.2s",
                }}
              >
                {/* Avatar */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {getInitials(conv.name)}
                  </div>
                  {conv.online && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        right: "2px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#10b981",
                        border: "2px solid white",
                      }}
                    />
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#1a1a2e",
                      }}
                    >
                      {conv.name}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                      }}
                    >
                      {conv.time}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px",
                    }}
                  >
                    {conv.role}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#374151",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "180px",
                      }}
                    >
                      {conv.lastMessage}
                    </p>
                    {conv.unread > 0 && (
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "#635bff",
                          color: "white",
                          fontSize: "11px",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {getInitials(selectedChat.name)}
                </div>
                {selectedChat.online && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "2px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#10b981",
                      border: "2px solid white",
                    }}
                  />
                )}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1a1a2e",
                    margin: 0,
                  }}
                >
                  {selectedChat.name}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#10b981",
                    margin: 0,
                  }}
                >
                  {selectedChat.online ? "En ligne" : "Hors ligne"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  padding: "8px",
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#f59e0b",
                  cursor: "pointer",
                }}
              >
                <Star size={18} />
              </button>
              <button
                style={{
                  padding: "8px",
                  background: "rgba(107, 114, 128, 0.1)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#6b7280",
                  cursor: "pointer",
                }}
              >
                <Archive size={18} />
              </button>
              <button
                style={{
                  padding: "8px",
                  background: "rgba(107, 114, 128, 0.1)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#6b7280",
                  cursor: "pointer",
                }}
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {selectedChat.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "12px 16px",
                    borderRadius:
                      msg.sender === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)"
                        : "#f8f9fa",
                    color: msg.sender === "user" ? "white" : "#1a1a2e",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>
                    {msg.text}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    marginTop: "4px",
                    padding: msg.sender === "user" ? "0 8px" : "0",
                  }}
                >
                  {msg.time}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div
            style={{
              padding: "16px 20px",
              borderTop: "1px solid #f3f4f6",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              style={{
                padding: "10px",
                background: "rgba(99, 91, 255, 0.08)",
                border: "none",
                borderRadius: "10px",
                color: "#635bff",
                cursor: "pointer",
              }}
            >
              <Paperclip size={20} />
            </button>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              style={{
                padding: "12px 20px",
                background: "#635bff",
                border: "none",
                borderRadius: "12px",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Send size={18} />
              Envoyer
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default DashboardMessages;
