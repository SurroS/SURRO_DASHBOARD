import React from "react";
import StepCard from "./StepCard";

const HowItWorks = () => {
  return (
    <div className="px-[100px] mt-[5rem]">
      <h2 className="text-[48px] font-bold">How It Works </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
        <StepCard step={1} title="Register  and Verify your identity" />
        <StepCard step={2} title="Browse or List Opportunities" />
        <StepCard step={3} title="Connect via Secure Platform" />
        <StepCard step={4} title="Guided Support Until Match" />
      </div>
    </div>
  );
};

export default HowItWorks;
