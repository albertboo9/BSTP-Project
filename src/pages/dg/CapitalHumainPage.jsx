import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Users } from 'lucide-react';
import KpiCard from '../../components/ui/KpiCard';

const RECENT_GRADUATES = [
  { pme: "Alpha Industrial Services", course: "Local Content Cameroun 2025", date: "02.07.2026", status: "Certifié" },
  { pme: "SIMTECH 3D", course: "Système de Management Qualité ISO 9001", date: "30.06.2026", status: "Certifié" },
  { pme: "BatiConstruct Sarl", course: "Initiation HSE", date: "28.06.2026", status: "En cours" }
];

export default function CapitalHumainPage() {
  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Observatoire National</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Capital Humain & E-learning</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Analysez la montée en compétences et l'impact des formations certifiantes BSTP Academy.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <GraduationCap size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          title="Certifications Délivrées"
          value={142}
          icon={Award}
          sparkline={[10, 20, 35, 50, 75, 95, 110, 130, 142]}
          trend="up"
          trendValue="+12%"
          color="success"
        />
        <KpiCard
          title="Apprenants Actifs"
          value={384}
          icon={Users}
          sparkline={[100, 150, 210, 260, 310, 350, 384]}
          trend="up"
          trendValue="+8.5%"
          color="nexus"
        />
        <KpiCard
          title="Heures de Formation"
          value="1,420"
          icon={BookOpen}
          sparkline={[500, 700, 950, 1100, 1300, 1420]}
          trend="up"
          trendValue="+15%"
          color="gold"
        />
      </div>

      {/* Graduate tracking table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Certifications et Montée en Compétence Récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 text-left">
                <th className="pb-3 uppercase tracking-wider font-bold">PME Apprenante</th>
                <th className="pb-3 uppercase tracking-wider font-bold">Module Validé</th>
                <th className="pb-3 uppercase tracking-wider font-bold">Date de complétion</th>
                <th className="pb-3 uppercase tracking-wider font-bold text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-850">
              {RECENT_GRADUATES.map((g, idx) => (
                <tr key={idx} className="hover:bg-gray-950/40">
                  <td className="py-3.5 font-bold text-white">{g.pme}</td>
                  <td className="py-3.5 text-gray-300 font-semibold">{g.course}</td>
                  <td className="py-3.5 text-gray-400 font-semibold">{g.date}</td>
                  <td className="py-3.5 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      g.status === 'Certifié' ? 'text-success-400 bg-success-500/10' : 'text-warning-400 bg-warning-500/10'
                    }`}>
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
