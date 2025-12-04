import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRule, addBlockedMerchant } from '../store/fraudSlice';
import { Settings, Save } from 'lucide-react';

const RulesConfig = () => {
  const dispatch = useDispatch();
  const { blockedMerchants } = useSelector((state) => state.fraud);
  const [ruleType, setRuleType] = useState('Fund Transaction');
  
  // State for Fund Transaction
  const [fundConfig, setFundConfig] = useState({
    senderName: '',
    receiverName: '',
    senderCountry: '',
    receivingCountry: '',
    value: ''
  });

  // State for Beneficiary Name Change
  const [blockBeneficiaryChange, setBlockBeneficiaryChange] = useState('No');

  // State for Blocked Merchants
  const [newMerchant, setNewMerchant] = useState({
    name: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (ruleType === 'Blocked Merchants') {
      if (newMerchant.name && newMerchant.reason) {
        dispatch(addBlockedMerchant(newMerchant));
        alert('Blocked Merchant added successfully!');
        setNewMerchant({ name: '', reason: '' });
        // Simulate API call
        console.log('API Call: POST /api/blocked-merchants', newMerchant);
      } else {
        alert('Please fill in both name and reason');
      }
    } else if (ruleType === 'Fund Transaction') {
      dispatch(addRule({
        name: 'Fund Transaction Rule',
        type: 'Fund',
        config: fundConfig
      }));
      alert('Fund Transaction Rule updated!');
      // Simulate API call
      console.log('API Call: POST /api/rules/fund', fundConfig);
    } else if (ruleType === 'Beneficiary Name Change') {
      dispatch(addRule({
        name: 'Beneficiary Name Change',
        type: 'Beneficiary',
        config: { blockChanges: blockBeneficiaryChange }
      }));
      alert('Beneficiary Rule updated!');
      // Simulate API call
      console.log('API Call: POST /api/rules/beneficiary', { blockChanges: blockBeneficiaryChange });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Rules Configuration</h2>
          <p className="page-subtitle">Configure fraud detection rules</p>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Rule Type</label>
            <select 
              className="form-select"
              value={ruleType}
              onChange={(e) => setRuleType(e.target.value)}
            >
              <option>Fund Transaction</option>
              <option>Beneficiary Name Change</option>
              <option>Blocked Merchants</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={16} />
              {ruleType} Configuration
            </h4>
          </div>

          {/* Fund Transaction Form */}
          {ruleType === 'Fund Transaction' && (
            <>
              <div className="form-group">
                <label className="form-label">Sender Name</label>
                <input 
                  type="text" className="form-input" 
                  value={fundConfig.senderName}
                  onChange={(e) => setFundConfig({...fundConfig, senderName: e.target.value})}
                  placeholder="Enter sender name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Receiver Name</label>
                <input 
                  type="text" className="form-input" 
                  value={fundConfig.receiverName}
                  onChange={(e) => setFundConfig({...fundConfig, receiverName: e.target.value})}
                  placeholder="Enter receiver name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Sender Country</label>
                <input 
                  type="text" className="form-input" 
                  value={fundConfig.senderCountry}
                  onChange={(e) => setFundConfig({...fundConfig, senderCountry: e.target.value})}
                  placeholder="Enter sender country"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Receiving Country</label>
                <input 
                  type="text" className="form-input" 
                  value={fundConfig.receivingCountry}
                  onChange={(e) => setFundConfig({...fundConfig, receivingCountry: e.target.value})}
                  placeholder="Enter receiving country"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Value (Amount)</label>
                <input 
                  type="number" className="form-input" 
                  value={fundConfig.value}
                  onChange={(e) => setFundConfig({...fundConfig, value: e.target.value})}
                  placeholder="Enter transaction value"
                />
              </div>
            </>
          )}

          {/* Beneficiary Name Change Form */}
          {ruleType === 'Beneficiary Name Change' && (
            <div className="form-group">
              <label className="form-label">Block Beneficiary Name Changes?</label>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="block" 
                    checked={blockBeneficiaryChange === 'Yes'} 
                    onChange={() => setBlockBeneficiaryChange('Yes')}
                  /> Yes
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="block" 
                    checked={blockBeneficiaryChange === 'No'} 
                    onChange={() => setBlockBeneficiaryChange('No')}
                  /> No
                </label>
              </div>
            </div>
          )}

          {/* Blocked Merchants Form */}
          {ruleType === 'Blocked Merchants' && (
            <>
              <div className="form-group">
                <label className="form-label">Existing Blocked Merchants</label>
                <select className="form-select">
                  {blockedMerchants.map(m => (
                    <option key={m.id} value={m.id}>{m.name} - {m.reason}</option>
                  ))}
                </select>
              </div>
              
              <h5 style={{ color: '#ef4444', margin: '1.5rem 0 1rem 0' }}>Add New Blocked Merchant</h5>
              
              <div className="form-group">
                <label className="form-label">Merchant Name</label>
                <input 
                  type="text" className="form-input" 
                  value={newMerchant.name}
                  onChange={(e) => setNewMerchant({...newMerchant, name: e.target.value})}
                  placeholder="Enter merchant name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Reason</label>
                <input 
                  type="text" className="form-input" 
                  value={newMerchant.reason}
                  onChange={(e) => setNewMerchant({...newMerchant, reason: e.target.value})}
                  placeholder="Enter reason for blocking"
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
            <Save size={18} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
};

export default RulesConfig;
