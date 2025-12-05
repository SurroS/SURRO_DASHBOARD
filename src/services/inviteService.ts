import { apiClient } from "@/lib/apiClient";

// Toggle this to FALSE when backend is ready
const USE_MOCK = true;

export interface InviteRequest {
  email: string;
  role: string;
}

export interface InviteResponse {
  token: string;
  expiresAt: string;
  inviteLink: string;
}

export interface ValidateInviteResponse {
  valid: boolean;
  email?: string;
  role?: string;
  error?: string;
}

// --- Mock Data Store (in memory for session) ---
// In a real app, this won't persist across reloads unless we use localStorage,
// but for a service file, in-memory is fine for quick dev if we don't reload.
// Better to use localStorage for the mock to survive reloads during dev.
const MOCK_STORAGE_KEY = "mock_invites";

function getMockInvites(): Record<
  string,
  { email: string; role: string; expiresAt: string }
> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(MOCK_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveMockInvite(
  token: string,
  data: { email: string; role: string; expiresAt: string }
) {
  if (typeof window === "undefined") return;
  const invites = getMockInvites();
  invites[token] = data;
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(invites));
}
// -----------------------------------------------

export async function generateInvite(
  data: InviteRequest
): Promise<InviteResponse> {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const token = `mock_token_${Date.now()}_${btoa(data.email)}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24h from now

    // Construct the link based on current window location or default
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";
    const inviteLink = `${origin}/signup?token=${token}`;

    saveMockInvite(token, {
      email: data.email,
      role: data.role,
      expiresAt,
    });

    return {
      token,
      expiresAt,
      inviteLink,
    };
  }

  // Real API Call
  return apiClient.post<InviteResponse>("/api/v1/invites", { body: data });
}

export async function validateInvite(
  token: string
): Promise<ValidateInviteResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const invites = getMockInvites();
    const invite = invites[token];

    if (!invite) {
      return { valid: false, error: "Invalid invitation token." };
    }

    if (new Date(invite.expiresAt) < new Date()) {
      return { valid: false, error: "Invitation has expired." };
    }

    return {
      valid: true,
      email: invite.email,
      role: invite.role,
    };
  }

  // Real API Call
  try {
    return await apiClient.get<ValidateInviteResponse>(
      `/api/v1/invites/${token}`
    );
  } catch (error) {
    return { valid: false, error: "Failed to validate invite." };
  }
}
