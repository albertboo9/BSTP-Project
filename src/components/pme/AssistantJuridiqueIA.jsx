import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { runLegalAssistant } from '../../services/ai/aiFeatures';
import { Scale, AlertTriangle, CheckCircle, Upload, FileText, Loader2, X, ChevronDown, ChevronUp, Shield } from 'lucide-react';

const RISK_CONFIG = {
  eleve: { label: 'Risque élevé', color: '#ef4444', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
  moyen: { label: 'Risque moyen', color: '#f59e0b', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
  faible: { label: 'Risque faible', color: '#10b981', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
};

const PLACEHOLDER = `Exemple : 
ARTICLE 7 : CONDITIONS DE PAIEMENT. 
Les factures de la PME seront réglées dans un délai de 120 jours après réception de la marchandise et validation par le donneur d'ordres.

ARTICLE 12 : CLAUSE DE RÉSILIATION.
Le donneur d'ordres se réserve le droit de résilier le contrat sans préavis ni indemnité en cas de non-conformité.`;

export default function AssistantJuridiqueIA() {
  const [texte, setTexte] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const fileRef = useRef();

  const handleAnalyze = useCallback(async () => {
    if (!texte.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsFallback(false);
    try {
      const res = await runLegalAssistant(texte.trim());
      if (res.success) {
        setResult(res.data);
        setIsFallback(!!res._fallback);
      } else {
        setError(res.error?.message || 'Erreur lors de l\'analyse');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [texte, isLoading]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTexte(ev.target.result);
    reader.readAsText(file);
  };

  const clausesRisque = result?.clausesRisque || [];
  const riskCount = {
    eleve: clausesRisque.filter(c => c.niveauRisque === 'eleve').length,
    moyen: clausesRisque.filter(c => c.niveauRisque === 'moyen').length,
    faible: clausesRisque.filter(c => c.niveauRisque === 'faible').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Scale size={22} className="text-indigo-500" />
            Assistant Juridique IA
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Analyse vos contrats de sous-traitance selon le droit OHADA
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-xs font-semibold border border-indigo-100">
          <Shield size={12} />
          OHADA Compliant
        </div>
      </div>

      {/* Zone de saisie */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Texte du contrat</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Upload size={12} /> Importer .txt
            </button>
            <input ref={fileRef} type="file" accept=".txt,.doc" className="hidden" onChange={handleFileUpload} />
            {texte && (
              <button onClick={() => { setTexte(''); setResult(null); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
        <textarea
          value={texte}
          onChange={e => setTexte(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={8}
          className="w-full px-5 py-4 text-sm text-gray-800 placeholder:text-gray-300 resize-none outline-none font-mono leading-relaxed"
        />
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">{texte.length} caractères</span>
          <button
            onClick={handleAnalyze}
            disabled={!texte.trim() || isLoading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200"
          >
            {isLoading ? <><Loader2 size={15} className="animate-spin" /> Analyse en cours…</> : <><Scale size={15} /> Analyser le contrat</>}
          </button>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {isFallback && (
              <div className="text-center text-xs text-amber-500">⚡ Mode démo actif (données simulées)</div>
            )}

            {/* Synthèse */}
            <div className={`rounded-2xl border p-5 ${
              riskCount.eleve > 0 ? 'bg-red-50 border-red-200' :
              riskCount.moyen > 0 ? 'bg-amber-50 border-amber-200' :
              'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start gap-3">
                {riskCount.eleve > 0
                  ? <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                  : <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                }
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Synthèse globale</h3>
                  <p className="text-sm text-gray-700">{result.syntheseGlobale}</p>
                </div>
              </div>
              {/* Compteurs */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/60">
                {Object.entries(riskCount).map(([key, count]) => count > 0 && (
                  <div key={key} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${RISK_CONFIG[key].badge}`}>
                    {count} clause{count > 1 ? 's' : ''} {RISK_CONFIG[key].label.toLowerCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Clauses à risque */}
            {clausesRisque.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50">
                  <h3 className="font-semibold text-gray-800 text-sm">Clauses identifiées ({clausesRisque.length})</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {clausesRisque.map((clause, i) => {
                    const cfg = RISK_CONFIG[clause.niveauRisque] || RISK_CONFIG.moyen;
                    return (
                      <div key={i} className="p-4">
                        <button
                          onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                          className="w-full flex items-start justify-between gap-4 text-left"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${cfg.badge}`}>{cfg.label}</span>
                              {clause.article && <span className="text-xs font-mono text-gray-400">{clause.article}</span>}
                            </div>
                            <p className="text-sm text-gray-700 font-medium">
                              "{clause.extraitCourt || clause.extrait || '—'}"
                            </p>
                          </div>
                          {expandedIdx === i ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
                        </button>
                        <AnimatePresence>
                          {expandedIdx === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 space-y-2">
                                <div className={`${cfg.bg} ${cfg.border} border rounded-xl p-3`}>
                                  <p className={`text-xs font-semibold ${cfg.text} mb-1`}>Explication IA</p>
                                  <p className={`text-xs ${cfg.text}`}>{clause.explication}</p>
                                </div>
                                {clause.articleReference && (
                                  <div className="flex items-center gap-2 px-1">
                                    <Scale size={11} className="text-gray-400" />
                                    <p className="text-xs text-gray-400 italic">{clause.articleReference}</p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
