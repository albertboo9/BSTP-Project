# 📋 PLAN TECHNIQUE DÉTAILLÉ - Phase Implémentation STARTERKITCM

---

## 1. Stack Technique Complète

### 1.1 Packages NPM Recommandés

```json
{
  "dependencies": {
    // Framework
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",

    // Styling & UI
    "framer-motion": "^10.16.0",
    "clsx": "^2.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",

    // Icons (Professionnel, pas d'emoji)
    "lucide-react": "^0.294.0",
    "react-icons": "^4.12.0",

    // Animation premium
    "lottie-react": "^2.4.0",

    // Utils
    "react-helmet-async": "^1.3.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

### 1.2 Design System Tailwind + Framer Motion

```javascript
// tailwind.config.js (suggestion)
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#1E3A5F",
          green: "#2E7D32",
        },
        secondary: {
          amber: "#F9A825",
          gray: "#607D8B",
        },
        background: {
          cream: "#FAFAFA",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
```

---

## 2. Structure du Projet

```
starterkitcm/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── illustrations/
│   │   └── avatar/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Input.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── assistant/
│   │   │   ├── Avatar.jsx
│   │   │   ├── AssistantModal.jsx
│   │   │   └── AssistantBubble.jsx
│   │   └── parcours/
│   │       ├── Timeline.jsx
│   │       ├── StepCard.jsx
│   │       └── ProgressRing.jsx
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   └── CTASection.jsx
│   │   ├── Dashboard/
│   │   │   ├── Stats.jsx
│   │   │   └── ParcoursList.jsx
│   │   ├── Formation/
│   │   │   └── FormationCard.jsx
│   │   └── Certification/
│   │       └── Certificate.jsx
│   ├── hooks/
│   │   ├── useScroll.js
│   │   ├── useParcours.js
│   │   └── useAssistant.js
│   ├── data/
│   │   ├── user.mock.js
│   │   ├── parcours.mock.js
│   │   └── formations.mock.js
│   ├── styles/
│   │   ├── index.css
│   │   └── animations.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 3. Composants Clés - Spécifications

### 3.1 Bouton Premium (Stripe-like)

```jsx
// components/ui/Button.jsx
import { motion } from "framer-motion";
import { clsx } from "clsx";

const variants = {
  primary: "bg-primary-blue text-white hover:bg-blue-700",
  secondary: "bg-primary-green text-white hover:bg-green-700",
  outline: "border-2 border-primary-blue text-primary-blue hover:bg-blue-50",
  ghost: "text-primary-blue hover:bg-blue-50",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon && iconPosition === "left" && <Icon className="w-5 h-5 mr-2" />}
      {children}
      {icon && iconPosition === "right" && <Icon className="w-5 h-5 ml-2" />}
    </motion.button>
  );
}
```

### 3.2 Assistant Avatar (Lottie + Framer Motion)

```jsx
// components/assistant/Avatar.jsx
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import breathingAnimation from "../../assets/lottie/avatar-breathing.json";

export function Avatar({ state = "idle", size = "md" }) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const stateColors = {
    idle: "#1E3A5F",
    welcome: "#2E7D32",
    waiting: "#F9A825",
    success: "#27AE60",
  };

  return (
    <motion.div
      className={clsx("relative rounded-full", sizeClasses[size])}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Avatar SVG или Lottie */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Forme de l'avatar - semi-humanoïde */}
        <circle cx="50" cy="35" r="25" fill={stateColors[state]} />
        <path d="M20 100 Q50 70 80 100" fill={stateColors[state]} />
      </svg>
    </motion.div>
  );
}
```

### 3.3 Timeline Progress (Linear-like)

```jsx
// components/parcours/Timeline.jsx
import { motion } from "framer-motion";
import { CheckCircle, Lock, Circle } from "lucide-react";
import { clsx } from "clsx";

export function Timeline({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between w-full py-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          {/* Step Circle */}
          <motion.div
            initial={false}
            animate={{
              scale: index === currentStep ? 1.1 : 1,
            }}
            className={clsx(
              "relative flex items-center justify-center w-12 h-12 rounded-full",
              index < currentStep && "bg-primary-green",
              index === currentStep && "bg-primary-blue ring-4 ring-blue-100",
              index > currentStep && "bg-gray-200",
            )}
          >
            {index < currentStep ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : index > currentStep ? (
              <Lock className="w-5 h-5 text-gray-400" />
            ) : (
              <Circle className="w-6 h-6 text-primary-blue" />
            )}
          </motion.div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: index < currentStep ? 1 : 0 }}
              className={clsx(
                "flex-1 h-1 mx-2",
                index < currentStep ? "bg-primary-green" : "bg-gray-200",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 4. Copywriting Professionnel (Français)

### 4.1 Landing Page

```jsx
// pages/Home/Hero.jsx
const HERO_CONTENT = {
  title: {
    main: "Entreprenez en toute confiance",
    subtitle: "sur la plateforme officielle des entrepreneurs du Cameroun",
  },
  description: {
    main: "Orientation, accompagnement et certification des parcours entrepreneuriaux",
    sub: "en partenariat avec le Ministère de la Petite et Moyenne Entreprise",
  },
  cta: {
    primary: "Démarrer mon parcours",
    secondary: "Découvrir la plateforme",
  },
};

// Usage
<h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-blue">
  {HERO_CONTENT.title.main}
  <span className="block text-primary-green mt-2">
    {HERO_CONTENT.title.subtitle}
  </span>
</h1>;
```

### 4.2 Assistant Messages

```jsx
const ASSISTANT_MESSAGES = {
  welcome: {
    title: "Bonjour !",
    message:
      "Je suis votre guide STARTER. Je suis là pour vous accompagner tout au long de votre parcours entrepreneurial.",
    cta: ["Commencer la découverte", "Voir mes parcours"],
  },
  orientation: {
    title: "Que souhaitez-vous faire aujourd'hui ?",
    message: "Voici les parcours recommandés selon votre profil.",
    cta: ["Me sensibiliser", "Créer mon entreprise", "Me former"],
  },
  success: {
    title: "Félicitations !",
    message: "Vous avez validé cette étape de votre parcours.",
    cta: ["Continuer", "Voir ma progression"],
  },
};
```

---

## 5. Optimisations Performance

### 5.1 Configuration Vite

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "framer-motion": ["framer-motion"],
          "ui-components": ["lucide-react", "clsx"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ["framer-motion", "react-router-dom"],
  },
});
```

### 5.2 Lazy Loading

```jsx
// App.jsx
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Formation = lazy(() => import("./pages/Formation/Formation"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/formations" element={<Formation />} />
      </Routes>
    </Suspense>
  );
}
```

### 5.3 Images Optimisées

```jsx
// Utiliser Next.js Image ou standard HTML avec lazy loading
<img
  src="/images/hero/entrepreneur-hero.jpg"
  alt="Entrepreneur camerounais"
  loading="lazy"
  decoding="async"
  className="w-full h-auto object-cover"
/>
```

---

## 6. Responsive Design - Breakpoints

```css
/* tailwind.config.js - extend theme */
theme: {
  screens: {
    'xs': '475px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
}
```

### Exemple Responsive Grid

```jsx
// Composant Features
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
  {/* Cards responsive */}
</div>
```

---

## 7. Déploiement Vercel

### 7.1 Configuration vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 7.2 Variables d'Environnement

```
# .env.local
VITE_API_URL=https://api.starterkitcm.cm
VITE_ANALYTICS_ID=UA-XXXXXXXXX
```

---

## 8. Checklist Avant Déploiement

```
Performance
├── Lighthouse score > 90
├── Images optimisées (WebP)
├── Code splitting activé
├── bundle analyzed < 200KB
└── CLS < 0.1

Responsive
├── Mobile (< 475px)
├── Tablet (768px)
├── Desktop (1280px)
├── Large (1536px)
└── Touch interactions

SEO
├── Meta tags
├── Open Graph
├── Sitemap
└── Robots.txt

Accessibilité
├── Contraste WCAG AA
├── Navigation clavier
├── ARIA labels
└── Focus states
```

---

## 9. Inspirations Visuelles à Intégrer

| Plateforme                 | Élément à Reproduire                                     |
| -------------------------- | -------------------------------------------------------- |
| **Stripe**                 | Gradients subtils, Cards shadow, Micro-interactions      |
| **Linear**                 | Typography impeccable, Spacing cohérent, Dark/Light mode |
| **Notion**                 | Hierarchy visuelle, Progression blocks, Simplicité       |
| **Lando Norris Portfolio** | Animations fluides, Scroll reveals, Typography imposante |

---

## ✅ CONCLUSION

Ce plan technique est **complet et prêt** pour le passage en phase de développement. Toutes les contraintes sont intégrées :

✅ Packages npm professionnels sélectionnés  
✅ Design System Tailwind + Framer Motion  
✅ Icônes Lucide (professionnel, pas d'emoji)  
✅ Copywriting français soigné  
✅ Optimisations performance Vercel  
✅ Responsive-first design  
✅ Inspiré de Stripe/Linear/Notion
