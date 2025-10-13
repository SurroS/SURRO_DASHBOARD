"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell, User, TrendingUp, ChevronDown } from "lucide-react";
import Image from "next/image";

interface InvestorsNavProps {
  showDateSelector?: boolean;
  currentPage?: string;
}

export default function InvestorsNav({
  showDateSelector = false,
  currentPage,
}: InvestorsNavProps) {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main navigation */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Branding */}
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-[#6969C9] leading-4">
                Surro
              </span>
              <span className="text-xl font-semibold text-[#6969C9] leading-4">
                Investor
              </span>
            </div>
            {/* Navigation Links (also part of Left Section - Branding) */}
            <div className="flex items-center space-x-2 bg-[#FBFBFB] rounded-lg p-2.5 ml-25">
              <Button
                variant={currentPage === "Dashboard" ? "default" : "ghost"}
                size="sm"
                onClick={() => router.push("/dashboard")}
                className={`${
                  currentPage === "Dashboard"
                    ? "bg-[#FBFBFB] text-[#6969C9] shadow-sm hover:bg-[#FBFBFB]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span
                  className={
                    currentPage === "Dashboard"
                      ? "text-[#6969C9]"
                      : "text-gray-600"
                  }
                >
                  Dashboard
                </span>
                <Image
                  src="/icons/InvestorsDashboard.svg"
                  alt="Dashboard"
                  width={18}
                  height={20}
                  className="ml-2"
                />
              </Button>

              <Button
                variant={currentPage === "Settings" ? "default" : "ghost"}
                size="sm"
                onClick={() => router.push("/settings")}
                className={`${
                  currentPage === "Settings"
                    ? "bg-[#FBFBFB] text-[#6969C9] shadow-sm hover:bg-[#FBFBFB]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span
                  className={
                    currentPage === "Settings"
                      ? "text-[#6969C9]"
                      : "text-gray-600"
                  }
                >
                  Settings
                </span>
                <Image
                  src="/icons/InvestorsSettings.svg"
                  alt="Settings"
                  width={24}
                  height={24}
                  className="ml-2"
                />
              </Button>
            </div>
          </div>

          {/* Right Section - Date/User Controls */}
          <div className="flex items-center space-x-8">
            {/* Date Selector - Conditional */}
            {showDateSelector && (
              <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Left Section - Date Range */}
                <div className="flex items-center space-x-2 px-3 py-4 border-r border-gray-200">
                  <Image
                    src="/icons/InvestorsCalendar.svg"
                    alt="Calendar"
                    width={16}
                    height={16}
                    className="text-gray-700"
                  />
                  <span className="text-sm text-gray-700">Sep 12 - Oct 12</span>
                </div>

                {/* Right Section - Period Selection */}
                <div className="flex items-center space-x-1 px-3 py-4">
                  <span className="text-sm text-gray-700">
                    {selectedPeriod}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-700" />
                </div>
              </div>
            )}

            {/* Notification Bell */}
            {/* <Button variant="ghost" size="sm" className="p-2">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button> */}

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-base">
                <div className="font-medium text-gray-700 leading-4.5">
                  Sarah Nelson
                </div>
                <div className="text-[#6969C9] font-medium leading-4.5">
                  Investor Account
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
