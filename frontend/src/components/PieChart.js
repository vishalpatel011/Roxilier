import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pie-chart", {
        params: { month: "March" }  // Default month
      })
      .then((res) => {
        if (res.data && Object.keys(res.data).length > 0) {
          setChartData({
            labels: Object.keys(res.data),
            datasets: [
              {
                data: Object.values(res.data),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)"
                ],
              },
            ],
          });
        } else {
          setError("No data available");
        }
      })
      .catch((err) => {
        console.error("Error fetching pie chart data:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  const options = {
    responsive: true
  };

  return chartData ? <Pie data={chartData} options={options} /> : <p>No chart data available</p>;
};

export default PieChart;
