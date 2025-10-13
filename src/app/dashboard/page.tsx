"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import RoleBasedContent from "@/components/RoleBasedContent";
import HRMSDashboard from "@/components/dashboards/HRMSDashboard";
import InvestorDashboard from "@/components/dashboards/InvestorDashboard";
import InvestorsNav from "@/components/investors-dashboard/InvestorsNav";
import MainLayout from "@/layouts/MainLayout";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <RoleBasedContent
        investor={
          <div className="min-h-screen bg-gray-50">
            <InvestorsNav showDateSelector={true} currentPage="Dashboard" />
            <InvestorDashboard />
          </div>
        }
        hrms={
          <MainLayout>
            <HRMSDashboard />
          </MainLayout>
        }
        hr={
          <MainLayout>
            <HRMSDashboard />
          </MainLayout>
        }
        marketer={
          <MainLayout>
            <HRMSDashboard />
          </MainLayout>
        }
        agent={
          <MainLayout>
            <HRMSDashboard />
          </MainLayout>
        }
      />
    </ProtectedRoute>
  );
}
