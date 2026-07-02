import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Default mock login
      login: (email, password, role = 'pme') => {
        const mockUser = {
          id: "1",
          email,
          firstName: "BO'O",
          lastName: "ALBERT",
          avatar: null,
          role, // pme, donneur_ordre, agent_bstp, dg
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true });
        return mockUser;
      },

      signup: (userData) => {
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          role: userData.role || 'pme',
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isAuthenticated: true });
        return newUser;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setDevUser: (role) => {
        const mockUser = {
          id: "1",
          email: "bo.albert@email.com",
          firstName: "BO'O",
          lastName: "ALBERT",
          avatar: null,
          role: role,
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true });
        return mockUser;
      }
    }),
    {
      name: 'nexus_auth_storage',
    }
  )
);
