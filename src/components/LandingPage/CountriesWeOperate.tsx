import Image from "next/image";
import React from "react";
import { Ellipse } from "../ui/icons";

const CountriesWeOperate = () => {
  return (
    <div className="grid lg:grid-cols-2 my-[10rem]">
      <Image
        src="/images/world_map.svg"
        alt=""
        width={1200}
        height={650}
        className="w-full hidden lg:block"
      />

      <div className="lg:mr-[10rem]  place-self-center p-10">
        <h4 className="text-primary text-[48px] text-center lg:text-left font-bold">
          Countries We Operate In
        </h4>
        <p className="text-[20px] text-[#212121] text-center lg:text-left">
          Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.{" "}
        </p>
        <div className="-space-y-[6rem] mt-5">
          <div className="flex -space-x-10">
            <Ellipse text="Nigeria" color="#F0E5F6" className="z-4" />
            <Ellipse text="Congo" color="#FAF2EF" className="z-2" />
          </div>

          <div className="flex ml-[8rem] -space-x-3">
            <Ellipse text="Egypt" color="#EFFAF1" className="z-3" />
            <div className="-mt-[5rem]">
              <Ellipse text="+6 more" color="#F5F4F9" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountriesWeOperate;
