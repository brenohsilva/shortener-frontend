"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ClicksChartData {
  time: string;
  clicks: number;
}

export default function ClicksChart({ data }: { data: ClicksChartData[] }) {
  
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tickCount={3} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ fontSize: "12px" }}
            labelStyle={{ fontSize: "12px" }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#4c9ffe"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
