"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

export type UserRole = "hrms" | "investor" | "hr" | "marketer" | "agent";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  getUserRole: () => UserRole | null;
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
    role: UserRole = "hrms"
  ): Promise<boolean> => {
    try {
      // Simulate API call - replace with actual authentication
      if (email && password) {
        const userData = {
          id: "1",
          email,
          name: email.split("@")[0],
          role,
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

  const getUserRole = (): UserRole | null => {
    return user?.role || null;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout, isLoading, getUserRole } },
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
