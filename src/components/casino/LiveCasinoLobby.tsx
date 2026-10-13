"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Flame,
  Search,
  Play,
  Star,
  Users,
  Radio,
  Tv,
  Eye,
  Crown,
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useFavorites } from "@/context/FavoritesContext";
import { MOCK_CASINO_GAMES } from "@/lib/providers/casinoProvider";
import { cn } from "@/lib/utils";

interface LiveDealerTable {
  id: string;
  gameId: string;
  title: string;
  category: "roulette" | "blackjack" | "baccarat" | "desi" | "gameshow";
  provider: "Evolution" | "Ezugi" | "Pragmatic Live";
  dealerName: string;
  language: string;
  minBet: number;
  maxBet: number;
  currentPlayers: number;
  recentResults: string[];
  thumbnail: string;
  streamUrl: string;
  isHot?: boolean;
}

const LIVE_TABLES: LiveDealerTable[] = [
  {
    id: "tbl-lightning-roulette",
    gameId: "lightning-roulette",
    title: "Lightning Roulette VIP",
    category: "roulette",
    provider: "Evolution",
    dealerName: "Elena",
    language: "English",
    minBet: 50,
    maxBet: 500000,
    currentPlayers: 1420,
    recentResults: ["14", "2", "33", "0", "27", "8"],
    thumbnail: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=600&auto=format&fit=crop&q=80",
    streamUrl: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=201&lang=en&cur=INR",
    isHot: true,
  },
  {
    id: "tbl-teen-patti",
    gameId: "teen-patti-live",
    title: "Live Teen Patti 20-20",
    category: "desi",
    provider: "Evolution",
    dealerName: "Priya",
    language: "Hindi",
    minBet: 50,
    maxBet: 100000,
    currentPlayers: 2140,
    recentResults: ["Player A", "Player B", "Player A", "Player A"],
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    streamUrl: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=203&lang=en&cur=INR",
    isHot: true,
  },
  {
    id: "tbl-andar-bahar",
    gameId: "andar-bahar-live",
    title: "Super Andar Bahar Live",
    category: "desi",
    provider: "Evolution",
    dealerName: "Simran",
    language: "Hindi",
    minBet: 50,
    maxBet: 150000,
    currentPlayers: 1890,
    recentResults: ["Andar", "Bahar", "Bahar", "Andar"],
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    streamUrl: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=204&lang=en&cur=INR",
    isHot: true,
  },
  {
    id: "tbl-infinite-blackjack",
    gameId: "vip-blackjack",
    title: "Infinite Blackjack VIP",
    category: "blackjack",
    provider: "Evolution",
    dealerName: "Marcus",
    language: "English",
    minBet: 100,
    maxBet: 250000,
    currentPlayers: 940,
    recentResults: ["Dealer Bust", "Player 20", "Player 21"],
    thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80",
    streamUrl: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=202&lang=en&cur=INR",
  },
  {
    id: "tbl-crazy-time",
    gameId: "crazy-time",
    title: "Crazy Time Multipliers",
    category: "gameshow",
    provider: "Evolution",
    dealerName: "Chloe",
    language: "English",
    minBet: 20,
    maxBet: 200000,
    currentPlayers: 3820,
    recentResults: ["10x", "Coin Flip 25x", "1", "Cash Hunt 50x"],
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    streamUrl: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=205&lang=en&cur=INR",
    isHot: true,
  },
  {
    id: "tbl-speed-baccarat",
    gameId: "speed-baccarat",
    title: "Speed Baccarat Super 6",
    category: "baccarat",
    provider: "Pragmatic Live",
    dealerName: "Natasha",
    language: "English",
    minBet: 100,
    maxBet: 300000,
    currentPlayers: 720,
    recentResults: ["Banker", "Banker", "Player", "Tie"],
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    streamUrl: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=201&lang=en&cur=INR",
  },
];

export function LiveCasinoLobby() {
  const { openModal } = useUI();
  const { isGameFavorite, toggleGameFavorite } = useFavorites();
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTables = useMemo(() => {
    return LIVE_TABLES.filter((tbl) => {
      if (selectedCat !== "all" && tbl.category !== selectedCat) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tbl.title.toLowerCase().includes(q) ||
          tbl.dealerName.toLowerCase().includes(q) ||
          tbl.provider.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCat, searchQuery]);

  const handleLaunchTable = (table: LiveDealerTable) => {
    openModal("gamePlay", {
      game: {
        id: table.gameId,
        title: table.title,
        provider: table.provider,
        category: "live-dealer",
        rtp: 97.8,
        thumbnail: table.thumbnail,
        demoUrl: table.streamUrl,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* 1. Parimatch Clean Live Banner */}
      <div className="relative rounded-xl border border-[#242834] bg-[#14161D] overflow-hidden p-5 sm:p-6 shadow-lg">
        <div className="relative z-10 max-w-xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-white animate-pulse" />
              <span>4K LIVE BROADCAST</span>
            </span>
            <span className="text-xs text-white/50 font-semibold font-mono">EVOLUTION & EZUGI CERTIFIED</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Live Casino Dealers & Indian Tables
          </h2>

          <p className="text-xs text-white/60">
            Real croupiers dealing in real-time. Join VIP Roulette, Infinite Blackjack, Live Teen Patti and Super Andar Bahar directly from your browser.
          </p>
        </div>
      </div>

      {/* 2. Category Chips & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: "all", label: "All Tables" },
            { id: "desi", label: "Desi Tables", isHot: true },
            { id: "roulette", label: "Roulette" },
            { id: "blackjack", label: "Blackjack" },
            { id: "gameshow", label: "Game Shows", isHot: true },
            { id: "baccarat", label: "Baccarat" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5",
                selectedCat === cat.id
                  ? "bg-[#FEE500] text-black shadow-md"
                  : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
              )}
            >
              <span>{cat.label}</span>
              {cat.isHot && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search live dealer or table..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FEE500]/50 transition-colors"
          />
        </div>
      </div>

      {/* 3. Live Dealer Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTables.map((table) => {
          const isFav = isGameFavorite(table.gameId);
          return (
            <div
              key={table.id}
              onClick={() => handleLaunchTable(table)}
              className="group glass-card rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-[#FEE500]/40 overflow-hidden cursor-pointer transition-all duration-200 shadow-xl flex flex-col bg-[#0C0D12] hover:bg-[#12141C]"
            >
              {/* Thumbnail with Live Badge & Overlay */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-black">
                <img
                  src={table.thumbnail}
                  alt={table.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-red-500/80 backdrop-blur-sm text-white font-mono font-bold text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    LIVE
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 text-[10px] font-medium">
                    {table.language}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGameFavorite(table.gameId);
                    }}
                    className="p-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white"
                  >
                    <Star className={cn("w-3.5 h-3.5", isFav && "fill-[#FEE500] text-[#FEE500]")} />
                  </button>
                </div>

                {/* Center Play Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-[#FEE500] text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                </div>

                {/* Bottom Dealer & Players Info */}
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold text-white/90">Dealer: {table.dealerName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-white/60">
                    <Users className="w-3 h-3" />
                    <span>{table.currentPlayers.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Table Info & Recent Outcomes */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-sm text-white group-hover:text-[#FEE500] transition-colors">
                      {table.title}
                    </h3>
                    <div className="text-[11px] text-white/40">{table.provider}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-white/40 uppercase">Bet Limits</div>
                    <div className="text-xs font-mono font-bold text-white/90">
                      ₹{table.minBet} - ₹{(table.maxBet / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>

                {/* Recent Winning Outcomes Strip */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-white/40 font-mono uppercase">Recent Rounds</span>
                  <div className="flex items-center gap-1.5">
                    {table.recentResults.slice(0, 4).map((res, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono font-bold text-white/80"
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
