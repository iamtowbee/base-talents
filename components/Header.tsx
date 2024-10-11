"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import AvatarContainer from "@/components/AvatarContainer";

// import Image from "next/image";

const Header = () => {
  const [top, setTop] = useState(true);
  const pathName = usePathname();

  const scrollHandler = () => {
    window.scrollY >= 15 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 py-8 xl:py-12 bg-white text-primary z-10 transition-shadow duration-400 ${
        top ? "border-b border-accent/15" : "shadow-md"
      }`}
    >
      <div
        className={`container mx-auto flex flex-col gap-4 items-center justify-center ${
          !top && "pt-8"
        } transition-all duration-500 ease-in-out`}
      >
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-extrabold">
            Base Pathner
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

        <AvatarContainer />
      </div>
    </header>
  );
};

export default Header;
