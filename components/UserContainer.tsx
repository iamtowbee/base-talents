"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { MdOutlineLogin } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CgSpinnerAlt } from "react-icons/cg";
import Link from "next/link";

const UserContainer = () => {
  const { ready, authenticated, login, logout, user } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="flex gap-4 items-center justify-between px-2">
      {authenticated && (
        <Link
          href="/dashboard"
          className="inline-flex items-center px-1 text-sm font-medium"
        >
          Dashboard
        </Link>
      )}

      {ready ? (
        authenticated ? (
          <Popover>
            <p className="text-sm font-semibold text-primary/80">$0</p>
            <PopoverTrigger className="bg-gradient-to-bl from-purple-700 via-blue-700 to-purple-500 w-10 h-10 rounded-full text-lg font-semibold flex items-center justify-center text-white border border-accent-hover">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {user!.email?.address.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-24 p-1">
              <Button variant="link" onClick={logout}>
                Sign Out
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <TooltipProvider delayDuration={275}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" disabled={disableLogin} onClick={login}>
                  <MdOutlineLogin className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mt-2" side="bottom">
                <p className="text-white">Login</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      ) : (
        <CgSpinnerAlt className="animate-spin w-8 h-8" />
      )}
    </div>
  );
};

export default UserContainer;
