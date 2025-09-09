import React from "react";

const CheckmarkCircle = ({ color }: { color: string }) => {
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

export default CheckmarkCircle;
