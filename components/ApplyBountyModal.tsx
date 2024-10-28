"use client";

import * as React from "react";

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

export default function ApplyBountyModal() {
  const [applyModalOpen, setApplyModalOpen] = React.useState(false);\
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);

  //   const formData = new FormData(event.currentTarget);
  //   const bountyData = {
  //     title: formData.get("title") as string,
  //     details: formData.get("details") as string,
  //     rewardAmount: formData.get("reward-amount") as string,
  //     rewardToken: formData.get("reward-token") as string,
  //     endsOn: date?.toISOString(),
  //   };

  //   try {
  //     const response = await fetch("/api/bounties", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bountyData),
  //     });

  //     if (response.ok) {
  //       toast({
  //         title: "Bounty created",
  //         description: "Your bounty has been successfully created.",
  //       });
  //       // Reset form or close modal here
  //       setDate(undefined); // Reset date
  //       setModalOpen(false); // Close modal
  //     } else {
  //       throw new Error(`API response not OK: ${response.text()}`);
  //     }
  //   } catch (error) {
  //     console.error("Error creating bounty:", error);
  //     toast({
  //       title: "Error",
  //       description: `Failed to create bounty. Please try again. ${error}`,
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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
        <form
          // onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="task">Bounty Submission Link</Label>
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
