import React from "react";
import TestimonalCard from "./TestimonalCard";

const Testimonals = () => {
  const Testimonals: { name: string; role: string; text: string }[] = [
    {
      name: "Ayodeji Adaeze",
      role: "medical advisor - HAPPYLIFE MEDICALS",
      text: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      name: "Ayodeji Adaeze",
      role: "medical advisor - HAPPYLIFE MEDICALS",
      text: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      name: "Ayodeji Adaeze",
      role: "medical advisor - HAPPYLIFE MEDICALS",
      text: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      name: "Ayodeji Adaeze",
      role: "medical advisor - HAPPYLIFE MEDICALS",
      text: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      name: "Ayodeji Adaeze",
      role: "medical advisor - HAPPYLIFE MEDICALS",
      text: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      name: "Ayodeji Adaeze",
      role: "medical advisor - HAPPYLIFE MEDICALS",
      text: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-[48px] font-bold">
        What users are saying
      </h2>
      <p className="text-[#737373] text-center text-[20px] lg:w-[40%] mx-auto font-[400]">
        Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.
      </p>
      <div className="flex items-center justify-center">
        <div className="grid lg:grid-cols-3 gap-7 p-10">
          {Testimonals.map((testimonal, index) => (
            <TestimonalCard
              key={index}
              text={testimonal.text}
              name={testimonal.name}
              role={testimonal.role}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 bg-[#0E0E55] flex flex-col items-center justify-center p-10 py-15 rounded-[23px] -mb-10 border border-amber-200">
        <p className="bg-gradient-to-r from-white from-30% to-[#FCDF78] bg-clip-text text-transparent text-center text-[48px] font-bold lg:w-[60%] leading-[120%]">
          Join the First Transparent Surrogacy Match Platform Today
        </p>
        <p className="font-[400] text-[20px] text-white w-[60%] text-center my-5">
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <button className="bg-[#EBF4FE] text-[#080833] rounded-[8px] w-[110px] h-[35px] mt-10 text-[13px]">
          Join a role now
        </button>
      </div>
    </div>
  );
};

export default Testimonals;
