import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuditLog } from "@/utils/mockData";

const AuditLogsModal = ({
  isOpen,
  onClose,
  selectedLog,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedLog: AuditLog;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Details</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        <div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Log ID</p>
                <p className="text-base text-gray-900 font-mono">
                  {selectedLog?.id || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Timestamp</p>
                <p className="text-base text-gray-900">
                  {selectedLog?.dateTime || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">User</p>
                <p className="text-base text-gray-900">
                  {selectedLog?.user || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-base text-gray-900">
                  {selectedLog?.role || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Action</p>
                <p className="text-base text-gray-900">
                  {selectedLog?.action || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="text-base text-gray-900">
                  {selectedLog?.category || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Affected Record
                </p>
                <p className="text-base text-gray-900">
                  {selectedLog?.affectedRecord || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">IP Address</p>
                <p className="text-base text-gray-900 font-mono">
                  {selectedLog?.ipAddress || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedLog?.status === "Success"
                      ? "text-green-700 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  {selectedLog?.status || "N/A"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Level</p>
                <span
                  className={`inline-block px-3 py-1 capitalize rounded-full text-sm font-medium
                 ${
                   selectedLog?.level === "info"
                     ? "text-blue-700 bg-blue-100"
                     : selectedLog?.level === "warning"
                     ? "text-yellow-700 bg-yellow-100"
                     : "text-red-700 bg-red-100"
                 }
                    `}
                >
                  {selectedLog?.level || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditLogsModal;
