import React from "react";
import Button from "@/shared/ui/Button";

const Header: React.FC = () => {
  return (
    <div className="grid sticky top-0 grid-cols-3 items-center bg-black pt-3 pb-3 pl-16 pr-16 bg-black/40 text-white backdrop-blur-md">
      <div className="justify-self-start">Logo</div>

      <div className="justify-self-center flex flex-row gap-10">
        <div>Platforms</div>
        <div>Features</div>
        <div>Reviews</div>
        <div>Demo</div>
      </div>

      <div className="justify-self-end flex gap-5">
        <button>Log in</button>
        <Button name={"Sign up"} />
      </div>
    </div>
  );
};

export default Header;
