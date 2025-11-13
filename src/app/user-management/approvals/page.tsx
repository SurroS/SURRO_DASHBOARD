"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";
import { User, getUsers, updateUser } from "@/lib/userManagement";
import {
  approveDocument,
  rejectDocument,
  requestDocumentReupload,
} from "@/lib/documentService";
import { sendTemplateNotification } from "@/lib/notificationService";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import UserProfileDrawer from "@/components/UserManagement/UserProfileDrawer";
import BulkReviewModal from "@/components/UserManagement/BulkReviewModal";

const ITEMS_PER_PAGE = 5;

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "under review":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function ApprovalsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedDrawerUser, setSelectedDrawerUser] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedUserForReject, setSelectedUserForReject] =
    useState<User | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string>("");
  const [rejectReason, setRejectReason] = useState("");
  const [reuploadModalOpen, setReuploadModalOpen] = useState(false);
  const [selectedUserForReupload, setSelectedUserForReupload] =
    useState<User | null>(null);
  const [reuploadReason, setReuploadReason] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const { user: adminUser } = useAuth();

  useEffect(() => {
    // Get all users and filter for kyc_pending
    const allUsers = getUsers();
    const pendingUsers = allUsers.filter(
      (u) => u.verificationStatus === "kyc_pending"
    );
    setUsers(pendingUsers);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter]);

  useEffect(() => {
    let filtered = [...users];

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);

    // Apply pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPage), totalPages || 1);
    if (validPage !== currentPage && totalPages > 0) {
      setCurrentPage(validPage);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setPaginatedUsers(paginated);
  }, [searchQuery, roleFilter, users, currentPage]);

  const handleApproveDocument = async (userId: string, documentId: string) => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const success = approveDocument(userId, documentId, adminId, adminEmail);

    if (success) {
      toast({
        title: "Document Approved",
        description: "Document has been approved successfully",
      });

      // Refresh users
      const allUsers = getUsers();
      const pendingUsers = allUsers.filter(
        (u) => u.verificationStatus === "kyc_pending"
      );
      setUsers(pendingUsers);
    } else {
      toast({
        title: "Error",
        description: "Failed to approve document",
        variant: "destructive",
      });
    }
  };

  const handleRejectDocument = () => {
    if (!selectedUserForReject || !selectedDocument || !rejectReason.trim()) {
      return;
    }

    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const success = rejectDocument(
      selectedUserForReject.id,
      selectedDocument,
      rejectReason,
      adminId,
      adminEmail
    );

    if (success) {
      toast({
        title: "Document Rejected",
        description: "Document has been rejected",
      });

      // Refresh users
      const allUsers = getUsers();
      const pendingUsers = allUsers.filter(
        (u) => u.verificationStatus === "kyc_pending"
      );
      setUsers(pendingUsers);

      setRejectModalOpen(false);
      setSelectedUserForReject(null);
      setSelectedDocument("");
      setRejectReason("");
    } else {
      toast({
        title: "Error",
        description: "Failed to reject document",
        variant: "destructive",
      });
    }
  };

  const handleRequestReupload = () => {
    if (
      !selectedUserForReupload ||
      !selectedDocument ||
      !reuploadReason.trim()
    ) {
      return;
    }

    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const success = requestDocumentReupload(
      selectedUserForReupload.id,
      selectedDocument,
      reuploadReason,
      adminId,
      adminEmail
    );

    if (success) {
      toast({
        title: "Reupload Requested",
        description: "User has been notified to reupload documents",
      });

      // Refresh users
      const allUsers = getUsers();
      const pendingUsers = allUsers.filter(
        (u) => u.verificationStatus === "kyc_pending"
      );
      setUsers(pendingUsers);

      setReuploadModalOpen(false);
      setSelectedUserForReupload(null);
      setSelectedDocument("");
      setReuploadReason("");
    } else {
      toast({
        title: "Error",
        description: "Failed to request reupload",
        variant: "destructive",
      });
    }
  };

  const handleBulkApprove = async () => {
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

    let successCount = 0;
    for (const userId of selectedUsers) {
      const user = users.find((u) => u.id === userId);
      if (user && user.documents.length > 0) {
        // Approve all pending documents
        for (const doc of user.documents) {
          if (doc.status === "pending") {
            const success = approveDocument(
              userId,
              doc.id,
              adminId,
              adminEmail
            );
            if (success) successCount++;
          }
        }
      }
    }

    toast({
      title: "Bulk Approval Complete",
      description: `${successCount} document(s) approved`,
    });

    setSelectedUsers(new Set());

    // Refresh users
    const allUsers = getUsers();
    const pendingUsers = allUsers.filter(
      (u) => u.verificationStatus === "kyc_pending"
    );
    setUsers(pendingUsers);
  };

  const handleReviewSelected = () => {
    if (selectedUsers.size === 0) {
      toast({
        title: "No Selection",
        description: "Please select users first",
        variant: "destructive",
      });
      return;
    }
    setReviewModalOpen(true);
  };

  const handleReviewModalUpdate = () => {
    // Refresh users after modal actions
    const allUsers = getUsers();
    const pendingUsers = allUsers.filter(
      (u) => u.verificationStatus === "kyc_pending"
    );
    setUsers(pendingUsers);
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "needs_reupload":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <>
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

              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="surrogate">Surrogate</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Pending Approvals ({filteredUsers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredUsers.length === 0 ? (
                    <div className="p-12 text-center">
                      <p className="text-muted-foreground">
                        No pending approvals found.
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox
                              checked={
                                filteredUsers.length > 0 &&
                                filteredUsers.every((u) =>
                                  selectedUsers.has(u.id)
                                )
                              }
                              onCheckedChange={(checked) =>
                                filteredUsers.forEach((u) =>
                                  setSelectedUsers((prev) => {
                                    const newSet = new Set(prev);
                                    if (checked) {
                                      newSet.add(u.id);
                                    } else {
                                      newSet.delete(u.id);
                                    }
                                    return newSet;
                                  })
                                )
                              }
                            />
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Documents</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedUsers.map((user) => {
                          const pendingDocs = user.documents.filter(
                            (d) => d.status === "pending"
                          );

                          return (
                            <TableRow key={user.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedUsers.has(user.id)}
                                  onCheckedChange={(checked) =>
                                    setSelectedUsers((prev) => {
                                      const newSet = new Set(prev);
                                      if (checked) {
                                        newSet.add(user.id);
                                      } else {
                                        newSet.delete(user.id);
                                      }
                                      return newSet;
                                    })
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
                              <TableCell>{user.dateJoined}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {user.documents.map((doc) => (
                                    <Badge
                                      key={doc.id}
                                      variant="outline"
                                      className={`text-xs ${getDocumentStatusColor(
                                        doc.status
                                      )}`}
                                    >
                                      {doc.type}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {pendingDocs.length > 0 && (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          handleApproveDocument(
                                            user.id,
                                            pendingDocs[0].id
                                          )
                                        }
                                      >
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedUserForReject(user);
                                          setSelectedDocument(
                                            pendingDocs[0].id
                                          );
                                          setRejectModalOpen(true);
                                        }}
                                      >
                                        <XCircle className="h-4 w-4 text-red-600" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedUserForReupload(user);
                                          setSelectedDocument(
                                            pendingDocs[0].id
                                          );
                                          setReuploadModalOpen(true);
                                        }}
                                      >
                                        <AlertCircle className="h-4 w-4 text-orange-600" />
                                      </Button>
                                    </>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      setSelectedDrawerUser(user.id)
                                    }
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
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {filteredUsers.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
                  {filteredUsers.length} pending approvals
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleBulkApprove}
                    disabled={selectedUsers.size === 0}
                  >
                    Bulk Approve
                  </Button>
                  <Button
                    onClick={handleReviewSelected}
                    disabled={selectedUsers.size === 0}
                  >
                    Review Selected
                  </Button>
                </div>
              </div>

              {/* Pagination */}
              {filteredUsers.length > ITEMS_PER_PAGE && (
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
                      {Array.from({ length: Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
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
                          onClick={() => setCurrentPage((p) => Math.min(Math.ceil(filteredUsers.length / ITEMS_PER_PAGE), p + 1))}
                          className={currentPage >= Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </MainLayout>
        </RouteGuard>
      </ProtectedRoute>

      {/* Reject Modal */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Document</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this document
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reject-reason">Reason for Rejection *</Label>
              <Textarea
                id="reject-reason"
                placeholder="Enter the reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRejectDocument}
              disabled={!rejectReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              Reject Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reupload Modal */}
      <Dialog open={reuploadModalOpen} onOpenChange={setReuploadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Document Reupload</DialogTitle>
            <DialogDescription>
              Request additional information or document reupload
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reupload-reason">Request Details *</Label>
              <Textarea
                id="reupload-reason"
                placeholder="What information is needed?"
                value={reuploadReason}
                onChange={(e) => setReuploadReason(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReuploadModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestReupload}
              disabled={!reuploadReason.trim()}
            >
              Request Reupload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Profile Drawer */}
      <UserProfileDrawer
        open={selectedDrawerUser !== null}
        onOpenChange={(open) => !open && setSelectedDrawerUser(null)}
        userId={selectedDrawerUser}
      />

      {/* Bulk Review Modal */}
      <BulkReviewModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        selectedUserIds={selectedUsers}
        onUpdate={handleReviewModalUpdate}
      />
    </>
  );
}
