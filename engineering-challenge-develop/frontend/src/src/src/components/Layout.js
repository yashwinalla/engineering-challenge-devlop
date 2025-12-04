import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Shield, LayoutDashboard, Settings, FileText } from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="brand">
          <Shield className="brand-icon" size={32} />
          <div>
            <h1 className="brand-name">FraudGuard</h1>
            <p className="brand-subtitle">Payment Signal Detector</p>
          </div>
        </div>
        <div className="system-status">
          <span className="status-dot"></span>
          System Active
        </div>
      </header>

      <nav className="nav-tabs">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
        <NavLink to="/rules" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Settings size={18} />
          Rules Config
        </NavLink>
        <NavLink to="/submit" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FileText size={18} />
          Post Text
        </NavLink>
      </nav>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
