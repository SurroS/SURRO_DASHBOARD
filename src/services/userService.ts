import { apiClient, ApiError } from "@/lib/apiClient";
import type {
  ActivityLogEntry,
  ComplianceFlag,
  DocumentMetadata,
  User,
  UserRole,
  UserStatus,
  VerificationStatus,
} from "@/types/user";

export interface AdminUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  verificationStatus?: VerificationStatus;
  dateJoined?: string;
  walletBalance?: number;
  documents?: DocumentMetadata[];
  activityLog?: ActivityLogEntry[];
  complianceFlags?: ComplianceFlag[];
  linkedTickets?: string[];
  suspensionReason?: string;
  suspensionDate?: string;
  suspensionDuration?: string;
  suspendedBy?: string;
  [key: string]: unknown;
}

export interface ListUsersParams {
  page?: number;
  perPage?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface ListUsersResponse {
  data: AdminUser[];
  meta?: {
    total?: number;
    page?: number;
    perPage?: number;
    totalPages?: number;
  };
}

function ensureAdminUser(payload: unknown): AdminUser {
  if (
    typeof payload !== "object" ||
    payload === null ||
    typeof (payload as Record<string, unknown>).id !== "string"
  ) {
    throw new ApiError("Invalid user payload received from API", 500, payload);
  }

  const record = payload as Record<string, unknown>;

  // Map backend roles to frontend format
  const mapRole = (backendRole: unknown): UserRole | undefined => {
    if (typeof backendRole !== "string") return undefined;
    const roleMap: Record<string, UserRole> = {
      SURROGATE: "surrogate",
      INTENDED_PARENT: "parent",
      ADMIN: "agent", // Map ADMIN to agent role for now
      AGENT: "agent",
    };
    const mapped =
      roleMap[backendRole] || (backendRole.toLowerCase() as UserRole);
    return mapped;
  };

  return {
    id: String(record.id),
    name: record.name ? String(record.name) : undefined,
    email: record.email ? String(record.email) : undefined,
    phone: record.phone ? String(record.phone) : undefined,
    role: mapRole(record.role),
    status: record.status as UserStatus | undefined,
    verificationStatus: record.verificationStatus as
      | VerificationStatus
      | undefined,
    dateJoined: record.dateJoined ? String(record.dateJoined) : undefined,
    walletBalance:
      typeof record.walletBalance === "number"
        ? record.walletBalance
        : record.walletBalance
        ? Number(record.walletBalance)
        : undefined,
    documents: Array.isArray(record.documents)
      ? (record.documents as DocumentMetadata[])
      : undefined,
    activityLog: Array.isArray(record.activityLog)
      ? (record.activityLog as ActivityLogEntry[])
      : undefined,
    complianceFlags: Array.isArray(record.complianceFlags)
      ? (record.complianceFlags as ComplianceFlag[])
      : undefined,
    linkedTickets: Array.isArray(record.linkedTickets)
      ? (record.linkedTickets as string[])
      : undefined,
    suspensionReason: record.suspensionReason
      ? String(record.suspensionReason)
      : undefined,
    suspensionDate: record.suspensionDate
      ? String(record.suspensionDate)
      : undefined,
    suspensionDuration: record.suspensionDuration
      ? String(record.suspensionDuration)
      : undefined,
    suspendedBy: record.suspendedBy ? String(record.suspendedBy) : undefined,
  };
}

export function mapAdminUserToLocalUser(apiUser: AdminUser): User {
  return {
    id: apiUser.id,
    name: apiUser.name ?? "Unknown User",
    email: apiUser.email ?? "",
    phone: apiUser.phone ?? "",
    role: apiUser.role ?? "surrogate",
    status: apiUser.status ?? "active",
    verificationStatus: apiUser.verificationStatus ?? "unverified",
    dateJoined:
      apiUser.dateJoined ??
      new Date().toISOString().slice(0, 10 /* yyyy-mm-dd */),
    walletBalance:
      typeof apiUser.walletBalance === "number" ? apiUser.walletBalance : 0,
    documents: apiUser.documents ?? [],
    activityLog: apiUser.activityLog ?? [],
    complianceFlags: apiUser.complianceFlags ?? [],
    linkedTickets: apiUser.linkedTickets ?? [],
    suspensionReason: apiUser.suspensionReason,
    suspensionDate: apiUser.suspensionDate,
    suspensionDuration: apiUser.suspensionDuration,
    suspendedBy: apiUser.suspendedBy,
  };
}

export async function listUsers(
  params: ListUsersParams = {}
): Promise<ListUsersResponse> {
  const response = await apiClient.get<AdminUser[]>("/v1/admin/users", {
    query: {
      page: params.page,
      perPage: params.perPage,
      search: params.search,
      role: params.role,
      status: params.status,
    },
  });

  // Backend returns array directly, not wrapped in { data: [...] }
  const data = Array.isArray(response) ? response.map(ensureAdminUser) : [];

  return {
    data,
    meta: undefined, // Backend doesn't return pagination meta
  };
}
