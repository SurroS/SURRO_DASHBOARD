import mockUsersData from "@/data/mockUsers.json";
import type {
  User,
  UserFilters,
  UserStatus,
} from "@/types/user";

const USERS_STORAGE_KEY = "surro_users";

export function replaceUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Failed to replace users:", error);
  }
}

// Initialize with default data if not exists
export function initializeUsers(): User[] {
  const existing = getUsers();

  // Load all 50 users from JSON file
  const defaultUsers: User[] = mockUsersData as User[];

  // If no users exist, initialize with all default users
  if (existing.length === 0) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  // If users exist, merge missing default users (especially test mock users)
  // This ensures test users are always available even if localStorage has other users
  const existingIds = new Set(existing.map((u) => u.id));
  const missingUsers = defaultUsers.filter((u) => !existingIds.has(u.id));

  if (missingUsers.length > 0) {
    const mergedUsers = [...existing, ...missingUsers];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mergedUsers));
    return mergedUsers;
  }

  // Return existing users if all defaults are already present
  return existing;
}

/**
 * Refresh mock data - clears localStorage and reinitializes with all default users
 * Useful for development and testing
 */
export function refreshMockData(): User[] {
  localStorage.removeItem(USERS_STORAGE_KEY);
  return initializeUsers();
}

export function getUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to get users:", error);
    return [];
  }
}

export function getUserById(userId: string): User | undefined {
  const users = getUsers();
  return users.find((user) => user.id === userId);
}

export function searchUsers(filters: UserFilters): User[] {
  let users = getUsers();

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    users = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower)
    );
  }

  // Role filter
  if (filters.role) {
    users = users.filter((user) => user.role === filters.role);
  }

  // Status filter
  if (filters.status) {
    users = users.filter((user) => user.status === filters.status);
  }

  // Verification status filter
  if (filters.verificationStatus) {
    users = users.filter(
      (user) => user.verificationStatus === filters.verificationStatus
    );
  }

  // Date range filter
  if (filters.startDate) {
    users = users.filter((user) => user.dateJoined >= filters.startDate!);
  }
  if (filters.endDate) {
    users = users.filter((user) => user.dateJoined <= filters.endDate!);
  }

  return users;
}

export function updateUser(
  userId: string,
  updates: Partial<User>
): User | null {
  const users = getUsers();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) return null;

  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return updatedUser;
}

export function updateUserStatus(
  userId: string,
  status: UserStatus,
  reason: string
): User | null {
  const updated = updateUser(userId, { status });

  return updated;
}

export function bulkUpdateStatus(
  userIds: string[],
  status: UserStatus,
  reason: string
): number {
  let count = 0;
  userIds.forEach((userId) => {
    if (updateUserStatus(userId, status, reason, "", "")) {
      count++;
    }
  });

  return count;
}

export function getUsersByRole(role: UserRole): User[] {
  return getUsers().filter((user) => user.role === role);
}

export function getUsersByStatus(status: UserStatus): User[] {
  return getUsers().filter((user) => user.status === status);
}

export function getUserStats() {
  const users = getUsers();

  const byRole = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byStatus = users.reduce((acc, user) => {
    acc[user.status] = (acc[user.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byVerification = users.reduce((acc, user) => {
    acc[user.verificationStatus] = (acc[user.verificationStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: users.length,
    byRole,
    byStatus,
    byVerification,
  };
}
