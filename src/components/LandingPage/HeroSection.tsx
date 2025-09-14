import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-2 items-center px-10 lg:pl-[100px] gap-10 mt-10 lg:mt-30">
        <div className="mb-10">
          <h1 className="text-[48px] lg:text-[72px] font-bold  bg-gradient-to-r from-[#012770] via-[#3651BB] to-[#6C6CD3] bg-clip-text text-transparent leading-20">
            Connecting Intended Parents with Verified Surrogates{" "}
          </h1>
          <p className="text-[#212121] text-[24px] mt-3 w-[90%]">
            Building trust in surrogacy around the world safely, transparently,
            affordably and efficiently and Fast
          </p>

          <div className="space-x-5 mt-5">
            <Button className="bg-primary text-info h-[45px] text-[18px]">
              Get started
            </Button>
            <Button className="bg-info text-primary h-[45px] text-[18px] hover:bg-info">
              Learn How It Works
            </Button>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex -space-x-3">
              <Avatar className="size-[40px] border border-white">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="size-[40px] border border-white">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="size-[40px] border border-white">
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar className="size-[40px] border border-white">
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar className="size-[40px] border border-white">
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
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
        </div>

        <div className="hidden lg:flex h-[300px] self-end w-fit bg-gradient-to-r from-[#3651BB] from-20% to-[#6C6CD3]">
          <Image
            src={"/images/mother 1.svg"}
            alt=""
            width={200}
            height={200}
            className="-mt-30"
          />
          <div className="-mt-[13rem]">
            <Image
              src={"/images/mother 2.svg"}
              alt=""
              width={200}
              height={200}
              //   className="-mt-30"
            />
            <Image
              src={"/images/mother 3.svg"}
              alt=""
              width={200}
              height={200}
              className="-mt-[10rem]"
            />
          </div>
          <Image
            src={"/images/mother 4.svg"}
            alt=""
            width={200}
            height={200}
            className="-mt-30"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#012770] via-[#3651BB] to-[#6C6CD3] h-[150px]" />
    </div>
  );
};

export default HeroSection;
