import Image from "next/image";
import React from "react";

const HowSurroWorks = () => {
  return (
    <div className="flex items-center justify-center flex-col text-white bg-[#35355B] p-15">
      <h2 className="text-[48px] font-bold">How Surro Works</h2>
      <p className="text-[20px] font-[400]">
        You can skip this for now; the video will be saved in your Resources for
        later.
      </p>
      <Image
        src="/images/dummy video.svg"
        alt=""
        width={1200}
        height={650}
        className="mt-5"
      />
    </div>
  );
};

export default HowSurroWorks;
