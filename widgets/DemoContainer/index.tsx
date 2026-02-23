import React from "react";
import DemoGridItem from "@/shared/ui/DemoGridItem";

const url =
  "https://www.free-mockup.com/wp-content/uploads/edd/2026/02/iphone-app-screen-mockup-set-01.webp";

const mockups = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  link: url,
}));

const DemoContainer: React.FC = () => {
  return (
    <div className="w-full max-w-none px-4">
      <div className="grid gap-4 [grid-template-columns:1fr_2fr_1fr_2fr]">
        {mockups.map(({ id, link }) => (
          <DemoGridItem key={id} link={link} />
        ))}
      </div>
    </div>
  );
};

export default DemoContainer;
