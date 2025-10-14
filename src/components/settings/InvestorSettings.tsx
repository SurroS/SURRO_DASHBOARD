"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function InvestorSettings() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profileData, setProfileData] = useState({
    fullname: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 8900",
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyReports: true,
  });

  const [display, setDisplay] = useState({
    compactView: false,
    animatedCharts: true,
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");

    // Redirect to login page
    router.push("/login");
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSecurityChange = (field: string, value: string) => {
    setSecurityData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (field: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleDisplayChange = (field: keyof typeof display) => {
    setDisplay((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="text-center mb-8 relative">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account preferences and security settings
        </p>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="absolute top-0 right-0 text-red-500 hover:text-red-600 flex items-center text-lg font-medium underline decoration-red-500 underline-offset-2"
        >
          Logout
          <Image
            src="/icons/Logout.svg"
            alt="Logout"
            width={20}
            height={20}
            className="ml-1"
          />
        </button>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Security Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword.current ? "text" : "password"}
                  placeholder="8-digit-password"
                  value={securityData.currentPassword}
                  onChange={(e) =>
                    handleSecurityChange("currentPassword", e.target.value)
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.current ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword.new ? "text" : "password"}
                  placeholder="8-digit-password"
                  value={securityData.newPassword}
                  onChange={(e) =>
                    handleSecurityChange("newPassword", e.target.value)
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="8-digit-password"
                  value={securityData.confirmPassword}
                  onChange={(e) =>
                    handleSecurityChange("confirmPassword", e.target.value)
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button className="w-full bg-blue-900 hover:bg-blue-800">
              Label
            </Button>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullname">Fullname</Label>
              <Input
                id="fullname"
                value={profileData.fullname}
                onChange={(e) =>
                  handleProfileChange("fullname", e.target.value)
                }
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
              />
            </div>

            <Button className="w-full bg-blue-900 hover:bg-blue-800">
              Label
            </Button>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Email notifications</p>
                <p className="text-sm text-gray-600">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={() => handleNotificationChange("email")}
                className="data-[state=checked]:bg-blue-900"
              />
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Push notifications</p>
                <p className="text-sm text-gray-600">
                  Receive instant notifications
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={() => handleNotificationChange("push")}
                className="data-[state=checked]:bg-blue-900"
              />
            </div>

            {/* Weekly Reports */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Weekly Reports</p>
                <p className="text-sm text-gray-600">
                  Get weekly performance summaries
                </p>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={() =>
                  handleNotificationChange("weeklyReports")
                }
                className="data-[state=checked]:bg-blue-900"
              />
            </div>

            <Button className="w-full bg-blue-900 hover:bg-blue-800">
              Label
            </Button>
          </CardContent>
        </Card>

        {/* Display Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">Display</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Compact View */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Compact view</p>
                <p className="text-sm text-gray-600">
                  Show more data in less space
                </p>
              </div>
              <Switch
                checked={display.compactView}
                onCheckedChange={() => handleDisplayChange("compactView")}
                className="data-[state=checked]:bg-blue-900"
              />
            </div>

            {/* Animated Charts */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Animated charts</p>
                <p className="text-sm text-gray-600">Enable chart animations</p>
              </div>
              <Switch
                checked={display.animatedCharts}
                onCheckedChange={() => handleDisplayChange("animatedCharts")}
                className="data-[state=checked]:bg-blue-900"
              />
            </div>

            <Button className="w-full bg-blue-900 hover:bg-blue-800">
              Label
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button className="bg-blue-900 hover:bg-blue-800 px-8">
          Save changes
        </Button>
        <Button
          variant="destructive"
          className="bg-red-600 hover:bg-red-700 px-8"
          onClick={() => setShowDiscardModal(true)}
        >
          Discard changes
        </Button>
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-gray-900">
              Are you sure you want to logout?
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className="bg-blue-900 text-white hover:bg-blue-800"
            >
              Back
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                setShowLogoutModal(false);
                handleLogout();
              }}
            >
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discard Changes Confirmation Modal */}
      <Dialog open={showDiscardModal} onOpenChange={setShowDiscardModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-gray-900">
              Discard changes and go back to dashboard?
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowDiscardModal(false)}
              className="bg-blue-900 text-white hover:bg-blue-800"
            >
              Keep editing
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                setShowDiscardModal(false);
                // Navigate back to dashboard or reset form
                window.location.href = "/dashboard";
              }}
            >
              Discard changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
