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
import { apiClient } from "./apiClient";

interface User {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    role?: AdminRole
  ) => Promise<boolean>;
  logout: () => Promise<void>;
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
    const checkAuth = async () => {
      try {
        // Call the proxy endpoint to check auth and get user details
        const response = await apiClient.get<{
          authenticated: boolean;
          user?: User;
        }>("/auth/me");

        if (response.authenticated && response.user) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Use the new proxy login route
      // Role param is ignored as role is determined by backend
      const response = await apiClient.post<{
        success: boolean;
        user: User;
      }>("/auth/login", {
        body: { email, password },
      });

      if (response.success && response.user) {
        setUser(response.user);
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

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    // Clear legacy localStorage items just in case
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
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
