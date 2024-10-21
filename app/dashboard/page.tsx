"use client";

import React from "react";
import { useBounties } from "@/hooks/use-bounties";
import { usePrivy } from "@privy-io/react-auth";
import { CgSpinnerAlt } from "react-icons/cg";
import BountyFullLayout from "@/components/BountyFullLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bounty } from "@/models/Bounty";

export default function Dashboard() {
  const { user, ready } = usePrivy();
  const { data, loading, error, retry } = useBounties({
    type: "user" as const,
    userId: user?.id.split(":")[2] ?? "",
  });

  if (!ready || loading) {
    return (
      <main className="h-screen pt-28 flex items-center justify-center">
        <CgSpinnerAlt className="animate-spin w-8 h-8" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="h-screen pt-28 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Something went wrong.</h1>
        <p className="text-sm text-red-500 font-semibold">{error}</p>
        <Button onClick={retry} variant="outline">
          Retry
        </Button>
      </main>
    );
  }

  const bounties = (data as Bounty[]) ?? [];

  return (
    <main className="h-screen pt-28">
      <div className="container mx-auto h-full pt-4 xl:max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-semibold">Your Bounties</h1>
              <p className="text-[#A4ACB9] text-sm">
                Manage and track your posted bounties.
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to All Bounties</Button>
            </Link>
          </div>

          <hr className="mr-4 border-muted-foreground/15" />

          {bounties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">
                You haven't posted any bounties yet.
              </p>
              <Link href="/">
                <Button className="mt-4">Create Your First Bounty</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col py-6 gap-2">
              {bounties.map((bounty) => (
                <BountyFullLayout
                  key={bounty._id!.toString()}
                  _id={bounty._id!.toString()}
                  title={bounty.title}
                  details={bounty.details}
                  endsOn={bounty.endsOn}
                  rewardAmount={bounty.rewardAmount}
                  rewardToken={bounty.rewardToken}
                  createdAt={bounty.createdAt}
                  numOfClaims={bounty.numOfClaims}
                  userId={bounty.userId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
