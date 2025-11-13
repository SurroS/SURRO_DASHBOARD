"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  UserX,
  UserCheck,
  AlertTriangle,
  Filter,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  User,
  getUsers,
  updateUser,
  bulkUpdateStatus,
} from "@/lib/userManagement";
import { sendTemplateNotification } from "@/lib/notificationService";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import UserProfileDrawer from "@/components/UserManagement/UserProfileDrawer";
import SuspendUserModal from "@/components/UserManagement/SuspendUserModal";

const ITEMS_PER_PAGE = 5;

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "suspended":
      return "bg-red-100 text-red-800 border-red-200";
    case "pending review":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "lifted":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function SuspensionsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeSuspensions, setActiveSuspensions] = useState<User[]>([]);
  const [pendingReview, setPendingReview] = useState<User[]>([]);
  const [filteredActiveSuspensions, setFilteredActiveSuspensions] = useState<
    User[]
  >([]);
  const [filteredPendingReview, setFilteredPendingReview] = useState<User[]>(
    []
  );
  const [paginatedActiveSuspensions, setPaginatedActiveSuspensions] = useState<
    User[]
  >([]);
  const [paginatedPendingReview, setPaginatedPendingReview] = useState<User[]>(
    []
  );
  const [currentPageActive, setCurrentPageActive] = useState(1);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [selectedDrawerUser, setSelectedDrawerUser] = useState<string | null>(
    null
  );
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [selectedUserForSuspend, setSelectedUserForSuspend] =
    useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("active");

  const { user: adminUser } = useAuth();

  useEffect(() => {
    const allUsers = getUsers();

    // Active suspensions
    const suspended = allUsers.filter((u) => u.status === "suspended");
    setActiveSuspensions(suspended);

    // Pending review (users with high severity flags)
    const pending = allUsers.filter(
      (u) =>
        u.complianceFlags.some((f) => f.severity === "high" && !f.resolved) &&
        u.status !== "suspended"
    );
    setPendingReview(pending);

    setUsers(allUsers);
  }, []);

  // Reset pages when filters or tab change
  useEffect(() => {
    setCurrentPageActive(1);
    setCurrentPagePending(1);
  }, [searchQuery, roleFilter, activeTab]);

  // Apply filtering and pagination for Active Suspensions
  useEffect(() => {
    let filtered = activeSuspensions.filter((suspension) => {
      const matchesSearch =
        !searchQuery ||
        suspension.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suspension.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "all" || suspension.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    setFilteredActiveSuspensions(filtered);

    // Apply pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPageActive), totalPages || 1);
    if (validPage !== currentPageActive && totalPages > 0) {
      setCurrentPageActive(validPage);
    }

    const startIndex = (currentPageActive - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setPaginatedActiveSuspensions(paginated);
  }, [activeSuspensions, searchQuery, roleFilter, currentPageActive]);

  // Apply filtering and pagination for Pending Review
  useEffect(() => {
    let filtered = pendingReview.filter((user) => {
      const matchesSearch =
        !searchQuery ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    setFilteredPendingReview(filtered);

    // Apply pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const validPage = Math.min(
      Math.max(1, currentPagePending),
      totalPages || 1
    );
    if (validPage !== currentPagePending && totalPages > 0) {
      setCurrentPagePending(validPage);
    }

    const startIndex = (currentPagePending - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setPaginatedPendingReview(paginated);
  }, [pendingReview, searchQuery, roleFilter, currentPagePending]);

  const handleSuspend = (reason: string, duration: string) => {
    if (!selectedUserForSuspend) return;

    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const updated = updateUser(
      selectedUserForSuspend.id,
      {
        status: "suspended",
        suspensionReason: reason,
        suspensionDate: new Date().toISOString(),
        suspensionDuration: duration,
        suspendedBy: adminEmail,
      },
      adminId,
      adminEmail
    );

    if (updated) {
      sendTemplateNotification(
        selectedUserForSuspend.id,
        "suspension",
        { reason },
        "in_app"
      );

      toast({
        title: "Account Suspended",
        description: `${selectedUserForSuspend.name}'s account has been suspended`,
      });

      setSuspendModalOpen(false);
      setSelectedUserForSuspend(null);

      // Refresh users
      const allUsers = getUsers();
      const suspended = allUsers.filter((u) => u.status === "suspended");
      setActiveSuspensions(suspended);
      const pending = allUsers.filter(
        (u) =>
          u.complianceFlags.some((f) => f.severity === "high" && !f.resolved) &&
          u.status !== "suspended"
      );
      setPendingReview(pending);
    }
  };

  const handleUserSelect = (userId: string, selected: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (selected) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedUsers(newSelected);
  };

  const refreshData = () => {
    const allUsers = getUsers();
    const suspended = allUsers.filter((u) => u.status === "suspended");
    setActiveSuspensions(suspended);
    const pending = allUsers.filter(
      (u) =>
        u.complianceFlags.some((f) => f.severity === "high" && !f.resolved) &&
        u.status !== "suspended"
    );
    setPendingReview(pending);
    setUsers(allUsers);
  };

  const handleBulkReactivate = () => {
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

    const count = bulkUpdateStatus(
      Array.from(selectedUsers),
      "active",
      `Bulk reactivation by ${adminEmail}`,
      adminId,
      adminEmail
    );

    // Clear suspension fields for reactivated users
    Array.from(selectedUsers).forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        updateUser(
          userId,
          {
            suspensionReason: undefined,
            suspensionDate: undefined,
            suspensionDuration: undefined,
            suspendedBy: undefined,
          },
          adminId,
          adminEmail
        );
        sendTemplateNotification(userId, "reactivation", {}, "in_app");
      }
    });

    toast({
      title: "Bulk Action Complete",
      description: `${count} users reactivated`,
    });

    setSelectedUsers(new Set());
    refreshData();
  };

  const handleBulkSuspend = () => {
    if (selectedUsers.size === 0) {
      toast({
        title: "No Selection",
        description: "Please select users first",
        variant: "destructive",
      });
      return;
    }

    // For bulk suspend, we'll use a default reason/duration
    // In a real implementation, you might want a modal for this
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const selectedUsersList = Array.from(selectedUsers)
      .map((id) => users.find((u) => u.id === id))
      .filter((u): u is User => u !== undefined);

    selectedUsersList.forEach((user) => {
      updateUser(
        user.id,
        {
          status: "suspended",
          suspensionReason: "Bulk suspension",
          suspensionDate: new Date().toISOString(),
          suspensionDuration: "30 days",
          suspendedBy: adminEmail,
        },
        adminId,
        adminEmail
      );
      sendTemplateNotification(
        user.id,
        "suspension",
        { reason: "Bulk suspension" },
        "in_app"
      );
    });

    toast({
      title: "Bulk Action Complete",
      description: `${selectedUsers.size} users suspended`,
    });

    setSelectedUsers(new Set());
    refreshData();
  };

  const handleReactivate = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const updated = updateUser(
      userId,
      {
        status: "active",
        suspensionReason: undefined,
        suspensionDate: undefined,
        suspensionDuration: undefined,
        suspendedBy: undefined,
      },
      adminId,
      adminEmail
    );

    if (updated) {
      sendTemplateNotification(userId, "reactivation", {}, "in_app");

      toast({
        title: "Account Reactivated",
        description: `${user.name}'s account has been reactivated`,
      });

      refreshData();
    }
  };

  const SuspensionTable = ({
    suspensions,
    filteredSuspensions,
    selectedUsers,
    onUserSelect,
  }: {
    suspensions: User[];
    filteredSuspensions: User[];
    selectedUsers: Set<string>;
    onUserSelect: (userId: string, selected: boolean) => void;
  }) => {
    if (filteredSuspensions.length === 0) {
      return (
        <div className="p-12 text-center">
          <p className="text-muted-foreground">No suspensions found.</p>
        </div>
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
                      suspensions.length > 0 &&
                      suspensions.every((u) => selectedUsers.has(u.id))
                    }
                    onCheckedChange={(checked) =>
                      suspensions.forEach((u) =>
                        onUserSelect(u.id, checked as boolean)
                      )
                    }
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suspensions.map((suspension) => (
                <TableRow key={suspension.id}>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedUsers.has(suspension.id)}
                      onCheckedChange={(checked) =>
                        onUserSelect(suspension.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell
                    className="font-medium cursor-pointer hover:text-primary"
                    onClick={() => setSelectedDrawerUser(suspension.id)}
                  >
                    {suspension.name}
                  </TableCell>
                  <TableCell>{suspension.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{suspension.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="max-w-xs truncate">
                        {suspension.suspensionReason || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {suspension.suspensionDuration || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeClass("suspended")}
                    >
                      Suspended
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReactivate(suspension.id)}
                      >
                        <UserCheck className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedDrawerUser(suspension.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const PendingReviewTable = ({
    pending,
    filteredPending,
    selectedUsers,
    onUserSelect,
  }: {
    pending: User[];
    filteredPending: User[];
    selectedUsers: Set<string>;
    onUserSelect: (userId: string, selected: boolean) => void;
  }) => {
    if (filteredPending.length === 0) {
      return (
        <div className="p-12 text-center">
          <p className="text-muted-foreground">No users pending review.</p>
        </div>
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
                      pending.length > 0 &&
                      pending.every((u) => selectedUsers.has(u.id))
                    }
                    onCheckedChange={(checked) =>
                      pending.forEach((u) =>
                        onUserSelect(u.id, checked as boolean)
                      )
                    }
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Flag Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.map((user) => {
                const highFlags = user.complianceFlags.filter(
                  (f) => f.severity === "high" && !f.resolved
                );
                return (
                  <TableRow key={user.id}>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedUsers.has(user.id)}
                        onCheckedChange={(checked) =>
                          onUserSelect(user.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell
                      className="font-medium cursor-pointer hover:text-primary"
                      onClick={() => setSelectedDrawerUser(user.id)}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {highFlags.map((flag) => flag.type).join(", ")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-800 border-red-200"
                      >
                        High
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUserForSuspend(user);
                            setSuspendModalOpen(true);
                          }}
                        >
                          <UserX className="h-4 w-4 text-red-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedDrawerUser(user.id)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
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

  return (
    <>
      <ProtectedRoute>
        <RouteGuard>
          <MainLayout>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">User Suspensions</h1>
                <p className="text-gray-600">
                  Manage user account suspensions and review pending cases
                </p>
              </div>

              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="all">All Roles</option>
                  <option value="surrogate">Surrogate</option>
                  <option value="parent">Parent</option>
                  <option value="clinic">Clinic</option>
                  <option value="agent">Agent</option>
                </select>
              </div>

              <Tabs
                defaultValue="active"
                className="space-y-6"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-fit grid-cols-2 bg-transparent p-0 h-auto gap-6">
                  <TabsTrigger
                    value="active"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                  >
                    Active Suspensions ({activeSuspensions.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                  >
                    Pending Review ({pendingReview.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-6">
                  <SuspensionTable
                    suspensions={paginatedActiveSuspensions}
                    filteredSuspensions={filteredActiveSuspensions}
                    selectedUsers={selectedUsers}
                    onUserSelect={handleUserSelect}
                  />
                  {filteredActiveSuspensions.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              size="sm"
                              onClick={() =>
                                setCurrentPageActive((p) => Math.max(1, p - 1))
                              }
                              className={
                                currentPageActive === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                          {Array.from(
                            {
                              length: Math.ceil(
                                filteredActiveSuspensions.length /
                                  ITEMS_PER_PAGE
                              ),
                            },
                            (_, i) => i + 1
                          ).map((page) => (
                            <PaginationItem key={page}>
                              <PaginationLink
                                size="sm"
                                onClick={() => setCurrentPageActive(page)}
                                isActive={currentPageActive === page}
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
                                setCurrentPageActive((p) =>
                                  Math.min(
                                    Math.ceil(
                                      filteredActiveSuspensions.length /
                                        ITEMS_PER_PAGE
                                    ),
                                    p + 1
                                  )
                                )
                              }
                              className={
                                currentPageActive >=
                                Math.ceil(
                                  filteredActiveSuspensions.length /
                                    ITEMS_PER_PAGE
                                )
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="pending" className="mt-6">
                  <PendingReviewTable
                    pending={paginatedPendingReview}
                    filteredPending={filteredPendingReview}
                    selectedUsers={selectedUsers}
                    onUserSelect={handleUserSelect}
                  />
                  {filteredPendingReview.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              size="sm"
                              onClick={() =>
                                setCurrentPagePending((p) => Math.max(1, p - 1))
                              }
                              className={
                                currentPagePending === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                          {Array.from(
                            {
                              length: Math.ceil(
                                filteredPendingReview.length / ITEMS_PER_PAGE
                              ),
                            },
                            (_, i) => i + 1
                          ).map((page) => (
                            <PaginationItem key={page}>
                              <PaginationLink
                                size="sm"
                                onClick={() => setCurrentPagePending(page)}
                                isActive={currentPagePending === page}
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
                                setCurrentPagePending((p) =>
                                  Math.min(
                                    Math.ceil(
                                      filteredPendingReview.length /
                                        ITEMS_PER_PAGE
                                    ),
                                    p + 1
                                  )
                                )
                              }
                              className={
                                currentPagePending >=
                                Math.ceil(
                                  filteredPendingReview.length / ITEMS_PER_PAGE
                                )
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {activeTab === "active" ? (
                    <>
                      Showing{" "}
                      {filteredActiveSuspensions.length > 0
                        ? (currentPageActive - 1) * ITEMS_PER_PAGE + 1
                        : 0}{" "}
                      to{" "}
                      {Math.min(
                        currentPageActive * ITEMS_PER_PAGE,
                        filteredActiveSuspensions.length
                      )}{" "}
                      of {filteredActiveSuspensions.length} cases
                    </>
                  ) : (
                    <>
                      Showing{" "}
                      {filteredPendingReview.length > 0
                        ? (currentPagePending - 1) * ITEMS_PER_PAGE + 1
                        : 0}{" "}
                      to{" "}
                      {Math.min(
                        currentPagePending * ITEMS_PER_PAGE,
                        filteredPendingReview.length
                      )}{" "}
                      of {filteredPendingReview.length} cases
                    </>
                  )}
                  {selectedUsers.size > 0 && (
                    <span className="ml-2 text-primary">
                      • {selectedUsers.size} selected
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2"
                        disabled={selectedUsers.size === 0}
                      >
                        <Filter className="h-4 w-4" />
                        Bulk Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleBulkReactivate}>
                        Reactivate Selected
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleBulkSuspend}>
                        Suspend Selected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </MainLayout>
        </RouteGuard>
      </ProtectedRoute>

      <SuspendUserModal
        open={suspendModalOpen}
        onOpenChange={setSuspendModalOpen}
        userId={selectedUserForSuspend?.id || ""}
        userName={selectedUserForSuspend?.name || ""}
        onConfirm={handleSuspend}
      />

      <UserProfileDrawer
        open={selectedDrawerUser !== null}
        onOpenChange={(open) => !open && setSelectedDrawerUser(null)}
        userId={selectedDrawerUser}
      />
    </>
  );
}
