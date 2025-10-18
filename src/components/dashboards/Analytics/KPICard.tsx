import { KPIData } from "@/utils/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  data: KPIData;
  onClick?: () => void;
}

export default function KPICard({ data, onClick }: KPICardProps) {
  const isPositive = data.change >= 0;

  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${
        onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      }`}
      onClick={onClick}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{data.title}</h3>
      <div className="flex items-end justify-between mb-3">
        <p className="text-3xl font-bold text-gray-900">{data.value}</p>
        <div
          className={`flex items-center text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {Math.abs(data.change)}%
        </div>
      </div>
      {data.breakdown && (
        <div className="space-y-1 pt-3 border-t border-gray-100">
          {data.breakdown.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">
                {typeof item.value === "number" && item.value > 1000
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
