"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ChevronRight } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";

const employeeLogData = [
  {
    id: "#0103",
    name: "Ivan Bernard",
    date: "6 April 2023",
    status: "Active",
    role: "Admin",
    address: "Port harcourt, Rivers, Nigeria",
  },
  {
    id: "#0103",
    name: "Ivan Bernard",
    date: "6 April 2023",
    status: "Deactivated",
    role: "HR",
    address: "Port harcourt, Rivers, Nigeria",
  },
  {
    id: "#0103",
    name: "Ivan Bernard",
    date: "6 April 2023",
    status: "Active",
    role: "Marketer",
    address: "Port harcourt, Rivers, Nigeria",
  },
  {
    id: "#0103",
    name: "Ivan Bernard",
    date: "6 April 2023",
    status: "Active",
    role: "Agent",
    address: "Port harcourt, Rivers, Nigeria",
  },
  {
    id: "#0103",
    name: "Ivan Bernard",
    date: "6 April 2023",
    status: "Active",
    role: "Admin",
    address: "Port harcourt, Rivers, Nigeria",
  },
  {
    id: "#0103",
    name: "Ivan Bernard",
    date: "6 April 2023",
    status: "Active",
    role: "Admin",
    address: "Port harcourt, Rivers, Nigeria",
  },
];

function EmployeeLogHistoryContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Employee Management
        </h1>
        <p className="text-sm text-muted-foreground">Manage all employees</p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Employee Management</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-foreground font-medium">
          Employee log history
        </span>
      </div>

      <div className="space-y-4">
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" />
                </TableHead>
                <TableHead>SID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>ROLE</TableHead>
                <TableHead>ADDRESS</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeLogData.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "Active" ? "default" : "secondary"
                      }
                      className={
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuItem>Log history</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
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
      </div>
    </div>
  );
}

export default function EmployeeLogHistoryPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <EmployeeLogHistoryContent />
      </MainLayout>
    </ProtectedRoute>
  );
}
