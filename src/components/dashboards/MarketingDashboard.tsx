"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Target, Send, Mail, Phone } from "lucide-react";

const marketingStats = {
  totalCampaigns: 12,
  activeCampaigns: 5,
  messagesSent: 1250,
  responseRate: 15.2,
  leadsGenerated: 45,
  conversionRate: 8.5,
};

const recentCampaigns = [
  {
    id: "#CAMP001",
    name: "Q1 Surrogate Recruitment",
    type: "Email",
    status: "Active",
    sent: 500,
    responses: 75,
    created: "2024-01-10",
  },
  {
    id: "#CAMP002",
    name: "Parent Onboarding Series",
    type: "SMS",
    status: "Completed",
    sent: 300,
    responses: 45,
    created: "2024-01-05",
  },
  {
    id: "#CAMP003",
    name: "Clinic Partnership Outreach",
    type: "Email",
    status: "Draft",
    sent: 0,
    responses: 0,
    created: "2024-01-15",
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function MarketingDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Marketing Dashboard</h1>
        <p className="text-gray-600">
          Manage marketing campaigns and messaging
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketingStats.totalCampaigns}
            </div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketingStats.messagesSent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketingStats.responseRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leads Generated
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketingStats.leadsGenerated}
            </div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
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
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Create Email Campaign</p>
                  <p className="text-sm text-gray-600">Send targeted emails</p>
                </div>
              </div>
              <Button size="sm">Create</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Send SMS Campaign</p>
                  <p className="text-sm text-gray-600">Reach users via SMS</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Create
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Conversion Rate</span>
                <span className="text-lg font-bold">
                  {marketingStats.conversionRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Campaigns</span>
                <span className="text-lg font-bold">
                  {marketingStats.activeCampaigns}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Reach</span>
                <span className="text-lg font-bold">2,500+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{campaign.id}</span>
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeClass(campaign.status)}
                    >
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {campaign.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{campaign.name}</p>
                  <p className="text-xs text-gray-500">
                    Sent: {campaign.sent} • Responses: {campaign.responses} •{" "}
                    {campaign.created}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
