"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  UserCheck,
} from "lucide-react";

const supportStats = {
  totalTickets: 156,
  openTickets: 23,
  resolvedToday: 12,
  avgResponseTime: "2.5 hours",
  pendingApprovals: 8,
  flaggedAccounts: 3,
};

const recentTickets = [
  {
    id: "#TKT001",
    subject: "Account Verification Issue",
    user: "john.smith@email.com",
    priority: "High",
    status: "Open",
    created: "2 hours ago",
  },
  {
    id: "#TKT002",
    subject: "Payment Processing Error",
    user: "sarah.j@email.com",
    priority: "Medium",
    status: "In Progress",
    created: "4 hours ago",
  },
  {
    id: "#TKT003",
    subject: "Profile Update Request",
    user: "mike.w@email.com",
    priority: "Low",
    status: "Resolved",
    created: "6 hours ago",
  },
];

const getPriorityBadgeClass = (priority: string) => {
  switch (priority.toLowerCase()) {
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

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "in progress":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "resolved":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function SupportDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Support Dashboard</h1>
        <p className="text-gray-600">
          Manage support tickets and user approvals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supportStats.totalTickets}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supportStats.openTickets}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resolved Today
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supportStats.resolvedToday}
            </div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supportStats.avgResponseTime}
            </div>
            <p className="text-xs text-muted-foreground">
              -0.5h from last week
            </p>
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
                <UserCheck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Pending Approvals</p>
                  <p className="text-sm text-gray-600">
                    {supportStats.pendingApprovals} accounts
                  </p>
                </div>
              </div>
              <Button size="sm">Review</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Flagged Accounts</p>
                  <p className="text-sm text-gray-600">
                    {supportStats.flaggedAccounts} accounts
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Investigate
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      <Badge
                        variant="secondary"
                        className={getPriorityBadgeClass(ticket.priority)}
                      >
                        {ticket.priority}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={getStatusBadgeClass(ticket.status)}
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{ticket.subject}</p>
                    <p className="text-xs text-gray-500">
                      {ticket.user} • {ticket.created}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
