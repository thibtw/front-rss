import React from "react";

interface Props {
  name: string;
}

const Button: React.FC<Props> = ({ name }) => {
  return (
    <button className="rounded-full bg-white text-black pt-1 pb-1 pl-3 pr-3">
      {name}
    </button>
  );
};

export default Button;
