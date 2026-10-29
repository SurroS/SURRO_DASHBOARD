import apiClient from "./client";

// Server contract: GET /admin/analytics/* (ADMIN only).
// Shapes below mirror AnalyticsService return values exactly — adapt
// deliberately at the call site instead of casting mismatches away.

export interface AnalyticsOverview {
  totalUsers: number;
  totalSurrogates: number;
  totalIntendedParents: number;
  totalAgents: number;
  totalClinics: number;
  totalEmployees: number;
  pendingApprovals: number;
  openTickets: number;
  totalRevenue: number;
  userGrowthPercent: number;
  systemHealth: "Excellent" | "Good" | "Degraded" | string;
  systemUptime: number;
}

export interface UserGrowthPoint {
  date: string;
  count: number;
  role?: string;
  [key: string]: unknown;
}

export interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
}

export interface RecentRevenueTransaction {
  id: string;
  amount: number;
  currency: string;
  createdAt: string;
  wallet: { userId: string };
}

export interface RevenueAnalytics {
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenuePoint[];
  avgTransaction: number;
  transactions: RecentRevenueTransaction[];
}

export interface GeoDistributionPoint {
  region: string;
  count: number;
  percentage: number;
  [key: string]: unknown;
}

export interface ActiveUsersPoint {
  date: string;
  count: number;
  [key: string]: unknown;
}

export interface ActivityFeedItem {
  id: string;
  type: "USER_REGISTERED" | "PAYMENT" | "KYC" | "SUBSCRIPTION" | string;
  user: string;
  action: string;
  timestamp: string;
  status: string;
}

export const analyticsService = {
  getOverview: (params?: { period?: string }) =>
    apiClient
      .get<AnalyticsOverview>("/admin/analytics/overview", { params })
      .then((r) => r.data),

  getUserGrowth: (params?: {
    startDate?: string;
    endDate?: string;
    groupBy?: "day" | "week" | "month";
  }) =>
    apiClient
      .get<{ data: UserGrowthPoint[] }>("/admin/analytics/users", { params })
      .then((r) => r.data),

  getRevenue: (params?: { startDate?: string; endDate?: string }) =>
    apiClient
      .get<RevenueAnalytics>("/admin/analytics/revenue", { params })
      .then((r) => r.data),

  getGeoDistribution: (params?: { groupBy?: string }) =>
    apiClient
      .get<{ data: GeoDistributionPoint[] }>("/admin/analytics/geo", {
        params,
      })
      .then((r) => r.data),

  getActiveUsers: (params?: { startDate?: string; endDate?: string }) =>
    apiClient
      .get<{ data: ActiveUsersPoint[] }>("/admin/analytics/active-users", {
        params,
      })
      .then((r) => r.data),

  getActivityFeed: (params?: { limit?: number }) =>
    apiClient
      .get<{ data: ActivityFeedItem[] }>("/admin/analytics/activity-feed", {
        params,
      })
      .then((r) => r.data),
};
