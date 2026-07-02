import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useDgStore } from '../../stores/dgStore';
import StatCard from '../../components/dg/StatCard';
import { Building2, ShieldCheck, Activity, Users, Download, ArrowRight, Shield, Search, FileText, UserPlus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#635bff', '#10b981', '#f59e0b', '#ef4444'];

export default function DashboardDG() {
  const { stats, activities, sectorDistribution } = useDgStore();

  const handleExport = () => {
    toast.loading('Génération du rapport...', { id: 'export' });
    setTimeout(() => {
      toast.success('Rapport national généré avec succès !', { id: 'export' });
    }, 2000);
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'certification': return <Shield size={16} className="text-green-600" />;
      case 'consultation': return <Search size={16} className="text-indigo-600" />;
      case 'document': return <FileText size={16} className="text-orange-600" />;
      case 'registration': return <UserPlus size={16} className="text-blue-600" />;
      default: return <Activity size={16} />;
    }
  };

  const getActivityBg = (type) => {
    switch(type) {
      case 'certification': return 'bg-green-100';
      case 'consultation': return 'bg-indigo-100';
      case 'document': return 'bg-orange-100';
      case 'registration': return 'bg-blue-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Direction Générale</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Cockpit Stratégique National</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium max-w-xl">
            Vue consolidée en temps réel de l'écosystème de sous-traitance BSTP. Identifiez les tendances de maturité et l'impact de la Marketplace.
          </p>
        </div>
        
        <button 
          onClick={handleExport}
          className="flex items-center justify-center gap-2 bg-[#635bff] text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
        >
          <Download size={20} />
          <span>Exporter le rapport</span>
        </button>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total PME Inscrites" 
          value={stats.totalPme}
          icon={Building2}
          trend="up"
          trendValue="+12%"
          delay={0.1}
        />
        <StatCard 
          title="PME Certifiées" 
          value={stats.certifiedPme}
          icon={ShieldCheck}
          trend="up"
          trendValue="+5%"
          delay={0.2}
        />
        <StatCard 
          title="Maturité Moyenne" 
          value={`${stats.averageMaturity}%`}
          icon={Activity}
          trend="up"
          trendValue="+2%"
          delay={0.3}
        />
        <StatCard 
          title="Consultations (DO)" 
          value={stats.consultationsThisMonth}
          icon={Users}
          trend="up"
          trendValue="+24%"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sector Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">PME par Secteur (Top 4)</h3>
          <div className="flex-1 min-h-[220px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sectorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-gray-900">{stats.certifiedPme}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {sectorDistribution.map((sector, idx) => (
              <div key={sector.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="font-semibold text-gray-600">{sector.name}</span>
                </div>
                <span className="font-bold text-gray-900">{sector.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Activité de la Plateforme</h3>
            <button className="text-sm font-semibold text-[#635bff] flex items-center gap-1 hover:gap-2 transition-all">
              Voir l'historique <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
                className="flex gap-4 items-start group cursor-pointer"
                onClick={() => toast(`Détail de l'événement consulté`, { description: activity.message })}
              >
                <div className={`mt-1 p-3 rounded-2xl flex-shrink-0 ${getActivityBg(activity.type)} transition-transform group-hover:scale-110`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 pb-6 border-b border-gray-50 group-last:border-0 group-last:pb-0">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#635bff] transition-colors">{activity.message}</p>
                  <p className="text-xs font-medium text-gray-400 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
