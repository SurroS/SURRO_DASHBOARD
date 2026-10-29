"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { MoreHorizontal, Plus, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import MetricCard from "@/components/MetricCard/MetricCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import MainLayout from "@/layouts/MainLayout";

const employeeData = [
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
    role: "Clinic",
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
    status: "Deactivated",
    role: "Admin",
    address: "Port harcourt, Rivers, Nigeria",
  },
];

interface EmployeeTableProps {
  showMetrics?: boolean;
  title?: string;
  showLogHistory?: boolean;
}

function EmployeeTable({
  showMetrics: _showMetrics = false,
  title = "Top Performing Employees",
  showLogHistory = false,
}: EmployeeTableProps) {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        <Button
          variant="outline"
          className="border border-border text-muted-foreground hover:text-foreground"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" />
              </TableHead>
              <TableHead>S/N</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ADDRESS</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeData.map((employee, index) => (
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
                      {showLogHistory && (
                        <DropdownMenuItem
                          onClick={() =>
                            router.push("/employee-management/log-history")
                          }
                        >
                          Log history
                        </DropdownMenuItem>
                      )}
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
  );
}

function EmployeeManagementContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Employee</h1>
          <p className="text-sm text-muted-foreground">Manage all employees</p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => router.push("/employee-management/registration")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-border bg-transparent p-0 h-auto">
          <TabsTrigger
            value="overview"
            className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-4 py-2"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="employees"
            className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-4 py-2"
          >
            Employees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <MetricCard
              title="Total employees"
              value="1,300"
              className="bg-blue-600 text-white"
            />
            <MetricCard
              title="HR"
              value="1,000"
              className="bg-purple-600 text-white"
            />
            <MetricCard
              title="Marketers"
              value="200"
              className="bg-yellow-700 text-white"
            />
            <MetricCard
              title="Agent/Clinics"
              value="50"
              className="bg-green-600 text-white"
            />
            <MetricCard
              title="CSR"
              value="50"
              className="bg-red-700 text-white"
            />
          </div>
          <EmployeeTable showMetrics={true} showLogHistory={true} />
        </TabsContent>

        <TabsContent value="employees" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              className="border border-border text-muted-foreground hover:text-foreground"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <EmployeeTable title="" showLogHistory={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function EmployeeManagementPage() {
  return (
    <ProtectedRoute>
      <RouteGuard>
        <MainLayout>
          <EmployeeManagementContent />
        </MainLayout>
      </RouteGuard>
    </ProtectedRoute>
  );
}
