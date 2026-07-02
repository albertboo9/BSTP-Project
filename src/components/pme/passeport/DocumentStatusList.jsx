import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, UploadCloud } from 'lucide-react';

export default function DocumentStatusList({ documents, onUploadClick }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100/50 p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Documents Légaux & Administratifs</h3>
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${doc.status === 'valid' ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}
          >
            <div className="flex items-center space-x-4">
              {doc.status === 'valid' ? (
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                  <CheckCircle size={20} />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-sm">
                  <AlertCircle size={20} />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{doc.name}</p>
                {doc.date && <p className="text-xs font-medium text-green-600 mt-0.5">Vérifié par l'IA le {doc.date}</p>}
                {!doc.date && <p className="text-xs font-medium text-red-500 mt-0.5">Action immédiate requise</p>}
              </div>
            </div>

            {doc.status === 'missing' && (
              <button 
                onClick={() => onUploadClick(doc.id, doc.name)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 shadow-sm text-sm font-semibold rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#635bff] hover:border-[#635bff] transition-all"
              >
                <UploadCloud size={16} />
                <span>Soumettre</span>
              </button>
            )}
            {doc.status === 'valid' && (
              <span className="px-3 py-1 bg-green-100 border border-green-200 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                Conforme
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
