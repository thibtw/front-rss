"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNav } from "@/widgets/Sidebar/model/sidebarNav";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-black/60 border-r border-white/10 pt-8">
      <nav className="flex flex-col px-4">
        {sidebarNav.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                px-4 py-3 mb-2 rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
