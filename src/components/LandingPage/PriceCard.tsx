import React from "react";
import { Button } from "../ui/button";
import CheckmarkCirle from "../ui/icons";

interface Props {
  category: string;
  buttonText: string;
  features: string[];
  price: string;
  description: string;
  mostPopular?: boolean;
  checkmarkColor: string;
  backgroundColor?: string;
}

const PriceCard: React.FC<Props> = ({
  category,
  buttonText,
  features,
  price,
  description,
  mostPopular = false,
  checkmarkColor,
  backgroundColor = "#FFFFFF",
}) => {
  return (
    <div
      className="shadow-md rounded-[23px] p-10 relative hover:shadow-2xl hover:scale-105 transition duration-500"
      style={{
        backgroundColor,
        color: backgroundColor === "#FFFFFF" ? "#212121" : "white",
      }}
    >
      <div className="bg-[#EBF4FE] h-[50px] w-[50px] rounded-[10px]"></div>
      <div
        className={`bg-info text-black rounded-[12px] text-[15px] my-5 px-3  w-fit`}
      >
        <p>{category}</p>
      </div>
      <h5 className="text-[48px] font-bold">₦{price}</h5>
      <p
        className={`${
          mostPopular ? "text-white" : "text-[#737373]"
        }  text-[15px]`}
      >
        {description}
      </p>

      <Button
        className={`my-5  mt-6 h-[55px] w-[355px] ${
          mostPopular
            ? "bg-info text-brand-primary hover:bg-info/70"
            : "bg-brand-primary text-white"
        }`}
      >
        {buttonText}
      </Button>

      <div className="space-y-4 mt-5">
        {features.map((item, index) => (
          <div
            key={index}
            className="text-[#737373 text-[15px] flex items-center gap-2"
          >
            <CheckmarkCirle color={checkmarkColor} />
            <p className="underline">{item}</p>
          </div>
        ))}
      </div>
      {mostPopular && (
        <div className="absolute w-fit px-5 py-2 text-[15px] top-0 right-5 bg-gradient-to-r from-[#012770] via-[#3651BB] to-[#6C6CD3] rounded-b-[18px] uppercase">
          <p className="bg-gradient-to-r from-[#FFFFFF] to-[#FCDF78] text-transparent bg-clip-text">
            Most Popular
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceCard;
