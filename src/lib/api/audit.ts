import apiClient from "./client";
import type { AdminUsersResponse } from "./types";

// Server contract: Prisma AuditLog rendered by AuditLogsService.
// `{ id, action, userId, adminId, adminEmail, details, ipAddress,
//    userAgent, timestamp }`. GET returns top-level pagination
// `{ data, total, page, limit, totalPages }` (same envelope as users).

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  adminId: string;
  adminEmail: string;
  details?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  timestamp: string;
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;
  action?: string;
  userId?: string;
  adminId?: string;
  startDate?: string;
  endDate?: string;
}

export interface AuditLogStats {
  total: number;
  today: number;
  byAction: Record<string, number>;
}

function normalizeAuditResponse(
  raw: AdminUsersResponse<AuditLog> | { data: AuditLog[]; meta: { total: number; page: number; limit: number; totalPages: number } }
): { data: AuditLog[]; total: number; page: number; limit: number; totalPages: number } {
  if (raw && typeof raw === "object" && "meta" in raw && raw.meta) {
    const m = (raw as { meta: { total: number; page: number; limit: number; totalPages: number } }).meta;
    return {
      data: (raw as { data: AuditLog[] }).data ?? [],
      total: m.total,
      page: m.page,
      limit: m.limit,
      totalPages: m.totalPages,
    };
  }
  const wire = raw as AdminUsersResponse<AuditLog>;
  const data = Array.isArray(wire.data) ? wire.data : [];
  const total = typeof wire.total === "number" ? wire.total : data.length;
  const page = typeof wire.page === "number" ? wire.page : 1;
  const limit = typeof wire.limit === "number" ? wire.limit : data.length || 20;
  const totalPages =
    typeof wire.totalPages === "number"
      ? wire.totalPages
      : Math.max(1, Math.ceil(total / Math.max(1, limit)));
  return { data, total, page, limit, totalPages };
}

export const auditService = {
  getAuditLogs: (params?: AuditLogFilters) =>
    apiClient
      .get<AdminUsersResponse<AuditLog>>("/admin/audit-logs", { params })
      .then((r) => normalizeAuditResponse(r.data)),

  getAuditStats: () =>
    apiClient.get<AuditLogStats>("/admin/audit-logs/stats").then((r) => r.data),

  createAuditLog: (data: {
    action: string;
    userId: string;
    adminId: string;
    adminEmail?: string;
    details?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
  }) => apiClient.post<AuditLog>("/admin/audit-logs", data).then((r) => r.data),
};
