"use client";

import React from "react";
import { 
  Star, 
  ChevronRight, 
  Clock 
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useBetSlip } from "@/context/BetSlipContext";
import { useFavorites } from "@/context/FavoritesContext";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { SportIcon } from "@/components/ui/SportIcon";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  match: any;
  featured?: boolean;
}

export function MatchCard({ match, featured = false }: MatchCardProps) {
  const { openModal } = useUI();
  const { items, addItem, removeItem } = useBetSlip();
  const { isMatchFavorite, toggleMatchFavorite } = useFavorites();

  const isFav = isMatchFavorite(match.id);
  const isLive = match.isLive ?? match.status === "live";
  const league = match.league || match.competition?.name || "Premier League";
  const sport = match.sport || match.sportName || "football";

  // Resolve normalized odds & teams
  const homeName = match.homeTeam?.name || "Team 1";
  const awayName = match.awayTeam?.name || "Team 2";
  const homeShort = match.homeTeam?.shortName || homeName.slice(0, 3).toUpperCase();
  const awayShort = match.awayTeam?.shortName || awayName.slice(0, 3).toUpperCase();

  const homeScore = match.homeTeam?.score ?? match.liveScore?.home ?? 0;
  const awayScore = match.awayTeam?.score ?? match.liveScore?.away ?? 0;
  const homeSubScore = match.homeTeam?.subScore;
  const awaySubScore = match.awayTeam?.subScore;

  // 1X2 Market
  const mainMarket = match.markets?.find((m: any) => 
    m.category === "main" || 
    m.name?.toLowerCase().includes("winner") || 
    m.name?.toLowerCase().includes("result") || 
    m.name?.toLowerCase().includes("moneyline")
  ) || match.markets?.[0];

  const isTwoWay = sport === "cricket" || sport === "tennis" || sport === "basketball" || (mainMarket?.selections?.length === 2);

  const homeSel = mainMarket?.selections?.[0];
  const drawSel = !isTwoWay && mainMarket?.selections?.length >= 3 ? mainMarket.selections[1] : undefined;
  const awaySel = !isTwoWay && mainMarket?.selections?.length >= 3 ? mainMarket.selections[2] : mainMarket?.selections?.[1];

  const homeOdds = homeSel?.odds ?? match.odds?.home ?? 1.85;
  const drawOdds = drawSel?.odds ?? match.odds?.draw;
  const awayOdds = awaySel?.odds ?? match.odds?.away ?? 2.10;

  const isSelectionInSlip = (selectionId: string) => {
    return items.some((item) => item.selectionId === selectionId || item.id === selectionId);
  };

  const handleOddsClick = (e: React.MouseEvent, selectionName: string, odds: number, marketName: string = "Match Winner") => {
    e.stopPropagation();
    const betItemId = `sel-${match.id}-${marketName}-${selectionName}`;

    if (isSelectionInSlip(betItemId)) {
      removeItem(betItemId);
    } else {
      addItem({
        id: betItemId,
        selectionId: betItemId,
        matchId: match.id,
        matchTitle: `${homeName} vs ${awayName}`,
        marketName,
        selectionName,
        odds,
        sport,
        isLive,
      });
    }
  };

  const handleRowClick = () => {
    openModal("matchDetail", { match });
  };

  const resolvedCountryCode = 
    match.countryCode === "IN" || league.includes("IPL") ? "IN" :
    match.countryCode === "GB" || league.includes("Premier") ? "GB" :
    match.countryCode === "EU" || league.includes("Champions") ? "EU" :
    match.countryCode === "US" || league.includes("NBA") ? "US" : "GLOBAL";

  return (
    <div
      onClick={handleRowClick}
      className={cn(
        "group relative rounded-xl border transition-all cursor-pointer select-none overflow-hidden bg-[#212631] border-[#2E3544] hover:border-[#3C4456] shadow-sm",
        featured ? "ring-1 ring-[#FEE500]/20" : ""
      )}
    >
      {/* Top Header: League, Sport Icon, Country Flag, Time, Fav */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#1C2029] border-b border-[#2E3544] text-[11px]">
        <div className="flex items-center gap-2 truncate">
          <SportIcon name={sport} size={13} className="text-white/50 shrink-0" />
          <CountryFlag countryCode={resolvedCountryCode} size={15} />
          <span className="font-semibold text-white/80 truncate">
            {league}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isLive ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-red-400 font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>LIVE {match.liveMinute ? `${match.liveMinute}'` : match.period || ""}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-white/50 text-[11px] font-mono">
              <Clock className="w-3 h-3 text-white/40" />
              <span>{match.startTime || "Today, 19:30"}</span>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMatchFavorite(match.id);
            }}
            className={cn(
              "p-1 rounded transition-colors",
              isFav ? "text-[#FEE500]" : "text-white/30 hover:text-white"
            )}
            title="Favorite"
          >
            <Star className={cn("w-3.5 h-3.5", isFav && "fill-[#FEE500]")} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Teams and Score Container */}
        <div className="flex flex-col gap-2 flex-1 min-w-0 pr-0 md:pr-4">
          {/* Home Team */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-md bg-[#2B313F] border border-[#343C4D] flex items-center justify-center font-bold text-[10px] text-white/90 shrink-0">
                {homeShort}
              </div>
              <span className="font-bold text-xs sm:text-sm text-white group-hover:text-[#FEE500] transition-colors truncate">
                {homeName}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono shrink-0">
              {homeSubScore && (
                <span className="text-[11px] text-white/60 hidden sm:inline">
                  {homeSubScore}
                </span>
              )}
              {isLive && (
                <span className="text-sm font-black text-white font-mono px-2 py-0.5 rounded bg-[#282D3A] border border-[#343C4D]">
                  {homeScore}
                </span>
              )}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-md bg-[#2B313F] border border-[#343C4D] flex items-center justify-center font-bold text-[10px] text-white/90 shrink-0">
                {awayShort}
              </div>
              <span className="font-bold text-xs sm:text-sm text-white group-hover:text-[#FEE500] transition-colors truncate">
                {awayName}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono shrink-0">
              {awaySubScore && (
                <span className="text-[11px] text-white/60 hidden sm:inline">
                  {awaySubScore}
                </span>
              )}
              {isLive && (
                <span className="text-sm font-black text-white font-mono px-2 py-0.5 rounded bg-[#282D3A] border border-[#343C4D]">
                  {awayScore}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Odds Box Columns - Clean PariMatch Tap Targets */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pt-2.5 md:pt-0 border-t md:border-t-0 border-[#2E3544]">
          {/* 1 (Home) */}
          <button
            onClick={(e) => handleOddsClick(e, homeName, homeOdds)}
            className={cn(
              "flex-1 md:flex-initial flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-xs transition-all min-w-[70px] sm:min-w-[82px] active:scale-95",
              isSelectionInSlip(`sel-${match.id}-Match Winner-${homeName}`)
                ? "bg-[#FEE500] border-[#FEE500] text-[#111317] font-black shadow-sm"
                : "bg-[#2A303D] hover:bg-[#353D4E] border-[#343C4D] text-white"
            )}
          >
            <span className={cn(
              "text-[10px] font-mono",
              isSelectionInSlip(`sel-${match.id}-Match Winner-${homeName}`) ? "text-black/70 font-bold" : "text-white/40"
            )}>
              1
            </span>
            <span className="font-mono font-bold text-xs sm:text-sm">{homeOdds.toFixed(2)}</span>
          </button>

          {/* X (Draw) - If 3-way sport */}
          {!isTwoWay && drawOdds ? (
            <button
              onClick={(e) => handleOddsClick(e, "Draw", drawOdds)}
              className={cn(
                "flex-1 md:flex-initial flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-xs transition-all min-w-[70px] sm:min-w-[82px] active:scale-95",
                isSelectionInSlip(`sel-${match.id}-Match Winner-Draw`)
                  ? "bg-[#FEE500] border-[#FEE500] text-[#111317] font-black shadow-sm"
                  : "bg-[#2A303D] hover:bg-[#353D4E] border-[#343C4D] text-white"
              )}
            >
              <span className={cn(
                "text-[10px] font-mono",
                isSelectionInSlip(`sel-${match.id}-Match Winner-Draw`) ? "text-black/70 font-bold" : "text-white/40"
              )}>
                X
              </span>
              <span className="font-mono font-bold text-xs sm:text-sm">{drawOdds.toFixed(2)}</span>
            </button>
          ) : null}

          {/* 2 (Away) */}
          <button
            onClick={(e) => handleOddsClick(e, awayName, awayOdds)}
            className={cn(
              "flex-1 md:flex-initial flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-xs transition-all min-w-[70px] sm:min-w-[82px] active:scale-95",
              isSelectionInSlip(`sel-${match.id}-Match Winner-${awayName}`)
                ? "bg-[#FEE500] border-[#FEE500] text-[#111317] font-black shadow-sm"
                : "bg-[#2A303D] hover:bg-[#353D4E] border-[#343C4D] text-white"
            )}
          >
            <span className={cn(
              "text-[10px] font-mono",
              isSelectionInSlip(`sel-${match.id}-Match Winner-${awayName}`) ? "text-black/70 font-bold" : "text-white/40"
            )}>
              2
            </span>
            <span className="font-mono font-bold text-xs sm:text-sm">{awayOdds.toFixed(2)}</span>
          </button>

          {/* More markets badge */}
          <button
            onClick={handleRowClick}
            className="hidden sm:flex items-center gap-0.5 px-2 py-2 rounded-lg bg-[#272C39] hover:bg-[#303746] border border-[#343C4D] text-white/60 hover:text-white text-xs transition-colors"
            title="View all markets"
          >
            <span className="text-[11px] font-mono font-bold">+38</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
          </button>
        </div>
      </div>
    </div>
  );
}
