"use client";

import { useAuth } from "@/lib/auth";
import { hasRouteAccess } from "@/lib/routes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface RouteGuardProps {
  children: ReactNode;
}

/**
 * Component that protects routes based on user role permissions
 * Redirects unauthorized users to dashboard
 */
export default function RouteGuard({ children }: RouteGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && user) {
      // Check if user has access to current route
      const hasAccess = hasRouteAccess(user.role, pathname);

      if (!hasAccess) {
        // Redirect to dashboard if user doesn't have access
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be handled by ProtectedRoute
  }

  // Check if user has access to current route
  const hasAccess = hasRouteAccess(user.role, pathname);

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            You don&apos;t have permission to access this page.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
