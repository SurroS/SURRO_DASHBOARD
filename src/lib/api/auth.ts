import apiClient from "./client";
import type { AuthResponse, MessageResponse } from "./types";

export const authService = {
  register: (data: { email: string; password: string; role: string; referralCode?: string }) =>
    apiClient.post<MessageResponse>("/auth/register", data).then((r) => r.data),

  verifyOtp: (data: { email: string; code: string }) =>
    apiClient.post<MessageResponse>("/auth/verify-otp", data).then((r) => r.data),

  login: (data: { email: string; password: string }) =>
    apiClient.post<AuthResponse>("/auth/login", data).then((r) => r.data),

  resendOtp: (data: { email: string }) =>
    apiClient.post<MessageResponse>("/auth/resend-otp", data).then((r) => r.data),

  forgotPassword: (data: { email: string }) =>
    apiClient.post<MessageResponse>("/auth/forgot-password", data).then((r) => r.data),

  resetPassword: (data: { email: string; otp: string; newPassword: string }) =>
    apiClient.post<MessageResponse>("/auth/reset-password", data).then((r) => r.data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post<MessageResponse>("/auth/change-password", data).then((r) => r.data),

  adminRegister: (data: { email: string; password: string; inviteCode: string }) =>
    apiClient.post<AuthResponse>("/auth/admin/register", data).then((r) => r.data),

  adminLogin: (data: { email: string; password: string }) =>
    apiClient.post<AuthResponse>("/auth/admin/login", data).then((r) => r.data),
};
