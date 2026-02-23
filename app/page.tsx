"use client";

import Button from "@/shared/ui/Button";
import DemoContainer from "@/widgets/DemoContainer";

function HomeContent(): React.JSX.Element {
  return (
    <div>
      <main className="flex flex-col items-center pt-30 pb-30 justify-center gap-8 bg-black text-white ">
        <div className="text-8xl font-jakarta content-center text-center justify-center font-medium">
          Find the best
          <br /> offers, faster
        </div>
        <div className="font-jakarta font-medium text-gray-400 max-w-100 text-center">
          Discover opportunities from multiple platforms in one clean,
          distraction-free space. All the best job listings from top platforms,
          tailored to your goals.
        </div>
        <Button name="Start for free" />
      </main>
      <DemoContainer />
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return <HomeContent />;
}
