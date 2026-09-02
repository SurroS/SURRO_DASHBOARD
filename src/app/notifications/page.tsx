"use client";

import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import { notificationService } from "@/lib/api";
import type { Notification } from "@/lib/api/notifications";

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

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getAll();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to load notifications"
          : "Failed to load notifications";
      setError(typeof message === "string" ? message : "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSendNotification = async () => {
    if (!sendData.title || !sendData.body) return;
    setSending(true);
    try {
      await notificationService.create({
        title: sendData.title,
        body: sendData.body,
        role: sendData.role === "ALL" ? undefined : sendData.role,
      });
      setShowSendDialog(false);
      setSendData({ title: "", body: "", role: "ALL" });
      fetchNotifications();
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to send notification"
          : "Failed to send notification";
      alert(typeof message === "string" ? message : "Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;
    try {
      await notificationService.delete(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to delete notification"
          : "Failed to delete notification";
      alert(typeof message === "string" ? message : "Failed to delete notification");
    }
  };

  const filteredNotifications = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

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
                    {filteredNotifications.map((notification) => (
                      <TableRow
                        key={notification.id}
                        className={!notification.read ? "bg-blue-50/50" : ""}
                      >
                        <TableCell>
                          {notification.read ? (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-blue-500" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {notification.title}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {notification.body}
                        </TableCell>
                        <TableCell>
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={notification.read ? "secondary" : "default"}
                            className={
                              notification.read
                                ? "bg-gray-100 text-gray-600"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {notification.read ? "Read" : "Unread"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
