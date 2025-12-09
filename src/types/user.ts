export type UserRole = "surrogate" | "parent" | "clinic" | "agent";

export type UserStatus = "active" | "suspended" | "inactive" | "pending";

export type VerificationStatus = "unverified" | "kyc_pending" | "verified";

export interface DocumentMetadata {
  id: string;
  userId: string;
  type: string;
  name: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected" | "needs_reupload";
  reviewNotes?: string;
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  action: string;
  ipAddress?: string;
  device?: string;
  details?: Record<string, unknown>;
}

export interface ComplianceFlag {
  id: string;
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
  flaggedDate: string;
  resolved: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  verificationStatus: VerificationStatus;
  dateJoined: string;
  walletBalance: number;
  documents: DocumentMetadata[];
  activityLog: ActivityLogEntry[];
  complianceFlags: ComplianceFlag[];
  linkedTickets: string[];
  suspensionReason?: string;
  suspensionDate?: string;
  suspensionDuration?: string;
  suspendedBy?: string;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  verificationStatus?: VerificationStatus;
  startDate?: string;
  endDate?: string;
}

