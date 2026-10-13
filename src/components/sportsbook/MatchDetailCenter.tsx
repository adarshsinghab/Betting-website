"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Clock,
  Flame,
  ShieldCheck,
  Star,
  Tv,
  Activity,
  ChevronDown,
  ChevronUp,
  Search,
  Lock,
  TrendingUp,
  TrendingDown,
  Info,
  Radio,
  Share2,
  RefreshCw,
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useBetSlip } from "@/context/BetSlipContext";
import { useFavorites } from "@/context/FavoritesContext";
import { sportsProvider } from "@/lib/providers/sportsProvider";
import {
  NormalizedMatch,
  NormalizedMarket,
  NormalizedOdds,
  NormalizedMatchIncident,
  NormalizedMatchStats,
  PitchVisualizerState,
} from "@/lib/providers/types";
import { cn } from "@/lib/utils";

interface MatchDetailCenterProps {
  matchId?: string;
  initialMatch?: any;
  onBack?: () => void;
}

export function MatchDetailCenter({ matchId, initialMatch, onBack }: MatchDetailCenterProps) {
  const { addToast } = useUI();
  const { items, addItem, removeItem } = useBetSlip();
  const { isMatchFavorite, toggleMatchFavorite } = useFavorites();

  const [match, setMatch] = useState<NormalizedMatch | null>(null);
  const [activeMarketCategory, setActiveMarketCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedMarkets, setCollapsedMarkets] = useState<Record<string, boolean>>({});
  const [pitchState, setPitchState] = useState<PitchVisualizerState | null>(null);
  const [stats, setStats] = useState<NormalizedMatchStats | null>(null);
  const [incidents, setIncidents] = useState<NormalizedMatchIncident[]>([]);
  const [viewTab, setViewTab] = useState<"markets" | "pitch" | "stats" | "lineups">("markets");

  // Load match from provider or fallback to initialMatch
  useEffect(() => {
    let isMounted = true;
    const resolvedId = matchId || initialMatch?.id;

    if (resolvedId) {
      sportsProvider.getMatchById(resolvedId).then((res) => {
        if (isMounted && res) {
          setMatch(res);
          setPitchState(res.pitchState || null);
          setStats(res.stats || null);
          setIncidents(res.incidents || []);
        } else if (isMounted && initialMatch) {
          // Normalize initialMatch if not found in provider
          const normalized: NormalizedMatch = {
            id: initialMatch.id,
            sport: initialMatch.sport || "football",
            sportName: initialMatch.sport || "Football",
            league: initialMatch.league || initialMatch.competition?.name || "Premier League",
            country: "Global",
            countryCode: "UN",
            isLive: Boolean(initialMatch.isLive),
            status: initialMatch.isLive ? "live" : "upcoming",
            startTime: initialMatch.startTime || "Today, 19:30",
            liveMinute: initialMatch.liveMinute || 45,
            period: "2H",
            homeTeam: {
              id: "home",
              name: initialMatch.homeTeam?.name || "Home Team",
              shortName: initialMatch.homeTeam?.shortName || "HOM",
              score: initialMatch.liveScore?.home ?? 0,
            },
            awayTeam: {
              id: "away",
              name: initialMatch.awayTeam?.name || "Away Team",
              shortName: initialMatch.awayTeam?.shortName || "AWA",
              score: initialMatch.liveScore?.away ?? 0,
            },
            pitchState: {
              zone: "midfield",
              action: "normal",
              possessionTeam: "home",
              ballCoords: [50, 50],
              message: "Midfield possession battle",
            },
            stats: {
              possession: [54, 46],
              shotsOnTarget: [5, 3],
              shotsOffTarget: [4, 4],
              corners: [6, 3],
              fouls: [8, 10],
              yellowCards: [1, 2],
              redCards: [0, 0],
            },
            incidents: [
              { minute: 23, type: "goal", team: "home", description: "GOAL! Curled finish into top right corner." },
              { minute: 41, type: "yellow_card", team: "away", description: "Yellow Card for tactical foul in transition." },
            ],
            markets: initialMatch.markets || [
              {
                id: "mkt-winner",
                name: "Full Time Result (1X2)",
                category: "main",
                selections: [
                  { id: "sel-h", name: initialMatch.homeTeam?.name || "Home", odds: 1.85, status: "active" },
                  { id: "sel-d", name: "Draw", odds: 3.40, status: "active" },
                  { id: "sel-a", name: initialMatch.awayTeam?.name || "Away", odds: 4.10, status: "active" },
                ],
              },
              {
                id: "mkt-btts",
                name: "Both Teams To Score",
                category: "goals",
                selections: [
                  { id: "sel-btts-yes", name: "Yes", odds: 1.75, status: "active" },
                  { id: "sel-btts-no", name: "No", odds: 2.05, status: "active" },
                ],
              },
            ],
          };
          setMatch(normalized);
          setPitchState(normalized.pitchState || null);
          setStats(normalized.stats || null);
          setIncidents(normalized.incidents || []);
        }
      });
    }

    // Periodic simulation of pitch tracker for live immersion
    const interval = setInterval(() => {
      setPitchState((prev) => {
        if (!prev) return null;
        const newX = Math.min(92, Math.max(8, prev.ballCoords[0] + (Math.random() * 16 - 8)));
        const newY = Math.min(88, Math.max(12, prev.ballCoords[1] + (Math.random() * 16 - 8)));
        return {
          ...prev,
          ballCoords: [newX, newY],
        };
      });
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [matchId, initialMatch]);

  const toggleMarketCollapse = (marketId: string) => {
    setCollapsedMarkets((prev) => ({
      ...prev,
      [marketId]: !prev[marketId],
    }));
  };

  const isFav = match ? isMatchFavorite(match.id) : false;

  // Filter markets by category and search
  const filteredMarkets = useMemo(() => {
    if (!match) return [];
    return match.markets.filter((m) => {
      if (activeMarketCategory !== "all" && m.category !== activeMarketCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = m.name.toLowerCase().includes(q);
        const matchSel = m.selections.some((s) => s.name.toLowerCase().includes(q));
        if (!matchName && !matchSel) return false;
      }
      return true;
    });
  }, [match, activeMarketCategory, searchQuery]);

  const isSelectionInSlip = (selectionId: string) => {
    return items.some((item) => item.selectionId === selectionId || item.id === selectionId);
  };

  const handleOddsClick = (market: NormalizedMarket, sel: NormalizedOdds) => {
    if (sel.status === "suspended") return;
    const betItemId = `sel-${match?.id}-${market.id}-${sel.id}`;

    if (isSelectionInSlip(betItemId)) {
      removeItem(betItemId);
      addToast({ type: "info", message: `Removed ${sel.name} from Bet Slip` });
    } else {
      addItem({
        id: betItemId,
        selectionId: betItemId,
        matchId: match?.id,
        matchTitle: `${match?.homeTeam.name} vs ${match?.awayTeam.name}`,
        marketId: market.id,
        marketName: market.name,
        selectionName: sel.name,
        odds: sel.odds,
        sport: match?.sport,
        isLive: match?.isLive,
      });
    }
  };

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center p-12 glass-card rounded-2xl border border-white/[0.08] gap-4">
        <div className="w-10 h-10 border-2 border-[#FEE500] border-t-transparent rounded-full animate-spin" />
        <div className="text-white/60 text-sm">Loading authentic match telemetry & market feed...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 1. Nav & Breadcrumb Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Fixtures</span>
            </button>
          )}
          <div className="text-xs text-white/50 flex items-center gap-1.5">
            <span className="text-[#FEE500] font-bold uppercase">{match.sportName}</span>
            <span>/</span>
            <span className="text-white/80 font-semibold">{match.league}</span>
            <span>/</span>
            <span className="text-white/40">{match.country}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleMatchFavorite(match.id)}
            className={cn(
              "p-2 rounded-xl border transition-colors",
              isFav
                ? "bg-[#FEE500]/15 border-[#FEE500]/40 text-[#FEE500]"
                : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white"
            )}
            title="Save to Favorites"
          >
            <Star className={cn("w-4 h-4", isFav && "fill-[#FEE500]")} />
          </button>
        </div>
      </div>

      {/* 2. Parimatch/Bet365 Authentic Match Scoreboard Header */}
      <div className="relative glass-card rounded-3xl p-4 sm:p-6 border border-white/[0.1] shadow-2xl overflow-hidden bg-gradient-to-b from-[#11131A] to-[#0A0B10]">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Home Team */}
          <div className="flex items-center md:flex-1 justify-end gap-4 text-right w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-base sm:text-2xl font-black text-white tracking-tight">
                {match.homeTeam.name}
              </span>
              {match.homeTeam.subScore && (
                <span className="text-xs font-mono text-[#FEE500]">{match.homeTeam.subScore}</span>
              )}
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center font-black text-sm text-[#FEE500] shadow-inner shrink-0">
              {match.homeTeam.shortName}
            </div>
          </div>

          {/* Central Live Score / Kickoff Badge */}
          <div className="flex flex-col items-center justify-center px-6 py-3 rounded-2xl bg-black/60 border border-white/[0.12] shadow-2xl min-w-[150px]">
            {match.isLive ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[11px] font-black tracking-widest text-red-400 uppercase">
                    LIVE {match.liveMinute ? `${match.liveMinute}'` : ""}
                  </span>
                  {match.period && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white/70 font-mono">
                      {match.period}
                    </span>
                  )}
                </div>
                <div className="text-2xl sm:text-4xl font-black font-mono text-white tracking-wider my-0.5">
                  {match.homeTeam.score ?? 0} : {match.awayTeam.score ?? 0}
                </div>
                <span className="text-[10px] text-white/40 font-mono">Realtime Provider Feed</span>
              </>
            ) : (
              <>
                <span className="text-[11px] font-semibold text-white/40 uppercase">Upcoming Match</span>
                <span className="text-sm sm:text-base font-bold text-white font-mono my-1">
                  {match.startTime}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-[#FEE500]">
                  <Clock className="w-3 h-3" />
                  <span>Pre-Match Markets Open</span>
                </div>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center md:flex-1 justify-start gap-4 text-left w-full md:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center font-black text-sm text-[#FEE500] shadow-inner shrink-0">
              {match.awayTeam.shortName}
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-2xl font-black text-white tracking-tight">
                {match.awayTeam.name}
              </span>
              {match.awayTeam.subScore && (
                <span className="text-xs font-mono text-[#FEE500]">{match.awayTeam.subScore}</span>
              )}
            </div>
          </div>
        </div>

        {/* Live Action Ticker if Live */}
        {match.isLive && pitchState?.message && (
          <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#FEE500]/20 text-[#FEE500] text-[10px] font-bold uppercase">
                PITCH RADAR
              </span>
              <span className="font-semibold animate-pulse">{pitchState.message}</span>
            </div>
            <div className="text-[11px] text-white/40 hidden sm:block">
              Coordinates: [{pitchState.ballCoords[0].toFixed(0)}%, {pitchState.ballCoords[1].toFixed(0)}%]
            </div>
          </div>
        )}
      </div>

      {/* 3. Match Views Tab Switcher (Markets, Pitch Visualizer, Stats, Incidents) */}
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewTab("markets")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
              viewTab === "markets"
                ? "bg-[#FEE500] text-black shadow-lg shadow-[#FEE500]/10"
                : "text-white/60 hover:text-white"
            )}
          >
            <span>Markets ({match.markets.length})</span>
          </button>

          {match.isLive && (
            <button
              onClick={() => setViewTab("pitch")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                viewTab === "pitch"
                  ? "bg-[#FEE500] text-black shadow-lg shadow-[#FEE500]/10"
                  : "text-white/60 hover:text-white"
              )}
            >
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>2D Pitch Radar</span>
            </button>
          )}

          {stats && (
            <button
              onClick={() => setViewTab("stats")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                viewTab === "stats"
                  ? "bg-[#FEE500] text-black shadow-lg shadow-[#FEE500]/10"
                  : "text-white/60 hover:text-white"
              )}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Live Statistics</span>
            </button>
          )}
        </div>

        {/* Market Search Box */}
        {viewTab === "markets" && (
          <div className="relative min-w-[200px] hidden sm:block">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search markets or selections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FEE500]/50 transition-colors"
            />
          </div>
        )}
      </div>

      {/* 4. Tab Body: 2D Pitch Radar View */}
      {viewTab === "pitch" && pitchState && (
        <div className="glass-card rounded-3xl p-5 border border-white/[0.1] flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Dynamic Match Incident & Ball Position Tracker</span>
            </div>
            <span className="text-white/50 text-[11px]">Provider Telemetry SLA &lt;200ms</span>
          </div>

          {/* 2D Grass Visualizer Pitch */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-[#0C3B2E] via-[#0E4939] to-[#0C3B2E] shadow-inner flex items-center justify-center select-none">
            {/* Field Lines */}
            <div className="absolute inset-3 border-2 border-white/30 rounded-lg pointer-events-none" />
            {/* Halfway Line */}
            <div className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-0.5 bg-white/30" />
            {/* Center Circle */}
            <div className="absolute w-28 h-28 border-2 border-white/30 rounded-full" />
            <div className="absolute w-2 h-2 bg-white/50 rounded-full" />
            {/* Penalty Boxes */}
            <div className="absolute left-3 top-1/4 bottom-1/4 w-20 border-r-2 border-y-2 border-white/30 rounded-r-lg" />
            <div className="absolute right-3 top-1/4 bottom-1/4 w-20 border-l-2 border-y-2 border-white/30 rounded-l-lg" />

            {/* Ball Marker with Radar Waves */}
            <div
              className="absolute z-20 transition-all duration-700 ease-out"
              style={{
                left: `${pitchState.ballCoords[0]}%`,
                top: `${pitchState.ballCoords[1]}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#FEE500] border-2 border-white shadow-lg flex items-center justify-center" />
                <div className="absolute w-10 h-10 rounded-full bg-[#FEE500]/40 animate-ping" />
              </div>
            </div>

            {/* Team Banners in Pitch Corners */}
            <div className="absolute top-5 left-5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-sm border border-white/20 text-xs font-bold text-white">
              {match.homeTeam.name}
            </div>
            <div className="absolute top-5 right-5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-sm border border-white/20 text-xs font-bold text-white">
              {match.awayTeam.name}
            </div>

            {/* Bottom Status Banner */}
            <div className="absolute bottom-5 inset-x-5 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs text-white">
              <span className="font-semibold">{pitchState.message}</span>
              <span className="text-[#FEE500] font-mono text-[11px] font-bold">
                POSSESSION: {pitchState.possessionTeam === "home" ? match.homeTeam.shortName : match.awayTeam.shortName}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab Body: Live Stats & Incident Timeline */}
      {viewTab === "stats" && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Comparative Stat Bars */}
          <div className="glass-card rounded-3xl p-5 border border-white/[0.1] flex flex-col gap-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Match Telemetry Overview
            </h4>

            {/* Possession */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-white/70">
                <span className="font-bold text-white">{stats.possession[0]}%</span>
                <span className="text-[11px] text-white/40 uppercase">Possession</span>
                <span className="font-bold text-white">{stats.possession[1]}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden flex">
                <div style={{ width: `${stats.possession[0]}%` }} className="bg-[#FEE500] h-full" />
                <div style={{ width: `${stats.possession[1]}%` }} className="bg-sky-500 h-full" />
              </div>
            </div>

            {/* Shots on Target */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-white/70">
                <span className="font-bold text-white">{stats.shotsOnTarget[0]}</span>
                <span className="text-[11px] text-white/40 uppercase">Shots On Target</span>
                <span className="font-bold text-white">{stats.shotsOnTarget[1]}</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden flex">
                <div
                  style={{ width: `${(stats.shotsOnTarget[0] / (stats.shotsOnTarget[0] + stats.shotsOnTarget[1] || 1)) * 100}%` }}
                  className="bg-[#FEE500] h-full"
                />
                <div
                  style={{ width: `${(stats.shotsOnTarget[1] / (stats.shotsOnTarget[0] + stats.shotsOnTarget[1] || 1)) * 100}%` }}
                  className="bg-sky-500 h-full"
                />
              </div>
            </div>

            {/* Corners */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-white/70">
                <span className="font-bold text-white">{stats.corners[0]}</span>
                <span className="text-[11px] text-white/40 uppercase">Corners</span>
                <span className="font-bold text-white">{stats.corners[1]}</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden flex">
                <div
                  style={{ width: `${(stats.corners[0] / (stats.corners[0] + stats.corners[1] || 1)) * 100}%` }}
                  className="bg-[#FEE500] h-full"
                />
                <div
                  style={{ width: `${(stats.corners[1] / (stats.corners[0] + stats.corners[1] || 1)) * 100}%` }}
                  className="bg-sky-500 h-full"
                />
              </div>
            </div>
          </div>

          {/* Incident Timeline */}
          <div className="glass-card rounded-3xl p-5 border border-white/[0.1] flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Chronological Timeline
            </h4>
            <div className="flex flex-col gap-2.5 overflow-y-auto max-h-56 custom-scrollbar pr-2">
              {incidents.map((inc, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs"
                >
                  <span className="font-mono font-bold text-[#FEE500] shrink-0">{inc.minute}'</span>
                  <div className="flex-1 text-white/80">{inc.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Market Category Filter Chips */}
      {viewTab === "markets" && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "all", label: "All Markets" },
            { id: "main", label: "Main & Winner" },
            { id: "handicap", label: "Handicap" },
            { id: "goals", label: "Totals / O&U" },
            { id: "halves", label: "Halves & Sets" },
            { id: "corners", label: "Corners" },
            { id: "specials", label: "Props & Specials" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveMarketCategory(cat.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
                activeMarketCategory === cat.id
                  ? "bg-white/[0.14] text-white border border-white/20"
                  : "text-white/50 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* 7. Parimatch/Bet365 Collapsible Multi-Market Accordions */}
      {viewTab === "markets" && (
        <div className="flex flex-col gap-3">
          {filteredMarkets.length === 0 ? (
            <div className="p-8 text-center text-white/40 text-xs glass-card rounded-2xl border border-white/[0.08]">
              No active markets match your search query.
            </div>
          ) : (
            filteredMarkets.map((market) => {
              const isCollapsed = Boolean(collapsedMarkets[market.id]);
              return (
                <div
                  key={market.id}
                  className="glass-card rounded-2xl border border-white/[0.08] overflow-hidden transition-all"
                >
                  {/* Market Accordion Header */}
                  <div
                    onClick={() => toggleMarketCollapse(market.id)}
                    className="flex items-center justify-between px-4 py-3 bg-[#0E0F14] hover:bg-[#14151C] transition-colors cursor-pointer border-b border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white uppercase tracking-wider">
                        {market.name}
                      </span>
                      {market.isSuspended && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                          <Lock className="w-2.5 h-2.5" />
                          SUSPENDED
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-white/40">
                      <span className="text-[11px]">{market.selections.length} selections</span>
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Odds Selection Grid */}
                  {!isCollapsed && (
                    <div
                      className={cn(
                        "p-3 grid gap-2",
                        market.selections.length === 2
                          ? "grid-cols-2"
                          : market.selections.length === 3
                          ? "grid-cols-3"
                          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                      )}
                    >
                      {market.selections.map((sel) => {
                        const betItemId = `sel-${match.id}-${market.id}-${sel.id}`;
                        const selected = isSelectionInSlip(betItemId);
                        const isSuspended = sel.status === "suspended" || market.isSuspended;

                        return (
                          <button
                            key={sel.id}
                            disabled={isSuspended}
                            onClick={() => handleOddsClick(market, sel)}
                            className={cn(
                              "flex items-center justify-between p-2.5 rounded-lg border transition-colors text-left group",
                              selected
                                ? "bg-[#FEE500] text-black border-[#FEE500] font-extrabold"
                                : isSuspended
                                ? "bg-[#14161C] border-[#1F2128] text-white/30 cursor-not-allowed"
                                : "bg-[#1E2128] hover:bg-[#272B34] border-[#292D37] text-white"
                            )}
                          >
                            <span className="text-xs truncate pr-2 font-medium">
                              {sel.name}
                            </span>

                            {isSuspended ? (
                              <Lock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                            ) : (
                              <div className="flex items-center gap-1 shrink-0">
                                {sel.previousOdds && sel.previousOdds > sel.odds && (
                                  <TrendingDown className="w-3 h-3 text-red-500" />
                                )}
                                {sel.previousOdds && sel.previousOdds < sel.odds && (
                                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                                )}
                                <span
                                  className={cn(
                                    "font-mono font-bold text-xs",
                                    selected ? "text-black" : "text-white"
                                  )}
                                >
                                  {sel.odds.toFixed(2)}
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
