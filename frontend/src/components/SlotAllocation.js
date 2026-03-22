import React from 'react';
import './SlotAllocation.css';

const slots = [
  { zone: 'Zone A', total: 15, used: 8, status: 'available' },
  { zone: 'Zone B', total: 12, used: 6, status: 'available' },
  { zone: 'Zone C', total: 10, used: 9, status: 'limited' },
  { zone: 'Zone D', total: 8, used: 8, status: 'full' },
];

export default function SlotAllocation() {
  return (
    <div className="slot-allocation card animate-in">
      <div className="card-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Dynamic Slot Allocation
      </div>
      <div className="slot-grid">
        {slots.map((s, i) => {
          const pct = (s.used / s.total) * 100;
          const available = s.total - s.used;
          return (
            <div className={`slot-item ${s.status}`} key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="slot-header">
                <span className="slot-zone">{s.zone}</span>
                <span className={`slot-badge ${s.status}`}>
                  {s.status === 'full' ? 'Full' : s.status === 'limited' ? 'Limited' : 'Open'}
                </span>
              </div>
              <div className="slot-progress-track">
                <div className="slot-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="slot-details">
                <span>{available} slot{available !== 1 ? 's' : ''} available</span>
                <span className="slot-ratio">{s.used}/{s.total}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="slot-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        Auto-adjusts based on real-time vehicle count
      </p>
    </div>
  );
}
