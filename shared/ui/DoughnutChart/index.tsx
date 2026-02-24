"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartData {
  label: string;
  value: number;
  color: string;
}

interface Props {
  data: DoughnutChartData[];
  title?: string;
}

const DoughnutChart: React.FC<Props> = ({ data, title }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderColor: "#000000",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 12,
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {title && (
        <h3 className="text-xl font-medium text-white mb-4 text-center">
          {title}
        </h3>
      )}
      <div className="flex justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
