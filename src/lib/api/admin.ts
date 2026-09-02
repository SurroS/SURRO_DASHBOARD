import apiClient from "./client";
import type { User, KycDocument, PaginatedResponse, MessageResponse, SubscriptionPlan, SubscriptionPlanWithRegions } from "./types";

export const adminService = {
  getUsers: (params?: { page?: number; limit?: number; isApproved?: boolean; role?: string }) =>
    apiClient.get<PaginatedResponse<User>>("/admin/users", { params }).then((r) => r.data),

  getUser: (id: string) =>
    apiClient.get<User>(`/admin/users/${id}`).then((r) => r.data),

  approveUser: (id: string) =>
    apiClient.patch<MessageResponse>(`/admin/users/${id}/approve`).then((r) => r.data),

  rejectUser: (id: string) =>
    apiClient.patch<MessageResponse>(`/admin/users/${id}/reject`).then((r) => r.data),

  getKycDocuments: () =>
    apiClient.get<KycDocument[]>("/admin/kyc").then((r) => r.data),

  approveKyc: (id: string) =>
    apiClient.patch<MessageResponse>(`/admin/kyc/${id}/approve`).then((r) => r.data),

  rejectKyc: (id: string) =>
    apiClient.patch<MessageResponse>(`/admin/kyc/${id}/reject`).then((r) => r.data),

  getSubscriptionPlans: () =>
    apiClient.get<SubscriptionPlanWithRegions[]>("/admin/subscription-plans").then((r) => r.data),

  createSubscriptionPlan: (data: {
    name: string;
    description?: string;
    role?: string;
    interval: string;
    intervalCount?: number;
    isActive: boolean;
    productId: string;
    features?: { key: string; label: string; enabled: boolean }[];
    regions: { region: string; currency: string; price: number; symbol?: string }[];
  }) => apiClient.post<SubscriptionPlanWithRegions>("/admin/subscription-plans", data).then((r) => r.data),

  updateSubscriptionPlan: (id: string, data: { name?: string; description?: string; role?: string; interval?: string; intervalCount?: number; isActive?: boolean }) =>
    apiClient.patch<SubscriptionPlanWithRegions>(`/admin/subscription-plans/${id}`, data).then((r) => r.data),

  deleteSubscriptionPlan: (id: string) =>
    apiClient.delete<MessageResponse>(`/admin/subscription-plans/${id}`).then((r) => r.data),
};
