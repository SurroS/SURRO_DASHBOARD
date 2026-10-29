export enum UserRole {
  SURROGATE = "SURROGATE",
  INTENDED_PARENT = "INTENDED_PARENT",
  AGENT = "AGENT",
  ADMIN = "ADMIN",
  CLINIC = "CLINIC",
}

// Admin dashboard sub-roles (8 roles used by RBAC).
// Server returns platform `role: "ADMIN"` plus `adminRole: "super_admin"` etc.
// Null for non-admin users. Values are lowercase to match the API contract.
export type AdminRole =
  | "super_admin"
  | "general_admin"
  | "compliance_admin"
  | "support_admin"
  | "finance_admin"
  | "security_admin"
  | "investor_admin"
  | "marketing_admin";

export interface User {
  id: string;
  email: string | null;
  role: UserRole;
  adminRole?: AdminRole | null;
  name?: string | null;
  phone?: string | null;
  address?: string | null;
  isVerified: boolean;
  isApproved: boolean;
  isOnline?: boolean;
  lastSeen?: string | null;
  profilePictureUrl?: string | null;
  kycStatus: KycStatus;
  referralCode: string;
  createdAt: string;
  updatedAt: string;
  surrogateProfile?: SurrogateProfile | null;
  intendedParentProfile?: IntendedParentProfile | null;
  agentProfile?: AgentProfile | null;
  kycDocuments?: KycDocument[];
  wallet?: Wallet | null;
}

export type KycStatus = "NOT_STARTED" | "PENDING" | "APPROVED" | "REJECTED";

export interface SurrogateProfile {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  userName?: string | null;
  countryOfOrigin?: string | null;
  aboutMe?: string | null;
  dateOfBirth?: string | null;
  maritalStatus?: string | null;
  height?: string | null;
  weight?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  isAvailable: boolean;
  hasVerificationBadge: boolean;
  compensationAmount?: number | null;
  experienceLevel?: string | null;
  medical?: Medical | null;
}

export interface Medical {
  genotype?: string | null;
  bloodGroup?: string | null;
  pregnant?: boolean | null;
  children?: number | null;
  caesarean?: boolean | null;
  numberOfCs?: number | null;
  hasAllergies?: boolean | null;
  allergies?: string | null;
  hasChronicIllness?: boolean | null;
  chronicIllnesses?: string[];
  takesMedication?: boolean | null;
  medications?: string | null;
  hadSurgery?: boolean | null;
  surgeries?: string | null;
  hasDisability?: boolean | null;
  disabilities?: string | null;
  hadMiscarriage?: boolean | null;
  numberOfMiscarriages?: number | null;
  medicalReport?: string | null;
  endometriumUploadUrl?: string | null;
}

export interface IntendedParentProfile {
  id: string;
  fullName?: string | null;
  userName?: string | null;
  profilePicture?: string | null;
  countryOfResidence?: string | null;
  yearsOfTrying?: string | null;
  about?: string | null;
  languagesSpoken?: string[];
}

export interface AgentProfile {
  id: string;
  userName?: string | null;
  fullName?: string | null;
  dateOfBirth?: string | null;
  location?: string | null;
  specialization?: string | null;
  country?: string | null;
  profilePicture?: string | null;
  about?: string | null;
  isAvailable: boolean;
  contactLocked: boolean;
  compensation?: number | null;
  negotiable?: boolean | null;
  phone1?: string | null;
  phone2?: string | null;
  emergencyPhone?: string | null;
  publicEmail?: string | null;
  state?: string | null;
  city?: string | null;
  address?: string | null;
  languages: string[];
  services: string[];
  certifications?: Record<string, unknown> | null;
  performance?: Record<string, unknown> | null;
}

export interface KycDocument {
  id: string;
  fullName: string;
  idNumber: string;
  country: string;
  url: string;
  type: string;
  userId: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  interval: string;
  isActive: boolean;
  productId?: string | null;
  regions: PlanRegion[];
}

export interface PlanRegion {
  id: string;
  region: string;
  currency: string;
  price: number;
  symbol?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Server GET /admin/users returns top-level totals, not `meta`:
// `{ data, users?, total, page, limit, totalPages }`.
// This type models the wire shape; use `normalizePaginatedResponse` to
// convert either shape into `PaginatedResponse<T>`.
export interface AdminUsersResponse<T> {
  data: T[];
  users?: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Distinct admin identity: platform user + validated dashboard sub-role.
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: string[];
}

export interface SubscriptionPlanWithRegions extends SubscriptionPlan {
  description?: string | null;
  role?: string | null;
  intervalCount?: number | null;
  features?: PlanFeature[];
  regions: PlanRegion[];
}

export interface PlanFeature {
  // F08/F14: the server returns JSON features `{key,label,enabled}` with no
  // guaranteed `id` — key on `key`, fall back to `id` only when present.
  id?: string;
  key: string;
  label: string;
  enabled: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
