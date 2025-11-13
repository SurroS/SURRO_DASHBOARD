"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { AdminRole } from "@/lib/permissions";
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
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/components/AuthLayout";
import {
  getExperimentVariant,
  trackExperimentEvent,
  getVariantName,
  type ExperimentVariant,
} from "@/lib/abTesting";

const EXPERIMENT_ID = "login_role_dropdown";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<AdminRole>("general_admin");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [variant, setVariant] = useState<ExperimentVariant>("A");
  const [showRoleDropdown, setShowRoleDropdown] = useState(true);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Determine A/B test variant on mount
  useEffect(() => {
    const experimentVariant = getExperimentVariant(EXPERIMENT_ID, email || undefined);
    setVariant(experimentVariant);
    setShowRoleDropdown(experimentVariant === "A"); // Only show dropdown in variant A

    // Track page view
    trackExperimentEvent(EXPERIMENT_ID, experimentVariant, "page_view", {
      variantName: getVariantName(EXPERIMENT_ID, experimentVariant),
    });
  }, []);

  // Re-assign variant when email changes (for consistent assignment)
  useEffect(() => {
    if (email) {
      const experimentVariant = getExperimentVariant(EXPERIMENT_ID, email);
      setVariant(experimentVariant);
      setShowRoleDropdown(experimentVariant === "A");
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Track form submission start
    trackExperimentEvent(EXPERIMENT_ID, variant, "form_submit_start", {
      hasRole: !!role,
      email: email.substring(0, 3) + "***", // Partial email for privacy
    });

    try {
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        trackExperimentEvent(EXPERIMENT_ID, variant, "form_error", {
          error: "missing_fields",
        });
        setIsLoading(false);
        return;
      }

      // Variant A: Pass role, Variant B: Don't pass role (undefined)
      const roleToPass = showRoleDropdown ? role : undefined;
      const success = await login(email, password, roleToPass);

      if (success) {
        // Track successful login
        trackExperimentEvent(EXPERIMENT_ID, variant, "login_success", {
          variantName: getVariantName(EXPERIMENT_ID, variant),
          roleUsed: showRoleDropdown ? role : "auto_detected",
        });

        toast({ title: "Login Successful", description: "Welcome back!" });
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
        
        // Track failed login
        trackExperimentEvent(EXPERIMENT_ID, variant, "login_failed", {
          error: "invalid_credentials",
        });

        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (_err) {
      setError("An error occurred during login");
      
      trackExperimentEvent(EXPERIMENT_ID, variant, "login_error", {
        error: "exception",
      });

      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      description="Please fill in your user details to login"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12"
            required
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

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="rounded border-border"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        {/* A/B Test: Only show role dropdown in variant A */}
        {showRoleDropdown && (
          <div className="space-y-2">
            <Label htmlFor="role">Select role</Label>
            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value as AdminRole);
                trackExperimentEvent(EXPERIMENT_ID, variant, "role_selected", {
                  role: value,
                });
              }}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Admin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="general_admin">General Admin</SelectItem>
                <SelectItem value="support_admin">Support Admin</SelectItem>
                <SelectItem value="finance_admin">Finance Admin</SelectItem>
                <SelectItem value="security_admin">Operations Admin</SelectItem>
                <SelectItem value="marketing_admin">Marketing Admin</SelectItem>
                <SelectItem value="compliance_admin">Compliance Admin</SelectItem>
                <SelectItem value="investor_admin">Investor Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-[#1a365d] hover:bg-[#1a365d]/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Login"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/admin/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
