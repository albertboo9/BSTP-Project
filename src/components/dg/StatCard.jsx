import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, delay = 0 }) {
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
        <Icon size={120} className="text-[#635bff]" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gray-50 text-[#635bff] rounded-2xl">
            <Icon size={24} strokeWidth={2.5} />
          </div>
          {trendValue && (
            <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trendValue}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-gray-500 font-semibold text-sm mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{value}</h2>
            {subtitle && <span className="text-sm font-medium text-gray-400">{subtitle}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
