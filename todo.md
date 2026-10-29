# Backend TODO — Endpoints Needed to Complete the Dashboard

Base URL: `https://surroserver-production.up.railway.app`
All protected endpoints require `Authorization: Bearer <JWT>` header.

---

## PRIORITY 1 — Analytics & Dashboard Stats

Powers every dashboard's stat cards and charts. Without these, all 8 role-based dashboards show fake data.

| # | Endpoint | Method | Serves | Request | Response |
|---|----------|--------|--------|---------|----------|
| 1 | `/api/v1/admin/analytics/overview` | GET | GeneralAdmin, SuperAdmin dashboards | `?period=day\|week\|month\|year` | `{ totalUsers, pendingApprovals, openTickets, totalRevenue, userGrowthPercent, systemHealth }` |
| 2 | `/api/v1/admin/analytics/users` | GET | UserGrowthOverTime, UserDistribution charts | `?startDate, endDate, groupBy` | `{ data: [{ date, count, role }] }` |
| 3 | `/api/v1/admin/analytics/revenue` | GET | FinanceDashboard, RevenueAndFinancial chart | `?startDate, endDate` | `{ totalRevenue, monthlyRevenue, avgTransaction, transactions: [] }` |
| 4 | `/api/v1/admin/analytics/geo` | GET | GeographicDistribution chart | `?groupBy=country\|state` | `{ data: [{ region, count, percentage }] }` |
| 5 | `/api/v1/admin/analytics/active-users` | GET | DailyActiveUsers chart | `?startDate, endDate` | `{ data: [{ date, count }] }` |
| 6 | `/api/v1/admin/analytics/activity-feed` | GET | Recent Activities on all dashboards | `?limit` | `{ data: [{ id, type, user, action, timestamp, status }] }` |

---

## PRIORITY 2 — Tickets / Support System

SupportDashboard shows Total Tickets, Open Tickets, Resolved Today. Tickets page is placeholder.

| # | Endpoint | Method | Serves | Request | Response |
|---|----------|--------|--------|---------|----------|
| 7 | `/api/v1/tickets` | GET | SupportDashboard, Tickets page | `?page, limit, status, priority` | `PaginatedResponse<Ticket>` |
| 8 | `/api/v1/tickets` | POST | Tickets page | `{ subject, description, priority, userId }` | `Ticket` |
| 9 | `/api/v1/tickets/{id}` | GET | Ticket detail | — | `Ticket` |
| 10 | `/api/v1/tickets/{id}` | PATCH | Update ticket | `{ status, assignedTo, priority }` | `Ticket` |
| 11 | `/api/v1/tickets/{id}/reply` | POST | Ticket conversation | `{ message }` | `TicketReply` |
| 12 | `/api/v1/admin/tickets/stats` | GET | SupportDashboard stat cards | — | `{ total, open, resolvedToday, avgResponseTime }` |

### Ticket Model
```prisma
model Ticket {
  id          String   @id @default(uuid())
  subject     String
  description String
  priority    TicketPriority  // LOW, MEDIUM, HIGH, URGENT
  status      TicketStatus    // OPEN, IN_PROGRESS, RESOLVED, CLOSED
  userId      String
  assignedTo  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  replies     TicketReply[]
}

model TicketReply {
  id        String   @id @default(uuid())
  ticketId  String
  message   String
  authorId  String
  createdAt DateTime @default(now())
}
```

---

## PRIORITY 3 — Audit Logs

GeneralAdminDashboard shows Audit Logs count. Audit Logs page exists but uses localStorage.

| # | Endpoint | Method | Serves | Request | Response |
|---|----------|--------|--------|---------|----------|
| 13 | `/api/v1/admin/audit-logs` | GET | Audit Logs page | `?page, limit, action, userId, startDate, endDate` | `PaginatedResponse<AuditLog>` |
| 14 | `/api/v1/admin/audit-logs/stats` | GET | GeneralAdminDashboard | — | `{ total, today, byAction: {} }` |

### AuditLog Model
```prisma
model AuditLog {
  id        String   @id @default(uuid())
  action    String
  userId    String
  adminId   String
  adminEmail String
  timestamp DateTime @default(now())
  details   Json?
  ipAddress String?
  userAgent String?
}
```

---

## PRIORITY 4 — Flags / Suspended Accounts

SupportDashboard shows Flagged Accounts. OperationsDashboard shows Suspended Users. Pages exist but are hardcoded.

| # | Endpoint | Method | Serves | Request | Response |
|---|----------|--------|--------|---------|----------|
| 15 | `/api/v1/admin/flags` | GET | Flagged Accounts page | `?page, limit, severity, status` | `PaginatedResponse<Flag>` |
| 16 | `/api/v1/admin/flags` | POST | Flag Account button | `{ userId, reason, severity }` | `Flag` |
| 17 | `/api/v1/admin/flags/{id}/resolve` | PATCH | Clear flag action | `{ resolution }` | `Flag` |
| 18 | `/api/v1/admin/flags/{id}/escalate` | PATCH | Escalate action | `{ reason }` | `Flag` |
| 19 | `/api/v1/admin/suspensions` | GET | Suspensions page | `?page, limit, status` | `PaginatedResponse<Suspension>` |
| 20 | `/api/v1/admin/suspensions` | POST | New Suspension button | `{ userId, reason, duration }` | `Suspension` |
| 21 | `/api/v1/admin/suspensions/{id}/lift` | PATCH | Lift suspension action | — | `Suspension` |
| 22 | `/api/v1/admin/flags/stats` | GET | SupportDashboard | — | `{ high, medium, low, total }` |
| 23 | `/api/v1/admin/suspensions/stats` | GET | OperationsDashboard | — | `{ active, pending, lifted }` |

### Flag Model
```prisma
model Flag {
  id        String       @id @default(uuid())
  userId    String
  reason    String
  severity  FlagSeverity // LOW, MEDIUM, HIGH
  status    FlagStatus   // UNDER_INVESTIGATION, REVIEW_REQUIRED, RESOLVED
  flags     String[]
  createdAt DateTime     @default(now())
  resolvedAt DateTime?
}

enum FlagSeverity { LOW MEDIUM HIGH }
enum FlagStatus { UNDER_INVESTIGATION REVIEW_REQUIRED RESOLVED }
```

### Suspension Model
```prisma
model Suspension {
  id            String            @id @default(uuid())
  userId        String
  reason        String
  duration      Int?              // days
  status        SuspensionStatus  // ACTIVE, PENDING_REVIEW, LIFTED
  suspendedAt   DateTime          @default(now())
  liftedAt      DateTime?
}

enum SuspensionStatus { ACTIVE PENDING_REVIEW LIFTED }
```

---

## PRIORITY 5 — Referrals

GeneralAdminDashboard shows Active Referrals. Referrals page exists but is hardcoded.

| # | Endpoint | Method | Serves | Request | Response |
|---|----------|--------|--------|---------|----------|
| 24 | `/api/v1/admin/referrals` | GET | Referrals page | `?page, limit, status` | `PaginatedResponse<Referral>` |
| 25 | `/api/v1/admin/referrals/stats` | GET | GeneralAdminDashboard | — | `{ total, active, rewarded, pending }` |
| 26 | `/api/v1/admin/referrals/campaigns` | GET | Referrals page | `?page, limit` | `PaginatedResponse<Campaign>` |
| 27 | `/api/v1/admin/referrals/campaigns` | POST | Create Campaign page | `{ name, type, budget, targetAudience }` | `Campaign` |

---

## PRIORITY 6 — Employees

Employee Management page is fully built. No employee concept exists in backend.

| # | Endpoint | Method | Serves | Request | Response |
|---|----------|--------|--------|---------|----------|
| 28 | `/api/v1/admin/employees` | GET | Employee Management page | `?page, limit, role, status` | `PaginatedResponse<Employee>` |
| 29 | `/api/v1/admin/employees` | POST | Registration form | `{ name, email, role, address, phone }` | `Employee` |
| 30 | `/api/v1/admin/employees/{id}` | PATCH | Update action | `{ name, email, role, status }` | `Employee` |
| 31 | `/api/v1/admin/employees/{id}` | DELETE | Delete action | — | `MessageResponse` |
| 32 | `/api/v1/admin/employees/stats` | GET | Employee Management Overview | — | `{ total, byRole: {}, active, deactivated }` |

---

## PRIORITY 7 — Marketing / Campaigns

MarketingDashboard shows Total Campaigns, Messages Sent, Response Rate. No campaign system exists.

| # | Endpoint | Method | Serves | Request | Response |
|---|----------|--------|--------|---------|----------|
| 33 | `/api/v1/admin/campaigns` | GET | MarketingDashboard | `?page, limit, status` | `PaginatedResponse<Campaign>` |
| 34 | `/api/v1/admin/campaigns` | POST | Create campaign | `{ name, type, content, targetRole }` | `Campaign` |
| 35 | `/api/v1/admin/campaigns/{id}` | PATCH | Update campaign | `{ name, content, status }` | `Campaign` |
| 36 | `/api/v1/admin/campaigns/{id}` | DELETE | Delete campaign | — | `MessageResponse` |
| 37 | `/api/v1/admin/campaigns/stats` | GET | MarketingDashboard | — | `{ total, messagesSent, responseRate, leadsGenerated }` |

---

## PRIORITY 8 — Payment History (Admin View)

FinanceDashboard shows recent transactions. `GET /wallet` only returns current user's wallet.

| # | Endpoint | Method | Serves | Request | Response |
|---|----------|--------|--------|---------|----------|
| 38 | `/api/v1/admin/transactions` | GET | FinanceDashboard, Subscriptions Payment History | `?page, limit, status, type, startDate, endDate` | `PaginatedResponse<Transaction>` |
| 39 | `/api/v1/admin/transactions/{id}` | GET | Payment detail modal | — | `Transaction` |
| 40 | `/api/v1/admin/wallets` | GET | Admin wallet overview | `?page, limit` | `PaginatedResponse<Wallet>` |

---

## PRIORITY 9 — Existing Endpoints Needing Additions

| # | Current Endpoint | Missing | Needed For |
|---|-----------------|---------|------------|
| 41 | `GET /admin/users` | `?isApproved=true\|false` filter | Approvals page — filter pending vs approved |
| 42 | `GET /admin/users` | `?role=` filter param | User Management tabs — filter by role server-side |
| 43 | `GET /admin/users` | `?isVerified=true\|false` filter | OperationsDashboard — verified vs unverified |
| 44 | `GET /admin/subscription-plans` | Response needs `userCount` field | Subscriptions page — show "25 of 750 users" |
| 45 | `POST /notifications` | Needs `role: ALL\|SURROGATE\|...` targeting | Admin send notification to role group |

---

## Summary

| Category | Endpoints | Pages Affected |
|----------|-----------|----------------|
| Analytics | 6 | All 8 dashboards + Analytics |
| Tickets | 6 | SupportDashboard, Tickets |
| Audit Logs | 2 | Audit Logs, GeneralAdmin, SuperAdmin |
| Flags | 5 | Flagged Accounts, Support, Operations |
| Suspensions | 4 | Suspensions, Operations |
| Referrals | 4 | Referrals, GeneralAdmin |
| Employees | 5 | Employee Management |
| Campaigns | 5 | MarketingDashboard |
| Transactions | 3 | FinanceDashboard, Subscriptions |
| Existing fixes | 5 | Multiple |
| **TOTAL** | **45** | **13 pages** |
