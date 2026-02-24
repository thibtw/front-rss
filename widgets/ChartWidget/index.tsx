import React from "react";
import DoughnutChart, {
  type DoughnutChartData,
} from "@/shared/ui/DoughnutChart";

const mockChartData: DoughnutChartData[] = [
  {
    label: "linkedin",
    value: 35,
    color: "#FFFFFF",
  },
  {
    label: "weworkremotely",
    value: 25,
    color: "#CCCCCC",
  },
  {
    label: "jooble",
    value: 20,
    color: "#808080",
  },
  {
    label: "indeed",
    value: 20,
    color: "#404040",
  },
];

const ChartWidget: React.FC = () => {
  return (
    <div className="w-full py-8 px-4">
      <DoughnutChart
        data={mockChartData}
        title="Job Opportunities by Platform"
      />
    </div>
  );
};

export default ChartWidget;
