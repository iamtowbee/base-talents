"use client";
import { format } from "date-fns";
import { useBounties } from "@/hooks/use-bounties";
import { Bounty } from "@/models/Bounty";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BountyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, loading, error } = useBounties({
    id: params.id,
    type: "single",
  });

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  if (!data || Array.isArray(data)) {
    notFound();
  }

  const bounty = data as Bounty;

  if (!bounty) {
    return (
      <main className="h-screen pt-28 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Bounty not found</h1>
        <p className="text-sm text-gray-500">
          The requested bounty could not be found.
        </p>
        <Button onClick={() => window.history.back()} variant="outline">
          Go Back
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{bounty!.title}</h1>
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
          <p className="text-gray-700">{bounty.details}</p>
        </div>
      </div>
    </main>
  );
}
