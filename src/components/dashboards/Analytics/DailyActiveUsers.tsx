import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DailyActiveUsers = () => {
  const data = [
    { day: "Mon", users: 3245 },
    { day: "Tue", users: 3567 },
    { day: "Wed", users: 3892 },
    { day: "Thu", users: 3456 },
    { day: "Fri", users: 3234 },
    { day: "Sat", users: 2345 },
    { day: "Sun", users: 2567 },
  ];

  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Daily Active Users
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Area
            type="linear"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorDaily)"
            dot={{ fill: "#3b82f6", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyActiveUsers;
