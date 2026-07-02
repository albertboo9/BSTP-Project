import clsx from 'clsx';
import { CheckCircle2, Clock, Lock, AlertTriangle } from 'lucide-react';

/**
 * MilestonePipeline — Pipeline de jalons horizontale
 * Props:
 *   milestones: Array<{ label: string, statut: 'done' | 'active' | 'pending' | 'blocked' }>
 */
export default function MilestonePipeline({ milestones = [] }) {
  const config = {
    done:    { icon: <CheckCircle2 size={18} />, bg: "bg-success-500", text: "text-white",        line: "bg-success-500",  label: "text-success-700" },
    active:  { icon: <Clock size={18} />,        bg: "bg-nexus-500",   text: "text-white",        line: "bg-gray-200",     label: "text-nexus-500" },
    pending: { icon: <Lock size={18} />,         bg: "bg-gray-200",    text: "text-gray-400",     line: "bg-gray-200",     label: "text-gray-400" },
    blocked: { icon: <AlertTriangle size={18} />,bg: "bg-danger-500",  text: "text-white",        line: "bg-danger-500",   label: "text-danger-700" },
  };

  return (
    <div className="flex items-start w-full overflow-x-auto pb-2">
      {milestones.map((m, idx) => {
        const c = config[m.statut] || config.pending;
        const isLast = idx === milestones.length - 1;
        return (
          <div key={idx} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shadow-sm", c.bg, c.text)}>
                {c.icon}
              </div>
              <span className={clsx("text-[11px] font-bold mt-2 text-center leading-tight max-w-[72px]", c.label)}>
                {m.label}
              </span>
            </div>
            {!isLast && (
              <div className={clsx("h-0.5 flex-1 mx-1 rounded-full", c.line)} />
            )}
          </div>
        );
      })}
    </div>
  );
}
