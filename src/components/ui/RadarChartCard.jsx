import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * RadarChartCard — Radar de Maturité 6 axes
 * Props:
 *   data: Array<{ axe: string, score: number }> (score /20)
 *   scoreGlobal: number (/100)
 *   compact?: boolean
 */
export default function RadarChartCard({ data = [], scoreGlobal = 0, compact = false }) {
  const getScoreColor = (s) => s >= 80 ? '#22c55e' : s >= 60 ? '#f59e0b' : '#ef4444';
  const color = getScoreColor(scoreGlobal);

  return (
    <div className={compact ? "h-full flex flex-col" : "bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col"}>
      {!compact && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">Radar de Maturité</h3>
          <div className="text-right">
            <span className="text-3xl font-black" style={{ color }}>{scoreGlobal}</span>
            <span className="text-sm font-bold text-gray-400">/100</span>
          </div>
        </div>
      )}
      <div className="flex-1" style={{ minHeight: compact ? 160 : 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis
              dataKey="axe"
              tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke={color}
              fill={color}
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Tooltip
              formatter={(val) => [`${val}/20`, 'Score']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: 13 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {!compact && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map(d => (
            <div key={d.axe} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-xs font-semibold text-gray-500 truncate mr-2">{d.axe}</span>
              <span className="text-xs font-black text-gray-800 flex-shrink-0">{d.score}/20</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
