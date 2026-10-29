import { toast } from "@/hooks/use-toast";

export type NotificationType =
  | "suspension"
  | "approval"
  | "rejection"
  | "wallet_adjustment"
  | "role_change"
  | "document_approved"
  | "document_rejected"
  | "activation"
  | "reactivation";

export interface NotificationLog {
  id: string;
  userId: string;
  type: NotificationType;
  channel: "email" | "sms" | "in_app";
  content: string;
  timestamp: string;
  sent: boolean;
  error?: string;
}

const NOTIFICATIONS_STORAGE_KEY = "surro_notifications";

function logNotification(notification: NotificationLog): void {
  try {
    const existing = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    const logs: NotificationLog[] = existing ? JSON.parse(existing) : [];
    logs.unshift(notification);

    // Keep only last 1000 notifications
    const trimmed = logs.slice(0, 1000);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error("Failed to log notification:", error);
  }
}

export function sendNotification(
  userId: string,
  type: NotificationType,
  content: string,
  channel: "email" | "sms" | "in_app" = "in_app"
): NotificationLog {
  const notification: NotificationLog = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    channel,
    content,
    timestamp: new Date().toISOString(),
    sent: false,
  };

  try {
    // Simulate sending notification
    if (channel === "in_app") {
      toast({
        title: "Notification Sent",
        description: content,
      });
    }

    // In production, this would:
    // - Send email via SendGrid/AWS SES
    // - Send SMS via Twilio
    // - Push to in-app notification center

    notification.sent = true;
    logNotification(notification);
  } catch (error) {
    notification.sent = false;
    notification.error = String(error);
    logNotification(notification);
  }

  return notification;
}

export function getNotificationTemplates(): Record<NotificationType, string> {
  return {
    suspension:
      "Your account has been suspended. Reason: {{reason}}. Contact support if you have questions.",
    approval: "Congratulations! Your account has been verified and activated.",
    rejection:
      "Your application has been rejected. Reason: {{reason}}. Please contact support for more information.",
    wallet_adjustment:
      "Your wallet balance has been adjusted. Amount: {{amount}}. New balance: {{balance}}.",
    role_change: "Your account role has been changed to {{role}}.",
    document_approved: "Your document '{{documentName}}' has been approved.",
    document_rejected:
      "Your document '{{documentName}}' has been rejected. Please upload a new version.",
    activation: "Your account has been activated. Welcome aboard!",
    reactivation:
      "Your account suspension has been lifted. You can now access all features.",
  };
}

export function sendTemplateNotification(
  userId: string,
  type: NotificationType,
  variables: Record<string, string> = {},
  channel: "email" | "sms" | "in_app" = "in_app"
): NotificationLog {
  const templates = getNotificationTemplates();
  let content = templates[type] || "";

  // Replace variables
  Object.entries(variables).forEach(([key, value]) => {
    content = content.replace(`{{${key}}}`, value);
  });

  return sendNotification(userId, type, content, channel);
}

export function getNotifications(userId?: string): NotificationLog[] {
  try {
    const data = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!data) return [];

    const logs: NotificationLog[] = JSON.parse(data);

    if (userId) {
      return logs.filter((log) => log.userId === userId);
    }

    return logs;
  } catch (error) {
    console.error("Failed to get notifications:", error);
    return [];
  }
}
