import { useState } from 'react';
import { ArrowUpDown, ShieldCheck } from 'lucide-react';
import TrustBadge from '../ui/TrustBadge';

function badgeLevelFromStr(str) {
  if (str === 'or') return 'or';
  if (str === 'argent') return 'argent';
  return 'bronze';
}

const formatCFA = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';

export default function OfferComparisonTable({ offer }) {
  const [sortField, setSortField] = useState('matchScore');
  const [sortAsc, setSortAsc] = useState(false);

  if (!offer || !offer.soumissionnaires) {
    return (
      <div className="py-8 text-center bg-gray-50 rounded-xl text-gray-400 font-semibold text-sm">
        Sélectionnez un appel d'offres pour comparer les offres reçues.
      </div>
    );
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedBidders = [...offer.soumissionnaires].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'string') {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-gray-900">{offer.titre}</h3>
        <p className="text-xs text-gray-500 font-semibold mt-0.5">
          Budget : {formatCFA(offer.budgetFcfa)} · Secteur : {offer.secteur} · Région : {offer.region}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">PME Candidate</th>
              <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">
                <button onClick={() => handleSort('score')} className="flex items-center gap-1 ml-auto hover:text-gray-700 transition-colors">
                  Score Maturité <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Badge BSTP</th>
              <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">
                <button onClick={() => handleSort('montantPropose')} className="flex items-center gap-1 ml-auto hover:text-gray-700 transition-colors">
                  Offre financière <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">
                <button onClick={() => handleSort('matchScore')} className="flex items-center gap-1 ml-auto hover:text-gray-700 transition-colors">
                  Smart Match <ArrowUpDown size={12} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sortedBidders.map((bidder) => (
              <tr key={bidder.nom} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-3.5 pr-4">
                  <span className="font-bold text-gray-800 group-hover:text-nexus-500 transition-colors">{bidder.nom}</span>
                </td>
                <td className="py-3.5 text-right">
                  <span className="font-black text-gray-900">{bidder.score}</span>
                  <span className="text-[10px] text-gray-400 font-bold ml-0.5">/100</span>
                </td>
                <td className="py-3.5 text-center">
                  <TrustBadge level={badgeLevelFromStr(bidder.badge)} size="sm" showLabel={false} />
                </td>
                <td className="py-3.5 text-right">
                  <span className="font-black text-gray-900">{formatCFA(bidder.montantPropose)}</span>
                </td>
                <td className="py-3.5 text-right">
                  <span className={`inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-full ${bidder.matchScore >= 80 ? 'text-success-700 bg-success-50' : 'text-warning-700 bg-warning-50'}`}>
                    <ShieldCheck size={10} /> {bidder.matchScore}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
