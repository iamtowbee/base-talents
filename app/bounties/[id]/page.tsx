"use client";
import { format } from "date-fns";
import { Bounty } from "@/models/Bounty";
import { useBounties } from "@/hooks/use-bounties";

async function getBounty(id: string): Promise<Bounty> {
  const res = await fetch(`/api/bounties/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch bounty");
  return res.json();
}

export default async function BountyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: bounty, loading, error } = useBounties(params.id);

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <main className="container mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{bounty.task}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Reward Amount</p>
            <p className="text-xl font-semibold">
              {bounty.rewardAmount} {bounty.rewardToken}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Ends On</p>
            <p className="text-xl font-semibold">
              {format(new Date(bounty.endsOn), "PPP")}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Created At</p>
            <p className="text-xl font-semibold">
              {format(new Date(bounty.createdAt), "PPP")}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{bounty.task}</p>
        </div>
      </div>
    </main>
  );
}
