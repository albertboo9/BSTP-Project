import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Briefcase, Mail, Phone, Award } from 'lucide-react';
import RadarChartCard from '../../../components/pme/passeport/RadarChartCard';

export default function PmeDetailDrawer({ pme, isOpen, onClose }) {
  if (!pme) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col border-l border-gray-100 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-start">
              <div className="pr-4">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">{pme.name}</h2>
                <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-3">
                  <span className="flex items-center"><Briefcase size={14} className="mr-1"/> {pme.sector}</span>
                  <span className="flex items-center"><MapPin size={14} className="mr-1"/> {pme.location}</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors flex-shrink-0">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8 flex-1">
              
              {/* Score Highlight */}
              <div className="flex items-center gap-5 bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                <div className="w-16 h-16 rounded-full bg-[#635bff] text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-200">
                  {pme.score}
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-1">Score de Maturité</p>
                  <p className="text-xs font-medium text-indigo-600">Données certifiées par la BSTP</p>
                  {pme.isPremium && <span className="inline-flex mt-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">Premium</span>}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Award size={16} className="text-gray-400"/> Présentation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pme.description}</p>
              </div>

              {/* Radar Chart */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">Analyse Détaillée (Dimensions)</h3>
                <div className="h-72 -mx-2">
                  <RadarChartCard scores={pme.scores} />
                </div>
              </div>

            </div>

            {/* Footer / Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex gap-3 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
              <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                Profil Complet
              </button>
              <button className="flex-1 bg-[#635bff] text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                Inviter à un AO
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
