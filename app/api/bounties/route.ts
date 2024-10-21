import clientPromise from "@/lib/mongodb";
import { createBounty, Bounty } from "@/models/Bounty";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("bountyApp");

    const bounties = await db
      .collection<Bounty>("bounties")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(bounties);
  } catch (error) {
    console.error("Error fetching bounties:", error);
    return Response.json(
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
    const {
      title,
      details,
      rewardAmount,
      rewardToken,
      numOfClaims,
      userId,
      endsOn,
    } = body;

    const bounty = createBounty({
      title,
      details,
      rewardAmount: parseFloat(rewardAmount),
      rewardToken,
      numOfClaims,
      userId,
      endsOn: new Date(endsOn),
    });

    const result = await db.collection<Bounty>("bounties").insertOne(bounty);

    return Response.json(
      { message: "Bounty created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating bounty:", error);
    return Response.json({ message: "Error creating bounty" }, { status: 500 });
  }
}
