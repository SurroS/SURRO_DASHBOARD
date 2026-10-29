"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BarChart3,
  Ticket,
  CheckCircle,
  TrendingUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useDashboardStats } from "@/hooks/useAdminUsers";

const recentActivities = [
  {
    id: "#ACT001",
    type: "User Registration",
    user: "john.smith@email.com",
    action: "Account Created",
    timestamp: "2 hours ago",
    status: "Completed",
  },
  {
    id: "#ACT002",
    type: "Approval",
    user: "sarah.j@email.com",
    action: "Manual Approval Required",
    timestamp: "4 hours ago",
    status: "Pending",
  },
  {
    id: "#ACT003",
    type: "Support",
    user: "mike.w@email.com",
    action: "New Support Ticket",
    timestamp: "6 hours ago",
    status: "Open",
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "open":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function GeneralAdminDashboard() {
  const stats = useDashboardStats();

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="flex items-center justify-center p-12">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <span className="ml-2 text-red-500">{stats.error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">General Admin Dashboard</h1>
        <p className="text-gray-600">
          Comprehensive overview of system operations and user management
        </p>
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
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.surrogateCount} surrogates, {stats.intendedParentCount} parents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.pendingApprovals}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agents</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.agentCount}</div>
            <p className="text-xs text-muted-foreground">Active agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intended Parents</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.intendedParentCount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Registered parents</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Pending Approvals</p>
                  <p className="text-sm text-gray-600">
                    {stats.pendingApprovals} accounts
                  </p>
                </div>
              </div>
              <Button size="sm">Review</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">User Management</p>
                  <p className="text-sm text-gray-600">
                    {stats.totalUsers.toLocaleString()} total users
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Manage
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-sm text-gray-600">View system metrics</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">System Health</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Good
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Surrogates</span>
              <span className="text-lg font-bold">
                {stats.surrogateCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Agents</span>
              <span className="text-lg font-bold">
                {stats.agentCount}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{activity.id}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeClass(activity.status)}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-500">
                    {activity.action} • {activity.timestamp}
                  </p>
                </div>
                <Button size="sm" variant="ghost">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
