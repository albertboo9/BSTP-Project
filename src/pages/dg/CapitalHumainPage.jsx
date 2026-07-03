import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { observatoireData } from '../../data/observatoire.mock';

const COLORS = ['#635bff', '#0ea5e9', '#22c55e', '#f59e0b'];

export default function CapitalHumainPage() {
  const { capitalHumain } = observatoireData;
  const { heuresCumulees, certificationsByModule } = capitalHumain;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Observatoire National</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Capital Humain & E-learning</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Analysez la montée en compétences et l'impact des formations certifiantes BSTP Academy.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <GraduationCap size={24} className="text-indigo-300" />
        </div>
      </motion.div>

      {/* Stats row — real data from mock */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
              <Award size={20} className="text-success-600" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Certifications Délivrées</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{certificationsByModule.reduce((a, b) => a + b.count, 0)}</span>
          <span className="text-sm text-gray-400 font-semibold ml-1">PME certifiées</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-nexus-100 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-nexus-600" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Apprenants Actifs</span>
          </div>
          <span className="text-3xl font-black text-gray-900">384</span>
          <span className="text-sm text-gray-400 font-semibold ml-1">en formation</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-gold-600" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Heures de Formation</span>
          </div>
          <span className="text-3xl font-black text-gray-900">{heuresCumulees.toLocaleString()}</span>
          <span className="text-sm text-gray-400 font-semibold ml-1">heures</span>
        </div>
      </div>

      {/* Certifications by Module — BarChart */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
        <h3 className="text-base font-bold text-gray-900 mb-1">PME Certifiées par Module</h3>
        <p className="text-xs text-gray-400 font-semibold mb-6">Répartition des certifications BSTP Academy par filière de formation</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={certificationsByModule} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="module" tick={{ fontSize: 12, fontWeight: 600, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: 12 }}
                labelStyle={{ fontWeight: 700, color: '#111827' }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={56}>
                {certificationsByModule.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Module detail cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {certificationsByModule.map((mod, idx) => (
          <div key={mod.module} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{mod.module}</span>
            </div>
            <span className="text-2xl font-black text-gray-900">{mod.count}</span>
            <span className="text-xs text-gray-400 font-semibold ml-1">PME</span>
          </div>
        ))}
      </div>
    </div>
  );
}