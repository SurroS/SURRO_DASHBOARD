"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, MoreHorizontal, X, Loader2, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import { adminService } from "@/lib/api";
import type { SubscriptionPlanWithRegions } from "@/lib/api/types";

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
  const [selectedPayment, setSelectedPayment] = useState<(typeof paymentHistory)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [plans, setPlans] = useState<SubscriptionPlanWithRegions[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      setPlansLoading(true);
      setPlansError(null);
      try {
        const data = await adminService.getSubscriptionPlans();
        setPlans(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        const message =
          err && typeof err === "object" && "response" in err
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to load plans"
            : "Failed to load plans";
        setPlansError(typeof message === "string" ? message : "Failed to load plans");
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const subscriptionStats = [
    { label: "Total plans", value: String(plans.length) },
    { label: "Active", value: String(plans.filter((p) => p.isActive).length) },
    { label: "Inactive", value: String(plans.filter((p) => !p.isActive).length) },
    { label: "Total regions", value: String(plans.reduce((acc, p) => acc + (p.regions?.length || 0), 0)) },
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">
          Subscription & Payment History
        </h1>
        <p className="text-muted-foreground">Manage users subscription</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b">
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${
            activeTab === "payment-history"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground"
          }`}
          onClick={() => setActiveTab("payment-history")}
        >
          Payment history
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {subscriptionStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Subscription Plans */}
          {plansLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading plans...</span>
            </div>
          ) : plansError ? (
            <div className="flex items-center justify-center p-12">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <span className="ml-2 text-red-500">{plansError}</span>
            </div>
          ) : plans.length === 0 ? (
            <div className="flex items-center justify-center p-12">
              <span className="text-muted-foreground">No subscription plans found</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className="p-6">
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="bg-primary text-primary-foreground"
                        >
                          {plan.name}
                        </Badge>
                        <Badge
                          variant={plan.isActive ? "default" : "secondary"}
                          className={plan.isActive ? "bg-green-100 text-green-800" : ""}
                        >
                          {plan.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{plan.interval}</p>
                        {plan.regions && plan.regions.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {plan.regions.map((region) => (
                              <div key={region.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{region.region}</span>
                                <span className="font-medium">
                                  {region.symbol || region.currency} {region.price.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Payment History Tab */}
      {activeTab === "payment-history" && (
        <>
          {/* Search and Filters */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                className="bg-primary text-primary-foreground"
              >
                Search
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Payment History Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Current plan</TableHead>
                    <TableHead>Due date</TableHead>
                    <TableHead>Amount billed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">
                        {payment.currentPlan}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{payment.dueDate}</p>
                          <p className="text-xs text-muted-foreground">
                            {payment.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{payment.amountBilled}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary"
                          onClick={() => setSelectedPayment(payment)}
                        >
                          Details
                        </Button>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedPayment(payment)}
                            >
                              Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">10</span> of{" "}
              <span className="font-medium">50</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Payment history</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPayment(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-6">
              {/* Billing Information */}
              <div>
                <h3 className="font-semibold mb-4">Billing Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subscription type:
                    </span>
                    <span className="font-medium">
                      {selectedPayment.billingInfo.subscriptionType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Payment method:
                    </span>
                    <span className="font-medium">
                      {selectedPayment.billingInfo.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subscription date:
                    </span>
                    <span className="font-medium">
                      {selectedPayment.billingInfo.subscriptionDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount paid:</span>
                    <span className="font-medium">
                      {selectedPayment.billingInfo.amountPaid}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <StatusBadge
                      status={
                        getStatusVariant(selectedPayment.status) as
                          | "pending"
                          | "active"
                          | "expired"
                          | "suspended"
                          | "success"
                      }
                    >
                      {selectedPayment.status.charAt(0).toUpperCase() +
                        selectedPayment.status.slice(1)}
                    </StatusBadge>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="font-semibold mb-4">Billing Address</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground block">Name:</span>
                    <span className="font-medium">
                      {selectedPayment.billingInfo.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Email:</span>
                    <span className="font-medium">
                      {selectedPayment.billingInfo.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">
                      Address:
                    </span>
                    <span className="font-medium">
                      {selectedPayment.billingInfo.address}
                    </span>
                  </div>
                </div>
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
