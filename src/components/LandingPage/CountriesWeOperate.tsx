import Image from "next/image";
import React from "react";

const CountriesWeOperate = () => {
  return (
    <div className="grid grid-cols-2 my-[10rem]">
      <Image
        src="/images/world_map.svg"
        alt=""
        width={1200}
        height={650}
        className="w-full"
      />

      <div className="mr-[10rem]">
        <h4 className="text-primary text-[48px] font-bold">
          Countries We Operate In
        </h4>
        <p className="text-[20px] text-[#212121]">
          Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.{" "}
        </p>
      </div>
    </div>
  );
};

export default CountriesWeOperate;
