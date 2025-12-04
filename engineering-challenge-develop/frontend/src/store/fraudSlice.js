import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  alerts: [
    {
      id: 'TXN-2024-0001',
      ruleName: 'Suspicious Fund Text',
      severity: 'Warning',
      description: 'Large fund transfer to offshore account detected',
      sender: 'John Smith',
      receiver: 'Unknown Corp Ltd',
      timestamp: 'Jan 15 at 08:02 PM',
      riskScore: 78,
      status: 'active'
    },
    {
      id: 'TXN-2024-0002',
      ruleName: 'Suspicious Rate Change',
      severity: 'Danger',
      description: 'Unusual exchange rate manipulation detected',
      sender: 'Maria Garcia',
      receiver: 'Global Trading Inc',
      timestamp: 'Jan 15 at 07:15 PM',
      riskScore: 92,
      status: 'active'
    },
    {
      id: 'TXN-2024-0003',
      ruleName: 'Suspicious Merchant Name',
      severity: 'Safe',
      description: 'Merchant verification completed - cleared',
      sender: 'David Wilson',
      receiver: 'Tech Solutions Ltd',
      timestamp: 'Jan 15 at 05:50 PM',
      riskScore: 15,
      status: 'cleared'
    }
  ],
  rules: [
    { id: 1, name: 'Beneficiary Name Change', type: 'Beneficiary', active: true },
    { id: 2, name: 'Transaction Type', type: 'Transaction', active: true }
  ],
  blockedMerchants: [
    { id: 1, name: 'Shell Company LLC', reason: 'Known fraud' },
    { id: 2, name: 'Quick Cash Services', reason: 'Suspicious activity' }
  ],
  stats: {
    totalAlerts: 3,
    highRisk: 1,
    warnings: 1,
    cleared: 1
  }
};

const fraudSlice = createSlice({
  name: 'fraud',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTxn = action.payload;
      state.transactions.unshift(newTxn);
      
      // Simple mock rule evaluation logic
      let alert = null;
      if (newTxn.amount > 10000) {
        alert = {
          id: `TXN-${Date.now()}`,
          ruleName: 'High Value Transaction',
          severity: 'Warning',
          description: `High value transaction of ${newTxn.amount} detected`,
          sender: newTxn.sender,
          receiver: newTxn.receiver,
          timestamp: new Date().toLocaleString(),
          riskScore: 85,
          status: 'active'
        };
      } else if (state.blockedMerchants.some(m => m.name === newTxn.receiver)) {
         alert = {
          id: `TXN-${Date.now()}`,
          ruleName: 'Blocked Merchant',
          severity: 'Danger',
          description: `Transaction to blocked merchant ${newTxn.receiver}`,
          sender: newTxn.sender,
          receiver: newTxn.receiver,
          timestamp: new Date().toLocaleString(),
          riskScore: 99,
          status: 'active'
        };
      } else if (newTxn.sender.toLowerCase() === newTxn.receiver.toLowerCase()) {
        alert = {
          id: `TXN-${Date.now()}`,
          ruleName: 'Self-Dealing',
          severity: 'Warning',
          description: `Sender and receiver are the same entity`,
          sender: newTxn.sender,
          receiver: newTxn.receiver,
          timestamp: new Date().toLocaleString(),
          riskScore: 65,
          status: 'active'
        };
      }

      if (alert) {
        state.alerts.unshift(alert);
        state.stats.totalAlerts += 1;
        if (alert.severity === 'Danger') state.stats.highRisk += 1;
        if (alert.severity === 'Warning') state.stats.warnings += 1;
      }
    },
    addRule: (state, action) => {
      state.rules.push({ ...action.payload, id: Date.now(), active: true });
    },
    addBlockedMerchant: (state, action) => {
      state.blockedMerchants.push({ ...action.payload, id: Date.now() });
    },
    toggleRule: (state, action) => {
      const rule = state.rules.find(r => r.id === action.payload);
      if (rule) rule.active = !rule.active;
    }
  }
});

export const { addTransaction, addRule, addBlockedMerchant, toggleRule } = fraudSlice.actions;
export default fraudSlice.reducer;
