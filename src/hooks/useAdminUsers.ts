"use client";

import { useState, useEffect, useCallback } from "react";
import { adminService, userService } from "@/lib/api";
import type { User, PaginatedResponse } from "@/lib/api/types";

interface UseAdminUsersOptions {
  page?: number;
  limit?: number;
  role?: string;
  isApproved?: boolean;
}

interface UseAdminUsersReturn {
  users: User[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  setPage: (page: number) => void;
}

export function useAdminUsers(options: UseAdminUsersOptions = {}): UseAdminUsersReturn {
  const { page = 1, limit = 20, role, isApproved } = options;
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response: PaginatedResponse<User>;
      if (role) {
        const data = await userService.getByRole(role, { page: currentPage, limit });
        // userService.getByRole returns User[] directly, wrap in paginated format
        response = {
          data: Array.isArray(data) ? data : [],
          meta: {
            total: Array.isArray(data) ? data.length : 0,
            page: currentPage,
            limit,
            totalPages: 1,
          },
        };
      } else {
        response = await adminService.getUsers({ page: currentPage, limit });
      }

      let filteredUsers = response.data;
      if (isApproved !== undefined) {
        filteredUsers = filteredUsers.filter((u) => u.isApproved === isApproved);
      }

      setUsers(filteredUsers);
      setTotal(response.meta?.total || filteredUsers.length);
      setTotalPages(response.meta?.totalPages || 1);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to fetch users"
          : "Failed to fetch users";
      setError(typeof message === "string" ? message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, role, isApproved]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    total,
    totalPages,
    loading,
    error,
    refetch: fetchUsers,
    setPage: setCurrentPage,
  };
}

interface UseUserActionsReturn {
  approveUser: (id: string) => Promise<boolean>;
  rejectUser: (id: string) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  bulkDeleteUsers: (ids: string[]) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useUserActions(): UseUserActionsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approveUser = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await adminService.approveUser(id);
      return true;
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to approve user"
          : "Failed to approve user";
      setError(typeof message === "string" ? message : "Failed to approve user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectUser = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await adminService.rejectUser(id);
      return true;
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to reject user"
          : "Failed to reject user";
      setError(typeof message === "string" ? message : "Failed to reject user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await userService.deleteById(id);
      return true;
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to delete user"
          : "Failed to delete user";
      setError(typeof message === "string" ? message : "Failed to delete user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const bulkDeleteUsers = async (ids: string[]): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await userService.deleteByIds(ids);
      return true;
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to delete users"
          : "Failed to delete users";
      setError(typeof message === "string" ? message : "Failed to delete users");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { approveUser, rejectUser, deleteUser, bulkDeleteUsers, loading, error };
}

interface DashboardStats {
  totalUsers: number;
  surrogateCount: number;
  intendedParentCount: number;
  agentCount: number;
  pendingApprovals: number;
  loading: boolean;
  error: string | null;
}

export function useDashboardStats(): DashboardStats {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    surrogateCount: 0,
    intendedParentCount: 0,
    agentCount: 0,
    pendingApprovals: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [allUsers, surrogates, intendedParents, agents, pending] =
          await Promise.all([
            adminService.getUsers({ limit: 1 }),
            adminService.getUsers({ role: "SURROGATE", limit: 1 }),
            adminService.getUsers({ role: "INTENDED_PARENT", limit: 1 }),
            adminService.getUsers({ role: "AGENT", limit: 1 }),
            adminService.getUsers({ isApproved: false, limit: 1 }),
          ]);

        setStats({
          totalUsers: allUsers.meta?.total || 0,
          surrogateCount: surrogates.meta?.total || 0,
          intendedParentCount: intendedParents.meta?.total || 0,
          agentCount: agents.meta?.total || 0,
          pendingApprovals: pending.meta?.total || 0,
          loading: false,
          error: null,
        });
      } catch (err: unknown) {
        const message =
          err && typeof err === "object" && "response" in err
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to fetch stats"
            : "Failed to fetch stats";
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: typeof message === "string" ? message : "Failed to fetch stats",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
}
