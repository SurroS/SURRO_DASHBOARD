"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";

const approvalData = [
  {
    id: "#APP001",
    name: "John Smith",
    email: "john.smith@email.com",
    role: "Surrogate",
    submittedDate: "2024-01-15",
    status: "Pending",
    documents: ["ID", "Medical", "Background Check"],
  },
  {
    id: "#APP002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "Parent",
    submittedDate: "2024-01-14",
    status: "Pending",
    documents: ["ID", "Financial", "Medical History"],
  },
  {
    id: "#APP003",
    name: "Mike Wilson",
    email: "mike.w@email.com",
    role: "Agent",
    submittedDate: "2024-01-13",
    status: "Under Review",
    documents: ["ID", "License", "References"],
  },
  {
    id: "#APP004",
    name: "Emma Davis",
    email: "emma.d@email.com",
    role: "Clinic",
    submittedDate: "2024-01-12",
    status: "Approved",
    documents: ["License", "Certification", "Insurance"],
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "under review":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function ApprovalsPage() {
  return (
    <ProtectedRoute>
      <RouteGuard>
        <MainLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Manual Account Approvals
              </h1>
              <p className="text-gray-600">
                Review and approve pending account applications
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Application ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalData.map((approval, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">
                          {approval.id}
                        </TableCell>
                        <TableCell>{approval.name}</TableCell>
                        <TableCell>
                          <span className="text-primary hover:underline cursor-pointer">
                            {approval.email}
                          </span>
                        </TableCell>
                        <TableCell>{approval.role}</TableCell>
                        <TableCell>{approval.submittedDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatusBadgeClass(approval.status)}
                          >
                            {approval.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {approval.documents.map((doc, docIndex) => (
                              <Badge
                                key={docIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4 text-red-600" />
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

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {approvalData.length} pending approvals
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Bulk Approve</Button>
                <Button>Review Selected</Button>
              </div>
            </div>
          </div>
        </MainLayout>
      </RouteGuard>
    </ProtectedRoute>
  );
}
