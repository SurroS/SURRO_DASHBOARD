import apiClient from "./client";
import { normalizePaginatedResponse } from "./admin";
import type { PaginatedResponse } from "./types";

// Server contract: Prisma Campaign
// `{ id, name, type, content, targetRole, status, messagesSent,
//    responseRate, leadsGenerated, createdAt, updatedAt }`.
// Delivery states are DRAFT/SCHEDULED/RUNNING/PAUSED/COMPLETED.

export type CampaignStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "RUNNING"
  | "PAUSED"
  | "COMPLETED";

export interface Campaign {
  id: string;
  name: string;
  type: string;
  content: string;
  targetRole?: string | null;
  status: CampaignStatus;
  messagesSent: number;
  responseRate: number;
  leadsGenerated: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignStats {
  total: number;
  messagesSent: number;
  responseRate: number;
  leadsGenerated: number;
}

export const campaignService = {
  getCampaigns: (params?: {
    page?: number;
    limit?: number;
    status?: CampaignStatus;
  }) =>
    apiClient
      .get<PaginatedResponse<Campaign>>("/admin/campaigns", { params })
      .then((r) => normalizePaginatedResponse<Campaign>(r.data)),

  getCampaignStats: () =>
    apiClient.get<CampaignStats>("/admin/campaigns/stats").then((r) => r.data),

  getCampaign: (id: string) =>
    apiClient.get<Campaign>(`/admin/campaigns/${id}`).then((r) => r.data),
};
