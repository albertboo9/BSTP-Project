export const mockUser = {
  id: "usr_001",
  firstName: "Marie",
  lastName: "Dupont",
  email: "marie.dupont@email.cm",
  type: "entrepreneur_novice",
  status: "en_cours",
  createdAt: "2024-01-15",
  avatar: null,
  progression: {
    globale: 35,
  },
  stats: {
    parcoursCompleted: 1,
    formationsCompleted: 3,
    certifications: 1,
  },
};

export const mockUserAdvanced = {
  ...mockUser,
  type: "entrepreneur_etabli",
  progression: {
    globale: 75,
  },
  stats: {
    parcoursCompleted: 3,
    formationsCompleted: 8,
    certifications: 2,
  },
};
