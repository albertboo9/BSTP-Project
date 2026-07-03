import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle2, Info, Sparkles, Download } from 'lucide-react';
import { toast } from 'sonner';

/**
 * AIResultModal — Modal générique pour afficher les résultats des appels IA
 * Props:
 *   isOpen: boolean
 *   onClose: () => void
 *   title: string
 *   icon: ReactNode (optionnel)
 *   children: ReactNode (contenu principal)
 *   isError?: boolean
 *   isFallback?: boolean
 *   onExport?: () => void (bouton télécharger le rapport)
 */
export default function AIResultModal({ isOpen, onClose, title, icon, children, isError, isFallback, onExport }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-50 bg-nexus-900/50 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:max-w-2xl md:w-full bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {icon || <Sparkles size={20} className="text-nexus-500" />}
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Fallback banner */}
            {isFallback && (
              <div className="mx-6 mt-4 flex items-center gap-2 p-3 bg-warning-50 border border-warning-100 rounded-xl">
                <Info size={16} className="text-warning-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-warning-700">Mode dégradé — Résultat indicatif (service IA temporairement indisponible)</span>
              </div>
            )}

            {/* Error banner */}
            {isError && (
              <div className="mx-6 mt-4 flex items-center gap-2 p-3 bg-danger-50 border border-danger-100 rounded-xl">
                <AlertTriangle size={16} className="text-danger-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-danger-700">Une erreur est survenue lors de l'analyse. Veuillez réessayer.</span>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {isFallback ? (
                  <span className="flex items-center gap-1"><Info size={12} /> Résultat non certifié</span>
                ) : (
                  <span className="flex items-center gap-1"><Sparkles size={12} /> Analyse par IA BSTP</span>
                )}
              </div>
              <div className="flex gap-2">
                {onExport && (
                  <button onClick={onExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                    <Download size={14} /> Télécharger
                  </button>
                )}
                <button onClick={onClose} className="px-4 py-2 bg-nexus-500 text-white rounded-xl text-xs font-bold hover:bg-nexus-600 transition-colors">
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}