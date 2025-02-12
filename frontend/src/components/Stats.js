import React, { useEffect, useState } from "react";
import axios from "axios";

const Stats = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stats", {
        params: { month: "January" }  // Adjust this dynamically if needed
      })
      .then((res) => setStatsData(res.data))
      .catch((err) => {
        console.error("Error fetching stats data:", err.response?.data || err.message);
        setError("Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p>{error}</p>;

  return statsData ? <div>{/* Render stats data */}</div> : <p>No stats data available</p>;
};

export default Stats;
