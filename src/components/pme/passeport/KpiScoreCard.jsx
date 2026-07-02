import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function KpiScoreCard({ score, isPremium }) {
  const isHigh = score >= 80;
  const isMed = score >= 50 && score < 80;
  
  const color = isHigh ? 'text-green-600' : isMed ? 'text-yellow-600' : 'text-red-500';
  const bgColor = isHigh ? 'bg-green-50/50' : isMed ? 'bg-yellow-50/50' : 'bg-red-50/50';
  const borderColor = isHigh ? 'border-green-100' : isMed ? 'border-yellow-100' : 'border-red-100';

  return (
    <div className={`rounded-2xl shadow-sm border p-8 flex flex-col items-center justify-center text-center ${bgColor} ${borderColor} relative overflow-hidden h-full backdrop-blur-md`}>
      {isPremium && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl shadow-sm tracking-wider uppercase flex items-center gap-1">
          <Shield size={12} />
          Premium
        </div>
      )}
      
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-2 opacity-80">Score de Maturité BSTP</h3>
      
      <div className="relative w-48 h-48 flex items-center justify-center my-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-black opacity-5" />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className={`text-5xl font-extrabold ${color} tracking-tighter`}
          >
            {score}%
          </motion.span>
        </div>
      </div>
      
      <p className="text-sm font-medium text-gray-700 max-w-[250px] leading-relaxed">
        {isHigh 
          ? "Excellente attractivité. Vous êtes prêt pour les grands donneurs d'ordres." 
          : "Passeport incomplet. Soumettez les documents requis pour améliorer ce score."}
      </p>
    </div>
  );
}
