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

const UserGrowthOverTime = () => {
  const data = [
    { month: "Jan", users: 8500 },
    { month: "Feb", users: 9200 },
    { month: "Mar", users: 9800 },
    { month: "Apr", users: 10500 },
    { month: "May", users: 11200 },
    { month: "Jun", users: 12458 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        User Growth Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="month"
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
            formatter={(value) => [value.toLocaleString(), "Users"]}
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
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorGrowth)"
            dot={{ fill: "#10b981", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthOverTime;
