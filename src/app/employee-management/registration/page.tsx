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
import { ChevronRight } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";

function EmployeeRegistrationContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    employeeId: "",
    role: "",
    country: "",
    state: "",
    city: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee registration:", formData);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Employee Management
        </h1>
        <p className="text-sm text-muted-foreground">Manage all employees</p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Employee Management</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-foreground font-medium">
          Employee Registration
        </span>
      </div>

      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-4 flex-shrink-0">
          <div className="w-32 h-32 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-4xl opacity-50">📷</div>
          </div>
          <button className="text-primary hover:underline text-sm font-medium">
            Upload profile picture
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-foreground"
              >
                First name
              </Label>
              <Input
                id="firstName"
                placeholder="John Doe"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-foreground"
              >
                Last name
              </Label>
              <Input
                id="lastName"
                placeholder="John Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example.johndoe@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-foreground"
              >
                Phone number
              </Label>
              <Input
                id="phoneNumber"
                placeholder="+234(0) 00 0000 00"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="employeeId"
              className="text-sm font-medium text-foreground"
            >
              Employee ID
            </Label>
            <Input
              id="employeeId"
              placeholder="#D1343"
              value={formData.employeeId}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Assign a role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Admin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="marketer">Marketer</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="clinic">Clinic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Country
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Argentina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="argentina">Argentina</SelectItem>
                <SelectItem value="nigeria">Nigeria</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">State</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleInputChange("state", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="state1">State 1</SelectItem>
                <SelectItem value="state2">State 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">City</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => handleInputChange("city", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city1">City 1</SelectItem>
                <SelectItem value="city2">City 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-medium"
          >
            Add Employee
          </Button>
        </form>
      </div>
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
