import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      parcours: 'Parcours',
      formations: 'Formations',
      dashboard: 'Espace personnel',
      login: 'Connexion',
      signup: 'Commencer',
    },
    hero: {
      title: 'Entreprenez en toute confiance',
      subtitle: 'sur la plateforme officielle des entrepreneurs du Cameroun',
      description: 'Orientation, accompagnement et certification des parcours entrepreneuriaux en partenariat avec le MINPEEMSA.',
      cta_primary: 'Démarrer mon parcours',
      cta_secondary: 'Découvrir la plateforme',
    },
    features: {
      title: 'Une plateforme pensée pour vous',
      subtitle: 'Des outils et ressources adaptés à chaque étape de votre parcours entrepreneurial.',
    },
    parcours: {
      title: 'Nos parcours',
      subtitle: 'Choisissez le parcours adapté à votre niveau et vos objectifs.',
      disponible: 'Disponible',
      en_cours: 'En cours',
      valide: 'Terminé',
      commencer: 'Commencer',
      continuer: 'Continuer',
    },
    formations: {
      title: 'Formations certifiantes',
      subtitle: 'Accédez à des formations de qualité sur notre campus partenaire.',
      niveau: {
        debutant: 'Débutant',
        intermediaire: 'Intermédiaire',
        avance: 'Avancé',
      },
      certifiant: 'Certifiant',
      acces_formation: 'Accéder à la formation',
      partenaire: 'Partenaire :',
    },
    dashboard: {
      welcome: 'Bienvenue',
      subtitle: 'Voici l\'état de votre parcours entrepreneurial.',
      progression: 'Progression globale',
      certifications: 'Certifications',
      formations_terminees: 'Formations terminées',
      temps_apprentissage: 'Temps d\'apprentissage',
      parcours_en_cours: 'Parcours en cours',
      prochain_parcours: 'Prochains parcours',
    },
    assistant: {
      title: 'Guide STARTER',
      subtitle: 'Votre assistant pédagogique',
      welcome: 'Bonjour !',
      welcome_message: 'Je suis votre guide STARTER. Je suis là pour vous accompagner.',
      orientation: 'Que souhaitez-vous faire aujourd\'hui ?',
      orientation_message: 'Voici les parcours recommandés.',
    },
    footer: {
      partenaires: 'Partenaires',
      produit: 'Produit',
      ressources: 'Ressources',
      contact: 'Contact',
      copyright: 'Tous droits réservés.',
      made_in: 'Fait avec passion au Cameroun',
    },
  },
  en: {
    nav: {
      home: 'Home',
      parcours: 'Paths',
      formations: 'Training',
      dashboard: 'Personal Space',
      login: 'Login',
      signup: 'Get Started',
    },
    hero: {
      title: 'Start your business with confidence',
      subtitle: 'on the official platform for entrepreneurs in Cameroon',
      description: 'Guidance, support and certification of entrepreneurial paths in partnership with MINPEEMSA.',
      cta_primary: 'Start my journey',
      cta_secondary: 'Discover the platform',
    },
    features: {
      title: 'A platform designed for you',
      subtitle: 'Tools and resources adapted to each step of your entrepreneurial journey.',
    },
    parcours: {
      title: 'Our paths',
      subtitle: 'Choose the path that fits your level and goals.',
      disponible: 'Available',
      en_cours: 'In Progress',
      valide: 'Completed',
      commencer: 'Start',
      continuer: 'Continue',
    },
    formations: {
      title: 'Certified Training',
      subtitle: 'Access quality training on our partner campus.',
      niveau: {
        debutant: 'Beginner',
        intermediaire: 'Intermediate',
        avance: 'Advanced',
      },
      certifiant: 'Certified',
      acces_formation: 'Access training',
      partenaire: 'Partner :',
    },
    dashboard: {
      welcome: 'Welcome',
      subtitle: 'Here is the status of your entrepreneurial journey.',
      progression: 'Overall progression',
      certifications: 'Certifications',
      formations_terminees: 'Completed training',
      temps_apprentissage: 'Learning time',
      parcours_en_cours: 'Paths in progress',
      prochain_parcours: 'Next paths',
    },
    assistant: {
      title: 'STARTER Guide',
      subtitle: 'Your educational assistant',
      welcome: 'Hello!',
      welcome_message: 'I am your STARTER guide. I am here to accompany you.',
      orientation: 'What would you like to do today?',
      orientation_message: 'Here are the recommended paths.',
    },
    footer: {
      partenaires: 'Partners',
      produit: 'Product',
      ressources: 'Resources',
      contact: 'Contact',
      copyright: 'All rights reserved.',
      made_in: 'Made with passion in Cameroon',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
    }
    return result || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
