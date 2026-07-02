# Analyse Responsive - Page Détail Parcours

## `/dashboard/parcours/creation`

---

## 🔍 Problèmes Identifiés

### 1. Header Immense (Ligne 234)

```jsx
// PROBLÉMATIQUE
<header className="relative pt-32 pb-48 ...">
```

| Breakpoint | Padding actuel                | Recommandation |
| ---------- | ----------------------------- | -------------- |
| Mobile     | `pt-32 pb-48` (128px + 192px) | `pt-16 pb-24`  |
| Tablet     | `pt-32 pb-48`                 | `pt-24 pb-32`  |
| Desktop    | `pt-32 pb-48`                 | ✓ OK           |

**Impact** : Sur mobile, le header occupe près de 50% de la hauteur d'écran.

---

### 2. Titre H1 Disproportionné (Ligne 249)

```jsx
// PROBLÉMATIQUE
className = "text-6xl md:text-8xl font-black ...";
```

| Breakpoint          | Taille actuelle | Équivalent px | Recommandation |
| ------------------- | --------------- | ------------- | -------------- |
| Mobile (par défaut) | `text-6xl`      | ~60px         | `text-3xl`     |
| Tablet              | `md:text-5xl`   | ~48px         | `md:text-4xl`  |
| Desktop             | `md:text-8xl`   | ~72px         | `lg:text-5xl`  |

**Impact** : Le titre dépasse largement de l'écran sur mobile.

---

### 3. Navigation par Onglets Non Fonctionnelle (PremiumTabs - Ligne 42-71)

```jsx
// PROBLÉMATIQUE
<div className="flex flex-wrap items-center justify-center gap-4 ...">
  <button className="px-6 py-4 ...">
    {" "}
    {/* ← Trop grand pour mobile */}
    <Icon size={18} />
    <span className="text-sm font-bold">{step.label}</span>{" "}
    {/* ← Texte trop long */}
  </button>
</div>
```

**Problèmes :**

- `px-6 py-4` = 24px + 16px par bouton
- 7 onglets × ~70px = ~490px nécessaires
- Écran mobile standard = 375px-428px
- Les labels (`Boîte à outils`, `Informations`, etc.) sont trop longs

**Solutions :**

1. Ajouter un scroll horizontal sur mobile
2. Ou convertir en menu dropdown
3. Ou afficher uniquement l'icône sur mobile

---

### 4. Boutons Précédent/Suivant (Lignes 292-308)

```jsx
// PROBLÉMATIQUE
<div className="flex bg-gray-50 p-2 rounded-2xl border border-gray-100">
    <button className="w-14 h-14 ...">  {/* ← 56px × 56px */}
    <div className="w-px h-10 bg-gray-200 ..." />  {/* Séparateur vertical */}
    <button className="w-14 h-14 ...">
</div>
```

| Breakpoint | Taille actuelle       | Recommandation            |
| ---------- | --------------------- | ------------------------- |
| Mobile     | 56px × 56px           | 44px × 44px               |
| Layout     | `flex-row` uniquement | Stack vertical sur mobile |

---

### 5. Section Titre de l'Étape (Lignes 281-290)

```jsx
// PROBLÉMATIQUE
<motion.span className="text-7xl opacity-10 ...">  {/* ~70px */}
<h2 className="text-5xl font-black ...">  {/* ~48px */}
```

**Sur mobile :**

- `text-7xl` = 75px (numéro surdimensionné)
- `text-5xl` = 48px (titre trop grand)

**Recommandation :** `text-4xl` pour le H2 et `text-6xl` pour le numéro

---

### 6. GlassContainer - Paddings Exessifs (Ligne 27)

```jsx
// PROBLÉMATIQUE
className = "... p-8 rounded-[32px] ...";
```

| Breakpoint | Padding      | Border Radius    | Recommandation        |
| ---------- | ------------ | ---------------- | --------------------- |
| Mobile     | `p-8` (32px) | `rounded-[32px]` | `p-4` / `rounded-2xl` |
| Desktop    | `p-8`        | `rounded-[32px]` | ✓ OK                  |

---

### 7. ResourceCard - Taille sur Mobile (Ligne 74-108)

```jsx
// PROBLÉMATIQUE
className="p-8 rounded-[32px] ..."  // Même problème
<h5 className="text-xl font-bold ...">  // ~20px peut-être OK
```

**Problèmes observés :**

- Padding interne trop grand
- Titre `text-xl` pourrait être réduit à `text-lg` sur mobile
- Espace vertical gaspillé

---

### 8. FormationsCard - Grille Non Adaptée (Lignes 111-151)

```jsx
// PROBLÉMATIQUE
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="p-8 rounded-[32px] ...">
```

| Breakpoint | Colonnes | Gap      | Recommandation |
| ---------- | -------- | -------- | -------------- |
| Mobile     | 1        | 6 (24px) | 1 / gap-4      |
| Tablet     | 1        | 6        | 2 / gap-4      |
| Desktop    | 2        | 6        | ✓ OK           |

---

### 9. PartnersCard - Grille Logo (Ligne 175)

```jsx
// ACTUEL
<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-4">
```

**Problème :** Sur mobile, les logos peuvent dépasser si le contenu est trop large.

---

### 10. Footer Navigation (Lignes 314-337)

```jsx
// PROBLÉMATIQUE
<footer className="mt-24 pt-12 ... flex items-center justify-between">
  <button className="px-6 py-3 ...">Précédent</button>
  <button className="px-10 py-4 ...">Étape suivante</button>
</footer>
```

| Breakpoint | Layout            | Recommandation         |
| ---------- | ----------------- | ---------------------- |
| Mobile     | `justify-between` | Stack vertical, centré |
| Marges     | `mt-24` (96px!)   | `mt-12` sur mobile     |

---

## 📋 Tableau Récapitulatif des Corrections

| #   | Élément             | Problème                 | Fix Priority |
| --- | ------------------- | ------------------------ | ------------ |
| 1   | Header padding      | `pt-32 pb-48` trop grand | 🔴 Haute     |
| 2   | H1 title            | `text-6xl` / `text-8xl`  | 🔴 Haute     |
| 3   | PremiumTabs         | Pas de scroll/hamburger  | 🔴 Haute     |
| 4   | Nav buttons         | `w-14 h-14` trop grand   | 🟠 Moyenne   |
| 5   | Step title          | `text-7xl` / `text-5xl`  | 🟠 Moyenne   |
| 6   | GlassContainer      | `p-8` / `rounded-[32px]` | 🟠 Moyenne   |
| 7   | FormationsCard grid | `gap-6` trop grand       | 🟡 Basse     |
| 8   | Footer              | Marges excessives        | 🟡 Basse     |

---

## 🎯 Plan d'Action Correctif

### Step 1 : Header

```jsx
// Avant
className = "relative pt-32 pb-48 overflow-hidden";

// Après
className =
  "relative pt-16 pb-20 md:pt-24 md:pb-32 lg:pt-32 lg:pb-48 overflow-hidden";
```

### Step 2 : Titre H1

```jsx
// Avant
className = "text-6xl md:text-8xl font-black";

// Après
className = "text-3xl sm:text-4xl lg:text-5xl font-black";
```

### Step 3 : PremiumTabs

```jsx
// Avant
<div className="flex flex-wrap ...">

// Après - Ajouter scroll horizontal
<div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide ...">
```

### Step 4 : Navigation Buttons

```jsx
// Avant
className = "w-14 h-14";

// Après
className = "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14";
```

### Step 5 : Step Title

```jsx
// Avant
className="text-7xl opacity-10"
<h2 className="text-5xl">

// Après
className="text-5xl sm:text-6xl opacity-10"
<h2 className="text-2xl sm:text-3xl lg:text-4xl">
```

### Step 6 : GlassContainer Responsive

```jsx
// Ajouter un props pour responsive ou utiliser des classes conditionnelles
className = "p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-[24px] lg:rounded-[32px]";
```

---

## 💡 Recommandation UX Supplémentaire

Convertir les PremiumTabs en **Scrollable Tabs** avec indicateur visuel :

```jsx
<div className="flex overflow-x-auto snap-x snap-mandatory gap-2 py-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
    <button className="snap-center shrink-0 ...">
```

---

_Ce rapport est spécifique à la page ParcoursDetail accessible via `/dashboard/parcours/creation`_
