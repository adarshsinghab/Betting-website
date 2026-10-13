"use client";

import React from "react";

interface CountryFlagProps {
  countryCode: string;
  className?: string;
  size?: number;
}

export function CountryFlag({ countryCode, className = "", size = 16 }: CountryFlagProps) {
  const code = countryCode.toUpperCase();

  switch (code) {
    case "IN":
    case "INDIA":
      return (
        <svg width={size} height={size * 0.75} viewBox="0 0 24 18" className={`rounded-[2px] shrink-0 ${className}`}>
          <rect width="24" height="6" fill="#FF9933" />
          <rect y="6" width="24" height="6" fill="#FFFFFF" />
          <rect y="12" width="24" height="6" fill="#138808" />
          <circle cx="12" cy="9" r="2.2" fill="#000080" />
        </svg>
      );
    case "GB":
    case "UK":
    case "ENGLAND":
      return (
        <svg width={size} height={size * 0.75} viewBox="0 0 24 18" className={`rounded-[2px] shrink-0 ${className}`}>
          <rect width="24" height="18" fill="#012169" />
          <path d="M0,0 L24,18 M24,0 L0,18" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M0,0 L24,18 M24,0 L0,18" stroke="#C8102E" strokeWidth="1.5" />
          <path d="M12,0 V18 M0,9 H24" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M12,0 V18 M0,9 H24" stroke="#C8102E" strokeWidth="3" />
        </svg>
      );
    case "EU":
    case "EUROPE":
      return (
        <svg width={size} height={size * 0.75} viewBox="0 0 24 18" className={`rounded-[2px] shrink-0 ${className}`}>
          <rect width="24" height="18" fill="#003399" />
          <circle cx="12" cy="9" r="5" stroke="#FFCC00" strokeWidth="1" strokeDasharray="1.5,1.5" fill="none" />
        </svg>
      );
    case "US":
    case "USA":
      return (
        <svg width={size} height={size * 0.75} viewBox="0 0 24 18" className={`rounded-[2px] shrink-0 ${className}`}>
          <rect width="24" height="18" fill="#B22234" />
          <path d="M0,3.6 H24 M0,7.2 H24 M0,10.8 H24 M0,14.4 H24" stroke="#FFFFFF" strokeWidth="1.8" />
          <rect width="11" height="9" fill="#3C3B6E" />
          <circle cx="5.5" cy="4.5" r="2" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );
    case "ES":
    case "SPAIN":
      return (
        <svg width={size} height={size * 0.75} viewBox="0 0 24 18" className={`rounded-[2px] shrink-0 ${className}`}>
          <rect width="24" height="4.5" fill="#AA151B" />
          <rect y="4.5" width="24" height="9" fill="#F1BF00" />
          <rect y="13.5" width="24" height="4.5" fill="#AA151B" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size * 0.75} viewBox="0 0 24 18" className={`rounded-[2px] shrink-0 ${className}`}>
          <rect width="24" height="18" fill="#20242D" />
          <circle cx="12" cy="9" r="4" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
      );
  }
}
