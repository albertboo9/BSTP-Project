// src/services/ai/mock/fixtures/smartMatchmaking.fixture.js
export const matchmakingFixture = {
  opportunityId: 'AO-2026-001',
  classement: [
    {
      pmeId: 'pme-005',
      scorePertinence: 94,
      justification: "Secteur BTP et localisation Littoral parfaitement alignés, conformité ISO 9001 et HSQE déjà validée, historique de 22 marchés réussis.",
    },
    {
      pmeId: 'pme-001',
      scorePertinence: 82,
      justification: "Bonne correspondance sectorielle BTP, localisation Douala idéale, mais l'indice Argent (vs Or) minore légèrement le score global.",
    },
    {
      pmeId: 'pme-004',
      scorePertinence: 68,
      justification: "Secteur Transport compatible avec les travaux logistiques du chantier, mais absence de certification ISO 9001 demandée.",
    },
  ],
};
