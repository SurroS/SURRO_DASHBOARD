"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function VerifyCodePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onContinue = async () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/forgot-password/reset");
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border-6 border-muted-foreground/5 bg-background shadow-sm p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Check Your Email
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please enter the code we have sent to your email
          </p>
        </div>

        <div className="mt-2 space-y-6">
          <div className="text-center text-sm font-medium">
            {email && <span className="text-foreground">{email}</span>}
          </div>

          <div className="flex w-full justify-center">
            <InputOTP maxLength={5} value={code} onChange={setCode}>
              <InputOTPGroup className="gap-6">
                <InputOTPSlot
                  index={0}
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <InputOTPSlot
                  index={1}
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <InputOTPSlot
                  index={2}
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <InputOTPSlot
                  index={3}
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <InputOTPSlot
                  index={4}
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={onContinue}
            disabled={code.length !== 5 || isLoading}
            className="w-full h-12 bg-[#080833] hover:bg-[#080833]/90 text-white"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </Button>

          <div className="text-center text-sm">
            Didn&apos;t receive the email?{" "}
            <button className="font-semibold underline-offset-2 hover:underline">
              Click to resend
            </button>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="w-full h-12 bg-[#EBF4FE]"
            onClick={() => router.push("/login")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
