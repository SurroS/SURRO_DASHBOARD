"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle, Bell, Send, Trash2, Eye, EyeOff } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import { notificationService, isBulkResult, getNotificationMessage, isNotificationRead } from "@/lib/api";
import type { Notification } from "@/lib/api/notifications";
import { useToast } from "@/components/ui/use-toast";

function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "response" in err) {
    const message = (err as { response?: { data?: { message?: unknown } } })
      .response?.data?.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join(", ");
  }
  return fallback;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [sendData, setSendData] = useState({
    title: "",
    body: "",
    role: "ALL",
  });
  const [sending, setSending] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getAll();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load notifications"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSendNotification = async () => {
    if (!sendData.title || !sendData.body) return;
    setSending(true);
    try {
      // Broadcasts must send an explicit role. Omitting `role` creates a
      // personal notification for the current admin instead of a broadcast.
      const result = await notificationService.create({
        title: sendData.title,
        body: sendData.body,
        role: sendData.role,
      });
      const targetRole = sendData.role;
      setShowSendDialog(false);
      setSendData({ title: "", body: "", role: "ALL" });
      if (isBulkResult(result)) {
        toast({
          title: "Broadcast queued",
          description: `${result.created} notification${result.created === 1 ? "" : "s"} created for ${targetRole}.`,
        });
      } else {
        toast({
          title: "Notification sent",
          description: "Personal notification created.",
        });
      }
      fetchNotifications();
    } catch (err: unknown) {
      toast({
        title: "Failed to send notification",
        description: getErrorMessage(err, "Failed to send notification"),
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // T2: delete confirmation uses AlertDialog (toast feedback), never the
  // native blocking confirm().
  const handleDelete = async () => {
    if (!pendingDeleteId || deleting) return;
    const id = pendingDeleteId;
    setDeleting(true);
    try {
      await notificationService.delete(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setPendingDeleteId(null);
      toast({ title: "Notification deleted" });
    } catch (err: unknown) {
      toast({
        title: "Failed to delete notification",
        description: getErrorMessage(err, "Failed to delete notification"),
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const query = searchQuery.toLowerCase();
  const filteredNotifications = notifications.filter((n) => {
    const title = typeof n.title === "string" ? n.title : "";
    const message = getNotificationMessage(n);
    return (
      title.toLowerCase().includes(query) ||
      message.toLowerCase().includes(query)
    );
  });

  const unreadCount = notifications.filter((n) => !isNotificationRead(n)).length;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Notifications</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up"}
              </p>
            </div>
            <Button onClick={() => setShowSendDialog(true)}>
              <Send className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-3xl font-bold">{notifications.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Unread</p>
              <p className="text-3xl font-bold">{unreadCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Read</p>
              <p className="text-3xl font-bold">{notifications.length - unreadCount}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Notifications Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Loading notifications...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center p-12">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                  <span className="ml-2 text-red-500">{error}</span>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <span className="text-muted-foreground">No notifications found</span>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications.map((notification) => {
                      const read = isNotificationRead(notification);
                      return (
                      <TableRow
                        key={notification.id}
                        className={!read ? "bg-blue-50/50" : ""}
                      >
                        <TableCell>
                          {read ? (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-blue-500" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {notification.title}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {getNotificationMessage(notification)}
                        </TableCell>
                        <TableCell>
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={read ? "secondary" : "default"}
                            className={
                              read
                                ? "bg-gray-100 text-gray-600"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {read ? "Read" : "Unread"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setPendingDeleteId(notification.id)}
                            aria-label={`Delete ${notification.title}`}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Send Notification Dialog */}
          <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Notification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Notification title"
                    value={sendData.title}
                    onChange={(e) =>
                      setSendData((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Notification message"
                    value={sendData.body}
                    onChange={(e) =>
                      setSendData((prev) => ({ ...prev, body: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Target Role</label>
                  <Select
                    value={sendData.role}
                    onValueChange={(value) =>
                      setSendData((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Users</SelectItem>
                      <SelectItem value="SURROGATE">Surrogates</SelectItem>
                      <SelectItem value="INTENDED_PARENT">Intended Parents</SelectItem>
                      <SelectItem value="AGENT">Agents</SelectItem>
                      <SelectItem value="ADMIN">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowSendDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSendNotification} disabled={sending || !sendData.title || !sendData.body}>
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* T2: non-blocking delete confirmation. */}
          <AlertDialog
            open={pendingDeleteId !== null}
            onOpenChange={(open) => {
              if (!open && !deleting) setPendingDeleteId(null);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete notification?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes the notification. This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                  {deleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
