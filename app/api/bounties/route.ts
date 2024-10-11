import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createBounty, Bounty } from "@/models/Bounty";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("bountyApp");

    const body = await request.json();
    const { task, rewardAmount, rewardToken, endsOn } = body;

    const bounty = createBounty({
      task,
      rewardAmount: parseFloat(rewardAmount),
      rewardToken,
      endsOn: new Date(endsOn),
    });

    const result = await db.collection<Bounty>("bounties").insertOne(bounty);

    return NextResponse.json(
      { message: "Bounty created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating bounty:", error);
    return NextResponse.json(
      { message: "Error creating bounty" },
      { status: 500 }
    );
  }
}
