export interface KPIData {
  title: string;
  value: string;
  change: number;
  breakdown?: { label: string; value: number }[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
}

export const kpiData: KPIData[] = [
  {
    title: "Total Users",
    value: "12,458",
    change: 12.5,
    breakdown: [
      { label: "Surrogates", value: 4823 },
      { label: "Parents", value: 3912 },
      { label: "Clinics", value: 2145 },
      { label: "Agents", value: 1578 },
    ],
  },
  {
    title: "Total Employees",
    value: "248",
    change: 5.2,
    breakdown: [
      { label: "Support", value: 98 },
      { label: "Compliance", value: 65 },
      { label: "Finance", value: 42 },
      { label: "Admin", value: 43 },
    ],
  },
  {
    title: "Active Users",
    value: "8,945",
    change: 8.3,
    breakdown: [
      { label: "Daily", value: 3245 },
      { label: "Weekly", value: 5678 },
      { label: "Monthly", value: 8945 },
    ],
  },
  {
    title: "Total Revenue",
    value: "$2.4M",
    change: 15.7,
    breakdown: [
      { label: "MRR", value: 156000 },
      { label: "ARR", value: 1872000 },
      { label: "One-time", value: 528000 },
    ],
  },
  {
    title: "Support Tickets",
    value: "1,234",
    change: -3.2,
    breakdown: [
      { label: "Open", value: 342 },
      { label: "Resolved", value: 892 },
      { label: "SLA Breach", value: 12 },
    ],
  },
  {
    title: "Compliance Status",
    value: "94.2%",
    change: 2.1,
    breakdown: [
      { label: "Verified", value: 11736 },
      { label: "Pending", value: 722 },
    ],
  },
  {
    title: "System Uptime",
    value: "99.8%",
    change: 0.1,
    breakdown: [
      { label: "Incidents", value: 3 },
      { label: "Uptime Hours", value: 8756 },
    ],
  },
  {
    title: "Match Success",
    value: "87.5%",
    change: 4.2,
    breakdown: [
      { label: "Completed", value: 1245 },
      { label: "In Progress", value: 456 },
      { label: "Abandoned", value: 89 },
    ],
  },
];

export const userGrowthData: ChartDataPoint[] = [
  { label: "Jan", value: 8500 },
  { label: "Feb", value: 9200 },
  { label: "Mar", value: 9800 },
  { label: "Apr", value: 10500 },
  { label: "May", value: 11200 },
  { label: "Jun", value: 12458 },
];

export const employeeActivityData: ChartDataPoint[] = [
  { label: "Support", value: 892 },
  { label: "Compliance", value: 645 },
  { label: "Finance", value: 423 },
  { label: "Security", value: 234 },
  { label: "Admin", value: 567 },
];

export const revenueBreakdownData: ChartDataPoint[] = [
  { label: "Subscriptions", value: 1872000, category: "Recurring" },
  { label: "Payouts", value: 348000, category: "Services" },
  { label: "Premium Features", value: 180000, category: "One-time" },
];

export const engagementData: ChartDataPoint[] = [
  { label: "Mon", value: 3245 },
  { label: "Tue", value: 3567 },
  { label: "Wed", value: 3892 },
  { label: "Thu", value: 3456 },
  { label: "Fri", value: 3234 },
  { label: "Sat", value: 2345 },
  { label: "Sun", value: 2567 },
];

export const supportTrendsData: ChartDataPoint[] = [
  { label: "Week 1", value: 234 },
  { label: "Week 2", value: 312 },
  { label: "Week 3", value: 289 },
  { label: "Week 4", value: 399 },
];

export const complianceReportsData: ChartDataPoint[] = [
  { label: "Approved", value: 11736 },
  { label: "Rejected", value: 342 },
  { label: "Pending", value: 380 },
];

export const geographicData: ChartDataPoint[] = [
  { label: "Nigeria", value: 4523 },
  { label: "USA", value: 3214 },
  { label: "UK", value: 2145 },
  { label: "Canada", value: 1234 },
  { label: "Others", value: 1342 },
];

export const userTypeData: ChartDataPoint[] = [
  { label: "Surrogates", value: 4823 },
  { label: "Parents", value: 3912 },
  { label: "Clinics", value: 2145 },
  { label: "Agents", value: 1578 },
];

export const referralConversionData = {
  referrals: 2345,
  signups: 1876,
  paid: 1234,
  matched: 892,
};

export const topPerformers = [
  { name: "Lagos Fertility Clinic", referrals: 234, conversions: 189 },
  { name: "Agent John Smith", referrals: 198, conversions: 156 },
  { name: "Care Bridge Agency", referrals: 176, conversions: 142 },
  { name: "Agent Sarah Johnson", referrals: 145, conversions: 123 },
  { name: "Abuja Medical Center", referrals: 134, conversions: 109 },
];

// Audit Log Interface
export interface AuditLog {
  id: number;
  dateTime: string;
  user: string;
  role: string;
  action: string;
  category: string;
  affectedRecord: string;
  ipAddress: string;
  status: "Success" | "Failed";
  level: "info" | "warning" | "critical";
}

export const auditData: AuditLog[] = [
  {
    id: 1,
    dateTime: "Oct 29, 2025, 09:18 AM",
    user: "Sarah Johnson",
    role: "Super Admin",
    action: "Exported user data",
    category: "Admin Operations",
    affectedRecord: "Users Database",
    ipAddress: "192.168.1.45",
    status: "Success",
    level: "warning",
  },
  {
    id: 2,
    dateTime: "Oct 29, 2025, 08:18 AM",
    user: "John Smith",
    role: "Intended Parent",
    action: "Profile update",
    category: "Profile Changes",
    affectedRecord: "User Profile #4523",
    ipAddress: "203.45.67.89",
    status: "Success",
    level: "info",
  },
  {
    id: 3,
    dateTime: "Oct 29, 2025, 07:18 AM",
    user: "Lagos Fertility Clinic",
    role: "Clinic",
    action: "Document upload",
    category: "Document Activities",
    affectedRecord: "Medical Certificate #MC-8901",
    ipAddress: "41.203.12.45",
    status: "Success",
    level: "info",
  },
  {
    id: 4,
    dateTime: "Oct 29, 2025, 06:18 AM",
    user: "Michael Brown",
    role: "Compliance Admin",
    action: "Document approval",
    category: "Document Activities",
    affectedRecord: "Medical Certificate #MC-8901",
    ipAddress: "192.168.1.78",
    status: "Success",
    level: "info",
  },
  {
    id: 5,
    dateTime: "Oct 29, 2025, 05:18 AM",
    user: "Anonymous",
    role: "Guest",
    action: "Failed login attempt",
    category: "Authentication & Access",
    affectedRecord: "Login System",
    ipAddress: "103.45.78.12",
    status: "Failed",
    level: "critical",
  },
  {
    id: 6,
    dateTime: "Oct 29, 2025, 04:18 AM",
    user: "Emma Wilson",
    role: "Surrogate",
    action: "Login",
    category: "Authentication & Access",
    affectedRecord: "User Session #7821",
    ipAddress: "98.234.56.78",
    status: "Success",
    level: "info",
  },
  {
    id: 7,
    dateTime: "Oct 28, 2025, 09:18 AM",
    user: "David Chen",
    role: "Finance Admin",
    action: "Transaction processed",
    category: "Transactions",
    affectedRecord: "Payment #PAY-4567",
    ipAddress: "192.168.1.89",
    status: "Success",
    level: "info",
  },
  {
    id: 8,
    dateTime: "Oct 28, 2025, 08:18 AM",
    user: "Care Bridge Agency",
    role: "Intermediary Agent",
    action: "Referral activated",
    category: "Transactions",
    affectedRecord: "Referral #REF-8923",
    ipAddress: "78.123.45.67",
    status: "Success",
    level: "info",
  },
  {
    id: 9,
    dateTime: "Oct 28, 2025, 07:18 AM",
    user: "Lisa Anderson",
    role: "Support Admin",
    action: "User suspension",
    category: "Admin Operations",
    affectedRecord: "User Account #3421",
    ipAddress: "192.168.1.56",
    status: "Success",
    level: "warning",
  },
  {
    id: 10,
    dateTime: "Oct 28, 2025, 06:18 AM",
    user: "Robert Taylor",
    role: "Intended Parent",
    action: "Message sent",
    category: "Communication Logs",
    affectedRecord: "Conversation #CONV-5634",
    ipAddress: "156.78.90.12",
    status: "Success",
    level: "info",
  },
];
