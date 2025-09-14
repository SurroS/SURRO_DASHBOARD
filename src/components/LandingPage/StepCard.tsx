import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  step: number;
  title: string;
}

const StepCard = (props: Props) => {
  return (
    <div className="border border-[#EBF4FE] rounded-[8px] w-full lg:w-fit p-5 grid grid-cols-2 gap-5">
      <div className="flex flex-col justify-between">
        <div className="bg-[#EBF4FE] w-fit text-[#163C63] text-[12px] px-3 py-1 rounded-[10px]">
          Step {props.step}
        </div>
        <p className="text-[#163C63] text-[32px] font-semibold leading-[120%]">
          {props.title}
        </p>
        <p className="text-[#212121] text-[15px]">
          Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <Link href="/">
          <p className="border-b border-[#2D75C3] w-fit flex items-center gap-2text-[#163C63] text-[15px]">
            Read more <ArrowRight size={17} color="#2D75C3" />
          </p>
        </Link>
      </div>
      <div>
        <Image
          src={"/images/works.svg"}
          alt=""
          width={300}
          height={300}
          className="w-[320px] h-[330px]"
        />
      </div>
    </div>
  );
};

export default StepCard;
