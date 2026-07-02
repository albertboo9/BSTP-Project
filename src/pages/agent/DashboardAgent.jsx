import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAgentStore } from '../../stores/agentStore';
import TaskItem from '../../components/agent/TaskItem';
import { ClipboardCheck, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function DashboardAgent() {
  const { tasks, stats, approveTask, rejectTask } = useAgentStore();

  const handleApprove = (id) => {
    approveTask(id);
    toast.success('Document validé avec succès.', { 
      description: 'Le score de la PME a été mis à jour automatiquement.',
      icon: <CheckCircle2 className="text-green-500" />
    });
  };

  const handleReject = (id) => {
    rejectTask(id);
    toast.error('Document rejeté.', { 
      description: 'Une notification de correction a été envoyée à la PME.',
      icon: <AlertTriangle className="text-red-500" />
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Back-Office Agent</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Audit Documentaire</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Examinez et validez les documents soumis par les PME pour certifier leur Passeport Numérique.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-gray-50 px-6 py-4 rounded-2xl text-center">
            <p className="text-2xl font-black text-gray-900">{stats.processedToday}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Traités ce jour</p>
          </div>
          <div className="bg-indigo-50 px-6 py-4 rounded-2xl text-center border border-indigo-100">
            <p className="text-2xl font-black text-[#635bff]">{stats.pendingCount}</p>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">En attente</p>
          </div>
        </div>
      </motion.div>

      {/* Task Queue */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ClipboardCheck className="text-[#635bff]" />
            Bannette de validation
          </h2>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
            <Clock size={16} />
            Temps moyen : {stats.avgProcessTime}
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onApprove={handleApprove} 
                  onReject={handleReject} 
                />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Bannette vide !</h3>
                <p className="text-gray-500 mt-2 max-w-sm">
                  Excellent travail. Tous les documents soumis ont été audités. Les PME concernées ont été notifiées.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
