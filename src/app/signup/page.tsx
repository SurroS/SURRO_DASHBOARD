"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/components/AuthLayout";
import { validateInvite } from "@/services/inviteService";
import { Loader2, Lock } from "lucide-react";

function SignupForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isValidating, setIsValidating] = useState(true);
  const [isInviteValid, setIsInviteValid] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function checkInvite() {
      if (!token) {
        setIsValidating(false);
        setInviteError("Invitation token is missing.");
        return;
      }

      try {
        const result = await validateInvite(token);
        if (result.valid && result.email && result.role) {
          setIsInviteValid(true);
          setEmail(result.email);
          setRole(result.role);
        } else {
          setInviteError(result.error || "Invalid invitation token.");
        }
      } catch (error) {
        setInviteError("Failed to validate invitation.");
      } finally {
        setIsValidating(false);
      }
    }

    checkInvite();
  }, [token]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would call the actual registration endpoint, passing the token
      // so the backend can verify it again and consume it.

      // For now, we simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Account Created",
        description: "Welcome to Surro!",
      });
      router.push("/login");
    } catch {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidating) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Validating invitation...</p>
      </div>
    );
  }

  if (!isInviteValid) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Lock className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Access Denied
        </h3>
        <p className="text-gray-500 mb-6 max-w-xs">
          {inviteError ||
            "This signup page is invite-only. Please contact your administrator for an invitation."}
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/login")}
          className="w-full max-w-xs"
        >
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
          className="h-12 bg-gray-50 text-gray-500 cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground">
          Email is locked to the invitation.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          type="text"
          value={role}
          disabled
          className="h-12 bg-gray-50 text-gray-500 cursor-not-allowed capitalize"
        />
        <p className="text-xs text-muted-foreground">
          Role assigned by administrator.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="h-12"
          required
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="8-digit-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="8-digit-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-[#1a365d] hover:bg-[#1a365d]/90 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Account..." : "Complete Registration"}
      </Button>
    </form>
  );
}

export default function SignupPage() {
  return (
    <AuthLayout
      title="Complete Registration"
      description="Set up your account to join Surro"
      bottomTextPrefix="Already have an account?"
      bottomLinkHref="/login"
      bottomLinkText="Login"
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}
