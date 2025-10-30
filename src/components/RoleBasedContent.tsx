"use client";

import { useAuth } from "@/lib/auth";
import { Permission } from "@/lib/permissions";

interface RoleBasedContentProps {
  requiredPermission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders content based on user permissions
 * Usage:
 * <RoleBasedContent requiredPermission="user.suspend">
 *   <Button>Suspend User</Button>
 * </RoleBasedContent>
 */
export default function RoleBasedContent({
  requiredPermission,
  children,
  fallback = null,
}: RoleBasedContentProps) {
  const { hasPermission } = useAuth();

  if (hasPermission(requiredPermission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
