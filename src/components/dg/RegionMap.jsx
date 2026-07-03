export default function RegionMap({ regions = [] }) {
  const maxPme = Math.max(...regions.map(r => r.pme), 1);

  const regionCoords = [
    { name: "Littoral", lat: 4.0511, lng: 9.7679 },
    { name: "Centre", lat: 3.8480, lng: 11.5021 },
    { name: "Ouest", lat: 5.4796, lng: 10.3674 },
    { name: "Sud-Ouest", lat: 4.1524, lng: 9.2410 },
    { name: "Nord-Ouest", lat: 5.9612, lng: 10.1516 },
    { name: "Adamaoua", lat: 7.3219, lng: 13.5839 },
    { name: "Nord", lat: 9.3252, lng: 13.3933 },
    { name: "Extrême-Nord", lat: 10.5759, lng: 14.3264 },
    { name: "Est", lat: 4.5667, lng: 14.3667 },
    { name: "Sud", lat: 2.9200, lng: 11.1500 },
  ];

  const getColor = (pme) => {
    const ratio = pme / maxPme;
    if (ratio > 0.7) return '#635bff';
    if (ratio > 0.4) return '#7c7eff';
    if (ratio > 0.2) return '#a5b4fc';
    return '#c7d2fe';
  };

  const getSize = (pme) => {
    const ratio = pme / maxPme;
    if (ratio > 0.7) return 16;
    if (ratio > 0.4) return 12;
    if (ratio > 0.2) return 9;
    return 6;
  };

  // Map region name to abbreviation for display
  const abb = {
    "Littoral": "LT", "Centre": "CE", "Ouest": "OU", "Sud-Ouest": "SO",
    "Nord-Ouest": "NO", "Adamaoua": "AD", "Nord": "ND", "Extrême-Nord": "EN",
    "Est": "ES", "Sud": "SU"
  };

  return (
    <div className="rounded-xl border border-gray-100 shadow-soft bg-white p-4">
      <div className="grid grid-cols-5 gap-2">
        {regionCoords.map((r) => {
          const regionData = regions.find(d => d.name === r.name);
          const pme = regionData?.pme || 0;
          const color = getColor(pme);
          const size = getSize(pme);
          return (
            <div
              key={r.name}
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-default"
              title={`${r.name} — ${pme} PME`}
            >
              <div
                className="rounded-full flex items-center justify-center text-white font-bold text-[10px]"
                style={{
                  width: `${size * 2}px`,
                  height: `${size * 2}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 0 2px ${color}22`,
                }}
              >
                {abb[r.name]}
              </div>
              <span className="text-[9px] font-bold text-gray-500 text-center leading-tight">{r.name}</span>
              <span className="text-[11px] font-black text-gray-800">{pme}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#635bff' }} /><span className="text-[10px] font-semibold text-gray-500">Forte</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#a5b4fc' }} /><span className="text-[10px] font-semibold text-gray-500">Moyenne</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#c7d2fe' }} /><span className="text-[10px] font-semibold text-gray-500">Faible</span></div>
      </div>
    </div>
  );
}