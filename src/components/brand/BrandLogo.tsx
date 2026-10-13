"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "primary" | "secondary" | "tertiary" | "emblem-only";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function BrandLogo({
  variant = "primary",
  className,
  width,
  height,
  priority = true,
}: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  const isEmblem = variant === "emblem-only" || variant === "secondary";
  
  // Official logos copied directly from the directory:
  // - Primary horizontal lockup: /brand/logo-transparent.png (or /brand/primary-logo-clean.png)
  // - Secondary round gold coin emblem: /brand/secondary-logo-dark.png (or /brand/secondary-logo-clean.png)
  const imageSrc = isEmblem
    ? "/brand/secondary-logo-dark.png"
    : "/brand/logo-transparent.png";

  const defaultWidth = isEmblem ? 42 : 168;
  const defaultHeight = isEmblem ? 42 : 44;

  const finalWidth = width || defaultWidth;
  const finalHeight = height || defaultHeight;

  return (
    <div
      className={cn(
        "inline-flex items-center select-none group cursor-pointer transition-transform hover:opacity-95 active:scale-[0.98]",
        className
      )}
    >
      {!imgError ? (
        <div className="relative flex items-center justify-center">
          <Image
            src={imageSrc}
            alt="Betting Bantu - Play Smarter Win Bigger"
            width={finalWidth}
            height={finalHeight}
            priority={priority}
            onError={() => setImgError(true)}
            className={cn(
              "object-contain w-auto h-auto max-h-[44px] drop-shadow-[0_2px_8px_rgba(254,229,0,0.15)]",
              isEmblem ? "rounded-full" : ""
            )}
            style={{ maxHeight: finalHeight }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FEE500] text-black font-black flex items-center justify-center text-xs shadow-md">
            BB
          </div>
          <div className="flex items-baseline gap-1 leading-none">
            <span className="font-black italic text-base sm:text-lg tracking-tight text-white uppercase">
              BETTING
            </span>
            <span className="font-black italic text-base sm:text-lg tracking-tight text-[#FEE500] uppercase">
              BANTU
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
