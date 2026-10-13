"use client";

import React, { useState } from "react";
import { 
  Zap, 
  Flame, 
  Bomb, 
  Plane, 
  Sparkles, 
  ShieldCheck, 
  Play, 
  TrendingUp,
  CircleDot,
  Radio
} from "lucide-react";
import { AviatorSimulator } from "./AviatorSimulator";
import { MinesGame } from "./MinesGame";
import { useUI } from "@/context/UIContext";
import { MOCK_CASINO_GAMES } from "@/lib/providers/casinoProvider";
import { cn } from "@/lib/utils";

export function InstantGamesHub() {
  const { openModal } = useUI();
  const [activeEngine, setActiveEngine] = useState<"aviator" | "mines">("aviator");

  const instantGames = MOCK_CASINO_GAMES.filter((g) => g.category === "instant");

  const handleLaunchGame = (game: any) => {
    openModal("gamePlay", { game });
  };

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* 1. Instant Games Top Banner */}
      <div className="rounded-xl border border-[#242834] bg-[#14161D] overflow-hidden p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#FEE500] text-black font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3 h-3 fill-black" />
                <span>PROVABLY FAIR 2.0</span>
              </span>
              <span className="text-xs text-white/50 font-mono font-bold">SPRIBE & BGAMING ENGINE</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Crash & Instant Mini-Games Arena
            </h2>

            <p className="text-xs text-white/60">
              Multiplier climbs in real-time. Cash out before the flight takes off or reveal diamonds without hitting a mine. Up to 10,000x multiplier.
            </p>
          </div>

          {/* Quick stats badge */}
          <div className="hidden lg:flex items-center gap-4 shrink-0 bg-[#1A1D27] p-3.5 rounded-xl border border-[#242834]">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-white/40 uppercase font-bold">Max Win</span>
              <span className="text-sm font-black text-[#FEE500] font-mono">10,000x</span>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.08]" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-white/40 uppercase font-bold">Max RTP</span>
              <span className="text-sm font-black text-emerald-400 font-mono">99.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Quick Simulator Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
        <button
          onClick={() => setActiveEngine("aviator")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeEngine === "aviator"
              ? "bg-[#FEE500] text-black shadow-md"
              : "bg-white/[0.04] text-white/60 hover:text-white"
          )}
        >
          <Plane className="w-4 h-4" />
          <span>Aviator Flight Engine</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </button>

        <button
          onClick={() => setActiveEngine("mines")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeEngine === "mines"
              ? "bg-emerald-500 text-black shadow-md"
              : "bg-white/[0.04] text-white/60 hover:text-white"
          )}
        >
          <Bomb className="w-4 h-4" />
          <span>Mines 5x5 Grid</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/20 text-black font-black">
            HOT
          </span>
        </button>
      </div>

      {/* 3. Render Active Interactive Simulator Engine */}
      <div className="w-full">
        {activeEngine === "aviator" && <AviatorSimulator />}
        {activeEngine === "mines" && <MinesGame />}
      </div>

      {/* 4. Real Playable Instant Games Grid (Linked to Official Demo iFrames) */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#FEE500]" />
            <span>Official Licensed Instant Games ({instantGames.length})</span>
          </h3>
          <span className="text-[11px] text-white/40">Click any title to launch official HTML5 session</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {instantGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleLaunchGame(game)}
              className="p-3.5 rounded-2xl bg-[#0B0C12] hover:bg-[#12141E] border border-white/[0.08] hover:border-[#FEE500]/50 transition-all cursor-pointer flex flex-col justify-between gap-3 shadow-lg group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-white/[0.06] text-white/80 border border-white/[0.06]">
                  {game.tags[0] || "INSTANT"}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  RTP {game.rtp}%
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2">
                <div>
                  <div className="font-extrabold text-white text-sm group-hover:text-[#FEE500] transition-colors">
                    {game.title}
                  </div>
                  <div className="text-[11px] text-white/40 flex items-center gap-1.5 mt-0.5">
                    <span>{game.provider}</span>
                    <span>•</span>
                    <span className="text-[#FEE500] font-mono">{game.maxMultiplier}</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-[#FEE500] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md shrink-0">
                  <Play className="w-4 h-4 fill-black ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
