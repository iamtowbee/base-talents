"use client";
import React from "react";
import CreateBountyModal from "@/components/CreateBountyModal";
import { Bounty } from "@/models/Bounty";
import { useBounties } from "@/hooks/use-bounties";
import { CgSpinnerAlt } from "react-icons/cg";
import BountyFullLayout from "@/components/BountyFullLayout";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    data: bounties,
    loading,
    error,
    retry,
  } = useBounties({ type: "all" });
  const { authenticated } = usePrivy();

  if (loading)
    return (
      <main className="h-screen pt-28 flex items-center justify-center">
        <CgSpinnerAlt className="animate-spin w-8 h-8" />
      </main>
    ); // Loading state

  if (error)
    return (
      <main className="h-screen pt-28 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Something went wrong.</h1>
        <p className="text-sm text-red-500 font-semibold">{error}</p>
        <Button onClick={retry} variant="outline">
          Retry
        </Button>
      </main>
    ); // Error state

  return (
    <main className="h-screen pt-28">
      <div className="container mx-auto h-full pt-4 xl:max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-semibold">Bounties</h1>
              <p className="text-[#A4ACB9] text-sm">
                Participate in Web3 bounties and earn tokens.
              </p>
            </div>
            {authenticated && <CreateBountyModal />}
          </div>

          <hr className="mr-4 border-muted-foreground/25" />

          <div className="flex items-center justify-start gap-4">
            <div className="whitespace-nowrap px-4 py-1.5 rounded-full bg-[#272D4D] text-white hover:bg-blue-600/70 cursor-pointer border border-primary text-sm">
              All Bounties
            </div>
            <div className="whitespace-nowrap px-4 py-2 rounded-full bg-[#818898] hover:bg-[#818898]/90 cursor-pointer text-sm text-background">
              Design
            </div>
            <div className="whitespace-nowrap px-4 py-2 rounded-full bg-[#818898] hover:bg-[#818898]/90 cursor-pointer text-sm text-background">
              Content
            </div>
            <div className="whitespace-nowrap px-4 py-2 rounded-full bg-[#818898] hover:bg-[#818898]/90 cursor-pointer text-sm text-background">
              Development
            </div>
            <div className="whitespace-nowrap px-4 py-2 rounded-full bg-[#818898] hover:bg-[#818898]/90 cursor-pointer text-sm text-background">
              Marketing
            </div>
            <div className="whitespace-nowrap px-4 py-2 rounded-full bg-[#818898] hover:bg-[#818898]/90 cursor-pointer text-sm text-background">
              Community
            </div>
          </div>
        </div>

        <div className="flex flex-col py-6 gap-2 ">
          {(bounties as Bounty[]).map((bounty: Bounty) => {
            return (
              <BountyFullLayout
                key={bounty._id as unknown as string}
                _id={bounty._id!.toString()}
                title={bounty.title}
                details={bounty.details}
                endsOn={bounty.endsOn}
                numOfClaims={bounty.numOfClaims}
                rewardAmount={bounty.rewardAmount}
                rewardToken={bounty.rewardToken}
                createdAt={bounty.createdAt}
                userId={bounty.userId}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
