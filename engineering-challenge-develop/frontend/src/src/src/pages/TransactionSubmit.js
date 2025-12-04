import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../store/fraudSlice';
import { Send, CreditCard } from 'lucide-react';

const TransactionSubmit = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: 'Transaction Type',
    sender: '',
    receiver: '',
    amount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTransaction({
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }));
    alert('Transaction submitted for analysis');
    setFormData({ type: 'Transaction Type', sender: '', receiver: '', amount: '' });
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Submit Transaction</h2>
          <p className="page-subtitle">Ingest mock transactions for analysis</p>
        </div>
      </div>

      <div className="form-container">
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={16} />
            Transaction Type Configuration
          </h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Rule Type</label>
            <select 
              className="form-select"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option>Transaction Type</option>
              <option>Wire Transfer</option>
              <option>ACH</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sender Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter sender name"
              value={formData.sender}
              onChange={(e) => setFormData({...formData, sender: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Receiver Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter receiver name"
              value={formData.receiver}
              onChange={(e) => setFormData({...formData, receiver: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Transaction Value</label>
            <input 
              type="number" 
              className="form-input" 
              placeholder="Enter value"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            <Send size={18} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Submit Rule
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionSubmit;
