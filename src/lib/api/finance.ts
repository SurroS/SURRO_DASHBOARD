import apiClient from "./client";
import { normalizePaginatedResponse } from "./admin";
import type { PaginatedResponse } from "./types";

// Server contract: Prisma Transaction with
// `user: { id, email, role }` included. Ledger transactions are not
// subscription invoices — display amount/currency/status/type/reference
// only; due-date/plan/invoice details do not exist on this model.

export type TransactionStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "CANCELLED"
  | string;
export type TransactionType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "PAYMENT"
  | "REFUND"
  | string;

export interface LedgerTransaction {
  id: string;
  type: TransactionType;
  gateway: string;
  channel: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  reference?: string | null;
  createdAt: string;
  verified: boolean;
  walletId: string;
  user?: { id: string; email: string | null; role: string } | null;
}

export const financeService = {
  getTransactions: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  }) =>
    apiClient
      .get<PaginatedResponse<LedgerTransaction>>("/admin/transactions", {
        params,
      })
      .then((r) => normalizePaginatedResponse<LedgerTransaction>(r.data)),

  getTransaction: (id: string) =>
    apiClient
      .get<LedgerTransaction>(`/admin/transactions/${id}`)
      .then((r) => r.data),
};
