"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import HRMSSettings from "@/components/settings/HRMSSettings";
import InvestorSettings from "@/components/settings/InvestorSettings";
import InvestorsNav from "@/components/investors-dashboard/InvestorsNav";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/lib/auth";

export default function SettingsPage() {
  const { user } = useAuth();

  const renderSettings = () => {
    if (!user) return null;

    switch (user.role) {
      case "investor_admin":
        return (
          <div className="min-h-screen bg-gray-50">
            <InvestorsNav currentPage="Settings" />
            <InvestorSettings />
          </div>
        );
      default:
        // All other roles use HRMS settings
        return (
          <MainLayout>
            <HRMSSettings />
          </MainLayout>
        );
    }
  };

  return (
    <ProtectedRoute>
      <RouteGuard>{renderSettings()}</RouteGuard>
    </ProtectedRoute>
  );
}
