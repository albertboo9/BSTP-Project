import { forwardRef } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

/**
 * OrbitalBubble - Bulle avec animation premium et fluide
 * Animations lentes, élégantes avec entrée depuis les coins + rebond
 */

// Délais d'entrée pour chaque index (0-5) - entrée cascade élégante
const enterDelays = [0, 0.3, 0.5, 0.6, 0.8, 0.9];

// Durées d'animation pour effet premium
const ANIMATION_DURATION = 1.0;
const HOVER_DURATION = 0.4;

// Fonction pour calculer la position de départ selon le coin
const getCornerPosition = (corner, position) => {
  const offset = 400; // Distance de départ depuis le coin
  switch (corner) {
    case "top-left":
      return { x: offset, y: offset };
    case "top-right":
      return { x: -offset, y: offset };
    case "bottom-left":
      return { x: offset, y: -offset };
    case "bottom-right":
      return { x: -offset, y: offset };
    default:
      return { x: 0, y: 0 };
  }
};

export const OrbitalBubble = forwardRef(function OrbitalBubble(
  {
    id,
    title,
    icon,
    category,
    color,
    description,
    index,
    position,
    corner = "center",
    size = "normal",
    image,
    onClick,
    className,
    style,
    ...props
  },
  ref,
) {
  // Récupérer le composant d'icône
  const IconComponent = Icons[icon] || Icons.HelpCircle;

  // Délai de'entrée selon l'index
  const enterDelay = enterDelays[index % enterDelays.length];

  // Calculer la position de départ selon le coin
  const cornerOffset = getCornerPosition(corner, position);

  // Taille des bulles (supporte nombre pixels ou string)
  let bubbleSize;
  if (typeof size === "number") {
    bubbleSize = `${size}px`;
  } else {
    const bubbleSizes = {
      small: "85px",
      normal: "100px",
      large: "140px",
      xlarge: "180px",
    };
    bubbleSize = bubbleSizes[size] || bubbleSizes.normal;
  }

  // Ajuster l'icône selon la taille
  let iconSize;
  if (typeof size === "number") {
    iconSize = Math.round(size * 0.25); // 25% de la taille de la bulle
  } else {
    const iconSizes = {
      small: 22,
      normal: 28,
      large: 36,
      xlarge: 44,
    };
    iconSize = iconSizes[size] || iconSizes.normal;
  }

  return (
    <motion.div
      ref={ref}
      className={`orbital-bubble ${className || ""}`}
      data-category={category}
      style={{
        ...style,
        "--glow-color": color,
        "--bubble-size": bubbleSize,
        left: position?.x,
        top: position?.y,
      }}
      // Entrée depuis le coin avec rebond
      initial={{
        opacity: 0,
        scale: 0.3,
        x: cornerOffset.x,
        y: cornerOffset.y,
        rotate: cornerOffset.x > 0 ? 15 : -15,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      transition={{
        duration: ANIMATION_DURATION,
        delay: enterDelay,
        ease: [0.34, 1.56, 0.64, 1], // Ease avec rebond
      }}
      // Hover avec effet de "levée" elegant
      whileHover={{
        scale: 1.12,
        y: -12,
        transition: { duration: HOVER_DURATION, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onClick?.({ id, title, category })}
      role="button"
      tabIndex={0}
      aria-label={`${title} - ${description || category}`}
      {...props}
    >
      {/* Glow effect au hover */}
      <motion.span
        className="orbital-bubble-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          filter: "blur(12px)",
          zIndex: -1,
        }}
      />

      {/* Image de la bulle ou contenu par défaut */}
      {image ? (
        /* Image au centre de la bulle */
        <motion.img
          src={image}
          alt={title || "Bubble image"}
          className="orbital-bubble-image"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: enterDelay + 0.2, duration: 0.4 }}
          style={{
            width: "var(--bubble-image-size)",
            height: "var(--bubble-image-size)",
            objectFit: "contain",
          }}
        />
      ) : (
        /* Contenu par défaut: icône + titre + description */
        <>
          {/* Icône */}
          <span className="orbital-bubble-icon">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: enterDelay + 0.2, duration: 0.4 }}
            >
              <IconComponent size={iconSize} strokeWidth={1.5} color={color} />
            </motion.div>
          </span>

          {/* Titre avec révélation */}
          <motion.span
            className="orbital-bubble-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: enterDelay + 0.15, duration: 0.4 }}
            style={{ color: color }}
          >
            {title}
          </motion.span>

          {/* Description courte */}
          {description && (
            <motion.span
              className="orbital-bubble-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: enterDelay + 0.25, duration: 0.4 }}
            >
              {description}
            </motion.span>
          )}
        </>
      )}
    </motion.div>
  );
});

export default OrbitalBubble;
