"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, UserX, UserCheck, AlertTriangle } from "lucide-react";
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

const suspensionData = {
  active: [
    {
      id: "#SUS001",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "Surrogate",
      suspendedDate: "2024-01-10",
      reason: "Violation of Terms",
      status: "Suspended",
      duration: "30 days",
    },
    {
      id: "#SUS002",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "Parent",
      suspendedDate: "2024-01-08",
      reason: "Payment Issues",
      status: "Suspended",
      duration: "14 days",
    },
  ],
  pending: [
    {
      id: "#SUS003",
      name: "Mike Wilson",
      email: "mike.w@email.com",
      role: "Agent",
      suspendedDate: "2024-01-15",
      reason: "Suspicious Activity",
      status: "Pending Review",
      duration: "TBD",
    },
  ],
  lifted: [
    {
      id: "#SUS004",
      name: "Emma Davis",
      email: "emma.d@email.com",
      role: "Clinic",
      suspendedDate: "2024-01-05",
      liftedDate: "2024-01-12",
      reason: "Documentation Issues",
      status: "Lifted",
      duration: "7 days",
    },
  ],
};

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "suspended":
      return "bg-red-100 text-red-800 border-red-200";
    case "pending review":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "lifted":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

interface Suspension {
  id: string;
  name: string;
  email: string;
  role: string;
  suspendedDate: string;
  reason: string;
  status: string;
  duration: string;
}

const SuspensionTable = ({ suspensions }: { suspensions: Suspension[] }) => (
  <Card>
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Suspension ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suspensions.map((suspension, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{suspension.id}</TableCell>
              <TableCell>{suspension.name}</TableCell>
              <TableCell>
                <span className="text-primary hover:underline cursor-pointer">
                  {suspension.email}
                </span>
              </TableCell>
              <TableCell>{suspension.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  {suspension.reason}
                </div>
              </TableCell>
              <TableCell>{suspension.duration}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getStatusBadgeClass(suspension.status)}
                >
                  {suspension.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <UserX className="h-4 w-4 text-red-600" />
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

export default function SuspensionsPage() {
  return (
    <ProtectedRoute>
      <RouteGuard>
        <MainLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">User Suspensions</h1>
              <p className="text-gray-600">
                Manage user account suspensions and review pending cases
              </p>
            </div>

            <Tabs defaultValue="active" className="space-y-6">
              <TabsList className="grid w-fit grid-cols-3 bg-transparent p-0 h-auto gap-6">
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                >
                  Active Suspensions
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                >
                  Pending Review
                </TabsTrigger>
                <TabsTrigger
                  value="lifted"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:shadow-none border-0 rounded-md px-4 py-2"
                >
                  Lifted Suspensions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                <SuspensionTable suspensions={suspensionData.active} />
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <SuspensionTable suspensions={suspensionData.pending} />
              </TabsContent>

              <TabsContent value="lifted" className="mt-6">
                <SuspensionTable suspensions={suspensionData.lifted} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Total:{" "}
                {suspensionData.active.length +
                  suspensionData.pending.length +
                  suspensionData.lifted.length}{" "}
                suspensions
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Bulk Actions</Button>
                <Button>New Suspension</Button>
              </div>
            </div>
          </div>
        </MainLayout>
      </RouteGuard>
    </ProtectedRoute>
  );
}
