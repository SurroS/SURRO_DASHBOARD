"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";
import {
  hasPermission as checkPermission,
  AdminRole,
  Permission,
} from "./permissions";

interface User {
  id: string;
  email: string;
  name: string;
  role: AdminRole; // Updated to use AdminRole from permissions
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    role?: AdminRole
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  getUserRole: () => AdminRole | null;
  hasPermission: (permission: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}): React.JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("authToken");
    if (token) {
      // In a real app, you'd validate the token with your backend
      // For now, we'll just check if it exists
      const userData = localStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role?: AdminRole
  ): Promise<boolean> => {
    try {
      // Simulate API call - replace with actual authentication
      if (email && password) {
        // Role assignment priority:
        // 1. Backend API response (when implemented)
        // 2. Email pattern matching (current fallback)
        // 3. Provided role parameter (for variant A backward compatibility)
        // 4. Default to "general_admin"
        let assignedRole: AdminRole = "general_admin";
        
        // Email pattern matching (fallback until backend is implemented)
        if (email.includes("super")) assignedRole = "super_admin";
        else if (email.includes("compliance"))
          assignedRole = "compliance_admin";
        else if (email.includes("support")) assignedRole = "support_admin";
        else if (email.includes("finance")) assignedRole = "finance_admin";
        else if (email.includes("security")) assignedRole = "security_admin";
        else if (email.includes("marketing")) assignedRole = "marketing_admin";
        else if (email.includes("investor")) assignedRole = "investor_admin";
        // If role was provided and no email pattern matched, use provided role
        else if (role) assignedRole = role;

        const userData: User = {
          id: "1",
          email,
          name: email.split("@")[0],
          role: assignedRole,
          permissions: [], // Will be populated by permissions system
        };

        const token = "mock-jwt-token-" + Date.now();

        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const getUserRole = (): AdminRole | null => {
    return user?.role || null;
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    return checkPermission(user.role, permission as Permission);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout, isLoading, getUserRole, hasPermission } },
    children
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
