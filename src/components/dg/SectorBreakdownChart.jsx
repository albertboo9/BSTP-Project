import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SectorBreakdownChart({ data = [] }) {
  return (
    <div className="h-full flex flex-col">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barSize={28}>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#94a3b8' }} 
            axisLine={false} 
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: '#f8fafc', radius: 8 }}
            contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 13 }}
            formatter={(val) => [`${val} PME`, 'Volume']}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {data.map((s) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: s.fill }} />
            <span className="text-[11px] font-semibold text-gray-500 truncate">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
