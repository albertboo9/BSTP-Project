# BSTP NEXUS 2026 — Contrat d'Intégration IA (v2)
### Front-End (React/Vite) ↔ Backend IA (Hugging Face / Groq)

**À qui s'adresse ce document :**
- **Toi (Front-End)** : il te dit exactement quels fichiers créer dans ton dossier `services/ai/`,
  et contre quels schémas ils doivent coder — que le vrai backend existe ou pas encore (Mode Mock).
- **Ta collègue (Backend IA / Hugging Face)** : il lui dit exactement quel endpoint exposer pour
  chaque fonctionnalité, avec quel modèle, quel format d'entrée/sortie, et quel prompt système utiliser
  comme point de départ.

Personne ne doit avoir à deviner quoi que ce soit en lisant ce fichier. Si un point n'est pas clair
après lecture, il doit être discuté et ce document doit être corrigé — pas contourné en silence.

---

## PARTIE A — VUE D'ENSEMBLE

### A.1 — Les 6 fonctionnalités IA du projet

| # | Fonctionnalité | Modèle recommandé | Type d'interaction | Écran(s) concerné(s) |
|---|---|---|---|---|
| 1 | **Smart Matchmaking** — scorer les PME face à un AO/DP | Qwen | Appel unique, réponse structurée JSON | Dashboard Donneur d'Ordre, notification PME |
| 2 | **Radar de Maturité (Benchmarking RAG)** — scorer une PME vs normes ONUDI/OHADA/Loi 2025 | Kimi | Appel unique, réponse structurée JSON | Espace PME, fiche PME vue par Agent |
| 3 | **Assistant Juridique** — scanner un contrat, détecter les clauses à risque | Llama | Appel unique (texte long) | Module juridique dans Espace PME |
| 4 | **Chatbot Général BSTP** — assistant conversationnel multi-tours | Llama | Conversation multi-tours (historique) | Widget flottant, présent sur toute l'app |
| 5 | **OCR Documentaire** — extraire les champs des pièces justificatives | Llama Scout OCR | Appel unique (image/PDF → JSON) | Onboarding PME, validation Agent BSTP |
| 6 | **Transcription Vocale** — audio → texte | Whisper | Appel unique (audio → texte) | Compte-rendu Descente Terrain (Agent), saisie vocale Chatbot |

### A.2 — Pourquoi ce modèle pour cette tâche ? (à valider avec ta collègue, elle connaît mieux les limites réelles de chaque modèle sur Groq)

- **Qwen** → bon en sortie JSON strictement structurée et en raisonnement de scoring/classement.
  On l'utilise là où la réponse DOIT être un objet de données exploitable directement par l'UI
  (tableaux, classements), sans texte libre parasite.
- **Kimi** → réputé pour gérer de très longs contextes (utile pour comparer les données d'une PME
  à un corpus de normes/lois volumineux sans tout perdre en route). On l'utilise pour le Radar de
  Maturité, qui doit croiser beaucoup d'information de référence.
- **Llama** → bon généraliste conversationnel, plus naturel en dialogue multi-tours et en explication
  en langage clair. On l'utilise pour tout ce qui ressemble à une conversation avec un humain :
  Assistant Juridique (explique un risque en français simple) et Chatbot Général.
- **Llama Scout OCR** → variante spécialisée vision/document, dédiée à l'extraction de champs depuis
  une image ou un PDF scanné.
- **Whisper** → modèle de référence pour la transcription audio→texte.

**Important :** ce mapping est une proposition de départ, pas une loi gravée. Si ta collègue constate
que Kimi n'est pas dispo sur l'infra Groq utilisée, ou que Llama est plus performant pour le
Matchmaking, on ajuste — **le Front s'en fiche complètement**, tant que le contrat JSON (partie B) est
respecté. C'est exactement le but de séparer "quel modèle" de "quel contrat".

### A.3 — Le Chatbot Général mérite un traitement à part

Tu as raison de le souligner : le chatbot n'est pas un détail, c'est un gros morceau parce que :
- Il doit garder un historique de conversation (contexte multi-tours), contrairement aux 5 autres
  fonctionnalités qui sont des appels ponctuels "one-shot".
- Il doit potentiellement **router** vers une fonctionnalité spécialisée (ex : l'utilisateur demande
  "peux-tu analyser mon contrat" dans le chat → soit le chatbot répond directement, soit il redirige
  vers le module Assistant Juridique dédié — **à trancher ensemble**, voir section B.4).
- Il peut recevoir de l'audio en entrée (bouton micro → Whisper → texte → Chatbot).

Voir section B.4 pour le contrat complet dédié.

---

## PARTIE B — STRUCTURE DU DOSSIER FRONT-END (`src/services/ai/`)

Voici l'arborescence que je te recommande de créer. Chaque fichier a un rôle unique et ne doit pas
déborder sur celui du voisin — c'est ce qui permet de basculer Real/Mock sans toucher aux composants.

```
src/
└── services/
    └── ai/
        ├── config.ts                  // Variables d'environnement : AI_MODE, URLs, timeouts
        ├── types.ts                   // Types TypeScript partagés (enveloppe, erreurs, features)
        ├── aiGateway.ts               // Point d'entrée UNIQUE utilisé par les composants React
        ├── aiClient.ts                // Client HTTP générique (fetch/axios) vers les endpoints HF
        ├── errors.ts                  // Classe AIError + mapping code erreur → message UI
        │
        ├── features/                  // Un fichier par fonctionnalité IA, même logique partout
        │   ├── smartMatchmaking.service.ts
        │   ├── maturityRadar.service.ts
        │   ├── legalAssistant.service.ts
        │   ├── chatbot.service.ts
        │   ├── docOcr.service.ts
        │   └── audioTranscription.service.ts
        │
        └── mock/
            ├── mockAdapter.ts         // Simule latence réseau + taux d'erreur configurable
            └── fixtures/               // Données mockées, une par feature
                ├── smartMatchmaking.fixtures.ts
                ├── maturityRadar.fixtures.ts
                ├── legalAssistant.fixtures.ts
                ├── chatbot.fixtures.ts
                ├── docOcr.fixtures.ts
                └── audioTranscription.fixtures.ts

src/
└── hooks/
    ├── useAIFeature.ts                // Hook générique : loading / data / error pour appels one-shot
    └── useChatbot.ts                  // Hook dédié : gère l'historique de conversation + streaming UI
```

### Rôle exact de chaque fichier clé

**`config.ts`** — la seule source de vérité pour savoir si on est en Real ou Mock :
```ts
export const AI_CONFIG = {
  mode: import.meta.env.VITE_AI_MODE as 'real' | 'mock', // basculé via .env, JAMAIS en dur dans le code
  baseUrl: import.meta.env.VITE_AI_GATEWAY_URL,
  timeoutMs: 8000,          // au-delà, on considère l'appel en échec → fallback (voir C.4)
  maxRetries: 1,
};
```

**`types.ts`** — l'enveloppe universelle utilisée par TOUTES les features (détail complet en Partie C) :
```ts
export type AIFeature =
  | 'smart_matchmaking'
  | 'maturity_radar'
  | 'legal_assistant'
  | 'chatbot'
  | 'doc_ocr'
  | 'audio_transcription';

export interface AIRequest<TPayload> {
  requestId: string;
  feature: AIFeature;
  locale: 'fr';
  payload: TPayload;
}

export interface AIResponse<TData> {
  requestId: string;
  success: boolean;
  modelUsed: 'qwen' | 'kimi' | 'llama' | 'whisper' | 'llama-scout-ocr';
  latencyMs: number;
  data: TData | null;
  error: AIErrorPayload | null;
}

export interface AIErrorPayload {
  code: AIErrorCode;
  message: string;
}

export type AIErrorCode =
  | 'TIMEOUT'
  | 'MODEL_UNAVAILABLE'
  | 'INVALID_INPUT'
  | 'RATE_LIMIT'
  | 'FILE_TOO_LARGE'
  | 'UNSUPPORTED_FORMAT'
  | 'INTERNAL_ERROR';
```

**`aiGateway.ts`** — c'est LE SEUL fichier que les composants React (ou les hooks) doivent importer.
Il ne fait qu'une chose : lire `AI_CONFIG.mode` et rediriger vers `aiClient` (real) ou `mockAdapter`
(mock). Ni plus, ni moins.
```ts
export async function callAI<TPayload, TData>(
  feature: AIFeature,
  payload: TPayload
): Promise<AIResponse<TData>> {
  if (AI_CONFIG.mode === 'mock') {
    return mockAdapter.call<TPayload, TData>(feature, payload);
  }
  return aiClient.call<TPayload, TData>(feature, payload);
}
```
→ **Aucun composant React n'appelle jamais `aiClient` ou `mockAdapter` directement.** Toujours en
passant par `aiGateway.callAI(...)`. C'est cette règle unique qui garantit que "les composants React
ne connaissent jamais la différence" comme demandé dans le cadrage initial.

**Chaque fichier de `features/`** est un mince wrapper au-dessus de `aiGateway`, qui type correctement
l'entrée/sortie pour cette feature précise. Exemple pour `maturityRadar.service.ts` :
```ts
export function getMaturityRadar(payload: MaturityRadarRequest) {
  return callAI<MaturityRadarRequest, MaturityRadarResponse>('maturity_radar', payload);
}
```

**`mockAdapter.ts`** doit simuler un comportement réaliste, pas juste renvoyer un JSON figé :
- Latence aléatoire (ex. entre 400ms et 1500ms) pour que l'UI de chargement soit testée pour de vrai.
- Un taux d'échec configurable (ex. 5%) pour tester le fallback et les messages d'erreur en démo.
- Retourne les fixtures de `mock/fixtures/`, qui doivent respecter EXACTEMENT les mêmes types que
  les réponses réelles définies en Partie C — sinon le jour du branchement réel, des bugs silencieux
  apparaissent.

**`useAIFeature.ts`** — hook générique pour les appels "one-shot" (tout sauf le chatbot) :
```ts
const { data, isLoading, error, execute } = useAIFeature(getMaturityRadar);
```
Gère automatiquement les états loading/error/data pour n'importe quelle feature one-shot.

**`useChatbot.ts`** — hook dédié, car le chatbot a un besoin spécifique : conserver l'historique
des messages en mémoire (state React), gérer l'ajout incrémental de messages, et potentiellement
l'annulation d'une requête en cours (bouton "stop" pendant que l'IA répond).

---

## PARTIE C — CONTRATS DÉTAILLÉS PAR FONCTIONNALITÉ

Pour chaque fonctionnalité : rôle, séquence, requête, réponse, prompt système, cas limites.

---

### C.1 — Smart Matchmaking

**Rôle :** quand un Donneur d'Ordre publie un AO/DP, calculer un score de pertinence + une
justification courte pour chaque PME candidate présélectionnée par le géofencing (le géofencing
lui-même est une logique métier simple côté Front/Back classique, PAS de l'IA — l'IA n'intervient
qu'ensuite, pour affiner le classement).

**Séquence :**
```
Donneur d'Ordre publie AO
        ↓
Front pré-filtre les PME par région/secteur (logique classique, sans IA)
        ↓
Front envoie la liste pré-filtrée à l'IA Gateway → feature "smart_matchmaking"
        ↓
Backend (Qwen) calcule score + justification pour chaque PME
        ↓
Front affiche le classement trié par score décroissant
```

**Requête :**
```json
{
  "requestId": "b3e1...",
  "feature": "smart_matchmaking",
  "locale": "fr",
  "payload": {
    "opportunity": {
      "id": "AO-2026-0421",
      "titre": "Maintenance industrielle site portuaire",
      "secteur": "BTP",
      "region": "Littoral",
      "ville": "Douala",
      "montantEstimeFCFA": 75000000,
      "exigencesConformite": ["ISO_9001", "HSQE"]
    },
    "candidats": [
      {
        "pmeId": "PME-0192",
        "raisonSociale": "SIMTECH 3D",
        "region": "Littoral",
        "ville": "Douala",
        "secteurs": ["BTP", "Industrie"],
        "scoreMaturite": 78,
        "badges": ["ISO_9001", "Eligible_AO"],
        "indiceConfiance": "Argent"
      }
    ]
  }
}
```

**Réponse (`data`) :**
```json
{
  "opportunityId": "AO-2026-0421",
  "classement": [
    {
      "pmeId": "PME-0192",
      "scorePertinence": 91,
      "justification": "Secteur BTP et localisation Douala parfaitement alignés, conformité ISO 9001 déjà validée."
    }
  ]
}
```

**Prompt système (point de départ, à affiner avec ta collègue) :**
```
Tu es un moteur de scoring B2B pour la BSTP (Bourse de Sous-Traitance et de Partenariat, Cameroun).
Tu reçois un appel d'offres et une liste de PME candidates déjà présélectionnées par zone géographique.
Pour chaque PME, calcule un score de pertinence sur 100 en pondérant :
- correspondance sectorielle (poids fort)
- niveau de conformité et badges obtenus (poids moyen-fort)
- indice de confiance (Or > Argent > Bronze) (poids moyen)
Réponds STRICTEMENT en JSON valide selon le schéma fourni. Ajoute une justification d'une seule
phrase, en français simple, sans jargon technique, compréhensible par un chef d'entreprise non-expert.
Ne renvoie AUCUN texte en dehors du JSON.
```

**Cas limites à gérer côté backend :**
- Liste de candidats vide → renvoyer `data: { opportunityId, classement: [] }`, pas une erreur.
- Candidat avec des champs manquants (ex: pas de badges) → traiter comme absence, ne pas planter.

---

### C.2 — Radar de Maturité (Benchmarking RAG)

**Rôle :** à partir de l'auto-évaluation d'une PME (6 axes notés), produire un score par axe +
identifier les écarts par rapport aux normes ONUDI/OHADA et à la Loi n°2025/010 du 15 juillet 2025.

**Point à trancher avec ta collègue avant de coder :** quel corpus alimente le RAG exactement (texte
intégral de la loi ? fiches normatives ONUDI/OHADA résumées ?). Sans corpus fixé, les "écarts" générés
seront trop génériques pour être crédibles en démo.

**Séquence :**
```
PME renseigne/actualise son auto-évaluation (formulaire, 6 axes)
        ↓
Front envoie l'auto-évaluation → feature "maturity_radar"
        ↓
Backend (Kimi + RAG sur corpus normatif) calcule score global + score par axe + écarts identifiés
        ↓
Front redessine le <RadarChart /> et affiche la liste des écarts avec recommandations
```

**Requête :**
```json
{
  "requestId": "c7f2...",
  "feature": "maturity_radar",
  "locale": "fr",
  "payload": {
    "pmeId": "PME-0192",
    "autoEvaluation": {
      "gouvernance": 14,
      "qualite": 12,
      "conformiteLegale": 10,
      "capaciteFinanciere": 15,
      "capaciteTechnique": 16,
      "rseHqse": 9
    },
    "documentsDeja Fournis": ["RCCM", "NIU", "CNPS", "Attestation_Fiscale"]
  }
}
```

**Réponse (`data`) :**
```json
{
  "scoreGlobal": 78,
  "axes": {
    "gouvernance": 14,
    "qualite": 12,
    "conformiteLegale": 10,
    "capaciteFinanciere": 15,
    "capaciteTechnique": 16,
    "rseHqse": 9
  },
  "ecarts": [
    {
      "axe": "conformiteLegale",
      "constat": "Absence de mise à jour de l'attestation de conformité HSQE depuis plus de 12 mois.",
      "recommandation": "Renouveler l'attestation HSQE avant soumission à un AO du secteur industriel.",
      "referenceNormative": "Loi 2025/010, art. 12"
    }
  ]
}
```

**Prompt système (point de départ) :**
```
Tu es un moteur d'analyse de conformité pour la BSTP (Cameroun). Tu compares l'auto-évaluation
d'une PME (notée sur 6 axes, chacun sur 20) aux exigences de la Loi camerounaise n°2025/010 du
15 juillet 2025 sur la sous-traitance, ainsi qu'aux normes ONUDI et OHADA fournies en contexte.
Pour chaque axe où un écart significatif existe, produis : un constat factuel, une recommandation
actionnable en français simple, et une référence normative précise si disponible dans le corpus fourni.
N'invente JAMAIS de référence normative — si tu n'es pas sûr, indique "à vérifier avec un conseiller
BSTP" plutôt qu'une fausse citation. Réponds STRICTEMENT en JSON selon le schéma fourni.
```

**Cas limites :**
- Si le corpus RAG ne contient aucune référence pertinente pour un axe → `referenceNormative: null`,
  jamais de référence inventée (risque de crédibilité grave devant le DG si une fausse loi est citée).

---

### C.3 — Assistant Juridique (analyse de contrat, mode "dossier")

**Rôle :** l'utilisateur colle un contrat de sous-traitance complet dans un espace dédié (pas le
chatbot flottant, un module à part avec zone de texte large), l'IA scanne et surligne les clauses
à risque au regard du droit OHADA/Cameroun.

**Différence avec le Chatbot (C.4) :** ici c'est une analyse de document complet, en un seul appel,
avec une sortie structurée (liste de clauses annotées). Le Chatbot, lui, est conversationnel et
généraliste. Si l'utilisateur pose une question juridique rapide dans le Chatbot, voir routing en C.4.

**Requête :**
```json
{
  "requestId": "d4a9...",
  "feature": "legal_assistant",
  "locale": "fr",
  "payload": {
    "texteContrat": "string, potentiellement long — voir gestion du chunking ci-dessous"
  }
}
```

**Réponse (`data`) :**
```json
{
  "syntheseGlobale": "Contrat globalement équilibré, deux clauses nécessitent une vigilance particulière.",
  "clausesRisque": [
    {
      "extraitCourt": "résiliation immédiate sans préavis en cas de...",
      "niveauRisque": "eleve",
      "explication": "Cette clause permet au donneur d'ordre de résilier sans délai de préavis, ce qui expose la PME à une rupture brutale.",
      "articleReference": "Acte Uniforme OHADA relatif au droit commercial général, si applicable"
    }
  ]
}
```

**Gestion des contrats longs (chunking) — à trancher avec ta collègue :**
Si `texteContrat` dépasse la limite de tokens du modèle, deux options possibles :
1. Le Front découpe et envoie plusieurs requêtes (un `requestId` parent + plusieurs sous-appels).
2. Le Backend gère lui-même le découpage et renvoie une réponse consolidée unique.
→ **Recommandation : option 2**, plus simple pour le Front (un seul appel, une seule réponse), mais
à confirmer selon la capacité réelle du pipeline Groq/Llama côté backend.

**Prompt système (point de départ) :**
```
Tu es un assistant juridique spécialisé en droit OHADA et droit camerounais, au service des PME
sous-traitantes accompagnées par la BSTP. Tu analyses un contrat de sous-traitance et identifies
les clauses potentiellement défavorables ou abusives pour la PME (résiliation, pénalités,
responsabilité, propriété intellectuelle, délais de paiement). Pour chaque clause à risque, cite un
extrait court (moins de 20 mots), qualifie le niveau de risque (faible/moyen/élevé), explique le
risque en français simple et accessible à un dirigeant de PME non-juriste, et cite l'article de
référence OHADA si tu le connais avec certitude — sinon laisse le champ à null, ne devine jamais.
Réponds STRICTEMENT en JSON selon le schéma fourni. Termine par une synthèse globale de 1 à 2 phrases.
```

---

### C.4 — Chatbot Général BSTP (conversationnel, multi-tours)

**Rôle :** un widget flottant présent sur toute l'application, qui répond aux questions générales
des utilisateurs (PME, Donneur d'Ordre, Agent) sur le fonctionnement de la plateforme, les démarches,
les documents requis, etc. Contrairement aux features précédentes, il garde un historique de
conversation.

**Point structurant à trancher avec ta collègue : le routing.**
Deux architectures possibles :

- **Option A — Chatbot autonome et généraliste uniquement** : il répond avec ses connaissances
  générales sur la BSTP, mais renvoie l'utilisateur vers le module dédié pour toute tâche structurée
  ("Pour analyser ton contrat en détail, va dans l'onglet Assistant Juridique"). Le Front affiche un
  bouton de redirection quand le backend renvoie un indicateur `suggestedAction`.
- **Option B — Chatbot orchestrateur** : il peut lui-même appeler la feature `legal_assistant` en
  interne si l'utilisateur colle un contrat dans le chat (function calling / tool use côté backend).

**Recommandation pour la version démo (moins d'1 semaine) : Option A.** Plus simple, plus prévisible,
moins de risque de bug en live devant le DG. Option B pourrait être une v2.

**Séquence (Option A retenue) :**
```
Utilisateur ouvre le widget Chatbot (accessible partout dans l'app)
        ↓
Utilisateur tape ou dicte (bouton micro → Whisper → texte, voir C.6) un message
        ↓
Front envoie tout l'historique de conversation + nouveau message → feature "chatbot"
        ↓
Backend (Llama) répond en tenant compte du contexte, avec éventuellement un suggestedAction
        ↓
Front affiche la réponse + éventuel bouton de redirection vers un module
```

**Requête :**
```json
{
  "requestId": "e8c3...",
  "feature": "chatbot",
  "locale": "fr",
  "payload": {
    "sessionId": "uuid-session-conversation",
    "profilUtilisateur": "PME | DonneurOrdre | AgentBSTP | DG",
    "historique": [
      { "role": "user", "content": "Comment je fais pour obtenir le badge Eligible AO ?" },
      { "role": "assistant", "content": "Il faut valider ton parcours BSTP Academy sur les modules obligatoires..." }
    ],
    "nouveauMessage": "Et combien de temps ça prend en général ?"
  }
}
```

**Réponse (`data`) :**
```json
{
  "reponse": "En général, entre 2 et 4 semaines selon ton rythme de formation sur la BSTP Academy.",
  "suggestedAction": {
    "type": "navigate",
    "label": "Voir mes modules de formation",
    "route": "/academy"
  }
}
```
`suggestedAction` peut être `null` si aucune redirection n'est pertinente.

**Prompt système (point de départ) :**
```
Tu es l'assistant conversationnel officiel de la plateforme BSTP NEXUS (Bourse de Sous-Traitance et
de Partenariat, Cameroun). Tu réponds en français, de façon claire, courte et professionnelle, sans
jargon inutile. Tu connais le fonctionnement général de la plateforme : profilage des PME, annuaire,
bourse des marchés, suivi tripartite des contrats, radar de maturité, assistant juridique, BSTP
Academy, hub communautaire. Tu adaptes ton ton selon le profil de l'utilisateur (`profilUtilisateur`).
Si une demande nécessite une analyse approfondie (analyse complète d'un contrat, calcul détaillé de
score), tu ne le fais pas toi-même : tu expliques brièvement où trouver la fonctionnalité dédiée et
tu proposes une `suggestedAction` de type navigation. Ne donne jamais de conseil juridique définitif
toi-même — oriente vers le module Assistant Juridique pour toute analyse de contrat.
```

**Gestion de l'historique (contrainte technique importante) :** au-delà d'un certain nombre de
messages, l'historique complet dépassera la fenêtre de contexte du modèle. À trancher : le Front
tronque-t-il l'historique envoyé (ex : 10 derniers messages), ou le Backend gère-t-il un résumé de
conversation glissant ? **Recommandation démo : Front tronque aux 10 derniers messages, suffisant
pour une démo courte.**

---

### C.5 — OCR Documentaire (Llama Scout OCR)

**Rôle :** extraire automatiquement les champs clés d'un document uploadé pour préremplir le
Passeport Numérique et accélérer la validation par l'Agent BSTP.

**Requête :**
```json
{
  "requestId": "f1d7...",
  "feature": "doc_ocr",
  "locale": "fr",
  "payload": {
    "typeDocumentAttendu": "RCCM | NIU | CNPS | Attestation_Fiscale",
    "fichierBase64": "string",
    "mimeType": "image/jpeg | image/png | application/pdf",
    "tailleOctets": 245678
  }
}
```
**Contrainte à fixer ensemble : taille max acceptée** (proposition : 5 Mo, au-delà → erreur
`FILE_TOO_LARGE` côté backend avant même d'appeler le modèle, pour économiser des ressources).

**Réponse (`data`), les champs varient selon `typeDocumentDetecte` :**

Pour **RCCM** :
```json
{
  "typeDocumentDetecte": "RCCM",
  "champsExtraits": {
    "numeroRCCM": "string",
    "raisonSociale": "string",
    "dateEmission": "YYYY-MM-DD",
    "dateExpiration": "YYYY-MM-DD ou null"
  },
  "niveauConfianceOCR": 0.94,
  "lisibiliteDocument": "bonne | moyenne | mauvaise"
}
```

Pour **NIU** :
```json
{
  "typeDocumentDetecte": "NIU",
  "champsExtraits": {
    "numeroNIU": "string",
    "raisonSociale": "string",
    "regimeFiscal": "string ou null"
  },
  "niveauConfianceOCR": 0.91,
  "lisibiliteDocument": "bonne"
}
```

Pour **CNPS** :
```json
{
  "typeDocumentDetecte": "CNPS",
  "champsExtraits": {
    "numeroImmatriculation": "string",
    "raisonSociale": "string",
    "dateAffiliation": "YYYY-MM-DD"
  },
  "niveauConfianceOCR": 0.89,
  "lisibiliteDocument": "moyenne"
}
```

Pour **Attestation_Fiscale** :
```json
{
  "typeDocumentDetecte": "Attestation_Fiscale",
  "champsExtraits": {
    "numeroAttestation": "string",
    "dateEmission": "YYYY-MM-DD",
    "dateExpiration": "YYYY-MM-DD",
    "statutConformite": "a_jour | expire"
  },
  "niveauConfianceOCR": 0.96,
  "lisibiliteDocument": "bonne"
}
```

**⚠️ Action requise de ta collègue avant de coder l'écran de validation Agent BSTP :** confirmer la
liste exacte de ces champs par type de document (je propose une base ci-dessus, mais elle seule
connaît les capacités réelles du modèle OCR et le format exact des documents administratifs
camerounais). **Cette liste doit être figée avant que je code le formulaire de validation côté Front.**

**Cas limites :**
- `niveauConfianceOCR < 0.6` → le Front doit afficher un avertissement "à vérifier manuellement" et
  ne PAS préremplir automatiquement le champ, juste le suggérer.
- Document illisible → `lisibiliteDocument: "mauvaise"` et `champsExtraits` peut être partiellement
  rempli (champs non détectés = `null`, jamais de valeur inventée).

---

### C.6 — Transcription Vocale (Whisper)

**Rôle confirmé : deux points d'usage distincts, à traiter de façon identique côté contrat :**
1. Compte-rendu vocal de l'Agent BSTP lors d'une Descente Terrain (dictée longue, formulaire dédié).
2. Saisie vocale dans le Chatbot (bouton micro, message court, puis enchaîné automatiquement vers
   la feature `chatbot` en C.4 une fois transcrit).

**Requête :**
```json
{
  "requestId": "a2b5...",
  "feature": "audio_transcription",
  "locale": "fr",
  "payload": {
    "fichierAudioBase64": "string",
    "mimeType": "audio/webm | audio/mp3 | audio/wav",
    "dureeSecondes": 45,
    "contexteUsage": "compte_rendu_terrain | saisie_chatbot"
  }
}
```
`contexteUsage` permet au backend d'adapter éventuellement le traitement (ex : compte-rendu terrain
peut être plus long et technique, saisie chatbot est courte et conversationnelle) — à voir si c'est
utile ou superflu selon ta collègue.

**Réponse (`data`) :**
```json
{
  "transcription": "Visite du site effectuée ce jour, les installations sont conformes aux normes HSQE observées lors du dernier audit.",
  "langueDetectee": "fr",
  "niveauConfianceTranscription": 0.92
}
```

**Contrainte à fixer : durée max acceptée** (proposition : 3 minutes pour un compte-rendu terrain,
30 secondes pour la saisie chatbot — deux limites différentes selon `contexteUsage`).

---

## PARTIE D — MATRICE D'ERREURS COMPLÈTE

Tous les endpoints backend doivent utiliser EXACTEMENT ces codes, rien d'autre, pour que le Front
puisse mapper un message utilisateur clair sans avoir à deviner :

| Code | Signification | Comportement Front attendu |
|---|---|---|
| `TIMEOUT` | Le modèle n'a pas répondu dans le délai (8s par défaut) | Fallback silencieux vers réponse mock ou message "réessaie dans un instant" |
| `MODEL_UNAVAILABLE` | Le endpoint HF/Groq est down | Fallback vers mock + bandeau discret "mode démo" si applicable |
| `INVALID_INPUT` | Le payload envoyé ne respecte pas le schéma attendu | Erreur affichée au développeur (ne devrait jamais arriver en prod si les types sont respectés) |
| `RATE_LIMIT` | Trop de requêtes envoyées | Message "veuillez patienter quelques secondes" + retry automatique après délai |
| `FILE_TOO_LARGE` | Fichier (image/PDF/audio) dépasse la limite | Message clair à l'utilisateur avant même l'envoi si possible (validation côté Front en amont) |
| `UNSUPPORTED_FORMAT` | Format de fichier non supporté | Message clair listant les formats acceptés |
| `INTERNAL_ERROR` | Erreur imprévue côté backend | Message générique + log technique pour debug |

## PARTIE E — POLITIQUE DE TIMEOUT ET RETRY

- **Timeout par défaut : 8 secondes** pour toutes les features one-shot (C.1, C.2, C.3, C.5).
- **Timeout chatbot (C.4) : 12 secondes** (conversation, peut nécessiter un peu plus de traitement).
- **Timeout transcription/OCR (C.5, C.6) : 15 secondes** (traitement fichier plus lourd).
- **Retry automatique : 1 seule tentative**, uniquement sur `TIMEOUT` ou `MODEL_UNAVAILABLE`, jamais
  sur `INVALID_INPUT` (ça ne changera rien de réessayer une requête mal formée).
- Après échec du retry → fallback vers le Mode Mock pour ne jamais bloquer la démo devant le DG.

*(Ces valeurs sont des propositions de départ — à ajuster ensemble selon la latence réelle observée
une fois les premiers endpoints de ta collègue disponibles.)*

## PARTIE F — SÉCURITÉ ET LIMITES

- Aucune donnée sensible (mot de passe, token d'authentification) ne doit jamais transiter dans le
  `payload` d'un appel IA.
- Les fichiers (OCR, audio) sont envoyés en base64 dans cette v1 pour simplifier — à revoir si les
  volumes deviennent trop importants (passer à un upload multipart avec URL temporaire).
- Toute donnée personnelle extraite par OCR (numéros RCCM/NIU/CNPS) doit être traitée comme sensible
  côté stockage Front (jamais en `localStorage` en clair).

---

## PARTIE G — CHECKLIST DE VALIDATION AVANT DE CODER CHACUN DE SON CÔTÉ

À cocher ensemble, en visio ou en échange rapide, avant que chacun code en autonomie :

- [ ] Le mapping modèle/fonctionnalité (A.2) est validé par ta collègue selon les modèles réellement
      disponibles sur son infra Groq.
- [ ] Le corpus RAG du Radar de Maturité (C.2) est identifié (quels textes de loi/normes exactement).
- [ ] La liste des champs OCR par type de document (C.5) est confirmée ou corrigée.
- [ ] L'option de routing du Chatbot (Option A vs B, en C.4) est tranchée — recommandation : Option A
      pour la démo.
- [ ] Les limites de taille fichiers (OCR) et durée audio (Whisper) sont fixées.
- [ ] Les valeurs de timeout (Partie E) sont jugées réalistes par ta collègue.
- [ ] Les codes d'erreur (Partie D) sont acceptés tels quels ou amendés.

Une fois cette checklist cochée, ce document passe en v1 figée et chacun code contre les schémas
sans dépendre de l'avancement de l'autre — c'est tout l'intérêt du contrat.
