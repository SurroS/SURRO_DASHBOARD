"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/lib/api/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email });
      toast({
        title: "Email Sent",
        description: "Check your email for reset instructions",
      });
      router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
    } catch {
      toast({
        title: "Failed",
        description: "Could not send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border-6 border-muted-foreground/5 bg-background shadow-sm p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">Forgot Password</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;ll send you reset instructions to your email
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="examplejohndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#080833] hover:bg-[#080833]/90 text-white"
          >
            {isLoading ? "Sending..." : "Reset password"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full h-12 bg-[#EBF4FE]"
            onClick={() => router.push("/login")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
