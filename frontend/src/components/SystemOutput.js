import React from 'react';
import './SystemOutput.css';

const outputItems = [
  {
    title: 'Live Zone Map',
    icon: '🌍',
    description: '4 zones active — Zone A, B, C, D monitored',
    status: 'online',
  },
  {
    title: 'Animal Sightings',
    icon: '🐾',
    description: '87 animals detected across all zones today',
    status: 'online',
  },
  {
    title: 'Vehicle Count per Zone',
    icon: '🚗',
    description: 'Zone A: 8 | Zone B: 6 | Zone C: 5 | Zone D: 5',
    status: 'online',
  },
  {
    title: 'Overcrowding Alerts',
    icon: '⚠️',
    description: 'Zone D at capacity, Zone C approaching limit',
    status: 'warning',
  },
  {
    title: 'Animal Disturbance',
    icon: '🔴',
    description: 'Elephant herd near main road, leopard crossing trail',
    status: 'critical',
  },
  {
    title: 'Predicted Hotspots',
    icon: '🟢',
    description: 'Zone B giraffe area, Zone A waterhole — next 1h',
    status: 'normal',
  },
];

export default function SystemOutput() {
  return (
    <div className="system-output card animate-in">
      <div className="card-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        System Output
      </div>
      <div className="output-grid">
        {outputItems.map((item, i) => (
          <div className={`output-item output-${item.status}`} key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="output-icon">{item.icon}</span>
            <div className="output-info">
              <div className="output-title">{item.title}</div>
              <div className="output-desc">{item.description}</div>
            </div>
            <span className={`output-status-dot ${item.status}`} title={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
