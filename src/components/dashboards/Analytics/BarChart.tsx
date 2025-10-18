import { ChartDataPoint } from "@/utils/mockData";

interface BarChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
}

export default function BarChart({
  data,
  title,
  color = "#3b82f6",
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-fit">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700 font-medium">{item.label}</span>
              <span className="text-gray-900 font-semibold">
                {item.value.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
