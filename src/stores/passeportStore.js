import { create } from 'zustand';

// Mock initial data
const initialPasseportData = {
  scoreGlobal: 45,
  isPremium: false,
  scores: [
    { subject: 'Juridique', A: 15, fullMark: 20 },
    { subject: 'Fiscal', A: 10, fullMark: 20 },
    { subject: 'Social (CNPS)', A: 5, fullMark: 20 },
    { subject: 'Technique', A: 8, fullMark: 20 },
    { subject: 'Financier', A: 12, fullMark: 20 },
    { subject: 'Qualité', A: 0, fullMark: 20 },
  ],
  documents: [
    { id: 'rccm', name: 'RCCM', status: 'valid', date: '12/05/2025' },
    { id: 'niu', name: 'NIU (Carte de contribuable)', status: 'valid', date: '12/05/2025' },
    { id: 'cnps', name: 'Attestation CNPS', status: 'missing', date: null },
    { id: 'attestation_fiscale', name: 'Attestation de Non Redevance', status: 'missing', date: null },
    { id: 'bilan', name: 'Bilan Financier (N-1)', status: 'missing', date: null },
    { id: 'references', name: 'Références Techniques (Contrats)', status: 'valid', date: '01/03/2025' },
  ],
};

export const usePasseportStore = create((set) => ({
  data: initialPasseportData,
  isUploading: false,
  uploadProgress: 0,
  
  // Simulation of uploading and validation
  uploadDocument: async (docId) => {
    set({ isUploading: true, uploadProgress: 0 });
    
    // Simulate progress
    for (let i = 10; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 150));
      set({ uploadProgress: i });
    }

    // Simulate OCR / Validation success
    await new Promise(r => setTimeout(r, 500));
    
    set((state) => {
      // Update document status
      const updatedDocs = state.data.documents.map(doc => 
        doc.id === docId ? { ...doc, status: 'valid', date: new Date().toLocaleDateString('fr-FR') } : doc
      );
      
      // Bump the score dynamically
      let newScore = state.data.scoreGlobal + 15;
      if (newScore > 100) newScore = 100;

      // Update radar categories arbitrarily for the demo
      const updatedScores = state.data.scores.map(score => {
        if (docId === 'cnps' && score.subject === 'Social (CNPS)') return { ...score, A: 20 };
        if (docId === 'attestation_fiscale' && score.subject === 'Fiscal') return { ...score, A: 18 };
        if (docId === 'bilan' && score.subject === 'Financier') return { ...score, A: 18 };
        return score;
      });

      return {
        isUploading: false,
        uploadProgress: 0,
        data: {
          ...state.data,
          scoreGlobal: newScore,
          documents: updatedDocs,
          scores: updatedScores,
          isPremium: newScore >= 80,
        }
      };
    });
  }
}));
