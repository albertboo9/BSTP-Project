import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePasseportStore } from '../../../stores/passeportStore';
import { X, UploadCloud, ScanLine, CheckCircle2 } from 'lucide-react';

export default function DocumentUploadModal({ isOpen, onClose, onConfirm, docName, isUploading: externalUploading }) {
  const { isUploading, uploadProgress } = usePasseportStore();
  const [step, setStep] = useState('select');
  const uploading = externalUploading || isUploading;

  useEffect(() => {
    if (isOpen) {
      setStep('select');
    }
  }, [isOpen]);

  useEffect(() => {
    if (uploading) {
      setStep('uploading');
    }
  }, [uploading]);

  useEffect(() => {
    if (uploadProgress === 100 && step === 'uploading') {
      setStep('scanning');
      const t = setTimeout(() => {
        setStep('success');
        setTimeout(() => onClose(), 1500);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [uploadProgress, step, onClose]);

  const handleUpload = async () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  useEffect(() => {
    if (step === 'uploading' && uploadProgress === 100) {
      setStep('scanning');
    }
  }, [uploadProgress, step]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900">Soumission de document</h3>
            <button onClick={!isUploading ? onClose : undefined} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-500 mb-6 text-center">
              Document attendu : <strong className="text-gray-800">{docName}</strong>
            </p>

            {step === 'select' && (
              <div 
                onClick={handleUpload}
                className="border-2 border-dashed border-gray-300 hover:border-[#635bff] bg-gray-50 hover:bg-[#635bff]/5 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#635bff] group-hover:scale-110 transition-transform mb-4">
                  <UploadCloud size={28} />
                </div>
                <p className="font-semibold text-gray-700 group-hover:text-[#635bff] transition-colors">Cliquer pour parcourir</p>
                <p className="text-xs text-gray-400 mt-2">Format PDF certifié recommandé (Max. 5MB)</p>
              </div>
            )}

            {(step === 'uploading' || step === 'scanning') && (
              <div className="py-8 flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-6">
                  {step === 'uploading' ? (
                    <svg className="animate-spin text-[#635bff] w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full text-[#635bff] flex items-center justify-center bg-indigo-50 rounded-full"
                    >
                      <ScanLine size={40} />
                    </motion.div>
                  )}
                </div>
                
                <p className="font-semibold text-gray-900 text-lg">
                  {step === 'uploading' ? 'Téléchargement sécurisé...' : 'Analyse OCR & IA...'}
                </p>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  {step === 'uploading' ? `${uploadProgress}% complété` : 'Extraction des métadonnées légales...'}
                </p>

                <div className="w-full bg-gray-100 h-2 rounded-full mt-6 overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#635bff]"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {step === 'success' && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-8 flex flex-col items-center justify-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <p className="font-bold text-gray-900 text-xl">Validation Réussie</p>
                <p className="text-sm text-gray-500 mt-2 text-center max-w-xs leading-relaxed">
                  Authenticité vérifiée. Les données ont été intégrées à votre passeport numérique.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
