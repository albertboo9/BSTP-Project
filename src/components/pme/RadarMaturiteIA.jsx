import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { runMaturityRadar } from '../../services/ai/aiFeatures';
import { Sparkles, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Loader2, BarChart3, FileText, Zap } from 'lucide-react';

const AXES = [
  { key: 'Gouvernance', label: 'Gouvernance', max: 20 },
  { key: 'Production_Qualite', label: 'Qualité', max: 20 },
  { key: 'Conformite_HSE', label: 'HSE', max: 20 },
  { key: 'Ressources_Humaines', label: 'RH', max: 20 },
  { key: 'Sante_Financiere', label: 'Finance', max: 20 },
  { key: 'Technologie_Innovation', label: 'Innovation', max: 20 },
];

const NIVEAU_COLORS = {
  Insuffisant: '#ef4444',
  'En développement': '#f59e0b',
  Compétent: '#3b82f6',
  Avancé: '#10b981',
};

function getLevel(score) {
  if (score < 7) return 'Insuffisant';
  if (score < 12) return 'En développement';
  if (score < 17) return 'Compétent';
  return 'Avancé';
}

function RiskBadge({ level }) {
  const colors = {
    eleve: 'bg-red-50 text-red-600 border-red-200',
    moyen: 'bg-amber-50 text-amber-600 border-amber-200',
    faible: 'bg-green-50 text-green-600 border-green-200',
  };
  const labels = { eleve: '⚠ Élevé', moyen: '~ Moyen', faible: '✓ Faible' };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${colors[level] || colors.moyen}`}>
      {labels[level] || level}
    </span>
  );
}

export default function RadarMaturiteIA({ pmeId = 'pme_bstpkit', documentsDejaFournis = ['RCCM', 'NIU'] }) {
  const [scores, setScores] = useState({
    Gouvernance: 15,
    Production_Qualite: 8,
    Conformite_HSE: 6,
    Ressources_Humaines: 14,
    Sante_Financiere: 11,
    Technologie_Innovation: 10,
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedClause, setExpandedClause] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  const scoreTotal = Object.values(scores).reduce((a, b) => a + b, 0);
  const scoreMoyenne = (scoreTotal / Object.keys(scores).length).toFixed(1);

  const radarData = AXES.map(a => ({
    subject: a.label,
    value: scores[a.key],
    fullMark: a.max,
  }));

  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsFallback(false);
    try {
      const res = await runMaturityRadar({ pmeId, autoEvaluation: scores, documentsDejaFournis });
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
  }, [scores, pmeId, documentsDejaFournis]);

  const avgScore = scoreMoyenne;
  const globalLevel = getLevel(parseFloat(avgScore));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 size={22} className="text-indigo-500" />
            Radar de Maturité Industrielle
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Auto-évaluez votre PME sur les standards ONUDI / Local Content
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-gray-900">{avgScore}<span className="text-sm text-gray-400">/20</span></div>
          <div
            className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block"
            style={{ background: NIVEAU_COLORS[globalLevel] + '20', color: NIVEAU_COLORS[globalLevel] }}
          >
            {globalLevel}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders d'auto-évaluation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Auto-évaluation (scores /20)</h3>
          <div className="space-y-4">
            {AXES.map(axis => {
              const val = scores[axis.key];
              const lv = getLevel(val);
              return (
                <div key={axis.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{axis.label}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: NIVEAU_COLORS[lv] + '20', color: NIVEAU_COLORS[lv] }}
                      >{lv}</span>
                      <span className="text-sm font-bold text-gray-900 w-6 text-right">{val}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    step={0.5}
                    value={val}
                    onChange={e => setScores(s => ({ ...s, [axis.key]: parseFloat(e.target.value) }))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${NIVEAU_COLORS[lv]}, ${NIVEAU_COLORS[lv]} ${(val / 20) * 100}%, #e5e7eb ${(val / 20) * 100}%)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Profil de maturité</h3>
          <div className="flex-1 min-h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 600 }}
                />
                <Tooltip
                  formatter={(v) => [`${v}/20`, 'Score']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }}
                />
                <Radar
                  name="Maturité"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.25}
                  strokeWidth={2}
                  dot={{ fill: '#6366f1', r: 4 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* CTA analyse IA */}
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-md shadow-indigo-200"
          >
            {isLoading ? (
              <><Loader2 size={16} className="animate-spin" />Analyse IA en cours...</>
            ) : (
              <><Sparkles size={16} />Analyser avec l'IA BSTP</>
            )}
          </button>
          {isFallback && (
            <p className="text-center text-xs text-amber-500 mt-2">⚡ Mode démo (données simulées)</p>
          )}
        </div>
      </div>

      {/* Résultats IA */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Axes faibles */}
            {result.axesFaibles?.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={18} className="text-amber-500" />
                  <h3 className="font-semibold text-amber-800 text-sm">Axes à améliorer en priorité</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.axesFaibles.map(ax => (
                    <span key={ax} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
                      {ax.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommandations détaillées */}
            {result.ecartsIdentifies?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
                  <Zap size={16} className="text-indigo-500" />
                  <h3 className="font-semibold text-gray-800 text-sm">Analyse détaillée par axe</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {result.ecartsIdentifies.map((ecart, i) => (
                    <div key={i} className="p-4">
                      <button
                        onClick={() => setExpandedClause(expandedClause === i ? null : i)}
                        className="w-full flex items-start justify-between gap-4 text-left"
                      >
                        <div>
                          <span className="font-semibold text-gray-800 text-sm">
                            {ecart.axe?.replace(/_/g, ' ')}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{ecart.constat}</p>
                        </div>
                        {expandedClause === i ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
                      </button>
                      <AnimatePresence>
                        {expandedClause === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 space-y-2">
                              <div className="bg-blue-50 rounded-xl p-3">
                                <p className="text-xs font-semibold text-blue-700 mb-1">Recommandation IA</p>
                                <p className="text-xs text-blue-800">{ecart.recommandation}</p>
                              </div>
                              {ecart.referenceNormative && (
                                <div className="flex items-center gap-2">
                                  <FileText size={12} className="text-gray-400" />
                                  <p className="text-xs text-gray-400 italic">{ecart.referenceNormative}</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synthèse globale */}
            {result.diagnostique?.constats && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex items-start gap-3">
                <CheckCircle size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-indigo-800 mb-1">Synthèse du diagnostic</p>
                  <p className="text-sm text-indigo-700">{result.diagnostique.constats}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
