/**
 * 🎯 ORBITAL REDESIGN - RÉFÉRENCE AU MOCKUP ORIGINAL
 * 
 * Design fidèle au mockup plans/floating-bubbles-mockup.html:
 * - Même style de bulles glassmorphism
 * - Même orbs flous (purple & green)
 * - Même grille subtile
 * - Même centrale cards
 * - Animations orbitales fluides
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lightbulb, Users, TrendingUp, Scale, Rocket, 
  Building2, Award, DollarSign, Truck, GraduationCap,
  Users as TeamIcon, CheckCircle
} from "lucide-react";

// ============================================
// CONFIGURATION DES BULLES (12 BULLES COMME ORIGINAL)
// ============================================

const BUBBLES_CONFIG = [
  { id: "sensibiliser", title: "Sensibiliser", icon: Lightbulb, color: "#635bff", gradient: "rgba(99, 91, 255," },
  { id: "reseau", title: "Réseau", icon: Users, color: "#10b981", gradient: "rgba(16, 185, 129," },
  { id: "equipe", title: "Équipe", icon: TeamIcon, color: "#8b5cf6", gradient: "rgba(139, 92, 246," },
  { id: "activite", title: "Activité", icon: TrendingUp, color: "#06b6d4", gradient: "rgba(6, 182, 212," },
  { id: "probleme", title: "Problème", icon: Scale, color: "#f97316", gradient: "rgba(249, 115, 22," },
  { id: "autrement", title: "Autrement", icon: Rocket, color: "#ec4899", gradient: "rgba(236, 72, 153," },
  { id: "entreprise", title: "Entreprise", icon: Building2, color: "#14b8a6", gradient: "rgba(20, 184, 166," },
  { id: "certifier", title: "Certifier", icon: Award, color: "#f59e0b", gradient: "rgba(245, 158, 11," },
  { id: "financement", title: "Financement", icon: DollarSign, color: "#22c55e", gradient: "rgba(34, 197, 94," },
  { id: "distribution", title: "Distribution", icon: Truck, color: "#0ea5e9", gradient: "rgba(14, 165, 233," },
  { id: "mentor", title: "Mentor", icon: CheckCircle, color: "#d946ef", gradient: "rgba(217, 70, 239," },
  { id: "formation", title: "Formation", icon: GraduationCap, color: "#6366f1", gradient: "rgba(99, 102, 241," },
];

// ============================================
// COMPOSANT BULLE INDIVIDUELLE
// ============================================

function OrbitalBubble({ config, centerPos, containerSize, mousePos }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const bubbleRef = useRef(null);
  const animationRef = useRef(null);
  
  // Calculer la position orbitale avec animation
  useEffect(() => {
    if (!containerSize.width || !centerPos.x) return;
    
    const index = BUBBLES_CONFIG.findIndex(b => b.id === config.id);
    const angle = (index / BUBBLES_CONFIG.length) * Math.PI * 2;
    const baseOrbitRadius = Math.min(containerSize.width, containerSize.height) * 0.35;
    const orbitRadius = baseOrbitRadius + (index % 2 === 0 ? 40 : -40);
    
    let currentAngle = angle;
    const angleSpeed = 0.0002;
    const angleDir = index % 2 === 0 ? 1 : -1;
    
    const floatPhase = index * 0.5;
    const floatSpeed = 2000 + index * 100;
    
    const animate = () => {
      const time = Date.now();
      currentAngle += angleSpeed * angleDir;
      
      // Orbit
      const orbitX = centerPos.x + Math.cos(currentAngle) * orbitRadius - 30;
      const orbitY = centerPos.y + Math.sin(currentAngle) * orbitRadius - 30;
      
      // Float
      const floatX = Math.sin(time / floatSpeed + floatPhase) * 15;
      const floatY = Math.cos(time / (floatSpeed * 0.8) + floatPhase) * 12;
      
      let finalX = orbitX + floatX;
      let finalY = orbitY + floatY;
      
      // Safe radius collision
      const safeRadius = Math.min(containerSize.width, containerSize.height) * 0.18;
      const bubbleCenterX = finalX + 30;
      const bubbleCenterY = finalY + 30;
      const distFromCenter = Math.sqrt(
        Math.pow(bubbleCenterX - centerPos.x, 2) + 
        Math.pow(bubbleCenterY - centerPos.y, 2)
      );
      
      if (distFromCenter < safeRadius) {
        const pushAngle = Math.atan2(bubbleCenterY - centerPos.y, bubbleCenterX - centerPos.x);
        finalX = centerPos.x + Math.cos(pushAngle) * (safeRadius + 40) - 30;
        finalY = centerPos.y + Math.sin(pushAngle) * (safeRadius + 40) - 30;
      }
      
      // Mouse repulsion
      if (mousePos.x !== null) {
        const dx = bubbleCenterX - mousePos.x;
        const dy = bubbleCenterY - mousePos.y;
        const distMouse = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;
        
        if (distMouse < repelRadius && distMouse > 0) {
          const force = Math.pow((repelRadius - distMouse) / repelRadius, 2);
          finalX += (dx / distMouse) * force * 50;
          finalY += (dy / distMouse) * force * 40;
        }
      }
      
      setPosition({ x: finalX, y: finalY });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [containerSize, centerPos, config, mousePos]);
  
  return (
    <motion.div
      ref={bubbleRef}
      className={`bubble-${config.id}`}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: 60,
        height: 60,
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        cursor: "pointer",
        pointerEvents: "auto",
        border: "2px solid",
        borderColor: `${config.color}80`,
        background: `linear-gradient(135deg, ${config.gradient}0.25) 0%, ${config.gradient}0.1) 100%)`,
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        zIndex: 10,
      }}
      transition={{ 
        delay: 0.5 + BUBBLES_CONFIG.findIndex(b => b.id === config.id) * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{
        scale: 1.5,
        translateY: -20,
        zIndex: 200,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
        borderWidth: 3,
      }}
    >
      <motion.span 
        className="icon"
        style={{ 
          fontSize: 18, 
          color: config.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        whileHover={{ scale: 1.3, rotate: 15 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <config.icon size={20} color={config.color} strokeWidth={2.5} />
      </motion.span>
      <span style={{
        fontSize: 6,
        fontWeight: 700,
        color: "#1a1a2e",
        textAlign: "center",
        maxWidth: 50,
        textTransform: "uppercase",
        letterSpacing: 0.3,
        lineHeight: 1.2,
      }}>
        {config.title}
      </span>
    </motion.div>
  );
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function OrbitalRedesignTest() {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [centerPos, setCenterPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const sectionRef = useRef(null);
  
  // Update dimensions
  useEffect(() => {
    const updateSize = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
        setCenterPos({ x: rect.width / 2, y: rect.height / 2 });
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    // Recharger après un court délai pour s'assurer du rendu
    setTimeout(updateSize, 100);
    
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
      }
    };
    
    const handleMouseLeave = () => {
      setMousePos({ x: null, y: null });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return (
    <div style={styles.container}>
      {/* Background Grid */}
      <div style={styles.backgroundGrid} />
      
      {/* Orb 1 - Purple */}
      <motion.div 
        style={styles.orb1}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Orb 2 - Green */}
      <motion.div 
        style={styles.orb2}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Welcome Section */}
      <section ref={sectionRef} style={styles.welcomeSection}>
        
        {/* Floating Bubbles Container */}
        <div style={styles.bubblesContainer}>
          {BUBBLES_CONFIG.map((bubble) => (
            <OrbitalBubble
              key={bubble.id}
              config={bubble}
              centerPos={centerPos}
              containerSize={containerSize}
              mousePos={mousePos}
            />
          ))}
        </div>
        
        {/* Central Content Card */}
        <motion.div 
          style={styles.centralContent}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h1 style={styles.title}>
            Bienvenue sur <span style={styles.highlight}>STARTERKIT CM</span>
          </h1>
          <p style={styles.subtitle}>
            Votre plateforme pour développer votre entreprise au Cameroun.
          </p>
          <div style={styles.ctaContainer}>
            <motion.button
              style={styles.ctaPrimary}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 8px 25px rgba(99, 91, 255, 0.35)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Découvrir
            </motion.button>
            <motion.button
              style={styles.ctaSecondary}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                background: "#635bff",
                color: "white",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Parcours
            </motion.button>
          </div>
        </motion.div>
        
      </section>
      
      {/* Instructions */}
      <motion.div
        style={styles.instructions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        ✨ Bougez la souris pour interagir avec les bulles
      </motion.div>
      
    </div>
  );
}

// ============================================
// STYLES (identiques au mockup original)
// ============================================

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    minHeight: "100vh",
    background: "#ffffff",
    overflow: "hidden",
    fontFamily: '"Segoe UI", system-ui, sans-serif',
  },
  
  // Background Grid
  backgroundGrid: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(rgba(99, 91, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 91, 255, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
    zIndex: 0,
    pointerEvents: "none",
  },
  
  // Orb 1 - Purple (top right)
  orb1: {
    position: "fixed",
    top: "5%",
    right: "5%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99, 91, 255, 0.1) 0%, transparent 70%)",
    filter: "blur(60px)",
    zIndex: 0,
    pointerEvents: "none",
  },
  
  // Orb 2 - Green (bottom left)
  orb2: {
    position: "fixed",
    bottom: "5%",
    left: "5%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
    filter: "blur(60px)",
    zIndex: 0,
    pointerEvents: "none",
  },
  
  // Welcome Section
  welcomeSection: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    padding: "40px",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    border: "2px dashed rgba(99, 91, 255, 0.15)",
    borderRadius: "20px",
  },
  
  // Bubbles Container
  bubblesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 5,
    pointerEvents: "none",
  },
  
  // Central Content Card
  centralContent: {
    textAlign: "center",
    padding: "30px 40px",
    background: "rgba(255, 255, 255, 0.95)",
    border: "3px solid #635bff",
    borderRadius: "20px",
    boxShadow: "0 15px 50px rgba(99, 91, 255, 0.2)",
    maxWidth: "480px",
    zIndex: 10,
    position: "relative",
  },
  
  // Typography
  title: {
    fontSize: "clamp(20px, 3vw, 30px)",
    fontWeight: 800,
    color: "#1a1a2e",
    marginBottom: "12px",
    lineHeight: 1.2,
  },
  
  highlight: {
    color: "#635bff",
  },
  
  subtitle: {
    fontSize: "clamp(14px, 1.8vw, 18px)",
    color: "#4b5563",
    lineHeight: 1.5,
    marginBottom: "20px",
  },
  
  // CTA Buttons
  ctaContainer: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  
  ctaPrimary: {
    background: "#635bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  
  ctaSecondary: {
    background: "transparent",
    color: "#635bff",
    padding: "10px 20px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "13px",
    border: "2px solid #635bff",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  
  // Instructions
  instructions: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(26, 26, 46, 0.9)",
    color: "white",
    padding: "10px 24px",
    borderRadius: "30px",
    fontSize: "12px",
    zIndex: 1000,
    backdropFilter: "blur(10px)",
  },
};
