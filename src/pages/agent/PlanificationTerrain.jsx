import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { planningTerrain } from '../../data/agent-tasks.mock';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, Plus, FileText, ChevronRight } from 'lucide-react';

export default function PlanificationTerrain() {
  const [visits, setVisits] = useState(planningTerrain);

  const confirmedCount = visits.filter(v => v.statut === 'confirme').length;
  const pendingCount = visits.filter(v => v.statut === 'en_attente').length;

  const getStatusStyle = (statut) => {
    return statut === 'confirme'
      ? { bg: 'bg-success-50', text: 'text-success-700', border: 'border-success-100', icon: <CheckCircle size={14} />, label: 'Confirmé' }
      : { bg: 'bg-warning-50', text: 'text-warning-700', border: 'border-warning-100', icon: <AlertCircle size={14} />, label: 'En attente' };
  };

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
          <h1 className="text-3xl font-black text-gray-900">Planification Terrain</h1>
          <p className="text-gray-500 mt-2 text-sm">Programmez et gérez les descentes terrain pour l'audit physique des PME.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-success-50 rounded-2xl px-5 py-4 text-center">
            <p className="text-3xl font-black text-success-700">{confirmedCount}</p>
            <p className="text-[11px] font-bold text-success-500 uppercase tracking-widest mt-1">Confirmées</p>
          </div>
          <div className="bg-warning-50 rounded-2xl px-5 py-4 text-center">
            <p className="text-3xl font-black text-warning-700">{pendingCount}</p>
            <p className="text-[11px] font-bold text-warning-500 uppercase tracking-widest mt-1">En attente</p>
          </div>
          <button
            onClick={() => toast.info('Nouvelle visite', { description: 'Sélectionnez une PME, une date et un agent référent.' })}
            className="flex items-center gap-2 bg-nexus-500 text-white px-5 py-4 rounded-2xl font-bold text-sm hover:bg-nexus-600 transition-colors"
          >
            <Plus size={18} /> Planifier
          </button>
        </div>
      </motion.div>

      {/* Calendar Overview */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Calendrier des Descentes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visits.map((visit, idx) => {
            const s = getStatusStyle(visit.statut);
            const date = new Date(visit.dateVisite);
            return (
              <motion.div
                key={visit.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-shadow"
              >
                {/* Date badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-center min-w-[56px]">
                      <p className="text-lg font-black text-gray-900">{date.getDate()}</p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase">{date.toLocaleDateString('fr-FR', { month: 'short' })}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{visit.pme}</h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{visit.region}</p>
                    </div>
                  </div>
                </div>

                {/* Infos */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={12} className="text-gray-400" />
                    <span className="font-medium">{visit.adresse}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={12} className="text-gray-400" />
                    <span className="font-medium">{visit.heure}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium">Agent: {visit.agent}</span>
                  </div>
                </div>

                {/* Status + actions */}
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border ${s.bg} ${s.text} ${s.border}`}>
                    {s.icon}{s.label}
                  </span>
                  <button
                    onClick={() => toast.info(`Rapport: ${visit.pme}`, { description: 'Remplissez le compte-rendu d\'audit de terrain.' })}
                    className="flex items-center gap-1 text-xs font-bold text-nexus-500 hover:text-nexus-700 transition-colors"
                  >
                    <FileText size={12} /> Rapport <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Visites ce mois</span>
          <p className="text-2xl font-black text-gray-900 mt-1">{visits.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Taux de confirmation</span>
          <p className="text-2xl font-black text-gray-900 mt-1">{visits.length > 0 ? Math.round((confirmedCount / visits.length) * 100) : 0}%</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rapports en attente</span>
          <p className="text-2xl font-black text-gray-900 mt-1">{pendingCount}</p>
        </div>
      </div>
    </div>
  );
}