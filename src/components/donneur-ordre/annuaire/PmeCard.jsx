import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, ChevronRight } from 'lucide-react';

export default function PmeCard({ pme, onClick }) {
  const isHigh = pme.score >= 80;
  const isMed = pme.score >= 50 && pme.score < 80;
  const scoreColor = isHigh ? 'text-green-600' : isMed ? 'text-yellow-600' : 'text-red-500';
  const scoreBg = isHigh ? 'bg-green-50' : isMed ? 'bg-yellow-50' : 'bg-red-50';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      onClick={() => onClick(pme)}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm cursor-pointer transition-all relative overflow-hidden group flex flex-col h-full"
    >
      {pme.isPremium && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
          <Shield size={10} />
          Premium
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#635bff] transition-colors">{pme.name}</h3>
          <p className="text-sm font-medium text-gray-500 mt-1">{pme.sector}</p>
        </div>
        
        {/* Mini Score Badge */}
        <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-full ${scoreBg} border border-white shadow-inner`}>
          <span className={`text-sm font-extrabold ${scoreColor}`}>{pme.score}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{pme.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
        <div className="flex items-center text-gray-400 text-xs">
          <MapPin size={14} className="mr-1" />
          {pme.location}
        </div>
        <div className="flex items-center text-[#635bff] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Voir le profil <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </motion.div>
  );
}
