// src/services/ai/mock/fixtures/maturityRadar.fixture.js
export const maturityRadarFixture = {
  scoreGlobal: 76,
  axes: {
    gouvernance: 14,
    qualite: 12,
    conformiteLegale: 10,
    capaciteFinanciere: 15,
    capaciteTechnique: 16,
    rseHqse: 9,
  },
  ecarts: [
    {
      axe: 'conformiteLegale',
      constat: "Absence de mise à jour de l'attestation de conformité HSQE depuis plus de 12 mois.",
      recommandation: "Renouveler l'attestation HSQE avant soumission à un appel d'offres du secteur industriel.",
      referenceNormative: 'Loi n°2025/010 du 15 juillet 2025 — Article 12 (Local Content)',
    },
    {
      axe: 'qualite',
      constat: "Le score de 12/20 traduit une absence de protocoles d'assurance qualité formalisés selon les standards ONUDI.",
      recommandation: "Initier une cartographie des processus et se préparer aux exigences ISO 9001 via la BSTP Academy.",
      referenceNormative: null,
    },
    {
      axe: 'rseHqse',
      constat: "Le niveau de gestion HSE reste inférieur à la moyenne industrielle d'Afrique Centrale (seuil 12/20).",
      recommandation: "Rédiger un Plan de Gestion HSE complet et se conformer aux obligations de rétention locale.",
      referenceNormative: 'Loi n°2025/010 — Article 18 (Obligations HSE Sous-traitants)',
    },
  ],
};
