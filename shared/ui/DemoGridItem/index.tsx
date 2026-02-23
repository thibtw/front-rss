import React from "react";
import Image from "next/image";

interface Props {
  link: string;
}

const DemoGridItem: React.FC<Props> = ({ link }) => {
  return (
    <div>
      <Image
        className="rounded-xl"
        width={1000}
        height={1000}
        src={link}
        alt="demo img"
      />
    </div>
  );
};

export default DemoGridItem;
