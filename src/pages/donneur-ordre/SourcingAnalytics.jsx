import { useState } from 'react';
import { motion } from 'framer-motion';
import { aoPublies } from '../../data/opportunities.mock';
import OfferComparisonTable from '../../components/donneur-ordre/OfferComparisonTable';
import { BarChart3, Briefcase, Users, DollarSign, Target, Calendar, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const formatCFA = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';

const COLORS = ['#635bff', '#0ea5e9', '#22c55e', '#f59e0b'];

const CANDIDATURES_CHART = aoPublies.map(ao => ({
  name: ao.id,
  titre: ao.titre.substring(0, 20) + '...',
  candidats: ao.soumissionnaires.length,
  budget: ao.budgetFcfa,
}));

export default function SourcingAnalytics() {
  const [selectedAo, setSelectedAo] = useState(aoPublies[0]);

  const totalCandidatures = aoPublies.reduce((a, ao) => a + ao.soumissionnaires.length, 0);
  const totalBudget = aoPublies.reduce((a, ao) => a + ao.budgetFcfa, 0);
  const avgMatch = aoPublies.length > 0
    ? Math.round(aoPublies.reduce((a, ao) => a + ao.soumissionnaires.reduce((s, b) => s + b.matchScore, 0) / ao.soumissionnaires.length, 0) / aoPublies.length)
    : 0;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Espace Sourcing Sécurisé</p>
          <h1 className="text-3xl font-black tracking-tight">Sourcing Analytics</h1>
          <p className="text-white/70 mt-2 font-medium text-sm max-w-lg">Analysez les candidatures reçues et comparez la fiabilité des PME soumissionnaires.</p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <BarChart3 size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={16} className="text-nexus-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">AO Publiés</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{aoPublies.length}</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-success-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Candidatures</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{totalCandidatures}</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-gold-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Budget Total</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{(totalBudget / 1e6).toFixed(0)}M</span>
          <span className="text-xs text-gray-400 font-semibold ml-1">FCFA</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-warning-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Match Moyen</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{avgMatch}%</span>
        </div>
      </div>

      {/* Chart: Candidatures par AO */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
        <h3 className="text-sm font-bold text-gray-900 mb-1">Candidatures par Appel d'Offres</h3>
        <p className="text-xs text-gray-400 font-semibold mb-6">Nombre de PME soumissionnaires par AO publié</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CANDIDATURES_CHART} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }}
                formatter={(val, name, props) => [`${val} candidats`, props.payload.titre]}
              />
              <Bar dataKey="candidats" radius={[8, 8, 0, 0]} barSize={48}>
                {CANDIDATURES_CHART.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Grid: AO list + Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: AO list */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <h3 className="font-bold text-gray-900 text-sm border-b border-gray-50 pb-3">Vos Appels d'Offres</h3>
          <div className="space-y-3">
            {aoPublies.map((ao) => (
              <button
                key={ao.id}
                onClick={() => setSelectedAo(ao)}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex flex-col gap-2 ${
                  selectedAo?.id === ao.id ? 'bg-nexus-50 border-nexus-200 text-nexus-900 shadow-sm' : 'bg-gray-50 border-gray-100 hover:bg-gray-100/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-nexus-600 bg-white px-2 py-0.5 rounded border border-nexus-100">{ao.id}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{ao.statut}</span>
                </div>
                <h4 className="font-bold text-gray-800 leading-snug line-clamp-2">{ao.titre}</h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{ao.secteur}</span>
                  <span>·</span>
                  <span>{ao.region}</span>
                </div>
                <div className="flex justify-between items-center mt-1 border-t border-gray-100/50 pt-2">
                  <span className="text-[10px] text-gray-400 font-semibold">{ao.soumissionnaires.length} candidats</span>
                  <span className="font-black text-gray-900">{(ao.budgetFcfa / 1e6).toFixed(0)}M FCFA</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Comparison table */}
        <div className="lg:col-span-2">
          <OfferComparisonTable offer={selectedAo} />
        </div>
      </div>

      {/* Timeline des publications */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar size={16} className="text-gray-400" /> Chronologie des Publications</h3>
        <div className="space-y-3">
          {aoPublies.map((ao, idx) => (
            <div key={ao.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-nexus-500' : 'bg-gray-200'}`} />
                {idx < aoPublies.length - 1 && <div className="w-0.5 h-8 bg-gray-100" />}
              </div>
              <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div>
                  <p className="text-xs font-bold text-gray-900">{ao.titre}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{ao.datePublication} · {ao.soumissionnaires.length} candidats reçus</p>
                </div>
                <span className="text-[10px] font-bold text-nexus-600 bg-nexus-50 px-2 py-1 rounded">{ao.statut}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}