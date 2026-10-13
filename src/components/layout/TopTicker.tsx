"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";

interface WinnerEvent {
  user: string;
  game: string;
  multiplier?: string;
  amount: string;
  sportIcon: string;
}

const LIVE_WINNERS: WinnerEvent[] = [
  { user: "Rajesh***42", game: "CSK vs MI", multiplier: "@2.35", amount: "₹48,250", sportIcon: "cricket" },
  { user: "Alex_99", game: "Aviator", multiplier: "@18.4x", amount: "₹142,000", sportIcon: "plane" },
  { user: "Vikram_K", game: "Arsenal vs Chelsea", multiplier: "@2.90", amount: "₹34,800", sportIcon: "football" },
  { user: "Pooja_R", game: "Lightning Roulette", multiplier: "@50x", amount: "₹85,000", sportIcon: "slot-machine" },
  { user: "David_L", game: "Alcaraz vs Sinner", multiplier: "@3.25", amount: "₹52,000", sportIcon: "tennis" },
  { user: "Sneha_M", game: "Teen Patti Live", multiplier: "@25x", amount: "₹62,500", sportIcon: "dice" },
  { user: "Mohit_G", game: "Mines 5x5", multiplier: "@14.8x", amount: "₹74,000", sportIcon: "bomb" },
];

export function TopTicker() {
  const { openModal } = useUI();
  const [oddsFormat, setOddsFormat] = useState<"decimal" | "fractional" | "american">("decimal");
  const [showOddsDropdown, setShowOddsDropdown] = useState(false);

  return (
    <div className="w-full bg-[#0B0C0E] border-b border-[#1E2127] text-[11px] px-3 sm:px-4 h-[28px] flex items-center justify-between select-none z-50 text-white/50">
      {/* Left: Real-time Live Winners Marquee */}
      <div className="flex items-center gap-2 overflow-hidden flex-1 max-w-[65%] sm:max-w-[75%]">
        <div className="flex items-center gap-1 shrink-0 text-[10px] uppercase font-bold text-white/40 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">LIVE FEED:</span>
        </div>

        {/* Marquee ticker container */}
        <div className="overflow-hidden whitespace-nowrap relative flex-1">
          <div className="inline-flex items-center gap-5 animate-marquee">
            {[...LIVE_WINNERS, ...LIVE_WINNERS].map((win, idx) => (
              <div key={idx} className="inline-flex items-center gap-1.5 text-[10.5px]">
                <FlaticonIcon name={win.sportIcon} className="text-xs text-[#FEE500]" />
                <span className="text-white/60 font-medium">{win.user}</span>
                <span className="text-white/30">won</span>
                <span className="font-semibold text-white font-mono">{win.amount}</span>
                <span className="text-white/30">on</span>
                <span className="text-white/70">{win.game}</span>
                <span className="text-emerald-400 font-mono font-medium">{win.multiplier}</span>
                <span className="text-white/15 mx-1">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Utility: Odds Format, 24/7 Support, 18+ */}
      <div className="flex items-center gap-3 shrink-0 text-[11px]">
        {/* Odds Format Selector */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowOddsDropdown(!showOddsDropdown)}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-white/60 hover:text-white transition-colors font-mono"
            title="Switch Odds Display Format"
          >
            <span className="text-white/30 font-sans">Odds:</span>
            <span className="font-semibold text-white capitalize">{oddsFormat}</span>
            <ChevronDown className="w-3 h-3 text-white/40" />
          </button>

          {showOddsDropdown && (
            <div className="absolute right-0 top-full mt-1 w-32 rounded-lg bg-[#181A1F] border border-[#2B2F3A] shadow-xl py-1 z-50 flex flex-col">
              {(["decimal", "fractional", "american"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    setOddsFormat(fmt);
                    setShowOddsDropdown(false);
                  }}
                  className="px-3 py-1.5 text-left text-xs hover:bg-white/[0.06] hover:text-[#FEE500] transition-colors capitalize flex items-center justify-between"
                >
                  <span>{fmt}</span>
                  {oddsFormat === fmt && <span className="w-1.5 h-1.5 rounded-full bg-[#FEE500]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-3 w-[1px] bg-white/[0.08] hidden md:block" />

        {/* 24/7 Support */}
        <button
          onClick={() => openModal("responsibleGaming")}
          className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
        >
          <HelpCircle className="w-3 h-3" />
          <span className="hidden sm:inline">Support 24/7</span>
        </button>

        <div className="h-3 w-[1px] bg-white/[0.08]" />

        {/* Responsible Gaming Badge */}
        <button
          onClick={() => openModal("responsibleGaming")}
          className="flex items-center gap-1 text-white/40 hover:text-white transition-colors font-semibold"
        >
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span className="font-mono text-[10px]">18+ GLI-19</span>
        </button>
      </div>
    </div>
  );
}
