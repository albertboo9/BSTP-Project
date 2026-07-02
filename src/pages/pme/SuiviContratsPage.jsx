import { useState } from 'react';
import { motion } from 'framer-motion';
import { runLegalAssistant } from '../../services/ai/aiFeatures';
import { useAIFeature } from '../../hooks/useAIFeature';
import { FileText, ShieldAlert, CheckCircle, Clock, UploadCloud, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_CONTRACTS = [
  { id: "ctr-8842", client: "SCDP Cameroun", titre: "Maintenance des Cuves Douala", status: "en_cours", progress: 65, phase: "Phase de Test" },
  { id: "ctr-9011", client: "Eneo SA", titre: "Installation Transfo Ouest", status: "planifie", progress: 20, phase: "Conception" }
];

export default function SuiviContratsPage() {
  const { data: analysis, isLoading, execute: analyzeContract } = useAIFeature(runLegalAssistant);
  const [draggedContract, setDraggedContract] = useState(null);
  const [contractText, setContractText] = useState('');
  const [contracts, setContracts] = useState(MOCK_CONTRACTS);

  const handleTextScan = () => {
    if (!contractText.trim()) {
      toast.error("Veuillez saisir ou coller le texte du contrat.");
      return;
    }
    analyzeContract(contractText);
  };

  const handleDemoContract = () => {
    const demo = "ARTICLE 12 : RÉSILIATION. Le Donneur d'Ordres se réserve le droit de résilier le présent contrat de sous-traitance à tout moment, avec effet immédiat et sans indemnité, sur simple notification écrite... ARTICLE 15 : Les pénalités de retard écraseront 5% du montant global par jour de retard.";
    setContractText(demo);
    analyzeContract(demo);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Suivi d'Exécution & Risques</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Vos Contrats & Analyse Juridique</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Suivez les chantiers et utilisez l'assistant IA pour scanner les clauses léonines ou asymétriques selon le droit OHADA.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <FileCheck size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Grid: Kanban executory follow-up & Legal scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Kanban Follow-up */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Pipeline Kanban des Chantiers en Cours</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {['Conception', 'En Cours', 'Phase de Test'].map((col) => {
                const filtered = contracts.filter(c => c.phase === col);
                return (
                  <div key={col} className="bg-gray-950 border border-gray-800/80 rounded-xl p-3 min-h-[220px] flex flex-col gap-3">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-1">{col}</span>
                    <div className="flex-1 space-y-2">
                      {filtered.map(c => (
                        <div key={c.id} className="p-3 bg-gray-900 border border-gray-800 rounded-lg space-y-2">
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-[8px] font-black text-nexus-400 uppercase bg-nexus-500/10 px-1.5 py-0.5 rounded border border-nexus-500/20">{c.id}</span>
                            <span className="text-[8px] text-gray-400 font-bold">{c.client}</span>
                          </div>
                          <p className="text-[11px] font-bold text-white leading-tight">{c.titre}</p>
                          <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                            <div className="bg-nexus-500 h-full rounded-full" style={{ width: `${c.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Legal scanner */}
        <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Analyseur Juridique OHADA</h3>
            <p className="text-[10px] text-gray-500 mt-0.5">Vérifiez un projet de contrat avant signature pour détecter les risques.</p>
          </div>

          <textarea
            rows={4}
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Copiez-collez les clauses contractuelles ici..."
            className="w-full bg-gray-950 border border-gray-850 rounded-xl p-3 text-xs focus:outline-none focus:border-nexus-500 text-white placeholder-gray-600"
          />

          <div className="flex gap-2">
            <button
              onClick={handleTextScan}
              disabled={isLoading}
              className="flex-1 py-2.5 bg-nexus-500 hover:bg-nexus-600 text-white text-xs font-black rounded-xl transition-all"
            >
              {isLoading ? "Vérification..." : "Analyser"}
            </button>
            <button
              onClick={handleDemoContract}
              disabled={isLoading}
              className="px-3 bg-gray-950 border border-gray-850 hover:bg-gray-850 text-gray-400 text-xs font-bold rounded-xl transition-colors"
            >
              Démo
            </button>
          </div>

          {analysis && (
            <div className="border-t border-gray-850 pt-4 space-y-3">
              <div className="p-3 bg-danger-500/10 border border-danger-500/20 rounded-xl">
                <span className="text-[9px] font-black text-danger-400 uppercase tracking-widest block">Synthèse IA</span>
                <p className="text-[11px] text-gray-300 mt-1 leading-snug">{analysis.syntheseGlobale}</p>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Clauses à Risque</p>
                {analysis.clausesRisque.map((c, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-950 border border-gray-850 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-danger-400 bg-danger-500/10 px-1.5 py-0.5 rounded uppercase">Risque {c.niveauRisque}</span>
                      {c.articleReference && <span className="text-[8px] text-gray-500 font-bold">{c.articleReference}</span>}
                    </div>
                    <p className="text-[10px] text-gray-400 italic">"{c.extraitCourt}"</p>
                    <p className="text-[10px] text-gray-300">{c.explication}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
