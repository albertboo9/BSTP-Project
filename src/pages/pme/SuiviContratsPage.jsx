import { useState } from 'react';
import { motion } from 'framer-motion';
import { runLegalAssistant } from '../../services/ai/aiFeatures';
import { useAIFeature } from '../../hooks/useAIFeature';
import AIResultModal from '../../components/ui/AIResultModal';
import { FileText, ShieldAlert, CheckCircle, Clock, UploadCloud, FileCheck, ArrowRight, ShieldCheck, AlertTriangle, Search, Scale, Download } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_CONTRACTS = [
  { id: "ctr-8842", client: "SCDP Cameroun", titre: "Maintenance des Cuves Douala", status: "en_cours", progress: 65, phase: "En Cours" },
  { id: "ctr-9011", client: "Eneo SA", titre: "Installation Transfo Ouest", status: "planifie", progress: 20, phase: "Conception" },
  { id: "ctr-9123", client: "SOSUCAM", titre: "Audit Sécurité SI", status: "termine", progress: 100, phase: "Terminé" },
];

const PHASES = ['Conception', 'En Cours', 'Terminé'];

export default function SuiviContratsPage() {
  const { data: analysis, isLoading, isFallback, showResult, closeResult, execute: analyzeContract } = useAIFeature(runLegalAssistant);
  const [contractText, setContractText] = useState('');
  const [contracts] = useState(MOCK_CONTRACTS);

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
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Suivi d'Exécution & Risques</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Vos Contrats & Analyse Juridique</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">Suivez vos chantiers et scannez les clauses à risque selon le droit OHADA.</p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <FileCheck size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contrats Actifs</span>
          <p className="text-3xl font-black text-gray-900 mt-1">{contracts.filter(c => c.status !== 'termine').length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Terminés</span>
          <p className="text-3xl font-black text-success-600 mt-1">{contracts.filter(c => c.status === 'termine').length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Progression Moy.</span>
          <p className="text-3xl font-black text-gray-900 mt-1">{Math.round(contracts.reduce((a, c) => a + c.progress, 0) / contracts.length)}%</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Volume Total</span>
          <p className="text-3xl font-black text-gray-900 mt-1">135M</p>
          <span className="text-xs text-gray-400 font-medium">FCFA</span>
        </div>
      </div>

      {/* Main grid: Kanban + Legal scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Kanban */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Pipeline Kanban des Chantiers</h3>
          <div className="grid grid-cols-3 gap-4">
            {PHASES.map(col => {
              const filtered = contracts.filter(c => c.phase === col);
              return (
                <div key={col} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 min-h-[280px] flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{col}</span>
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-[10px] font-black text-gray-500 flex items-center justify-center">{filtered.length}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    {filtered.length === 0 ? (
                      <div className="text-center py-8 text-xs text-gray-400 font-medium">Aucun contrat</div>
                    ) : filtered.map(c => (
                      <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black text-nexus-600 bg-nexus-50 px-1.5 py-0.5 rounded border border-nexus-100">{c.id}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${c.status === 'termine' ? 'bg-success-50 text-success-700' : c.status === 'en_cours' ? 'bg-nexus-50 text-nexus-700' : 'bg-warning-50 text-warning-700'}`}>
                            {c.status === 'termine' ? 'Terminé' : c.status === 'en_cours' ? 'En cours' : 'Planifié'}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-900 leading-snug">{c.titre}</p>
                        <p className="text-[10px] text-gray-500 font-medium mt-1">{c.client}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${c.progress === 100 ? 'bg-success-500' : 'bg-nexus-500'}`} style={{ width: `${c.progress}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-gray-500">{c.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right col: Legal scanner */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Analyseur Juridique OHADA</h3>
            <p className="text-xs text-gray-500 mt-0.5">Vérifiez un projet de contrat avant signature.</p>
          </div>

          <textarea rows={4} value={contractText} onChange={e => setContractText(e.target.value)}
            placeholder="Copiez-collez les clauses contractuelles ici..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-nexus-500 text-gray-900 placeholder-gray-400 resize-none" />

          <div className="flex gap-2">
            <button onClick={handleTextScan} disabled={isLoading}
              className="flex-1 py-2.5 bg-nexus-500 hover:bg-nexus-600 text-white text-xs font-black rounded-xl transition-all">
              {isLoading ? "Vérification..." : "Analyser"}
            </button>
            <button onClick={handleDemoContract} disabled={isLoading}
              className="px-3 bg-gray-50 border border-gray-100 hover:bg-gray-100 text-gray-500 text-xs font-bold rounded-xl transition-colors">
              Démo
            </button>
          </div>

          {/* AI Result Modal */}
          <AIResultModal
            isOpen={showResult}
            onClose={closeResult}
            title="Analyse Juridique OHADA"
            icon={<Scale size={20} className="text-nexus-500" />}
            isError={!analysis && showResult}
            isFallback={isFallback}
            onExport={() => toast.success('Rapport téléchargé', { description: 'Le rapport d\'analyse juridique a été généré.' })}
          >
            {analysis && (
              <div className="space-y-5">
                {/* Synthèse */}
                <div className="p-5 bg-gradient-to-br from-nexus-500 to-nexus-600 text-white rounded-2xl">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-70">Synthèse IA</p>
                  <p className="text-sm font-medium mt-2 leading-relaxed">{analysis.syntheseGlobale}</p>
                </div>

                {/* Clauses à risque */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-danger-500" />
                    Clauses à risque détectées ({analysis.clausesRisque.length})
                  </h4>
                  <div className="space-y-3">
                    {analysis.clausesRisque.map((c, idx) => {
                      const riskColor = c.niveauRisque === 'eleve' ? 'danger' : c.niveauRisque === 'moyen' ? 'warning' : 'success';
                      const colorMap = {
                        danger: { bg: 'bg-danger-50', border: 'border-danger-100', text: 'text-danger-700', badge: 'bg-danger-500' },
                        warning: { bg: 'bg-warning-50', border: 'border-warning-100', text: 'text-warning-700', badge: 'bg-warning-500' },
                        success: { bg: 'bg-success-50', border: 'border-success-100', text: 'text-success-700', badge: 'bg-success-500' },
                      };
                      const cc = colorMap[riskColor];
                      return (
                        <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                          className={`p-4 ${cc.bg} border ${cc.border} rounded-xl space-y-2`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-black ${cc.text} ${cc.badge} text-white px-2 py-0.5 rounded uppercase`}>
                              Risque {c.niveauRisque}
                            </span>
                            {c.articleReference && <span className="text-[9px] text-gray-500 font-bold">{c.articleReference}</span>}
                          </div>
                          <p className="text-xs text-gray-500 italic leading-relaxed">« {c.extraitCourt} »</p>
                          <p className="text-xs text-gray-700 font-medium">{c.explication}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </AIResultModal>
        </div>
      </div>
    </div>
  );
}