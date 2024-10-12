"use client";

import { Icon, iconExists } from "@iconify/react/dist/iconify.js";
import React from "react";
import { BiSolidComment } from "react-icons/bi";
import { Bounty } from "@/models/Bounty"; // Import the Bounty interface
import { formatDueDate } from "@/utils/date-format";
import Link from "next/link";

const BountyCard: React.FC<Bounty> = ({
  _id,
  title,
  details,
  rewardAmount,
  rewardToken,
  endsOn,
}) => {
  const iconFound: boolean = iconExists(
    `cryptocurrency-color:${rewardToken.toLowerCase()}`
  );

  return (
    <Link href={`/bounties/${_id}`} passHref>
      <div className="p-6 flex items-center justify-between rounded-lg hover:cursor-pointer hover:bg-[#111111]/70">
        <div className="flex justify-between items-start gap-4">
          <div className="bg-gray-300 w-16 h-16 rounded-xl"></div>
          <div className="flex flex-col justify-center gap-1">
            <div className="flex flex-col">
              <div className="text-lg font-medium text-primary line-clamp-1 overflow-ellipsis leading-tight hover:underline max-w-md">
                {title}
              </div>
              <div className="text-sm text-muted-foreground">{details}</div>
            </div>
            <div className="flex items-center justify-start divide-x divide-neutral-300">
              <div className="flex items-center justify-center gap-1.5">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <p className="text-xs font-medium pr-3.5 text-neutral-500">
                  Bounty
                </p>
              </div>
              <p className="text-xs font-medium px-3.5 text-neutral-500">
                Due <span>{formatDueDate(endsOn)}</span>
              </p>
              <p className="text-xs font-medium pl-3.5 text-neutral-500 flex items-center justify-center gap-1">
                <BiSolidComment className="text-muted-foreground" />0
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Icon
            fontSize={20}
            icon={`cryptocurrency-color:${
              iconFound ? rewardToken.toLowerCase() : "generic"
            }`}
          />
          <p className="text-lg font-semibold text-primary ml-1">
            {rewardAmount}
          </p>
          <span className="text-muted-foreground font-medium text-sm">
            {rewardToken}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BountyCard;
