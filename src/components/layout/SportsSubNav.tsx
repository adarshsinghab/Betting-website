"use client";

import React from "react";
import { SportIcon } from "@/components/ui/SportIcon";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";
import { SportType } from "@/types";

interface SportItem {
  id: SportType | "all";
  name: string;
  count?: number;
  iconName: string;
}

const SPORTS_LIST: SportItem[] = [
  { id: "all", name: "All Sports", count: 248, iconName: "bolt" },
  { id: "cricket", name: "Cricket (IPL)", count: 18, iconName: "cricket" },
  { id: "football", name: "Football", count: 42, iconName: "football" },
  { id: "tennis", name: "Tennis", count: 15, iconName: "tennis" },
  { id: "basketball", name: "Basketball", count: 9, iconName: "basketball" },
  { id: "esports", name: "Esports", count: 14, iconName: "gamepad" },
  { id: "table-tennis", name: "Table Tennis", count: 8, iconName: "ping-pong" },
  { id: "mma", name: "UFC / MMA", count: 6, iconName: "boxing-glove" },
];

export function SportsSubNav() {
  const { activeSport, setActiveSport, activeTab, setActiveTab } = useUI();

  if (activeTab !== "sports" && activeTab !== "live") {
    return null;
  }

  return (
    <div className="w-full bg-[#1A1D25] border-b border-[#2E3544] px-3 sm:px-6 h-[42px] sm:h-[44px] flex items-center justify-between gap-3 z-30 select-none">
      {/* Sports Filter Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 w-full">
        <button
          onClick={() => setActiveTab("sports")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors",
            activeTab === "sports"
              ? "bg-[#282D3A] text-white border border-[#3C4456]"
              : "text-white/70 hover:text-white"
          )}
        >
          <SportIcon name="trophy" size={14} className="text-[#FEE500]" />
          <span>Prematch</span>
        </button>

        <button
          onClick={() => setActiveTab("live")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors",
            activeTab === "live"
              ? "bg-red-500/20 text-red-400 border border-red-500/40"
              : "text-white/70 hover:text-red-400"
          )}
        >
          <SportIcon name="live" size={14} className="text-red-400" />
          <span>Live In-Play (37)</span>
        </button>

        <div className="h-4 w-[1px] bg-white/[0.1] mx-1 shrink-0" />

        {/* Sports Horizontal Quick Switcher */}
        {SPORTS_LIST.map((sport) => {
          const isSelected = activeSport === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => {
                setActiveSport(sport.id as any);
                if (activeTab !== "sports" && activeTab !== "live") {
                  setActiveTab("sports");
                }
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0",
                isSelected
                  ? "bg-[#FEE500] text-[#111317] font-bold shadow-sm"
                  : "bg-[#212631] text-white/75 hover:text-white hover:bg-[#282D3A] border border-[#2E3544]"
              )}
            >
              <SportIcon name={sport.iconName} size={15} className="shrink-0" />
              <span>{sport.name}</span>
              {sport.count && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded font-mono font-medium",
                    isSelected
                      ? "bg-black/20 text-black font-bold"
                      : "text-white/40"
                  )}
                >
                  {sport.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
