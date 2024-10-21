import { ObjectId } from "mongodb";

export interface Bounty {
  _id?: ObjectId | string;
  title: string;
  details: string;
  rewardAmount: number;
  rewardToken: string;
  numOfClaims: number;
  endsOn: Date;
  userId: string;
  createdAt: Date;
}

export function createBounty(data: Omit<Bounty, "_id" | "createdAt">): Bounty {
  return {
    ...data,
    createdAt: new Date(),
  };
}
