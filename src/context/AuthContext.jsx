import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { user, isAuthenticated, login, signup, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For dev: inject a default PME user if no one is logged in
    // This maintains compatibility with the existing hardcoded mock
    if (!isAuthenticated) {
      useAuthStore.getState().setDevUser('pme');
    }
    setLoading(false);
  }, [isAuthenticated]);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
