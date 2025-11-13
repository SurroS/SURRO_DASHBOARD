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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SendNotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName: string;
  onConfirm: (channel: "email" | "sms" | "in_app", message: string) => void;
}

export default function SendNotificationModal({
  open,
  onOpenChange,
  userId,
  userName,
  onConfirm,
}: SendNotificationModalProps) {
  const [channel, setChannel] = useState<"email" | "sms" | "in_app">("in_app");
  const [message, setMessage] = useState("");

  const handleConfirm = () => {
    if (!message.trim()) {
      return;
    }
    onConfirm(channel, message);
    setMessage("");
    setChannel("in_app");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Notification</DialogTitle>
          <DialogDescription>
            Send a notification to {userName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Notification Channel</Label>
            <RadioGroup value={channel} onValueChange={(v) => setChannel(v as typeof channel)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in_app" id="in_app" />
                <Label htmlFor="in_app" className="cursor-pointer">
                  In-App Notification
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="cursor-pointer">
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms" className="cursor-pointer">
                  SMS
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notification-message">Message *</Label>
            <Textarea
              id="notification-message"
              placeholder="Enter the notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!message.trim()}
          >
            Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

