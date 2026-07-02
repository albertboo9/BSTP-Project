# Spécifications - Système d'Accès aux Parcours et Formations MINPMEESA

## 1. Vue d'Ensemble du Système

Le système d'accès aux parcours MINPMEESA repose sur un modèle à deux niveaux:

- **Parcours en accès libre**: Création d'Entreprise
- **Parcours conditionnels**: Financement, Normalisation (avec processus de validation)

## 2. Parcours: Niveaux d'Accès

### 2.1 Parcours "Création d'Entreprise" - ACCÈS LIBRE + ACHÈVEMENT OBLIGATOIRE

```
✓ Tout utilisateur peut accéder directement
✓ Toutes les ressources disponibles immédiatement
✓ Pour TERMINER le parcours: Saisie des informations de l'entreprise créée:
  - Nom de l'entreprise
  - Forme juridique (SARL, SNC, etc.)
  - Date de création
  - Secteur d'activité
  - Localisation (Ville, Quartier)
  - NIU (Numéro d'Identification Unique) - si disponible

✓ Une fois complété → Marque le parcours comme "ACHEVE"
✓ Permet d'accéder aux parcours Financement et Normalisation
```

### 2.2 Parcours "Financement" et "Normalisation" - ACCÈS CONDITIONNEL

#### Condition d'accès:

- **Avoir achevé le parcours "Création d'Entreprise"** (avec saisie infos entreprise)
- **OU** avoir une entreprise existante avec documents

### 2.2 Parcours "Financement" et "Normalisation" - ACCÈS CONDITIONNEL

#### Conditions d'accès:

1. **Option A**: Avoir validé le parcours "Création d'Entreprise"
2. **Option B**: Avoir une entreprise déjà créée avec:
   - NIU (Numéro d'Identification Unique)
   - ACF (Attestation de Conformité Fiscale)
   - Statuts de l'entreprise
   - Attestation de conformité

#### Processus de demande d'accès:

```
┌─────────────────────────────────────────────────────────┐
│  1. CLIC SUR PARCOURS CONDITIONNEL                      │
│                    ↓                                    │
│  2. AFFICHAGE POPUP DE DEMANDE D'ACCÈS                  │
│     - Question: "Avez-vous une entreprise?"             │
│     - [ ] Oui, je suis déjà en activité                 │
│     - [ ] Non, je vais la créer                         │
│                    ↓                                    │
│  3. SI "OUI" → Formulaire de vérification               │
│     - NIU (Numéro d'Identification Unique)              │
│     - ACF (Attestation de Conformité Fiscale)           │
│     - Date de création                                  │
│     - Secteur d'activité                                │
│     - Documents justificatifs (upload)                  │
│                    ↓                                    │
│  4. SI "NON" → Vérification parcours Création           │
│     - Parcours Création validé?                         │
│     - Si oui → Accès accordé                            │
│     - Si non → Message "Validez d'abord Création"       │
│                    ↓                                    │
│  5. SIMULATION TRAITEMENT AGENT                         │
│     - Message: "Votre demande est en cours..."          │
│     - Animation de traitement (30s)                     │
│     - Réponse positive ou négative                      │
│                    ↓                                    │
│  6. ACCÈS OU REFUS                                      │
│     - Accès: Ouverture du parcours                      │
│     - Refus: Message avec motif + suggestions           │
└─────────────────────────────────────────────────────────┘

```

## 3. Formations: Niveaux d'Accès

### 3.1 Formation en ACCÈS LIBRE

- Visible sans authentification
- Lien direct vers le LMS
- Aucune restriction

### 3.2 Formation en ACCÈS CONDITIONNEL (Financement MINPMEESA)

- Nécessite un financement du MINPMEESA
- Processus de demande:

```
┌─────────────────────────────────────────────────────────┐
│  1. CLIC SUR FORMATION CONDITIONNELLE                   │
│                    ↓                                    │
│  2. AFFICHAGE MODAL DE PRÉSENTATION                     │
│     - Titre, Description, Durée                         │
│     - Badge: "Formation financée MINPMEESA"             │
│     - [ ] "Demander l'accès"                            │
│     - [ ] "Plus d'informations"                         │
│                    ↓                                    │
│  3. FORMULAIRE DE MOTIVATION                            │
│     - Nom et Prénom                                     │
│     - Email                                             │
│     - Entreprise (si existante)                         │
│     - Parcours en cours                                 │
│     - Motivations / Projet                              │
│     - Disponibilités                                    │
│                    ↓                                    │
│  4. SIMULATION TRAITEMENT AGENT                      ,  │
│     - "Demande transmise à un agent MINPMEESA"        │
│     - Délai de traitement: 48-72h                      │
│     - Email de confirmation                            │
│                    ↓                                     │
│  5. NOTIFICATION RÉPONSE                               │
│     - Si acceptée: Accès + Instructions LMS          │
│     - Si refusée: Motif + suggestions                  │
└─────────────────────────────────────────────────────────┘
```

## 4. Structure de Données Requise

### 4.1 Parcours

```javascript
{
  id: "financement",
  title: "Recherche de Financement",
  access: "conditionnel",  // "libre" | "conditionnel"
  conditions: {
    requiresPreviousParcours: ["creation"],  // Parcours à valider
    requiresCompanyDocuments: true,
    requiredDocuments: ["niu", "acf", "statuts"],
    requiresMotivation: false
  },
  validationProcess: {
    type: "agent_simulation",  // "automatic" | "agent_simulation"
    processingTime: "30s"  // pour simulation
  }
}
```

### 4.2 Formations

```javascript
{
  id: "f1",
  title: "Création d'entreprise",
  access: "libre",  // "libre" | "conditionnel"
  lmsUrl: "https://campus.studieslearning.com/...",
  requiresFunding: false,  // true pour formations financées
  fundingInfo: {
    provider: "MINPMEESA",  // ou null
    requiresApplication: true
  }
}
```

### 4.3 Modèle de Profil Entreprise (créé à la fin du parcours Création)

```javascript
{
  id: "entreprise_001",
  userId: "user_123",
  parcoursId: "creation",
  status: "complete",
  companyInfo: {
    nom: "Mon Entreprise SARL",
    formeJuridique: "SARL",  // SARL, SNC, SA, EI, etc.
    dateCreation: "2024-01-15",
    secteur: "Commerce",  // Industrie, Commerce, Services, Agriculture
    ville: "Douala",
    quartier: "Bali",
    niu: "XX-XXXX-XXXXX",  // Optionnel
    description: "Description de l'entreprise..."
  },
  createdAt: "2024-03-04T10:00:00Z",
  completedAt: "2024-03-04T12:30:00Z"
}
```

### 4.4 Modèle de Demande d'Accès Parcours

```javascript
{
  id: "demande_001",
  userId: "user_123",
  parcoursId: "financement",
  status: "en_attente",  // "en_attente", "approuvee", "rejetee"
  companyInfo: {
    hasCompany: true,
    niu: "XX-XXXX-XXXXX",
    acf: "ACF-XXXXX",
    creationDate: "2024-01-15",
    documents: ["fichier1.pdf", "fichier2.pdf"]
  },
  createdAt: "2024-03-04T10:00:00Z",
  processedAt: null,
  agentResponse: null
}
```

### 4.4 Modèle de Demande de Formation

```javascript
{
  id: "demande_formation_001",
  userId: "user_123",
  formationId: "f5",
  status: "en_attente",
  motivation: {
    nom: "Nom",
    email: "email@example.com",
    entreprise: "Mon Entreprise",
    parcoursActuels: ["creation"],
    motivations: "Texte de motivation...",
    disponibilites: "Weekend"
  },
  createdAt: "2024-03-04T10:00:00Z",
  processedAt: null,
  agentResponse: null
}
```

## 5. Composants UI à Créer

### 5.1 ParcoursAccessModal

- Popup de demande d'accès aux parcours conditionnels
- Formulaire de vérification entreprise
- Simulation de traitement agent

### 5.2 FormationAccessModal

- Présentation de la formation
- Formulaire de motivation
- Statut de la demande

### 5.3 StatusBadge

- Badge visuel pour distinguer accès libre/conditionnel
- "Gratuit", "Financé MINPMEESA", "Sous condition"

### 5.4 AccessRequestList

- Liste des demandes en cours
- Historique des accès accordés/refusés

## 6. Flux Utilisateur Récapitulatif

### Accès Parcours Création:

```
Utilisateur → Parcours Création → [TOUT OUVERT] ✓
```

### Accès Parcours Financement:

```
Utilisateur → Parcours Financement →
  → Popup: "Avez-vous une entreprise?"
    → OUI → Formulaire NIU/ACF → Traitement → Accès/Refus
    → NON → Vérif parcours Création
      → Validated → Accès
      → Non validé → Message "Créez d'abord votre entreprise"
```

### Formation Libre:

```
Utilisateur → Formation → [REDIRECTION LMS] ✓
```

### Formation Financée:

```
Utilisateur → Formation financée →
  → Modal présentation → "Demander l'accès"
    → Formulaire motivation → Soumission
      → "Demande traitée sous 48-72h"
        → Notification: Accès ou Refus
```

## 7. Prochaines Étapes d'Implémentation

1. **Phase 1**: Créer les composants UI (modals, formulaires)
2. **Phase 2**: Mettre à jour la structure des données parcours.mock.js
3. **Phase 3**: Implémenter la logique de validation
4. **Phase 4**: Ajouter la simulation de traitement agent
5. **Phase 5**: Gérer le stockage des demandes (localStorage ou API)

---

_Document créé le 2024-03-04_
_Pour le projet MINPMEESA StarterKIT CM_
