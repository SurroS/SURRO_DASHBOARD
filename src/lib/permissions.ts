export type AdminRole =
  | "super_admin"
  | "compliance_admin"
  | "support_admin"
  | "finance_admin"
  | "security_admin"
  | "general_admin"
  | "investor_admin"
  | "marketing_admin";

export type Permission =
  | "user.view"
  | "user.edit"
  | "user.edit_basic"
  | "user.suspend"
  | "user.delete"
  | "user.verify"
  | "user.change_role"
  | "document.approve"
  | "document.view"
  | "wallet.adjust"
  | "transaction.view"
  | "activity.monitor"
  | "user.flag"
  | "ticket.manage"
  | "analytics.view"
  | "bulk.export"
  | "employee.manage"
  | "approvals.view"
  | "suspensions.manage"
  | "subscriptions.view"
  | "subscriptions.manage"
  | "referrals.view"
  | "referrals.manage"
  | "reports.generate"
  | "cashflow.monitor"
  | "accounts.flag"
  | "employee.flag"
  | "messaging.access"
  | "audit.view"
  | "*"; // Super admin wildcard

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  super_admin: ["*"], // All permissions
  compliance_admin: [
    "user.view",
    "user.verify",
    "document.approve",
    "document.view",
    "activity.monitor",
  ],
  support_admin: [
    "user.view",
    "user.edit_basic",
    "ticket.manage",
    "activity.monitor",
    "approvals.view",
    "accounts.flag",
  ],
  finance_admin: [
    "user.view",
    "wallet.adjust",
    "transaction.view",
    "bulk.export",
    "subscriptions.view",
    "subscriptions.manage",
    "reports.generate",
    "cashflow.monitor",
    "accounts.flag",
  ],
  security_admin: [
    "user.view",
    "activity.monitor",
    "user.flag",
    "user.suspend",
    "subscriptions.view",
    "accounts.flag",
    "employee.manage",
    "employee.flag",
  ],
  general_admin: [
    "user.view",
    "user.edit_basic",
    "bulk.export",
    "approvals.view",
    "suspensions.manage",
    "subscriptions.view",
    "referrals.view",
    "analytics.view",
    "audit.view",
    "ticket.manage",
  ],
  investor_admin: ["analytics.view", "user.view"], // Limited view-only access
  marketing_admin: ["messaging.access", "ticket.manage"],
};

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(
  userRole: AdminRole | null,
  permission: Permission
): boolean {
  if (!userRole) return false;

  const rolePermissions = ROLE_PERMISSIONS[userRole];

  // Super admin has all permissions
  if (rolePermissions.includes("*")) return true;

  // Check specific permission
  return rolePermissions.includes(permission);
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: AdminRole): Permission[] {
  return ROLE_PERMISSIONS[role];
}

/**
 * Check if user can perform action on another user type
 */
export function canPerformAction(
  adminRole: AdminRole | null,
  action: Permission
): boolean {
  return hasPermission(adminRole, action);
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: AdminRole): string {
  const displayNames: Record<AdminRole, string> = {
    super_admin: "Super Admin",
    compliance_admin: "Compliance Admin",
    support_admin: "Support Admin",
    finance_admin: "Finance Admin",
    security_admin: "Security Admin",
    general_admin: "General Admin",
    investor_admin: "Investor Admin",
    marketing_admin: "Marketing Admin",
  };

  return displayNames[role];
}
