// src/data/agent-tasks.mock.js
export const auditQueue = [
  {
    id: "PME-2024-0042",
    nom: "BATIM SARL",
    secteur: "BTP",
    region: "Littoral",
    dateDepot: "2026-06-28",
    joursAttente: 4,
    urgent: false,
    documents: [
      { type: "RCCM", label: "Registre de Commerce", statut: "en_attente", extraction: null },
      { type: "NIU", label: "Numéro Identifiant Unique", statut: "valide", extraction: { numero: "P012345678F", dateEmission: "2023-01-15" } },
      { type: "CNPS", label: "Attestation CNPS", statut: "rejete", motifRejet: "Document expiré - Date de validité dépassée", extraction: null },
      { type: "FISCAL", label: "Attestation Fiscale", statut: "en_attente", extraction: null },
    ],
  },
  {
    id: "PME-2024-0051",
    nom: "TECHBUILD GROUP",
    secteur: "Informatique",
    region: "Centre",
    dateDepot: "2026-06-20",
    joursAttente: 12,
    urgent: true,
    documents: [
      { type: "RCCM", label: "Registre de Commerce", statut: "valide", extraction: { numero: "RC/DLA/2019/B/1234", dateEmission: "2019-03-22" } },
      { type: "NIU", label: "Numéro Identifiant Unique", statut: "valide", extraction: { numero: "M098765432A", dateEmission: "2022-08-01" } },
      { type: "CNPS", label: "Attestation CNPS", statut: "en_attente", extraction: null },
      { type: "FISCAL", label: "Attestation Fiscale", statut: "en_attente", extraction: null },
    ],
  },
  {
    id: "PME-2024-0063",
    nom: "AGRITECH CAMEROUN",
    secteur: "Agro-industrie",
    region: "Ouest",
    dateDepot: "2026-07-01",
    joursAttente: 1,
    urgent: false,
    documents: [
      { type: "RCCM", label: "Registre de Commerce", statut: "en_attente", extraction: null },
      { type: "NIU", label: "Numéro Identifiant Unique", statut: "en_attente", extraction: null },
      { type: "CNPS", label: "Attestation CNPS", statut: "en_attente", extraction: null },
      { type: "FISCAL", label: "Attestation Fiscale", statut: "en_attente", extraction: null },
    ],
  },
  {
    id: "PME-2024-0071",
    nom: "LOGISTIQUE PLUS",
    secteur: "Transport",
    region: "Littoral",
    dateDepot: "2026-06-15",
    joursAttente: 17,
    urgent: true,
    documents: [
      { type: "RCCM", label: "Registre de Commerce", statut: "valide", extraction: { numero: "RC/DLA/2020/B/5678", dateEmission: "2020-05-10" } },
      { type: "NIU", label: "Numéro Identifiant Unique", statut: "valide", extraction: { numero: "P087654321B", dateEmission: "2023-04-20" } },
      { type: "CNPS", label: "Attestation CNPS", statut: "valide", extraction: { reference: "CNPS/2026/00123", validite: "2026-12-31" } },
      { type: "FISCAL", label: "Attestation Fiscale", statut: "en_attente", extraction: null },
    ],
  },
];

export const planningTerrain = [
  { id: "T-001", pme: "BATIM SARL", region: "Littoral", adresse: "Zone Industrielle Bassa, Douala", dateVisite: "2026-07-08", heure: "09:00", agent: "Mme FOUDA Marie", statut: "confirme" },
  { id: "T-002", pme: "AGRITECH CAMEROUN", region: "Ouest", adresse: "Km 4 Route Mbouda, Bafoussam", dateVisite: "2026-07-10", heure: "10:30", agent: "M. NGUEMA Paul", statut: "en_attente" },
  { id: "T-003", pme: "SARL CONFORTI", region: "Centre", adresse: "Avenue Kennedy, Yaoundé", dateVisite: "2026-07-12", heure: "14:00", agent: "M. BELLO Ibrahim", statut: "confirme" },
];

export const mediationDossiers = [
  { id: "C-2024-087", pme: "BATIM SARL", do: "SCDP", budgetFcfa: 75000000, jalonsBloque: "Livraison 50%", joursStagnation: 22, historique: ["Signature: 15/03/2026", "Démarrage: 20/03/2026", "BLOQUÉ depuis: 11/04/2026"], motifDeclare: "Retard livraison matériaux" },
  { id: "C-2024-091", pme: "TECHBUILD GROUP", do: "ENEO", budgetFcfa: 42000000, jalonsBloque: "Recette Technique", joursStagnation: 18, historique: ["Signature: 05/04/2026", "Démarrage: 12/04/2026", "Livr. 50%: 02/05/2026", "BLOQUÉ depuis: 14/06/2026"], motifDeclare: "Désaccord sur les livrables techniques" },
  { id: "C-2024-104", pme: "AGRITECH CM", do: "SOSUCAM", budgetFcfa: 18500000, jalonsBloque: "Démarrage", joursStagnation: 31, historique: ["Signature: 01/06/2026", "BLOQUÉ depuis: 01/06/2026"], motifDeclare: "Avance de démarrage non versée par le DO" },
];
