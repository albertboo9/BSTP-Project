/**
 * RegionMap — Carte SVG stylisée du Cameroun avec code couleur par intensité PME
 * Représentation schématique et institutionnelle (pas une vraie GIS lib)
 */
export default function RegionMap({ regions = [] }) {
  const maxPme = Math.max(...regions.map(r => r.pme), 1);

  // Régions + positions schématiques sur le canvas SVG (viewBox 0 0 200 240)
  const regionCoords = [
    { name: "Littoral",    cx: 60,  cy: 160, rx: 26, ry: 18 },
    { name: "Centre",      cx: 110, cy: 140, rx: 30, ry: 22 },
    { name: "Ouest",       cx: 70,  cy: 110, rx: 22, ry: 16 },
    { name: "Sud-Ouest",   cx: 42,  cy: 180, rx: 18, ry: 14 },
    { name: "Nord-Ouest",  cx: 55,  cy: 85,  rx: 18, ry: 14 },
    { name: "Adamaoua",    cx: 120, cy: 100, rx: 26, ry: 18 },
    { name: "Nord",        cx: 120, cy: 58,  rx: 28, ry: 20 },
    { name: "Est",         cx: 158, cy: 145, rx: 28, ry: 22 },
    { name: "Sud",         cx: 120, cy: 200, rx: 24, ry: 18 },
  ];

  const getIntensity = (pme) => {
    const ratio = pme / maxPme;
    if (ratio > 0.7) return '#635bff';
    if (ratio > 0.4) return '#a5b4fc';
    if (ratio > 0.2) return '#c7d2fe';
    return '#e0e1ff';
  };

  const getTextColor = (pme) => {
    const ratio = pme / maxPme;
    return ratio > 0.4 ? '#ffffff' : '#3730a3';
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <svg viewBox="0 0 200 240" className="w-full max-h-56" aria-label="Carte Cameroun - Répartition PME par région">
        {regionCoords.map((r) => {
          const regionData = regions.find(d => d.name === r.name);
          const pme = regionData?.pme || 0;
          const fill = getIntensity(pme);
          const textColor = getTextColor(pme);
          return (
            <g key={r.name}>
              <ellipse
                cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry}
                fill={fill}
                stroke="white"
                strokeWidth="1.5"
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />
              <text
                x={r.cx} y={r.cy - 2}
                textAnchor="middle"
                fontSize="5.5"
                fontWeight="700"
                fill={textColor}
              >{r.name}</text>
              <text
                x={r.cx} y={r.cy + 7}
                textAnchor="middle"
                fontSize="6"
                fontWeight="900"
                fill={textColor}
              >{pme}</text>
            </g>
          );
        })}
      </svg>

      {/* Légende compacte */}
      <div className="flex items-center gap-2 justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-nexus-500" />
          <span className="text-[11px] font-semibold text-gray-500">&gt;70% densité</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-nexus-100" />
          <span className="text-[11px] font-semibold text-gray-500">Faible</span>
        </div>
      </div>
    </div>
  );
}
