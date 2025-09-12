import React from "react";

export const CheckmarkCircle = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 3.33801C15.4806 2.45874 13.7555 1.99712 12 2.00001C6.477 2.00001 2 6.47701 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C21.9987 11.3133 21.932 10.6467 21.8 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.059 6.833 22 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Ellipse = ({
  text,
  color,
  className,
}: {
  text: string;
  color: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex justify-center items-center w-fit h-fit relative ${className}`}
    >
      <svg
        width="266"
        height="265"
        viewBox="0 0 266 265"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_g_1877_10619)">
          <ellipse cx="133" cy="132.5" rx="129" ry="128.5" fill={color} />
        </g>
        <defs>
          <filter
            id="filter0_g_1877_10619"
            x="0"
            y="0"
            width="266"
            height="265"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.052631579339504242 0.052631579339504242"
              numOctaves="3"
              seed="1840"
            />
            <feDisplacementMap
              in="shape"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
              width="100%"
              height="100%"
            />
            <feMerge result="effect1_texture_1877_10619">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <p className="text-[#212121] text-[32px] font-semibold absolute top-0 left-0 w-full h-full flex items-center justify-center">
        {text}
      </p>
    </div>
  );
};
