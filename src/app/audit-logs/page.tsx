"use client";

import DataTable from "@/components/Common/datatable";
import AuditLogsModal from "@/components/dashboards/AuditLogs/AuditLogsModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TableCell } from "@/components/ui/table";
import MainLayout from "@/layouts/MainLayout";
import { auditData, AuditLog } from "@/utils/mockData";
import { ArrowDownToLine } from "lucide-react";
import { useState } from "react";

export default function AuditLogsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AuditLog>();
  const dataTableHead = [
    "Date/Time",
    "User",
    "Action",
    "Affected Record",
    "IP Address",
    "Status",
    "Level",
    "Actions",
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
            datatableBody={auditData}
            datatableHeads={dataTableHead}
            emptyComponent={
              <span className="text-gray-500 text-sm font-bold">
                No data available
              </span>
            }
            renderRow={(item) => (
              <>
                <TableCell>{item.dateTime}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold text-md">{item.user}</p>
                    <p className="text-xs font-light text-gray-600">
                      {item.role}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold text-md">{item.action}</p>
                    <p className="text-xs font-light text-gray-600">
                      {item.category}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-gray-600">{item.affectedRecord}</p>
                </TableCell>
                <TableCell>{item.ipAddress}</TableCell>
                <TableCell>
                  <div
                    className={`text-center rounded-md px-1 py-1 text-xs font-semibold ${
                      item.status === "Success"
                        ? "text-green-700 bg-green-100"
                        : "text-red-600 bg-red-100"
                    }`}
                  >
                    {item.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`text-center rounded-md px-1 py-1 text-xs font-semibold ${
                      item.level === "info"
                        ? "text-blue-700 bg-blue-100"
                        : item.level === "warning"
                        ? "text-yellow-700 bg-yellow-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {item.level}
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    className="underline"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedRow(item);
                    }}
                  >
                    View
                  </button>
                </TableCell>
              </>
            )}
          />
          <AuditLogsModal
            isOpen={isModalOpen}
            selectedLog={selectedRow!}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedRow(undefined);
            }}
          />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
