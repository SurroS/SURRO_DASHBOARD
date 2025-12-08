"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole } from "@/types/user";

interface ChangeRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  currentRole: UserRole;
  onConfirm: (newRole: UserRole) => void;
}

export default function ChangeRoleModal({
  open,
  onOpenChange,
  userName,
  currentRole,
  onConfirm,
}: ChangeRoleModalProps) {
  const [newRole, setNewRole] = useState<UserRole>(currentRole);

  const handleConfirm = () => {
    if (newRole === currentRole) {
      return;
    }
    onConfirm(newRole);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Change the role for {userName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Changing a user&apos;s role may affect their access to features and permissions.
              This action will be logged.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="current-role">Current Role</Label>
            <Input
              id="current-role"
              value={currentRole}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-role">New Role *</Label>
            <Select value={newRole} onValueChange={(v) => setNewRole(v as UserRole)}>
              <SelectTrigger id="new-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="surrogate">Surrogate</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="clinic">Clinic</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={newRole === currentRole}
          >
            Change Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

