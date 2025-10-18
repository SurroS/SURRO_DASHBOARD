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
