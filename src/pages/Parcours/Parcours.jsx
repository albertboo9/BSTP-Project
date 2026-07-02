import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// Professional SVG Icons
const Icons = {
  sensibilisation: (
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
  ),
  creation: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  formation: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  financement: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  reseau: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  probleme: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  certifier: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 114.874 3.42 3.42 0 00-1.946.806 3.42 3.42 0 013.42 3.42 3.42 3.42 0 11-3.42 3.42 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-3.42zm3.42 3.42a3.42 3.42 0 003.42-3.42 3.42 3.42 0 00-3.42-3.42 3.42 3.42 0 00-3.42 3.42 3.42 3.42 0 003.42 3.42zm-3.42 3.42a3.42 3.42 0 003.42 3.42 3.42 3.42 0 00-3.42-3.42 3.42 3.42 0 00-3.42 3.42 3.42 3.42 0 003.42-3.42z" />
    </svg>
  ),
  distribution: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  mentor: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  tools: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  arrow: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  ),
  check: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  clock: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  information: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  partners: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
    </svg>
  ),
};

function Parcours() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Categories with improved copywriting
  const categories = [
    {
      id: "sensibilisation",
      title: "Decouverte",
      subtitle: "Comprendre l'ecosysteme entrepreneurial",
      icon: "sensibilisation",
      gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      options: [
        {
          id: "sensibilisation",
          title: "Sensibilisation a l'entrepreneuriat",
          description:
            "Decouvrez les fondamentaux de l'entrepreneuriat au Cameroun",
          duration: "2 semaines",
          level: " Debutant",
          modules: 4,
          color: "#fbbf24",
        },
        {
          id: "ecosysteme",
          title: "Ecosysteme entrepreneurial",
          description: "Connaitre les acteurs et les structures d'appui",
          duration: "1 semaine",
          level: " Debutant",
          modules: 3,
          color: "#fbbf24",
        },
        {
          id: "opportunites",
          title: "Identification des opportunites",
          description: "Apprenez a identifier les marches et les besoins",
          duration: "2 semaines",
          level: " Debutant",
          modules: 4,
          color: "#fbbf24",
        },
      ],
    },
    {
      id: "creation",
      title: "Creation",
      subtitle: "Creer votre entreprise legalement",
      icon: "creation",
      gradient: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
      options: [
        {
          id: "creation",
          title: "Creation d'entreprise",
          description:
            "Structurez et formalisez votre entreprise selon les regles en vigueur",
          duration: "6 semaines",
          level: " Intermediaire",
          modules: 8,
          color: "#635bff",
        },
        {
          id: "formalisation",
          title: "Formalites administratives",
          description: "Apprenez a effectuer les demarches administratives",
          duration: "2 semaines",
          level: " Debutant",
          modules: 3,
          color: "#635bff",
        },
        {
          id: "statut-juridique",
          title: "Choix du statut juridique",
          description:
            "Guide pour choisir le meilleur statut pour votre entreprise",
          duration: "1 semaine",
          level: " Intermediaire",
          modules: 2,
          color: "#635bff",
        },
        {
          id: "business-plan",
          title: "Redaction du business plan",
          description: "Apprenez a elaborer un business plan solide",
          duration: "3 semaines",
          level: " Intermediaire",
          modules: 5,
          color: "#635bff",
        },
      ],
    },
    {
      id: "certification",
      title: "Certification",
      subtitle: "Normaliser et certifier vos produits",
      icon: "certifier",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      options: [
        {
          id: "certification-produits",
          title: "Certification produits",
          description: "Procedures pour certifier vos produits au Cameroun",
          duration: "4 semaines",
          level: " Intermediaire",
          modules: 6,
          color: "#f59e0b",
        },
        {
          id: "label-qualite",
          title: "Label qualite",
          description: "Obtenir un label qualite pour vos produits",
          duration: "3 semaines",
          level: " Avance",
          modules: 4,
          color: "#f59e0b",
        },
        {
          id: "homologation",
          title: "Homologation",
          description: "Procedures d'homologation et de normalisation",
          duration: "6 semaines",
          level: " Avance",
          modules: 8,
          color: "#f59e0b",
        },
        {
          id: "normes-cam",
          title: "Normes camerounaises",
          description: "Formation sur les normes ANOR",
          duration: "2 semaines",
          level: " Intermediaire",
          modules: 3,
          color: "#f59e0b",
        },
      ],
    },
    {
      id: "formation",
      title: "Competences",
      subtitle: "Developpez vos savoir-faire",
      icon: "formation",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      options: [
        {
          id: "gestion",
          title: "Gestion d'entreprise",
          description:
            "Maitrisez les bases de la gestion commerciale et financiere",
          duration: "4 semaines",
          level: " Intermediaire",
          modules: 6,
          color: "#10b981",
        },
        {
          id: "marketing",
          title: "Marketing digital",
          description: "Apprenez a promouvoir votre entreprise en ligne",
          duration: "3 semaines",
          level: " Tous niveaux",
          modules: 5,
          color: "#10b981",
        },
        {
          id: "comptabilite",
          title: "Comptabilite simplifiee",
          description: "Tenez votre comptabilite vous-meme",
          duration: "4 semaines",
          level: " Debutant",
          modules: 5,
          color: "#10b981",
        },
        {
          id: "leadership",
          title: "Leadership entrepreneurial",
          description: "Developpez vos competances de leader",
          duration: "3 semaines",
          level: " Intermediaire",
          modules: 4,
          color: "#10b981",
        },
        {
          id: "campus-formation",
          title: "Campus e-learning",
          description: "Formations certifiantes sur notre campus partenaire",
          duration: "Variable",
          level: " Tous niveaux",
          modules: "Plus",
          color: "#10b981",
        },
      ],
    },
    {
      id: "financement",
      title: "Financement",
      subtitle: "Financez votre projet",
      icon: "financement",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      options: [
        {
          id: "appui-financier",
          title: "Appui financier MINPMEESA",
          description: "Solicitez les subventions et concours financiers",
          duration: "Sur dossier",
          level: " Intermediaire",
          modules: 1,
          color: "#10b981",
        },
        {
          id: "banques",
          title: "Prets bancaires",
          description: "Etablissez le contact avec les banques partenaires",
          duration: "2 semaines",
          level: " Avance",
          modules: 3,
          color: "#0ea5e9",
        },
        {
          id: "investisseurs",
          title: "Mise en relation investisseurs",
          description: "Connectez-vous avec des investisseurs interesses",
          duration: "3 semaines",
          level: " Avance",
          modules: 4,
          color: "#8b5cf6",
        },
        {
          id: "microfinance",
          title: "Microfinance",
          description: "Solutions de microcredit pour les PME",
          duration: "1 semaine",
          level: " Debutant",
          modules: 2,
          color: "#10b981",
        },
        {
          id: "crowdfunding",
          title: "Crowdfunding",
          description: "Financez votre projet via le financement participatif",
          duration: "3 semaines",
          level: " Intermediaire",
          modules: 4,
          color: "#ec4899",
        },
      ],
    },
    {
      id: "distribution",
      title: "Distribution",
      subtitle: "Trouvez un reseau de distribution",
      icon: "distribution",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
      options: [
        {
          id: "partenaires-dist",
          title: "Partenaires de distribution",
          description: "Accedez a notre annuaire de partenaires",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: 1,
          color: "#0ea5e9",
        },
        {
          id: "marketplaces",
          title: "Marketplaces",
          description: "Vendez sur les plateformes en ligne",
          duration: "2 semaines",
          level: " Intermediaire",
          modules: 3,
          color: "#10b981",
        },
        {
          id: "export",
          title: "Export international",
          description: "Developpez vos activites a l'international",
          duration: "6 semaines",
          level: " Avance",
          modules: 8,
          color: "#8b5cf6",
        },
        {
          id: "reseau-grossistes",
          title: "Reseau de grossistes",
          description: "Connectez-vous avec des grossistes qualifies",
          duration: "2 semaines",
          level: " Intermediaire",
          modules: 3,
          color: "#0ea5e9",
        },
      ],
    },
    {
      id: "mentor",
      title: "Mentorat",
      subtitle: "Trouvez un mentor d'experience",
      icon: "mentor",
      gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      options: [
        {
          id: "mentorat-individuel",
          title: "Mentorat individuel",
          description: "Etre accompagne par un mentor experimente",
          duration: "3 mois",
          level: " Tous niveaux",
          modules: 12,
          color: "#ec4899",
        },
        {
          id: "reseau-mentors",
          title: "Reseau de mentors",
          description: "Accedez a notre annuaire de mentors",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: 1,
          color: "#8b5cf6",
        },
        {
          id: "coaching",
          title: "Coaching entrepreneurial",
          description: "Sessions de coaching personnalisees",
          duration: "Au besoin",
          level: " Tous niveaux",
          modules: "Variable",
          color: "#f59e0b",
        },
        {
          id: "peer-mentoring",
          title: "Peer mentoring",
          description: "Echangez avec d'autres entrepreneurs",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Illimite",
          color: "#ec4899",
        },
      ],
    },
    {
      id: "reseau",
      title: "Connexions",
      subtitle: "Build votre reseau professionnel",
      icon: "reseau",
      gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      options: [
        {
          id: "reseau-entrepreneur",
          title: "Reseau entrepreneurial",
          description:
            "Connectez-vous avec d'autres entrepreneurs et partenaires",
          duration: " ongoing",
          level: " Tous niveaux",
          modules: 2,
          color: "#ec4899",
        },
        {
          id: "evenements",
          title: "Evenements networking",
          description: "Participez a nos rencontres regulieres",
          duration: "Mensuel",
          level: " Tous niveaux",
          modules: "Illimite",
          color: "#ec4899",
        },
        {
          id: "club-entrepreneurs",
          title: "Club des entrepreneurs",
          description: "Rejoignez un club d'entrepreneurs pres de chez vous",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: 1,
          color: "#ec4899",
        },
      ],
    },
    {
      id: "probleme",
      title: "Support",
      subtitle: "Resolvez vos difficultes",
      icon: "probleme",
      gradient: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
      options: [
        {
          id: "assistance-technique",
          title: "Assistance technique",
          description: "Obtenez de l'aide pour vos difficultes techniques",
          duration: "Sur demande",
          level: " Tous niveaux",
          modules: 1,
          color: "#6b7280",
        },
        {
          id: "assistance-juridique",
          title: "Assistance juridique et fiscale",
          description:
            "Obtenez des reponses a vos questions juridiques et fiscales",
          duration: "Sur demande",
          level: " Tous niveaux",
          modules: 1,
          color: "#6b7280",
        },
        {
          id: "mise-en-relation-apme",
          title: "Mise en relation APME",
          description: "Planifiez des rendez-vous avec des agents de l'APME",
          duration: "Sur rendez-vous",
          level: " Tous niveaux",
          modules: 1,
          color: "#6b7280",
        },
      ],
    },
    {
      id: "outils",
      title: "Outils",
      subtitle: "Boites a outils et conseils pratiques",
      icon: "tools",
      gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      options: [
        {
          id: "modeles-documents",
          title: "Modeles de documents",
          description: "Accedez a nos modeles de documents prets a l'emploi",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 20",
          color: "#6366f1",
        },
        {
          id: "calculateurs",
          title: "Calculateurs en ligne",
          description: "Outils pour calculer vos couts et rentabilite",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: 5,
          color: "#6366f1",
        },
        {
          id: "guides-pratiques",
          title: "Guides pratiques",
          description: "Teleschargez nos guides gratuits",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 10",
          color: "#6366f1",
        },
        {
          id: "checklists",
          title: "Checklists",
          description: "Listes de verification pour vos demarches",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 15",
          color: "#6366f1",
        },
      ],
    },
    {
      id: "information",
      title: "Informations",
      subtitle: "Textes de loi, decrets et regulations",
      icon: "information",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      options: [
        {
          id: "textes-loi",
          title: "Textes de loi",
          description: "Accedez aux textes legislatifs sur l'entrepreneuriat",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 50",
          color: "#3b82f6",
        },
        {
          id: "decrets",
          title: "Decrets et arretes",
          description: "Parcourez les decrets d'application",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 30",
          color: "#3b82f6",
        },
        {
          id: "reglementations",
          title: "Reglementations",
          description: "Comprenez le cadre reglementaire",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 20",
          color: "#3b82f6",
        },
        {
          id: "formulaires",
          title: "Formulaires administratifs",
          description: "Telechargez les formulaires officiels",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 25",
          color: "#3b82f6",
        },
      ],
    },
    {
      id: "partenaires",
      title: "Partenaires",
      subtitle: "Annuaire des professionnels et partenaires",
      icon: "partners",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      options: [
        {
          id: "experts-juridiques",
          title: "Experts juridiques",
          description: "Trouvez un cabinet d'avocats ou un expert-comptable",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 50",
          color: "#10b981",
        },
        {
          id: "consultants",
          title: "Consultants et conseils",
          description: "Accedez a notre reseau de consultants",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 100",
          color: "#10b981",
        },
        {
          id: "incubateurs",
          title: "Incubateurs et accelerateurs",
          description: "Rejoignez un programme d'incubation",
          duration: "Sur dossier",
          level: " Intermediaire",
          modules: "Plus de 10",
          color: "#10b981",
        },
        {
          id: "organismes-appui",
          title: "Organismes d'appui",
          description: "Connectez-vous avec les structures d'accompagnement",
          duration: "Permanent",
          level: " Tous niveaux",
          modules: "Plus de 30",
          color: "#10b981",
        },
      ],
    },
  ];

  // Get selected category details
  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(searchLower) ||
      category.subtitle.toLowerCase().includes(searchLower) ||
      category.options.some(
        (option) =>
          option.title.toLowerCase().includes(searchLower) ||
          option.description.toLowerCase().includes(searchLower),
      )
    );
  });

  return (
    <>
      <Helmet>
        <title>Parcours Entrepreneur - STARTERKITCM</title>
        <meta
          name="description"
          content="Choisissez le parcours entrepreneurial adapte a vos besoins au Cameroun"
        />
      </Helmet>

      <div
        style={{
          padding: "50px 24px 60px",
          background: "#f8fafc",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Header */}

        {/* Search Bar */}
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto 40px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "white",
              borderRadius: "16px",
              padding: "4px",
              boxShadow: "0 4px 20px rgba(99, 91, 255, 0.12)",
              border: "2px solid rgba(99, 91, 255, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                color: "#635bff",
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
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher un parcours, une formation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "14px 0",
                fontSize: "15px",
                color: "#1a1a2e",
                background: "transparent",
                fontFamily: "'Inter', sans-serif",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  padding: "12px 16px",
                  background: "rgba(99, 91, 255, 0.1)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#635bff",
                  cursor: "pointer",
                  marginRight: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(99, 91, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "rgba(99, 91, 255, 0.1)")
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Grid */}
        {!selectedCategory && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  transition: "all 0.3s ease",
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(99, 91, 255, 0.15)",
                }}
              >
                {/* Icon Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: category.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {Icons[category.icon]}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        marginBottom: "4px",
                      }}
                    >
                      {category.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      {category.options.length} parcours disponible
                      {category.options.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    color: "#6b7280",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  {category.subtitle}
                </p>

                {/* Quick stats */}

                {/* Arrow indicator */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "28px",
                    right: "28px",
                    color: "#635bff",
                    opacity: 0,
                    transform: "translateX(-10px)",
                    transition: "all 0.3s ease",
                  }}
                  className="arrow-icon"
                >
                  {Icons.arrow}
                </div>
              </motion.div>
            ))}
            {searchQuery && filteredCategories.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#6b7280",
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{
                    margin: "0 auto 16px",
                    color: "#9ca3af",
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    marginBottom: "8px",
                  }}
                >
                  Aucun résultat trouvé
                </p>
                <p style={{ fontSize: "14px" }}>
                  Essayez avec d'autres mots-clés
                </p>
              </div>
            )}
          </div>
        )}

        {/* Detail View */}
        {selectedCategory && currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "none",
                color: "#635bff",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "32px",
                padding: "8px 0",
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
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux categories
            </button>

            {/* Category Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "48px",
                maxWidth: "800px",
                margin: "0 auto 48px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  background: currentCategory.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {Icons[currentCategory.icon]}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "#1a1a2e",
                    marginBottom: "8px",
                  }}
                >
                  {currentCategory.title}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {currentCategory.subtitle}
                </p>
              </div>
            </div>

            {/* Options List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {currentCategory.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "32px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                  }}
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(99, 91, 255, 0.12)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "24px",
                    }}
                  >
                    {/* Left: Icon */}
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "16px",
                        background: `${option.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: option.color,
                        flexShrink: 0,
                      }}
                    >
                      {Icons[currentCategory.icon]}
                    </div>

                    {/* Right: Content */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "12px",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "22px",
                            fontWeight: 700,
                            color: "#1a1a2e",
                            margin: 0,
                          }}
                        >
                          {option.title}
                        </h3>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 12px",
                            background: `${option.color}15`,
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: option.color,
                          }}
                        >
                          {Icons.check}
                          {option.level}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: "15px",
                          color: "#6b7280",
                          lineHeight: 1.7,
                          marginBottom: "20px",
                        }}
                      >
                        {option.description}
                      </p>

                      {/* Meta info */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "24px",
                          paddingTop: "20px",
                          borderTop: "1px solid #f1f5f9",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "14px",
                            color: "#6b7280",
                          }}
                        >
                          {Icons.clock}
                          {option.duration}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "14px",
                            color: "#6b7280",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                          {option.modules} modules
                        </span>
                      </div>

                      {/* CTA */}
                      <div style={{ marginTop: "24px" }}>
                        <Link to="/signup?redirect=/parcours">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "14px 28px",
                              background:
                                "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                              color: "white",
                              border: "none",
                              borderRadius: "12px",
                              fontSize: "15px",
                              fontWeight: 600,
                              cursor: "pointer",
                              boxShadow: "0 10px 30px rgba(99, 91, 255, 0.3)",
                            }}
                          >
                            Commencer ce parcours
                            {Icons.arrow}
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer CTA */}
        {!selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              textAlign: "center",
              marginTop: "60px",
              padding: "40px",
              background: "white",
              borderRadius: "24px",
              maxWidth: "700px",
              margin: "60px auto 0",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: "12px",
              }}
            >
              Vous ne savez pas par ou commencer ?
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Utilisez notre assistant intelligent pour obtenir une
              recommandation person
            </p>
            <Link to="/assistant">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "white",
                  color: "#635bff",
                  border: "2px solid #635bff",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: 600,
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
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Decouvrir mon parcours ideal
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Parcours;
