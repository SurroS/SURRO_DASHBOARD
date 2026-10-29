"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Users,
  BarChart3,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAnalyticsOverview, useActivityFeed } from "@/hooks/useAnalytics";

const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case "PAYMENT":
    case "SUBSCRIPTION":
      return "bg-green-100 text-green-800 border-green-200";
    case "KYC":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export default function SuperAdminDashboard() {
  const router = useRouter();
  const { overview, loading, error } = useAnalyticsOverview();
  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useActivityFeed(10);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="flex items-center justify-center p-12">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <span className="ml-2 text-red-500">
          {error ?? "Failed to load dashboard"}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Crown className="h-8 w-8 text-yellow-600" />
        <div>
          <h1 className="text-2xl font-bold mb-1">Super Admin Dashboard</h1>
          <p className="text-gray-600">
            Complete system oversight and management
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {overview.userGrowthPercent >= 0 ? "+" : ""}
              {overview.userGrowthPercent}% growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Surrogates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview.totalSurrogates.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered surrogate users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {overview.systemHealth}
            </div>
            <p className="text-xs text-muted-foreground">
              {overview.totalEmployees} employees on platform
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${overview.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {overview.pendingApprovals} pending approvals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.openTickets}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Users</span>
                <span className="text-sm text-gray-600">
                  Total: {overview.totalUsers.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Pending approval:</span>
                  <span className="font-medium text-orange-600">
                    {overview.pendingApprovals}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Growth:</span>
                  <span className="font-medium text-green-600">
                    {overview.userGrowthPercent}%
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Employees</span>
                <span className="text-sm text-gray-600">
                  Total: {overview.totalEmployees}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Revenue</span>
                <span className="text-sm text-gray-600">
                  Total: ${overview.totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Employee Management</p>
                  <p className="text-sm text-gray-600">Manage all employees</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => router.push("/employee-management")}
              >
                Manage
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">System Analytics</p>
                  <p className="text-sm text-gray-600">View detailed metrics</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push("/analytics")}
              >
                View
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">System Settings</p>
                  <p className="text-sm text-gray-600">Configure system</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push("/settings")}
              >
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent System Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Events</CardTitle>
        </CardHeader>
        <CardContent>
          {activitiesLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground text-sm">
                Loading events...
              </span>
            </div>
          ) : activitiesError ? (
            <div className="flex items-center justify-center p-8">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="ml-2 text-red-500 text-sm">{activitiesError}</span>
            </div>
          ) : activities.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground p-8">
              No recent events
            </p>
          ) : (
            <div className="space-y-4">
              {activities.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getTypeBadgeClass(event.type)}`}
                      >
                        {event.type.replace(/_/g, " ")}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{event.action}</p>
                    <p className="text-xs text-gray-500">
                      {event.user} • {formatTimestamp(event.timestamp)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => router.push("/audit-logs")}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
