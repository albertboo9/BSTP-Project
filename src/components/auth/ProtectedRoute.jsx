import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
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

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    switch (user?.role) {
      case 'pme': return <Navigate to="/dashboard" replace />;
      case 'donneur_ordre': return <Navigate to="/donneur-ordre" replace />;
      case 'agent_bstp': return <Navigate to="/agent" replace />;
      case 'dg': return <Navigate to="/observatoire" replace />;
      default: return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;

