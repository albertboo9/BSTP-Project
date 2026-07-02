import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * StatusPipeline — Funnel PME (Profilée → Vérifiée Terrain → Éligible AO)
 */
export default function StatusPipeline({ pipeline = [] }) {
  const total = pipeline[0]?.count || 1;

  return (
    <div className="space-y-4">
      {pipeline.map((level, idx) => {
        const widthPct = Math.round((level.count / total) * 100);
        const colors = [
          { bg: 'bg-gray-100', text: 'text-gray-600', bar: 'bg-gray-300', dot: 'bg-gray-400' },
          { bg: 'bg-nexus-50', text: 'text-nexus-700', bar: 'bg-nexus-500', dot: 'bg-nexus-500' },
          { bg: 'bg-nexus-900/5', text: 'text-nexus-900', bar: 'bg-nexus-900', dot: 'bg-nexus-900' },
        ];
        const c = colors[idx] || colors[0];

        return (
          <motion.div
            key={level.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className={clsx("p-4 rounded-2xl", c.bg)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={clsx("w-2.5 h-2.5 rounded-full", c.dot)} />
                <span className={clsx("text-sm font-bold", c.text)}>{level.label}</span>
              </div>
              <div className="text-right">
                <span className={clsx("text-2xl font-black", c.text)}>{level.count.toLocaleString()}</span>
                <span className="text-xs font-bold text-gray-400 ml-1">PME</span>
              </div>
            </div>
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${widthPct}%` }}
                transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                className={clsx("h-full rounded-full", c.bar)}
              />
            </div>
            <div className="text-right mt-1">
              <span className="text-xs font-bold text-gray-400">{level.percent}% du total</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
