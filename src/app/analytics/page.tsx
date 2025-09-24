"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-6">
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-muted-foreground mt-2">Coming soon.</p>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
