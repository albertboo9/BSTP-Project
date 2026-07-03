import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { runSmartMatchmaking } from '../../services/ai/aiFeatures';
import { Zap, Search, Trophy, Star, MapPin, ShieldCheck, Loader2, AlertTriangle, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

const SECTEURS = [
  'Hydrocarbures & Énergie', 'BTP & Infrastructure', 'Génie Civil', 'Maintenance Industrielle',
  'Informatique & Digital', 'Logistique & Transport', 'Agroalimentaire', 'Santé & Pharmacie',
];

const REGIONS = [
  'Littoral', 'Centre', 'Ouest', 'Sud-Ouest', 'Nord-Ouest', 'Adamaoua', 'Nord', 'Extrême-Nord', 'Est', 'Sud'
];

const CERTIFICATIONS = ['ISO_9001', 'HSQE', 'ISO_14001', 'OHSAS_18001', 'ISO_45001'];

// Données de démo pour les PME candidates (simulation d'une base de données)
const PME_DATABASE = [
  { pmeId: 'pme_alpha_237', raisonSociale: 'Alpha Industrial Services', region: 'Littoral', ville: 'Douala', secteurs: ['Hydrocarbures & Énergie', 'Maintenance Industrielle'], scoreMaturite: 16.5, badges: ['ISO_9001', 'HSQE'], indiceConfiance: 'Gold' },
  { pmeId: 'pme_beta_105', raisonSociale: 'BTP Solutions Cameroun', region: 'Centre', ville: 'Yaoundé', secteurs: ['BTP & Infrastructure', 'Génie Civil'], scoreMaturite: 14.2, badges: ['ISO_9001'], indiceConfiance: 'Silver' },
  { pmeId: 'pme_gamma_88', raisonSociale: 'Tech Innov Sarl', region: 'Littoral', ville: 'Douala', secteurs: ['Informatique & Digital'], scoreMaturite: 12.8, badges: ['ISO_9001', 'ISO_14001'], indiceConfiance: 'Silver' },
  { pmeId: 'pme_delta_52', raisonSociale: 'TransLog Express', region: 'Ouest', ville: 'Bafoussam', secteurs: ['Logistique & Transport'], scoreMaturite: 11.0, badges: ['HSQE'], indiceConfiance: 'Bronze' },
  { pmeId: 'pme_epsilon_19', raisonSociale: 'Energie Verte SARL', region: 'Littoral', ville: 'Douala', secteurs: ['Hydrocarbures & Énergie'], scoreMaturite: 15.3, badges: ['ISO_9001', 'HSQE', 'ISO_14001'], indiceConfiance: 'Gold' },
];

const CONFIDENCE_COLORS = {
  Gold: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-400' },
  Silver: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' },
  Bronze: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-400' },
};

function ScoreBar({ score }) {
  const color = score >= 85 ? '#10b981' : score >= 60 ? '#3b82f6' : '#f59e0b';
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

export default function SmartMatchmakingIA() {
  const [form, setForm] = useState({
    titre: '',
    secteur: '',
    region: '',
    ville: '',
    montantEstimeFCFA: '',
    exigencesConformite: [],
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedPme, setExpandedPme] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  const toggleCert = (cert) => {
    setForm(f => ({
      ...f,
      exigencesConformite: f.exigencesConformite.includes(cert)
        ? f.exigencesConformite.filter(c => c !== cert)
        : [...f.exigencesConformite, cert],
    }));
  };

  const handleMatch = useCallback(async () => {
    if (!form.titre || !form.secteur || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsFallback(false);
    try {
      // Filtrer les PME candidates pertinentes selon le secteur
      const candidats = PME_DATABASE.filter(p =>
        !form.secteur || p.secteurs.some(s => s === form.secteur)
      );

      const payload = {
        opportunity: {
          id: `opp_${Date.now()}`,
          titre: form.titre,
          secteur: form.secteur,
          region: form.region,
          ville: form.ville,
          montantEstimeFCFA: parseFloat(form.montantEstimeFCFA) || 0,
          exigencesConformite: form.exigencesConformite,
        },
        candidats: candidats.length > 0 ? candidats : PME_DATABASE.slice(0, 3),
      };

      const res = await runSmartMatchmaking(payload);
      if (res.success) {
        // Enrichir le classement avec les données PME
        const classement = (res.data?.classement || []).map(item => ({
          ...item,
          ...PME_DATABASE.find(p => p.pmeId === item.pmeId),
        }));
        setResult({ ...res.data, classement });
        setIsFallback(!!res._fallback);
      } else {
        setError(res.error?.message || 'Erreur lors du matchmaking');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [form, isLoading]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Zap size={22} className="text-indigo-500" />
            Smart Matchmaking B2B
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            L'IA identifie et classe les meilleures PME locales pour votre appel d'offres
          </p>
        </div>
      </div>

      {/* Formulaire AO */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Search size={15} className="text-indigo-400" />
          Définir l'opportunité
        </h3>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Titre de l'appel d'offres *</label>
          <input
            type="text"
            value={form.titre}
            onChange={e => setForm(f => ({ ...f, titre: e.target.value }))}
            placeholder="Ex : Maintenance préventive des équipements électriques"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Secteur *</label>
            <select
              value={form.secteur}
              onChange={e => setForm(f => ({ ...f, secteur: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
            >
              <option value="">Choisir un secteur…</option>
              {SECTEURS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Région</label>
            <select
              value={form.region}
              onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
            >
              <option value="">Toutes régions</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ville</label>
            <input
              type="text"
              value={form.ville}
              onChange={e => setForm(f => ({ ...f, ville: e.target.value }))}
              placeholder="Ex : Douala"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Montant estimé (FCFA)</label>
            <input
              type="number"
              value={form.montantEstimeFCFA}
              onChange={e => setForm(f => ({ ...f, montantEstimeFCFA: e.target.value }))}
              placeholder="Ex : 45000000"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        {/* Certifications requises */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">Certifications requises</label>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map(cert => {
              const selected = form.exigencesConformite.includes(cert);
              return (
                <button
                  key={cert}
                  onClick={() => toggleCert(cert)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    selected
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {selected ? <X size={10} /> : <Plus size={10} />} {cert}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleMatch}
          disabled={!form.titre || !form.secteur || isLoading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-md shadow-indigo-100"
        >
          {isLoading
            ? <><Loader2 size={16} className="animate-spin" /> Analyse IA en cours…</>
            : <><Zap size={16} /> Lancer le Matchmaking IA</>
          }
        </button>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {isFallback && <p className="text-center text-xs text-amber-500">⚡ Mode démo actif</p>}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Trophy size={18} className="text-yellow-500" />
                {result.classement?.length || 0} PME qualifiées
              </h3>
              <span className="text-xs text-gray-400">Classées par pertinence IA</span>
            </div>

            <div className="space-y-3">
              {(result.classement || []).map((pme, i) => {
                const conf = CONFIDENCE_COLORS[pme.indiceConfiance] || CONFIDENCE_COLORS.Silver;
                return (
                  <motion.div
                    key={pme.pmeId}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Rang */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-base flex-shrink-0 ${
                          i === 0 ? 'bg-yellow-50 text-yellow-600' :
                          i === 1 ? 'bg-gray-50 text-gray-500' :
                          'bg-orange-50 text-orange-500'
                        }`}>
                          #{i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-gray-900 text-sm">{pme.raisonSociale}</h4>
                            {pme.indiceConfiance && (
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${conf.bg} ${conf.text} ${conf.border}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
                                {pme.indiceConfiance}
                              </span>
                            )}
                          </div>
                          {pme.region && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin size={11} className="text-gray-400" />
                              <span className="text-xs text-gray-400">{pme.ville || pme.region}</span>
                            </div>
                          )}
                          <ScoreBar score={pme.scorePertinence || 0} />
                        </div>
                        <div className="flex items-center gap-1">
                          {pme.badges?.slice(0, 2).map(b => (
                            <div key={b} title={b} className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                              <ShieldCheck size={13} className="text-indigo-500" />
                            </div>
                          ))}
                          <button
                            onClick={() => setExpandedPme(expandedPme === pme.pmeId ? null : pme.pmeId)}
                            className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors ml-1"
                          >
                            {expandedPme === pme.pmeId ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedPme === pme.pmeId && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-2">
                            <div className="bg-indigo-50 rounded-xl p-3">
                              <p className="text-xs font-semibold text-indigo-700 mb-1 flex items-center gap-1">
                                <Star size={11} /> Justification IA
                              </p>
                              <p className="text-xs text-indigo-800">{pme.justification}</p>
                            </div>
                            {pme.secteurs?.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {pme.secteurs.map(s => (
                                  <span key={s} className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full text-xs border border-gray-100">{s}</span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">Score maturité</span>
                              <span className="text-sm font-bold text-gray-800">{pme.scoreMaturite}/20</span>
                            </div>
                            <button className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                              Inviter à soumissionner
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
