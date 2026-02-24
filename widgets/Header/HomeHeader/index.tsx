"use client";

import React from "react";
import Logo from "@/shared/ui/Logo";
import UserProfile from "@/shared/ui/UserProfile";

const HomeHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between pt-6 pb-3 pl-16 pr-16 text-white">
      <Logo />
      <UserProfile name="John Doe" />
    </div>
  );
};

export default HomeHeader;
