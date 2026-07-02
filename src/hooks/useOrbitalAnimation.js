import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook pour suivre la position de la souris
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return position;
}

/**
 * Hook pour détecter si l'utilisateur préfère réduire les animations
 */
export function useReducedMotion() {
  const mediaQuery = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  
  const [reducedMotion, setReducedMotion] = useState(
    mediaQuery ? mediaQuery.matches : false
  );
  
  useEffect(() => {
    if (!mediaQuery) return;
    
    const handleChange = (e) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mediaQuery]);
  
  return reducedMotion;
}

/**
 * Hook pour les dimensions de la fenêtre avec debounce
 */
export function useWindowSize(delay = 250) {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, delay);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [delay]);
  
  return size;
}

/**
 * Hook optimisé pour l'animation orbitale
 * Utilise une seule boucle RAF pour toutes les bulles
 */
export function useOrbitalAnimation(bubbles, options = {}) {
  const {
    orbitSpeed = 0.0003,
    floatAmplitude = 12,
    floatFrequency = 0.001,
    centerX = 0,
    centerY = 0,
    baseRadius = 150,
    radiusVariation = 50
  } = options;
  
  const positionsRef = useRef([]);
  const frameRef = useRef(null);
  const [positions, setPositions] = useState([]);
  
  // Calculer les positions orbitales
  const calculatePositions = useCallback((timestamp) => {
    if (bubbles.length === 0) return [];
    
    return bubbles.map((bubble, index) => {
      // Angle de base (réparti symétriquement)
      const baseAngle = (index / bubbles.length) * Math.PI * 2;
      
      // Orbite principale
      const angle = baseAngle + (timestamp * orbitSpeed);
      const radius = baseRadius + Math.sin(timestamp * 0.0005 + index) * radiusVariation;
      
      // Flottaison douce
      const floatX = Math.sin(timestamp * floatFrequency + index * 0.5) * floatAmplitude;
      const floatY = Math.cos(timestamp * floatFrequency * 0.8 + index * 0.3) * (floatAmplitude * 0.6);
      
      return {
        id: bubble.id,
        x: centerX + Math.cos(angle) * radius + floatX,
        y: centerY + Math.sin(angle) * radius + floatY
      };
    });
  }, [bubbles, orbitSpeed, floatAmplitude, floatFrequency, baseRadius, radiusVariation, centerX, centerY]);
  
  // Boucle d'animation unifiée
  useEffect(() => {
    const animate = (timestamp) => {
      const newPositions = calculatePositions(timestamp);
      positionsRef.current = newPositions;
      setPositions(newPositions);
      frameRef.current = requestAnimationFrame(animate);
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [calculatePositions]);
  
  return positions;
}

export default {
  useMousePosition,
  useReducedMotion,
  useWindowSize,
  useOrbitalAnimation
};
