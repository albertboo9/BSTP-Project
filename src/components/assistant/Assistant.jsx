import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

function Assistant() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: `Bonjour ${user?.firstName || ""} ! 👋`,
      time: "Maintenant",
    },
    {
      id: 2,
      type: "bot",
      text: "Je suis STARTER, votre assistant pédagogique. Je suis là pour vous guider dans votre parcours entrepreneurial.",
      time: "Maintenant",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "Comment créer mon entreprise ?",
    "Où trouver un financement ?",
    "Quelles formations suivre ?",
    "Comment obtenir ma certification ?",
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    // User message
    const userMsg = {
      id: Date.now(),
      type: "user",
      text,
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "D'après votre profil, je vous recommande de commencer par le parcours 'Création d'entreprise'. Voulez-vous que je vous guide ?",
        "Le financement de votre projet peut passer par plusieurs canaux : guichet unique, banques partenaires, ou investisseurs privés.",
        "Les formations sont dispensées sur notre campus e-learning partenaire. Je peux vous diriger vers les modules adaptés à votre parcours.",
        "La certification MINPEEMSA valide vos compétences après completion des formations et tests. C'est une reconnaissance officielle du ministère.",
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMsg = {
        id: Date.now() + 1,
        type: "bot",
        text: randomResponse,
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
          border: "none",
          boxShadow: "0 4px 20px rgba(99, 91, 255, 0.4)",
          cursor: "pointer",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              bottom: "100px",
              right: "24px",
              width: "380px",
              height: "500px",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                color: "white",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
                    STARTER
                  </h3>
                  <p style={{ fontSize: "12px", opacity: 0.8, margin: 0 }}>
                    Votre assistant pédagogique
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.type === "user" ? "flex-end" : "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "12px 16px",
                      borderRadius:
                        msg.type === "user"
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                      background:
                        msg.type === "user"
                          ? "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)"
                          : "#f8f9fa",
                      color: msg.type === "user" ? "white" : "#1a1a2e",
                      fontSize: "14px",
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      marginTop: "4px",
                    }}
                  >
                    {msg.time}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid #f3f4f6",
                display: "flex",
                gap: "8px",
                overflowX: "auto",
              }}
            >
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  style={{
                    padding: "8px 12px",
                    background: "#f8f9fa",
                    border: "1px solid #e5e7eb",
                    borderRadius: "20px",
                    fontSize: "12px",
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              style={{
                padding: "16px",
                borderTop: "1px solid #f3f4f6",
                display: "flex",
                gap: "12px",
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Posez votre question..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                onClick={() => handleSend()}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Assistant;
