import clsx from 'clsx';
import { ShieldCheck, Shield, Award } from 'lucide-react';

/**
 * TrustBadge — Badge d'indice de confiance Bronze/Argent/Or
 * Props:
 *   level: "bronze" | "argent" | "or"
 *   size?: "sm" | "md" | "lg"
 *   showLabel?: boolean
 */
export default function TrustBadge({ level = "bronze", size = "md", showLabel = true }) {
  const config = {
    or: {
      label: "Or",
      bg: "bg-gold-50 border-gold-500",
      text: "text-gold-600",
      icon: <Award />,
      dot: "bg-gold-500",
      glow: "shadow-[0_0_12px_2px_#f59e0b30]",
    },
    argent: {
      label: "Argent",
      bg: "bg-silver-50 border-silver-500",
      text: "text-silver-600",
      icon: <ShieldCheck />,
      dot: "bg-silver-500",
      glow: "shadow-[0_0_12px_2px_#94a3b820]",
    },
    bronze: {
      label: "Bronze",
      bg: "bg-bronze-50 border-bronze-500",
      text: "text-bronze-600",
      icon: <Shield />,
      dot: "bg-bronze-500",
      glow: "",
    },
  };

  const sizeMap = {
    sm: { wrapper: "px-2 py-1 gap-1.5 text-xs rounded-lg", icon: 12 },
    md: { wrapper: "px-3 py-1.5 gap-2 text-sm rounded-xl", icon: 16 },
    lg: { wrapper: "px-4 py-2 gap-2.5 text-base rounded-2xl", icon: 20 },
  };

  const c = config[level] || config.bronze;
  const s = sizeMap[size];

  return (
    <span
      className={clsx(
        "inline-flex items-center border font-bold",
        c.bg, c.text, c.glow, s.wrapper
      )}
    >
      <span className={clsx("flex-shrink-0", c.text)}>
        {level === 'or' ? <Award size={s.icon} /> : level === 'argent' ? <ShieldCheck size={s.icon} /> : <Shield size={s.icon} />}
      </span>
      {showLabel && <span>Indice {c.label}</span>}
    </span>
  );
}
