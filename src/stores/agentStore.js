import { create } from 'zustand';

export const useAgentStore = create((set) => ({
  tasks: [
    {
      id: 't-1',
      pmeName: 'Alpha Tech',
      documentType: 'Attestation Fiscale',
      submittedAt: 'Aujourd\'hui, 10:45',
      status: 'pending',
      aiConfidence: 98,
      fileSize: '1.2 MB'
    },
    {
      id: 't-2',
      pmeName: 'Global Services',
      documentType: 'Registre du Commerce (RCCM)',
      submittedAt: 'Hier, 15:30',
      status: 'pending',
      aiConfidence: 85,
      fileSize: '2.4 MB'
    },
    {
      id: 't-3',
      pmeName: 'Bati Plus',
      documentType: 'Certificat Qualité ISO 9001',
      submittedAt: 'Hier, 09:15',
      status: 'pending',
      aiConfidence: 92,
      fileSize: '850 KB'
    }
  ],
  stats: {
    pendingCount: 3,
    processedToday: 12,
    avgProcessTime: '4m 30s'
  },
  
  approveTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id),
    stats: { ...state.stats, pendingCount: state.stats.pendingCount - 1, processedToday: state.stats.processedToday + 1 }
  })),

  rejectTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id),
    stats: { ...state.stats, pendingCount: state.stats.pendingCount - 1, processedToday: state.stats.processedToday + 1 }
  }))
}));
