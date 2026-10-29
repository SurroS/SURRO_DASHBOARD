"use client";

import { AuthProvider } from "@/lib/auth";
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <AuthProvider>
      <div className="font-sans antialiased">{children}</div>
    </AuthProvider>
  );
}
