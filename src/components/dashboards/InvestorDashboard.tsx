"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const roiData = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Apr", value: 0 },
  { month: "May", value: 0 },
  { month: "Jun", value: 0 },
];

const userGrowthData = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Apr", value: 0 },
  { month: "May", value: 0 },
  { month: "Jun", value: 0 },
];

const agentEngagementData = [
  { name: "Agent A: 30%", value: 30, color: "#8B5CF6" },
  { name: "Agent B: 30%", value: 30, color: "#06B6D4" },
  { name: "Agent C: 20%", value: 20, color: "#F59E0B" },
  { name: "Agent D: 20%", value: 20, color: "#EF4444" },
];

const revenueData = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Apr", value: 0 },
  { month: "May", value: 0 },
  { month: "Jun", value: 0 },
];

export default function InvestorDashboard() {
  return (
    <main className="p-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-3">
                Total Investment
              </span>
              <span className="text-5xl mb-1 font-bold text-blue-900">$0</span>
              <span className="text-xs text-gray-500">No investment data</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-3">
                Current ROI
              </span>
              <span className="text-5xl mb-1 font-bold text-blue-900">0%</span>
              <span className="text-xs text-gray-500">No investment data</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-3">
                Total users
              </span>
              <span className="text-5xl mb-1 font-bold text-blue-900">0</span>
              <span className="text-xs text-gray-500">No investment data</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-3">
                Monthly revenue
              </span>
              <span className="text-5xl mb-1 font-bold text-blue-900">$0</span>
              <span className="text-xs text-gray-500">No investment data</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Four Metrics - 2x2 Grid */}
        <div className="col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* ROI Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                ROI Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={roiData}
                  margin={{ top: 0, right: 10, left: -35, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={userGrowthData}
                  margin={{ top: 0, right: 10, left: -35, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue vs Monthly ROI */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Revenue vs Monthly ROI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={revenueData}
                  margin={{ top: 0, right: 10, left: -35, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F59E0B"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Agent Engagement Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Agent Engagement Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={agentEngagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {agentEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {agentEngagementData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Single Column - Two Rows */}
        <div className="col-span-5 grid grid-cols-1 grid-flow-row auto-rows-max gap-6">
          {/* Equity Time Remaining */}
          <div className="row-span-1">
            <h3 className="text-md font-bold text-gray-800 mb-2">
              Equity Time Remaining
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-2.5">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-gray-700 font-medium">Series A</span>
                    <span className="text-green-600 font-semibold">15%</span>
                  </div>
                  <div className="">
                    <div className="text-3xl font-bold text-blue-900 ">
                      0 months
                    </div>
                    <div className="text-sm text-gray-700">
                      No quantifiable data
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-2.5">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-gray-700 font-medium">Series B</span>
                    <span className="text-green-600 font-semibold">10%</span>
                  </div>
                  <div className="">
                    <div className="text-3xl font-bold text-blue-900 ">
                      0 months
                    </div>
                    <div className="text-sm text-gray-700">
                      No quantifiable data
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-2.5">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-gray-700 font-medium">
                      Angel Round
                    </span>
                    <span className="text-green-600 font-semibold">8%</span>
                  </div>
                  <div className="">
                    <div className="text-3xl font-bold text-blue-900 ">
                      0 months
                    </div>
                    <div className="text-sm text-gray-700">
                      No quantifiable data
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Investment Activity */}
          <Card className="p-0 min-h-[450px]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Recent investment activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sample Transaction Items */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Series A Investment
                    </div>
                    <div className="text-sm text-gray-500">2 hours ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">+$2.5M</div>
                  <div className="text-xs text-gray-500">15% equity</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Angel Round</div>
                    <div className="text-sm text-gray-500">1 day ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-600">+$500K</div>
                  <div className="text-xs text-gray-500">8% equity</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Series B Investment
                    </div>
                    <div className="text-sm text-gray-500">3 days ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-purple-600">+$5M</div>
                  <div className="text-xs text-gray-500">10% equity</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-orange-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Revenue Share
                    </div>
                    <div className="text-sm text-gray-500">1 week ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-orange-600">+$125K</div>
                  <div className="text-xs text-gray-500">Monthly</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-red-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Follow-on Investment
                    </div>
                    <div className="text-sm text-gray-500">2 weeks ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-red-600">+$1M</div>
                  <div className="text-xs text-gray-500">Additional 5%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
