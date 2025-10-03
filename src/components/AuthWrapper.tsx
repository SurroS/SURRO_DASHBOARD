"use client";

import { AuthProvider } from "@/lib/auth";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const pathname = usePathname();
  const useGeist = pathname !== "/";

  return (
    <AuthProvider>
      <div
        className={
          useGeist
            ? `${geistSans.variable} ${geistMono.variable} font-sans antialiased`
            : undefined
        }
      >
        {children}
      </div>
    </AuthProvider>
  );
}
