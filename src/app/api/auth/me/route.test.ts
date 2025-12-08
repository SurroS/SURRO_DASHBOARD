import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./route";

// Mock next/headers
const mockCookies = {
  get: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: () => Promise.resolve(mockCookies),
}));

// Mock NextResponse
vi.mock("next/server", () => ({
  NextResponse: {
    json: (
      body: Record<string, unknown>,
      init?: { status?: number }
    ) => ({
      body,
      status: init?.status || 200,
    }),
  },
}));

describe("Auth Check Route (JWT Decode)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return unauthenticated if no token cookie exists", async () => {
    mockCookies.get.mockReturnValue(undefined);

    const response: { body: { authenticated: boolean }; status: number } =
      await GET();

    expect(response.status).toBe(401);
    expect(response.body.authenticated).toBe(false);
  });

  it("should decode token and return user details with mapped role", async () => {
    // Create a dummy JWT
    // Header: {"alg":"HS256","typ":"JWT"} -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    // Payload: {"sub":"123","email":"admin@example.com","role":"admin","name":"Test Admin"}
    // -> eyJzdWIiOiIxMjMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IlRlc3QgQWRtaW4ifQ
    const dummyToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IlRlc3QgQWRtaW4ifQ.signature_ignored";

    mockCookies.get.mockReturnValue({ value: dummyToken });

    const response: {
      body: { authenticated: boolean; user: { email: string; role: string } };
    } = await GET();

    expect(response.body.authenticated).toBe(true);
    expect(response.body.user.email).toBe("admin@example.com");
    // Check Role Mapping: "admin" -> "super_admin"
    expect(response.body.user.role).toBe("super_admin");
  });

  it("should handle invalid tokens gracefully", async () => {
    mockCookies.get.mockReturnValue({ value: "invalid.token.format" });

    // The current implementation uses JSON.parse(atob(...)) which might throw
    // We expect the route to catch it and return 401
    const response: { body: { authenticated: boolean }; status: number } =
      await GET();

    expect(response.status).toBe(401);
    expect(response.body.authenticated).toBe(false);
  });
});
