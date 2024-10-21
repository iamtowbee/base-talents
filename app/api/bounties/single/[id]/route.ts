import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Bounty } from "@/models/Bounty";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("bountyApp");

    const bounty = await db.collection<Bounty>("bounties").findOne({
      _id: new ObjectId(params.id),
    });

    if (!bounty) {
      return NextResponse.json(
        { message: "Bounty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(bounty);
  } catch (error) {
    console.error("Error fetching bounty:", error);
    return NextResponse.json(
      { message: "Error fetching bounty" },
      { status: 500 }
    );
  }
}
