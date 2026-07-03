import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function RegionMap({ regions = [] }) {
  const maxPme = Math.max(...regions.map(r => r.pme), 1);

  // Coordonnées approximatives des capitales régionales du Cameroun
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

  const getRadius = (pme) => {
    const ratio = pme / maxPme;
    if (ratio > 0.7) return 24;
    if (ratio > 0.4) return 18;
    if (ratio > 0.2) return 14;
    return 10;
  };

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm bg-white overflow-hidden relative" style={{ height: '400px' }}>
      <MapContainer 
        center={[6.5, 12.5]} 
        zoom={6} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles-grayscale"
        />
        
        {regionCoords.map((r) => {
          const regionData = regions.find(d => d.name === r.name);
          const pme = regionData?.pme || 0;
          if (pme === 0) return null;

          return (
            <CircleMarker
              key={r.name}
              center={[r.lat, r.lng]}
              radius={getRadius(pme)}
              pathOptions={{
                fillColor: getColor(pme),
                fillOpacity: 0.7,
                color: '#fff',
                weight: 2
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} className="custom-leaflet-tooltip">
                <div className="text-center p-1">
                  <span className="block font-bold text-gray-900 text-sm">{r.name}</span>
                  <span className="block text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-1">{pme} PME</span>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      {/* Legend Override */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-md p-3 rounded-xl border border-gray-100 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Densité PME</h4>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#635bff' }} /><span className="text-xs font-semibold text-gray-700">Forte</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#7c7eff' }} /><span className="text-xs font-semibold text-gray-700">Moyenne</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#c7d2fe' }} /><span className="text-xs font-semibold text-gray-700">Faible</span></div>
        </div>
      </div>
      
      {/* CSS overrides for grayscale tiles to match theme better */}
      <style>{`
        .map-tiles-grayscale {
          filter: grayscale(100%) opacity(0.8);
        }
        .custom-leaflet-tooltip {
          background-color: white;
          border: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border-radius: 0.75rem;
          padding: 0.5rem;
        }
        .leaflet-tooltip-top:before {
          border-top-color: white;
        }
      `}</style>
    </div>
  );
}