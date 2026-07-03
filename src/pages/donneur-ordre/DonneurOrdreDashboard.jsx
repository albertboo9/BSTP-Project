import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { opportunities } from '../../data/opportunities.mock';
import { pmesCertifiees } from '../../data/donneurs-ordre.mock';
import KpiCard from '../../components/ui/KpiCard';
import TrustBadge from '../../components/ui/TrustBadge';
import MilestonePipeline from '../../components/ui/MilestonePipeline';
import SmartMatchmakingIA from '../../components/donneur-ordre/SmartMatchmakingIA';
import { Briefcase, Users, DollarSign, Target, ArrowRight, AlertTriangle, Clock, CheckCircle, HardHat, BarChart3, Zap, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const stats = { activeAo: 4, engagedBudgetMds: 120.4, matchRate: 83.5, pmeCount: 684 };

const CONTRACTS_RECENTS = [
  { id: "C-2026-001", titre: "Construction hangar — Douala", pme: "BATIM SARL", budget: 75000000, statut: "en_cours", progression: 65, do: "SCDP", milestones: [
    { label: "Signature", statut: "done" }, { label: "Démarrage", statut: "done" }, { label: "Livraison 50%", statut: "active" }, { label: "Recette", statut: "pending" },
  ]},
  { id: "C-2026-002", titre: "Audit cybersécurité SI", pme: "TECHBUILD", budget: 12000000, statut: "bloque", progression: 30, do: "SOSUCAM", alert: true },
  { id: "C-2026-003", titre: "Transport navettes Bafoussam", pme: "LOGISTIQUE PLUS", budget: 8400000, statut: "termine", progression: 100, do: "CDC" },
];

const SECTEURS_AO = [
  { name: "BTP", value: 2, fill: "#635bff" },
  { name: "Informatique", value: 1, fill: "#0ea5e9" },
  { name: "Transport", value: 1, fill: "#22c55e" },
];

function formatCFA(n) { return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'; }

export default function DonneurOrdreDashboard() {
  const navigate = useNavigate();
  const [showMatchmaking, setShowMatchmaking] = useState(false);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Espace Sourcing Sécurisé</p>
          <h1 className="text-3xl font-black tracking-tight">Portail Acheteur Donneur d'Ordre</h1>
          <p className="text-white/70 mt-2 font-medium text-sm max-w-lg">Identifiez des partenaires locaux fiables, publiez vos besoins et suivez vos marchés.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 rounded-2xl px-6 py-4 text-center"><span className="text-3xl font-black text-white">{stats.activeAo}</span><p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">Marchés ouverts</p></div>
          <div className="bg-white/10 rounded-2xl px-6 py-4 text-center"><span className="text-3xl font-black text-white">{stats.pmeCount}</span><p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">PME Certifiées</p></div>
        </div>
      </motion.div>

      {/* KPI Flash */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Appels d'Offres Actifs" value={stats.activeAo} icon={Briefcase} sparkline={[2,3,2,4,3,5,4,3,5,4,4,4]} trend="up" trendValue="+1" color="nexus" delay={0.1} />
        <KpiCard title="PME Certifiées BSTP" value={stats.pmeCount} icon={Users} sparkline={[10,15,20,25,30,42,50,68,75,80,85,92]} trend="up" trendValue="+12%" color="success" delay={0.2} />
        <KpiCard title="Budget Engagé (M FCFA)" value={stats.engagedBudgetMds} unit="M" icon={DollarSign} sparkline={[80,85,90,95,100,105,110,115,120.4]} trend="up" trendValue="+5.4%" color="gold" delay={0.3} />
        <KpiCard title="Taux de Match Moyen" value={`${stats.matchRate}%`} icon={Target} sparkline={[70,72,75,76,78,80,81,82,83.5]} trend="up" trendValue="+2.1%" color="warning" delay={0.4} />
      </div>

      {/* Row 2: Chart + Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AO par secteur */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
          <h3 className="text-sm font-bold text-gray-900 mb-4">AO par Secteur</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SECTEURS_AO} layout="vertical" margin={{ left: -10 }}>
                <XAxis type="number" tick={false} axisLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fontWeight: 600, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
                  {SECTEURS_AO.map((e,i) => <Cell key={i} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5">
            {SECTEURS_AO.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{backgroundColor:s.fill}} />{s.name}</span>
                <span className="font-bold text-gray-900">{s.value} AO</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes contrats */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><AlertTriangle size={16} className="text-danger-500" /> Alertes Contractuelles</h3>
          {CONTRACTS_RECENTS.filter(c => c.alert).length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-3"><CheckCircle size={24} className="text-success-500" /></div>
              <p className="text-sm font-bold text-gray-900">Aucune alerte</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Tous vos contrats sont en bonne voie.</p>
            </div>
          ) : CONTRACTS_RECENTS.filter(c => c.alert).map(c => (
            <div key={c.id} className="bg-danger-50 border border-danger-100 rounded-xl p-4 mb-3 last:mb-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-danger-700">{c.id}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-danger-600"><Clock size={10} /> Bloqué</span>
              </div>
              <p className="text-xs font-bold text-gray-900">{c.titre}</p>
              <p className="text-[10px] text-gray-500 font-medium mt-1">{c.pme} → {c.do}</p>
            </div>
          ))}
          <button onClick={() => navigate('/donneur-ordre/suivi-chantiers')} className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-50 border border-gray-100 rounded-xl py-3 text-xs font-bold text-nexus-600 hover:bg-nexus-50 transition-colors">
            Voir tous les chantiers <ArrowRight size={14} />
          </button>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Actions Rapides</h3>
          <div className="space-y-3">
            <button onClick={() => navigate('/donneur-ordre/publier')} className="w-full flex items-center gap-3 p-4 bg-nexus-50 border border-nexus-100 rounded-xl hover:bg-nexus-100 transition-all text-left">
              <Briefcase size={20} className="text-nexus-500" />
              <div><p className="text-sm font-bold text-gray-900">Publier un AO</p><p className="text-[10px] text-gray-500 font-medium">Ciblez les PME via matching IA</p></div>
            </button>
            <button onClick={() => navigate('/donneur-ordre/annuaire')} className="w-full flex items-center gap-3 p-4 bg-success-50 border border-success-100 rounded-xl hover:bg-success-100 transition-all text-left">
              <Users size={20} className="text-success-500" />
              <div><p className="text-sm font-bold text-gray-900">Consulter l'Annuaire</p><p className="text-[10px] text-gray-500 font-medium">{pmesCertifiees.length} PME certifiées disponibles</p></div>
            </button>
            <button onClick={() => navigate('/donneur-ordre/suivi-chantiers')} className="w-full flex items-center gap-3 p-4 bg-warning-50 border border-warning-100 rounded-xl hover:bg-warning-100 transition-all text-left">
              <HardHat size={20} className="text-warning-500" />
              <div><p className="text-sm font-bold text-gray-900">Suivre vos Chantiers</p><p className="text-[10px] text-gray-500 font-medium">Consultez la progression et les médias</p></div>
            </button>
            <button onClick={() => navigate('/donneur-ordre/analytics')} className="w-full flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-all text-left">
              <BarChart3 size={20} className="text-gray-500" />
              <div><p className="text-sm font-bold text-gray-900">Analytics Sourcing</p><p className="text-[10px] text-gray-500 font-medium">Comparez les offres reçues</p></div>
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Contrats récents + PME certifiées */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contrats récents */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Contrats Récents</h3>
            <button onClick={() => navigate('/donneur-ordre/suivi-chantiers')} className="text-xs font-bold text-nexus-500 hover:text-nexus-700">Voir tout →</button>
          </div>
          <div className="space-y-4">
            {CONTRACTS_RECENTS.map(c => (
              <div key={c.id} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white transition-all cursor-pointer" onClick={() => navigate('/donneur-ordre/suivi-chantiers')}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.alert ? 'bg-danger-100 text-danger-600' : c.progression === 100 ? 'bg-success-100 text-success-600' : 'bg-nexus-100 text-nexus-600'}`}>
                  {c.alert ? <AlertTriangle size={18} /> : c.progression === 100 ? <CheckCircle size={18} /> : <Clock size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-gray-400">{c.id}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.statut === 'termine' ? 'bg-success-50 text-success-700' : c.statut === 'bloque' ? 'bg-danger-50 text-danger-700' : 'bg-nexus-50 text-nexus-700'}`}>
                      {c.statut === 'termine' ? 'Terminé' : c.statut === 'bloque' ? 'Bloqué' : 'En cours'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 truncate mt-0.5">{c.titre}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{c.pme} · {formatCFA(c.budget)}</p>
                </div>
                <div className="w-20 text-right">
                  <p className="text-sm font-black text-gray-900">{c.progression}%</p>
                  <div className="h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div className={`h-full rounded-full ${c.alert ? 'bg-danger-500' : c.progression === 100 ? 'bg-success-500' : 'bg-nexus-500'}`} style={{width:`${c.progression}%`}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PME certifiées récemment */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Nouvelles PME Certifiées</h3>
            <button onClick={() => navigate('/donneur-ordre/annuaire')} className="text-xs font-bold text-nexus-500 hover:text-nexus-700">Annuaire →</button>
          </div>
          <div className="space-y-3">
            {pmesCertifiees.slice(0, 4).map(pme => (
              <div key={pme.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer" onClick={() => navigate('/donneur-ordre/annuaire')}>
                <div className="w-10 h-10 bg-nexus-900 text-white rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0">{pme.sigle}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-gray-900 truncate">{pme.nom}</h4>
                  <p className="text-[9px] text-gray-400 font-medium">{pme.secteur} · {pme.ville}</p>
                </div>
                <TrustBadge level={pme.badge} size="sm" showLabel={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}