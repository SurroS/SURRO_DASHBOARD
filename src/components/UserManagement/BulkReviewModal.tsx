"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  User,
} from "lucide-react";
import { User as UserType, getUserById } from "@/lib/userManagement";
import {
  approveDocument,
  rejectDocument,
  requestDocumentReupload,
} from "@/lib/documentService";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

interface BulkReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUserIds: Set<string>;
  onUpdate: () => void;
}

export default function BulkReviewModal({
  open,
  onOpenChange,
  selectedUserIds,
  onUpdate,
}: BulkReviewModalProps) {
  const { user: adminUser } = useAuth();
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load selected users when modal opens
  useEffect(() => {
    if (open && selectedUserIds.size > 0) {
      const users = Array.from(selectedUserIds)
        .map((id) => getUserById(id))
        .filter((user): user is UserType => user !== undefined);
      setSelectedUsers(users);
    } else {
      setSelectedUsers([]);
    }
  }, [open, selectedUserIds]);

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

  const handleBulkApprove = async () => {
    if (selectedUsers.length === 0) return;

    setIsProcessing(true);
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    let successCount = 0;
    for (const user of selectedUsers) {
      for (const doc of user.documents) {
        if (doc.status === "pending") {
          const success = approveDocument(
            user.id,
            doc.id,
            adminId,
            adminEmail
          );
          if (success) successCount++;
        }
      }
    }

    toast({
      title: "Bulk Approval Complete",
      description: `${successCount} document(s) approved`,
    });

    setIsProcessing(false);
    onUpdate();
    onOpenChange(false);
  };

  const handleBulkReject = async () => {
    if (selectedUsers.length === 0) return;

    setIsProcessing(true);
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    let successCount = 0;
    for (const user of selectedUsers) {
      for (const doc of user.documents) {
        if (doc.status === "pending") {
          const success = rejectDocument(
            user.id,
            doc.id,
            "Bulk rejection - please review requirements",
            adminId,
            adminEmail
          );
          if (success) successCount++;
        }
      }
    }

    toast({
      title: "Bulk Rejection Complete",
      description: `${successCount} document(s) rejected`,
    });

    setIsProcessing(false);
    onUpdate();
    onOpenChange(false);
  };

  const handleApproveUserDocument = async (
    userId: string,
    documentId: string
  ) => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const success = approveDocument(userId, documentId, adminId, adminEmail);
    if (success) {
      toast({
        title: "Document Approved",
        description: "Document has been approved successfully",
      });
      onUpdate();
    }
  };

  const handleRejectUserDocument = async (
    userId: string,
    documentId: string
  ) => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const success = rejectDocument(
      userId,
      documentId,
      "Document rejected - please review requirements",
      adminId,
      adminEmail
    );
    if (success) {
      toast({
        title: "Document Rejected",
        description: "Document has been rejected",
      });
      onUpdate();
    }
  };

  const handleRequestReupload = async (userId: string, documentId: string) => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const success = requestDocumentReupload(
      userId,
      documentId,
      "Please reupload this document",
      adminId,
      adminEmail
    );
    if (success) {
      toast({
        title: "Reupload Requested",
        description: "User has been notified to reupload documents",
      });
      onUpdate();
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Review Selected Users ({selectedUsers.length})</DialogTitle>
          <DialogDescription>
            Review and manage documents for selected users
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {selectedUsers.map((user, index) => {
              const pendingDocs = user.documents.filter(
                (d) => d.status === "pending"
              );

              return (
                <div key={user.id} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge variant="secondary">
                            {pendingDocs.length} pending
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {user.documents.length > 0 ? (
                    <div className="space-y-2 ml-13">
                      {user.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 border rounded-md bg-card"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {doc.type} • {doc.uploadDate}
                              </div>
                            </div>
                            <Badge
                              className={getDocumentStatusColor(doc.status)}
                            >
                              {doc.status}
                            </Badge>
                          </div>
                          {doc.status === "pending" && (
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleApproveUserDocument(user.id, doc.id)
                                }
                                disabled={isProcessing}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleRejectUserDocument(user.id, doc.id)
                                }
                                disabled={isProcessing}
                              >
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleRequestReupload(user.id, doc.id)
                                }
                                disabled={isProcessing}
                              >
                                <AlertCircle className="h-4 w-4 text-orange-600" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground ml-13">
                      No documents uploaded
                    </div>
                  )}

                  {index < selectedUsers.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleBulkReject}
            disabled={isProcessing || selectedUsers.length === 0}
            className="bg-red-50 hover:bg-red-100 text-red-700"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject All Pending
          </Button>
          <Button
            onClick={handleBulkApprove}
            disabled={isProcessing || selectedUsers.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve All Pending
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

