import { ObjectId } from "mongodb";

export interface Bounty {
  _id?: ObjectId;
  task: string;
  rewardAmount: number;
  rewardToken: string;
  endsOn: Date;
  createdAt: Date;
}

export function createBounty(data: Omit<Bounty, "_id" | "createdAt">): Bounty {
  return {
    ...data,
    createdAt: new Date(),
  };
}
