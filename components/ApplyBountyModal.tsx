"use client";

import * as React from "react";
import { usePrivy } from "@privy-io/react-auth";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ApplyBountyModalProps {
  bountyId: string;
}

export default function ApplyBountyModal({ bountyId }: ApplyBountyModalProps) {
  const [applyModalOpen, setApplyModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { user } = usePrivy();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const submissionLink = formData.get("details") as string;

    try {
      const response = await fetch("/api/bounty-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bountyId,
          userId: user?.id,
          submissionLink,
        }),
      });

      if (response.ok) {
        toast({
          title: "Application Submitted",
          description: "Your application has been successfully submitted.",
        });
        setApplyModalOpen(false);
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={applyModalOpen} onOpenChange={setApplyModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-[#304FEC] font-semibold text-sm p-0"
        >
          Apply for bounty
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for Bounty</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="details">Bounty Submission Link</Label>
            <Input
              id="details"
              name="details"
              placeholder="Enter deliverable link"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Applying..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
