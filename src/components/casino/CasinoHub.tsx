"use client";

import React, { useState, useMemo } from "react";
import { 
  Sparkles, 
  Flame, 
  Search, 
  Play, 
  Star, 
  Users, 
  Zap, 
  Award,
  Crown
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useFavorites } from "@/context/FavoritesContext";
import { MOCK_CASINO_GAMES } from "@/data/mock/casino";
import { CasinoGame } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Games" },
  { id: "slots", label: "Top Slots", isHot: true },
  { id: "live", label: "Live Dealers" },
  { id: "roulette", label: "Roulette" },
  { id: "blackjack", label: "Blackjack" },
  { id: "game-shows", label: "Game Shows", isHot: true },
  { id: "jackpots", label: "Jackpots" },
];

const PROVIDERS = ["Pragmatic Play", "Evolution", "Spribe", "Hacksaw", "NetEnt", "Play'n GO"];

export function CasinoHub() {
  const { openModal } = useUI();
  const { isGameFavorite, toggleGameFavorite } = useFavorites();
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const filteredGames = useMemo(() => {
    return MOCK_CASINO_GAMES.filter((game) => {
      if (selectedCat !== "all" && game.category !== selectedCat) return false;
      if (selectedProvider && game.provider !== selectedProvider) return false;
      if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [selectedCat, selectedProvider, searchQuery]);

  const handleLaunchGame = (game: any) => {
    openModal("gamePlay", { game });
  };

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* 1. Sleek Parimatch Casino Banner */}
      <div className="relative rounded-xl border border-[#242834] bg-[#14161D] overflow-hidden p-5 sm:p-6 shadow-lg">
        <div className="relative z-10 max-w-xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#FEE500] text-black font-extrabold text-[10.5px] uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-3 h-3 fill-black" />
              <span>CASINO LOBBY</span>
            </span>
            <span className="text-xs text-white/50 font-semibold font-mono">1,500+ LICENSED GAMES</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Play Live Tables, Crash & Jackpot Slots
          </h2>

          <p className="text-xs text-white/60">
            Real Vegas and European dealers streaming in 4K with instant UPI deposits, Pragmatic Play demo slots, and Spribe Aviator.
          </p>
        </div>
      </div>

      {/* 2. Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#20232A] pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5",
                selectedCat === cat.id
                  ? "bg-[#FEE500] text-black"
                  : "bg-[#181A22] text-white/60 hover:text-white hover:bg-[#20232C]"
              )}
            >
              <span>{cat.label}</span>
              {cat.isHot && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-56 shrink-0">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search slots & tables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161820] border border-[#242834] focus:border-[#FEE500] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* 3. Provider Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-white/40 font-semibold uppercase shrink-0">Providers:</span>
        <button
          onClick={() => setSelectedProvider(null)}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors",
            selectedProvider === null ? "bg-[#252833] text-white" : "text-white/40 hover:text-white"
          )}
        >
          All
        </button>
        {PROVIDERS.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProvider(selectedProvider === p ? null : p)}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors",
              selectedProvider === p
                ? "bg-[#252833] text-[#FEE500] border border-[#FEE500]/40"
                : "bg-[#161820] text-white/50 hover:text-white"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* 4. Game Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
        {filteredGames.map((game) => {
          const isFav = isGameFavorite(game.id);
          return (
            <div
              key={game.id}
              onClick={() => handleLaunchGame(game)}
              className="group relative rounded-xl bg-[#14161E] border border-[#222632] hover:border-[#383E50] overflow-hidden cursor-pointer flex flex-col transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              {/* Game Thumbnail Aspect Box */}
              <div className="relative aspect-[4/3] w-full bg-[#0D0E14] overflow-hidden">
                {game.thumbnail ? (
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-95 group-hover:brightness-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#181B24] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#FEE500]" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

                {/* Badges */}
                {game.isHot && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[8.5px] uppercase tracking-wider">
                    HOT
                  </span>
                )}
                {game.isNew && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#FEE500] text-black font-black text-[8.5px] uppercase tracking-wider">
                    NEW
                  </span>
                )}

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGameFavorite(game.id);
                  }}
                  className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 hover:bg-black/90 text-white/50 hover:text-[#FEE500] transition-colors"
                >
                  <Star className={cn("w-3 h-3", isFav && "fill-[#FEE500] text-[#FEE500]")} />
                </button>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-[#FEE500] text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">
                    DEMO PLAY
                  </span>
                </div>
              </div>

              {/* Game Info Footer */}
              <div className="p-2 flex flex-col gap-0.5 bg-[#12141B]">
                <div className="font-bold text-xs text-white truncate group-hover:text-[#FEE500] transition-colors">
                  {game.title}
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/40">
                  <span className="truncate">{game.provider}</span>
                  {game.rtp && <span className="font-mono text-emerald-400">RTP {game.rtp}%</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
