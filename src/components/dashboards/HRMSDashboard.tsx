"use client";

import { useAuth } from "@/lib/auth";

export default function HRMSDashboard() {
  const { user: _user } = useAuth();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Coming soon.</p>
    </div>
  );
}
