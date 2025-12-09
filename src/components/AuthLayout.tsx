"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  description?: string;
  bottomTextPrefix?: string;
  bottomLinkHref?: string;
  bottomLinkText?: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  description,
  bottomTextPrefix,
  bottomLinkHref,
  bottomLinkText,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 lg:py-12">
      <div className="grid w-full max-w-[1500px] grid-cols-1 gap-1 lg:grid-cols-12">
        <div className="hidden lg:flex items-center justify-center col-span-7">
          <div className="relative w-[92%] min-h-[80vh] rounded-3xl border border-muted-foreground/10 shadow-2xl overflow-hidden">
            <Image
              src="/images/auth-bg.png"
              alt="Abstract background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-start lg:col-span-5">
          <div className="w-full min-h-[65vh] max-w-lg rounded-2xl border-6 border-muted-foreground/5 bg-background shadow-sm p-6 md:p-8">
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
              {description ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="mt-6 space-y-6">{children}</div>

            {bottomTextPrefix && bottomLinkHref && bottomLinkText ? (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {bottomTextPrefix}{" "}
                  <a
                    href={bottomLinkHref}
                    className="text-primary hover:underline font-medium"
                  >
                    {bottomLinkText}
                  </a>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
