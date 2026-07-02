import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CapitalHumainCard({ data }) {
  const { heuresCumulees, certificationsByModule } = data;

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Heures cumulées */}
      <div className="bg-nexus-50 rounded-2xl p-5 border border-nexus-100 flex items-center gap-4">
        <div className="w-14 h-14 bg-nexus-500 rounded-2xl flex items-center justify-center flex-shrink-0">
          <GraduationCap className="text-white" size={28} />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-nexus-900">{heuresCumulees.toLocaleString()}</span>
            <span className="text-sm font-bold text-nexus-500">heures</span>
          </div>
          <p className="text-xs font-bold text-nexus-600 uppercase tracking-wider mt-1">de formation dispensées (BSTP Academy)</p>
        </div>
      </div>

      {/* Certifications par module */}
      <div className="flex-1">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">PME certifiées par module</h4>
        <div className="space-y-3">
          {certificationsByModule.map((item, idx) => {
            const maxVal = Math.max(...certificationsByModule.map(x => x.count));
            const pct = (item.count / maxVal) * 100;
            return (
              <div key={item.module}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700">{item.module}</span>
                  <span className="text-sm font-black text-gray-900">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 * idx }}
                    className="h-full bg-nexus-500 rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
