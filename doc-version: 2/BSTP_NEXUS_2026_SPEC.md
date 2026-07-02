# BSTP NEXUS 2026 — Spécification de Build (pour agent de codage)

> Destinataire : agent IA de codage (IDE). Ce document décrit QUOI construire, à partir de QUEL existant, avec QUELLE architecture. Il ne couvre pas la landing page / site vitrine — uniquement l'application (dashboard connecté).
> Source de vérité métier : Dossier de Cadrage MINPMEESA/ONUDI (Juin 2026) + Matrice de Transformation. Existant technique : StarterKit CM (audit joint).

---

## 0. Résumé exécutif

On transforme StarterKit CM (SPA React vitrine + dashboard PME basique, données 100% mockées, auth factice) en **BSTP NEXUS 2026** : une plateforme à 4 espaces utilisateurs (PME, Donneur d'Ordre, Agent BSTP, Direction Générale) avec 9 modules métier, une couche IA découplée (Mode Real/Mock), et un state management modernisé.

**Décisions actées :**
- Tous les modules sont construits en profondeur dès le départ (pas de MVP/stub).
- State management : **Zustand** (state client) + **React Query** (state serveur/async), en remplacement progressif de la Context API pour tout ce qui est data-heavy. Contextes conservés uniquement pour Theme/Language (préférences UI pures, faible fréquence de changement).
- Aucun backend réel : toutes les données métier restent dans `src/data/*.mock.js`, mais **enveloppées dans des fetchers asynchrones** (simulant latence réseau) pour que React Query s'y branche nativement, et pour qu'un vrai backend puisse remplacer les fetchers plus tard sans toucher aux composants.
- IA : consommée via un **AI Service Layer** unique, avec bascule Mock/Real par configuration. Voir `AI_INTEGRATION_CONTRACT.md` (document séparé, destiné à l'équipe qui développe les endpoints Hugging Face).

---

## 1. Les 4 espaces utilisateurs

| Espace | Acteur | Statut dans l'existant | Route racine |
|---|---|---|---|
| Espace Croissance | PME | Existe partiellement (Dashboard.jsx, Parcours, Formations) | `/dashboard/*` |
| Espace Sourcing | Donneur d'Ordre | **À créer** | `/donneur-ordre/*` |
| Espace Certification | Agent BSTP | **À créer** | `/agent/*` |
| Cockpit DG | Direction Générale | **À créer** | `/observatoire/*` |

Chaque espace a son propre layout (`PrivateLayoutPME.jsx`, `PrivateLayoutDO.jsx`, `PrivateLayoutAgent.jsx`, `PrivateLayoutDG.jsx`), dérivés de l'actuel `PrivateLayout.jsx`, avec navigation latérale spécifique. `ProtectedRoute` doit évoluer pour vérifier un `user.role` parmi `["pme","donneur_ordre","agent_bstp","dg"]` et rediriger vers le bon layout — c'est le trou de sécurité le plus critique identifié dans l'audit (actuellement aucune vérification de rôle).

---

## 2. Stack technique cible

**Conservé de l'existant :** React 18, Vite 5, React Router 6, Tailwind 3, Framer Motion, lucide-react, clsx, react-helmet-async.

**Ajouts à installer :**
```
npm i zustand @tanstack/react-query @tanstack/react-query-devtools
npm i react-hook-form zod @hookform/resolvers
npm i recharts
```

**Ne pas installer** shadcn/ui CLI (pas de `components.json`) — on continue le design system manuel existant dans `src/components/ui/`, mais on le complète (voir §6).

---

## 3. Refactoring de l'existant — table de décision

| Élément existant | Décision | Action |
|---|---|---|
| `AuthContext.jsx` | Garder le principe, enrichir | Ajouter `role`, migrer la logique de session vers un `authStore` Zustand persistant (`persist` middleware), le Context devient un simple wrapper si besoin de compat |
| `ThemeContext.jsx`, `LanguageContext.jsx` | Garder tel quel | Aucun changement, faible complexité, pas de bénéfice à migrer |
| `ParcoursContext.jsx` | Éclater | Devient `parcoursStore` (Zustand) pour l'état + hooks React Query pour les données de parcours/formations |
| `src/components/ui/*` | Garder et étendre | Ajouter `RadarChartCard`, `MilestonePipeline`, `TrustBadge`, `DataTable`, `KpiCard`, `Timeline`, `ChatWidget`, `FlagIndicator` |
| `src/data/*.mock.js` | Garder comme source de données | Envelopper chaque fichier dans un fetcher async dans `src/services/*.service.js` (ex: `getParcours()` retourne une Promise avec délai simulé 300-600ms) |
| `SignupEntrepreneur.jsx` (800+ lignes, un seul useState) | Refactorer | Migrer vers `react-hook-form` + schéma `zod`, découper en sous-composants par étape |
| `StarterCommunity.jsx` (1332 lignes) | Refactorer | Découper en `CommunityFeed.jsx`, `PostCard.jsx`, `CreatePostModal.jsx`, `CommunityFilters.jsx` |
| `Assistant.jsx` | Refactorer | Brancher sur l'AI Service Layer (module Assistant Juridique), retirer le timer factice |
| `ProtectedRoute.jsx` | Étendre | Ajouter vérification de rôle + redirection vers le bon espace |
| Absence de couche réseau | Créer | `src/services/http/` avec un client fetch minimal (pas besoin d'axios), utilisé par les adapters IA et futurs vrais endpoints |
| Vidéos/MP4 dans `public/DOSSIER_MINPMEESA/` | Ne pas dupliquer pour NEXUS | Nouveaux assets (mockups, badges, illustrations) vont dans `public/nexus-assets/`, en optimisant le poids |

---

## 4. Architecture des dossiers cible

```
src/
├── app/                      # Router, layouts globaux
├── components/
│   ├── ui/                   # Design system (étendu, voir §6)
│   ├── charts/                # RadarChartCard, KpiTrend, TerritoryMap
│   ├── pme/, donneur-ordre/, agent/, dg/   # Composants métier par espace
│   └── ai/                    # ChatWidget, ContractScanner, LegalRiskHighlighter
├── stores/                    # Zustand — un store par domaine (voir §5)
├── services/
│   ├── http/                  # client fetch générique
│   ├── ai/                    # AI Service Layer (voir §7)
│   └── *.service.js            # wrappers async sur data/*.mock.js
├── hooks/
│   └── queries/                # hooks React Query (useParcoursQuery, useMaturityQuery, etc.)
├── data/                       # inchangé, mocks bruts
├── pages/
│   ├── Dashboard/               # PME (existant, enrichi)
│   ├── DonneurOrdre/            # nouveau
│   ├── Agent/                   # nouveau
│   └── Observatoire/            # nouveau (DG)
└── context/                     # ThemeContext, LanguageContext uniquement
```

---

## 5. Modules métier — spécification détaillée

Pour chaque module : objectif, écrans, store/queries, statut.

### 5.1 Profilage & Passeport Numérique (PME)
- **Objectif :** onboarding multi-étapes certifiant → timeline `Validation Administrative → Auto-évaluation → Descente Terrain`.
- **Écrans :** Stepper d'inscription (adapte `SignupEntrepreneur.jsx` + `StepIndicator.jsx`), page `PasseportNumerique.jsx` (coffre-fort documentaire : upload RCCM/NIU/CNPS/Attestation Fiscale, statut par pièce).
- **Store :** `profilStore` (étape courante, statut de chaque pièce) + `useDocumentsQuery`.
- **Statut :** À adapter fortement depuis `SignupEntrepreneur.jsx` + `CompanyCompletionModal.jsx`.

### 5.2 Annuaire Certifié
- **Objectif :** annuaire filtrable, n'affiche que les PME avec badge validé.
- **Écrans :** `ProfessionalDirectory.jsx` enrichi (filtres région/secteur/badge), fiche PME publique avec Radar de Maturité résumé.
- **Statut :** À adapter (design existant réutilisable, brancher sur données réelles de profil + badges).

### 5.3 Smart Matchmaking & Bourse des Marchés
- **Objectif :** publication d'AO/DP par le Donneur d'Ordre, filtrage géofencing, notification instantanée PME.
- **Écrans :** `PublierAO.jsx` (DO), `BourseDesMarches.jsx` (feed de cartes filtrables, PME), `AOMatchNotification` (toast/badge sur dashboard PME).
- **Store :** `marketsStore` + `useOpportunitiesQuery`. Le scoring de matching passe par l'AI Service Layer (`matchmaking/score`, voir contrat IA).
- **Statut :** À créer entièrement.

### 5.4 Suivi Tripartite / Milestones
- **Objectif :** pipeline de jalons `Signature → Démarrage → Livraison 50% → Recette technique → Recette finale`, drapeau rouge automatique si stagnation.
- **Écrans :** `SuiviContrat.jsx` avec composant `MilestonePipeline` (progress bar horizontale + statut par jalon), vue Agent avec liste de contrats en alerte.
- **Logique de stagnation :** règle simple côté front — si `dateDernierUpdate` d'un jalon > seuil configurable (ex 14 jours) sans passage au jalon suivant → `flagRouge: true`.
- **Store :** `tripartiteStore` + `useContractsQuery`.
- **Statut :** À créer (seule base existante : `DashboardProjects.jsx`, insuffisant).

### 5.5 Radar de Maturité IA / Benchmarking
- **Objectif :** 6 axes notés /20, score global /100, écarts vs normes ONUDI/OHADA et loi de juillet 2025.
- **Écrans :** `RadarMaturite.jsx` (composant `RadarChart` de Recharts), bouton "Générer l'Analyse ONUDI" → appel IA (`maturity/analyze`).
- **Store :** `maturityStore` (données brutes des 6 axes, éditables par la PME) + `useMaturityAnalysisQuery` (résultat IA, mis en cache).
- **Statut :** À créer.

### 5.6 Assistant Juridique IA
- **Objectif :** chat + scan de contrat (surlignage clauses à risque, droit OHADA/Cameroun), 3 boutons de questions rapides.
- **Écrans :** refonte de `Assistant.jsx` en `ChatWidget` (composant `ai/`) + `ContractScanner.jsx` (zone de collage/upload de contrat, surlignage des clauses).
- **Store :** pas de store dédié — état de conversation en local state du composant, appels via AI Service Layer.
- **Statut :** À adapter en profondeur.

### 5.7 Hub Communautaire B2B
- **Objectif :** feed type LinkedIn industriel, posts de mutualisation (recherche partenaire, location matériel, création de grappe).
- **Écrans :** `CommunityFeed.jsx`, `CreatePostModal.jsx`, filtres par type de post.
- **Statut :** À refactorer depuis `StarterCommunity.jsx` (découpage obligatoire, 1332 lignes).

### 5.8 BSTP Academy & Gamification
- **Objectif :** LMS avec badges + Indice de Confiance (Bronze/Argent/Or) évoluant selon formations + marchés réussis.
- **Écrans :** `Academy.jsx` (grille de cours, enrichi depuis `Formations.jsx`), `TrophyShowcase.jsx` (vitrine de badges), composant `TrustBadge` réutilisé partout (annuaire, dashboard).
- **Règle de calcul de l'indice (côté front, mock) :** fonction pure `computeTrustIndex(formationsCompletees, marchesReussis, auditsValides)` → retourne `"bronze"|"argent"|"or"`, documentée et facilement substituable par un vrai calcul backend plus tard.
- **Statut :** À enrichir fortement.

### 5.9 Observatoire National / Cockpit DG
- **Objectif :** dashboard de pilotage macro — 4 blocs : Indicateurs Flash, Pipeline Statutaire, Capital Humain, Vue Matricielle Croisée (sectoriel/institutionnel/territorial) + thermomètre Drapeaux Rouges.
- **Écrans :** `Observatoire.jsx` avec `KpiCard` (volume PME, indice maturité moyen, volume FCFA capté, taux de conversion), `CrossMatrixDashboard` (tableaux croisés secteur × donneur d'ordre × région), `CarteTerritoriale` (répartition régionale — simple carte SVG stylisée du Cameroun, pas besoin de vraie lib GIS pour le prototype).
- **Statut :** À créer entièrement — module le plus stratégique pour l'effet démo.

---

## 6. Design System — directives

- **Ton institutionnel moderne**, pas startup gadget. Garder la palette `brand`/`primary` existante (`#1a1a2e` primary) mais l'enrichir avec des couleurs sémantiques : `success` (vérifié), `warning` (en attente), `danger` (drapeau rouge), `gold/silver/bronze` (indice de confiance).
- Typographie inchangée (Plus Jakarta Sans / Inter) — cohérente avec un rendu gouvernemental sérieux.
- Nouveaux composants UI à ajouter dans `src/components/ui/` : `KpiCard`, `MilestonePipeline`, `TrustBadge`, `RadarChartCard`, `DataTable`, `Timeline`, `FlagIndicator`, `RegionMap`.
- Animations Framer Motion : réservées aux transitions d'état (validation d'étape, apparition de badge, notification de match) — pas de décoration gratuite.
- Dark mode : conserver `ThemeContext`, s'assurer que tous les nouveaux composants (Recharts inclus) respectent la classe `dark`.

---

## 7. AI Service Layer — architecture front (résumé)

Le détail des contrats d'API IA est dans `AI_INTEGRATION_CONTRACT.md`. Côté front :

```
src/services/ai/
├── aiClient.js          # point d'entrée unique, lit VITE_AI_MODE (mock|real)
├── config.js            # VITE_AI_MODE, VITE_AI_GATEWAY_URL, VITE_AI_API_KEY
├── adapters/
│   ├── legalAssistant.js
│   ├── maturityRadar.js
│   ├── matchmakingScoring.js
│   ├── ocrScout.js
│   └── whisperTranscribe.js
└── mocks/
    ├── legalAssistant.mock.js
    ├── maturityRadar.mock.js
    └── ...
```

**Règle non négociable :** un composant React n'appelle jamais un `adapter` directement. Il appelle un hook React Query (`useLegalAssistantChat()`, `useMaturityAnalysis()`, etc.) qui lui-même appelle `aiClient`. Le composant ne sait jamais s'il est en Mode Mock ou Real — seule la variable d'environnement `VITE_AI_MODE` décide. Chaque adapter mock DOIT retourner exactement la même forme de données que son équivalent réel (schéma défini dans le contrat IA), avec un délai simulé (`setTimeout` 500-1500ms) pour un rendu UX réaliste (loaders, skeletons).

**Fallback automatique :** si `VITE_AI_MODE=real` et que l'appel réseau échoue (timeout, 5xx), `aiClient` bascule automatiquement sur l'adapter mock correspondant et ajoute un flag `meta.degraded: true` que l'UI peut afficher discrètement ("Résultat indicatif — service IA temporairement indisponible").

---

## 8. Ordre de développement recommandé

Même si tous les modules sont construits en profondeur, un ordre limite les dépendances cassées :

1. **Fondations** : stores Zustand (auth, theme conservé), React Query provider, services/http, refonte `ProtectedRoute` avec rôles, 4 layouts d'espace.
2. **Design system** : nouveaux composants UI (§6) — tout le reste en dépend visuellement.
3. **AI Service Layer** : squelette + tous les adapters mock (même si Real n'est pas encore branché) — débloque tous les modules IA.
4. **Espace PME** : Profilage/Passeport (5.1), Radar de Maturité (5.5), Academy/Gamification (5.8) — c'est la base la plus riche de l'existant.
5. **Espace Donneur d'Ordre** : Annuaire certifié (5.2), Smart Matchmaking (5.3).
6. **Suivi Tripartite** (5.4) — dépend des AO créés en 5.3.
7. **Espace Agent BSTP** : workflow de validation (audit documentaire, planification terrain) — consomme les données de 5.1 et 5.4.
8. **Hub Communautaire** (5.7), **Assistant Juridique** (5.6).
9. **Observatoire DG** (5.9) — en dernier car il agrège les données de tous les autres modules ; le construire tôt donnerait des KPI vides.

---

## 9. Hors-périmètre (rappel)

- Landing page / site vitrine public : **non concerné**.
- Vrai backend / base de données : **non concerné** — tout reste mock, structuré pour migration future facile.
- Vrais endpoints Hugging Face : développés en parallèle par une autre personne → voir `AI_INTEGRATION_CONTRACT.md`. Le front doit fonctionner intégralement en Mode Mock sans jamais bloquer sur leur disponibilité.
