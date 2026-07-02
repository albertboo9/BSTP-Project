import { createContext, useContext, useState, useEffect } from "react";

const ParcoursContext = createContext(null);

// Clés pour le localStorage
const STORAGE_KEYS = {
  COMPANY_INFO: "parcours_company_info",
  COMPLETED_PARCOURS: "parcours_completed",
  PARCOURS_PROGRESS: "parcours_progress",
};

export function ParcoursProvider({ children }) {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [completedParcours, setCompletedParcours] = useState([]);
  const [parcoursProgress, setParcoursProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    try {
      const savedCompanyInfo = localStorage.getItem(STORAGE_KEYS.COMPANY_INFO);
      const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_PARCOURS);
      const savedProgress = localStorage.getItem(STORAGE_KEYS.PARCOURS_PROGRESS);

      if (savedCompanyInfo) {
        setCompanyInfo(JSON.parse(savedCompanyInfo));
      }
      if (savedCompleted) {
        setCompletedParcours(JSON.parse(savedCompleted));
      }
      if (savedProgress) {
        setParcoursProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Erreur chargement données parcours:", error);
    }
    setIsLoading(false);
  }, []);

  // Sauvegarder companyInfo
  useEffect(() => {
    if (companyInfo) {
      localStorage.setItem(STORAGE_KEYS.COMPANY_INFO, JSON.stringify(companyInfo));
    }
  }, [companyInfo]);

  // Sauvegarder parcours complétés
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_PARCOURS, JSON.stringify(completedParcours));
  }, [completedParcours]);

  // Sauvegarder progression
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PARCOURS_PROGRESS, JSON.stringify(parcoursProgress));
  }, [parcoursProgress]);

  // Sauvegarder companyInfo automatiquement
  const saveCompanyInfo = (info) => {
    setCompanyInfo({
      ...info,
      savedAt: new Date().toISOString(),
    });
  };

  // Marquer un parcours comme complété
  const completeParcours = (parcoursId) => {
    if (!completedParcours.includes(parcoursId)) {
      setCompletedParcours((prev) => [...prev, parcoursId]);
    }
  };

  // Vérifier si un parcours est complété
  const isParcoursCompleted = (parcoursId) => {
    return completedParcours.includes(parcoursId);
  };

  // Mettre à jour la progression d'un parcours
  const updateProgress = (parcoursId, progress) => {
    setParcoursProgress((prev) => ({
      ...prev,
      [parcoursId]: progress,
    }));
  };

  // Obtenir la progression d'un parcours
  const getProgress = (parcoursId) => {
    return parcoursProgress[parcoursId] || 0;
  };

  // Vérifier si l'utilisateur peut accéder à un parcours
  const canAccessParcours = (parcoursId, accessLevel) => {
    // Si le parcours est libre, pas de restriction
    if (accessLevel === "libre") {
      return true;
    }
    // Si le parcours est conditionnel, vérifier que Création est complété
    if (accessLevel === "conditionnel") {
      return isParcoursCompleted("creation") && companyInfo !== null;
    }
    return false;
  };

  // Vérifier si l'entreprise est enregistrée
  const hasCompanyInfo = () => {
    return companyInfo !== null && companyInfo.companyName && companyInfo.companyName.trim() !== "";
  };

  // Reset all data - useful for demos/presentations
  const resetAllData = () => {
    setCompanyInfo(null);
    setCompletedParcours([]);
    setParcoursProgress({});
    localStorage.removeItem(STORAGE_KEYS.COMPANY_INFO);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_PARCOURS);
    localStorage.removeItem(STORAGE_KEYS.PARCOURS_PROGRESS);
  };

  const value = {
    // Données entreprise
    companyInfo,
    saveCompanyInfo,
    hasCompanyInfo,

    // Parcours complétés
    completedParcours,
    completeParcours,
    isParcoursCompleted,

    // Progression
    parcoursProgress,
    updateProgress,
    getProgress,

    // Contrôle d'accès
    canAccessParcours,
    resetAllData,

    // État
    isLoading,
  };

  return (
    <ParcoursContext.Provider value={value}>
      {children}
    </ParcoursContext.Provider>
  );
}

export function useParcours() {
  const context = useContext(ParcoursContext);
  if (!context) {
    throw new Error("useParcours must be used within a ParcoursProvider");
  }
  return context;
}
