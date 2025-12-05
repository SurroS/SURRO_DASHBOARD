"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Copy, Check, Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import { generateInvite } from "@/services/inviteService";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function EmployeeRegistrationContent() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !role) {
      toast({
        title: "Validation Error",
        description: "Please provide both an email and a role.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setInviteLink(null);

    try {
      const result = await generateInvite({ email, role });
      setInviteLink(result.inviteLink);
      setExpiresAt(result.expiresAt);
      toast({
        title: "Invite Generated",
        description: "You can now copy and share the invitation link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate invite link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Invite link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please manually select and copy the link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Employee Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate secure signup invitations
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Employee Management</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-foreground font-medium">Invite Employee</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Invitation</CardTitle>
          <CardDescription>
            Create a time-limited invitation (24h) for a new employee. They will
            complete their profile upon signup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!inviteLink ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="employee@surrosantara.space"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Assign Role
                </Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="compliance_admin">
                      Compliance Admin
                    </SelectItem>
                    <SelectItem value="support_admin">Support Admin</SelectItem>
                    <SelectItem value="finance_admin">Finance Admin</SelectItem>
                    <SelectItem value="security_admin">
                      Security Admin
                    </SelectItem>
                    <SelectItem value="general_admin">General Admin</SelectItem>
                    <SelectItem value="investor_admin">
                      Investor Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Invite Link"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="rounded-lg border bg-green-50 p-4 border-green-200 text-green-800">
                <h3 className="font-semibold mb-1">Invitation Ready!</h3>
                <p className="text-sm">
                  This link is valid for 24 hours (until{" "}
                  {expiresAt ? new Date(expiresAt).toLocaleTimeString() : ""}).
                  Share it securely with the employee.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Invite Link
                </Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={inviteLink}
                    className="font-mono text-xs bg-muted"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className={copied ? "text-green-600 border-green-600" : ""}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setInviteLink(null);
                    setEmail("");
                    setRole("");
                  }}
                >
                  Create Another
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    window.location.href = `mailto:${email}?subject=Invitation to join Surro&body=You have been invited to join Surro as a ${role}.%0D%0A%0D%0APlease use the following link to complete your registration:%0D%0A${inviteLink}%0D%0A%0D%0AThis link expires in 24 hours.`;
                  }}
                >
                  Open Email Client
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function EmployeeRegistrationPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <EmployeeRegistrationContent />
      </MainLayout>
    </ProtectedRoute>
  );
}
