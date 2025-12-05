import type { User } from "@/types/user";
import { WalletTransaction } from "./walletService";
import { AuditEvent } from "./auditLog";

export function exportToCSV(
  data: Record<string, unknown>[],
  filename: string,
  columns?: string[]
): void {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = columns || Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle nested objects and arrays
          if (typeof value === "object" && value !== null) {
            return JSON.stringify(value).replace(/"/g, '""');
          }
          return String(value || "").replace(/"/g, '""');
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportUsersToCSV(
  users: User[],
  filename = "users_export.csv"
): void {
  const flattenedUsers = users.map((user) => ({
    ID: user.id,
    Name: user.name,
    Email: user.email,
    Phone: user.phone,
    Role: user.role,
    Status: user.status,
    "Verification Status": user.verificationStatus,
    "Date Joined": user.dateJoined,
    "Wallet Balance": user.walletBalance,
    "Total Documents": user.documents.length,
    "Compliance Flags": user.complianceFlags.length,
  }));

  exportToCSV(flattenedUsers, filename);
}

export function exportTransactionsToCSV(
  transactions: WalletTransaction[],
  filename = "transactions_export.csv"
): void {
  const flattenedTransactions = transactions.map((tx) => ({
    ID: tx.id,
    "User ID": tx.userId,
    Type: tx.type,
    Amount: tx.amount,
    Reason: tx.reason,
    Admin: tx.adminEmail,
    Date: tx.timestamp,
    "Balance After": tx.balanceAfter,
  }));

  exportToCSV(flattenedTransactions, filename);
}

export function exportAuditLogsToCSV(
  logs: AuditEvent[],
  filename = "audit_logs_export.csv"
): void {
  const flattenedLogs = logs.map((log) => ({
    ID: log.id,
    Action: log.action,
    "Admin Email": log.adminEmail,
    "User ID": log.userId,
    Date: log.timestamp,
    "IP Address": log.ipAddress || "N/A",
    "User Agent": log.userAgent || "N/A",
    Details: JSON.stringify(log.details),
  }));

  exportToCSV(flattenedLogs, filename);
}

export function exportToPDF(
  data: Record<string, unknown>[],
  title: string,
  columns: string[],
  filename = "export.pdf"
): void {
  // For a full PDF implementation, you would use a library like jsPDF or pdfkit
  // This is a placeholder that shows the structure

  console.warn("PDF export not yet implemented. Use CSV export instead.");
  alert("PDF export coming soon. Using CSV export instead.");

  const csvFilename = filename.replace(".pdf", ".csv");
  exportToCSV(data, csvFilename, columns);
}
