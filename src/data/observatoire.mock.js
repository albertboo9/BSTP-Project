// src/data/observatoire.mock.js
// Agrégats nationaux pré-calculés pour le Cockpit DG
export const observatoireData = {
  kpis: {
    totalPme: 1247,
    totalPmePrev: 1112,
    maturitemoyenne: 67.4,
    maturitemoyennePrev: 61.2,
    volumeFcfaMds: 48.7,
    volumeFcfaMdsPrev: 39.1,
    tauxConversion: 34,
    tauxConversionPrev: 28,
  },

  // Sparklines (12 derniers mois, valeur relative)
  sparklines: {
    totalPme: [820, 870, 910, 950, 980, 1020, 1060, 1100, 1150, 1180, 1210, 1247],
    maturitemoyenne: [55, 57, 59, 60, 61, 62, 63, 64, 65, 66, 67, 67.4],
    volumeFcfa: [28, 30, 32, 33, 35, 37, 39, 41, 43, 45, 47, 48.7],
    tauxConversion: [20, 21, 23, 24, 25, 27, 28, 29, 30, 31, 33, 34],
  },

  // Pipeline Statutaire (funnel PME)
  pipeline: [
    { label: "Profilées", count: 1247, percent: 100, color: "#e0e1ff" },
    { label: "Vérifiées Terrain", count: 684, percent: 55, color: "#635bff" },
    { label: "Éligibles AO", count: 312, percent: 25, color: "#0A1128" },
  ],

  // Capital Humain
  capitalHumain: {
    heuresCumulees: 18420,
    certificationsByModule: [
      { module: "ISO 9001", count: 87 },
      { module: "HSQE", count: 142 },
      { module: "RSE", count: 63 },
      { module: "Réponse AO", count: 211 },
    ],
  },

  // Analyse sectorielle (BarChart)
  secteurs: [
    { name: "BTP", value: 380, fill: "#635bff" },
    { name: "Mines", value: 220, fill: "#0ea5e9" },
    { name: "Hydrocarbures", value: 195, fill: "#f59e0b" },
    { name: "Agro-industrie", value: 160, fill: "#22c55e" },
    { name: "Énergie", value: 142, fill: "#8b5cf6" },
    { name: "Télécoms", value: 150, fill: "#ef4444" },
  ],

  // Analyse institutionnelle (donneurs d'ordre partenaires)
  donneurs: [
    { name: "SCDP", volume: 12.4, marches: 38, logo: "SCDP" },
    { name: "SOSUCAM", volume: 9.8, marches: 27, logo: "SOSU" },
    { name: "SONARA", volume: 8.2, marches: 21, logo: "SONA" },
    { name: "ENEO", volume: 7.1, marches: 19, logo: "ENEO" },
    { name: "CAMTEL", volume: 5.6, marches: 14, logo: "CAMT" },
    { name: "CDC", volume: 5.6, marches: 12, logo: "CDC" },
  ],

  // Répartition territoriale (régions Cameroun)
  regions: [
    { name: "Littoral", pme: 412, volume: 18.2 },
    { name: "Centre", pme: 287, volume: 11.4 },
    { name: "Ouest", pme: 180, volume: 6.8 },
    { name: "Sud-Ouest", pme: 110, volume: 4.2 },
    { name: "Nord-Ouest", pme: 98, volume: 3.1 },
    { name: "Adamaoua", pme: 65, volume: 2.4 },
    { name: "Nord", pme: 48, volume: 1.5 },
    { name: "Extrême-Nord", pme: 35, volume: 0.8 },
    { name: "Est", pme: 30, volume: 0.9 },
    { name: "Sud", pme: 17, volume: 0.2 },
  ],

  // Vigilance opérationnelle
  vigilance: {
    drapeauxRouges: 23,
    drapeauxTotal: 312,
    pourcentage: 7.4,
    contratsCritiques: [
      { id: "C-2024-087", pme: "BATIM SARL", do: "SCDP", joursStagnation: 22, jalonsBloque: "Livraison 50%" },
      { id: "C-2024-091", pme: "TECHBUILD", do: "ENEO", joursStagnation: 18, jalonsBloque: "Recette Technique" },
      { id: "C-2024-104", pme: "AGRITECH CM", do: "SOSUCAM", joursStagnation: 31, jalonsBloque: "Démarrage" },
    ],
  },
};
