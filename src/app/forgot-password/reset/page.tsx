"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    setIsLoading(true);
    setTimeout(() => {
      router.push("/forgot-password/success");
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border-6 border-muted-foreground/5 bg-background shadow-sm p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Set new password
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Must be at least 8 characters
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new">New password</Label>
            <div className="relative">
              <Input
                id="new"
                type={showNew ? "text" : "password"}
                placeholder="8-digit-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
              >
                {showNew ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="8-digit-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={
              isLoading ||
              newPassword.length < 8 ||
              newPassword !== confirmPassword
            }
            className="w-full h-12 bg-[#080833] hover:bg-[#080833]/90 text-white"
          >
            {isLoading ? "Saving..." : "Save password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
