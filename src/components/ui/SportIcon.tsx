"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SportIconName =
  | "cricket"
  | "football"
  | "tennis"
  | "basketball"
  | "esports"
  | "table-tennis"
  | "ping-pong"
  | "mma"
  | "ufc"
  | "boxing"
  | "boxing-glove"
  | "badminton"
  | "volleyball"
  | "baseball"
  | "trophy"
  | "all"
  | "bolt"
  | "crown"
  | "live"
  | "casino"
  | "chip"
  | "slot-machine"
  | "receipt"
  | string;

interface SportIconProps extends React.SVGProps<SVGSVGElement> {
  name: SportIconName;
  className?: string;
  size?: number | string;
}

export function SportIcon({ name, className = "", size = 16, ...props }: SportIconProps) {
  const norm = (name || "").toLowerCase().trim();
  const dimension = typeof size === "number" ? `${size}px` : size;

  const baseSvgProps = {
    width: dimension,
    height: dimension,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("shrink-0 inline-block align-middle", className),
    ...props,
  };

  // 1. CRICKET: Bat crossed with ball & wicket bails
  if (norm === "cricket") {
    return (
      <svg {...baseSvgProps}>
        {/* Cricket Bat */}
        <path d="M4.5 19.5L14 10l2 2-9.5 9.5a1.4 1.4 0 0 1-2 0l-.5-.5a1.4 1.4 0 0 1 0-2z" fill="currentColor" fillOpacity="0.2" />
        {/* Bat Handle */}
        <path d="M14 10l3.5-3.5a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L17 13" />
        <path d="M17 7l2.5-2.5" />
        {/* Cricket Ball with Seam */}
        <circle cx="18" cy="18" r="3" fill="currentColor" fillOpacity="0.25" />
        <path d="M16 17a2.5 2.5 0 0 1 3.5 2" strokeWidth="1.5" />
      </svg>
    );
  }

  // 2. FOOTBALL / SOCCER: Crisp soccer ball with pentagon core
  if (norm === "football" || norm === "soccer") {
    return (
      <svg {...baseSvgProps}>
        <circle cx="12" cy="12" r="9" />
        {/* Center Pentagon */}
        <polygon points="12,8 15,10.5 14,14 10,14 9,10.5" fill="currentColor" fillOpacity="0.25" strokeWidth="1.5" />
        {/* Seam Radials to Outer Edge */}
        <line x1="12" y1="8" x2="12" y2="3" strokeWidth="1.5" />
        <line x1="15" y1="10.5" x2="20" y2="9.5" strokeWidth="1.5" />
        <line x1="14" y1="14" x2="18" y2="18" strokeWidth="1.5" />
        <line x1="10" y1="14" x2="6" y2="18" strokeWidth="1.5" />
        <line x1="9" y1="10.5" x2="4" y2="9.5" strokeWidth="1.5" />
      </svg>
    );
  }

  // 3. TENNIS: Tennis ball with authentic curved seams
  if (norm === "tennis") {
    return (
      <svg {...baseSvgProps}>
        <circle cx="12" cy="12" r="9" />
        {/* Authentic tennis seam curve left */}
        <path d="M5.5 5.5A9.2 9.2 0 0 1 5.5 18.5" strokeWidth="1.6" />
        {/* Authentic tennis seam curve right */}
        <path d="M18.5 5.5A9.2 9.2 0 0 0 18.5 18.5" strokeWidth="1.6" />
      </svg>
    );
  }

  // 4. BASKETBALL: Ribbed basketball lines
  if (norm === "basketball") {
    return (
      <svg {...baseSvgProps}>
        <circle cx="12" cy="12" r="9" />
        <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.5" />
        <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1.5" />
        <path d="M5.5 5.5A10 10 0 0 1 18.5 18.5" strokeWidth="1.5" />
        <path d="M5.5 18.5A10 10 0 0 0 18.5 5.5" strokeWidth="1.5" />
      </svg>
    );
  }

  // 5. ESPORTS / GAMEPAD: Pro Gaming Controller
  if (norm === "esports" || norm === "gamepad") {
    return (
      <svg {...baseSvgProps}>
        <rect x="2" y="6" width="20" height="12" rx="4" fill="currentColor" fillOpacity="0.15" />
        {/* D-Pad */}
        <path d="M7 10v4M5 12h4" strokeWidth="2" />
        {/* Face Buttons */}
        <circle cx="16" cy="10.5" r="1" fill="currentColor" />
        <circle cx="18" cy="12.5" r="1" fill="currentColor" />
        <circle cx="16" cy="14.5" r="1" fill="currentColor" />
        <circle cx="14" cy="12.5" r="1" fill="currentColor" />
        {/* Grips */}
        <path d="M4 18l-1 2M20 18l1 2" strokeWidth="2" />
      </svg>
    );
  }

  // 6. TABLE TENNIS / PING-PONG: Paddle with ball
  if (norm === "table-tennis" || norm === "ping-pong") {
    return (
      <svg {...baseSvgProps}>
        {/* Paddle Head */}
        <circle cx="10" cy="10" r="6.5" fill="currentColor" fillOpacity="0.2" />
        {/* Paddle Handle */}
        <path d="M14.5 14.5L20 20" strokeWidth="3" strokeLinecap="round" />
        {/* Ball */}
        <circle cx="19" cy="6" r="2" fill="currentColor" />
      </svg>
    );
  }

  // 7. UFC / MMA / BOXING: Combat Boxing Glove
  if (norm === "mma" || norm === "ufc" || norm === "boxing" || norm === "boxing-glove") {
    return (
      <svg {...baseSvgProps}>
        {/* Glove Body */}
        <path
          d="M8 4c3.5 0 8 1 8 6v4c0 3-2 5-5 5H9c-3 0-5-2-5-5V9c0-3 2-5 4-5z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        {/* Thumb */}
        <path d="M16 10c2 0 3.5 1 3.5 2.5s-1.5 2.5-3.5 2.5" />
        {/* Wrist Band */}
        <path d="M4 16h12v3H4z" strokeWidth="1.8" />
        {/* Lace detail */}
        <line x1="8" y1="10" x2="12" y2="10" strokeWidth="1.5" />
        <line x1="8" y1="13" x2="12" y2="13" strokeWidth="1.5" />
      </svg>
    );
  }

  // 8. BADMINTON: Shuttlecock
  if (norm === "badminton") {
    return (
      <svg {...baseSvgProps}>
        {/* Cork Base */}
        <path d="M10 18a2 2 0 0 0 4 0v-2h-4v2z" fill="currentColor" />
        {/* Feather Cone */}
        <path d="M10 16L6 5h12l-4 11" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
        {/* Internal ribbing */}
        <line x1="12" y1="5" x2="12" y2="16" strokeWidth="1.5" />
        <line x1="9" y1="10" x2="15" y2="10" strokeWidth="1.5" />
      </svg>
    );
  }

  // 9. VOLLEYBALL: 3-panel spiral curves
  if (norm === "volleyball") {
    return (
      <svg {...baseSvgProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 7.8 4.5L12 12" strokeWidth="1.5" />
        <path d="M19.8 16.5A9 9 0 0 1 12 21L12 12" strokeWidth="1.5" />
        <path d="M4.2 16.5A9 9 0 0 1 4.2 7.5L12 12" strokeWidth="1.5" />
      </svg>
    );
  }

  // 10. BASEBALL: Stitched baseball
  if (norm === "baseball") {
    return (
      <svg {...baseSvgProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M7 4.5c2 2.5 2 12.5 0 15" strokeWidth="1.5" />
        <path d="M17 4.5c-2 2.5-2 12.5 0 15" strokeWidth="1.5" />
      </svg>
    );
  }

  // 11. TROPHY / CHAMPIONSHIP / ALL SPORTS
  if (norm === "trophy" || norm === "all" || norm === "bolt") {
    return (
      <svg {...baseSvgProps}>
        <path d="M6 4h12v4a6 6 0 0 1-12 0V4z" fill="currentColor" fillOpacity="0.2" />
        <path d="M6 6H3a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h1" />
        <path d="M18 6h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-1" />
        <path d="M12 14v4" strokeWidth="2.2" />
        <path d="M8 20h8" strokeWidth="2.2" />
      </svg>
    );
  }

  // 12. CROWN / VIP
  if (norm === "crown") {
    return (
      <svg {...baseSvgProps}>
        <path
          d="M3 18h18l-2-10-4.5 4L12 4l-2.5 8L5 8l-2 10z"
          fill="currentColor"
          fillOpacity="0.25"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="4" r="1" fill="currentColor" />
        <circle cx="5" cy="8" r="1" fill="currentColor" />
        <circle cx="19" cy="8" r="1" fill="currentColor" />
      </svg>
    );
  }

  // 13. CASINO / 777 / CHIP / SLOTS
  if (norm === "casino" || norm === "chip" || norm === "slot-machine") {
    return (
      <svg {...baseSvgProps}>
        <circle cx="12" cy="12" r="8.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="12" cy="12" r="5" strokeDasharray="2.5 2" />
        <line x1="12" y1="3.5" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="20.5" />
        <line x1="3.5" y1="12" x2="7" y2="12" />
        <line x1="17" y1="12" x2="20.5" y2="12" />
      </svg>
    );
  }

  // 14. IN-PLAY LIVE RADAR
  if (norm === "live" || norm === "radar") {
    return (
      <svg {...baseSvgProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <line x1="12" y1="12" x2="18" y2="7" strokeWidth="1.8" />
      </svg>
    );
  }

  // 15. BETSLIP RECEIPT TICKET
  if (norm === "receipt" || norm === "betslip") {
    return (
      <svg {...baseSvgProps}>
        <path d="M4 3h16v18l-3-2-3 2-2-2-3 2-2-2-3 2V3z" fill="currentColor" fillOpacity="0.15" />
        <line x1="8" y1="8" x2="16" y2="8" strokeWidth="1.8" />
        <line x1="8" y1="12" x2="14" y2="12" strokeWidth="1.8" />
        <line x1="8" y1="16" x2="12" y2="16" strokeWidth="1.8" />
      </svg>
    );
  }

  // Default Fallback
  return (
    <svg {...baseSvgProps}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="12,8 15,10.5 14,14 10,14 9,10.5" />
    </svg>
  );
}
