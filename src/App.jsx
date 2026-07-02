import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import { ParcoursProvider } from "./context/ParcoursContext";

// Layouts
import PublicLayout from "./components/layout/PublicLayout";
import AuthLayout from "./components/layout/AuthLayout";
import PrivateLayout from "./components/layout/PrivateLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home/Home"));
const TestOrbitalBubbles = lazy(() => import("./pages/TestOrbitalBubbles"));
// Auth pages (nouveau design multi-step)
const Login = lazy(() => import("./pages/Auth/Login"));
const LoginPartner = lazy(() => import("./pages/Auth/LoginPartner"));
const SignupChoice = lazy(() => import("./pages/Auth/SignupChoice"));
const SignupEntrepreneur = lazy(
  () => import("./pages/Auth/SignupEntrepreneur"),
);
const SignupPartner = lazy(() => import("./pages/Auth/SignupPartner"));

// Test pages
const MenuStylesDemo = lazy(() => import("./pages/MenuStylesDemo"));
const MegaMenuDemo = lazy(() => import("./pages/MegaMenuDemo"));
const TestAuth = lazy(() => import("./pages/Auth/TestAuth"));
const TestLogin = lazy(() => import("./pages/Auth/TestLogin"));
const TestOrbitalRedesign = lazy(() => import("./pages/TestOrbitalRedesign"));
// Legacy signup (à supprimer après migration)
// const Signup = lazy(() => import("./pages/Auth/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const DashboardParcours = lazy(
  () => import("./pages/Dashboard/DashboardParcours"),
);
const ParcoursDetail = lazy(
  () => import("./pages/Dashboard/ParcoursDetail"),
);
const DashboardProfile = lazy(
  () => import("./pages/Dashboard/DashboardProfile"),
);
const DashboardFormations = lazy(
  () => import("./pages/Dashboard/DashboardFormations"),
);
const DashboardDocuments = lazy(
  () => import("./pages/Dashboard/DashboardDocuments"),
);
const DashboardMessages = lazy(
  () => import("./pages/Dashboard/DashboardMessages"),
);
const DashboardProjects = lazy(
  () => import("./pages/Dashboard/DashboardProjects"),
);
const Parcours = lazy(() => import("./pages/Parcours/Parcours"));
const Formations = lazy(() => import("./pages/Formations/Formations"));
const Certification = lazy(() => import("./pages/Certification/Certification"));
const Partenaires = lazy(() => import("./pages/Partenaires/Partenaires"));
const Upload = lazy(() => import("./pages/Upload/Upload"));
const Assistant = lazy(() => import("./components/assistant/Assistant"));

// Resources pages
const ToolsAndTips = lazy(() => import("./pages/ressources/ToolsAndTips"));
const InformationCenter = lazy(
  () => import("./pages/ressources/InformationCenter"),
);
const ProfessionalDirectory = lazy(
  () => import("./pages/ressources/ProfessionalDirectory"),
);
const InnovationCompetitivite = lazy(
  () => import("./pages/ressources/InnovationCompetitivite"),
);
const EntrepreneurProjects = lazy(
  () => import("./pages/ressources/EntrepreneurProjects"),
);
const StarterCommunity = lazy(
  () => import("./pages/ressources/StarterCommunity"),
);

// Loading component
function LoadingSpinner() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fa",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid #e5e7eb",
          borderTopColor: "#635bff",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

// ScrollToTop - Réinitialise le scroll au début de chaque page
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>STARTERKITCM - Portail de l'Entrepreneuriat Camerounais</title>
      </Helmet>

      {/* ScrollToTop - Réinitialise le scroll au début de chaque page */}
      <ScrollToTop />

      <Suspense fallback={<LoadingSpinner />}>
        <ParcoursProvider>
          <Routes>
          <Route element={<AuthLayout />}>
            {/* Auth Routes - Nouveau Design */}
            <Route path="/login" element={<TestLogin />} />
            <Route path="/login/partner" element={<LoginPartner />} />
            <Route path="/signup" element={<SignupChoice />} />
            <Route
              path="/signup/entrepreneur"
              element={<SignupEntrepreneur />}
            />
            <Route path="/signup/partner" element={<SignupPartner />} />
          </Route>

          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/test-login" element={<TestLogin />} />
            <Route path="/test-orbital" element={<TestOrbitalBubbles />} />
            <Route path="/test-redesign" element={<TestOrbitalRedesign />} />
            <Route path="/demo/menus" element={<MenuStylesDemo />} />
            <Route path="/demo/mega-menu" element={<MegaMenuDemo />} />
            <Route path="/parcours" element={<Parcours />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/partenaires" element={<Partenaires />} />

            {/* Resources Routes */}
            <Route
              path="/ressources/outils-bons-plans"
              element={<ToolsAndTips />}
            />
            <Route
              path="/ressources/informations"
              element={<InformationCenter />}
            />
            <Route
              path="/ressources/annuaire"
              element={<ProfessionalDirectory />}
            />
            <Route
              path="/ressources/innovation"
              element={<InnovationCompetitivite />}
            />
            <Route
              path="/ressources/projets"
              element={<EntrepreneurProjects />}
            />
            <Route
              path="/ressources/communaute"
              element={<StarterCommunity />}
            />
          </Route>

          {/* Private Routes */}
          <Route
            element={
              <ProtectedRoute>
                <PrivateLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/parcours" element={<DashboardParcours />} />
            <Route path="/dashboard/parcours/:id" element={<ParcoursDetail />} />
            <Route
              path="/dashboard/formations"
              element={<DashboardFormations />}
            />
            <Route path="/dashboard/profile" element={<DashboardProfile />} />
            <Route
              path="/dashboard/documents"
              element={<DashboardDocuments />}
            />
            <Route path="/dashboard/messages" element={<DashboardMessages />} />
            <Route
              path="/dashboard/projects"
              element={<DashboardProjects />}
            />
            <Route
              path="/dashboard/certification"
              element={<Certification />}
            />
            <Route path="/certification" element={<Certification />} />
            <Route path="/upload" element={<Upload />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </ParcoursProvider>
      </Suspense>
    </>
  );
}

export default App;
