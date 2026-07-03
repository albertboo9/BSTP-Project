import { observatoireData } from '../../data/observatoire.mock';
import KpiCard from '../../components/ui/KpiCard';
import StatusPipeline from '../../components/dg/StatusPipeline';
import CapitalHumainCard from '../../components/dg/CapitalHumainCard';
import SectorBreakdownChart from '../../components/dg/SectorBreakdownChart';
import KeyAccountsTable from '../../components/dg/KeyAccountsTable';
import RegionMap from '../../components/dg/RegionMap';
import FlagIndicator from '../../components/ui/FlagIndicator';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Building2, TrendingUp, DollarSign, Target, Download, RefreshCw, BarChart3 } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

function SectionCard({ title, subtitle, children, className = '', delay = 0, animated = true }) {
  if (!animated) {
    return (
      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 ${className}`}>
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs font-semibold text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 ${className}`}
    >
      <div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs font-semibold text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}

export default function DashboardDG() {
  const { kpis, sparklines, pipeline, capitalHumain, secteurs, donneurs, regions, vigilance } = observatoireData;

  const handleExport = () => {
    toast.loading('Génération du rapport national...', { id: 'export' });
    setTimeout(() => toast.success('Rapport PDF généré et prêt au téléchargement.', { id: 'export' }), 2000);
  };

  const pctTrend = (curr, prev) => {
    const diff = ((curr - prev) / prev * 100).toFixed(1);
    return diff >= 0 ? `+${diff}%` : `${diff}%`;
  };
  const pctTrend2 = (curr, prev) => curr >= prev ? 'up' : 'down';

  return (
    <div className="space-y-6 pb-16">

      {/* ─── HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-gray-100 p-8 rounded-2xl shadow-soft"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-nexus-50 px-3 py-1 rounded-full mb-3">
            <div className="w-2 h-2 rounded-full bg-nexus-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-nexus-700">Cockpit Stratégique National</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Direction Générale — Observatoire</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium max-w-xl">
            Vue consolidée de l'écosystème de sous-traitance BSTP. Données agrégées en temps réel.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('Synchronisation des données...')} className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 px-4 py-3 rounded-xl font-semibold text-sm transition-all">
            <RefreshCw size={16} /> Synchroniser
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 bg-nexus-500 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-nexus-600 transition-all shadow-soft">
            <Download size={16} /> Exporter le rapport
          </button>
        </div>
      </motion.div>

      {/* ─── BLOC 1 : KPI FLASH ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="PME Référencées"
          value={kpis.totalPme.toLocaleString()}
          icon={Building2}
          sparkline={sparklines.totalPme}
          trend={pctTrend2(kpis.totalPme, kpis.totalPmePrev)}
          trendValue={pctTrend(kpis.totalPme, kpis.totalPmePrev)}
          color="nexus" delay={0.1}
        />
        <KpiCard
          title="Maturité Nationale Moyenne"
          value={kpis.maturitemoyenne}
          unit="%"
          icon={TrendingUp}
          sparkline={sparklines.maturitemoyenne}
          trend={pctTrend2(kpis.maturitemoyenne, kpis.maturitemoyennePrev)}
          trendValue={pctTrend(kpis.maturitemoyenne, kpis.maturitemoyennePrev)}
          color="success" delay={0.2}
        />
        <KpiCard
          title="Volume Économique Capté"
          value={kpis.volumeFcfaMds}
          unit="Mds FCFA"
          icon={DollarSign}
          sparkline={sparklines.volumeFcfa}
          trend={pctTrend2(kpis.volumeFcfaMds, kpis.volumeFcfaMdsPrev)}
          trendValue={pctTrend(kpis.volumeFcfaMds, kpis.volumeFcfaMdsPrev)}
          color="gold" delay={0.3}
        />
        <KpiCard
          title="Taux de Conversion AO → PME"
          value={kpis.tauxConversion}
          unit="%"
          icon={Target}
          sparkline={sparklines.tauxConversion}
          trend={pctTrend2(kpis.tauxConversion, kpis.tauxConversionPrev)}
          trendValue={pctTrend(kpis.tauxConversion, kpis.tauxConversionPrev)}
          color="warning" delay={0.4}
        />
      </div>

      {/* ─── BLOC 2 : CHAÎNE DE VALEUR ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard
          title="Pipeline Statutaire des PME"
          subtitle="Avancement dans le parcours de certification BSTP"
          delay={4}
        >
          <StatusPipeline pipeline={pipeline} />
        </SectionCard>

        <SectionCard
          title="Capital Humain & Formations"
          subtitle="Impact de la BSTP Academy sur l'écosystème"
          delay={5}
        >
          <CapitalHumainCard data={capitalHumain} />
        </SectionCard>
      </div>

      {/* ─── BLOC 3 : VUE MATRICIELLE CROISÉE ─── */}
      <div>
        <h2 className="text-lg font-black text-gray-900 mb-4">Vue Matricielle Croisée — Dashboard de Gouvernance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Analyse Sectorielle */}
          <SectionCard
            title="Analyse Sectorielle"
            subtitle="Répartition des PME par filière industrielle"
            delay={6}
          >
            <SectorBreakdownChart data={secteurs} />
          </SectionCard>

          {/* Analyse Institutionnelle */}
          <SectionCard
            title="Analyse Institutionnelle"
            subtitle="Volume de marchés injectés par donneur d'ordre partenaire"
            delay={7}
          >
            <KeyAccountsTable data={donneurs} />
          </SectionCard>

          {/* Carte Territoriale */}
          <SectionCard
            title="Analyse Territoriale"
            subtitle="Impact économique par région (nombre de PME)"
            delay={8}
            animated={false}
          >
            <RegionMap regions={regions} />
          </SectionCard>

          {/* Vigilance Opérationnelle */}
          <SectionCard
            title="Vigilance Opérationnelle"
            subtitle="Chantiers en stagnation — Drapeaux rouges actifs"
            delay={9}
          >
            <FlagIndicator
              count={vigilance.drapeauxRouges}
              total={vigilance.drapeauxTotal}
              percent={vigilance.pourcentage}
            />
            <div className="mt-2 space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contrats critiques</h4>
              {vigilance.contratsCritiques.map(c => (
                <button
                  key={c.id}
                  onClick={() => toast.warning(`Contrat ${c.id}`, { description: `PME: ${c.pme} — Bloqué à : "${c.jalonsBloque}" depuis ${c.joursStagnation} jours` })}
                  className="w-full flex items-center justify-between bg-danger-50 border border-danger-100 rounded-xl px-4 py-3 hover:bg-danger-100 transition-colors text-left"
                >
                  <div>
                    <span className="text-xs font-black text-danger-700">{c.id}</span>
                    <p className="text-xs font-semibold text-gray-600 mt-0.5">{c.pme} → {c.do}</p>
                  </div>
                  <span className="text-xs font-bold text-danger-700 bg-white rounded-lg px-2 py-1 border border-danger-100 flex-shrink-0">
                    {c.joursStagnation}j
                  </span>
                </button>
              ))}
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}
