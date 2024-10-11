import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSearchOutline } from "react-icons/io5";
import CreateBountyModal from "@/components/CreateBountyModal";
import BountyCard from "@/components/BountyCard";

export default function Home() {
  return (
    <main className="h-screen pt-28">
      <div className="container mx-auto h-full bg-white pt-8 xl:max-w-screen-lg">
        <div className="flex flex-col items-center justify-between">
          <div className="flex justify-between items-center w-full flex-col md:flex-row gap-6">
            <div className="flex items-center justify-between gap-2.5 order-1 md:order-none">
              <div className="whitespace-nowrap px-3.5 py-1.5 rounded-full hover:bg-gray-400/20 cursor-pointer border text-sm">
                All Bounties
              </div>
              <div className="whitespace-nowrap px-3.5 py-1.5 rounded-full hover:bg-gray-400/20 cursor-pointer border text-sm">
                Reviewing
              </div>
              <div className="whitespace-nowrap px-3.5 py-1.5 rounded-full hover:bg-gray-400/20 cursor-pointer border text-sm">
                Completed
              </div>
            </div>
            <div className="relative w-full max-w-xs lg:max-w-sm">
              <Input
                type="search"
                placeholder="Search for bounties..."
                className="pr-10"
              />
              <IoSearchOutline
                size={24}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              />
            </div>
            <CreateBountyModal />
          </div>
        </div>
        <div className="flex flex-col py-6 gap-2">
          <BountyCard />
          <BountyCard />
          <BountyCard />
          <BountyCard />
        </div>
      </div>
    </main>
  );
}
