import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import './ZoneMap.css';

/* ── Safari centre: Sanjay Gandhi National Park, Mumbai ── */
const MAP_CENTER = [19.2280, 72.9170];
const MAP_ZOOM = 14;

/* ── Zone polygons (real SGNP coordinates) ── */
const zones = [
  {
    id: 'A', name: 'Zone A — Tiger Trail',
    color: '#2E7D32', fillColor: '#A5D6A7',
    coords: [[19.2350,72.9080],[19.2350,72.9170],[19.2290,72.9170],[19.2290,72.9080]],
  },
  {
    id: 'B', name: 'Zone B — Leopard Ridge',
    color: '#1B5E20', fillColor: '#81C784',
    coords: [[19.2350,72.9175],[19.2350,72.9265],[19.2290,72.9265],[19.2290,72.9175]],
  },
  {
    id: 'C', name: 'Zone C — Deer Valley',
    color: '#388E3C', fillColor: '#66BB6A',
    coords: [[19.2285,72.9080],[19.2285,72.9170],[19.2220,72.9170],[19.2220,72.9080]],
  },
  {
    id: 'D', name: 'Zone D — Waterhole Basin',
    color: '#43A047', fillColor: '#4CAF50',
    coords: [[19.2285,72.9175],[19.2285,72.9265],[19.2220,72.9265],[19.2220,72.9175]],
  },
];

/* ── Animal data (emoji‑based markers) ── */
const animals = [
  { lat: 19.2335, lng: 72.9110, emoji: '🐯', name: 'Bengal Tiger', zone: 'A' },
  { lat: 19.2310, lng: 72.9145, emoji: '🐘', name: 'Asian Elephant', zone: 'A' },
  { lat: 19.2340, lng: 72.9200, emoji: '🐆', name: 'Indian Leopard', zone: 'B' },
  { lat: 19.2320, lng: 72.9240, emoji: '🦌', name: 'Spotted Deer', zone: 'B' },
  { lat: 19.2260, lng: 72.9110, emoji: '🐃', name: 'Indian Gaur', zone: 'C' },
  { lat: 19.2250, lng: 72.9150, emoji: '🦚', name: 'Peacock', zone: 'C' },
  { lat: 19.2270, lng: 72.9200, emoji: '🐊', name: 'Mugger Crocodile', zone: 'D' },
  { lat: 19.2240, lng: 72.9230, emoji: '🦅', name: 'Crested Hawk Eagle', zone: 'D' },
  { lat: 19.2255, lng: 72.9250, emoji: '🐒', name: 'Bonnet Macaque', zone: 'D' },
];

/* ── Vehicle data ── */
const vehicles = [
  { lat: 19.2330, lng: 72.9125, id: 'V-01', speed: '18 km/h', zone: 'A' },
  { lat: 19.2315, lng: 72.9210, id: 'V-02', speed: '12 km/h', zone: 'B' },
  { lat: 19.2260, lng: 72.9130, id: 'V-03', speed: '0 km/h (stopped)', zone: 'C' },
  { lat: 19.2250, lng: 72.9220, id: 'V-04', speed: '22 km/h', zone: 'D' },
  { lat: 19.2340, lng: 72.9250, id: 'V-05', speed: '15 km/h', zone: 'B' },
];

/* ── Weather / Activity updates ── */
const weatherInfo = { temp: '31°C', humidity: '68%', wind: '12 km/h NW', condition: '☀️ Clear' };

/* ── Helper: create a div-icon with emoji ── */
function emojiIcon(emoji, size = 28) {
  return L.divIcon({
    html: `<span style="font-size:${size}px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))">${emoji}</span>`,
    className: 'emoji-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function vehicleIcon() {
  return L.divIcon({
    html: `<div class="vehicle-pin"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg></div>`,
    className: 'vehicle-marker-icon',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

export default function ZoneMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [activeLayer, setActiveLayer] = useState({ animals: true, vehicles: true, zones: true });

  useEffect(() => {
    if (mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      zoomControl: false,
      attributionControl: false,
    });

    /* ── Satellite + terrain tile layer ── */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.control.attribution({ position: 'bottomleft', prefix: '© OpenStreetMap' }).addTo(map);

    /* ── Zone polygons ── */
    zones.forEach(z => {
      const poly = L.polygon(z.coords, {
        color: z.color, weight: 2, fillColor: z.fillColor, fillOpacity: 0.25,
        dashArray: '6 4',
      }).addTo(map);
      poly.bindTooltip(z.name, { permanent: true, direction: 'center', className: 'zone-label' });
    });

    /* ── Animal markers ── */
    animals.forEach(a => {
      const marker = L.marker([a.lat, a.lng], { icon: emojiIcon(a.emoji) }).addTo(map);
      marker.bindPopup(`
        <div class="map-popup animal-popup">
          <span class="popup-emoji">${a.emoji}</span>
          <strong>${a.name}</strong>
          <span class="popup-zone">Zone ${a.zone}</span>
          <span class="popup-time">Spotted: ${new Date().toLocaleTimeString()}</span>
        </div>
      `);
    });

    /* ── Vehicle markers with moving animation feel ── */
    vehicles.forEach(v => {
      const marker = L.marker([v.lat, v.lng], { icon: vehicleIcon() }).addTo(map);
      marker.bindPopup(`
        <div class="map-popup vehicle-popup">
          <strong>🚙 ${v.id}</strong>
          <span>Speed: ${v.speed}</span>
          <span class="popup-zone">Zone ${v.zone}</span>
          <span class="popup-time">Updated: ${new Date().toLocaleTimeString()}</span>
        </div>
      `);
    });

    /* ── Alert circle: waterhole hotspot ── */
    L.circle([19.2255, 72.9215], {
      radius: 180,
      color: '#F9A825', fillColor: '#FFF8E1', fillOpacity: 0.25,
      weight: 2, dashArray: '8 4',
    }).addTo(map).bindTooltip('🔥 Predicted Hotspot', { direction: 'top', className: 'hotspot-label' });

    mapInstance.current = map;

    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  return (
    <div className="zone-map card animate-in">
      <div className="zone-map-header">
        <div className="card-title" style={{ marginBottom: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
          Live Zone Map — Sanjay Gandhi National Park
        </div>
        <div className="map-controls">
          <button
            className={`map-toggle ${activeLayer.zones ? 'on' : ''}`}
            onClick={() => setActiveLayer(p => ({ ...p, zones: !p.zones }))}
          >🗺️ Zones</button>
          <button
            className={`map-toggle ${activeLayer.animals ? 'on' : ''}`}
            onClick={() => setActiveLayer(p => ({ ...p, animals: !p.animals }))}
          >🐾 Animals</button>
          <button
            className={`map-toggle ${activeLayer.vehicles ? 'on' : ''}`}
            onClick={() => setActiveLayer(p => ({ ...p, vehicles: !p.vehicles }))}
          >🚙 Vehicles</button>
        </div>
      </div>

      {/* Weather bar */}
      <div className="weather-bar">
        <span>{weatherInfo.condition} {weatherInfo.temp}</span>
        <span>💧 {weatherInfo.humidity}</span>
        <span>💨 {weatherInfo.wind}</span>
        <span className="weather-live-dot">● LIVE</span>
      </div>

      <div ref={mapRef} className="leaflet-container-wrapper" id="safari-map" />

      <div className="zone-map-legend">
        <span className="legend-item"><span className="legend-dot" style={{ background: '#fff', border: '2px solid #2E7D32' }} /> Animals</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#1565C0' }} /> Vehicles</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#A5D6A7' }} /> Safari Zones</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#F9A825' }} /> Hotspots</span>
      </div>
    </div>
  );
}
