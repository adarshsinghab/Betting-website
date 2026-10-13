"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Zap, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { useBetSlip } from "@/context/BetSlipContext";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  tournament: string;
  sport: string;
  badge: string;
  badgeColor: string;
  ctaText: string;
  boostedOdds?: number;
  originalOdds?: number;
  promoCode?: string;
  highlightText: string;
  bgGradient: string;
  actionType: "bet" | "deposit" | "casino";
}

const SLIDES: Slide[] = [
  {
    id: "hero-ipl-01",
    tournament: "TATA IPL 2026",
    sport: "cricket",
    title: "Chennai Super Kings vs Mumbai Indians",
    subtitle: "CSK to Win & Jadeja 1+ Six • Boosted Match Odds",
    badge: "SUPER BOOST",
    badgeColor: "bg-[#FEE500] text-black font-extrabold",
    boostedOdds: 2.35,
    originalOdds: 1.82,
    ctaText: "BET NOW",
    highlightText: "Today, 19:30 IST • Wankhede Stadium",
    bgGradient: "from-[#282E3C] via-[#222733] to-[#1E232E]",
    actionType: "bet",
  },
  {
    id: "hero-welcome-02",
    tournament: "WELCOME PROMO",
    sport: "bonus",
    title: "150% Welcome Sports Bonus",
    subtitle: "Get up to ₹30,000 on your first deposit with instant UPI activation",
    badge: "₹30,000 BONUS",
    badgeColor: "bg-emerald-500 text-black font-extrabold",
    promoCode: "BANTU150",
    ctaText: "CLAIM BONUS",
    highlightText: "Min deposit ₹200 • Instant Payouts",
    bgGradient: "from-[#25302A] via-[#222834] to-[#1E232E]",
    actionType: "deposit",
  },
  {
    id: "hero-ucl-03",
    tournament: "CHAMPIONS LEAGUE",
    sport: "football",
    title: "Arsenal FC vs Chelsea FC",
    subtitle: "Arsenal to Win & Over 2.5 Goals • Enhanced Combo",
    badge: "SPECIAL ACCA",
    badgeColor: "bg-red-500 text-white font-extrabold",
    boostedOdds: 2.90,
    originalOdds: 2.10,
    ctaText: "BET NOW",
    highlightText: "Saturday, 17:30 IST • Emirates Stadium",
    bgGradient: "from-[#2E2729] via-[#222834] to-[#1E232E]",
    actionType: "bet",
  },
];

export function SportsHeroCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addItem } = useBetSlip();
  const { addToast, openModal, setActiveTab } = useUI();

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = SLIDES[currentIdx];

  const handleAction = () => {
    if (slide.actionType === "bet" && slide.boostedOdds) {
      addItem({
        id: `hero-${slide.id}`,
        matchId: slide.id,
        matchTitle: slide.title,
        marketName: "Special Boosted Accumulator",
        selectionName: slide.subtitle,
        odds: slide.boostedOdds,
        sport: slide.sport,
        isLive: true,
      });

      addToast({
        type: "gold",
        message: `Added to Bet Slip @ ${slide.boostedOdds.toFixed(2)}`,
      });
    } else if (slide.actionType === "deposit") {
      openModal("deposit");
    } else if (slide.actionType === "casino") {
      setActiveTab("instant-games");
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "relative w-full rounded-xl border border-[#232630] p-4 select-none shadow-md overflow-hidden bg-gradient-to-r",
        slide.bgGradient
      )}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Column: Tournament, Title, Subtitle */}
        <div className="flex flex-col gap-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider",
                slide.badgeColor
              )}
            >
              {slide.badge}
            </span>
            <span className="text-white/40 font-mono text-[11px] font-semibold uppercase">
              {slide.tournament}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {slide.title}
          </h2>

          <div className="text-xs text-white/70 font-medium">
            {slide.subtitle}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-white/40 pt-0.5 font-mono">
            <Clock className="w-3 h-3 text-white/40" />
            <span>{slide.highlightText}</span>
          </div>
        </div>

        {/* Right Odds & Action Button */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-end w-full sm:w-auto justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
          {slide.boostedOdds && (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-white tabular-nums">
                {slide.boostedOdds.toFixed(2)}
              </span>
              <span className="text-xs font-mono line-through text-white/40">
                {slide.originalOdds?.toFixed(2)}
              </span>
            </div>
          )}

          {slide.promoCode && (
            <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              Code: {slide.promoCode}
            </div>
          )}

          <button
            onClick={handleAction}
            className="px-4 py-2 rounded-lg bg-[#FEE500] hover:bg-[#FFF033] text-black font-extrabold text-xs active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                currentIdx === idx ? "w-6 bg-[#FEE500]" : "w-1.5 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
            className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentIdx((prev) => (prev + 1) % SLIDES.length)}
            className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
