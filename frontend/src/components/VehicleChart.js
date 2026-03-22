import React from 'react';
import './VehicleChart.css';

const vehicleData = [
  { zone: 'Zone A', count: 8, max: 12, color: '#2E7D32' },
  { zone: 'Zone B', count: 6, max: 12, color: '#43A047' },
  { zone: 'Zone C', count: 5, max: 12, color: '#66BB6A' },
  { zone: 'Zone D', count: 5, max: 12, color: '#81C784' },
];

export default function VehicleChart() {
  return (
    <div className="vehicle-chart card animate-in">
      <div className="card-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
        Vehicle Count per Zone
      </div>
      <div className="chart-bars">
        {vehicleData.map((d, i) => (
          <div className="bar-row" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="bar-label">{d.zone}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(d.count / d.max) * 100}%`,
                  background: `linear-gradient(90deg, ${d.color}, ${d.color}bb)`,
                  animationDelay: `${i * 0.15 + 0.3}s`
                }}
              />
            </div>
            <span className="bar-count">{d.count}/{d.max}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
