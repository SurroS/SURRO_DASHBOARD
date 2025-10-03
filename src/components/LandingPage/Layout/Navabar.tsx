'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Navabar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white h-[var(--navbar-height)] flex items-center justify-between p-5 px-10 border-b border-[#D2D1D0] z-50">
      <div className="w-[200px]">
        <Link href="/">
          <h3 className="font-[600] text-[32px] ">
            <Image src="/icons/logo-no-bg.png" alt="" width={100} height={100} />
          </h3>
        </Link>
      </div>
      <div className="flex items-end gap-[24px] font-semibold text-[16px]">
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">FAQs</Link>
        <Link href="/">Careers</Link>
        {user && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Settings</Link>
          </>
        )}
      </div>
      <div className="space-x-5">
        {user ? (
          <Button 
            onClick={handleLogout}
            className="bg-red-600 text-white h-[45px] text-[18px] hover:bg-red-700"
          >
            Logout
          </Button>
        ) : (
          <>
            <Link href="/login">
              <Button className="bg-info text-primary h-[45px] text-[18px] hover:bg-info">
                Sign in
              </Button>
            </Link>
            <Button className="bg-primary text-info h-[45px] text-[18px]">
              Get started
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navabar;
