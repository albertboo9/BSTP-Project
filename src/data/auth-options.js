// Données pour les formulaires d'authentification

// Import des icônes Lucide (utilisées dans les composants)
// Les icônes sont passées comme composants aux formulaires

// Villes du Cameroun
export const camerounCities = [
  { value: "douala", label: "Douala" },
  { value: "yaounde", label: "Yaoundé" },
  { value: "bafoussam", label: "Bafoussam" },
  { value: "garoua", label: "Garoua" },
  { value: "kumba", label: "Kumba" },
  { value: "limbe", label: "Limbé" },
  { value: "edea", label: "Edéa" },
  { value: "kousséri", label: "Kousséri" },
  { value: "foumbot", label: "Foumbot" },
  { value: "maroua", label: "Maroua" },
  { value: "ngaoundere", label: "Ngaoundéré" },
  { value: "bertoua", label: "Bertoua" },
  { value: "lomie", label: "Lomié" },
  { value: "doume", label: "Doumé" },
  { value: "sangmélima", label: "Sangmélima" },
  { value: "yok", label: "Yok" },
  { value: "obala", label: "Obala" },
  { value: "akono", label: "Akono" },
  { value: "mbalmayo", label: "Mbalmayo" },
  { value: "eseka", label: "Ebolowa" },
  { value: "autre", label: "Autre ville" },
];

// Secteurs d'activité
export const activitySectors = [
  { value: "agriculture", label: "Agriculture / Agroalimentaire", iconKey: "wheat" },
  { value: "commerce", label: "Commerce / Négoce", iconKey: "shopping-cart" },
  { value: "services", label: "Services aux entreprises", iconKey: "briefcase" },
  { value: "tech", label: "Technologie / IT", iconKey: "laptop" },
  { value: "artisanat", label: "Artisanat", iconKey: "tool" },
  { value: "transport", label: "Transport / Logistique", iconKey: "truck" },
  { value: "education", label: "Éducation / Formation", iconKey: "book-open" },
  { value: "sante", label: "Santé / Bien-être", iconKey: "heart-pulse" },
  { value: "tourisme", label: "Tourisme / Hôtellerie", iconKey: "hotel" },
  { value: "immobilier", label: "Immobilier", iconKey: "home" },
  { value: "mode", label: "Mode / Textile", iconKey: "shirt" },
  { value: "beaute", label: "Beauté / Cosmétiques", iconKey: "sparkles" },
  { value: "alimentaire", label: "Alimentation / Restaurant", iconKey: "utensils" },
  { value: "art", label: "Art / Culture", iconKey: "palette" },
  { value: "finance", label: "Services financiers", iconKey: "landmark" },
  { value: "energie", label: "Énergie / Environnement", iconKey: "zap" },
  { value: "construction", label: "Bâtiment / Construction", iconKey: "hammer" },
  { value: "autre", label: "Autre", iconKey: "star" },
];

// Durée d'existence
export const businessDuration = [
  { value: "idee", label: "Idée (pas encore lancé)", iconKey: "lightbulb" },
  { value: "moins_6_mois", label: "Moins de 6 mois", iconKey: "sprout" },
  { value: "6_mois_2_ans", label: "6 mois - 2 ans", iconKey: "growth" },
  { value: "plus_2_ans", label: "Plus de 2 ans", iconKey: "tree" },
];

// Types d'organisation partenaire
export const partnerTypes = [
  { value: "gouvernement", label: "Gouvernement / Ministère", iconKey: "building-2" },
  { value: "ong", label: "Organisation internationale", iconKey: "globe" },
  { value: "chambre", label: "Chambre professionnelle", iconKey: "building" },
  { value: "banque", label: "Banque / Institution financière", iconKey: "landmark" },
  { value: "incubateur", label: "Incubateur / Accélérateur", iconKey: "rocket" },
  { value: "association", label: "Association / NGO", iconKey: "users" },
  { value: "entreprise", label: "Grande entreprise / Corporate", iconKey: "store" },
  { value: "autre", label: "Autre", iconKey: "star" },
];

// Domaines d'intervention partenaire
export const partnerDomains = [
  { value: "formation", label: "Formation professionnelle" },
  { value: "financement", label: "Financement / Subventions" },
  { value: "mentorat", label: "Mentorat / Accompagnement" },
  { value: "infrastructure", label: "Infrastructure / Équipements" },
  { value: "export", label: "Export / Internationalisation" },
  { value: "innovation", label: "Innovation / Technologie" },
  { value: "reseau", label: "Mise en réseau" },
  { value: "marketing", label: "Marketing / Visibilité" },
  { value: "juridique", label: "Support juridique" },
  { value: "fiscal", label: "Support fiscal" },
];

// Besoins entrepreneur (avec icônes Lucide)
export const entrepreneurNeeds = [
  { value: "formation", label: "Formations", iconKey: "graduation-cap" },
  { value: "financement", label: "Financement", iconKey: "banknote" },
  { value: "mentorat", label: "Mentorat", iconKey: "user-check" },
  { value: "reseau", label: "Réseau / Contacts", iconKey: "user-plus" },
  { value: "informations", label: "Informations légales", iconKey: "file-text" },
  { value: "marketing", label: "Marketing / Clients", iconKey: "trending-up" },
  { value: "local", label: "Locaux / Espace de travail", iconKey: "home" },
  { value: "equipe", label: "Recrutement / Équipe", iconKey: "users" },
];

// Messages inspirants
export const inspiringMessages = {
  login: {
    title: "Bon retour parmi nous",
    subtitle: "Votre prochaine grande aventure commence ici",
    quote: '"Chaque grand projet commence par un premier pas"',
    stats: [
      { value: "+500", label: "Entrepreneurs", iconKey: "users" },
      { value: "+50", label: "Partenaires", iconKey: "users" },
      { value: "+1000", label: "Projets", iconKey: "rocket" },
    ],
  },
  signup: {
    title: "Créez votre compte",
    subtitle: "Rejoignez l'écosystème entrepreneurial le plus dynamique du Cameroun",
    benefits: [
      { iconKey: "book-open", label: "Formations gratuites" },
      { iconKey: "user-check", label: "Mentors expérimentés" },
      { iconKey: "banknote", label: "Opportunités de financement" },
      { iconKey: "users", label: "Communauté active" },
    ],
  },
  signupPartner: {
    title: "Rejoignez nos partenaires",
    subtitle: "Ensemble, accélérons l'entrepreneuriat camerounais",
    benefits: [
      { iconKey: "globe", label: "Visibilité nationale" },
      { iconKey: "users", label: "Réseau d'entrepreneurs" },
      { iconKey: "lightbulb", label: "Impact mesurable" },
    ],
  },
};

// Design tokens
export const authStyles = {
  inputHeight: "56px",
  inputRadius: "12px",
  btnHeight: "52px",
  btnRadius: "12px",
  primaryColor: "#635bff",
  secondaryColor: "#7c3aed",
  successColor: "#10B981",
  warningColor: "#F59E0B",
  errorColor: "#EF4444",
};

// Images disponibles dans public/
export const availableImages = {
  hero: "/hero.jpg",
  entrepreneur: "/img/woman_working_illustration.jpg",
  team: "/img/team_work_illustration.jpg",
  business: "/img/grow_illustration.jpg",
  partners: "/img/plan_analize_illustration.jpg",
  training: "/training.jpg",
};
