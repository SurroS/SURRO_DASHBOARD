import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const SupportTicket = () => {
  const data = [
    { week: "Week 1", tickets: 234 },
    { week: "Week 2", tickets: 312 },
    { week: "Week 3", tickets: 289 },
    { week: "Week 4", tickets: 399 },
  ];

  return (
    <div className="w-full bg-white rounded-2xl p-5">
      <h2 className="text-lg font-bold text-gray-900 mb-8">
        Support Ticket Trends
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
          <defs>
            <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 14, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            domain={[0, "dataMax + 50"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => [`${value} tickets`, "Support Tickets"]}
            labelStyle={{ color: "#6b7280" }}
          />
          <Area
            type="linear"
            dataKey="tickets"
            stroke="#ec4899"
            strokeWidth={2}
            fill="url(#colorTickets)"
            dot={{ fill: "#ec4899", r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SupportTicket;
