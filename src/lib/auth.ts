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
import { authService } from "./api/auth";
import type { User as ApiUser } from "./api/types";

interface User {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: AdminRole) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminRegister: (email: string, password: string, inviteCode: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  getUserRole: () => AdminRole | null;
  hasPermission: (permission: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapApiUserToUser(apiUser: ApiUser): User {
  const email = apiUser.email || "unknown@surro.com";
  return {
    id: apiUser.id,
    email,
    name: email.split("@")[0],
    role: "general_admin",
    permissions: [],
  };
}

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}): React.JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password });
      const userData = mapApiUserToUser(response.user);
      localStorage.setItem("authToken", response.accessToken);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch {
      return false;
    }
  };

  const adminLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await authService.adminLogin({ email, password });
      const userData = mapApiUserToUser(response.user);
      localStorage.setItem("authToken", response.accessToken);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch {
      return false;
    }
  };

  const adminRegister = async (
    email: string,
    password: string,
    inviteCode: string
  ): Promise<boolean> => {
    try {
      const response = await authService.adminRegister({ email, password, inviteCode });
      const userData = mapApiUserToUser(response.user);
      localStorage.setItem("authToken", response.accessToken);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch {
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
    {
      value: {
        user,
        login,
        adminLogin,
        adminRegister,
        logout,
        isLoading,
        getUserRole,
        hasPermission,
      },
    },
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
