import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import LoanRepaymentTracker from './components/LoanRepaymentTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/repayment-tracker" element={<LoanRepaymentTracker />} />
      </Routes>
    </Router>
  );
}

export default App;