"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";

export default function TicketsPage() {
  return (
    <ProtectedRoute>
      <RouteGuard>
        <MainLayout>
          <div className="container mx-auto py-6">
            <h1 className="text-2xl font-semibold">Support Tickets</h1>
            <p className="text-muted-foreground mt-2">
              Zoho Desk integration will be implemented here. This is a
              placeholder for the support ticket system.
            </p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> This page will integrate with Zoho Desk
                to provide full support ticket management capabilities.
              </p>
            </div>
          </div>
        </MainLayout>
      </RouteGuard>
    </ProtectedRoute>
  );
}
