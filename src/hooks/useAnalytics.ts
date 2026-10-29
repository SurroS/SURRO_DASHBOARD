"use client";

import { useState, useEffect } from "react";
import {
  analyticsService,
  moderationService,
  ticketService,
  financeService,
  campaignService,
} from "@/lib/api";
import type {
  AnalyticsOverview,
  ActivityFeedItem,
  RevenueAnalytics,
  UserGrowthPoint,
  GeoDistributionPoint,
  ActiveUsersPoint,
} from "@/lib/api/analytics";
import type { Flag, Suspension } from "@/lib/api/moderation";
import type { Ticket, TicketStats } from "@/lib/api/tickets";
import type { LedgerTransaction } from "@/lib/api/finance";
import type {
  Campaign,
  CampaignStats,
  CampaignStatus,
} from "@/lib/api/campaigns";

function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "response" in err) {
    const message = (err as { response?: { data?: { message?: unknown } } })
      .response?.data?.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join(", ");
  }

  function normalizeOverview(
    overview: AnalyticsOverview & Partial<AnalyticsOverview>,
  ): AnalyticsOverview {
    return {
      ...overview,
      totalUsers: Number(overview.totalUsers) || 0,
      totalSurrogates: Number(overview.totalSurrogates) || 0,
      totalIntendedParents: Number(overview.totalIntendedParents) || 0,
      totalAgents: Number(overview.totalAgents) || 0,
      totalClinics: Number(overview.totalClinics) || 0,
      totalEmployees: Number(overview.totalEmployees) || 0,
      pendingApprovals: Number(overview.pendingApprovals) || 0,
      openTickets: Number(overview.openTickets) || 0,
      totalRevenue: Number(overview.totalRevenue) || 0,
      userGrowthPercent: Number(overview.userGrowthPercent) || 0,
      systemUptime: Number(overview.systemUptime) || 0,
    };
  }
  return fallback;
}

export function useAnalyticsOverview(period = "month") {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    analyticsService
      .getOverview({ period })
      .then((data) => {
        if (cancelled) return;
        setOverview(normalizeOverview(data));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load overview"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [period]);

  return { overview, loading, error };
}

export function useActivityFeed(limit = 10) {
  const [activities, setActivities] = useState<ActivityFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    analyticsService
      .getActivityFeed({ limit })
      .then((res) => {
        if (cancelled) return;
        setActivities(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load activity feed"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { activities, loading, error };
}

export function useAnalyticsDashboard() {
  const [data, setData] = useState<{
    overview: AnalyticsOverview;
    growth: UserGrowthPoint[];
    revenue: RevenueAnalytics;
    geo: GeoDistributionPoint[];
    activeUsers: ActiveUsersPoint[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      analyticsService.getOverview(),
      analyticsService.getUserGrowth({ groupBy: "month" }),
      analyticsService.getRevenue(),
      analyticsService.getGeoDistribution(),
      analyticsService.getActiveUsers(),
    ])
      .then(([overview, growth, revenue, geo, activeUsers]) => {
        if (cancelled) return;
        setData({
          overview: normalizeOverview(overview),
          growth: growth.data,
          revenue,
          geo: geo.data,
          activeUsers: activeUsers.data,
        });
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load analytics"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export interface ModerationStats {
  flags: { total: number; high: number; medium: number; low: number };
  suspensions: { active: number; pending: number; lifted: number };
}

export function useModerationStats() {
  const [stats, setStats] = useState<ModerationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      moderationService.getFlagStats(),
      moderationService.getSuspensionStats(),
    ])
      .then(([flags, suspensions]) => {
        if (cancelled) return;
        setStats({ flags, suspensions });
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load moderation stats"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}

export interface ModerationEvent {
  id: string;
  kind: "FLAG" | "SUSPENSION";
  userEmail: string;
  title: string;
  detail: string;
  date: string;
  severity: string;
  status: string;
}

export function useRecentModeration(limit = 6) {
  const [events, setEvents] = useState<ModerationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      moderationService.getFlags({ limit }),
      moderationService.getSuspensions({ limit }),
    ])
      .then(([flags, suspensions]) => {
        if (cancelled) return;
        const merged: ModerationEvent[] = [
          ...(flags.data as Flag[]).map((f) => ({
            id: f.id,
            kind: "FLAG" as const,
            userEmail: f.user?.email ?? f.userId,
            title: f.reason,
            detail: `Severity ${f.severity}`,
            date: f.createdAt,
            severity: f.severity,
            status: f.status,
          })),
          ...(suspensions.data as Suspension[]).map((s) => ({
            id: s.id,
            kind: "SUSPENSION" as const,
            userEmail: s.user?.email ?? s.userId,
            title: s.reason,
            detail:
              s.duration != null ? `Suspended ${s.duration} days` : "Suspended",
            date: s.suspendedAt,
            severity: s.status === "LIFTED" ? "LOW" : "HIGH",
            status: s.status,
          })),
        ];
        merged.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setEvents(merged.slice(0, limit));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load security activity"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { events, loading, error };
}

export function useTicketStats() {
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    ticketService
      .getTicketStats()
      .then((data) => {
        if (cancelled) return;
        setStats(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load ticket stats"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}

export function useRecentTickets(limit = 5) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    ticketService
      .getTickets({ limit })
      .then((res) => {
        if (cancelled) return;
        setTickets(res.data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load tickets"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { tickets, loading, error };
}

export function useRevenue() {
  const [revenue, setRevenue] = useState<RevenueAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    analyticsService
      .getRevenue()
      .then((data) => {
        if (cancelled) return;
        setRevenue(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load revenue"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { revenue, loading, error };
}

export function useRecentTransactions(limit = 5, status?: string) {
  const [transactions, setTransactions] = useState<LedgerTransaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    financeService
      .getTransactions({ limit, ...(status ? { status } : {}) })
      .then((res) => {
        if (cancelled) return;
        setTransactions(res.data);
        setTotal(res.meta?.total ?? res.data.length);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load transactions"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit, status]);

  return { transactions, total, loading, error };
}

export function useCampaignStats() {
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    campaignService
      .getCampaignStats()
      .then((data) => {
        if (cancelled) return;
        setStats(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load campaign stats"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}

export function useRecentCampaigns(limit = 5, status?: CampaignStatus) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    campaignService
      .getCampaigns({ limit, ...(status ? { status } : {}) })
      .then((res) => {
        if (cancelled) return;
        setCampaigns(res.data);
        setTotal(res.meta?.total ?? res.data.length);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(getErrorMessage(err, "Failed to load campaigns"));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit, status]);

  return { campaigns, total, loading, error };
}
