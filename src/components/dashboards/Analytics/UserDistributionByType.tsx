import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const UserDistributionByType = () => {
  const data = [
    { name: "Surrogates", value: 4823, percentage: 38.7, fill: "#3b82f6" },
    { name: "Parents", value: 3912, percentage: 31.4, fill: "#10b981" },
    { name: "Clinics", value: 2145, percentage: 17.2, fill: "#f59e0b" },
    { name: "Agents", value: 1578, percentage: 12.7, fill: "#ef4444" },
  ];

  return (
    <div className="bg-white rounded-2xl p-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        User Distribution by Type
      </h3>
      <div className="flex items-center justify-between">
        <div className="w-1/2 flex justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={-270}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 pl-8">
          <div className="space-y-4">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}></div>
                  <span className="text-gray-700 font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDistributionByType;
