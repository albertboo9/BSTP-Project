import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

/**
 * FlagIndicator — Indicateur de drapeau rouge (stagnation/alerte)
 * Props:
 *   count: number (nb drapeaux rouges actifs)
 *   total: number (total contrats)
 *   percent?: number
 *   compact?: boolean
 */
export default function FlagIndicator({ count = 0, total = 0, percent = 0, compact = false }) {
  const severity = percent > 15 ? 'danger' : percent > 8 ? 'warning' : 'ok';
  const colorMap = {
    danger: { bar: 'bg-danger-500', text: 'text-danger-700', bg: 'bg-danger-50', border: 'border-danger-100' },
    warning: { bar: 'bg-warning-500', text: 'text-warning-700', bg: 'bg-warning-50', border: 'border-warning-100' },
    ok: { bar: 'bg-success-500', text: 'text-success-700', bg: 'bg-success-50', border: 'border-success-100' },
  };
  const c = colorMap[severity];

  if (compact) {
    return (
      <div className={clsx("flex items-center gap-2 px-3 py-2 rounded-xl border", c.bg, c.border)}>
        <AlertTriangle size={16} className={c.text} />
        <span className={clsx("font-black text-xl", c.text)}>{count}</span>
        <span className={clsx("text-xs font-bold", c.text)}>drapeaux rouges</span>
      </div>
    );
  }

  return (
    <div className={clsx("p-6 rounded-2xl border", c.bg, c.border)}>
      <div className="flex items-center gap-3 mb-4">
        <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", c.bg)}>
          <AlertTriangle size={20} className={c.text} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Vigilance Opérationnelle</h4>
          <p className="text-xs text-gray-500 font-medium">Chantiers en stagnation</p>
        </div>
      </div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className={clsx("text-4xl font-black", c.text)}>{count}</span>
        <span className="text-sm font-bold text-gray-400">/ {total} contrats</span>
      </div>
      {/* Thermomètre */}
      <div className="h-3 bg-white rounded-full border border-gray-100 overflow-hidden">
        <div
          className={clsx("h-full rounded-full transition-all duration-700", c.bar)}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs font-bold text-gray-400">0%</span>
        <span className={clsx("text-xs font-black", c.text)}>{percent.toFixed(1)}% en alerte</span>
        <span className="text-xs font-bold text-gray-400">20%</span>
      </div>
    </div>
  );
}
