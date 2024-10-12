"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import CreateBountyModal from "@/components/CreateBountyModal";
import BountyCard from "@/components/BountyCard";
import { Bounty } from "@/models/Bounty";
import { useBounties } from "@/hooks/use-bounties";
import { CgSpinnerAlt } from "react-icons/cg";
import BountyFullLayout from "@/components/BountyFullLayout";

export default function Home() {
  const { data: bounties, loading, error } = useBounties();

  if (loading)
    return (
      <main className="h-screen pt-28 flex items-center justify-center">
        <CgSpinnerAlt className="animate-spin w-8 h-8" />
      </main>
    ); // Loading state

  if (error)
    return (
      <main className="h-screen pt-28 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Something went wrong.</h1>
        <p>{error}</p>
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
            <CreateBountyModal />
          </div>

          <hr className="mr-4 border-muted-foreground/15" />

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
          {bounties.map((bounty: Bounty) => {
            return (
              <BountyFullLayout
                key={bounty._id as unknown as string}
                _id={bounty._id!.toString()}
                title={bounty.title}
                details="Lorem ipsum dolor sit amet"
                endsOn={bounty.endsOn}
                rewardAmount={bounty.rewardAmount}
                rewardToken={bounty.rewardToken}
                createdAt={bounty.createdAt}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
