import { topPerformers } from "@/utils/mockData";
import React from "react";

const TopPerformers = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Top Performers
      </h3>
      <div className="space-y-3">
        {topPerformers.map((performer, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {performer.name}
                </p>
                <p className="text-xs text-gray-600">
                  {performer.referrals} referrals
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600">
                {performer.conversions} conversions
              </p>
              <p className="text-xs text-gray-500">
                {((performer.conversions / performer.referrals) * 100).toFixed(
                  1
                )}
                % rate
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;
