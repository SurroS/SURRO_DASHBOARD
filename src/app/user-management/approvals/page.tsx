"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";
import { useAdminUsers, useUserActions } from "@/hooks/useAdminUsers";
import { useToast } from "@/components/ui/use-toast";
import type { User } from "@/lib/api/types";

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

const getStatusBadgeClass = (user: User) => {
  if (user.kycStatus === "PENDING") return "bg-blue-100 text-blue-800 border-blue-200";
  if (user.kycStatus === "APPROVED") return "bg-green-100 text-green-800 border-green-200";
  if (user.kycStatus === "REJECTED") return "bg-red-100 text-red-800 border-red-200";
  return "bg-orange-100 text-orange-800 border-orange-200";
};

const getStatusLabel = (user: User) => {
  if (user.kycStatus !== "NOT_STARTED") return user.kycStatus;
  return "Pending";
};

export default function ApprovalsPage() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const { users, total, loading, error, refetch } = useAdminUsers({
    isApproved: false,
    limit: 50,
  });

  const { approveUser, rejectUser } = useUserActions();

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

  const handleBulkApprove = async () => {
    for (const id of selectedIds) {
      await approveUser(id);
    }
    toast({
      title: "Bulk Approval",
      description: `${selectedIds.size} users approved`,
    });
    setSelectedIds(new Set());
    refetch();
  };

  return (
    <ProtectedRoute>
      <RouteGuard>
        <MainLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Manual Account Approvals
              </h1>
              <p className="text-gray-600">
                Review and approve pending account applications
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center p-12">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading pending approvals...</span>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center p-12">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                    <span className="ml-2 text-red-500">{error}</span>
                  </div>
                ) : users.length === 0 ? (
                  <div className="flex items-center justify-center p-12">
                    <span className="text-muted-foreground">No pending approvals</span>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedIds.size === users.length && users.length > 0}
                            onCheckedChange={() => {
                              if (selectedIds.size === users.length) {
                                setSelectedIds(new Set());
                              } else {
                                setSelectedIds(new Set(users.map((u) => u.id)));
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>KYC</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.has(user.id)}
                              onCheckedChange={() => handleToggleSelect(user.id)}
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
                            {new Date(user.createdAt).toLocaleDateString()}
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
                            <Badge
                              variant="outline"
                              className={
                                user.kycStatus === "APPROVED"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-gray-50 text-gray-600 border-gray-200"
                              }
                            >
                              {user.kycStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handleApprove(user.id)}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handleReject(user.id)}
                              >
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
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

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {users.length} pending approvals
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={selectedIds.size === 0}
                  onClick={handleBulkApprove}
                >
                  Bulk Approve ({selectedIds.size})
                </Button>
              </div>
            </div>
          </div>
        </MainLayout>
      </RouteGuard>
    </ProtectedRoute>
  );
}
