# BSTP NEXUS 2026 — Spécification des Dashboards par Acteur

> Destinataire : agent IA de codage. Ce document répond à une seule question par acteur : **"qu'est-ce que cette personne voit exactement quand elle se connecte, et pourquoi ?"**
> Base : section "Architecture Fonctionnelle : Acteurs & Cockpits de Pilotage" du Dossier de Cadrage MINPMEESA/ONUDI (source de vérité officielle) + section 2 "Architecture des Composants" du Dossier de Spécifications.
> Complète `BSTP_NEXUS_2026_SPEC.md` — n'y substitue rien, précise le contenu de chaque écran d'accueil d'espace.

Il y a **4 acteurs, 4 dashboards, 4 layouts distincts**. Aucun acteur ne voit le dashboard d'un autre. Le rôle de l'utilisateur (`user.role`) détermine le layout au login — voir §1 du document SPEC pour le routing.

---

## 1. Dashboard Direction Générale — "Cockpit de Pilotage Global"

**Route :** `/observatoire` (page d'accueil de l'espace DG)
**Fichier :** `src/pages/Observatoire/Observatoire.jsx`

### Rôle métier
Le DG ne gère aucune donnée individuelle. Il pilote l'économie industrielle nationale à travers 3 dimensions d'analyse. C'est l'écran qui doit produire l'effet "outil de décision", pas "liste d'entreprises". Aucune action d'édition ici — 100% lecture/analyse.

### Contenu exact (3 blocs obligatoires, dans cet ordre)

#### Bloc 1 — Indicateurs Flash de Performance Générale
4 `KpiCard` en ligne, en haut de page (le "coup d'œil 3 secondes") :

| KPI | Libellé UI | Source / calcul |
|---|---|---|
| Volume d'Ancrage | Nombre de PME référencées | `count(pme where status="profilee" ou plus)` |
| Indice de Maturité Moyen | Score de conformité national | `moyenne(maturityScore de toutes les PME)` |
| Volume Économique Capté | Marchés sécurisés (Mds FCFA) | `sum(budgetFcfa des contrats signés) / 1e9` |
| Taux de Conversion | AO publiés → attribués PME locales | `count(contrats attribués) / count(AO publiés) * 100` |

Chaque `KpiCard` affiche : valeur actuelle, variation vs période précédente (flèche + %), micro-sparkline (Recharts `AreaChart` miniature).

#### Bloc 2 — Métriques de la Chaîne de Valeur et de l'Accompagnement
Deux composants côte à côte :

1. **Pipeline Statutaire** (`components/dg/StatusPipeline.jsx`) : entonnoir/funnel visuel à 3 niveaux montrant la répartition exacte des PME :
   - `Profilée` (déclaration faite) → `Vérifiée Terrain` (audit physique validé) → `Éligible AO` (parcours certifiant complet)
   - Chaque niveau affiche un nombre + % du total. Cliquable → filtre la liste PME du niveau (optionnel, non bloquant).

2. **Indice de Capital Humain** (`components/dg/CapitalHumainCard.jsx`) : heures cumulées de formation dispensées par la BSTP Academy (compteur global) + tableau "entreprises certifiées par module" (ISO 9001, HSQE, RSE — colonnes = module, valeur = nombre de PME certifiées).

#### Bloc 3 — Vue Matricielle Croisée (le "Dashboard de Gouvernance")
4 sous-panneaux, disposés en grille 2×2 :

| Panneau | Composant | Contenu |
|---|---|---|
| Analyse Sectorielle | `SectorBreakdownChart` (BarChart Recharts) | Parts de marché sous-traitées par filière : Mines, Hydrocarbures, BTP, Agro-industrie, Énergie, Télécoms |
| Analyse Institutionnelle | `KeyAccountsTable` | Volume de marchés injectés par donneur d'ordre partenaire (SCDP, SOSUCAM, SONARA, ENEO) — tableau trié par volume desc |
| Analyse Territoriale | `RegionMap` (carte SVG stylisée du Cameroun) | Impact économique par région (Littoral, Centre, Ouest, etc.) — code couleur par intensité |
| Vigilance Opérationnelle | `RedFlagThermometer` | Thermomètre/jauge du volume de chantiers en stagnation (drapeaux rouges actifs, cf. module Suivi Tripartite) — cliquable → liste des contrats concernés |

### Wireframe ASCII
```
┌─────────────────────────────────────────────────────────────────┐
│  [KPI: PME]  [KPI: Maturité]  [KPI: Mds FCFA]  [KPI: Conversion] │
├───────────────────────────────┬───────────────────────────────┬─┘
│  Pipeline Statutaire (funnel)  │  Capital Humain (heures+cert.) │
├───────────────────┬────────────────────┬──────────────────────┤
│ Sectoriel (bars)   │ Institutionnel(tbl)│ Territorial (map)     │
│                    │                    ├────────────────────┤ │
│                    │                    │ Vigilance (jauge)   │ │
└───────────────────┴────────────────────┴──────────────────────┘
```

### Données mock requises
`src/data/observatoire.mock.js` : agrégats nationaux pré-calculés (ne pas recalculer depuis toutes les PME côté front pour le prototype — un objet mock statique avec les 4 KPI, le pipeline, les 6 secteurs, les 4 donneurs d'ordre, les régions, et le nombre de drapeaux rouges actifs).

---

## 2. Dashboard Agent Technique / Superviseur BSTP — "Workflow de Certification"

**Route :** `/agent` (accueil), avec sous-sections `/agent/audits`, `/agent/terrain`, `/agent/mediation`
**Fichier :** `src/pages/Agent/AgentDashboard.jsx`

### Rôle métier
L'agent est un **outil de production**, pas un tableau de lecture. Chaque écran doit permettre une action (valider, planifier, arbitrer), pas juste afficher.

### Contenu exact (3 modules obligatoires)

#### 2.1 Audit Documentaire
- **Écran :** `AuditDocumentaire.jsx` — file d'attente des PME en attente de validation de pièces (RCCM, NIU, CNPS, Attestation Fiscale).
- **Composant central :** `DocumentReviewCard` par PME — liste des pièces uploadées avec statut (`en_attente|valide|rejete`), aperçu du document, boutons Valider/Rejeter (avec motif obligatoire si rejet).
- **Interaction IA :** bouton "Extraire automatiquement" par pièce → appelle `ocr/scan-document` (Llama Scout), pré-remplit les champs extraits pour vérification rapide par l'agent (l'agent valide, l'IA ne décide jamais seule).
- **Liste triée par :** ancienneté de la demande (FIFO), avec badge "urgent" si > X jours.

#### 2.2 Planification Terrain
- **Écran :** `PlanificationTerrain.jsx` — calendrier/liste des descentes terrain programmées.
- **Composant :** `TerrainVisitScheduler` (sélection PME + date + agent), et `TerrainReportEditor` (formulaire de compte-rendu d'audit d'usine post-visite : conformité observée, note libre, upload de photos livrables).
- Une fois le compte-rendu validé → déclenche automatiquement le passage de la PME au statut `Vérifiée Terrain` dans le Pipeline Statutaire (visible côté DG).

#### 2.3 Médiation Tripartite
- **Écran :** `MediationTripartite.jsx` — liste des contrats avec `flagRouge: true` (stagnation détectée, cf. module Suivi Tripartite dans SPEC §5.4).
- **Composant :** `MediationCase` — détail du litige/blocage, historique des jalons, zone de résolution (note d'arbitrage, changement de statut du jalon, notification aux deux parties PME + Donneur d'Ordre).

### Wireframe ASCII
```
┌─────────────────────────────────────────────────────────┐
│  Onglets : [Audit Documentaire] [Planif. Terrain] [Médiation] │
├─────────────────────────────────────────────────────────┤
│  Audit Documentaire (par défaut)                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ PME X — RCCM ✓  NIU ⏳  CNPS ✗  Attest.Fisc ⏳       │  │
│  │ [Extraire IA]  [Valider]  [Rejeter]                 │  │
│  └───────────────────────────────────────────────────┘  │
│  ... (file d'attente, la plus ancienne en premier)        │
└─────────────────────────────────────────────────────────┘
```

### Données mock requises
`src/data/agent-tasks.mock.js` : file d'attente d'audits documentaires, planning de visites terrain, liste de dossiers en médiation.

---

## 3. Dashboard PME — "Espace Croissance"

**Route :** `/dashboard` (existant, à enrichir massivement)
**Fichier :** `src/pages/Dashboard/Dashboard.jsx`

### Rôle métier
Contrairement au DG (macro) et à l'Agent (production/validation), la PME doit ressentir un **retour sur investissement immédiat** : chaque action (formation, mise à jour de profil) doit visiblement faire progresser un score ou débloquer quelque chose.

### Contenu exact (5 blocs obligatoires)

| Bloc | Composant | Contenu |
|---|---|---|
| Radar de Maturité Dynamique | `RadarMaturiteWidget` | RadarChart Recharts des 6 axes + score global, bouton "Générer l'Analyse ONUDI" |
| Passeport Numérique | `PasseportSummaryCard` | Résumé des pièces (statut coup d'œil : X/4 validées), lien vers coffre-fort complet |
| Flux d'Opportunités Poussées | `OpportunityFeed` | Cartes d'AO/DP matchées (géofencing + badge), triées par score de match décroissant, badge "Nouveau" si non consulté |
| BSTP Academy | `AcademyProgressWidget` | Barre de progression des parcours obligatoires (Réponse aux AO, Normes ISO, HSQE, RSE) + prochain badge à débloquer |
| Assistant IA & Hub Communautaire | 2 cartes d'accès rapide | `ChatWidget` en accès rapide (pas la page complète) + aperçu des 2-3 derniers posts pertinents du Hub |

En en-tête de dashboard, **toujours visible** : `TrustBadge` (Bronze/Argent/Or) de l'entreprise — c'est l'élément de gamification le plus visible, doit apparaître aussi dans le header global de l'espace PME (pas seulement sur le dashboard).

### Wireframe ASCII
```
┌───────────────────────────────────────────────────────────┐
│  [Nom PME]                              [Badge: Argent 🥈] │
├───────────────────────┬─────────────────────────────────────┤
│  Radar de Maturité      │  Passeport Numérique (3/4 ✓)       │
│  [RadarChart 6 axes]    │  [Voir le coffre-fort →]            │
├───────────────────────┴─────────────────────────────────────┤
│  Flux d'Opportunités Poussées                                │
│  [Carte AO Douala 75M — match 87%] [Carte AO ...]            │
├───────────────────────┬─────────────────────────────────────┤
│  BSTP Academy (progrès) │  Assistant IA / Hub Communautaire   │
└───────────────────────┴─────────────────────────────────────┘
```

### Données mock requises
Existant `user.mock.js`, `parcours.mock.js`, `formations.mock.js` à enrichir avec `maturityAxes`, `trustBadge`, `passportDocuments`.

---

## 4. Dashboard Donneur d'Ordre — "Espace Sourcing Sécurisé"

**Route :** `/donneur-ordre` (à créer)
**Fichier :** `src/pages/DonneurOrdre/DonneurOrdreDashboard.jsx`

### Rôle métier
Le directeur des achats doit pouvoir sécuriser un approvisionnement en 3 gestes : chercher un fournisseur fiable, publier un besoin, comparer des offres. Rien d'autre ne doit distraire cet écran.

### Contenu exact (3 modules obligatoires)

#### 4.1 Moteur d'Annuaire Certifié
- **Composant :** `CertifiedDirectorySearch` — recherche multicritère (secteur, région, badge minimum requis), résultats restreints **uniquement** aux PME avec badge validé par la BSTP (pas de PME simplement "profilée").
- Fiche PME au clic : Radar de Maturité résumé, badge, historique de marchés réalisés.

#### 4.2 Console de Publication
- **Composant :** `PublishOpportunityForm` (react-hook-form + zod) — création d'un AO/DP : titre, description, secteur, région (ciblage géographique = champ obligatoire pour activer le géofencing), budget FCFA, badge minimum requis.
- À la soumission → déclenche le calcul de matching (`matchmaking/score`) pour toutes les PME éligibles, alimente leur `OpportunityFeed`.

#### 4.3 Sourcing Analytics
- **Composant :** `OfferComparisonTable` — pour un AO donné, tableau comparatif des PME ayant soumissionné, colonnes : nom, score de maturité, badge, montant proposé, match score. Tri par n'importe quelle colonne.

### Wireframe ASCII
```
┌───────────────────────────────────────────────────────────┐
│  Onglets : [Annuaire Certifié] [Publier un AO] [Mes AO / Analytics] │
├───────────────────────────────────────────────────────────┤
│  Annuaire Certifié (par défaut)                              │
│  Filtres: [Région ▾] [Secteur ▾] [Badge min ▾]                │
│  [Carte PME — badge Or]  [Carte PME — badge Argent] ...       │
└───────────────────────────────────────────────────────────┘
```

### Données mock requises
`src/data/donneurs-ordre.mock.js` (profils DO type SCDP/SOSUCAM), `opportunities.mock.js` (AO/DP publiés), extension de `partners.data.js` pour les scores de matching.

---

## 5. Règle transverse — ce que chaque dashboard NE doit PAS contenir

Pour éviter la dérive "un agent ajoute des trucs par réflexe" :
- Le DG ne voit **aucune fiche PME individuelle éditable** — uniquement des agrégats et, au clic, des listes filtrées en lecture seule.
- L'Agent BSTP ne voit **aucun KPI macro national** — son dashboard est une file de travail, pas un observatoire.
- La PME ne voit **aucune donnée d'une autre PME** — sauf via l'Annuaire public (déjà existant), qui n'est pas son dashboard privé.
- Le Donneur d'Ordre ne voit **jamais** une PME non certifiée (badge validé) dans son moteur de recherche — c'est la garantie de confiance du système, non négociable.
