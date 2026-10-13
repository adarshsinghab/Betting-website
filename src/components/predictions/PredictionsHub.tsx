"use client";

import React from "react";
import { 
  TrendingUp, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  Users, 
  DollarSign, 
  CheckCircle2 
} from "lucide-react";
import { useBetSlip } from "@/context/BetSlipContext";
import { useUI } from "@/context/UIContext";
import { MOCK_PREDICTIONS } from "@/data/mock/predictions";
import { PredictionMarket } from "@/types";
import { cn } from "@/lib/utils";

export function PredictionsHub() {
  const { addItem } = useBetSlip();
  const { addToast } = useUI();

  const handleVote = (market: PredictionMarket, option: "yes" | "no", odds: number) => {
    addItem({
      id: `pred-${market.id}-${option}`,
      matchId: market.id,
      matchTitle: market.question,
      market: "Prediction Market",
      selection: `${option.toUpperCase()} (${option === "yes" ? market.yesPercent : market.noPercent}%)`,
      odds,
      sport: "cricket",
    });

    addToast({
      type: "success",
      message: `Prediction added to Bet Slip @ ${odds.toFixed(2)}!`,
    });
  };

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl sm:rounded-3xl border border-purple-500/30 overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-black shadow-2xl">
        <div className="max-w-xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              <span>PREDICTION MARKETS</span>
            </span>
            <span className="text-xs text-purple-300 font-bold">CRYPTO, POLITICS, SPORTS & TECH</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trade on the Future
          </h2>

          <p className="text-xs sm:text-sm text-white/60">
            Real market odds determined by crowd sentiment. Buy YES or NO shares and cash out before resolution.
          </p>
        </div>
      </div>

      {/* Prediction Markets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_PREDICTIONS.map((market) => (
          <div
            key={market.id}
            className="glass-card rounded-2xl p-4 sm:p-5 border border-white/[0.08] hover:border-purple-500/40 transition-all flex flex-col justify-between gap-4 shadow-lg"
          >
            {/* Category & Expiration */}
            <div className="flex items-center justify-between text-xs text-white/50">
              <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-white/70 font-semibold uppercase text-[10px]">
                {market.category}
              </span>
              <div className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3 text-purple-400" />
                <span>Volume: ₹{(market.volume / 1000).toFixed(0)}K</span>
              </div>
            </div>

            {/* Question */}
            <h3 className="text-base font-extrabold text-white">
              {market.question}
            </h3>

            {/* Probability Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-bold font-mono">
                <span className="text-emerald-400">YES {market.yesPercent}%</span>
                <span className="text-red-400">NO {market.noPercent}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden flex">
                <div
                  style={{ width: `${market.yesPercent}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                />
                <div
                  style={{ width: `${market.noPercent}%` }}
                  className="h-full bg-gradient-to-r from-red-500 to-rose-400"
                />
              </div>
            </div>

            {/* Action Buttons: YES / NO */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.05]">
              <button
                onClick={() => handleVote(market, "yes", market.yesOdds)}
                className="py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-between px-3 transition-all active:scale-95"
              >
                <span>BUY YES</span>
                <span className="font-mono font-extrabold text-sm">{market.yesOdds.toFixed(2)}</span>
              </button>

              <button
                onClick={() => handleVote(market, "no", market.noOdds)}
                className="py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 font-bold text-xs flex items-center justify-between px-3 transition-all active:scale-95"
              >
                <span>BUY NO</span>
                <span className="font-mono font-extrabold text-sm">{market.noOdds.toFixed(2)}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
