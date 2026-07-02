import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export default function KeyAccountsTable({ data = [] }) {
  const [sortField, setSortField] = useState('volume');

  const sorted = [...data].sort((a, b) => b[sortField] - a[sortField]);

  return (
    <div className="w-full overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Donneur d'Ordre</th>
            <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">
              <button onClick={() => setSortField('volume')} className="flex items-center gap-1 ml-auto hover:text-gray-700 transition-colors">
                Volume (Mds FCFA) <ArrowUpDown size={12} />
              </button>
            </th>
            <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">
              <button onClick={() => setSortField('marches')} className="flex items-center gap-1 ml-auto hover:text-gray-700 transition-colors">
                Marchés <ArrowUpDown size={12} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sorted.map((row, idx) => (
            <tr key={row.name} className="hover:bg-gray-50/50 transition-colors group">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-nexus-900 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">
                    {row.logo}
                  </div>
                  <span className="font-semibold text-gray-800">{row.name}</span>
                </div>
              </td>
              <td className="py-3 text-right">
                <span className="font-black text-gray-900">{row.volume}</span>
                <span className="text-xs text-gray-400 ml-1">Mds</span>
              </td>
              <td className="py-3 text-right">
                <span className="font-bold text-gray-700">{row.marches}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
