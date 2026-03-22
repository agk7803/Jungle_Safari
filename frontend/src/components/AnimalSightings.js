import React from 'react';
import './AnimalSightings.css';

const sightings = [
  { animal: '🐘 Elephant', time: '10:42 AM', zone: 'Zone A', status: 'active' },
  { animal: '🦁 Lion', time: '10:38 AM', zone: 'Zone A', status: 'active' },
  { animal: '🦒 Giraffe', time: '10:35 AM', zone: 'Zone B', status: 'active' },
  { animal: '🦓 Zebra', time: '10:30 AM', zone: 'Zone B', status: 'recent' },
  { animal: '🐆 Leopard', time: '10:25 AM', zone: 'Zone C', status: 'recent' },
  { animal: '🦏 Rhino', time: '10:18 AM', zone: 'Zone C', status: 'recent' },
  { animal: '🐃 Buffalo', time: '10:12 AM', zone: 'Zone D', status: 'past' },
  { animal: '🦌 Deer', time: '10:05 AM', zone: 'Zone D', status: 'past' },
  { animal: '🐒 Monkey', time: '09:55 AM', zone: 'Zone A', status: 'past' },
  { animal: '🦅 Eagle', time: '09:48 AM', zone: 'Zone B', status: 'past' },
];

export default function AnimalSightings() {
  return (
    <div className="animal-sightings card animate-in">
      <div className="card-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>
        Animal Sightings
      </div>
      <div className="sightings-list">
        {sightings.map((s, i) => (
          <div className="sighting-row" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="sighting-animal">{s.animal}</span>
            <span className="sighting-zone">{s.zone}</span>
            <span className="sighting-time">{s.time}</span>
            <span className={`sighting-status ${s.status}`}>
              {s.status === 'active' ? '● Live' : s.status === 'recent' ? '○ Recent' : '◌ Past'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
