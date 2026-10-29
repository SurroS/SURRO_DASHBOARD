"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import { useAnalyticsDashboard } from "@/hooks/useAnalytics";
import type { ReactNode } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AnalyticsPage() {
  const { data, loading, error } = useAnalyticsDashboard();

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto space-y-6 py-6">
          <div>
            <h1 className="text-2xl font-semibold">Analytics</h1>
            <p className="text-sm text-gray-500">
              Live platform metrics from the server
            </p>
          </div>

          {loading && (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Loading analytics...
              </span>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          {data && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Metric label="Total users" value={data.overview.totalUsers} />
                <Metric label="Surrogates" value={data.overview.totalSurrogates} />
                <Metric
                  label="Intended parents"
                  value={data.overview.totalIntendedParents}
                />
                <Metric
                  label="User growth"
                  value={`${data.overview.userGrowthPercent}%`}
                />
                <Metric label="Agents" value={data.overview.totalAgents} />
                <Metric label="Clinics" value={data.overview.totalClinics} />
                <Metric
                  label="Open tickets"
                  value={data.overview.openTickets}
                />
                <Metric
                  label="Revenue"
                  value={data.overview.totalRevenue.toLocaleString()}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ChartCard title="User growth">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data.growth}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Daily active users">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data.activeUsers}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Users by location">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data.geo}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Revenue by month">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data.revenue.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">User distribution</h2>
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Surrogates", value: data.overview.totalSurrogates },
                          {
                            name: "Intended parents",
                            value: data.overview.totalIntendedParents,
                          },
                          { name: "Agents", value: data.overview.totalAgents },
                          { name: "Clinics", value: data.overview.totalClinics },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label
                      >
                        {COLORS.slice(0, 4).map((color) => (
                          <Cell key={color} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-full space-y-2 text-sm">
                    {data.revenue.transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex justify-between border-b py-2"
                      >
                        <span>{transaction.createdAt.slice(0, 10)}</span>
                        <span className="font-medium">
                          {transaction.currency}{" "}
                          {transaction.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {data.revenue.transactions.length === 0 && (
                      <p className="text-gray-500">No recent transactions.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
