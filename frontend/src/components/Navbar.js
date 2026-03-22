import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ sidebarCollapsed }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="navbar" style={{ left: sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)' }}>
      <div className="navbar-left">
        <h1 className="navbar-title">Smart Adaptive Safari Control System</h1>
      </div>
      <div className="navbar-right">
        <div className="navbar-clock">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>{time.toLocaleTimeString()}</span>
        </div>
        <div className="navbar-status">
          <span className="status-dot" />
          <span>Live Status: <strong>Active</strong></span>
        </div>
        <div className="navbar-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
      </div>
    </header>
  );
}
