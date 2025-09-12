import Image from "next/image";
import React from "react";

const HowSurroWorks = () => {
  return (
    <div className="bg-[#35355B] relative overflow-hidden">
      <Image
        src={"/overlays/lightrays.svg"}
        alt=""
        width={1200}
        height={650}
        className="z-10 w-full h-[130%] absolute top-0 left-0 opacity-70 blur-md"
      />
      <Image
        src={"/overlays/yellow-shadow.svg"}
        alt=""
        width={800}
        height={100}
        className="z-0 absolute h-[120%] top-0 right-0 opacity-70 blur-sm"
      />
      <div className="flex items-center justify-center flex-col text-white p-15 z-40 relative">
        <h2 className="text-[48px] font-bold">How Surro Works</h2>
        <p className="text-[20px] font-[400]">
          You can skip this for now; the video will be saved in your Resources
          for later.
        </p>
        <Image
          src="/images/dummy video.svg"
          alt=""
          width={1200}
          height={650}
          className="mt-10"
        />
      </div>
    </div>
  );
};

export default HowSurroWorks;
