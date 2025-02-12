import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/bar-chart", {
        params: { month: "March" }  // Default month
      })
      .then((res) => {
        if (res.data && Object.keys(res.data).length > 0) {
          setChartData({
            labels: Object.keys(res.data),
            datasets: [
              {
                label: "Transactions by Price Range",
                data: Object.values(res.data),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
        } else {
          setError("No data available");
        }
      })
      .catch((err) => {
        console.error("Error fetching bar chart data:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return chartData ? <Bar data={chartData} options={options} /> : <p>No chart data available</p>;
};

export default BarChart;
