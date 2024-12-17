import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const BarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchBarChart = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/bar-chart?month=${selectedMonth}`
      );
      const data = response.data;
      setChartData({
        labels: data.map((item) => item.range),
        datasets: [
          {
            label: "Items in Price Range",
            data: data.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    };
    fetchBarChart();
  }, [selectedMonth]);

  return (
    <div>
      <h2>Price Range Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
