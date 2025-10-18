import { DollarSign } from "lucide-react";
import React from "react";
import BarChart from "./BarChart";
import { referralConversionData, revenueBreakdownData } from "@/utils/mockData";

const RevenueAndFinancial = () => {
  return (
    <section>
      <div className="flex items-center mb-4">
        <DollarSign className="w-5 h-5 text-yellow-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Revenue & Financial
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={revenueBreakdownData}
          title="Revenue Breakdown"
          color="#f59e0b"
        />
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Referral Conversion Funnel
          </h3>
          <div className="space-y-4">
            {Object.entries(referralConversionData).map(([key, value], idx) => {
              const percentage = (
                (value / referralConversionData.referrals) *
                100
              ).toFixed(1);
              return (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {value.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueAndFinancial;
