import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navabar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white h-[var(--navbar-height)] flex items-center justify-between p-5 px-10 border-b border-[#D2D1D0] z-50">
      <div className="w-[200px]">
        <h3 className="font-[600] text-[32px] ">Surro</h3>
      </div>
      <div className="flex items-end gap-[24px] font-semibold text-[16px]">
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">FAQs</Link>
        <Link href="/">Careers</Link>
      </div>
      <div className="space-x-5">
        <Button className="bg-info text-primary h-[45px] text-[18px] hover:bg-info">
          Sign in
        </Button>
        <Button className="bg-primary text-info h-[45px] text-[18px]">
          Get started
        </Button>
      </div>
    </nav>
  );
};

export default Navabar;
