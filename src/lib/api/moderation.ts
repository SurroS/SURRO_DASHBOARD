import apiClient from "./client";
import { normalizePaginatedResponse } from "./admin";
import type { PaginatedResponse } from "./types";

// Server contract: Prisma Flag/Suspension with
// `user: { id, email, role }` included. List endpoints return top-level
// `{ data, total, page, limit, totalPages }` (normalized here to
// PaginatedResponse for a single client type).

export type FlagSeverity = "LOW" | "MEDIUM" | "HIGH";
export type FlagStatus =
  | "UNDER_INVESTIGATION"
  | "REVIEW_REQUIRED"
  | "RESOLVED";
export type SuspensionStatus = "ACTIVE" | "PENDING_REVIEW" | "LIFTED";

export interface FlagUser {
  id: string;
  email: string | null;
  role: string;
}

export interface Flag {
  id: string;
  userId: string;
  user?: FlagUser | null;
  reason: string;
  severity: FlagSeverity;
  status: FlagStatus;
  createdAt: string;
  resolvedAt?: string | null;
  resolution?: string | null;
  escalateReason?: string | null;
}

export interface Suspension {
  id: string;
  userId: string;
  user?: FlagUser | null;
  reason: string;
  duration?: number | null;
  status: SuspensionStatus;
  suspendedAt: string;
  liftedAt?: string | null;
}

export interface FlagStats {
  total: number;
  high: number;
  medium: number;
  low: number;
}

export interface SuspensionStats {
  active: number;
  pending: number;
  lifted: number;
}

export const moderationService = {
  // Flags
  getFlags: (params?: {
    page?: number;
    limit?: number;
    severity?: FlagSeverity;
    status?: FlagStatus;
  }) =>
    apiClient
      .get<PaginatedResponse<Flag>>("/admin/flags", { params })
      .then((r) => normalizePaginatedResponse<Flag>(r.data)),

  getFlagStats: () =>
    apiClient.get<FlagStats>("/admin/flags/stats").then((r) => r.data),

  createFlag: (data: {
    userId: string;
    reason: string;
    severity?: FlagSeverity;
  }) => apiClient.post<Flag>("/admin/flags", data).then((r) => r.data),

  resolveFlag: (id: string, resolution: string) =>
    apiClient
      .patch<Flag>(`/admin/flags/${id}/resolve`, { resolution })
      .then((r) => r.data),

  escalateFlag: (id: string, reason: string) =>
    apiClient
      .patch<Flag>(`/admin/flags/${id}/escalate`, { reason })
      .then((r) => r.data),

  // Suspensions
  getSuspensions: (params?: {
    page?: number;
    limit?: number;
    status?: SuspensionStatus;
  }) =>
    apiClient
      .get<PaginatedResponse<Suspension>>("/admin/suspensions", { params })
      .then((r) => normalizePaginatedResponse<Suspension>(r.data)),

  getSuspensionStats: () =>
    apiClient
      .get<SuspensionStats>("/admin/suspensions/stats")
      .then((r) => r.data),

  createSuspension: (data: {
    userId: string;
    reason: string;
    duration?: number;
  }) =>
    apiClient.post<Suspension>("/admin/suspensions", data).then((r) => r.data),

  liftSuspension: (id: string) =>
    apiClient
      .patch<Suspension>(`/admin/suspensions/${id}/lift`)
      .then((r) => r.data),
};
