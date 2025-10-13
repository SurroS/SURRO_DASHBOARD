"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  MousePointer,
  Users,
  Megaphone,
  Banknote,
  ChevronDown,
  X,
  CheckCircle,
} from "lucide-react";
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetricCard from "@/components/MetricCard/MetricCard";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";

const referralData = [
  {
    id: "#6548",
    name: "Benedict Isa",
    email: "email@gmail.com",
    dateJoined: "23-Apr-2023",
    status: "success",
    firstName: "Benedict",
    lastName: "Isa",
    fullId: "#2439",
    fullEmail: "benedictisa@gmail.com",
    verified: true,
  },
  {
    id: "#6548",
    name: "Benedict Isa",
    email: "email@gmail.com",
    dateJoined: "23-Apr-2023",
    status: "pending",
    firstName: "Benedict",
    lastName: "Isa",
    fullId: "#2440",
    fullEmail: "benedictisa@gmail.com",
    verified: false,
  },
  {
    id: "#6548",
    name: "Benedict Isa",
    email: "email@gmail.com",
    dateJoined: "23-Apr-2023",
    status: "success",
    firstName: "Benedict",
    lastName: "Isa",
    fullId: "#2441",
    fullEmail: "benedictisa@gmail.com",
    verified: true,
  },
  {
    id: "#6548",
    name: "Benedict Isa",
    email: "email@gmail.com",
    dateJoined: "23-Apr-2023",
    status: "pending",
    firstName: "Benedict",
    lastName: "Isa",
    fullId: "#2442",
    fullEmail: "benedictisa@gmail.com",
    verified: false,
  },
];

const visitTrendData = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 35 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 60 },
  { month: "May", value: 40 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 85 },
  { month: "Aug", value: 65 },
  { month: "Sep", value: 75 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 90 },
  { month: "Dec", value: 95 },
];

function ReferralsContent() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [entriesPerPage, setEntriesPerPage] = useState("10");

  const metrics = [
    {
      title: "Total Number Of Clicks",
      value: "8,032",
      icon: MousePointer,
      subtitle: "6.92%",
    },
    {
      title: "Total Number of Referrals",
      value: "8,032",
      icon: Users,
      subtitle: "24.72%",
    },
    {
      title: "Total Campaigns Created",
      value: "41",
      icon: Megaphone,
    },
    {
      title: "Payouts",
      value: "₦231,920.00",
      icon: Banknote,
      subtitle: "6.12%",
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "success":
        return "success";
      case "pending":
        return "pending";
      case "failed":
        return "expired";
      default:
        return "pending";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Referrals Management</h1>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-background border-border z-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-background border-border shadow-lg z-50"
              align="end"
            >
              <DropdownMenuItem>All Status</DropdownMenuItem>
              <DropdownMenuItem>Success</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Failed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => router.push("/referrals/create-campaign")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create a Campaign
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="flex items-center justify-end">
        <Button variant="ghost" className="text-primary hover:text-primary">
          See all →
        </Button>
      </div>

      {/* Visit Trend Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Visit trend</h3>
          <Select defaultValue="this-year">
            <SelectTrigger className="w-32 bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
              <SelectItem value="this-year">This year</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Simple chart visualization */}
        <div className="h-64 flex items-end justify-between gap-2">
          {visitTrendData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-primary/20 rounded-t-sm relative"
                style={{ height: `${(data.value / 100) * 200}px` }}
              >
                <div
                  className="absolute bottom-0 w-full bg-primary rounded-t-sm"
                  style={{ height: `${(data.value / 100) * 180}px` }}
                />
              </div>
              <span className="text-xs text-muted-foreground mt-2">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Referral List */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Referral List</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-background border-border z-50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Sort By
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-background border-border shadow-lg z-50"
                  align="end"
                >
                  <DropdownMenuItem onClick={() => setSortBy("date")}>
                    Date Joined
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("status")}>
                    Status
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralData.map((referral, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{referral.id}</TableCell>
                  <TableCell>
                    <button
                      className="text-primary hover:underline cursor-pointer"
                      onClick={() => setSelectedUser(referral)}
                    >
                      {referral.name}
                    </button>
                  </TableCell>
                  <TableCell>
                    <span className="text-primary hover:underline cursor-pointer">
                      {referral.email}
                    </span>
                  </TableCell>
                  <TableCell>{referral.dateJoined}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={getStatusVariant(referral.status) as any}
                    >
                      {referral.status === "success" ? "Success" : "Failed"}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="p-6 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Showing</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={setEntriesPerPage}
                >
                  <SelectTrigger className="w-16 h-8 bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border shadow-lg z-50">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">of 50</span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <div className="flex gap-1">
                  <Button variant="default" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    4
                  </Button>
                  <Button variant="outline" size="sm">
                    5
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Information Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md bg-background border-border">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>User information</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedUser(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">First Name</span>
                <span className="font-medium">{selectedUser.firstName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Name</span>
                <span className="font-medium">{selectedUser.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID</span>
                <span className="font-medium">{selectedUser.fullId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email address</span>
                <span className="font-medium">{selectedUser.fullEmail}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-status-success">
                    Successfully verified
                  </span>
                  {selectedUser.verified && (
                    <CheckCircle className="h-4 w-4 text-status-success" />
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ReferralsPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <ReferralsContent />
      </MainLayout>
    </ProtectedRoute>
  );
}
