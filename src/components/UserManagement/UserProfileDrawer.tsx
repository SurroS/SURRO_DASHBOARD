"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  FileText,
  Activity,
  Ticket,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  MessageSquare,
  Send,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { User as UserType } from "@/lib/userManagement";
import { getTransactions } from "@/lib/walletService";
import SuspendUserModal from "./SuspendUserModal";
import WalletAdjustmentModal from "./WalletAdjustmentModal";
import SendNotificationModal from "./SendNotificationModal";
import ChangeRoleModal from "./ChangeRoleModal";
import { useAuth } from "@/lib/auth";
import { updateUser, updateUserStatus } from "@/lib/userManagement";
import { adjustWallet } from "@/lib/walletService";
import { sendTemplateNotification } from "@/lib/notificationService";
import { toast } from "@/hooks/use-toast";

interface UserProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
}

export default function UserProfileDrawer({
  open,
  onOpenChange,
  userId,
}: UserProfileDrawerProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);

  const { user: adminUser } = useAuth();

  useEffect(() => {
    if (userId && open) {
      const { getUserById } = require("@/lib/userManagement");
      const userData = getUserById(userId);
      setUser(userData);
    }
  }, [userId, open]);

  if (!user || !userId) return null;

  const transactions = getTransactions(userId);
  const verificationColor = {
    unverified: "bg-red-100 text-red-800",
    kyc_pending: "bg-yellow-100 text-yellow-800",
    verified: "bg-green-100 text-green-800",
  }[user.verificationStatus];

  const handleSuspend = (reason: string, duration: string) => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    updateUserStatus(userId, "suspended", reason, adminId, adminEmail);
    sendTemplateNotification(userId, "suspension", { reason }, "in_app");

    toast({
      title: "Account Suspended",
      description: `${user.name}'s account has been suspended for ${duration} days.`,
    });

    setSuspendModalOpen(false);
    onOpenChange(false);
  };

  const handleActivate = () => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    updateUser(userId, { status: "active" }, adminId, adminEmail);
    sendTemplateNotification(userId, "activation", {}, "in_app");

    toast({
      title: "Account Activated",
      description: `${user.name}'s account has been activated.`,
    });

    onOpenChange(false);
  };

  const handleWalletAdjust = (
    amount: number,
    type: "credit" | "debit",
    reason: string
  ) => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const transaction = adjustWallet(
      userId,
      amount,
      type,
      reason,
      adminId,
      adminEmail
    );

    if (transaction) {
      sendTemplateNotification(
        userId,
        "wallet_adjustment",
        {
          amount: amount.toFixed(2),
          balance: transaction.balanceAfter.toFixed(2),
        },
        "in_app"
      );

      toast({
        title: "Wallet Adjusted",
        description: `Wallet balance adjusted by ${
          type === "credit" ? "+" : "-"
        }$${amount.toFixed(2)}`,
      });

      setWalletModalOpen(false);
    }
  };

  const handleSendNotification = (
    channel: "email" | "sms" | "in_app",
    message: string
  ) => {
    const { sendNotification } = require("@/lib/notificationService");
    sendNotification(userId, "notification", message, channel);

    toast({
      title: "Notification Sent",
      description: `Notification sent to ${user.name} via ${channel}`,
    });

    setNotificationModalOpen(false);
  };

  const handleChangeRole = (newRole: typeof user.role) => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    updateUser(userId, { role: newRole }, adminId, adminEmail);
    sendTemplateNotification(
      userId,
      "role_change",
      { role: newRole },
      "in_app"
    );

    toast({
      title: "Role Changed",
      description: `${user.name}'s role has been changed to ${newRole}`,
    });

    setChangeRoleModalOpen(false);
    onOpenChange(false);
  };

  const handleResetPassword = () => {
    toast({
      title: "Password Reset",
      description: `Password reset link sent to ${user.email}`,
    });
  };

  const handleAssignCompliance = () => {
    const adminId = adminUser?.id || "unknown";
    const adminEmail = adminUser?.email || "unknown@example.com";

    const existingFlags = user.complianceFlags || [];
    const newFlag = {
      id: `flag_${Date.now()}`,
      type: "admin_review",
      severity: "medium" as const,
      description: "Assigned to compliance review",
      flaggedDate: new Date().toISOString(),
      resolved: false,
    };

    updateUser(
      userId,
      { complianceFlags: [...existingFlags, newFlag] },
      adminId,
      adminEmail
    );

    toast({
      title: "Compliance Review Assigned",
      description: `User assigned to compliance review`,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <SheetTitle className="text-2xl">{user.name}</SheetTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge>{user.role}</Badge>
                  <Badge variant="secondary" className={verificationColor}>
                    {user.verificationStatus.replace("_", " ")}
                  </Badge>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : user.status === "suspended"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {user.status === "suspended" ? (
              <Button
                size="sm"
                variant="outline"
                onClick={handleActivate}
                className="w-full"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Activate
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSuspendModalOpen(true)}
                className="w-full"
              >
                <AlertCircle className="h-4 w-4 mr-1" />
                Suspend
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setWalletModalOpen(true)}
              className="w-full"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Adjust Wallet
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setNotificationModalOpen(true)}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-1" />
              Notify
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setChangeRoleModalOpen(true)}
              className="w-full"
            >
              <Shield className="h-4 w-4 mr-1" />
              Change Role
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleResetPassword}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset Password
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleAssignCompliance}
              className="w-full"
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Compliance Review
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </div>
                  <p className="font-medium">{user.phone}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Date Joined</span>
                  </div>
                  <p className="font-medium">{user.dateJoined}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>Wallet Balance</span>
                  </div>
                  <p className="font-medium">
                    ${user.walletBalance.toFixed(2)}
                  </p>
                </div>
              </div>

              {user.complianceFlags && user.complianceFlags.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Compliance Flags</h3>
                  <div className="space-y-2">
                    {user.complianceFlags.map((flag) => (
                      <div
                        key={flag.id}
                        className={`p-3 rounded-md border ${
                          flag.severity === "high"
                            ? "bg-red-50 border-red-200"
                            : flag.severity === "medium"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{flag.type}</span>
                          <Badge
                            variant={
                              flag.severity === "high"
                                ? "destructive"
                                : flag.severity === "medium"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {flag.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {flag.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4 mt-4">
              {user.documents && user.documents.length > 0 ? (
                <div className="space-y-3">
                  {user.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          doc.status === "approved"
                            ? "default"
                            : doc.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No documents uploaded
                </p>
              )}
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-4 mt-4">
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <p
                          className={`font-medium ${
                            tx.type === "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.type === "credit" ? "+" : "-"}$
                          {tx.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tx.reason} •{" "}
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ${tx.balanceAfter.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Balance after
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No transactions
                </p>
              )}
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4 mt-4">
              {user.activityLog && user.activityLog.length > 0 ? (
                <div className="space-y-3">
                  {user.activityLog.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 p-3 border rounded-md"
                    >
                      <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                        {log.ipAddress && (
                          <p className="text-xs text-muted-foreground mt-1">
                            IP: {log.ipAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No activity recorded
                </p>
              )}
            </TabsContent>

            {/* Tickets Tab */}
            <TabsContent value="tickets" className="space-y-4 mt-4">
              {user.linkedTickets && user.linkedTickets.length > 0 ? (
                <div className="space-y-3">
                  {user.linkedTickets.map((ticketId) => (
                    <div
                      key={ticketId}
                      className="flex items-center gap-3 p-3 border rounded-md"
                    >
                      <Ticket className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{ticketId}</p>
                        <p className="text-sm text-muted-foreground">
                          Support ticket
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No linked tickets
                </p>
              )}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <SuspendUserModal
        open={suspendModalOpen}
        onOpenChange={setSuspendModalOpen}
        userId={userId}
        userName={user.name}
        onConfirm={handleSuspend}
      />

      <WalletAdjustmentModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
        userId={userId}
        userName={user.name}
        currentBalance={user.walletBalance}
        onConfirm={handleWalletAdjust}
      />

      <SendNotificationModal
        open={notificationModalOpen}
        onOpenChange={setNotificationModalOpen}
        userId={userId}
        userName={user.name}
        onConfirm={handleSendNotification}
      />

      <ChangeRoleModal
        open={changeRoleModalOpen}
        onOpenChange={setChangeRoleModalOpen}
        userId={userId}
        userName={user.name}
        currentRole={user.role}
        onConfirm={handleChangeRole}
      />
    </>
  );
}
