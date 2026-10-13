"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Play,
  Clock,
  Zap,
  TrendingUp,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useBetSlip } from "@/context/BetSlipContext";
import { cn } from "@/lib/utils";

interface VirtualEvent {
  id: string;
  sport: "football" | "cricket" | "horses";
  title: string;
  round: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  drawOdds?: number;
  awayOdds: number;
  over25Odds: number;
  under25Odds: number;
  simulatedTimeSec: number;
  homeScore: number;
  awayScore: number;
  status: "countdown" | "in_progress" | "finished";
}

const INITIAL_VIRTUALS: VirtualEvent[] = [
  {
    id: "virt-fb-01",
    sport: "football",
    title: "Virtual Premier League",
    round: "Matchday 28",
    homeTeam: "London Red (Arsenal)",
    awayTeam: "Manchester Blue (Man City)",
    homeOdds: 2.35,
    drawOdds: 3.20,
    awayOdds: 2.80,
    over25Odds: 1.80,
    under25Odds: 1.95,
    simulatedTimeSec: 62,
    homeScore: 1,
    awayScore: 2,
    status: "in_progress",
  },
  {
    id: "virt-crick-02",
    sport: "cricket",
    title: "Virtual Super T20",
    round: "Over 4 of 5",
    homeTeam: "Chennai Super Warriors",
    awayTeam: "Mumbai Dynamites",
    homeOdds: 1.90,
    awayOdds: 1.90,
    over25Odds: 1.75,
    under25Odds: 2.05,
    simulatedTimeSec: 40,
    homeScore: 48,
    awayScore: 52,
    status: "in_progress",
  },
  {
    id: "virt-race-03",
    sport: "horses",
    title: "Virtual Derby Gold Cup",
    round: "Ascot Sprint 1200m",
    homeTeam: "1. Golden Thunder",
    awayTeam: "2. Royal Pegasus",
    homeOdds: 3.10,
    awayOdds: 2.45,
    over25Odds: 4.50,
    under25Odds: 1.20,
    simulatedTimeSec: 85,
    homeScore: 0,
    awayScore: 0,
    status: "countdown",
  },
];

export function VirtualSportsHub() {
  const { addToast } = useUI();
  const { addItem, items } = useBetSlip();
  const [activeSport, setActiveSport] = useState<"football" | "cricket" | "horses">("football");
  const [events, setEvents] = useState<VirtualEvent[]>(INITIAL_VIRTUALS);
  const [roundTimer, setRoundTimer] = useState(48);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoundTimer((prev) => (prev > 1 ? prev - 1 : 90));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddBet = (event: VirtualEvent, market: string, sel: string, odds: number) => {
    const betItemId = `virt-${event.id}-${sel}`;
    addItem({
      id: betItemId,
      selectionId: betItemId,
      matchId: event.id,
      matchTitle: `${event.homeTeam} vs ${event.awayTeam} (Virtual)`,
      marketName: market,
      selectionName: sel,
      odds,
      sport: event.sport,
      isLive: true,
    });
  };

  const filteredEvents = events.filter((e) => e.sport === activeSport);

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* Hero Header */}
      <div className="relative rounded-3xl glass-card border border-indigo-500/30 overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-indigo-950/40 via-[#0E1020] to-black shadow-2xl">
        <div className="relative z-10 max-w-xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-indigo-400" />
              <span>NON-STOP 24/7 RNG SIMULATION</span>
            </span>
            <span className="text-xs text-white/50">Results every 90 seconds</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Virtual Sports Arena
          </h2>

          <p className="text-xs sm:text-sm text-white/60">
            Certified cryptographic virtual leagues. Bet on instant Football, T20 Cricket and Derby Races with live animated match progression.
          </p>
        </div>
      </div>

      {/* Sport Category Tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: "football", label: "Virtual Football" },
            { id: "cricket", label: "Virtual Cricket T20" },
            { id: "horses", label: "Virtual Horse Racing" },
          ].map((sp) => (
            <button
              key={sp.id}
              onClick={() => setActiveSport(sp.id as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                activeSport === sp.id
                  ? "bg-[#FEE500] text-black shadow-md"
                  : "bg-white/[0.04] text-white/60 hover:text-white"
              )}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Global Next Round Timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
          <Clock className="w-3.5 h-3.5 text-[#FEE500]" />
          <span className="text-white/40">Next Round in:</span>
          <span className="font-mono font-bold text-[#FEE500]">{roundTimer}s</span>
        </div>
      </div>

      {/* Virtual Event Showcase */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="glass-card rounded-3xl border border-white/[0.08] p-5 flex flex-col gap-4 shadow-xl bg-[#0B0C12]"
          >
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-white/50">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white/80">{evt.title}</span>
                <span>•</span>
                <span className="text-[#FEE500] font-mono">{evt.round}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE SIMULATION</span>
              </div>
            </div>

            {/* Score & Visual Match Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/50 border border-white/[0.06]">
              <div className="text-base sm:text-lg font-black text-white flex-1 text-center sm:text-left">
                {evt.homeTeam}
              </div>

              <div className="px-5 py-2 rounded-xl bg-white/[0.06] border border-white/[0.1] flex flex-col items-center">
                <div className="text-xl sm:text-2xl font-black font-mono text-[#FEE500]">
                  {evt.homeScore} - {evt.awayScore}
                </div>
                <div className="text-[10px] text-white/40 font-mono mt-0.5">Time: {evt.simulatedTimeSec}'</div>
              </div>

              <div className="text-base sm:text-lg font-black text-white flex-1 text-center sm:text-right">
                {evt.awayTeam}
              </div>
            </div>

            {/* Virtual Odds Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/[0.06]">
              <button
                onClick={() => handleAddBet(evt, "Match Winner", evt.homeTeam, evt.homeOdds)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#FEE500] hover:text-black border border-white/[0.08] transition-all group"
              >
                <span className="text-xs truncate font-medium">1 ({evt.homeTeam.slice(0, 10)})</span>
                <span className="font-mono font-bold text-xs text-[#FEE500] group-hover:text-black">
                  {evt.homeOdds.toFixed(2)}
                </span>
              </button>

              {evt.drawOdds && (
                <button
                  onClick={() => handleAddBet(evt, "Match Winner", "Draw", evt.drawOdds!)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#FEE500] hover:text-black border border-white/[0.08] transition-all group"
                >
                  <span className="text-xs font-medium">X (Draw)</span>
                  <span className="font-mono font-bold text-xs text-[#FEE500] group-hover:text-black">
                    {evt.drawOdds.toFixed(2)}
                  </span>
                </button>
              )}

              <button
                onClick={() => handleAddBet(evt, "Match Winner", evt.awayTeam, evt.awayOdds)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#FEE500] hover:text-black border border-white/[0.08] transition-all group"
              >
                <span className="text-xs truncate font-medium">2 ({evt.awayTeam.slice(0, 10)})</span>
                <span className="font-mono font-bold text-xs text-[#FEE500] group-hover:text-black">
                  {evt.awayOdds.toFixed(2)}
                </span>
              </button>

              <button
                onClick={() => handleAddBet(evt, "Total Goals", "Over 2.5", evt.over25Odds)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#FEE500] hover:text-black border border-white/[0.08] transition-all group"
              >
                <span className="text-xs font-medium">Over 2.5</span>
                <span className="font-mono font-bold text-xs text-[#FEE500] group-hover:text-black">
                  {evt.over25Odds.toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
