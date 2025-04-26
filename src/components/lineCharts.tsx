import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "2:00 AM", clicks: 0 },
  { time: "7:00 AM", clicks: 0 },
  { time: "12:00 PM", clicks: 3 },
  { time: "5:00 PM", clicks: 0 },
  { time: "10:00 PM", clicks: 1 },
];

export default function ClicksChart() {
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
