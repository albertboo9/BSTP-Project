import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Check, X, Eye, Bot } from 'lucide-react';

export default function TaskItem({ task, onApprove, onReject }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, scale: 0.95 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div className="flex items-start md:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
          <FileText size={24} />
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">{task.pmeName}</h3>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{task.submittedAt}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">{task.documentType}</p>
          
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
            <Bot size={14} />
            Confiance IA : {task.aiConfidence}%
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-gray-50">
        <button className="flex-1 md:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 font-semibold text-sm transition-colors">
          <Eye size={16} />
          <span className="md:hidden">Voir</span>
        </button>
        <button 
          onClick={() => onReject(task.id)}
          className="flex-1 md:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 font-semibold text-sm transition-colors"
        >
          <X size={16} />
          <span className="md:hidden">Rejeter</span>
        </button>
        <button 
          onClick={() => onApprove(task.id)}
          className="flex-1 md:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 font-semibold text-sm transition-colors shadow-sm shadow-green-200"
        >
          <Check size={16} />
          <span>Valider</span>
        </button>
      </div>
    </motion.div>
  );
}
