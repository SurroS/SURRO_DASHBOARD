import { AdminRole } from "./permissions";

export const ROLE_ROUTES: Record<AdminRole, string[]> = {
  support_admin: [
    "/dashboard",
    "/user-management",
    "/user-management/approvals",
    "/user-management/flagged-accounts",
    "/tickets",
    "/notifications",
  ],
  finance_admin: [
    "/dashboard",
    "/user-management",
    "/subscriptions",
    "/user-management/flagged-accounts",
    "/tickets",
    "/notifications",
  ],
  security_admin: [
    "/dashboard",
    "/user-management",
    "/subscriptions",
    "/user-management/flagged-accounts",
    "/employee-management",
    "/employee-management/registration",
    "/employee-management/log-history",
    "/tickets",
    "/notifications",
    "/settings",
  ],
  marketing_admin: [
    "/dashboard",
    "/marketer",
    "/tickets",
    "/notifications",
    "/settings",
  ],
  general_admin: [
    "/dashboard",
    "/user-management",
    "/user-management/approvals",
    "/user-management/suspensions",
    "/subscriptions",
    "/referrals",
    "/tickets",
    "/analytics",
    "/audit-logs",
    "/notifications",
    "/settings",
  ],
  super_admin: ["*"], // All routes
  compliance_admin: [
    "/dashboard",
    "/user-management",
    "/user-management/approvals",
    "/notifications",
  ],
  investor_admin: ["/dashboard", "/analytics", "/notifications"],
};

/**
 * Check if a user role has access to a specific route
 */
export function hasRouteAccess(
  userRole: AdminRole | null,
  route: string
): boolean {
  if (!userRole) return false;

  const allowedRoutes = ROLE_ROUTES[userRole];
  if (!allowedRoutes) return false;

  // Super admin has access to all routes
  if (allowedRoutes.includes("*")) return true;

  // Check if the exact route is allowed
  if (allowedRoutes.includes(route)) return true;

  // Check if any parent route is allowed (for nested routes)
  const pathSegments = route.split("/").filter(Boolean);
  for (let i = pathSegments.length; i > 0; i--) {
    const parentRoute = "/" + pathSegments.slice(0, i).join("/");
    if (allowedRoutes.includes(parentRoute)) return true;
  }

  return false;
}

/**
 * Get all accessible routes for a user role
 */
export function getAccessibleRoutes(userRole: AdminRole | null): string[] {
  if (!userRole) return [];

  const allowedRoutes = ROLE_ROUTES[userRole];

  // Super admin has access to all routes
  if (allowedRoutes.includes("*")) return ["*"];

  return allowedRoutes;
}
