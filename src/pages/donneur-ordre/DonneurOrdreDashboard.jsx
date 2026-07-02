import { motion } from 'framer-motion';
import { opportunities } from '../../data/opportunities.mock';
import { pmesCertifiees } from '../../data/donneurs-ordre.mock';
import KpiCard from '../../components/ui/KpiCard';
import TrustBadge from '../../components/ui/TrustBadge';
import { Briefcase, Users, DollarSign, Target, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const stats = {
  activeAo: 4,
  engagedBudgetMds: 120.4,
  matchRate: 83.5,
  pmeCount: 684,
};

const sparklineData = [10, 15, 20, 25, 30, 42, 50, 68, 75, 80, 85, 92];

export default function DonneurOrdreDashboard() {
  return (
    <div className="space-y-6 pb-16">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Espace Sourcing Sécurisé</p>
          <h1 className="text-3xl font-black tracking-tight">Portail Acheteur Donneur d'Ordre</h1>
          <p className="text-white/70 mt-2 font-medium text-sm max-w-lg">
            Identifiez des partenaires locaux fiables, publiez vos besoins industriels et suivez vos appels d'offres qualifiés.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 rounded-2xl px-6 py-4 text-center">
            <span className="text-3xl font-black text-white">{stats.activeAo}</span>
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">Marchés ouverts</p>
          </div>
          <div className="bg-white/10 rounded-2xl px-6 py-4 text-center">
            <span className="text-3xl font-black text-white">{stats.pmeCount}</span>
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">PME Certifiées</p>
          </div>
        </div>
      </motion.div>

      {/* Sourcing Flash Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Appels d'Offres Actifs"
          value={stats.activeAo}
          icon={Briefcase}
          sparkline={[2, 3, 2, 4, 3, 5, 4, 3, 5, 4, 4, 4]}
          trend="up"
          trendValue="+1"
          color="nexus"
          delay={0.1}
        />
        <KpiCard
          title="PME Certifiées BSTP"
          value={stats.pmeCount}
          icon={Users}
          sparkline={sparklineData}
          trend="up"
          trendValue="+12%"
          color="success"
          delay={0.2}
        />
        <KpiCard
          title="Budget Engagé (Millions FCFA)"
          value={stats.engagedBudgetMds}
          unit="M"
          icon={DollarSign}
          sparkline={[80, 85, 90, 95, 100, 105, 110, 115, 120.4]}
          trend="up"
          trendValue="+5.4%"
          color="gold"
          delay={0.3}
        />
        <KpiCard
          title="Taux de Match Moyen"
          value={`${stats.matchRate}%`}
          icon={Target}
          sparkline={[70, 72, 75, 76, 78, 80, 81, 82, 83.5]}
          trend="up"
          trendValue="+2.1%"
          color="warning"
          delay={0.4}
        />
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Recent Certified Companies */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">PME Certifiées Récemment</h3>
            <Link to="/donneur-ordre/annuaire" className="text-xs font-bold text-nexus-500 hover:text-nexus-700">
              Annuaire →
            </Link>
          </div>
          <div className="space-y-4">
            {pmesCertifiees.slice(0, 3).map((pme) => (
              <div key={pme.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-nexus-900 text-white rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0">
                  {pme.sigle}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-xs truncate">{pme.nom}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{pme.secteur} · {pme.region}</p>
                </div>
                <TrustBadge level={pme.badge} size="sm" showLabel={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Active Opportunity feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">Vos Appels d'Offres & Sourcing Actif</h3>
            <Link to="/donneur-ordre/analytics" className="text-xs font-bold text-nexus-500 hover:text-nexus-700">
              Analytique →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {opportunities.slice(0, 2).map((ao) => (
              <div key={ao.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-800 text-xs leading-snug">{ao.titre}</h4>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded">Région : {ao.region}</span>
                    <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded">Badge requis : {ao.badgeMinimum.toUpperCase()}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-black text-gray-900">{(ao.budgetFcfa / 1e6).toFixed(0)}M FCFA</span>
                  <p className="text-[9px] text-success-700 font-bold uppercase mt-0.5">3 candidats</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom CTA Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/donneur-ordre/publier"
          className="bg-white border border-gray-100 shadow-sm hover:border-nexus-100 hover:bg-nexus-50 rounded-2xl p-6 flex items-center gap-4 transition-all group"
        >
          <div className="w-12 h-12 bg-nexus-50 text-nexus-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-100 transition-colors">
            <Briefcase size={22} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Publier un nouvel Appel d'Offres</h4>
            <p className="text-xs text-gray-400 font-semibold mt-1">Ciblez instantanément les PME éligibles via notre matching IA</p>
          </div>
          <ArrowRight size={18} className="ml-auto text-gray-300 group-hover:text-nexus-500 transition-all" />
        </Link>

        <Link
          to="/donneur-ordre/annuaire"
          className="bg-white border border-gray-100 shadow-sm hover:border-nexus-100 hover:bg-nexus-50 rounded-2xl p-6 flex items-center gap-4 transition-all group"
        >
          <div className="w-12 h-12 bg-nexus-50 text-nexus-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-100 transition-colors">
            <Users size={22} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Consulter l'Annuaire Certifié</h4>
            <p className="text-xs text-gray-400 font-semibold mt-1">Filtrez les PME locales par région, secteur et badge de fiabilité</p>
          </div>
          <ArrowRight size={18} className="ml-auto text-gray-300 group-hover:text-nexus-500 transition-all" />
        </Link>
      </div>

    </div>
  );
}
