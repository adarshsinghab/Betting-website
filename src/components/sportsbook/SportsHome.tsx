"use client";

import React, { useState, useMemo } from "react";
import { 
  Trophy, 
  Flame, 
  Calendar,
  Layers
} from "lucide-react";
import { SportsHeroCarousel } from "./SportsHeroCarousel";
import { MatchCard } from "./MatchCard";
import { useUI } from "@/context/UIContext";
import { MOCK_NORMALIZED_MATCHES } from "@/lib/providers/sportsProvider";
import { cn } from "@/lib/utils";

export function SportsHome() {
  const { activeSport, setActiveSport, setActiveTab } = useUI();
  const [filterType, setFilterType] = useState<"all" | "live" | "today">("all");

  const matchesForSport = useMemo(() => {
    if (activeSport === "all") return MOCK_NORMALIZED_MATCHES;
    return MOCK_NORMALIZED_MATCHES.filter((m) => m.sport === activeSport);
  }, [activeSport]);

  const filteredMatches = useMemo(() => {
    return matchesForSport.filter((m) => {
      if (filterType === "live") return m.isLive;
      if (filterType === "today") return !m.isLive;
      return true;
    });
  }, [matchesForSport, filterType]);

  const allCount = matchesForSport.length;
  const liveCount = matchesForSport.filter((m) => m.isLive).length;
  const upcomingCount = matchesForSport.filter((m) => !m.isLive).length;

  return (
    <div className="flex flex-col gap-3 py-1 select-none w-full">
      {/* 1. Hero Promo Banner */}
      <SportsHeroCarousel />

      {/* 2. Clean Match Filter Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-[#2E3544] pb-2 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setFilterType("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
              filterType === "all"
                ? "bg-[#2B313F] text-white border border-[#3A4356]"
                : "text-white/60 hover:text-white"
            )}
          >
            All Matches ({allCount})
          </button>

          <button
            onClick={() => setFilterType("live")}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
              filterType === "live"
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : "text-white/60 hover:text-red-400"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>Live ({liveCount})</span>
          </button>

          <button
            onClick={() => setFilterType("today")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
              filterType === "today"
                ? "bg-[#2B313F] text-white border border-[#3A4356]"
                : "text-white/60 hover:text-white"
            )}
          >
            Upcoming ({upcomingCount})
          </button>
        </div>

        {/* Clean Region / Server Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-white/50 text-[11px] font-mono shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#FEE500]" />
          <span>India Server (Mumbai) • INR Active</span>
        </div>
      </div>

      {/* 3. Empty State Fallback */}
      {filteredMatches.length === 0 && (
        <div className="p-8 rounded-xl bg-[#212631] border border-[#2E3544] text-center flex flex-col items-center justify-center gap-3">
          <div className="text-white/50 text-sm">
            No matches found for this filter.
          </div>
          <button
            onClick={() => {
              setActiveSport("all");
              setFilterType("all");
            }}
            className="px-4 py-2 rounded-lg bg-[#FEE500] text-black font-bold text-xs"
          >
            View All Matches
          </button>
        </div>
      )}

      {/* 4. Matches List with generous spacing */}
      <div className="flex flex-col gap-2.5">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
