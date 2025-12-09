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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WalletAdjustmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName: string;
  currentBalance: number;
  onConfirm: (amount: number, type: "credit" | "debit", reason: string) => void;
}

export default function WalletAdjustmentModal({
  open,
  onOpenChange,
  userId: _userId,
  userName,
  currentBalance,
  onConfirm,
}: WalletAdjustmentModalProps) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"credit" | "debit">("credit");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0 || !reason.trim()) {
      return;
    }
    onConfirm(numAmount, type, reason);
    setAmount("");
    setType("credit");
    setReason("");
  };

  const previewBalance =
    currentBalance +
    (amount
      ? type === "credit"
        ? parseFloat(amount)
        : -parseFloat(amount)
      : 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Wallet Balance</DialogTitle>
          <DialogDescription>
            Adjust wallet balance for {userName}. Current balance: ${currentBalance.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <RadioGroup value={type} onValueChange={(v) => setType(v as "credit" | "debit")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="cursor-pointer">
                  Credit (Add funds)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit" className="cursor-pointer">
                  Debit (Remove funds)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adjust-reason">Reason *</Label>
            <Textarea
              id="adjust-reason"
              placeholder="Enter the reason for this adjustment..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              required
            />
          </div>

          {amount && (
            <div className="rounded-md bg-muted p-3">
              <div className="text-sm font-medium">New Balance:</div>
              <div className="text-2xl font-bold text-primary">
                ${previewBalance.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!amount || parseFloat(amount) <= 0 || !reason.trim()}
          >
            Adjust Balance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

