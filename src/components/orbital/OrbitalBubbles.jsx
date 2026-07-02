import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Layout,
  ChevronDown,
  ArrowRight,
  Briefcase,
  Building2,
  Coins,
  GraduationCap,
  Lightbulb,
  Building,
  Rocket,
} from "lucide-react";
import {
  orbitalBubblesConfig,
  bottomIntentsConfig,
} from "../../data/orbital-bubbles.config";
import "../../styles/orbital-bubbles.css";

/**
 * Surgical Reproduction of the approved Luxury Institutional Mockup
 */
export function OrbitalBubbles({ onBubbleClick }) {
  const containerRef = useRef(null);
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    setWindowLoaded(true);
  }, []);

  const IconMap = {
    Briefcase,
    Building2,
    Coins,
    GraduationCap,
    Lightbulb,
    Building,
    Rocket,
  };

  return (
    <div className="orbital-bubbles-wrapper" ref={containerRef}>
      {/* Background Video Layer */}
      <video
        className="orbital-bg-video"
        autoPlay
        loop
        muted
        playsInline
        src="/ànimàte-bàck-ground.mp4"
      />
      <div className="orbital-bg-overlay" />{" "}
      {/* Optional overlay for contrast if needed */}
      {/* Top Navigation Bar Removed - Handled by PublicLayout */}
      <div style={{ height: 20 }} />
      {/* Main Hero Section */}
      <main className="hero-main-container">
        {/* Left Content */}
        <motion.div
          className="hero-text-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>
            Bienvenue sur le <br />
            <span style={{ color: "var(--color-cam-green)" }}>STARTER</span>
            <span style={{ color: "var(--color-cam-red)" }}>KIT</span>{" "}
            <span style={{ color: "var(--color-cam-yellow)" }}>CM</span>
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#4b5563",
              lineHeight: "1.6",
              marginTop: "16px",
            }}
          >
            La plateforme connectée du{" "}
            <span
              style={{
                fontFamily: "Caveat, cursive",
                fontSize: "48px",
                fontWeight: 600,
                color: "var(--color-cam-green)",
                display: "inline-block",
                marginTop: "8px",
              }}
            >
              CAMEROUN
            </span>{" "}
            pour entreprendre en toute confiance.
          </p>
          <div className="hero-cta-group">
            <button className="btn-premium-solid">Commencer maintenant</button>
            <button className="btn-premium-glass">Explorer les parcours</button>
          </div>
        </motion.div>

        {/* Right Orbital Stage */}
        <div className="orbital-stage">
          {orbitalBubblesConfig.map((bubble, index) => {
            const Icon = IconMap[bubble.icon] || Briefcase;

            // Orbital parameters for tilted elliptical paths
            const radiusX = 220;
            const radiusY = 120;
            const angleOffset = (index * (Math.PI * 2)) / 4;

            return (
              <motion.div
                key={bubble.id}
                className="glass-capsule"
                style={{
                  zIndex: 20 + index,
                }}
                animate={{
                  x: [
                    Math.cos(angleOffset) * radiusX,
                    Math.cos(angleOffset + Math.PI * 2) * radiusX,
                  ],
                  y: [
                    Math.sin(angleOffset) * radiusY,
                    Math.sin(angleOffset + Math.PI * 2) * radiusY,
                  ],
                  scale: [1, 1.1, 0.9, 1],
                  opacity: [0.8, 1, 0.7, 0.8],
                }}
                transition={{
                  duration: 25 + index * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{ scale: 1.05, zIndex: 50 }}
                onClick={() => onBubbleClick?.(bubble)}
              >
                <div className="capsule-icon-box">
                  <Icon size={32} color={bubble.color} strokeWidth={1.5} />
                </div>
                <div className="capsule-text">
                  <span className="capsule-title">{bubble.title}</span>
                  <span className="capsule-sub">{bubble.sub}</span>
                </div>
              </motion.div>
            );
          })}

          {/* Decorative glowing nodes on orbits */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={`glow-${i}`}
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--color-gold-prestige)",
                filter: "blur(4px)",
                opacity: 0.4,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </main>
      {/* Bottom Intents Section */}
      <section className="bottom-intents-section">
        <motion.div
          className="bottom-section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        ></motion.div>

        <div className="intents-grid">
          {bottomIntentsConfig.map((intent, idx) => {
            const Icon = IconMap[intent.icon] || Lightbulb;
            return (
              <motion.div
                key={intent.id}
                className="intent-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="capsule-icon-box"
                  style={{ width: 60, height: 60 }}
                >
                  <Icon size={24} color="var(--color-gold-prestige)" />
                </div>
                <div className="intent-text">
                  <div style={{ fontSize: 13, color: "var(--color-text-sub)" }}>
                    {intent.title}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--color-emerald-deep)",
                    }}
                  >
                    {intent.strong}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-sub)",
                      marginTop: 4,
                    }}
                  >
                    <ArrowRight size={12} style={{ marginRight: 4 }} />{" "}
                    {intent.desc}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default OrbitalBubbles;
