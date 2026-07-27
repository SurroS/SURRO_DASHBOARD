import apiClient from "./client";
import type { User, KycDocument, PaginatedResponse, MessageResponse, SubscriptionPlan } from "./types";

export const adminService = {
  getUsers: (params?: { page?: number; limit?: number }) =>
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

  createSubscriptionPlan: (data: {
    name: string;
    interval: string;
    isActive: boolean;
    productId?: string;
    regions: { region: string; currency: string; price: number }[];
  }) => apiClient.post<SubscriptionPlan>("/admin/subscription-plans", data).then((r) => r.data),

  updateSubscriptionPlan: (id: string, data: { name?: string; interval?: string; isActive?: boolean }) =>
    apiClient.patch<SubscriptionPlan>(`/admin/subscription-plans/${id}`, data).then((r) => r.data),

  deleteSubscriptionPlan: (id: string) =>
    apiClient.delete<MessageResponse>(`/admin/subscription-plans/${id}`).then((r) => r.data),
};
