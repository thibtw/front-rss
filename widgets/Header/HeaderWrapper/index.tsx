"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DesktopHeader from "@/widgets/Header/DesktopHeader";
import MobileHeader from "@/widgets/Header/MobileHeader";
import HomeHeader from "@/widgets/Header/HomeHeader";

const HeaderWrapper: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname.startsWith("/home");

  if (isHomePage) {
    return (
      <>
        <div className="md:hidden sticky top-0 z-50 backdrop-blur-md bg-black/40">
          <HomeHeader />
        </div>
        <div className="hidden md:block sticky top-0 z-50 backdrop-blur-md bg-black/40">
          <HomeHeader />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="md:hidden sticky top-0 z-50 backdrop-blur-md bg-black/40">
        <MobileHeader />
      </div>
      <div className="hidden md:block sticky top-0 z-50 backdrop-blur-md bg-black/40">
        <DesktopHeader />
      </div>
    </>
  );
};

export default HeaderWrapper;
