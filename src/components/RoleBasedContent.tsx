"use client";

import { useAuth, UserRole } from "@/lib/auth";
import { ReactNode } from "react";

interface RoleBasedContentProps {
  hrms?: ReactNode;
  investor?: ReactNode;
  hr?: ReactNode;
  marketer?: ReactNode;
  agent?: ReactNode;
  fallback?: ReactNode;
}

export default function RoleBasedContent({
  hrms,
  investor,
  hr,
  marketer,
  agent,
  fallback,
}: RoleBasedContentProps) {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  if (!role && fallback) {
    return <>{fallback}</>;
  }

  switch (role) {
    case "hrms":
      return <>{hrms || fallback}</>;
    case "investor":
      return <>{investor || fallback}</>;
    case "hr":
      return <>{hr || hrms || fallback}</>;
    case "marketer":
      return <>{marketer || hrms || fallback}</>;
    case "agent":
      return <>{agent || hrms || fallback}</>;
    default:
      return <>{fallback}</>;
  }
}
