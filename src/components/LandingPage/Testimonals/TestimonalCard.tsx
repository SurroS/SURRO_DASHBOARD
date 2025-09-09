import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import React from "react";

interface Props {
  text: string;
  name: string;
  role: string;
}

const TestimonalCard = (props: Props) => {
  return (
    <div
      style={{
        boxShadow: "0px 2px 3px 0px rgba(0, 0, 0, 0.12)",
      }}
      className="p-5 rounded-[20px] w-fit"
    >
      <p className="text-[15px] font-[400] w-[300px]">{props.text}</p>
      <div className="my-3 flex items-center gap-3">
        <Avatar className="size-[48px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-[#0D141C] text-[13px] font-bold">{props.name}</h3>
          <p className="uppercase text-[10px] font-semibold">{props.role}</p>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} fill="#FFC600" color="#FFC600" size={12} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonalCard;
