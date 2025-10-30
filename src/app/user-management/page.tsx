"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";

const userData = {
  surrogate: [
    {
      id: "#6548",
      created: "User name",
      email: "email@gmail.com",
      role: "Surrogate",
      profit: "$154",
      status: "Pending",
    },
    {
      id: "#6549",
      created: "Jane Smith",
      email: "jane@gmail.com",
      role: "Surrogate",
      profit: "$200",
      status: "Active",
    },
    {
      id: "#6550",
      created: "Mike Johnson",
      email: "mike@gmail.com",
      role: "Surrogate",
      profit: "$175",
      status: "Pending",
    },
    {
      id: "#6551",
      created: "Sarah Wilson",
      email: "sarah@gmail.com",
      role: "Surrogate",
      profit: "$320",
      status: "Active",
    },
    {
      id: "#6552",
      created: "David Brown",
      email: "david@gmail.com",
      role: "Surrogate",
      profit: "$89",
      status: "Inactive",
    },
  ],
  parents: [
    {
      id: "#7001",
      created: "Parent Name",
      email: "parent@gmail.com",
      role: "Parent",
      profit: "$0",
      status: "Active",
    },
    {
      id: "#7002",
      created: "John Parent",
      email: "john.p@gmail.com",
      role: "Parent",
      profit: "$0",
      status: "Active",
    },
    {
      id: "#7003",
      created: "Lisa Parent",
      email: "lisa.p@gmail.com",
      role: "Parent",
      profit: "$0",
      status: "Pending",
    },
  ],
  clinics: [
    {
      id: "#8001",
      created: "Clinic Name",
      email: "clinic@gmail.com",
      role: "Clinic",
      profit: "$1500",
      status: "Active",
    },
    {
      id: "#8002",
      created: "City Medical",
      email: "city@gmail.com",
      role: "Clinic",
      profit: "$2200",
      status: "Active",
    },
    {
      id: "#8003",
      created: "Health Center",
      email: "health@gmail.com",
      role: "Clinic",
      profit: "$1800",
      status: "Pending",
    },
  ],
  agents: [
    {
      id: "#9001",
      created: "Agent Name",
      email: "agent@gmail.com",
      role: "Agent",
      profit: "$500",
      status: "Active",
    },
    {
      id: "#9002",
      created: "Tom Agent",
      email: "tom@gmail.com",
      role: "Agent",
      profit: "$600",
      status: "Active",
    },
    {
      id: "#9003",
      created: "Emma Agent",
      email: "emma@gmail.com",
      role: "Agent",
      profit: "$450",
      status: "Pending",
    },
  ],
};

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const UserTable = ({ users }: { users: typeof userData.surrogate }) => (
  <Card>
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Order Id</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.created}</TableCell>
              <TableCell>
                <span className="text-primary hover:underline cursor-pointer">
                  {user.email}
                </span>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.profit}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getStatusBadgeClass(user.status)}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

function UserManagementContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">User Management</h1>
      </div>

      <Tabs defaultValue="surrogate" className="space-y-6">
        <TabsList className="grid w-fit grid-cols-4 bg-transparent p-0 h-auto gap-6">
          <TabsTrigger
            value="surrogate"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
          >
            Surrogate
          </TabsTrigger>
          <TabsTrigger
            value="parents"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
          >
            Parents
          </TabsTrigger>
          <TabsTrigger
            value="clinics"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
          >
            Clinics
          </TabsTrigger>
          <TabsTrigger
            value="agents"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
          >
            Agents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="surrogate" className="mt-6">
          <UserTable users={userData.surrogate} />
        </TabsContent>

        <TabsContent value="parents" className="mt-6">
          <UserTable users={userData.parents} />
        </TabsContent>

        <TabsContent value="clinics" className="mt-6">
          <UserTable users={userData.clinics} />
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <UserTable users={userData.agents} />
        </TabsContent>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing</span>
            <Select defaultValue="10">
              <SelectTrigger className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>of 50</span>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" size="sm" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive size="sm">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="sm">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="sm">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="sm">
                  4
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="sm">
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" size="sm" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Tabs>
    </div>
  );
}

export default function UserManagementPage() {
  return (
    <ProtectedRoute>
      <RouteGuard>
        <MainLayout>
          <UserManagementContent />
        </MainLayout>
      </RouteGuard>
    </ProtectedRoute>
  );
}
