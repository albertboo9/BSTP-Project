import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, Building, ShieldCheck, ChevronRight, User, Phone, CheckCircle, Scale } from 'lucide-react';
import TrustBadge from '../../components/ui/TrustBadge';

// Mock list of supported companies
const MOCK_PMES = [
  { id: "pme-001", nom: "Alpha Industrial Services", region: "Littoral", ville: "Douala", score: 94, badge: "or", tel: "+237 677 889 900", gérant: "Jean-Pierre Eboué", fiscal: "En règle", flags: [] },
  { id: "pme-002", nom: "SODEPA Sarl", region: "Centre", ville: "Yaoundé", score: 62, badge: "bronze", tel: "+237 699 112 233", gérant: "Marie Ngo", fiscal: "Litige en cours", flags: ["Situation fiscale non résolue"] },
  { id: "pme-003", nom: "Cameroon Mining Corp", region: "Est", ville: "Bertoua", score: 76, badge: "argent", tel: "+237 655 443 322", gérant: "Luc Ondoa", fiscal: "En règle", flags: ["Retard attestation CNPS"] },
  { id: "pme-004", nom: "BatiConstruct", region: "Ouest", ville: "Bafoussam", score: 45, badge: "bronze", tel: "+237 670 556 677", gérant: "Paul Talla", fiscal: "En règle", flags: ["Absence de formation HSE", "Score technique critique"] },
  { id: "pme-005", nom: "Sahel Agro", region: "Extrême-Nord", ville: "Maroua", score: 82, badge: "argent", tel: "+237 690 998 877", gérant: "Bello Adamou", fiscal: "En règle", flags: [] }
];

export default function VigilancePage() {
  const [selectedPme, setSelectedPme] = useState(MOCK_PMES[0]);
  const [filterRegion, setFilterRegion] = useState("Toutes");

  const regionsList = ["Toutes", "Littoral", "Centre", "Est", "Ouest", "Extrême-Nord"];

  const filteredPmes = MOCK_PMES.filter(pme => {
    return filterRegion === "Toutes" || pme.region === filterRegion;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] text-danger-400 font-bold uppercase tracking-widest flex items-center gap-1">
            <AlertTriangle size={12} /> Vigilance Opérationnelle
          </span>
          <h1 className="text-3xl font-black tracking-tight mt-1">Cartographie & Red Flags</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Supervisez les risques opérationnels, fiscaux et réglementaires des PME accompagnées au Cameroun.
          </p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={24} className="text-danger-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Grid: Map & Details panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Map filter & Company list */}
        <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-gray-850 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Filtrer par Région</h3>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-[11px] text-white font-semibold outline-none"
            >
              {regionsList.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* List of PMEs */}
          <div className="space-y-2 flex-1 overflow-y-auto max-h-[360px] pr-1">
            {filteredPmes.map(pme => (
              <button
                key={pme.id}
                onClick={() => setSelectedPme(pme)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between gap-3 ${
                  selectedPme?.id === pme.id
                    ? 'bg-nexus-500/10 border-nexus-500/30 text-white'
                    : 'bg-gray-950 border-gray-850 hover:bg-gray-900'
                }`}
              >
                <div className="min-w-0">
                  <h4 className="font-bold text-white truncate">{pme.nom}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1 font-semibold">
                    <MapPin size={10} /> {pme.ville} ({pme.region})
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {pme.flags.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-danger-500 animate-pulse" title="Indicateur d'alerte" />
                  )}
                  <TrustBadge level={pme.badge} size="sm" showLabel={false} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Middle & Right Column: Cameroon Regional View & Selected PME details */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          
          {/* Cameroon Vector SVG styled map panel */}
          <div className="bg-gray-950 border border-gray-850/60 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[300px]">
            <span className="absolute top-3 left-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">Carte Interactive du Cameroun</span>
            
            {/* Visual vector placeholder representation for regions */}
            <svg viewBox="0 0 200 240" className="w-full max-w-[200px] h-auto drop-shadow-2xl">
              {/* Extrême-Nord */}
              <path
                d="M100 10 L115 25 L105 45 L95 45 Z"
                fill={filterRegion === 'Extrême-Nord' ? '#635bff' : '#1f2937'}
                stroke="#111827"
                strokeWidth="1.5"
                onClick={() => setFilterRegion('Extrême-Nord')}
                className="cursor-pointer transition-colors hover:fill-nexus-500"
              />
              {/* Nord */}
              <path
                d="M95 45 L105 45 L115 25 L125 55 L105 75 L85 75 Z"
                fill={filterRegion === 'Nord' ? '#635bff' : '#374151'}
                stroke="#111827"
                strokeWidth="1.5"
                onClick={() => setFilterRegion('Nord')}
                className="cursor-pointer transition-colors hover:fill-nexus-500"
              />
              {/* Adamaoua */}
              <path
                d="M85 75 L105 75 L125 55 L135 95 L95 115 L75 105 Z"
                fill="#1f2937"
                stroke="#111827"
                strokeWidth="1.5"
                className="cursor-pointer transition-colors hover:fill-nexus-500"
              />
              {/* Centre */}
              <path
                d="M75 105 L95 115 L105 145 L75 165 L65 135 Z"
                fill={filterRegion === 'Centre' ? '#635bff' : '#4b5563'}
                stroke="#111827"
                strokeWidth="1.5"
                onClick={() => setFilterRegion('Centre')}
                className="cursor-pointer transition-colors hover:fill-nexus-500"
              />
              {/* Littoral */}
              <path
                d="M65 135 L75 165 L55 175 L45 155 Z"
                fill={filterRegion === 'Littoral' ? '#635bff' : '#6b7280'}
                stroke="#111827"
                strokeWidth="1.5"
                onClick={() => setFilterRegion('Littoral')}
                className="cursor-pointer transition-colors hover:fill-nexus-500"
              />
              {/* Est */}
              <path
                d="M95 115 L135 95 L145 155 L105 175 L105 145 Z"
                fill={filterRegion === 'Est' ? '#635bff' : '#374151'}
                stroke="#111827"
                strokeWidth="1.5"
                onClick={() => setFilterRegion('Est')}
                className="cursor-pointer transition-colors hover:fill-nexus-500"
              />
              {/* Ouest */}
              <path
                d="M45 155 L65 135 L55 125 L35 135 Z"
                fill={filterRegion === 'Ouest' ? '#635bff' : '#1f2937'}
                stroke="#111827"
                strokeWidth="1.5"
                onClick={() => setFilterRegion('Ouest')}
                className="cursor-pointer transition-colors hover:fill-nexus-500"
              />
            </svg>
            <p className="text-[9px] text-gray-500 mt-4 text-center">Sélectionnez une région sur la carte pour isoler ses PME accompagnées.</p>
          </div>

          {/* Details panel */}
          <div className="flex flex-col justify-between gap-4">
            {selectedPme ? (
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-3">
                  <span className="text-[9px] text-nexus-500 font-bold uppercase tracking-wider">{selectedPme.region}</span>
                  <h3 className="text-sm font-black text-white">{selectedPme.nom}</h3>
                  <p className="text-[10px] text-gray-500 font-semibold">{selectedPme.ville}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2.5 bg-gray-950 border border-gray-850 rounded-xl">
                    <span className="text-gray-500 font-bold block uppercase tracking-wider">Score Maturité</span>
                    <span className="text-xs font-black text-white">{selectedPme.score}/100</span>
                  </div>
                  <div className="p-2.5 bg-gray-950 border border-gray-850 rounded-xl flex items-center justify-center">
                    <TrustBadge level={selectedPme.badge} size="sm" showLabel={true} />
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px]">
                  <div className="flex justify-between py-1 border-b border-gray-850/40">
                    <span className="text-gray-500 font-bold">Gérant</span>
                    <span className="text-white font-semibold">{selectedPme.gérant}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-850/40">
                    <span className="text-gray-500 font-bold">Téléphone</span>
                    <span className="text-white font-semibold">{selectedPme.tel}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-850/40">
                    <span className="text-gray-500 font-bold">Situation Fiscale</span>
                    <span className={`font-semibold ${selectedPme.fiscal === 'En règle' ? 'text-success-400' : 'text-danger-400'}`}>
                      {selectedPme.fiscal}
                    </span>
                  </div>
                </div>

                {/* Red Flags warning */}
                <div className="space-y-2">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Indicateurs de Vigilance</span>
                  {selectedPme.flags.length > 0 ? (
                    <div className="space-y-1">
                      {selectedPme.flags.map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5 p-2 bg-danger-500/10 border border-danger-500/20 rounded-lg text-xs text-danger-400">
                          <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 p-2 bg-success-500/10 border border-success-500/20 rounded-lg text-xs text-success-400">
                      <CheckCircle size={12} />
                      <span>Aucun signal de vigilance détecté.</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 font-semibold">Sélectionnez une entreprise.</div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
