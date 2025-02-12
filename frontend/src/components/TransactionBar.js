import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './TransactionBar.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionBar = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/bar-chart?month=${selectedMonth}`);
        const data = response.data;
        
        setChartData({
          labels: [
            '0-100', '101-200', '201-300', '301-400', '401-500',
            '501-600', '601-700', '701-800', '801-900', '901-above'
          ],
          datasets: [{
            label: 'Number of Items',
            data: Object.values(data),
            backgroundColor: 'rgba(74, 144, 226, 0.8)',
            borderColor: 'rgba(74, 144, 226, 1)',
            borderWidth: 1,
          }]
        });
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]); // Add selectedMonth as dependency

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Range Distribution',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    maintainAspectRatio: false
  };

  if (loading) return <div className="loading">Loading chart data...</div>;

  return (
    <div className="bar-chart-container">
      <h2>Transactions Bar Chart - {selectedMonth}</h2>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default TransactionBar;