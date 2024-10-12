"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import AvatarContainer from "@/components/AvatarContainer";

// import Image from "next/image";

const Header = () => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 py-8 bg-background text-primary z-10 container flex justify-between items-center`}
    >
      {/* logo */}
      <Link href="/">
        <h1 className="font-bold text-2xl flex items-center gap-2 uppercase">
          <span className="bg-primary text-white  w-10 h-10 rounded-full flex items-center justify-center">
            P
          </span>{" "}
          <p className="hidden sm:block">Pathner</p>
          {/* {!top ? (
                <Image
                  src={FindoutMonogram}
                  alt="Findout Logo"
                  height={96}
                  width={96}
                />
              ) : (
                <Image
                  src={FindoutLogo}
                  alt="Findout Logo"
                  height={48}
                  width={48}
                />
              )} */}
          {/* <Image
                src={FindoutLogo}
                alt="Findout Logo"
                height={48}
                width={48}
              /> */}
        </h1>
      </Link>

      <div className="flex items-center justify-between gap-2">
        <Link href="#">Bounties</Link>
        <span className="text-muted-foreground/80">&#183;</span>
        <Link href="#">Subscribe</Link>
      </div>

      <AvatarContainer />
    </header>
  );
};

export default Header;
