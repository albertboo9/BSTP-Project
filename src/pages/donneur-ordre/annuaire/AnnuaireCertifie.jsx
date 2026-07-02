import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pmesCertifiees } from '../../../data/donneurs-ordre.mock';
import { aoPublies } from '../../../data/opportunities.mock';
import TrustBadge from '../../../components/ui/TrustBadge';
import RadarChartCard from '../../../components/ui/RadarChartCard';
import { Search, MapPin, Filter, X, ChevronRight, Building2, Briefcase, Star, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

const REGIONS = ['Toutes', 'Littoral', 'Centre', 'Ouest', 'Sud-Ouest', 'Nord-Ouest', 'Adamaoua', 'Nord', 'Est', 'Sud'];
const SECTEURS = ['Tous', 'BTP', 'Informatique', 'Agro-industrie', 'Transport', 'Énergie'];
const BADGES = [
  { label: 'Tous les badges', value: '' },
  { label: 'Indice Or', value: 'or' },
  { label: 'Indice Argent', value: 'argent' },
  { label: 'Indice Bronze', value: 'bronze' },
];

function axesToRadar(axes) {
  return [
    { axe: 'Juridique', score: axes.juridique },
    { axe: 'Fiscal', score: axes.fiscal },
    { axe: 'CNPS', score: axes.cnps },
    { axe: 'Qualité', score: axes.qualite },
    { axe: 'Financier', score: axes.financier },
    { axe: 'Références', score: axes.references },
  ];
}

function PmeCard({ pme, onClick }) {
  const badgeColors = { or: 'border-gold-200', argent: 'border-silver-200', bronze: 'border-bronze-200' };
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => onClick(pme)}
      className={`bg-white rounded-2xl border ${badgeColors[pme.badge] || 'border-gray-100'} shadow-sm p-5 text-left hover:shadow-md transition-all group w-full`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 bg-nexus-900 rounded-xl flex items-center justify-center font-black text-white text-sm flex-shrink-0">
          {pme.sigle}
        </div>
        <TrustBadge level={pme.badge} size="sm" />
      </div>
      <h3 className="font-bold text-gray-900 text-sm group-hover:text-nexus-600 transition-colors leading-snug">{pme.nom}</h3>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
          <Briefcase size={10} /> {pme.secteur}
        </span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
          <MapPin size={10} /> {pme.ville}
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="text-xl font-black text-gray-900">{pme.scoreGlobal}</span>
          <span className="text-xs text-gray-400 font-bold">/100</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-black text-gray-900">{pme.marchesRealises}</span>
          <p className="text-[10px] text-gray-400 font-bold">marchés</p>
        </div>
        <ChevronRight size={16} className="text-gray-200 group-hover:text-nexus-500 transition-colors" />
      </div>
    </motion.button>
  );
}

function PmeDrawer({ pme, onClose }) {
  if (!pme) return null;
  const radarData = axesToRadar(pme.axes);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex"
      onClick={onClose}
    >
      <div className="flex-1 bg-nexus-900/40 backdrop-blur-sm" />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-nexus-900 text-white p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center font-black text-xl">{pme.sigle}</div>
            <button onClick={onClose} className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
              <X size={18} />
            </button>
          </div>
          <h2 className="text-2xl font-black">{pme.nom}</h2>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <TrustBadge level={pme.badge} size="md" />
            <span className="text-white/50 text-sm">•</span>
            <span className="text-white/70 text-sm font-semibold">{pme.secteur} · {pme.ville}, {pme.region}</span>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <p className="text-gray-600 text-sm font-medium leading-relaxed">{pme.description}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-nexus-50 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-nexus-700">{pme.scoreGlobal}</span>
              <p className="text-[10px] font-bold text-nexus-400 uppercase tracking-wider mt-1">Score /100</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-gray-900">{pme.marchesRealises}</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Marchés</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-gray-900">{pme.effectifs}</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Effectifs</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Radar de Maturité Détaillé</h3>
            <RadarChartCard data={radarData} scoreGlobal={pme.scoreGlobal} />
          </div>
          {pme.certifications.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {pme.certifications.map(c => (
                  <span key={c} className="bg-success-50 text-success-700 border border-success-100 px-3 py-1 rounded-xl text-xs font-bold">{c}</span>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 mb-3">Validé BSTP le {pme.dateValidation}</p>
            <button
              onClick={() => toast.info(`Contact ${pme.nom}`, { description: pme.contact })}
              className="w-full bg-nexus-500 hover:bg-nexus-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Contacter cette PME
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AnnuaireCertifie() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('Toutes');
  const [secteur, setSecteur] = useState('Tous');
  const [badgeMin, setBadgeMin] = useState('');
  const [selectedPme, setSelectedPme] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const badgeOrder = { or: 3, argent: 2, bronze: 1 };

  const filtered = pmesCertifiees.filter(p => {
    const matchSearch = p.nom.toLowerCase().includes(search.toLowerCase()) || p.secteur.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === 'Toutes' || p.region === region;
    const matchSecteur = secteur === 'Tous' || p.secteur === secteur;
    const matchBadge = !badgeMin || badgeOrder[p.badge] >= badgeOrder[badgeMin];
    return matchSearch && matchRegion && matchSecteur && matchBadge;
  });

  const hasFilters = region !== 'Toutes' || secteur !== 'Tous' || badgeMin;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white p-8 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Espace Sourcing Sécurisé</p>
          <h1 className="text-3xl font-black">Annuaire Certifié BSTP</h1>
          <p className="text-white/60 mt-2 text-sm font-medium">Seules les PME ayant obtenu leur badge de certification BSTP apparaissent ici.</p>
        </div>
        <div className="bg-white/10 rounded-2xl px-6 py-4 text-center flex-shrink-0">
          <p className="text-4xl font-black">{filtered.length}</p>
          <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mt-1">PME qualifiées</p>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher une PME, un secteur..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm border transition-all ${showFilters || hasFilters ? 'bg-nexus-50 border-nexus-200 text-nexus-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
          >
            <Filter size={16} />
            Filtres
            {hasFilters && <span className="w-2 h-2 rounded-full bg-nexus-500" />}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-50">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Région</label>
                  <select value={region} onChange={e => setRegion(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500">
                    {REGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Secteur</label>
                  <select value={secteur} onChange={e => setSecteur(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500">
                    {SECTEURS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Badge minimum</label>
                  <select value={badgeMin} onChange={e => setBadgeMin(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-nexus-500">
                    {BADGES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
              </div>
              {hasFilters && (
                <button onClick={() => { setRegion('Toutes'); setSecteur('Tous'); setBadgeMin(''); }}
                  className="mt-3 text-xs font-bold text-danger-600 hover:text-danger-700 flex items-center gap-1 transition-colors">
                  <X size={12} /> Réinitialiser les filtres
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.length > 0 ? filtered.map(pme => (
            <PmeCard key={pme.id} pme={pme} onClick={setSelectedPme} />
          )) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="col-span-3 py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <Building2 size={40} className="text-gray-200 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900">Aucune PME trouvée</h3>
              <p className="text-gray-400 mt-1 text-sm">Ajustez vos filtres de recherche.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* PME Detail Drawer */}
      <AnimatePresence>
        {selectedPme && <PmeDrawer pme={selectedPme} onClose={() => setSelectedPme(null)} />}
      </AnimatePresence>
    </div>
  );
}
