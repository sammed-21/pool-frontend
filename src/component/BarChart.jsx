 

import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarChart = ({ data, highlight, domain }) => {
  // Calculate frequency of data
  const counts = {};
  for (let i = 0; i < data.length; i++) counts[data[i]] = 1;

  // Generate data
  const barDataValues = [];
  for (let i = 0; i < domain[1]; i++) {
    barDataValues.push(counts[i] || 0);
  }

  // Define bar data
  const barData = {
    labels: barDataValues.map((val, i) => i),
    datasets: [
      {
        backgroundColor: barDataValues.map((val, i) =>
          i >= highlight[0] && i <= highlight[1]
            ? "rgba(135, 206, 235, 1)"
            : "#131313"
        ),
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        data: barDataValues,
      },
    ],
  };

  // Define options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: false,
        
      },
    },
  };

  return (
    <div className="w-full h-full relative">
      <Bar data={barData}  options={options} />
    </div>
  );
};

export default BarChart;
