"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Loader2, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useAdminUsers, useUserActions } from "@/hooks/useAdminUsers";
import { useToast } from "@/components/ui/use-toast";
import type { User } from "@/lib/api/types";

const roleTabs = [
  { value: "surrogate", label: "Surrogate", apiRole: "SURROGATE" },
  { value: "parents", label: "Parents", apiRole: "INTENDED_PARENT" },
  { value: "clinics", label: "Clinics", apiRole: "" },
  { value: "agents", label: "Agents", apiRole: "AGENT" },
];

const getStatusBadgeClass = (user: User) => {
  if (!user.isApproved) return "bg-orange-100 text-orange-800 border-orange-200";
  if (user.isVerified) return "bg-green-100 text-green-800 border-green-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

const getStatusLabel = (user: User) => {
  if (!user.isApproved) return "Pending";
  if (user.isVerified) return "Active";
  return "Inactive";
};

const getUserName = (user: User) => {
  if (user.surrogateProfile?.firstName) {
    return `${user.surrogateProfile.firstName} ${user.surrogateProfile.lastName || ""}`.trim();
  }
  if (user.intendedParentProfile?.fullName) {
    return user.intendedParentProfile.fullName;
  }
  if (user.agentProfile?.fullName) {
    return user.agentProfile.fullName;
  }
  return user.email?.split("@")[0] || "Unknown";
};

const UserTable = ({
  users,
  loading,
  error,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  allSelected,
  onApprove,
  onReject,
  onDelete,
}: {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  allSelected: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <Card>
    <CardContent className="p-0">
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading users...</span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center p-12">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <span className="ml-2 text-red-500">{error}</span>
        </div>
      ) : users.length === 0 ? (
        <div className="flex items-center justify-center p-12">
          <span className="text-muted-foreground">No users found</span>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onToggleAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.has(user.id)}
                    onCheckedChange={() => onToggleSelect(user.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {getUserName(user)}
                </TableCell>
                <TableCell>
                  <span className="text-primary hover:underline cursor-pointer">
                    {user.email || "N/A"}
                  </span>
                </TableCell>
                <TableCell>{user.role.replace("_", " ")}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      user.kycStatus === "APPROVED"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : user.kycStatus === "PENDING"
                        ? "bg-orange-100 text-orange-800 border-orange-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {user.kycStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusBadgeClass(user)}
                  >
                    {getStatusLabel(user)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {!user.isApproved && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                          onClick={() => onApprove(user.id)}
                        >
                          ✓
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => onReject(user.id)}
                        >
                          ✕
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
  </Card>
);

function UserManagementContent() {
  const [activeTab, setActiveTab] = useState("surrogate");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const currentTab = roleTabs.find((t) => t.value === activeTab);
  const apiRole = currentTab?.apiRole || "";

  const { users, total, totalPages, loading, error, refetch } = useAdminUsers({
    page,
    limit,
    role: apiRole || undefined,
  });

  const { approveUser, rejectUser, deleteUser } = useUserActions();

  useEffect(() => {
    setPage(1);
    setSelectedIds(new Set());
  }, [activeTab]);

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleToggleAll = useCallback(() => {
    if (selectedIds.size === users.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(users.map((u) => u.id)));
    }
  }, [selectedIds.size, users]);

  const handleApprove = async (id: string) => {
    const success = await approveUser(id);
    if (success) {
      toast({ title: "User Approved", description: "User has been approved" });
      refetch();
    }
  };

  const handleReject = async (id: string) => {
    const success = await rejectUser(id);
    if (success) {
      toast({ title: "User Rejected", description: "User has been rejected" });
      refetch();
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteUser(id);
    if (success) {
      toast({ title: "User Deleted", description: "User has been deleted" });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">User Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-fit grid-cols-4 bg-transparent p-0 h-auto gap-6">
          {roleTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {roleTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.value === "clinics" ? (
              <Card>
                <CardContent className="p-12">
                  <div className="text-center text-muted-foreground">
                    Clinic management coming soon
                  </div>
                </CardContent>
              </Card>
            ) : (
              <UserTable
                users={users}
                loading={loading}
                error={error}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleAll={handleToggleAll}
                allSelected={users.length > 0 && selectedIds.size === users.length}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            )}
          </TabsContent>
        ))}

        {activeTab !== "clinics" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing</span>
              <Select
                value={String(limit)}
                onValueChange={(v) => {
                  setLimit(Number(v));
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>of {total}</span>
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
                    (p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(p);
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </Tabs>
    </div>
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
