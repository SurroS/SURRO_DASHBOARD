/**
 * JWT Utility Functions
 *
 * NOTE: These functions parse JWT tokens to read claims but do NOT verify
 * the cryptographic signature. In a production environment with working package
 * management, use a library like 'jose' with `jwtVerify(token, secret)`.
 */

export interface JwtPayload {
  sub?: string;
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  permissions?: string[];
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

/**
 * Decodes a JWT token and returns the payload.
 * @throws Error if token format is invalid
 */
export function decodeJwtPayload(token: string): JwtPayload {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    return payload;
  } catch (error) {
    throw new Error("Failed to decode JWT payload");
  }
}

/**
 * Maps backend role to frontend role.
 * Currently maps "admin" and "ADMIN" to "super_admin".
 */
export function mapUserRole(role: string | undefined): string {
  if (!role) return "general_admin";

  const normalizedRole = role.toLowerCase();

  if (normalizedRole === "admin") {
    return "super_admin";
  }

  return role;
}

/**
 * Extracts user information from a JWT payload and applies role mapping.
 */
export function extractUserFromPayload(payload: JwtPayload): User {
  const user: User = {
    id: payload.sub || payload.id || "unknown",
    email: payload.email || "",
    name: payload.name || payload.email?.split("@")[0] || "User",
    role: mapUserRole(payload.role),
    permissions: payload.permissions || [],
  };

  return user;
}

/**
 * Convenience function: decode token and extract user in one step.
 */
export function getUserFromToken(token: string): User {
  const payload = decodeJwtPayload(token);
  return extractUserFromPayload(payload);
}
