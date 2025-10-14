"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";

function CreateCampaignContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [campaignTitle, setCampaignTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMarketer, setSelectedMarketer] = useState("");
  const [referralCode] = useState("surrocampaign/e8324BSIwe1");

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleCreateCampaign = () => {
    if (!campaignTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a campaign title",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Campaign created successfully",
    });

    // Navigate back to referrals page
    router.push("/referrals");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Create A Campaign</h1>
      </div>

      <div className="space-y-6">
        {/* Campaign Title */}
        <div className="space-y-2">
          <Label htmlFor="campaign-title" className="text-sm font-medium">
            Campaign title
          </Label>
          <Input
            id="campaign-title"
            placeholder="Title"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
            className="bg-background border-border"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-32 bg-background border-border resize-none"
          />
        </div>

        {/* Invite Marketers */}
        <div className="space-y-2">
          <Label htmlFor="marketers" className="text-sm font-medium">
            Invite marketers
          </Label>
          <Select value={selectedMarketer} onValueChange={setSelectedMarketer}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
              <SelectItem value="marketer-1">
                John Doe - Marketing Specialist
              </SelectItem>
              <SelectItem value="marketer-2">
                Jane Smith - Digital Marketer
              </SelectItem>
              <SelectItem value="marketer-3">
                Mike Johnson - Campaign Manager
              </SelectItem>
              <SelectItem value="marketer-4">
                Sarah Wilson - Brand Manager
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Share Referral Link */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">Share the referral link</h3>
            <p className="text-sm text-muted-foreground">
              Share the referral link
            </p>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-muted rounded-lg px-3 py-2 border">
              <span className="text-sm font-mono text-muted-foreground">
                {referralCode}
              </span>
            </div>
            <Button
              onClick={handleCopyReferralCode}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy referral code
            </Button>
          </div>
        </div>

        {/* Create Campaign Button */}
        <div className="flex justify-end pt-6">
          <Button
            onClick={handleCreateCampaign}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            Create campaign
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateCampaignPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <CreateCampaignContent />
      </MainLayout>
    </ProtectedRoute>
  );
}
