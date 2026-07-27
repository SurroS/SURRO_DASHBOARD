export enum UserRole {
  SURROGATE = "SURROGATE",
  INTENDED_PARENT = "INTENDED_PARENT",
  AGENT = "AGENT",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email: string | null;
  role: UserRole;
  isVerified: boolean;
  isApproved: boolean;
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

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
