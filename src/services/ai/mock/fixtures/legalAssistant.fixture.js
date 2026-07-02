// src/services/ai/mock/fixtures/legalAssistant.fixture.js
export const legalAssistantFixture = {
  syntheseGlobale: "Ce projet d'accord comporte deux clauses léonines mettant gravement en péril la sécurité financière de la PME locale. Une révision s'impose avant signature.",
  clausesRisque: [
    {
      extraitCourt: "résilier le présent contrat à tout moment, avec effet immédiat et sans indemnité",
      niveauRisque: 'eleve',
      explication: "Cette clause de rupture unilatérale immédiate prive la PME de tout préavis raisonnable et viole l'équilibre contractuel fondamental du droit OHADA.",
      articleReference: 'Acte Uniforme OHADA relatif au droit commercial général, Art. 134',
    },
    {
      extraitCourt: "pénalités de retard de 5% du montant global par jour",
      niveauRisque: 'eleve',
      explication: "Le taux de 5%/jour est disproportionné par rapport aux usages commerciaux camerounais (usage : 0,1% à 0,5%/jour maximum) et peut conduire à une asphyxie financière rapide.",
      articleReference: null,
    },
    {
      extraitCourt: "propriété exclusive de tous livrables et innovations",
      niveauRisque: 'moyen',
      explication: "La cession automatique de la propriété intellectuelle sans contrepartie financière est abusive et doit être négociée clause par clause.",
      articleReference: 'Accord de Bangui révisé — Annexe VII (Propriété Industrielle OAPI)',
    },
  ],
};
