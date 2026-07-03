import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import { ParcoursProvider } from "./context/ParcoursContext";

// Layouts
import PublicLayout from "./components/layout/PublicLayout";
import AuthLayout from "./components/layout/AuthLayout";
import PrivateLayoutPME from "./components/layout/PrivateLayoutPME";
import PrivateLayoutDO from "./components/layout/PrivateLayoutDO";
import PrivateLayoutAgent from "./components/layout/PrivateLayoutAgent";
import PrivateLayoutDG from "./components/layout/PrivateLayoutDG";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "sonner";

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
// PME Module
const DashboardPME = lazy(() => import("./pages/pme/DashboardPME"));
const OnboardingPME = lazy(() => import("./pages/pme/OnboardingPME"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const PasseportPME = lazy(() => import("./pages/pme/passeport/PasseportPME"));
const OpportunitiesPage = lazy(() => import("./pages/pme/OpportunitiesPage"));
const SuiviContratsPage = lazy(() => import("./pages/pme/SuiviContratsPage"));
const AcademyPage = lazy(() => import("./pages/pme/AcademyPage"));
const DashboardParcours = lazy(() => import("./pages/Dashboard/DashboardParcours"));

// DO Module
const DonneurOrdreDashboard = lazy(() => import("./pages/donneur-ordre/DonneurOrdreDashboard"));
const AnnuaireCertifie = lazy(() => import("./pages/donneur-ordre/annuaire/AnnuaireCertifie"));
const PublishOpportunityPage = lazy(() => import("./pages/donneur-ordre/PublishOpportunityPage"));
const SourcingAnalytics = lazy(() => import("./pages/donneur-ordre/SourcingAnalytics"));
const SuiviChantiers = lazy(() => import("./pages/donneur-ordre/SuiviChantiers"));

// DG Module
const DashboardDG = lazy(() => import("./pages/dg/DashboardDG"));
const PipelinePage = lazy(() => import("./pages/dg/PipelinePage"));
const CapitalHumainPage = lazy(() => import("./pages/dg/CapitalHumainPage"));
const VigilancePage = lazy(() => import("./pages/dg/VigilancePage"));

// Agent Module
const DashboardAgent = lazy(() => import("./pages/agent/DashboardAgent"));
const AuditDocumentaire = lazy(() => import("./pages/agent/AuditDocumentaire"));
const PlanificationTerrain = lazy(() => import("./pages/agent/PlanificationTerrain"));
const MediationTripartite = lazy(() => import("./pages/agent/MediationTripartite"));

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

// Placeholders for new pages
const Placeholder = ({ title }) => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{title}</h2>
    <p style={{ color: '#6b7280' }}>Ce module est en cours de construction.</p>
  </div>
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
      {/* ScrollToTop - Réinitialise le scroll au début de chaque page */}
      <ScrollToTop />

      <Toaster 
        position="top-right" 
        toastOptions={{
          style: { borderRadius: '16px', background: '#fff', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
          className: 'font-medium text-sm text-gray-800'
        }} 
      />

      <Suspense fallback={<LoadingSpinner />}>
        <ParcoursProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<TestLogin />} />
              <Route path="/login/partner" element={<LoginPartner />} />
              <Route path="/signup" element={<SignupChoice />} />
              <Route path="/signup/entrepreneur" element={<SignupEntrepreneur />} />
              <Route path="/signup/partner" element={<SignupPartner />} />
            </Route>

            <Route element={<PublicLayout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/home-legacy" element={<Home />} />
              <Route path="/test-login" element={<TestLogin />} />
              <Route path="/test-orbital" element={<TestOrbitalBubbles />} />
              <Route path="/test-redesign" element={<TestOrbitalRedesign />} />
              <Route path="/demo/menus" element={<MenuStylesDemo />} />
              <Route path="/demo/mega-menu" element={<MegaMenuDemo />} />
              <Route path="/parcours" element={<Parcours />} />
              <Route path="/formations" element={<Formations />} />
              <Route path="/partenaires" element={<Partenaires />} />
              <Route path="/ressources/outils-bons-plans" element={<ToolsAndTips />} />
              <Route path="/ressources/informations" element={<InformationCenter />} />
              <Route path="/ressources/annuaire" element={<ProfessionalDirectory />} />
              <Route path="/ressources/innovation" element={<InnovationCompetitivite />} />
              <Route path="/ressources/projets" element={<EntrepreneurProjects />} />
              <Route path="/ressources/communaute" element={<StarterCommunity />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["pme"]}><PrivateLayoutPME /></ProtectedRoute>}>
              <Route path="/dashboard" element={<DashboardPME />} />
              <Route path="/dashboard/onboarding" element={<OnboardingPME />} />
              <Route path="/dashboard/passeport" element={<PasseportPME />} />
              <Route path="/dashboard/opportunites" element={<OpportunitiesPage />} />
              <Route path="/dashboard/suivi-contrat" element={<SuiviContratsPage />} />
              <Route path="/dashboard/academy" element={<AcademyPage />} />
              <Route path="/dashboard/formations" element={<DashboardFormations />} />
              <Route path="/dashboard/parcours" element={<DashboardParcours />} />
              <Route path="/dashboard/profile" element={<DashboardProfile />} />
              <Route path="/dashboard/messages" element={<DashboardMessages />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["donneur_ordre"]}><PrivateLayoutDO /></ProtectedRoute>}>
              <Route path="/donneur-ordre" element={<DonneurOrdreDashboard />} />
              <Route path="/donneur-ordre/annuaire" element={<AnnuaireCertifie />} />
              <Route path="/donneur-ordre/publier" element={<PublishOpportunityPage />} />
              <Route path="/donneur-ordre/analytics" element={<SourcingAnalytics />} />
            <Route path="/donneur-ordre/suivi-chantiers" element={<SuiviChantiers />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["agent_bstp"]}><PrivateLayoutAgent /></ProtectedRoute>}>
              <Route path="/agent" element={<DashboardAgent />} />
              <Route path="/agent/audits" element={<AuditDocumentaire />} />
              <Route path="/agent/terrain" element={<PlanificationTerrain />} />
              <Route path="/agent/mediation" element={<MediationTripartite />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["dg"]}><PrivateLayoutDG /></ProtectedRoute>}>
              <Route path="/observatoire" element={<DashboardDG />} />
              <Route path="/observatoire/pipeline" element={<PipelinePage />} />
              <Route path="/observatoire/capital-humain" element={<CapitalHumainPage />} />
              <Route path="/observatoire/vigilance" element={<VigilancePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ParcoursProvider>
      </Suspense>
    </>
  );
}

export default App;
