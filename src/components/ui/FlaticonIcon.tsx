"use client";

import React from "react";
import { SportIcon, SportIconName } from "./SportIcon";

export type FlaticonName = SportIconName;

interface FlaticonIconProps extends React.HTMLAttributes<HTMLElement> {
  name: FlaticonName | string;
  className?: string;
  size?: number | string;
}

export function FlaticonIcon({
  name,
  className,
  size = 16,
  style,
  ...props
}: FlaticonIconProps) {
  return (
    <SportIcon
      name={name}
      className={className}
      size={size}
      style={style}
      {...(props as any)}
    />
  );
}
