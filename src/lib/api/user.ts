import apiClient from "./client";
import type { User, MessageResponse } from "./types";

export const userService = {
  getAll: () =>
    apiClient.get<User[]>("/users").then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<User>(`/users/${id}`).then((r) => r.data),

  deleteById: (id: string) =>
    apiClient.delete<MessageResponse>(`/users/delete/id/${id}`).then((r) => r.data),

  deleteByEmail: (email: string) =>
    apiClient.delete<MessageResponse>(`/users/delete/email/${email}`).then((r) => r.data),

  deleteByIds: (ids: string[]) =>
    apiClient.delete<MessageResponse>("/users/delete/ids", { data: { ids } }).then((r) => r.data),

  deleteByEmails: (emails: string[]) =>
    apiClient.delete<MessageResponse>("/users/delete/emails", { data: { emails } }).then((r) => r.data),

  getByRole: (role: string, params?: { page?: number; limit?: number }) =>
    apiClient.get<User[]>(`/users/by-role/${role}`, { params }).then((r) => r.data),
};
