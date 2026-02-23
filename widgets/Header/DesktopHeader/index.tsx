"use client";

import React from "react";
import Button from "@/shared/ui/Button";
import Logo from "@/shared/ui/Logo";
import { headerNav } from "@/widgets/Header/model/headerNav";
import { scrollToId } from "@/shared/lib/utils/scrollToId";

const DesktopHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-3 items-center pt-6 pb-3 pl-16 pr-16  text-white ">
      <Logo />

      <div className="justify-self-center flex flex-row gap-10">
        {headerNav.map((item) => {
          return (
            <span
              className="cursor-pointer hover:text-gray-300 transition-colors"
              onClick={() => scrollToId(item.containerId)}
              key={item.labelKey}
            >
              {item.name}
            </span>
          );
        })}
      </div>

      <div className="justify-self-end flex gap-5">
        <button>Log in</button>
        <Button name={"Sign up"} />
      </div>
    </div>
  );
};

export default DesktopHeader;
