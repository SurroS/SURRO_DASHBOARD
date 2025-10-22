"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import HRMSDashboard from "@/components/dashboards/HRMSDashboard";
import InvestorDashboard from "@/components/dashboards/InvestorDashboard";
import SupportDashboard from "@/components/dashboards/SupportDashboard";
import FinanceDashboard from "@/components/dashboards/FinanceDashboard";
import OperationsDashboard from "@/components/dashboards/OperationsDashboard";
import MarketingDashboard from "@/components/dashboards/MarketingDashboard";
import GeneralAdminDashboard from "@/components/dashboards/GeneralAdminDashboard";
import SuperAdminDashboard from "@/components/dashboards/SuperAdminDashboard";
import InvestorsNav from "@/components/investors-dashboard/InvestorsNav";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/lib/auth";

export default function DashboardPage() {
  const { user } = useAuth();

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case "support_admin":
        return (
          <MainLayout>
            <SupportDashboard />
          </MainLayout>
        );
      case "finance_admin":
        return (
          <MainLayout>
            <FinanceDashboard />
          </MainLayout>
        );
      case "security_admin":
        return (
          <MainLayout>
            <OperationsDashboard />
          </MainLayout>
        );
      case "marketing_admin":
        return (
          <MainLayout>
            <MarketingDashboard />
          </MainLayout>
        );
      case "general_admin":
        return (
          <MainLayout>
            <GeneralAdminDashboard />
          </MainLayout>
        );
      case "super_admin":
        return (
          <MainLayout>
            <SuperAdminDashboard />
          </MainLayout>
        );
      case "investor_admin":
        return (
          <div className="min-h-screen bg-gray-50">
            <InvestorsNav showDateSelector={true} currentPage="Dashboard" />
            <InvestorDashboard />
          </div>
        );
      default:
        // Fallback for existing roles
        return (
          <MainLayout>
            <HRMSDashboard />
          </MainLayout>
        );
    }
  };

  return (
    <ProtectedRoute>
      <RouteGuard>{renderDashboard()}</RouteGuard>
    </ProtectedRoute>
  );
}
