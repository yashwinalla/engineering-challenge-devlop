import React from 'react';
import { useSelector } from 'react-redux';
import { Shield, AlertTriangle, Activity, CheckCircle, AlertOctagon } from 'lucide-react';

const Dashboard = () => {
  const { alerts, stats } = useSelector((state) => state.fraud);

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Fraud Detection Dashboard</h2>
          <p className="page-subtitle">Real-time payment monitoring system</p>
        </div>
        <button className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
          <Activity size={16} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
          Live Monitoring
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#0ea5e9' }}>
            <Shield size={24} />
          </div>
          <div>
            <h3 className="stat-value">{stats.totalAlerts}</h3>
            <p className="stat-label">Total Alerts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="stat-value">{stats.highRisk}</h3>
            <p className="stat-label">High Risk</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#eab308' }}>
            <Activity size={24} />
          </div>
          <div>
            <h3 className="stat-value">{stats.warnings}</h3>
            <p className="stat-label">Warnings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#22c55e' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <h3 className="stat-value">{stats.cleared}</h3>
            <p className="stat-label">Cleared</p>
          </div>
        </div>
      </div>

      <div className="alerts-grid">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-card ${alert.severity.toLowerCase()}`}>
            <div className="alert-header">
              <div className="alert-title-row">
                {alert.severity === 'Danger' && <AlertOctagon size={20} color="#ef4444" />}
                {alert.severity === 'Warning' && <AlertTriangle size={20} color="#eab308" />}
                {alert.severity === 'Safe' && <Shield size={20} color="#22c55e" />}
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{alert.ruleName}</h4>
                  <span className="alert-id">{alert.id}</span>
                </div>
              </div>
              <span className={`alert-badge ${alert.severity.toLowerCase()}`}>
                {alert.severity === 'Danger' ? 'Danger' : alert.severity === 'Warning' ? 'Warning' : 'Safe'}
              </span>
            </div>

            <p className="alert-desc">{alert.description}</p>

            <div className="txn-details">
              <div>
                <div className="detail-label">Sender</div>
                <div className="detail-value">{alert.sender}</div>
              </div>
              <div>
                <div className="detail-label">Receiver</div>
                <div className="detail-value">{alert.receiver}</div>
              </div>
            </div>

            <div className="alert-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={14} />
                {alert.timestamp}
              </div>
              <div>
                Risk Score <span className={`risk-score ${alert.riskScore > 90 ? 'high' : alert.riskScore > 50 ? 'medium' : 'low'}`}>{alert.riskScore}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
