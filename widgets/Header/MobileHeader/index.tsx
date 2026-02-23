"use client";

import React, { useState } from "react";
import Logo from "@/shared/ui/Logo";

const MobileHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex sticky top-0 z-50 justify-between pt-6 pb-3 pl-16 pr-16 bg-black/40 backdrop-blur-md">
      <Logo />
      <div onClick={() => setOpen(!open)} className="text-white">
        {!open ? "open" : "close"}
      </div>
    </div>
  );
};

export default MobileHeader;
