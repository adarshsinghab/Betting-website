"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type FlaticonName =
  | "football"
  | "basketball"
  | "tennis"
  | "cricket"
  | "volleyball"
  | "badminton"
  | "ping-pong"
  | "boxing-glove"
  | "gamepad"
  | "bolt"
  | "trophy"
  | "rocket"
  | "dice"
  | "bomb"
  | "slot-machine"
  | "plane"
  | "bank"
  | "diamond"
  | "coins"
  | "usd-circle"
  | "flame"
  | "tv-retro"
  | "gift"
  | "search"
  | "bell"
  | "headset"
  | "shield-check"
  | "star"
  | "clock"
  | "globe"
  | "baseball"
  | "golf-ball"
  | "playing-cards"
  | "chess"
  | "home"
  | "crown"
  | "wallet"
  | "plus"
  | "arrow-up-right"
  | "menu-burger"
  | "receipt"
  | "trash"
  | "cross-small";

interface FlaticonIconProps extends React.HTMLAttributes<HTMLElement> {
  name: FlaticonName | string;
  className?: string;
  size?: number | string;
}

export function FlaticonIcon({
  name,
  className,
  size,
  style,
  ...props
}: FlaticonIconProps) {
  // Normalize alias names
  const normalizedName =
    name === "table-tennis" ? "ping-pong" :
    name === "mma" || name === "ufc" ? "boxing-glove" :
    name === "esports" ? "gamepad" :
    name === "all" ? "bolt" :
    name;

  return (
    <i
      className={cn(`fi fi-rr-${normalizedName}`, "inline-flex items-center justify-center leading-none", className)}
      style={{
        fontSize: size ? (typeof size === "number" ? `${size}px` : size) : undefined,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}
