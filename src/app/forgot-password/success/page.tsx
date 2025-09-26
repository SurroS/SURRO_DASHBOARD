"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RecoverySuccessPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border-6 border-muted-foreground/5 bg-background shadow-sm p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Account recovered!
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your password has been reset. You can proceed to your dashboard.
          </p>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => router.push("/login")}
            className="w-full h-12 bg-[#080833] hover:bg-[#080833]/90 text-white"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
