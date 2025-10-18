import { KPIData } from "@/utils/mockData";
import { X, Download, Share2 } from "lucide-react";

interface DetailModalProps {
  data: KPIData;
  onClose: () => void;
}

export default function DetailModal({ data, onClose }: DetailModalProps) {
  const handleExport = (format: string) => {
    alert(`Exporting ${data.title} data as ${format}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {data.title} - Detailed View
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700 mb-1">Current Value</p>
              <p className="text-3xl font-bold text-blue-900">{data.value}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-700 mb-1">Change</p>
              <p className="text-3xl font-bold text-green-900">
                {data.change > 0 ? "+" : ""}
                {data.change}%
              </p>
            </div>
          </div>

          {data.breakdown && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Breakdown
              </h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                        Value
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.breakdown.map((item, idx) => {
                      const total = data.breakdown!.reduce(
                        (sum, i) => sum + i.value,
                        0
                      );
                      const percentage = ((item.value / total) * 100).toFixed(
                        1
                      );
                      return (
                        <tr key={idx} className="hover:bg-gray-100">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.label}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                            {item.value.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right">
                            {percentage}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-yellow-900 mb-2">
              Insights
            </h4>
            <p className="text-sm text-yellow-800">
              {data.change > 0
                ? `${data.title} has shown positive growth of ${data.change}% over the previous period.`
                : `${data.title} has decreased by ${Math.abs(
                    data.change
                  )}% compared to the previous period.`}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => handleExport("CSV")}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
            <button
              onClick={() => handleExport("PDF")}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => alert("Share functionality")}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
