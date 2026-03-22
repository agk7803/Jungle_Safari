import React from 'react';
import './AlertsPanel.css';

const alerts = [
  { type: 'overcrowding', zone: 'Zone D', message: 'Vehicle capacity reached — consider rerouting', time: '2 min ago', icon: '⚠️' },
  { type: 'animal', zone: 'Zone A', message: 'Elephant herd detected near main road — slow down', time: '5 min ago', icon: '🔴' },
  { type: 'overcrowding', zone: 'Zone C', message: 'High vehicle density approaching limit', time: '8 min ago', icon: '⚠️' },
  { type: 'animal', zone: 'Zone C', message: 'Leopard spotted crossing trail — maintain distance', time: '12 min ago', icon: '🔴' },
  { type: 'hotspot', zone: 'Zone B', message: 'Predicted hotspot: Giraffe feeding area 11:00–11:30', time: '15 min ago', icon: '🟢' },
  { type: 'hotspot', zone: 'Zone A', message: 'Predicted hotspot: Waterhole activity 11:15–12:00', time: '18 min ago', icon: '🟢' },
];

export default function AlertsPanel() {
  return (
    <div className="alerts-panel card animate-in">
      <div className="card-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Alerts
      </div>
      <div className="alerts-list">
        {alerts.map((a, i) => (
          <div className={`alert-row alert-${a.type}`} key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="alert-icon">{a.icon}</span>
            <div className="alert-content">
              <div className="alert-message">{a.message}</div>
              <div className="alert-meta">
                <span className="alert-zone-tag">{a.zone}</span>
                <span className="alert-time">{a.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
