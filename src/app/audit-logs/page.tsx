"use client";

import DataTable from "@/components/Common/datatable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import MainLayout from "@/layouts/MainLayout";
import { auditData, AuditLog } from "@/utils/mockData";
import { ArrowDownToLine, Eye } from "lucide-react";
import { useMemo, useState } from "react";

export default function AuditLogsPage() {
  const dataTableHead = [
    "id",
    "User",
    "Action",
    "Category",
    "Role",
    "Affected Record",
  ];

  const databody = [
    {
      id: "1",
      user: "John Doe",
      action: "Create",
      category: "User",
      role: "Admin",
      affectedRecord: "User 1",
    },
    {
      id: "2",
      user: "Jane Smith",
      action: "Update",
      category: "Product",
      role: "HR",
      affectedRecord: "Product 1",
    },
    {
      id: "3",
      user: "Bob Johnson",
      action: "Delete",
      category: "Order",
      role: "Sales",
      affectedRecord: "Order 1",
    },
    {
      id: "4",
      user: "John Doe",
      action: "Create",
      category: "User",
      role: "Admin",
      affectedRecord: "User 1",
    },
    {
      id: "5",
      user: "Jane Smith",
      action: "Update",
      category: "Product",
      role: "HR",
      affectedRecord: "Product 1",
    },
    {
      id: "6",
      user: "Bob Johnson",
      action: "Delete",
      category: "Order",
      role: "Sales",
      affectedRecord: "Order 1",
    },
  ];

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-2xl font-semibold">Audit Logs</h1>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
              <ArrowDownToLine />
              <div>Export to CSV</div>
            </button>
          </div>
          <div className="h-5" />
          <DataTable
            datatableBody={databody}
            datatableHeads={dataTableHead}
            renderRow={(item) => (
              <>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.action}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.affectedRecord}</TableCell>
              </>
            )}
          />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
