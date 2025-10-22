export interface AuditEvent {
  id: string;
  action: string;
  userId: string;
  adminId: string;
  adminEmail: string;
  timestamp: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditFilters {
  startDate?: string;
  endDate?: string;
  adminId?: string;
  action?: string;
  userId?: string;
}

const AUDIT_LOG_KEY = "surro_audit_logs";

/**
 * Log an audit event
 */
export function logAuditEvent(
  action: string,
  userId: string,
  adminId: string,
  adminEmail: string,
  details: Record<string, unknown> = {},
  ipAddress?: string,
  userAgent?: string
): void {
  try {
    const event: AuditEvent = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action,
      userId,
      adminId,
      adminEmail,
      timestamp: new Date().toISOString(),
      details,
      ipAddress,
      userAgent,
    };

    // Get existing logs
    const existingLogs = getAuditLogs();

    // Add new event to beginning of array
    const updatedLogs = [event, ...existingLogs];

    // Keep only last 1000 events to prevent localStorage bloat
    const trimmedLogs = updatedLogs.slice(0, 1000);

    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(trimmedLogs));
  } catch (error) {
    console.error("Failed to log audit event:", error);
  }
}

/**
 * Get audit logs with optional filtering
 */
export function getAuditLogs(filters?: AuditFilters): AuditEvent[] {
  try {
    const logsJson = localStorage.getItem(AUDIT_LOG_KEY);
    if (!logsJson) return [];

    let logs: AuditEvent[] = JSON.parse(logsJson);

    if (filters) {
      logs = logs.filter((log) => {
        if (filters.startDate && log.timestamp < filters.startDate)
          return false;
        if (filters.endDate && log.timestamp > filters.endDate) return false;
        if (filters.adminId && log.adminId !== filters.adminId) return false;
        if (filters.action && log.action !== filters.action) return false;
        if (filters.userId && log.userId !== filters.userId) return false;
        return true;
      });
    }

    return logs;
  } catch (error) {
    console.error("Failed to retrieve audit logs:", error);
    return [];
  }
}

/**
 * Get audit logs for a specific user
 */
export function getUserAuditLogs(userId: string): AuditEvent[] {
  return getAuditLogs({ userId });
}

/**
 * Get audit logs for a specific admin
 */
export function getAdminAuditLogs(adminId: string): AuditEvent[] {
  return getAuditLogs({ adminId });
}

/**
 * Clear audit logs (for testing purposes)
 */
export function clearAuditLogs(): void {
  localStorage.removeItem(AUDIT_LOG_KEY);
}

/**
 * Get audit statistics
 */
export function getAuditStats(days: number = 30): {
  totalEvents: number;
  eventsByAction: Record<string, number>;
  eventsByAdmin: Record<string, number>;
  recentEvents: AuditEvent[];
} {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const recentLogs = getAuditLogs({
    startDate: cutoffDate.toISOString(),
  });

  const eventsByAction: Record<string, number> = {};
  const eventsByAdmin: Record<string, number> = {};

  recentLogs.forEach((log) => {
    eventsByAction[log.action] = (eventsByAction[log.action] || 0) + 1;
    eventsByAdmin[log.adminEmail] = (eventsByAdmin[log.adminEmail] || 0) + 1;
  });

  return {
    totalEvents: recentLogs.length,
    eventsByAction,
    eventsByAdmin,
    recentEvents: recentLogs.slice(0, 10),
  };
}
