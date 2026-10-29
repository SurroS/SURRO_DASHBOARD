"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Flag, AlertTriangle, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";

const flaggedData = {
  high: [
    {
      id: "#FLAG001",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "Surrogate",
      flaggedDate: "2024-01-15",
      reason: "Suspicious Payment Activity",
      severity: "High",
      status: "Under Investigation",
      flags: ["Payment", "Documentation"],
    },
    {
      id: "#FLAG002",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "Parent",
      flaggedDate: "2024-01-14",
      reason: "Multiple Account Creation",
      severity: "High",
      status: "Under Investigation",
      flags: ["Account", "Identity"],
    },
  ],
  medium: [
    {
      id: "#FLAG003",
      name: "Mike Wilson",
      email: "mike.w@email.com",
      role: "Agent",
      flaggedDate: "2024-01-13",
      reason: "Unusual Login Patterns",
      severity: "Medium",
      status: "Review Required",
      flags: ["Security"],
    },
  ],
  low: [
    {
      id: "#FLAG004",
      name: "Emma Davis",
      email: "emma.d@email.com",
      role: "Clinic",
      flaggedDate: "2024-01-12",
      reason: "Incomplete Profile",
      severity: "Low",
      status: "Resolved",
      flags: ["Profile"],
    },
  ],
};

const getSeverityBadgeClass = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "low":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "under investigation":
      return "bg-red-100 text-red-800 border-red-200";
    case "review required":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "resolved":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

interface FlaggedAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  flaggedDate: string;
  reason: string;
  severity: string;
  status: string;
  flags: string[];
}

const FlaggedTable = ({ accounts }: { accounts: FlaggedAccount[] }) => (
  <Card>
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Flag ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Flags</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>
                <span className="text-primary hover:underline cursor-pointer">
                  {account.email}
                </span>
              </TableCell>
              <TableCell>{account.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-red-500" />
                  {account.reason}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getSeverityBadgeClass(account.severity)}
                >
                  {account.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getStatusBadgeClass(account.status)}
                >
                  {account.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {account.flags.map((flag: string, flagIndex: number) => (
                    <Badge
                      key={flagIndex}
                      variant="outline"
                      className="text-xs"
                    >
                      {flag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Shield className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function FlaggedAccountsPage() {
  return (
    <ProtectedRoute>
      <RouteGuard>
        <MainLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Flagged Accounts</h1>
              <p className="text-gray-600">
                Review and manage accounts that have been flagged for suspicious
                activity
              </p>
            </div>

            <Tabs defaultValue="high" className="space-y-6">
              <TabsList className="grid w-fit grid-cols-3 bg-transparent p-0 h-auto gap-6">
                <TabsTrigger
                  value="high"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                >
                  High Priority
                </TabsTrigger>
                <TabsTrigger
                  value="medium"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                >
                  Medium Priority
                </TabsTrigger>
                <TabsTrigger
                  value="low"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                >
                  Low Priority
                </TabsTrigger>
              </TabsList>

              <TabsContent value="high" className="mt-6">
                <FlaggedTable accounts={flaggedData.high} />
              </TabsContent>

              <TabsContent value="medium" className="mt-6">
                <FlaggedTable accounts={flaggedData.medium} />
              </TabsContent>

              <TabsContent value="low" className="mt-6">
                <FlaggedTable accounts={flaggedData.low} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Total:{" "}
                {flaggedData.high.length +
                  flaggedData.medium.length +
                  flaggedData.low.length}{" "}
                flagged accounts
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Bulk Actions</Button>
                <Button>Flag Account</Button>
              </div>
            </div>
          </div>
        </MainLayout>
      </RouteGuard>
    </ProtectedRoute>
  );
}
