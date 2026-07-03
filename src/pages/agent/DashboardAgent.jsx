import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auditQueue, planningTerrain, mediationDossiers } from '../../data/agent-tasks.mock';
import { ClipboardCheck, Calendar, Scale, ChevronRight, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DashboardAgent() {
  const navigate = useNavigate();

  const pendingAudits = auditQueue.length;
  const urgentAudits = auditQueue.filter(t => t.urgent).length;
  const upcomingVisits = planningTerrain.length;
  const activeMediations = mediationDossiers.length;

  const modules = [
    {
      id: 'audit',
      label: 'Audit Documentaire',
      icon: ClipboardCheck,
      desc: 'Validez ou rejetez les pièces justificatives des PME en attente de certification.',
      stats: [
        { label: 'En attente', value: pendingAudits, color: 'text-nexus-700' },
        { label: 'Urgents', value: urgentAudits, color: 'text-danger-600' },
      ],
      color: 'nexus',
      path: '/agent/audits',
    },
    {
      id: 'terrain',
      label: 'Planification Terrain',
      icon: Calendar,
      desc: 'Programmez et gérez les descentes terrain pour l\'audit physique des PME.',
      stats: [
        { label: 'Visites', value: upcomingVisits, color: 'text-success-700' },
        { label: 'Confirmées', value: planningTerrain.filter(v => v.statut === 'confirme').length, color: 'text-success-600' },
      ],
      color: 'success',
      path: '/agent/terrain',
    },
    {
      id: 'mediation',
      label: 'Médiation Tripartite',
      icon: Scale,
      desc: 'Arbitrez les litiges et débloquez les contrats en stagnation.',
      stats: [
        { label: 'Dossiers', value: activeMediations, color: 'text-danger-600' },
        { label: 'Stagnation moy.', value: `${Math.round(mediationDossiers.reduce((a, d) => a + d.joursStagnation, 0) / mediationDossiers.length)}j`, color: 'text-warning-600' },
      ],
      color: 'danger',
      path: '/agent/mediation',
    },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-soft"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-nexus-50 px-3 py-1 rounded-full mb-3">
            <div className="w-2 h-2 rounded-full bg-nexus-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-nexus-700">Back-Office Agent BSTP</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-500 mt-2 text-sm">Vue d'ensemble de votre charge de travail et des actions prioritaires.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-nexus-50 rounded-2xl px-5 py-4 text-center">
            <p className="text-3xl font-black text-nexus-700">{pendingAudits + upcomingVisits + activeMediations}</p>
            <p className="text-[11px] font-bold text-nexus-400 uppercase tracking-widest mt-1">Tâches totales</p>
          </div>
          {urgentAudits > 0 && (
            <div className="bg-danger-500 rounded-2xl px-5 py-4 text-center">
              <p className="text-3xl font-black text-white">{urgentAudits}</p>
              <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mt-1">Urgent</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Module cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, idx) => {
          const Icon = mod.icon;
          const colorClasses = {
            nexus: { bg: 'bg-nexus-50', border: 'border-nexus-100', iconBg: 'bg-nexus-500', iconColor: 'text-white', btn: 'bg-nexus-500 hover:bg-nexus-600' },
            success: { bg: 'bg-success-50', border: 'border-success-100', iconBg: 'bg-success-500', iconColor: 'text-white', btn: 'bg-success-500 hover:bg-success-600' },
            danger: { bg: 'bg-danger-50', border: 'border-danger-100', iconBg: 'bg-danger-500', iconColor: 'text-white', btn: 'bg-danger-500 hover:bg-danger-600' },
          };
          const c = colorClasses[mod.color];

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.iconBg} ${c.iconColor}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{mod.label}</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{mod.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                {mod.stats.map((stat, i) => (
                  <div key={i} className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                    <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(mod.path)}
                className={`flex items-center justify-center gap-2 ${c.btn} text-white rounded-xl py-3 text-sm font-bold transition-colors`}
              >
                Accéder <ChevronRight size={16} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/agent/audits')}
            className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-nexus-50 hover:border-nexus-100 transition-all text-left"
          >
            <ClipboardCheck size={20} className="text-nexus-500" />
            <div>
              <p className="text-sm font-bold text-gray-900">Auditer les nouveaux dossiers</p>
              <p className="text-xs text-gray-500 font-medium">{pendingAudits} PME en attente</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/agent/terrain')}
            className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-success-50 hover:border-success-100 transition-all text-left"
          >
            <Calendar size={20} className="text-success-500" />
            <div>
              <p className="text-sm font-bold text-gray-900">Planifier une descente</p>
              <p className="text-xs text-gray-500 font-medium">{upcomingVisits} visites programmées</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/agent/mediation')}
            className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-danger-50 hover:border-danger-100 transition-all text-left"
          >
            <Scale size={20} className="text-danger-500" />
            <div>
              <p className="text-sm font-bold text-gray-900">Traiter un litige</p>
              <p className="text-xs text-gray-500 font-medium">{activeMediations} dossiers de médiation</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}