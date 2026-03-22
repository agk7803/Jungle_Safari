import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SmartOverview from './components/SmartOverview';
import StatsRow from './components/StatsRow';
import ZoneMap from './components/ZoneMap';
import AnimalSightings from './components/AnimalSightings';
import VehicleChart from './components/VehicleChart';
import SlotAllocation from './components/SlotAllocation';
import AlertsPanel from './components/AlertsPanel';
import SystemOutput from './components/SystemOutput';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className="main-wrapper"
        style={{
          marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        }}
      >
        <Navbar sidebarCollapsed={sidebarCollapsed} />
        <main className="main-content">
          <SmartOverview />
          <StatsRow />

          <section className="dashboard-grid">
            <div className="grid-col-main">
              <ZoneMap />
              <VehicleChart />
            </div>
            <div className="grid-col-side">
              <AnimalSightings />
              <SlotAllocation />
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="grid-col-main">
              <AlertsPanel />
            </div>
            <div className="grid-col-side">
              {/* Placeholder for quick actions or additional info */}
              <div className="card animate-in quick-actions-card">
                <div className="card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Quick Actions
                </div>
                <div className="quick-actions">
                  <button className="quick-btn">
                    <span>📋</span> Generate Report
                  </button>
                  <button className="quick-btn">
                    <span>🔄</span> Refresh Data
                  </button>
                  <button className="quick-btn">
                    <span>📍</span> Track Vehicle
                  </button>
                  <button className="quick-btn">
                    <span>🎟️</span> New Booking
                  </button>
                </div>
              </div>
            </div>
          </section>

          <SystemOutput />
        </main>
      </div>
    </div>
  );
}

export default App;
