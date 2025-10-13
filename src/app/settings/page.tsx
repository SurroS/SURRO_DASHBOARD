"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import RoleBasedContent from "@/components/RoleBasedContent";
import HRMSSettings from "@/components/settings/HRMSSettings";
import InvestorSettings from "@/components/settings/InvestorSettings";
import InvestorsNav from "@/components/investors-dashboard/InvestorsNav";
import MainLayout from "@/layouts/MainLayout";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <RoleBasedContent
        investor={
          <div className="min-h-screen bg-gray-50">
            <InvestorsNav currentPage="Settings" />
            <InvestorSettings />
          </div>
        }
        hrms={
          <MainLayout>
            <HRMSSettings />
          </MainLayout>
        }
        hr={
          <MainLayout>
            <HRMSSettings />
          </MainLayout>
        }
        marketer={
          <MainLayout>
            <HRMSSettings />
          </MainLayout>
        }
        agent={
          <MainLayout>
            <HRMSSettings />
          </MainLayout>
        }
      />
    </ProtectedRoute>
  );
}
