"use client";

import { Dot, Star } from "lucide-react";
import React from "react";
import PriceCard from "./PriceCard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Pricing = () => {
  const [active, setActive] = React.useState(0);

  return (
    <div className="flex flex-col items-center my-[10rem]">
      <h1 className="text-[48px] font-bold">Transparent Pricing Plans</h1>

      <div className="text-[#163C63] text-[15px] flex gap-3 items-center my-5">
        <div className="bg-gradient-to-r from-[#FFFFFF] from-20% to-[#FCDF78] rounded-[12px] w-fit py-1 px-3">
          One-time purchase
        </div>
        <Dot color="#C56A1D" />
        <div className="bg-gradient-to-r from-[#FFFFFF] from-20% to-[#FCDF78] rounded-[12px] w-fit py-1 px-3">
          All the features in every plane
        </div>
        <Dot color="#C56A1D" />
        <div className="bg-gradient-to-r from-[#FFFFFF] from-20% to-[#FCDF78] rounded-[12px] w-fit py-1 px-3">
          30-day Money Back Guarantee
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <div className="flex -space-x-3">
          <Avatar className="size-[40px] border border-white">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="size-[40px] border border-white">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="size-[40px] border border-white">
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar className="size-[40px] border border-white">
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar className="size-[40px] border border-white">
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar className="size-[40px] border border-white">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} fill="#FFC600" color="#FFC600" size={13} />
            ))}
          </div>

          <p className="text-[10px] font-[400]">from 70+ happy customers</p>
        </div>
      </div>

      <div className="bg-white rounded-[100px] my-7">
        <button
          className={`rounded-[100px] text-black px-5 py-2 ${
            active === 0 ? "bg-[#0E0E55] text-white" : ""
          }`}
          onClick={() => setActive(0)}
        >
          Yearly
        </button>
        <button
          className={`rounded-[100px] text-black px-5 py-2 ${
            active === 1 ? "bg-[#0E0E55] text-white" : ""
          }`}
          onClick={() => setActive(1)}
        >
          Monthly
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        <PriceCard
          features={["One month subscription", "Benefit One", "Benefit One"]}
          price="92,000"
          description="Perfect for Parents"
          checkmarkColor="#737373"
          category="Personal"
          buttonText="Subscribe to Parent Plan"
        />

        <PriceCard
          features={[
            "Unlock all pro features",
            "Additional profile boosts available.",
            "Additional profile boosts available.",
            "Additional profile boosts available.",
            "One year full support",
            "Email support",
          ]}
          price="200,000"
          description="Perfect for Surrogates"
          checkmarkColor="#F6F6F6"
          category="Standand"
          buttonText="Subscribe to Surrogate Plan"
          backgroundColor="#0E0E55"
          mostPopular={true}
        />

        <PriceCard
          features={["One month subscription", "Benefit One", "Benefit One"]}
          price="92,000"
          description="Perfect for Clinics/Agents"
          checkmarkColor="#737373"
          category="Pro"
          buttonText="Subscribe to Pro Plan"
        />
      </div>
    </div>
  );
};

export default Pricing;
