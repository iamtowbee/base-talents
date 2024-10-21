import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Bounty } from "@/models/Bounty";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("bountyApp");

    const bounties = await db
      .collection<Bounty>("bounties")
      .find({ userId: params.userId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bounties);
  } catch (error) {
    console.error("Error fetching user bounties:", error);
    return NextResponse.json(
      { message: "Error fetching user bounties" },
      { status: 500 }
    );
  }
}
