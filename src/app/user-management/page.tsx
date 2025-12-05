"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";
import UserProfileDrawer from "@/components/UserManagement/UserProfileDrawer";
import {
  initializeUsers,
  searchUsers,
  getUserStats,
  bulkUpdateStatus,
  getUsers,
} from "@/lib/userManagement";
import { useUsers } from "@/hooks/useUsers";
import type { User } from "@/types/user";
import { exportUsersToCSV } from "@/lib/exportService";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LOW_WALLET_THRESHOLD = 50;

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "suspended":
      return "bg-red-100 text-red-800 border-red-200";
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getVerificationBadgeClass = (status: string) => {
  switch (status) {
    case "verified":
      return "bg-green-100 text-green-800 border-green-200";
    case "kyc_pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "unverified":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

interface UserTableProps {
  users: User[];
  selectedUsers: Set<string>;
  onUserSelect: (userId: string, selected: boolean) => void;
  onUserClick: (userId: string) => void;
}

const UserTable = ({
  users,
  selectedUsers,
  onUserSelect,
  onUserClick,
}: UserTableProps) => {
  const stats = getUserStats();

  if (users.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">
            No users found matching your filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    users.length > 0 &&
                    users.every((u) => selectedUsers.has(u.id))
                  }
                  onCheckedChange={(checked) =>
                    users.forEach((u) => onUserSelect(u.id, checked as boolean))
                  }
                />
              </TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email & Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const isLowBalance =
                user.role === "agent" &&
                user.walletBalance < LOW_WALLET_THRESHOLD;

              return (
                <TableRow
                  key={user.id}
                  onClick={() => onUserClick(user.id)}
                  className="cursor-pointer"
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedUsers.has(user.id)}
                      onCheckedChange={(checked) =>
                        onUserSelect(user.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="truncate max-w-[120px] cursor-help">
                            {user.id}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-mono text-sm">{user.id}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{user.email}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeClass(user.status)}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getVerificationBadgeClass(
                        user.verificationStatus
                      )}
                    >
                      {user.verificationStatus.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        ${user.walletBalance.toFixed(2)}
                      </span>
                      {isLowBalance && (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{user.dateJoined}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onUserClick(user.id)}>
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const ITEMS_PER_PAGE = 5;

function UserManagementContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedDrawerUser, setSelectedDrawerUser] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [verificationFilter, setVerificationFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<
    "surrogate" | "parent" | "clinic" | "agent"
  >("surrogate");

  const { user: adminUser } = useAuth();
  const {
    users: remoteUsers,
    isLoading: isUsersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers();

  // Load users from API instead of localStorage
  useEffect(() => {
    setAllUsers(remoteUsers);
  }, [remoteUsers]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, statusFilter, verificationFilter]);

  useEffect(() => {
    // Filter users based on tab, search, and filters
    let filtered = allUsers.filter((u) => u.role === activeTab);

    if (searchQuery) {
      filtered = searchUsers({ search: searchQuery, role: activeTab });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((u) => u.status === statusFilter);
    }

    if (verificationFilter !== "all") {
      filtered = filtered.filter(
        (u) => u.verificationStatus === verificationFilter
      );
    }

    setFilteredUsers(filtered);

    // Apply pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPage), totalPages || 1);
    if (validPage !== currentPage && totalPages > 0) {
      setCurrentPage(validPage);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = filtered.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
    setUsers(paginatedUsers);
  }, [
    activeTab,
    searchQuery,
    statusFilter,
    verificationFilter,
    allUsers,
    currentPage,
  ]);

  const handleUserSelect = (userId: string, selected: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (selected) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleUserClick = (userId: string) => {
    setSelectedDrawerUser(userId);
  };

  const handleBulkAction = (action: "activate" | "suspend" | "export") => {
    if (selectedUsers.size === 0) {
      toast({
        title: "No Selection",
        description: "Please select users first",
        variant: "destructive",
      });
      return;
    }

    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    if (action === "export") {
      const selected = allUsers.filter((u) => selectedUsers.has(u.id));
      exportUsersToCSV(
        selected,
        `users_export_${new Date().toISOString()}.csv`
      );
      toast({
        title: "Export Complete",
        description: `Exported ${selected.length} users`,
      });
      setSelectedUsers(new Set());
    } else {
      const status = action === "suspend" ? "suspended" : "active";
      const count = bulkUpdateStatus(
        Array.from(selectedUsers),
        status,
        `Bulk ${action} by ${adminEmail}`,
        adminId,
        adminEmail
      );

      toast({
        title: "Bulk Action Complete",
        description: `${count} users ${action}d`,
      });

      setSelectedUsers(new Set());

      // Refresh users
      const refreshed = getUsers();
      setAllUsers(refreshed);
    }
  };

  const stats = getUserStats();

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">User Management</h1>
            <p className="text-sm text-muted-foreground">
              Total: {stats.total} users • Active: {stats.byStatus.active || 0}{" "}
              • Suspended: {stats.byStatus.suspended || 0}
            </p>
            {isUsersLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Syncing users from SurroSantara...</span>
              </div>
            )}
          </div>
        </div>

        {usersError && (
          <Alert variant="destructive">
            <AlertTitle>Failed to load users</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <span>
                {usersError instanceof Error
                  ? usersError.message
                  : "Unable to reach the admin users API."}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => refetchUsers()}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={verificationFilter}
              onValueChange={setVerificationFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verification</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="kyc_pending">KYC Pending</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleBulkAction("activate")}>
                  Activate Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("suspend")}>
                  Suspend Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("export")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as typeof activeTab)}
          className="space-y-6"
        >
          <TabsList className="grid w-fit grid-cols-4 bg-transparent p-0 h-auto gap-6">
            <TabsTrigger
              value="surrogate"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
            >
              Surrogate ({stats.byRole.surrogate || 0})
            </TabsTrigger>
            <TabsTrigger
              value="parent"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
            >
              Parents ({stats.byRole.parent || 0})
            </TabsTrigger>
            <TabsTrigger
              value="clinic"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
            >
              Clinics ({stats.byRole.clinic || 0})
            </TabsTrigger>
            <TabsTrigger
              value="agent"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
            >
              Agents ({stats.byRole.agent || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="surrogate" className="mt-6">
            <UserTable
              users={users.filter((u) => u.role === "surrogate")}
              selectedUsers={selectedUsers}
              onUserSelect={handleUserSelect}
              onUserClick={handleUserClick}
            />
          </TabsContent>

          <TabsContent value="parent" className="mt-6">
            <UserTable
              users={users.filter((u) => u.role === "parent")}
              selectedUsers={selectedUsers}
              onUserSelect={handleUserSelect}
              onUserClick={handleUserClick}
            />
          </TabsContent>

          <TabsContent value="clinic" className="mt-6">
            <UserTable
              users={users.filter((u) => u.role === "clinic")}
              selectedUsers={selectedUsers}
              onUserSelect={handleUserSelect}
              onUserClick={handleUserClick}
            />
          </TabsContent>

          <TabsContent value="agent" className="mt-6">
            <UserTable
              users={users.filter((u) => u.role === "agent")}
              selectedUsers={selectedUsers}
              onUserSelect={handleUserSelect}
              onUserClick={handleUserClick}
            />
          </TabsContent>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Showing{" "}
                {filteredUsers.length > 0
                  ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                  : 0}{" "}
                to{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}{" "}
                of {filteredUsers.length} users
              </span>
            </div>

            {filteredUsers.length > ITEMS_PER_PAGE && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from(
                    {
                      length: Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
                    },
                    (_, i) => i + 1
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      size="sm"
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(
                            Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
                            p + 1
                          )
                        )
                      }
                      className={
                        currentPage >=
                        Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </Tabs>
      </div>

      <UserProfileDrawer
        open={selectedDrawerUser !== null}
        onOpenChange={(open) => !open && setSelectedDrawerUser(null)}
        userId={selectedDrawerUser}
      />
    </>
  );
}

export default function UserManagementPage() {
  return (
    <ProtectedRoute>
      <RouteGuard>
        <MainLayout>
          <UserManagementContent />
        </MainLayout>
      </RouteGuard>
    </ProtectedRoute>
  );
}
