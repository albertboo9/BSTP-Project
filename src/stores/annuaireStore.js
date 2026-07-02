import { create } from 'zustand';

const mockPmes = [
  {
    id: 'pme-1',
    name: 'Alpha Tech',
    sector: 'BTP & Tech',
    location: 'Douala',
    score: 78,
    isPremium: false,
    status: 'Vérifié',
    description: 'Expert en solutions technologiques pour le BTP. Fournisseur de capteurs IoT et logiciels de suivi de chantier.',
    scores: [
      { subject: 'Juridique', A: 15, fullMark: 20 },
      { subject: 'Fiscal', A: 18, fullMark: 20 },
      { subject: 'Social (CNPS)', A: 20, fullMark: 20 },
      { subject: 'Technique', A: 14, fullMark: 20 },
      { subject: 'Financier', A: 18, fullMark: 20 },
      { subject: 'Qualité', A: 10, fullMark: 20 },
    ],
  },
  {
    id: 'pme-2',
    name: 'Bati Plus',
    sector: 'BTP',
    location: 'Yaoundé',
    score: 95,
    isPremium: true,
    status: 'Certifié Elite',
    description: 'Leader régional dans la construction de structures métalliques et génie civil. Plus de 20 ans d\'expérience.',
    scores: [
      { subject: 'Juridique', A: 20, fullMark: 20 },
      { subject: 'Fiscal', A: 20, fullMark: 20 },
      { subject: 'Social (CNPS)', A: 20, fullMark: 20 },
      { subject: 'Technique', A: 18, fullMark: 20 },
      { subject: 'Financier', A: 19, fullMark: 20 },
      { subject: 'Qualité', A: 18, fullMark: 20 },
    ],
  },
  {
    id: 'pme-3',
    name: 'Tech Solutions',
    sector: 'Informatique',
    location: 'Douala',
    score: 85,
    isPremium: true,
    status: 'Vérifié',
    description: 'Développement de logiciels sur mesure, cybersécurité et infogérance pour grands comptes.',
    scores: [
      { subject: 'Juridique', A: 18, fullMark: 20 },
      { subject: 'Fiscal', A: 18, fullMark: 20 },
      { subject: 'Social (CNPS)', A: 18, fullMark: 20 },
      { subject: 'Technique', A: 17, fullMark: 20 },
      { subject: 'Financier', A: 16, fullMark: 20 },
      { subject: 'Qualité', A: 15, fullMark: 20 },
    ],
  },
  {
    id: 'pme-4',
    name: 'Global Services',
    sector: 'Logistique',
    location: 'Kribi',
    score: 45,
    isPremium: false,
    status: 'À compléter',
    description: 'Transport maritime et logistique internationale. Hub portuaire de Kribi.',
    scores: [
      { subject: 'Juridique', A: 10, fullMark: 20 },
      { subject: 'Fiscal', A: 10, fullMark: 20 },
      { subject: 'Social (CNPS)', A: 5, fullMark: 20 },
      { subject: 'Technique', A: 15, fullMark: 20 },
      { subject: 'Financier', A: 5, fullMark: 20 },
      { subject: 'Qualité', A: 5, fullMark: 20 },
    ],
  }
];

export const useAnnuaireStore = create((set, get) => ({
  pmes: mockPmes,
  filteredPmes: mockPmes,
  searchQuery: '',
  selectedSector: 'Tous',
  minScore: 0,
  selectedPme: null,

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSector: (sector) => {
    set({ selectedSector: sector });
    get().applyFilters();
  },

  setMinScore: (score) => {
    set({ minScore: score });
    get().applyFilters();
  },

  setSelectedPme: (pme) => {
    set({ selectedPme: pme });
  },

  applyFilters: () => {
    const { pmes, searchQuery, selectedSector, minScore } = get();
    
    let result = pmes;

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || p.sector.toLowerCase().includes(q)
      );
    }

    // Sector
    if (selectedSector !== 'Tous') {
      result = result.filter(p => p.sector.includes(selectedSector));
    }

    // Min Score
    if (minScore > 0) {
      result = result.filter(p => p.score >= minScore);
    }

    set({ filteredPmes: result });
  }
}));
