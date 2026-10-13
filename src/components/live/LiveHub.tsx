"use client";

import React, { useState } from "react";
import { 
  Flame, 
  Activity, 
  Clock 
} from "lucide-react";
import { MatchCard } from "@/components/sportsbook/MatchCard";
import { MOCK_NORMALIZED_MATCHES } from "@/lib/providers/sportsProvider";
import { SportType } from "@/types";
import { cn } from "@/lib/utils";

export function LiveHub() {
  const [selectedSport, setSelectedSport] = useState<SportType | "all">("all");
  const liveMatches = MOCK_NORMALIZED_MATCHES.filter((m) => m.isLive && (selectedSport === "all" || m.sport === selectedSport));
  const activeMatch = liveMatches[0] || MOCK_NORMALIZED_MATCHES[0];

  return (
    <div className="flex flex-col gap-3.5 py-1 select-none">
      {/* 1. Live Match Radar Banner */}
      <div className="rounded-xl bg-[#212631] border border-[#2E3544] overflow-hidden p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              IN-PLAY RADAR • {activeMatch.liveMinute ? `${activeMatch.liveMinute}'` : activeMatch.period || "2H"}
            </span>
          </div>
          <span className="text-xs text-white/60 font-medium">{activeMatch.league || "Premier League"}</span>
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between gap-3 py-1">
          <div className="flex-1 text-right">
            <div className="font-bold text-sm sm:text-base text-white">
              {activeMatch.homeTeam?.name || "Arsenal FC"}
            </div>
            <div className="text-[11px] text-white/50">Possession: 58%</div>
          </div>

          <div className="px-4 py-1.5 rounded-lg bg-[#282D3A] border border-[#343C4D] flex items-center gap-2 font-mono font-bold text-xl sm:text-2xl text-white">
            <span>{activeMatch.homeTeam?.score ?? 2}</span>
            <span className="text-white/30">:</span>
            <span>{activeMatch.awayTeam?.score ?? 1}</span>
          </div>

          <div className="flex-1 text-left">
            <div className="font-bold text-sm sm:text-base text-white">
              {activeMatch.awayTeam?.name || "Chelsea FC"}
            </div>
            <div className="text-[11px] text-white/50">Possession: 42%</div>
          </div>
        </div>

        {/* Virtual Pitch Line */}
        <div className="relative w-full h-14 rounded-lg bg-[#14261F] border border-emerald-900/60 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-x-0 h-[1px] bg-emerald-500/20 top-1/2" />
          <div className="absolute inset-y-0 w-[1px] bg-emerald-500/20 left-1/2" />
          <div className="w-10 h-10 rounded-full border border-emerald-500/20" />

          <div className="relative z-10 px-3 py-1 rounded-md bg-black/70 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>ATTACK • {activeMatch.homeTeam?.name || "Arsenal"} pressing forward</span>
          </div>
        </div>
      </div>

      {/* 2. Sport Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {(["all", "cricket", "football", "tennis", "basketball", "esports"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSport(s)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors",
              selectedSport === s
                ? "bg-[#FEE500] text-[#111317] font-bold shadow-sm"
                : "bg-[#212631] text-white/70 hover:text-white border border-[#2E3544]"
            )}
          >
            {s === "all" ? "All In-Play" : s}
          </button>
        ))}
      </div>

      {/* 3. Live Matches Grid */}
      <div className="flex flex-col gap-2.5">
        {liveMatches.map((match) => (
          <MatchCard key={match.id} match={match} featured />
        ))}
      </div>
    </div>
  );
}
