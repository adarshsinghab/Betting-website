"use client";

import React from "react";
import { 
  Trophy, 
  Flame, 
  Star, 
  ChevronRight, 
  Crown
} from "lucide-react";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { SportIcon } from "@/components/ui/SportIcon";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";
import { SportType } from "@/types";

interface LeagueItem {
  id: string;
  name: string;
  sport: SportType;
  countryCode: string;
}

const TOP_LEAGUES: LeagueItem[] = [
  { id: "ipl-2026", name: "IPL 2026", sport: "cricket", countryCode: "IN" },
  { id: "epl", name: "Premier League", sport: "football", countryCode: "GB" },
  { id: "ucl", name: "Champions League", sport: "football", countryCode: "EU" },
  { id: "atp-wimbledon", name: "Wimbledon", sport: "tennis", countryCode: "GB" },
  { id: "nba", name: "NBA", sport: "basketball", countryCode: "US" },
  { id: "cs2-major", name: "CS2 Major", sport: "esports", countryCode: "EU" },
];

const ALL_SPORTS: { id: SportType; name: string; count: number; iconName: string }[] = [
  { id: "cricket", name: "Cricket", count: 18, iconName: "cricket" },
  { id: "football", name: "Football", count: 42, iconName: "football" },
  { id: "tennis", name: "Tennis", count: 15, iconName: "tennis" },
  { id: "basketball", name: "Basketball", count: 9, iconName: "basketball" },
  { id: "esports", name: "Esports", count: 14, iconName: "gamepad" },
  { id: "table-tennis", name: "Table Tennis", count: 8, iconName: "ping-pong" },
  { id: "mma", name: "UFC / MMA", count: 6, iconName: "boxing-glove" },
  { id: "badminton", name: "Badminton", count: 5, iconName: "badminton" },
  { id: "volleyball", name: "Volleyball", count: 4, iconName: "volleyball" },
];

export function LeftSidebar() {
  const { activeSport, setActiveSport, setActiveTab } = useUI();

  return (
    <aside className="w-full flex flex-col gap-2.5 h-full overflow-y-auto no-scrollbar text-xs select-none pr-1">
      {/* 1. VIP Club Card */}
      <div
        onClick={() => setActiveTab("promotions")}
        className="rounded-xl p-3 bg-[#212631] border border-[#2E3544] hover:border-[#3C4456] transition-colors cursor-pointer flex items-center justify-between shadow-sm"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#FEE500] text-[#111317] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
            <Crown className="w-4 h-4 fill-[#111317]" />
          </div>
          <div>
            <div className="font-extrabold text-white text-xs leading-none">
              VIP CLUB
            </div>
            <div className="text-[10px] text-white/50 mt-1">Cashback & Rewards</div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-white/40" />
      </div>

      {/* 2. Top Tournaments List */}
      <div className="rounded-xl p-2.5 bg-[#212631] border border-[#2E3544] flex flex-col gap-0.5 shadow-sm">
        <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold px-2 py-1.5">
          TOP TOURNAMENTS
        </div>

        {TOP_LEAGUES.map((league) => {
          const isSelected = activeSport === league.sport;
          return (
            <button
              key={league.id}
              onClick={() => {
                setActiveSport(league.sport);
                setActiveTab("sports");
              }}
              className={cn(
                "flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left",
                isSelected
                  ? "bg-[#2B313F] text-[#FEE500] font-bold border border-[#3A4356]"
                  : "text-white/75 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <CountryFlag countryCode={league.countryCode} size={15} />
                <span className={cn("truncate text-xs", isSelected ? "font-bold text-white" : "font-medium text-white/85")}>
                  {league.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. All Sports Directory */}
      <div className="rounded-xl p-2.5 bg-[#212631] border border-[#2E3544] flex flex-col gap-0.5 shadow-sm">
        <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold px-2 py-1.5">
          ALL SPORTS
        </div>

        {ALL_SPORTS.map((sport) => {
          const isSelected = activeSport === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => {
                setActiveSport(sport.id);
                setActiveTab("sports");
              }}
              className={cn(
                "flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left",
                isSelected
                  ? "bg-[#2B313F] text-[#FEE500] font-bold border border-[#3A4356]"
                  : "text-white/70 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <SportIcon
                  name={sport.iconName}
                  size={15}
                  className={cn("shrink-0", isSelected ? "text-[#FEE500]" : "text-white/60")}
                />
                <span className="truncate text-xs">{sport.name}</span>
              </div>
              <span className="text-[10px] font-mono text-white/40">{sport.count}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
