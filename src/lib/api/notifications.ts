import apiClient from "./client";
import type { MessageResponse } from "./types";

export interface Notification {
  id: string;
  title: string;
  body: string;
  userId: string;
  read: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface NotificationPreference {
  emailNotification: boolean;
  smsNotification: boolean;
  pushNotification: boolean;
}

export interface Reminder {
  emailReminder: boolean;
  smsReminder: boolean;
  pushReminder: boolean;
}

export const notificationService = {
  getAll: () =>
    apiClient.get<Notification[]>("/notifications").then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<Notification>(`/notifications/${id}`).then((r) => r.data),

  create: (data: { title: string; body: string; role?: string; delayMinute?: number; data?: Record<string, unknown> }) =>
    apiClient.post<Notification>("/notifications", data).then((r) => r.data),

  sendToUser: (userId: string, data: { title: string; body: string; role?: string; delayMinute?: number; data?: Record<string, unknown> }) =>
    apiClient.post<Notification>(`/notifications/${userId}`, data).then((r) => r.data),

  delete: (id: string) =>
    apiClient.delete<MessageResponse>(`/notifications/${id}`).then((r) => r.data),

  getPreferences: () =>
    apiClient.get<NotificationPreference>("/notifications/preferences/me").then((r) => r.data),

  updatePreferences: (data: { emailNotification?: boolean; smsNotification?: boolean; pushNotification?: boolean }) =>
    apiClient.patch<NotificationPreference>("/notifications/preferences/me", data).then((r) => r.data),

  getReminders: () =>
    apiClient.get<Reminder>("/notifications/reminders/me").then((r) => r.data),

  updateReminders: (data: { emailReminder?: boolean; smsReminder?: boolean; pushReminder?: boolean }) =>
    apiClient.patch<Reminder>("/notifications/reminders/me", data).then((r) => r.data),
};
