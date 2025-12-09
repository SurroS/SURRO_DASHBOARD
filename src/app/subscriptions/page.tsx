"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  CreditCard,
  Users,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle2,
  XCircle,
  Ban,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import MetricCard from "@/components/MetricCard/MetricCard";

const paymentHistory = [
  {
    id: "#6548",
    currentPlan: "#6548",
    dueDate: "6 April 2023",
    time: "4:27 AM",
    amountBilled: "₦200,000",
    status: "active",
    billingInfo: {
      subscriptionType: "Yearly subscription",
      paymentMethod: "PayPal",
      subscriptionDate: "28 March 2020",
      amountPaid: "₦90,000.00",
      name: "Eclairs Foggy",
      email: "examplejohndes@gmail.com",
      address:
        "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
  },
  {
    id: "#6549",
    currentPlan: "#6548",
    dueDate: "6 April 2023",
    time: "4:27 AM",
    amountBilled: "₦200,000",
    status: "inactive",
    billingInfo: {
      subscriptionType: "Monthly subscription",
      paymentMethod: "Credit Card",
      subscriptionDate: "15 March 2023",
      amountPaid: "₦25,000.00",
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main Street, Lagos, Nigeria",
    },
  },
  {
    id: "#6550",
    currentPlan: "#6548",
    dueDate: "6 April 2023",
    time: "4:27 AM",
    amountBilled: "₦200,000",
    status: "pending",
    billingInfo: {
      subscriptionType: "Yearly subscription",
      paymentMethod: "Bank Transfer",
      subscriptionDate: "1 April 2023",
      amountPaid: "₦180,000.00",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "456 Victoria Island, Lagos, Nigeria",
    },
  },
  {
    id: "#6551",
    currentPlan: "#6548",
    dueDate: "6 April 2023",
    time: "4:27 AM",
    amountBilled: "₦200,000",
    status: "expired",
    billingInfo: {
      subscriptionType: "Monthly subscription",
      paymentMethod: "PayPal",
      subscriptionDate: "10 February 2023",
      amountPaid: "₦30,000.00",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      address: "789 Ikoyi District, Lagos, Nigeria",
    },
  },
];

function SubscriptionsContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPayment, setSelectedPayment] = useState<{
    id: string;
    currentPlan: string;
    dueDate: string;
    time: string;
    amountBilled: string;
    status: string;
    billingInfo: {
      subscriptionType: string;
      paymentMethod: string;
      subscriptionDate: string;
      amountPaid: string;
      name: string;
      email: string;
      address: string;
    };
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const subscriptionStats = [
    { label: "Total Subscriptions", value: "1,250", icon: CreditCard, trend: "+12.5%" },
    { label: "Active", value: "1,000", icon: CheckCircle2, trend: "+5.2%" },
    { label: "Expired", value: "200", icon: XCircle, trend: "-2.1%" },
    { label: "Suspended", value: "50", icon: Ban, trend: "+1.5%" },
  ];

  const subscriptionPlans = [
    {
      type: "Basic",
      price: "₦150,000",
      users: "15 of 500 users",
      description: "Perfect for small teams",
      features: ["500 users", "Basic support", "Standard features"],
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      type: "Standard",
      price: "₦200,000",
      users: "25 of 750 users",
      description: "Most popular choice",
      features: ["750 users", "Priority support", "Advanced features"],
      color: "bg-primary/10 border-primary/30",
      textColor: "text-primary",
    },
    {
      type: "Premium",
      price: "₦350,000",
      users: "50 of 1,000 users",
      description: "For large organizations",
      features: ["1,000 users", "24/7 support", "All features"],
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "suspended";
      case "pending":
        return "pending";
      case "expired":
        return "expired";
      default:
        return "pending";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Subscription & Payment History
          </h1>
          <p className="text-muted-foreground">
            Manage subscriptions and track payment history
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 transition-all ${
            activeTab === "overview"
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 transition-all ${
            activeTab === "payment-history"
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("payment-history")}
        >
          Payment History
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionStats.map((stat, index) => (
              <MetricCard
                key={index}
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                subtitle={stat.trend}
                className="hover:shadow-md transition-shadow"
              />
            ))}
          </div>

          {/* Subscription Plans */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Active Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`border-2 transition-all hover:shadow-lg ${plan.color}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className={`${plan.color} ${plan.textColor}`}
                      >
                        {plan.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-4xl font-bold mb-1">
                      {plan.price}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{plan.users}</span>
                    </div>
                    <div className="space-y-2 pt-2 border-t">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Payment History Tab */}
      {activeTab === "payment-history" && (
        <>
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative flex-1 w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID, plan, or amount..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 flex-1 sm:flex-initial"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  <Button
                    variant="default"
                    className="bg-primary text-primary-foreground flex-1 sm:flex-initial"
                  >
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History Table */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {paymentHistory.map((payment, index) => (
                  <div
                    key={index}
                    className="p-6 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Left Section - Main Info */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Plan ID */}
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Plan ID
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary/10 rounded-md">
                              <CreditCard className="h-4 w-4 text-primary" />
                            </div>
                            <p className="font-semibold text-base">
                              {payment.currentPlan}
                            </p>
                          </div>
                        </div>

                        {/* Due Date */}
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Due Date
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 dark:bg-blue-950 rounded-md">
                              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-base">
                                {payment.dueDate}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {payment.time}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Amount Billed */}
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Amount Billed
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-green-50 dark:bg-green-950 rounded-md">
                              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="font-bold text-base text-green-700 dark:text-green-400">
                              {payment.amountBilled}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Status and Actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6">
                        {/* Status */}
                        <div className="flex flex-col gap-1">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Status
                          </p>
                          <StatusBadge
                            status={
                              getStatusVariant(payment.status) as
                                | "pending"
                                | "active"
                                | "expired"
                                | "suspended"
                                | "success"
                            }
                          >
                            {payment.status.charAt(0).toUpperCase() +
                              payment.status.slice(1)}
                          </StatusBadge>
                        </div>

                        {/* Action Button */}
                        <div className="flex items-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground"
                            onClick={() => setSelectedPayment(payment)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">1-10</span> of{" "}
              <span className="font-medium text-foreground">50</span> payments
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <div className="flex gap-1">
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Payment History Modal */}
      <Dialog
        open={!!selectedPayment}
        onOpenChange={() => setSelectedPayment(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <span>Payment Details</span>
            </DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="p-6 space-y-6">
              {/* Payment Summary Card */}
              <Card className="bg-gradient-to-br from-primary/5 via-primary/5 to-primary/10 border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Payment ID
                      </p>
                      <p className="text-xl font-bold flex items-center gap-2">
                        <div className="p-1.5 bg-primary/20 rounded-md">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        {selectedPayment.id}
                      </p>
                    </div>
                    <StatusBadge
                      status={
                        getStatusVariant(selectedPayment.status) as
                          | "pending"
                          | "active"
                          | "expired"
                          | "suspended"
                          | "success"
                      }
                      className="w-fit"
                    >
                      {selectedPayment.status.charAt(0).toUpperCase() +
                        selectedPayment.status.slice(1)}
                    </StatusBadge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Amount Paid
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-100 dark:bg-green-950 rounded-lg">
                          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                          {selectedPayment.billingInfo.amountPaid}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Amount Billed
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-100 dark:bg-blue-950 rounded-lg">
                          <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-2xl font-semibold">
                          {selectedPayment.amountBilled}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Subscription Details */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-1.5 bg-primary/10 rounded-md">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      Subscription Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Subscription Type
                      </p>
                      <p className="font-semibold text-base">
                        {selectedPayment.billingInfo.subscriptionType}
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-3 border-t">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Subscription Date
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="font-semibold text-base">
                          {selectedPayment.billingInfo.subscriptionDate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-1.5 bg-blue-100 dark:bg-blue-950 rounded-md">
                        <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Method
                      </p>
                      <p className="font-semibold text-base">
                        {selectedPayment.billingInfo.paymentMethod}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Billing Address */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-950 rounded-md">
                      <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Full Name
                      </p>
                      <p className="font-semibold text-base">
                        {selectedPayment.billingInfo.name}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Email Address
                      </p>
                      <p className="font-semibold text-base break-all">
                        {selectedPayment.billingInfo.email}
                      </p>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Address
                      </p>
                      <p className="font-semibold text-base leading-relaxed">
                        {selectedPayment.billingInfo.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 h-11"
                  onClick={() => setSelectedPayment(null)}
                >
                  Close
                </Button>
                <Button variant="default" className="flex-1 h-11 bg-primary hover:bg-primary/90">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <SubscriptionsContent />
      </MainLayout>
    </ProtectedRoute>
  );
}
