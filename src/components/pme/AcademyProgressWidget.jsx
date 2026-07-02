import { motion } from 'framer-motion';
import { BookOpen, Trophy, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const modules = [
  { label: "Réponse aux AO", done: 3, total: 4, color: "#635bff" },
  { label: "Normes ISO 9001", done: 2, total: 4, color: "#22c55e" },
  { label: "Sécurité HSQE", done: 1, total: 3, color: "#f59e0b" },
  { label: "RSE & Développement durable", done: 0, total: 3, color: "#8b5cf6" },
];

export default function AcademyProgressWidget() {
  const totalDone = modules.reduce((a, m) => a + m.done, 0);
  const totalModules = modules.reduce((a, m) => a + m.total, 0);
  const nextBadge = "Indice Argent"; // would be computed from trust logic

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-nexus-500 rounded-xl flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-gray-900">{totalDone}/{totalModules} modules</p>
            <p className="text-xs text-gray-400 font-medium">complétés</p>
          </div>
        </div>
        <button
          onClick={() => toast.info('Prochain badge à débloquer', { description: `Complétez 2 modules supplémentaires pour obtenir l'${nextBadge}` })}
          className="flex items-center gap-1 bg-gold-50 text-gold-600 border border-gold-100 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-gold-100 transition-colors"
        >
          <Trophy size={14} /> {nextBadge}
        </button>
      </div>

      <div className="space-y-3">
        {modules.map((m, idx) => {
          const pct = (m.done / m.total) * 100;
          return (
            <button
              key={m.label}
              onClick={() => toast.info(`Module: ${m.label}`, { description: `${m.done}/${m.total} cours complétés` })}
              className="w-full group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-700 group-hover:text-nexus-600 transition-colors">{m.label}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-gray-900">{m.done}/{m.total}</span>
                  <ChevronRight size={12} className="text-gray-300 group-hover:text-nexus-500 transition-colors" />
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * idx }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: m.color }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
