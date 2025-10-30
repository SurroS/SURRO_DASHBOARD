"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Approved", value: 1173, percentage: 94.2, fill: "#3b82f6" },
  { name: "Rejected", value: 342, percentage: 2.7, fill: "#10b981" },
  { name: "Pending", value: 380, percentage: 3.1, fill: "#f59e0b" },
];

const Compliance = () => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm h-fit">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Compliance Status
      </h3>

      <div className="flex items-center justify-between">
        {/* Chart */}
        <div className="w-1/2 flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
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
        {/* Legend and Stats */}
        <div className="w-1/2 pl-8">
          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.fill }}></div>
                  <span className="text-lg font-medium text-gray-900">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-gray-500 font-medium">
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

export default Compliance;
