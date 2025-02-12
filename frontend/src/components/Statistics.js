import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Statistics.css';

const Statistics = ({ selectedMonth }) => {
  const [stats, setStats] = useState({
    totalSales: 0,
    soldItems: 0,
    notSoldItems: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/stats?month=${selectedMonth}`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [selectedMonth]); // Add selectedMonth as dependency

  if (loading) return <div className="loading">Loading statistics...</div>;

  return (
    <div className="statistics-container">
      <div className="stat-box">
        <h3>Total Sale</h3>
        <p className="stat-value">
          {stats.totalSales.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </p>
      </div>
      <div className="stat-box">
        <h3>Total Sold Items</h3>
        <p className="stat-value">{stats.soldItems}</p>
      </div>
      <div className="stat-box">
        <h3>Total Not Sold Items</h3>
        <p className="stat-value">{stats.notSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;