import React, { useState } from 'react';
import TransactionsTable from './TransactionsTable';
import TransactionBar from './TransactionBar';
import Statistics from './Statistics';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Transaction Dashboard</h1>
      </div>
      
      <TransactionsTable 
        selectedMonth={selectedMonth} 
        onMonthChange={setSelectedMonth} 
      />
      <Statistics selectedMonth={selectedMonth} />
      <TransactionBar selectedMonth={selectedMonth} />
    </div>
  );
};

export default Dashboard;