import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

// Define the structure of each data point in the chart
interface ChartData {
  month: string;
  totalEarnings: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartData; totalEarnings: number }[];
}

const Bar_Chart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  // Custom tooltip to display the information
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 rounded-md border border-gray-300">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.month}
          </p>
          <p className="text-xs text-gray-600">
            Total Income:{" "}
            <span className="font-semibold">
              ${payload[0].payload.totalEarnings}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tick style for X and Y axes
  const tickStyle = { fill: "#000", fontSize: 12 };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <RechartsTooltip content={<CustomTooltip />} />
          <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#0861C500", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />

          <Bar
            dataKey="totalEarnings"
            fill="url(#incomeGradient)" // Bar color
            barSize={20} // Width of each bar
            radius={[10, 10, 10, 10]} // Rounded corners for bars
          />

          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0c3188" />
              <stop offset="100%" stopColor="#0c3188 " />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
