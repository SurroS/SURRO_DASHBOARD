"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Flag,
  AlertTriangle,
  Shield,
  CheckCircle,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";
import { User, getUsers, updateUser } from "@/lib/userManagement";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import UserProfileDrawer from "@/components/UserManagement/UserProfileDrawer";
import SuspendUserModal from "@/components/UserManagement/SuspendUserModal";

const ITEMS_PER_PAGE = 5;

const getSeverityBadgeClass = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "low":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function FlaggedAccountsPage() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [highPriority, setHighPriority] = useState<User[]>([]);
  const [mediumPriority, setMediumPriority] = useState<User[]>([]);
  const [lowPriority, setLowPriority] = useState<User[]>([]);
  const [filteredHighPriority, setFilteredHighPriority] = useState<User[]>([]);
  const [filteredMediumPriority, setFilteredMediumPriority] = useState<User[]>([]);
  const [filteredLowPriority, setFilteredLowPriority] = useState<User[]>([]);
  const [paginatedHighPriority, setPaginatedHighPriority] = useState<User[]>([]);
  const [paginatedMediumPriority, setPaginatedMediumPriority] = useState<User[]>([]);
  const [paginatedLowPriority, setPaginatedLowPriority] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("high");
  const [selectedDrawerUser, setSelectedDrawerUser] = useState<string | null>(
    null
  );
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [selectedUserForSuspend, setSelectedUserForSuspend] =
    useState<User | null>(null);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [selectedUserForResolve, setSelectedUserForResolve] =
    useState<User | null>(null);
  const [selectedFlag, setSelectedFlag] = useState<string>("");
  const [resolveNotes, setResolveNotes] = useState("");
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [selectedUserForEscalate, setSelectedUserForEscalate] =
    useState<User | null>(null);
  const [escalateNotes, setEscalateNotes] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const { user: adminUser } = useAuth();

  useEffect(() => {
    const users = getUsers();
    const flagged = users.filter((u) => u.complianceFlags.length > 0);
    setAllUsers(flagged);

    setHighPriority(
      flagged.filter((u) =>
        u.complianceFlags.some((f) => f.severity === "high" && !f.resolved)
      )
    );
    setMediumPriority(
      flagged.filter((u) =>
        u.complianceFlags.some((f) => f.severity === "medium" && !f.resolved)
      )
    );
    setLowPriority(
      flagged.filter((u) =>
        u.complianceFlags.some((f) => f.severity === "low" && !f.resolved)
      )
    );
  }, []);

  // Reset page when filters or tab change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, activeTab]);

  // Apply filtering and pagination for High Priority
  useEffect(() => {
    let filtered = highPriority.filter((account) => {
      const matchesSearch =
        !searchQuery ||
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || account.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    setFilteredHighPriority(filtered);

    // Apply pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPage), totalPages || 1);
    if (validPage !== currentPage && totalPages > 0 && activeTab === "high") {
      setCurrentPage(validPage);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    if (activeTab === "high") {
      setPaginatedHighPriority(paginated);
    }
  }, [highPriority, searchQuery, roleFilter, currentPage, activeTab]);

  // Apply filtering and pagination for Medium Priority
  useEffect(() => {
    let filtered = mediumPriority.filter((account) => {
      const matchesSearch =
        !searchQuery ||
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || account.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    setFilteredMediumPriority(filtered);

    // Apply pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPage), totalPages || 1);
    if (validPage !== currentPage && totalPages > 0 && activeTab === "medium") {
      setCurrentPage(validPage);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    if (activeTab === "medium") {
      setPaginatedMediumPriority(paginated);
    }
  }, [mediumPriority, searchQuery, roleFilter, currentPage, activeTab]);

  // Apply filtering and pagination for Low Priority
  useEffect(() => {
    let filtered = lowPriority.filter((account) => {
      const matchesSearch =
        !searchQuery ||
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || account.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    setFilteredLowPriority(filtered);

    // Apply pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPage), totalPages || 1);
    if (validPage !== currentPage && totalPages > 0 && activeTab === "low") {
      setCurrentPage(validPage);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    if (activeTab === "low") {
      setPaginatedLowPriority(paginated);
    }
  }, [lowPriority, searchQuery, roleFilter, currentPage, activeTab]);

  const handleResolveFlag = () => {
    if (!selectedUserForResolve || !selectedFlag || !resolveNotes.trim()) {
      return;
    }

    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const user = allUsers.find((u) => u.id === selectedUserForResolve.id);
    if (!user) return;

    const updatedFlags = user.complianceFlags.map((flag) =>
      flag.id === selectedFlag ? { ...flag, resolved: true } : flag
    );

    const updated = updateUser(
      selectedUserForResolve.id,
      { complianceFlags: updatedFlags },
      adminId,
      adminEmail
    );

    if (updated) {
      toast({
        title: "Flag Resolved",
        description: "Compliance flag has been resolved",
      });

      setResolveModalOpen(false);
      setSelectedUserForResolve(null);
      setSelectedFlag("");
      setResolveNotes("");

      refreshData();
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
    const users = getUsers();
    const flagged = users.filter((u) => u.complianceFlags.length > 0);
    setAllUsers(flagged);
    setHighPriority(
      flagged.filter((u) =>
        u.complianceFlags.some((f) => f.severity === "high" && !f.resolved)
      )
    );
    setMediumPriority(
      flagged.filter((u) =>
        u.complianceFlags.some((f) => f.severity === "medium" && !f.resolved)
      )
    );
    setLowPriority(
      flagged.filter((u) =>
        u.complianceFlags.some((f) => f.severity === "low" && !f.resolved)
      )
    );
  };

  const handleBulkResolve = () => {
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

    let count = 0;
    Array.from(selectedUsers).forEach((userId) => {
      const user = allUsers.find((u) => u.id === userId);
      if (user) {
        const updatedFlags = user.complianceFlags.map((flag) => ({
          ...flag,
          resolved: true,
        }));

        const updated = updateUser(
          userId,
          { complianceFlags: updatedFlags },
          adminId,
          adminEmail
        );

        if (updated) count++;
      }
    });

    toast({
      title: "Bulk Action Complete",
      description: `${count} flags resolved`,
    });

    setSelectedUsers(new Set());
    refreshData();
  };

  const handleBulkEscalate = () => {
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

    let count = 0;
    Array.from(selectedUsers).forEach((userId) => {
      const user = allUsers.find((u) => u.id === userId);
      if (user) {
        const updatedFlags = user.complianceFlags.map((flag) =>
          flag.severity === "low"
            ? { ...flag, severity: "medium" as const }
            : flag.severity === "medium"
            ? { ...flag, severity: "high" as const }
            : flag
        );

        const updated = updateUser(
          userId,
          { complianceFlags: updatedFlags },
          adminId,
          adminEmail
        );

        if (updated) count++;
      }
    });

    toast({
      title: "Bulk Action Complete",
      description: `${count} flags escalated`,
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

    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const selectedUsersList = Array.from(selectedUsers).map((id) =>
      allUsers.find((u) => u.id === id)
    ).filter((u): u is User => u !== undefined);

    selectedUsersList.forEach((user) => {
      updateUser(
        user.id,
        {
          status: "suspended",
          suspensionReason: "Bulk suspension from flagged accounts",
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
        { reason: "Bulk suspension from flagged accounts" },
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

  const handleEscalate = () => {
    if (!selectedUserForEscalate || !escalateNotes.trim()) {
      return;
    }

    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const user = allUsers.find((u) => u.id === selectedUserForEscalate.id);
    if (!user) return;

    const updatedFlags = user.complianceFlags.map((flag) =>
      flag.severity === "low"
        ? { ...flag, severity: "medium" as const }
        : flag.severity === "medium"
        ? { ...flag, severity: "high" as const }
        : flag
    );

    const updated = updateUser(
      selectedUserForEscalate.id,
      { complianceFlags: updatedFlags },
      adminId,
      adminEmail
    );

    if (updated) {
      toast({
        title: "Flag Escalated",
        description: "Compliance flag has been escalated",
      });

      setEscalateModalOpen(false);
      setSelectedUserForEscalate(null);
      setEscalateNotes("");

      refreshData();
    }
  };

  const FlaggedTable = ({
    accounts,
    filteredAccounts,
    selectedUsers,
    onUserSelect,
  }: {
    accounts: User[];
    filteredAccounts: User[];
    selectedUsers: Set<string>;
    onUserSelect: (userId: string, selected: boolean) => void;
  }) => {
    if (filteredAccounts.length === 0) {
      return (
        <div className="p-12 text-center">
          <p className="text-muted-foreground">No flagged accounts found.</p>
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
                      accounts.length > 0 &&
                      accounts.every((u) => selectedUsers.has(u.id))
                    }
                    onCheckedChange={(checked) =>
                      accounts.forEach((u) => onUserSelect(u.id, checked as boolean))
                    }
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Flag Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => {
                const unresolvedFlags = account.complianceFlags.filter(
                  (f) => !f.resolved
                );
                const highestSeverity =
                  unresolvedFlags.length > 0
                    ? unresolvedFlags.reduce((highest, flag) => {
                        if (flag.severity === "high") return flag;
                        if (
                          flag.severity === "medium" &&
                          highest.severity !== "high"
                        )
                          return flag;
                        return highest;
                      })
                    : null;

                return (
                  <TableRow key={account.id}>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedUsers.has(account.id)}
                        onCheckedChange={(checked) =>
                          onUserSelect(account.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell
                      className="font-medium cursor-pointer hover:text-primary"
                      onClick={() => setSelectedDrawerUser(account.id)}
                    >
                      {account.name}
                    </TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{account.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {highestSeverity ? highestSeverity.type : "N/A"}
                    </TableCell>
                    <TableCell>
                      {highestSeverity && (
                        <Badge
                          variant="secondary"
                          className={getSeverityBadgeClass(
                            highestSeverity.severity
                          )}
                        >
                          {highestSeverity.severity}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-red-500" />
                        <span className="max-w-xs truncate">
                          {highestSeverity
                            ? highestSeverity.description
                            : "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUserForResolve(account);
                            setSelectedFlag(highestSeverity?.id || "");
                            setResolveModalOpen(true);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUserForSuspend(account);
                            setSuspendModalOpen(true);
                          }}
                        >
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        </Button>
                        {highestSeverity &&
                          highestSeverity.severity !== "high" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUserForEscalate(account);
                                setEscalateModalOpen(true);
                              }}
                            >
                              <Shield className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedDrawerUser(account.id)}
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
      toast({
        title: "Account Suspended",
        description: `${selectedUserForSuspend.name}'s account has been suspended`,
      });

      setSuspendModalOpen(false);
      setSelectedUserForSuspend(null);

      refreshData();
    }
  };

  return (
    <>
      <ProtectedRoute>
        <RouteGuard>
          <MainLayout>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Flagged Accounts</h1>
                <p className="text-gray-600">
                  Review and manage accounts that have been flagged for
                  suspicious activity
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

              <Tabs defaultValue="high" className="space-y-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-fit grid-cols-3 bg-transparent p-0 h-auto gap-6">
                  <TabsTrigger
                    value="high"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                  >
                    High Priority ({highPriority.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="medium"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                  >
                    Medium Priority ({mediumPriority.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="low"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                  >
                    Low Priority ({lowPriority.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="high" className="mt-6">
                  <FlaggedTable
                    accounts={paginatedHighPriority}
                    filteredAccounts={filteredHighPriority}
                    selectedUsers={selectedUsers}
                    onUserSelect={handleUserSelect}
                  />
                  {filteredHighPriority.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              size="sm"
                              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          {Array.from({ length: Math.ceil(filteredHighPriority.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
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
                              onClick={() => setCurrentPage((p) => Math.min(Math.ceil(filteredHighPriority.length / ITEMS_PER_PAGE), p + 1))}
                              className={currentPage >= Math.ceil(filteredHighPriority.length / ITEMS_PER_PAGE) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="medium" className="mt-6">
                  <FlaggedTable
                    accounts={paginatedMediumPriority}
                    filteredAccounts={filteredMediumPriority}
                    selectedUsers={selectedUsers}
                    onUserSelect={handleUserSelect}
                  />
                  {filteredMediumPriority.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              size="sm"
                              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          {Array.from({ length: Math.ceil(filteredMediumPriority.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
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
                              onClick={() => setCurrentPage((p) => Math.min(Math.ceil(filteredMediumPriority.length / ITEMS_PER_PAGE), p + 1))}
                              className={currentPage >= Math.ceil(filteredMediumPriority.length / ITEMS_PER_PAGE) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="low" className="mt-6">
                  <FlaggedTable
                    accounts={paginatedLowPriority}
                    filteredAccounts={filteredLowPriority}
                    selectedUsers={selectedUsers}
                    onUserSelect={handleUserSelect}
                  />
                  {filteredLowPriority.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              size="sm"
                              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          {Array.from({ length: Math.ceil(filteredLowPriority.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
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
                              onClick={() => setCurrentPage((p) => Math.min(Math.ceil(filteredLowPriority.length / ITEMS_PER_PAGE), p + 1))}
                              className={currentPage >= Math.ceil(filteredLowPriority.length / ITEMS_PER_PAGE) ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                  {activeTab === "high" ? (
                    <>
                      Showing {filteredHighPriority.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredHighPriority.length)} of{" "}
                      {filteredHighPriority.length} flagged accounts
                    </>
                  ) : activeTab === "medium" ? (
                    <>
                      Showing {filteredMediumPriority.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredMediumPriority.length)} of{" "}
                      {filteredMediumPriority.length} flagged accounts
                    </>
                  ) : (
                    <>
                      Showing {filteredLowPriority.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredLowPriority.length)} of{" "}
                      {filteredLowPriority.length} flagged accounts
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
                      <DropdownMenuItem onClick={handleBulkResolve}>
                        Resolve Flags
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleBulkEscalate}>
                        Escalate Flags
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

      {/* Resolve Flag Modal */}
      <Dialog open={resolveModalOpen} onOpenChange={setResolveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Compliance Flag</DialogTitle>
            <DialogDescription>
              Add notes about how this flag was resolved
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resolve-notes">Resolution Notes *</Label>
              <Textarea
                id="resolve-notes"
                placeholder="Enter resolution details..."
                value={resolveNotes}
                onChange={(e) => setResolveNotes(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setResolveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleResolveFlag} disabled={!resolveNotes.trim()}>
              Resolve Flag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Escalate Modal */}
      <Dialog open={escalateModalOpen} onOpenChange={setEscalateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escalate Flag</DialogTitle>
            <DialogDescription>
              Add notes about why this flag is being escalated
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="escalate-notes">Escalation Notes *</Label>
              <Textarea
                id="escalate-notes"
                placeholder="Enter escalation details..."
                value={escalateNotes}
                onChange={(e) => setEscalateNotes(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEscalateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEscalate} disabled={!escalateNotes.trim()}>
              Escalate Flag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UserProfileDrawer
        open={selectedDrawerUser !== null}
        onOpenChange={(open) => !open && setSelectedDrawerUser(null)}
        userId={selectedDrawerUser}
      />
    </>
  );
}
