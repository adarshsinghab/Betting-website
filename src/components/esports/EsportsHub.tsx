"use client";

import React, { useState } from "react";
import { 
  Gamepad2, 
  Flame, 
  Tv, 
  Sparkles, 
  ShieldCheck, 
  Trophy 
} from "lucide-react";
import { OddsButton } from "@/components/sportsbook/OddsButton";
import { MOCK_ESPORT_MATCHES } from "@/data/mock/esports";
import { cn } from "@/lib/utils";

export function EsportsHub() {
  const [selectedGame, setSelectedGame] = useState<string>("all");

  const filteredMatches = MOCK_ESPORT_MATCHES.filter(
    (m) => selectedGame === "all" || m.gameTitle.toLowerCase() === selectedGame.toLowerCase()
  );

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl sm:rounded-3xl border border-cyan-500/30 overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-black shadow-2xl">
        <div className="max-w-xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-black font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
              <Gamepad2 className="w-3 h-3 fill-black" />
              <span>ESPORTS ARENA</span>
            </span>
            <span className="text-xs text-cyan-300 font-bold">CS2, DOTA 2, VALORANT & LOL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Major Tournaments & Live Streams
          </h2>

          <p className="text-xs sm:text-sm text-white/60">
            Real-time live telemetry, map handicap betting, total kills, and instant odds flashes.
          </p>
        </div>
      </div>

      {/* Game Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {["all", "cs2", "dota2", "valorant", "lol"].map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGame(g)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase whitespace-nowrap transition-all",
              selectedGame === g
                ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                : "bg-white/[0.04] text-white/60 hover:text-white"
            )}
          >
            {g === "all" ? "All Esports" : g}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredMatches.map((match) => {
          const mainMarket = match.markets[0];
          const oddsA = mainMarket?.selections[0]?.odds || 1.85;
          const oddsB = mainMarket?.selections[1]?.odds || 1.95;

          return (
            <div
              key={match.id}
              className="glass-card rounded-2xl p-4 border border-white/[0.07] hover:border-cyan-400/40 transition-all flex flex-col gap-3 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-cyan-400 uppercase text-[10px]">
                    {match.gameTitle}
                  </span>
                  <span>•</span>
                  <span className="truncate">{match.tournament}</span>
                </div>
                {match.isLive && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>MAP {match.currentMap || 1} LIVE</span>
                  </div>
                )}
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between gap-3 py-1">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <div className="w-7 h-7 rounded-xl bg-white/[0.08] flex items-center justify-center text-xs font-bold text-cyan-300">
                    {match.teamA.shortName || match.teamA.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span>{match.teamA.name}</span>
                </div>

                <span className="text-white/30 text-xs font-bold font-mono">VS</span>

                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <span>{match.teamB.name}</span>
                  <div className="w-7 h-7 rounded-xl bg-white/[0.08] flex items-center justify-center text-xs font-bold text-cyan-300">
                    {match.teamB.shortName || match.teamB.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Odds */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.05]">
                <OddsButton
                  label={match.teamA.name}
                  odds={oddsA}
                  betItem={{
                    matchId: match.id,
                    matchTitle: `${match.teamA.name} vs ${match.teamB.name}`,
                    market: "Match Winner",
                    selection: match.teamA.name,
                    sport: "esports",
                  }}
                />
                <OddsButton
                  label={match.teamB.name}
                  odds={oddsB}
                  betItem={{
                    matchId: match.id,
                    matchTitle: `${match.teamA.name} vs ${match.teamB.name}`,
                    market: "Match Winner",
                    selection: match.teamB.name,
                    sport: "esports",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
