# Architecture Technique - Système de Visionnage Documents/Vidéos
## Approche Mixte: Preview + Modal avec Viewer + Download

---

## 1. Vue d'Ensemble de l'Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      PAGE PARCOURS DETAIL                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Cards     │  │   Cards     │  │   Cards     │           │
│  │  (Toolbox)  │  │  (Toolbox)  │  │  (Toolbox)  │           │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘           │
└─────────┼────────────────┼────────────────┼────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RESOURCE MODAL (AnimatePresence)             │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    ZONE VISUALISATION                      ││
│  │  ┌─────────────────────────────────────────────────────┐   ││
│  │  │  IMAGE VIEWER     → Pour images preview            │   ││
│  │  │  PDF VIEWER       → Pour PDF (react-pdf)          │   ││
│  │  │  VIDEO PLAYER     → Pour vidéos (react-player)     │   ││
│  │  │  WORD VIEWER      → Pour DOCX (mammoth + render)   │   ││
│  │  └─────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    ZONE INFORMATIONS                        ││
│  │  Titre | Description | Bouton Download                     ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Packages NPM Requis

### Packages principaux (Viewer)

| Package | Fonction | Type de fichier |
|---------|----------|-----------------|
| `react-pdf` | Afficher PDFs | `.pdf` |
| `react-player` | Lecteur vidéo | `.mp4`, YouTube, Vimeo |
| `mammoth` | Convertir DOCX en HTML | `.docx` |
| `pdfjs-dist` | Required par react-pdf | - |

### Installation

```bash
npm install react-pdf react-player mammoth pdfjs-dist
```

---

## 3. Structure des Composants

### 3.1 ResourceViewerModal.jsx

```jsx
// Nouveau composant à créer
// src/components/parcours/ResourceViewerModal.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';
import { Document, Page, pdfjs } from 'react-pdf';
import mammoth from 'mammoth';

// Configurer PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function ResourceViewerModal({ resource, isOpen, onClose }) {
  if (!isOpen || !resource) return null;

  const renderViewer = () => {
    switch (resource.type) {
      case 'video':
        return <VideoViewer url={resource.url} />;
      case 'pdf':
        return <PDFViewer url={resource.url} />;
      case 'docx':
        return <WordViewer url={resource.url} />;
      case 'image':
        return <ImageViewer url={resource.url} />;
      default:
        return <DefaultViewer />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100] bg-black/80...">
        <motion.div className="bg-white rounded-[40px] overflow-hidden...">
          {/* Zone Visualisation */}
          <div className="flex-1...">
            {renderViewer()}
          </div>
          
          {/* Zone Informations + Download */}
          <div className="w-80 p-10...">
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.url} download className="btn-download">
              <Download /> Télécharger
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

### 3.2 Viewers individuels

```jsx
// VideoViewer
function VideoViewer({ url }) {
  return (
    <div className="w-full h-full bg-black">
      <ReactPlayer 
        url={url} 
        width="100%" 
        height="100%" 
        controls 
        playing
      />
    </div>
  );
}

// PDFViewer
function PDFViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  
  return (
    <Document
      file={url}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}

// WordViewer (convertit DOCX en HTML)
function WordViewer({ url }) {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => mammoth.convertToHtml({ arrayBuffer }))
      .then(result => setContent(result.value));
  }, [url]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// ImageViewer
function ImageViewer({ url }) {
  return <img src={url} alt="Preview" className="max-w-full max-h-full object-contain" />;
}
```

---

## 4. Intégration dans ParcoursDetail

### Modification du renderStepContent

```jsx
// src/pages/Dashboard/ParcoursDetail.jsx

import { ResourceViewerModal } from '../../components/parcours/ResourceViewerModal';

function ParcoursDetail() {
  const [viewingResource, setViewingResource] = useState(null);

  const renderStepContent = (stepId) => {
    switch (stepId) {
      case 'toolbox':
        return (
          <BentoGrid>
            {parcours.toolbox?.map((tool) => (
              <ResourceCard 
                item={tool} 
                onClick={setViewingResource}  // Ouvre le modal
              />
            ))}
          </BentoGrid>
        );
      // ... autres cas
    }
  };

  return (
    <>
      {/* Contenu principal */}
      {renderStepContent(...)}

      {/* Modal de visualisation */}
      <ResourceViewerModal 
        resource={viewingResource}
        isOpen={!!viewingResource}
        onClose={() => setViewingResource(null)}
      />
    </>
  );
}
```

---

## 5. Structure des Données (parcours.mock.js)

```javascript
// Mise à jour du format des données

toolbox: [
  {
    id: "t1",
    title: "Statuts Type SARL",
    type: "pdf",  // pdf | video | docx | image
    url: "/DOSSIER_MINPMEESA/PARCOURS CREATION/.../STATUTS SARL.pdf",
    preview: "/DOSSIER_MINPMEESA/.../preview_SRL.png",
    description: "Modèle standard pour la création d'une SARL au Cameroun.",
    duration: null,  // Pour vidéos uniquement
    fileSize: "245 KB"  // Optionnel
  },
  {
    id: "v1",
    title: "Mon entreprise en 72H",
    type: "video",
    url: "/DOSSIER_MINPMEESA/.../Mon entreprise en 72H.mp4",
    preview: "/DOSSIER_MINPMEESA/.../preview.png",
    description: "Guide vidéo pour créer votre entreprise rapidement.",
    duration: "05:12"
  }
]
```

---

## 6. Gestion des Chemins de Fichiers

### Option A: Fichiers locaux (Vercel - actuel)
```javascript
url: "/DOSSIER_MINPMEESA/PARCOURS CREATION/.../fichier.pdf"
```

### Option B: CDN externe (futur VPS)
```javascript
url: "https://cdn.minpmeesa.cm/documents/creation/STATUTS-SARL.pdf"
```

### Option C: API route (recommandé pour performance)
```javascript
// Route API qui sert les fichiers
url: "/api/resources?parcours=creation&file=statuts-sarl"
```

---

## 7. Flux Utilisateur

```
1. Utilisateur arrive sur page parcours
   │
   ▼
2. Voit les cards avec previews (images)
   │
   ▼
3. Clique sur une card
   │
   ▼
4. Modal s'ouvre avec:
   ├─ Zone visuelle: Aperçu/document/vidéo
   ├─ Titre + Description
   ├─ Bouton: Regarder/Lire (si viewer dispo)
   └─ Bouton: Télécharger (toujours dispo)
   │
   ▼
5. Fermeture: Clic X, clic hors modal, ou touche Escape
```

---

## 8. Points d'Attention

### Performance
- Lazy loading des viewers (ne charger que si nécessaire)
- Utiliser `react.lazy()` pour les composants lourds
- Précharger les previews mais pas les documents complets

### Accessibilité
- Navigation clavier (Escape pour fermer)
- ARIA labels sur les boutons
- Alternatives textuelles pour images

### Types de fichiers supportés
| Type | Viewer | Fallback |
|------|--------|----------|
| PDF | react-pdf | Lien download |
| MP4 | react-player | - |
| DOCX | mammoth → HTML | Lien download |
| PNG/JPG | img tag | - |

---

## 9. Prochaines Étapes d'Implémentation

1. **Installer les packages npm**
2. **Créer le composant ResourceViewerModal**
3. **Créer les viewers individuels**
4. **Mettre à jour parcours.mock.js** avec tous les vrais fichiers
5. **Tester avec les fichiers du DOSSIER_MINPMEESA**

---

*Document d'architecture technique*
*Date: Mars 2026*