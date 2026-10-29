import apiClient from "./client";
import { normalizePaginatedResponse } from "./admin";
import type { PaginatedResponse } from "./types";

// Server contract: native tickets (ADMIN sees all; non-admins see their
// own). Ticket includes `replies: [{ id, message, authorId, createdAt,
// author: { id, email } }]`. List returns top-level pagination.

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface TicketReply {
  id: string;
  ticketId?: string;
  message: string;
  authorId: string;
  author?: { id: string; email: string | null } | null;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  userId: string;
  user?: { id: string; email: string | null } | null;
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
  replies?: TicketReply[];
}

export interface TicketStats {
  total: number;
  open: number;
  resolvedToday: number;
  avgResponseTime: number;
}

export const ticketService = {
  getTickets: (params?: {
    page?: number;
    limit?: number;
    status?: TicketStatus;
    priority?: TicketPriority;
  }) =>
    apiClient
      .get<PaginatedResponse<Ticket>>("/tickets", { params })
      .then((r) => normalizePaginatedResponse<Ticket>(r.data)),

  getTicketStats: () =>
    apiClient.get<TicketStats>("/tickets/stats").then((r) => r.data),

  getTicket: (id: string) =>
    apiClient.get<Ticket>(`/tickets/${id}`).then((r) => r.data),

  createTicket: (data: {
    subject: string;
    description: string;
    priority?: TicketPriority;
    userId?: string;
  }) => apiClient.post<Ticket>("/tickets", data).then((r) => r.data),

  updateTicket: (
    id: string,
    data: { status?: TicketStatus; priority?: TicketPriority; assignedTo?: string }
  ) => apiClient.patch<Ticket>(`/tickets/${id}`, data).then((r) => r.data),

  replyToTicket: (id: string, message: string) =>
    apiClient
      .post<TicketReply>(`/tickets/${id}/reply`, { message })
      .then((r) => r.data),
};
