import { create } from 'zustand';

export const useDgStore = create((set) => ({
  stats: {
    totalPme: 450,
    certifiedPme: 142,
    averageMaturity: 68,
    activeDo: 15,
    consultationsThisMonth: 84
  },
  
  activities: [
    { id: 1, type: 'certification', message: 'La PME "Alpha Tech" a atteint 80% de maturité.', time: 'Il y a 10 min', icon: 'shield' },
    { id: 2, type: 'consultation', message: 'TotalEnergies a consulté le profil de "Bati Plus".', time: 'Il y a 1 heure', icon: 'search' },
    { id: 3, type: 'document', message: '12 nouveaux documents fiscaux ont été uploadés par des PME.', time: 'Il y a 3 heures', icon: 'file' },
    { id: 4, type: 'registration', message: 'Nouvelle PME inscrite : "Global Services" (Logistique).', time: 'Hier', icon: 'user' }
  ],
  
  sectorDistribution: [
    { name: 'BTP', value: 45 },
    { name: 'Informatique', value: 25 },
    { name: 'Logistique', value: 20 },
    { name: 'Services', value: 10 }
  ]
}));
