"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, UserX, AlertTriangle, UserCheck } from "lucide-react";

const operationsStats = {
  totalUsers: 1250,
  activeUsers: 1180,
  suspendedUsers: 15,
  flaggedAccounts: 8,
  totalEmployees: 45,
  activeEmployees: 42,
  suspiciousEmployees: 2,
  systemHealth: "Good",
};

const recentActivities = [
  {
    id: "#ACT001",
    user: "john.smith@email.com",
    action: "Account Suspended",
    reason: "Terms Violation",
    timestamp: "2 hours ago",
    status: "Completed",
  },
  {
    id: "#ACT002",
    user: "sarah.j@email.com",
    action: "Flagged Account",
    reason: "Suspicious Activity",
    timestamp: "4 hours ago",
    status: "Under Review",
  },
  {
    id: "#ACT003",
    user: "mike.w@email.com",
    action: "Employee Flagged",
    reason: "Unusual Access Pattern",
    timestamp: "6 hours ago",
    status: "Investigation",
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "under review":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "investigation":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function OperationsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Operations Dashboard</h1>
        <p className="text-gray-600">
          Monitor system operations, user management, and security
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
              {operationsStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+25 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationsStats.activeUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              94.4% of total users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Suspended Users
            </CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationsStats.suspendedUsers}
            </div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {operationsStats.systemHealth}
            </div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Employee Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Total Employees</p>
                  <p className="text-sm text-gray-600">
                    {operationsStats.totalEmployees} employees
                  </p>
                </div>
              </div>
              <Button size="sm">Manage</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Suspicious Activity</p>
                  <p className="text-sm text-gray-600">
                    {operationsStats.suspiciousEmployees} employees flagged
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Flagged Accounts</p>
                  <p className="text-sm text-gray-600">
                    {operationsStats.flaggedAccounts} accounts
                  </p>
                </div>
              </div>
              <Button size="sm">Investigate</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserX className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Suspended Users</p>
                  <p className="text-sm text-gray-600">
                    {operationsStats.suspendedUsers} users
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Activities</CardTitle>
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
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeClass(activity.status)}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-500">
                    {activity.action} • {activity.reason} • {activity.timestamp}
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
