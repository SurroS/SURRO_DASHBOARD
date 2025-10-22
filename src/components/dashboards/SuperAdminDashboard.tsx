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
} from "lucide-react";

const superAdminStats = {
  totalUsers: 1250,
  totalEmployees: 45,
  systemHealth: "Excellent",
  totalRevenue: 125000,
  activeTickets: 23,
  auditLogs: 1250,
  securityAlerts: 3,
  systemUptime: 99.9,
};

const systemMetrics = [
  {
    category: "Users",
    total: 1250,
    active: 1180,
    suspended: 15,
    flagged: 8,
  },
  {
    category: "Employees",
    total: 45,
    active: 42,
    suspended: 1,
    flagged: 2,
  },
  {
    category: "Revenue",
    monthly: 15000,
    yearly: 125000,
    growth: 12.5,
    transactions: 245,
  },
];

const recentSystemEvents = [
  {
    id: "#EVT001",
    type: "Security",
    event: "Employee Account Flagged",
    user: "john.employee@company.com",
    timestamp: "2 hours ago",
    severity: "High",
  },
  {
    id: "#EVT002",
    type: "User",
    event: "Bulk User Suspension",
    user: "System Admin",
    timestamp: "4 hours ago",
    severity: "Medium",
  },
  {
    id: "#EVT003",
    type: "System",
    event: "Database Backup Completed",
    user: "System",
    timestamp: "6 hours ago",
    severity: "Low",
  },
];

const getSeverityBadgeClass = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function SuperAdminDashboard() {
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
              {superAdminStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+25 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {superAdminStats.systemHealth}
            </div>
            <p className="text-xs text-muted-foreground">
              {superAdminStats.systemUptime}% uptime
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
              ${superAdminStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Security Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {superAdminStats.securityAlerts}
            </div>
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
            {systemMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{metric.category}</span>
                  <span className="text-sm text-gray-600">
                    Total: {metric.total}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Active:</span>
                    <span className="font-medium text-green-600">
                      {metric.active}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suspended:</span>
                    <span className="font-medium text-orange-600">
                      {metric.suspended}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
              <Button size="sm">Manage</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">System Analytics</p>
                  <p className="text-sm text-gray-600">View detailed metrics</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
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
              <Button size="sm" variant="outline">
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
          <div className="space-y-4">
            {recentSystemEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{event.id}</span>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={getSeverityBadgeClass(event.severity)}
                    >
                      {event.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{event.event}</p>
                  <p className="text-xs text-gray-500">
                    {event.user} • {event.timestamp}
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
