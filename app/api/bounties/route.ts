import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createBounty, Bounty } from "@/models/Bounty";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("bountyApp");

    const bounties = await db.collection<Bounty>("bounties").find({}).toArray();

    return NextResponse.json(bounties, { status: 200 });
  } catch (error) {
    console.error("Error fetching bounties:", error);
    return NextResponse.json(
      { message: "Error fetching bounties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("bountyApp");

    const body = await request.json();
    const { title, details, rewardAmount, rewardToken, endsOn } = body;

    const bounty = createBounty({
      title,
      details,
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