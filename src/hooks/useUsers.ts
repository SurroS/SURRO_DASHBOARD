import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { replaceUsers } from "@/lib/userManagement";
import {
  listUsers,
  mapAdminUserToLocalUser,
  type ListUsersParams,
  type ListUsersResponse,
} from "@/services/userService";
import type { User } from "@/types/user";

interface UseUsersOptions extends ListUsersParams {
  enabled?: boolean;
}

export function useUsers(options: UseUsersOptions = {}) {
  const { enabled = true, ...listParams } = options;

  const query = useQuery<ListUsersResponse>({
    queryKey: ["admin-users", listParams],
    queryFn: () => listUsers(listParams),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    retry: 2,
    enabled,
  });

  const transformedUsers = useMemo(
    () =>
      query.data
        ? query.data.data.map(mapAdminUserToLocalUser)
        : ([] as User[]),
    [query.data]
  );

  useEffect(() => {
    if (query.status === "success" && transformedUsers.length > 0) {
      replaceUsers(transformedUsers);
    }
  }, [query.status, query.dataUpdatedAt, transformedUsers]);

  return {
    users: transformedUsers,
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
