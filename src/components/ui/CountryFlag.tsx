"use client";

import React from "react";

interface CountryFlagProps {
  countryCode: string;
  className?: string;
  size?: number;
}

export function CountryFlag({ countryCode, className = "", size = 16 }: CountryFlagProps) {
  const code = (countryCode || "").toUpperCase().trim();
  const width = size;
  const height = Math.round(size * 0.72);

  // 1. INDIA (Tiranga)
  if (code === "IN" || code === "INDIA") {
    return (
      <svg width={width} height={height} viewBox="0 0 24 18" className={`rounded-[3px] shrink-0 shadow-sm ${className}`}>
        <rect width="24" height="6" fill="#FF9933" />
        <rect y="6" width="24" height="6" fill="#FFFFFF" />
        <rect y="12" width="24" height="6" fill="#138808" />
        <circle cx="12" cy="9" r="2.2" fill="#000080" />
      </svg>
    );
  }

  // 2. GREAT BRITAIN / UK / PREMIER LEAGUE
  if (code === "GB" || code === "UK" || code === "ENGLAND") {
    return (
      <svg width={width} height={height} viewBox="0 0 24 18" className={`rounded-[3px] shrink-0 shadow-sm ${className}`}>
        <rect width="24" height="18" fill="#012169" />
        <path d="M0 0l24 18M24 0L0 18" stroke="#FFFFFF" strokeWidth="2.8" />
        <path d="M0 0l24 18M24 0L0 18" stroke="#C8102E" strokeWidth="1.6" />
        <path d="M12 0v18M0 9h24" stroke="#FFFFFF" strokeWidth="5" />
        <path d="M12 0v18M0 9h24" stroke="#C8102E" strokeWidth="3" />
      </svg>
    );
  }

  // 3. EUROPE / UEFA CHAMPIONS LEAGUE
  if (code === "EU" || code === "EUROPE") {
    return (
      <svg width={width} height={height} viewBox="0 0 24 18" className={`rounded-[3px] shrink-0 shadow-sm ${className}`}>
        <rect width="24" height="18" fill="#003399" />
        <circle cx="12" cy="9" r="5.5" stroke="#FFCC00" strokeWidth="1.2" strokeDasharray="1.5,1.5" fill="none" />
      </svg>
    );
  }

  // 4. USA / NBA
  if (code === "US" || code === "USA") {
    return (
      <svg width={width} height={height} viewBox="0 0 24 18" className={`rounded-[3px] shrink-0 shadow-sm ${className}`}>
        <rect width="24" height="18" fill="#B22234" />
        <path d="M0 3.6h24M0 7.2h24M0 10.8h24M0 14.4h24" stroke="#FFFFFF" strokeWidth="1.8" />
        <rect width="11" height="9" fill="#3C3B6E" />
        <circle cx="5.5" cy="4.5" r="2" fill="#FFFFFF" opacity="0.9" />
      </svg>
    );
  }

  // 5. SPAIN / LA LIGA
  if (code === "ES" || code === "SPAIN") {
    return (
      <svg width={width} height={height} viewBox="0 0 24 18" className={`rounded-[3px] shrink-0 shadow-sm ${className}`}>
        <rect width="24" height="4.5" fill="#AA151B" />
        <rect y="4.5" width="24" height="9" fill="#F1BF00" />
        <rect y="13.5" width="24" height="4.5" fill="#AA151B" />
      </svg>
    );
  }

  // 6. GERMANY / BUNDESLIGA
  if (code === "DE" || code === "GERMANY") {
    return (
      <svg width={width} height={height} viewBox="0 0 24 18" className={`rounded-[3px] shrink-0 shadow-sm ${className}`}>
        <rect width="24" height="6" fill="#000000" />
        <rect y="6" width="24" height="6" fill="#DD0000" />
        <rect y="12" width="24" height="6" fill="#FFCE00" />
      </svg>
    );
  }

  // 7. ITALY / SERIE A
  if (code === "IT" || code === "ITALY") {
    return (
      <svg width={width} height={height} viewBox="0 0 24 18" className={`rounded-[3px] shrink-0 shadow-sm ${className}`}>
        <rect width="8" height="18" fill="#009246" />
        <rect x="8" width="8" height="18" fill="#FFFFFF" />
        <rect x="16" width="8" height="18" fill="#CE2B37" />
      </svg>
    );
  }

  // 8. INTERNATIONAL / GLOBE
  return (
    <svg width={width} height={height} viewBox="0 0 24 18" className={`rounded-[3px] shrink-0 shadow-sm ${className}`}>
      <rect width="24" height="18" fill="#242A36" />
      <circle cx="12" cy="9" r="4.5" stroke="#FEE500" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M12 4.5v9M7.5 9h9" stroke="#FEE500" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
