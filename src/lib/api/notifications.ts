import apiClient from "./client";
import type { MessageResponse } from "./types";

// Server contract (Prisma Notification as returned by
// GET /notifications): `{ id, title, message, isRead, userId, ... }`.
// The legacy client shape used `body`/`read` — those are kept as optional
// deprecated aliases and normalized at the boundary, never invented.

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  userId: string;
  type?: string;
  data?: Record<string, unknown>;
  createdAt: string;
  /** @deprecated — server field is `message` */
  body?: string;
  /** @deprecated — server field is `isRead` */
  read?: boolean;
}

/** Bulk broadcast result: POST /notifications with `role` returns `{ created }`. */
export interface BulkNotificationResult {
  created: number;
}

export type CreateNotificationResult = Notification | BulkNotificationResult;

export function isBulkResult(
  result: CreateNotificationResult
): result is BulkNotificationResult {
  return (
    typeof result === "object" &&
    result !== null &&
    "created" in result &&
    !("id" in result)
  );
}

/** Read a notification body regardless of legacy/new shape. */
export function getNotificationMessage(n: Notification): string {
  if (typeof n.message === "string" && n.message) return n.message;
  if (typeof n.body === "string") return n.body;
  return "";
}

/** Read flag regardless of legacy/new shape. */
export function isNotificationRead(n: Notification): boolean {
  if (typeof n.isRead === "boolean") return n.isRead;
  if (typeof n.read === "boolean") return n.read;
  return false;
}

export interface NotificationPreference {
  emailNotification: boolean;
  smsNotification: boolean;
  pushNotification: boolean;
}

export interface Reminder {
  id?: string;
  emailReminder: boolean;
  smsReminder: boolean;
  pushReminder: boolean;
}

export const notificationService = {
  getAll: () =>
    apiClient.get<Notification[]>("/notifications").then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<Notification>(`/notifications/${id}`).then((r) => r.data),

  /**
   * Personal send (no `role`) returns the created Notification.
   * Broadcast (`role: "ALL" | UserRole`) returns `{ created: number }`.
   * Always send explicit `role` for broadcasts — omitting it creates a
   * personal notification for the current admin instead.
   */
  create: (data: { title: string; body: string; role?: string; delayMinute?: number; data?: Record<string, unknown> }) =>
    apiClient.post<CreateNotificationResult>("/notifications", data).then((r) => r.data),

  sendToUser: (userId: string, data: { title: string; body: string; role?: string; delayMinute?: number; data?: Record<string, unknown> }) =>
    apiClient.post<Notification>(`/notifications/${userId}`, data).then((r) => r.data),

  delete: (id: string) =>
    apiClient.delete<MessageResponse>(`/notifications/${id}`).then((r) => r.data),

  getPreferences: () =>
    apiClient.get<NotificationPreference>("/notifications/preferences/me").then((r) => r.data),

  updatePreferences: (data: { emailNotification?: boolean; smsNotification?: boolean; pushNotification?: boolean }) =>
    apiClient.patch<NotificationPreference>("/notifications/preferences/me", data).then((r) => r.data),

  // Server GET returns an array; PATCH returns the single updated object.
  getReminders: () =>
    apiClient.get<Reminder[]>("/notifications/reminders/me").then((r) => r.data),

  updateReminders: (data: { emailReminder?: boolean; smsReminder?: boolean; pushReminder?: boolean }) =>
    apiClient.patch<Reminder>("/notifications/reminders/me", data).then((r) => r.data),
};
