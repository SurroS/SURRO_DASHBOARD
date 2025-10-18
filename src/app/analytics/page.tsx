"use client";

import Compliance from "@/components/dashboards/Analytics/Compliance";
import DailyActiveUsers from "@/components/dashboards/Analytics/DailyActiveUsers";
import EmployeeActivity from "@/components/dashboards/Analytics/EmployeeActivity";
import GeographicDistribution from "@/components/dashboards/Analytics/GeographicDistribution";
import OverviewKPI from "@/components/dashboards/Analytics/OverviewKPI";
import RevenueAndFinancial from "@/components/dashboards/Analytics/RevenueAndFinancial";
import SupportTickets from "@/components/dashboards/Analytics/SupportTickets";
import TopPerformers from "@/components/dashboards/Analytics/TopPerformers";
import UserDistributionByType from "@/components/dashboards/Analytics/UserDistributionByType";
import UserGrowthOverTime from "@/components/dashboards/Analytics/UserGrowthOverTime";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import { ArrowDownToLine, Headphones, Shield, Users } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-2xl font-semibold">Analytics</h1>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
              <ArrowDownToLine />
              <div>Export to CSV</div>
            </button>
          </div>
          <div className="h-5" />
          {/* Overview KPI  */}
          <OverviewKPI />
          <div className="h-5" />

          {/* User Analytics  */}
          <div className="">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                User Analytics
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <UserGrowthOverTime />
              <UserDistributionByType />
              <DailyActiveUsers />
              <GeographicDistribution />
            </div>
          </div>
          <div className="h-5" />

          {/* Revenue and Financial  */}
          <RevenueAndFinancial />
          <div className="h-5" />
          {/* Support & Employee Performance */}
          <div>
            <div className="flex items-center mb-4">
              <Headphones className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Support & Employee Performance
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <EmployeeActivity />
              <SupportTickets />
            </div>
          </div>

          <div className="h-5" />

          {/* Compliance and Security  */}
          <div>
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Compliance & Security
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Compliance />
              <TopPerformers />
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
