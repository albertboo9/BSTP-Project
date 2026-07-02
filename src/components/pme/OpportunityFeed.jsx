import { motion } from 'framer-motion';
import { opportunities } from '../../data/opportunities.mock';
import { Clock, MapPin, Star, ChevronRight, Zap } from 'lucide-react';
import TrustBadge from '../ui/TrustBadge';
import { toast } from 'sonner';

function badgeLevelFromStr(str) {
  if (str === 'or') return 'or';
  if (str === 'argent') return 'argent';
  return 'bronze';
}

const scoreColor = (s) => s >= 85 ? 'text-success-700 bg-success-50' : s >= 70 ? 'text-warning-700 bg-warning-50' : 'text-gray-500 bg-gray-50';

export default function OpportunityFeed({ maxItems = 3 }) {
  const displayed = opportunities.slice(0, maxItems);

  return (
    <div className="space-y-3">
      {displayed.map((ao, idx) => (
        <motion.button
          key={ao.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => toast.info(`AO ${ao.id}`, { description: ao.description })}
          className="w-full text-left bg-gray-50 hover:bg-nexus-50 border border-gray-100 hover:border-nexus-100 rounded-2xl p-4 transition-all group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                {ao.nouveau && (
                  <span className="inline-flex items-center gap-1 bg-nexus-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    <Zap size={10} /> NOUVEAU
                  </span>
                )}
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${scoreColor(ao.matchScore)}`}>
                  Match {ao.matchScore}%
                </span>
                <TrustBadge level={badgeLevelFromStr(ao.badgeMinimum)} size="sm" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-nexus-700 transition-colors">
                {ao.titre}
              </h4>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                  <Star size={12} /> {ao.donneur}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                  <MapPin size={12} /> {ao.region}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                  <Clock size={12} /> {ao.deadline}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="text-base font-black text-gray-900">{(ao.budgetFcfa / 1e6).toFixed(0)}M</span>
              <span className="text-[10px] text-gray-400 font-bold">FCFA</span>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-nexus-500 transition-colors" />
            </div>
          </div>
        </motion.button>
      ))}
      <button
        onClick={() => toast.info('Accédez à tous vos AO matchés depuis le menu "Opportunités"')}
        className="w-full text-center text-xs font-bold text-nexus-500 hover:text-nexus-700 py-2 transition-colors"
      >
        Voir toutes les opportunités →
      </button>
    </div>
  );
}
