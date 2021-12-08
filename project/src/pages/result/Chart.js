import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  // responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // label 숨기기
    },
  },
  scales: {
    y: {
      min: 0,
      max: 8,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const labels = [
  "능력발휘",
  "자율성",
  "보수",
  "안정성",
  "사회적 인정",
  "사회봉사",
  "자기계발",
  "창의성",
];

export default function Chart({ scores }) {
  return (
    <div
      style={{
        height: 400,
      }}
    >
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              data: scores,
              backgroundColor: "#6B62C7",
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}
