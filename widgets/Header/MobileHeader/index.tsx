"use client";

import React, { useState } from "react";
import Logo from "@/shared/ui/Logo";
import Button from "@/shared/ui/Button";
import { headerNav, ContainerId } from "@/widgets/Header/model/headerNav";
import { scrollToId } from "@/shared/lib/utils/scrollToId";

const MobileHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = (): void => {
    setOpen(!open);
  };

  const closeMenu = (): void => {
    setOpen(false);
  };

  const handleNavClick = (containerId: ContainerId): void => {
    scrollToId(containerId);
    closeMenu();
  };

  return (
    <>
      <div className="flex sticky top-0 z-50 justify-between items-center pt-6 pb-3 pl-4 pr-4 md:pl-16 md:pr-16 bg-black/40 backdrop-blur-md">
        <Logo />
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center gap-1.5 items-center w-8 h-8 text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
              open ? "rotate-45 translate-y-2" : "-translate-y-0"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
              open ? "-rotate-45 -translate-y-2" : "translate-y-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed top-[68px] min-h-full left-0 right-0 bottom-0 h-[calc(100dvh-68px)] z-40 bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="flex flex-col py-8 px-4 ">
          {headerNav.map((item) => (
            <span
              key={item.labelKey}
              onClick={() => handleNavClick(item.containerId)}
              className="text-white py-4 px-4 text-lg font-medium hover:text-gray-300 transition-colors cursor-pointer"
            >
              {item.name}
            </span>
          ))}
          <div className="flex flex-col gap-4 mt-4 px-4">
            <button
              onClick={closeMenu}
              className="text-white text-left py-2 text-lg font-medium hover:text-gray-300 transition-colors"
            >
              Log in
            </button>
            <div onClick={closeMenu}>
              <Button name="Sign up" />
            </div>
          </div>
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 top-[68px]"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default MobileHeader;
