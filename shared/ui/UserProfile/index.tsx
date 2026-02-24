"use client";

import React from "react";
import Image from "next/image";

interface Props {
  name?: string;
  avatar?: string;
}

const UserProfile: React.FC<Props> = ({ name = "User", avatar }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <span className="text-white font-medium hidden md:block">{name}</span>
    </div>
  );
};

export default UserProfile;
