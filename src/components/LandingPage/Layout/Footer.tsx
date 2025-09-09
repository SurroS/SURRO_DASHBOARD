import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0E0E55] flex justify-between items-start text-white p-20">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-b from-white to-[#FBBC04] bg-clip-text text-transparent">
          Surro
        </h1>
        <p className="text-[15px]">© SurroSantara is a .........</p>
      </div>
      <div className="flex gap-10 ">
        <div className="space-y-3">
          <h4 className="font-semibold text-[24px]">Quick links</h4>
          <div className="grid gap-4">
            <Link href="/">About Us</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Carriers</Link>
            <Link href="/">Contact</Link>
            <Link href="/">FAQs</Link>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-[24px]">Legal</h4>
          <div className="grid gap-4">
            <Link href="/">Terms</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-[24px]">Partner/Sponsor logos</h4>
          {/* <div className="grid gap-4">
            <Link href="/">Terms</Link>
            <Link href="/">Privacy Policy</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
