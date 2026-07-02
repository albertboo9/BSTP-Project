# Plan de Redesign des Onglets du Parcours

## Contexte
Les onglets actuels (Législation, Point d'Information, Accompagnement, Annuaire, Réseau) nécessitent une amélioration visuelle pour être plus intuitifs et attractifs.

---

## 1. Point d'Information (InfoPointCard)

### Problèmes actuels
- Présentation trop textuelle
- Pas d'illustrations
- Manque de visuels attrayants

### Solution proposée
- Ajouter des icônes illustrées pour chaque point
- Utiliser des couleurs d'alerte (ambre/orange)
- Ajouter des illustrations ou icônes métier
- Structure avec numéroseqüentiel et icônes

### Éléments à améliorer
- Icône d'avertissement plus visible
- Ajouter un niveau de priorité (Critical/Important/Info)
- Bouton d'action vers plus d'informations

---

## 2. Accompagnement (PartnersCard)

### Problèmes actuels
- Juste des logos en grille
- Pas d'informations de contact
- Trop impersonnel

### Solution proposée
- Créer des cartes détaillées avec:
  - Logo de l'organisation
  - Nom et description courte
  - Services proposés
  - Coordonnées (téléphone, email, site)
  - Localisation géographique

### Données à intégrer
- **APME**: https://apme.cm/accueil/
- **CFCE Yaoundé**: +237 22 22 18 73, yaounde@cfce.cm
- **CFCE Douala**: +237 33 42 57 18, douala@cfce.cm
- **CFCE Bafoussam**: +237 33 44 60 09, bafoussam@cfce.cm
- **CFCE Bamenda**: +237 33 36 27 91, bamenda@cfce.cm
- **CFCE Garoua**: +237 22 27 17 10, garoua@cfce.cm
- **CFCE Maroua**: maroua@cfce.cm
- **CFCE Limbe**: limbe@cfce.cm
- **CFCE Ebolowa**: +237 22 28 47 61, ebolowa@cfce.cm

---

## 3. Annuaire (Nouveau: DirectoryCard)

### Solution proposée
Créer un composant d'annuaire professionnel avec:
- Recherche par région/ville
- Catégories d'organismes
- Cartes avec coordonnées complètes
- Boutons d'action (Appeler, Email, Site web)

### Structure de données
```javascript
{
  id: "cfce-yaounde",
  name: "CFCE Yaoundé",
  type: "Centre de Formalités",
  region: "Centre",
  city: "Yaoundé",
  address: "A Côté de la CRTV RADIO",
  phone: "+237 22 22 18 73",
  email: "yaounde@cfce.cm",
  website: null,
  services: ["Création d'entreprise", "Formalités administratives"]
}
```

---

## 4. Réseau/Communauté (SocialCard)

### Problèmes actuels
- Présentation basique
- Manque d'interactivité
- Pas de statistiques

### Solution proposée
- Ajouter des statistiques de la communauté
- Afficher les membres en ligne
- Créer des canaux/thèmes de discussion
- Ajouter des boutons de participation

### Éléments à ajouter
- Nombre de membres actifs
- Nombre de discussions aujourd'hui
- Canaux thématiques (Aide, Partenariat, Événements)
- Bouton "Rejoindre la communauté"

---

## 5. Législation (Resources)

### Éléments à améliorer
- Meilleure organisation des documents
- Ajout de catégories claires
- Icônes par type de document
- Indicateurs de mise à jour

---

## Récapitulatif des composants à créer/modifier

| Composant | Action | Priorité |
|-----------|--------|----------|
| InfoPointCard | Améliorer visuels | Haute |
| PartnersCard | Transformer en cartes détaillées | Haute |
| DirectoryCard | Créer nouveau composant | Haute |
| SocialCard | Redesign complet | Moyenne |
| Resources | Améliorer organisation | Moyenne |

---

## Design Guidelines

### Palette de couleurs
- **Primary**: Indigo (#4F46E5)
- **Secondary**: Purple (#8B5CF6)
- **Alert/Warning**: Amber (#F59E0B)
- **Success**: Green (#10B981)
- **Info**: Blue (#3B82F6)

### Typographie
- **Titres**: Font bold, tracking-tight
- **Sous-titres**: Font black, uppercase, tracking-widest
- **Corps**: Font medium, leading-relaxed

### Interactions
- Hover effects avec scale et shadow
- Animations Framer Motion fluides
- Transitions de 300ms

### Cartes
- Coins arrondis (border-radius: 24px)
- Effets glassmorphism
- Ombres douces
- Bordures subtiles

---

## Prochaines étapes

1. **Phase 1**: Créer le composant DirectoryCard avec données CFCE
2. **Phase 2**: Améliorer PartnersCard avec informations de contact
3. **Phase 3**: Redesign InfoPointCard avec icônes et visuels
4. **Phase 4**: Améliorer SocialCard avec statistiques
5. **Phase 5**: Intégrer les composants dans ParcoursDetail
