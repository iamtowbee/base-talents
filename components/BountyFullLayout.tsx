"use client";

import { Icon, iconExists } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Bounty } from "@/models/Bounty"; // Import the Bounty interface
import { formatDueDate } from "@/utils/date-format";
import Image from "next/image";
import { Button } from "./ui/button";
import ApplyBountyModal from "./ApplyBountyModal";

const BountyFullLayout: React.FC<Bounty> = ({
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
    <div className="flex items-start justify-between py-8 border-b border-[#272432]">
      <div className="flex flex-1 items-start gap-4">
        <div className="flex items-center justify-center">
          <Image
            src="/avatar-1.png"
            alt="Bounty poster"
            width={64}
            height={64}
          />
        </div>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-col gap-2">
            <div className="font-medium">{title}</div>
            <div className="text-muted font-light text-sm">Lorem ipsum</div>
            <div className="flex gap-4 items-center">
              <div className="text-xs text-[#068F4DD2] bg-[#2B3E35D2] px-2.5 py-1.5 rounded-[40px]">
                Bounty
              </div>
              <div className="text-xs text-[#9747FF] bg-[#2D2345] px-2.5 py-1.5 rounded-[40px]">
                Due <span>{formatDueDate(endsOn)}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-left text-sm">{details}</p>
          </div>
          <div>
            <ApplyBountyModal />
          </div>
        </div>
      </div>
      <div className="flex items-center p-4 border border-[#36394A] gap-2.5 rounded-md">
        <Icon
          fontSize={20}
          icon={`cryptocurrency-color:${
            iconFound ? rewardToken.toLowerCase() : "generic"
          }`}
        />
        <p className="font-semibold text-primary">
          {rewardAmount}{" "}
          <span className="text-muted-foreground font-medium text-sm">
            {rewardToken}
          </span>
        </p>
      </div>

      {/* rest */}
      {/* <div className="flex justify-between items-start gap-4">
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
      </div> */}
    </div>
  );
};

export default BountyFullLayout;
