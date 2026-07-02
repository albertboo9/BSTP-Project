# Plan de Mise à Jour - Contenus MINPMEESA (Complet)

## Analyse du DOSSIER_MINPMEESA

---

## 1. Structure des 3 Parcours

### 1.1 PARCOURS CRÉATION D'ENTREPRISE

**Dossier**: `DOSSIER_MINPMEESA/PARCOURS CREATION D_ENTREPRISE/`

| Sous-dossier               | Contenu          | Fichiers                                                                                                        |
| -------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| **Boîte à outils**         |                  |                                                                                                                 |
| └ Vidéos                   | Vidéo principale | `Mon entreprise en 72H.mp4`                                                                                     |
| └ Articles                 | Guide            | `Créer son entreprise au Cameroun en 72 heures.pdf`                                                             |
| └ Documents                | 4 documents      | `STATUTS SARL.pdf`, `modèle statut SNC.pdf`, `modele-statuts-ohada-sas.pdf`, `notifications-d_une-citation.pdf` |
| **Formation**              | Liens formations | `liens des formation création d'entreprise .pdf`                                                                |
| **Points d'interrogation** |                  |                                                                                                                 |
| └ Documents                | 3 documents      | `loipme2015.pdf`, `les formes d'entreprise.docx`, `liste-des-mtiers-artisanaux.pdf`                             |
| **Annuaire**               | Partenaires      | `Coordonnées des parties prenants.pdf`                                                                          |

### 1.2 PARCOURS FINANCEMENT

**Dossier**: `DOSSIER_MINPMEESA/PARCOURS FINANCEMENT/`

| Sous-dossier             | Contenu | Fichiers                               |
| ------------------------ | ------- | -------------------------------------- |
| **Points d'information** |         |                                        |
| └ Documents              | 2 PDFs  | `pacdpme.pdf`, `pmeesa3.pdf`           |
| **Boîte à outils**       |         |                                        |
| └ Documents              | Guide   | `Guide-daccompagnement-des-PME....pdf` |
| └ Articles               |         | `les-banques-PME.docx`                 |

### 1.3 PARCOURS NORMALISATION

**Dossier**: `DOSSIER_MINPMEESA/PARCOURS NORMALISATION /`

| Sous-dossier              | Contenu     | Fichiers                                                                             |
| ------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| **Boîte à outils**        |             |                                                                                      |
| └ Vidéos                  | Procédure   | `Procedure de certification.mp4`                                                     |
| └ Documents               | 3 documents | `demande-de-certification.docx`, `questionnaire-enquete.pdf`, `tarifaire.pdf`        |
| **Annuaire**              | Contact     | `Coordonnées des parties prenantes.docx`                                             |
| **Formations**            |             | `Formations Normalisation.docx`                                                      |
| **Points d'informations** |             |                                                                                      |
| └ Documents               | 2 PDFs      | `Decret de creation et fonctionnement ANOR.pdf`, `Loi_1996_sur_la_normalisation.pdf` |

---

## 2. Images PREVIEW Identifiées

### Création d'Entreprise

| Chemin                                        | Description           |
| --------------------------------------------- | --------------------- |
| `Boîte à outils/.../preview.png`              | Preview vidéo         |
| `Boîte à outils/articles/preview.png`         | Preview article       |
| `Boîte à outils/Documents/preview_SRL.png`    | Preview Statuts SARL  |
| `Boîte à outils/Documents/preview_SNC.png`    | Preview SNC           |
| `Boîte à outils/Documents/preview_ohd.png`    | Preview OHADA         |
| `Boîte à outils/Documents/preview_notifs.png` | Preview Notifications |
| `Points d_interrogation/preview_loipme.png`   | Preview Loi PME       |
| `Points d_interrogation/preview_liste.png`    | Preview Liste métiers |

### Financement

| Chemin                                              | Description       |
| --------------------------------------------------- | ----------------- |
| `Points d_information/Documents/preview_pcdpme.png` | Preview PACDPME   |
| `Points d_information/Documents/preview_pmees3.png` | Preview PMEE3     |
| `Boite à outils/documents/preview_guide_pme.png`    | Preview Guide PME |

---

## 3. Correspondance avec le Code Actuel

### Fichiers à mettre à jour:

- `src/data/parcours.mock.js` — Données des parcours
- `src/pages/Dashboard/ParcoursDetail.jsx` — Page détail

### Mappage Parcours → Dossiers:

| ID Parcours     | Dossier MINPMEESA                 | Étapes                                                               |
| --------------- | --------------------------------- | -------------------------------------------------------------------- |
| `creation`      | `PARCOURS CREATION D_ENTREPRISE/` | toolbox, info, formations, partners, social                          |
| `financement`   | `PARCOURS FINANCEMENT/`           | toolbox, info, formations, partners, projects, opportunities, social |
| `normalisation` | `PARCOURS NORMALISATION /`        | toolbox, info, formations, partners, social                          |

---

## 4. Actions à Réaliser

### Phase 1: Mettre à jour les Toolbox (Documents & Vidéos)

**Création d'Entreprise:**

- [ ] `toolbox[0]` = STATUTS SARL.pdf → `/DOSSIER_MINPMEESA/PARCOURS CREATION D_ENTREPRISE/Boite à outils création d_entreprise /Documents téléchargeables/STATUTS SARL.pdf`
- [ ] `toolbox[1]` = Modèle OHADA SAS → `/.../modele-statuts-ohada-sas.pdf`
- [ ] `toolbox[2]` = Mon entreprise en 72H → `/.../Vidéos/Mon entreprise en 72H.mp4`
- [ ] Ajouter: notifications-d-une-citation.pdf
- [ ] Ajouter: modèle statut SNC.pdf

**Financement:**

- [ ] `toolbox[0]` = Guide d'accompagnement PME → `/.../Guide-daccompagnement-des-PME....pdf`
- [ ] Ajouter: les-banques-PME.docx

**Normalisation:**

- [ ] `toolbox[0]` = Procédure certification → `/.../Procedure de certification.mp4`
- [ ] Ajouter: demande-de-certification.docx
- [ ] Ajouter: tarifaire.pdf

### Phase 2: Mettre à jour les Points d'Info

**Création:**

- [ ] Ajouter: loipme2015.pdf
- [ ] Ajouter: les formes d'entreprise.docx
- [ ] Ajouter: liste-des-metiers-artisanaux.pdf

**Financement:**

- [ ] Ajouter: pacdpme.pdf
- [ ] Ajouter: pmeesa3.pdf

**Normalisation:**

- [ ] Ajouter: Decret ANOR
- [ ] Ajouter: Loi 1996 normalisation
- [ ] Ajouter: Etapes d'élaboration...

### Phase 3: Intégrer les Images Preview

Pour chaque document, ajouter le chemin vers l'image preview correspondante.

---

## 5. Structure Mock Recommandée

```javascript
// Mise à jour de parcours.mock.js

creation: {
  toolbox: [
    {
      id: "t1",
      title: "Statuts Type SARL",
      type: "pdf",
      url: "/DOSSIER_MINPMEESA/PARCOURS CREATION D_ENTREPRISE/Boite à outils/Documents/STATUTS SARL.pdf",
      preview: "/DOSSIER_MINPMEESA/.../preview_SRL.png",
    },
    {
      id: "t2",
      title: "Modèle OHADA SAS",
      type: "pdf",
      url: "/.../modele-statuts-ohada-sas.pdf",
      preview: "/.../preview_ohd.png",
    },
    {
      id: "t3",
      title: "Mon entreprise en 72H",
      type: "video",
      url: "/.../Mon entreprise en 72H.mp4",
      preview: "/.../preview.png",
    },
    // ... autres documents
  ];
}
```

---

_Document généré depuis l'analyse de DOSSIER_MINPMEESA_
_Date: Mars 2026_
