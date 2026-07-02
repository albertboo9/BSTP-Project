import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';

/**
 * KpiCard — Carte KPI institutionnelle avec sparkline et variation
 * Props:
 *   title: string
 *   value: string | number
 *   unit?: string (ex: "Mds FCFA", "%")
 *   sparkline?: number[] (12 valeurs)
 *   trend?: "up" | "down" | "neutral"
 *   trendValue?: string (ex: "+12%")
 *   icon: LucideIcon
 *   color?: "nexus" | "success" | "warning" | "danger" | "gold"
 *   delay?: number
 */
export default function KpiCard({ title, value, unit, sparkline, trend, trendValue, icon: Icon, color = "nexus", delay = 0 }) {
  const colorMap = {
    nexus:   { bg: "bg-nexus-50",   icon: "bg-nexus-500",   text: "text-nexus-500",   stroke: "#635bff", area: "#635bff20" },
    success: { bg: "bg-success-50", icon: "bg-success-500", text: "text-success-700",  stroke: "#22c55e", area: "#22c55e20" },
    warning: { bg: "bg-warning-50", icon: "bg-warning-500", text: "text-warning-700",  stroke: "#f59e0b", area: "#f59e0b20" },
    danger:  { bg: "bg-danger-50",  icon: "bg-danger-500",  text: "text-danger-700",   stroke: "#ef4444", area: "#ef444420" },
    gold:    { bg: "bg-gold-50",    icon: "bg-gold-500",    text: "text-gold-600",     stroke: "#f59e0b", area: "#f59e0b20" },
  };
  const c = colorMap[color] || colorMap.nexus;

  const trendIcon = trend === 'up' 
    ? <TrendingUp size={14} /> 
    : trend === 'down' 
    ? <TrendingDown size={14} /> 
    : <Minus size={14} />;

  const trendColor = trend === 'up' 
    ? 'text-success-700 bg-success-50' 
    : trend === 'down' 
    ? 'text-danger-700 bg-danger-50' 
    : 'text-gray-500 bg-gray-50';

  const sparkData = sparkline?.map((v, i) => ({ v })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center text-white', c.icon)}>
          {Icon && <Icon size={22} />}
        </div>
        {trendValue && (
          <span className={clsx('flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full', trendColor)}>
            {trendIcon}
            {trendValue}
          </span>
        )}
      </div>

      {/* Value */}
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black text-gray-900 tracking-tight">{value}</span>
          {unit && <span className="text-sm font-bold text-gray-400">{unit}</span>}
        </div>
        <p className="text-sm font-semibold text-gray-500 mt-1">{title}</p>
      </div>

      {/* Sparkline */}
      {sparkData.length > 0 && (
        <div className="h-12 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
              <defs>
                <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.stroke} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={c.stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="v" 
                stroke={c.stroke} 
                strokeWidth={2}
                fill={`url(#grad-${color})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
