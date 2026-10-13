"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  X, 
  Trophy, 
  Sparkles, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { MOCK_MATCHES } from "@/data/mock/sports";
import { MOCK_CASINO_GAMES } from "@/data/mock/casino";
import { cn } from "@/lib/utils";

export function SearchModal() {
  const { modals, closeModal, openModal, setActiveTab, setActiveSport } = useUI();
  const isOpen = modals.search.isOpen;
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) closeModal("search");
        else openModal("search");
      }
      if (e.key === "Escape" && isOpen) {
        closeModal("search");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openModal, closeModal]);

  if (!isOpen) return null;

  const matchedSports = MOCK_MATCHES.filter(
    (m) =>
      m.homeTeam.name.toLowerCase().includes(query.toLowerCase()) ||
      m.awayTeam.name.toLowerCase().includes(query.toLowerCase()) ||
      (m.league || m.competition?.name || "").toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const matchedCasino = MOCK_CASINO_GAMES.filter(
    (g) =>
      g.title.toLowerCase().includes(query.toLowerCase()) ||
      g.provider.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#212631] border border-[#2E3544] shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2E3544] bg-[#1C2029]">
          <Search className="w-5 h-5 text-[#FEE500]" />
          <input
            autoFocus
            type="text"
            placeholder="Search teams, leagues, cricket matches, slots..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-white/40 outline-none font-medium"
          />
          <button
            onClick={() => closeModal("search")}
            className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 flex flex-col gap-4 max-h-[420px] overflow-y-auto custom-scrollbar">
          {/* Matches results */}
          {matchedSports.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] uppercase font-bold text-white/40 px-1">
                Sports Matches
              </span>
              <div className="flex flex-col gap-1">
                {matchedSports.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      closeModal("search");
                      setActiveTab("sports");
                      setActiveSport(m.sport || m.sportSlug || "football");
                      openModal("matchDetail", { match: m });
                    }}
                    className="p-2.5 rounded-xl hover:bg-white/[0.05] cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Trophy className="w-4 h-4 text-[#FEE500] shrink-0" />
                      <div className="truncate text-xs font-semibold text-white group-hover:text-[#FEE500] transition-colors">
                        {m.homeTeam.name} vs {m.awayTeam.name}
                        <span className="text-[11px] text-white/40 ml-2">({m.league || m.competition?.name || "Premier League"})</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Casino games results */}
          {matchedCasino.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] uppercase font-bold text-white/40 px-1">
                Casino & Instant Games
              </span>
              <div className="flex flex-col gap-1">
                {matchedCasino.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => {
                      closeModal("search");
                      openModal("gamePlay", { game: g });
                    }}
                    className="p-2.5 rounded-xl hover:bg-white/[0.05] cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="truncate text-xs font-semibold text-white group-hover:text-[#FEE500] transition-colors">
                        {g.title}
                        <span className="text-[11px] text-white/40 ml-2">({g.provider})</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      PLAY
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedSports.length === 0 && matchedCasino.length === 0 && (
            <div className="py-8 text-center text-xs text-white/40">
              No matching events or games found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
