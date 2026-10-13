"use client";

import React, { useState } from "react";
import { 
  Trash2, 
  X, 
  Receipt,
  Clock,
  CheckCircle2
} from "lucide-react";
import confetti from "canvas-confetti";
import { useBetSlip } from "@/context/BetSlipContext";
import { useWallet } from "@/context/WalletContext";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

export function BetSlipPanel() {
  const {
    items,
    betType,
    stake,
    totalOdds,
    potentialWin,
    removeItem,
    clearSlip,
    setBetType,
    setStake,
    placeBet,
    isPlacing,
    openBets,
    cashOut,
  } = useBetSlip();

  const { currency, balance } = useWallet();
  const { addToast } = useUI();
  const [activeTab, setActiveTab] = useState<"slip" | "my-bets">("slip");
  const [acceptOddsChanges, setAcceptOddsChanges] = useState(true);

  // Progressive Parimatch Accumulator Combo Booster
  const legCount = items.length;
  let bonusMultiplier = 0;

  if (betType === "parlay" || items.length > 1) {
    if (legCount === 3) bonusMultiplier = 0.05;
    else if (legCount === 4) bonusMultiplier = 0.10;
    else if (legCount === 5) bonusMultiplier = 0.15;
    else if (legCount >= 6) bonusMultiplier = 0.25;
  }

  const bonusAmount = potentialWin * bonusMultiplier;
  const grandTotalWin = potentialWin + bonusAmount;

  const handlePlaceBet = async () => {
    if (items.length === 0) return;
    if (stake <= 0) {
      addToast({ type: "error", message: "Please enter a stake amount" });
      return;
    }
    if (balance.cash < stake) {
      addToast({ type: "error", message: "Insufficient balance. Please deposit." });
      return;
    }

    const success = await placeBet();
    if (success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#FEE500", "#FFFFFF", "#10B981"],
      });
      addToast({
        type: "gold",
        message: `Bet placed! Payout: ${currency.symbol}${grandTotalWin.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      });
      setActiveTab("my-bets");
    }
  };

  const handleCashOut = async (betId: string, offer: number) => {
    const success = await cashOut(betId);
    if (success) {
      addToast({
        type: "gold",
        message: `Cashed out ${currency.symbol}${offer.toLocaleString()}!`,
      });
    }
  };

  const quickChips = [100, 500, 1000, 5000];

  return (
    <aside className="w-full shrink-0 flex flex-col bg-[#212631] rounded-xl border border-[#2E3544] overflow-hidden text-xs select-none shadow-sm h-full max-h-full">
      {/* 1. Parimatch Header */}
      <div className="shrink-0 flex items-center justify-between border-b border-[#2E3544] bg-[#1C2029] px-3.5 py-2.5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("slip")}
            className={cn(
              "font-bold text-xs uppercase tracking-wider transition-colors relative py-1",
              activeTab === "slip"
                ? "text-[#FEE500] border-b-2 border-[#FEE500]"
                : "text-white/60 hover:text-white"
            )}
          >
            <span>MY BETSLIP</span>
            {items.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded font-mono text-[10px] bg-[#FEE500] text-black font-extrabold">
                {items.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("my-bets")}
            className={cn(
              "font-bold text-xs uppercase tracking-wider transition-colors relative py-1",
              activeTab === "my-bets"
                ? "text-[#FEE500] border-b-2 border-[#FEE500]"
                : "text-white/60 hover:text-white"
            )}
          >
            <span>MY BETS</span>
            {openBets?.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded font-mono text-[9px] bg-emerald-500/20 text-emerald-400 font-bold">
                {openBets.length}
              </span>
            )}
          </button>
        </div>

        {items.length > 0 && activeTab === "slip" && (
          <button
            onClick={clearSlip}
            className="text-[11px] text-white/40 hover:text-rose-400 font-medium"
            title="Clear Bet Slip"
          >
            Clear all
          </button>
        )}
      </div>

      {activeTab === "slip" ? (
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Bet Type Switcher */}
          {items.length > 1 && (
            <div className="shrink-0 px-3 pt-2.5">
              <div className="flex items-center p-0.5 rounded-lg bg-[#1C2029] border border-[#2E3544]">
                <button
                  onClick={() => setBetType("single")}
                  className={cn(
                    "flex-1 py-1.5 rounded-md text-center font-bold transition-colors text-[11px]",
                    betType === "single"
                      ? "bg-[#282D3A] text-white"
                      : "text-white/50 hover:text-white"
                  )}
                >
                  Single ({items.length})
                </button>
                <button
                  onClick={() => setBetType("parlay")}
                  className={cn(
                    "flex-1 py-1.5 rounded-md text-center font-bold transition-colors text-[11px] flex items-center justify-center gap-1",
                    betType === "parlay"
                      ? "bg-[#282D3A] text-white"
                      : "text-white/50 hover:text-white"
                  )}
                >
                  <span>Parlay</span>
                  {bonusMultiplier > 0 && (
                    <span className="text-[9px] px-1 rounded bg-emerald-500 text-black font-extrabold">
                      +{(bonusMultiplier * 100).toFixed(0)}%
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Selections List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center text-white/30 gap-2">
                <Receipt className="w-8 h-8 text-white/20" />
                <div className="font-semibold text-xs text-white/60">Bet Slip is Empty</div>
                <div className="text-[11px] text-white/40 max-w-[180px]">
                  Click on any match odds to add selections.
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#282D3A] border border-[#343C4D] flex flex-col gap-1 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex items-start gap-2 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FEE500] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-xs truncate">
                          {item.selectionName || item.selection}
                        </div>
                        <div className="text-[11px] text-white/70 truncate">
                          {item.marketName || item.market}
                        </div>
                        <div className="text-[10.5px] text-white/50 truncate">
                          {item.matchTitle || item.eventName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-xs text-[#111317] bg-[#FEE500] px-2 py-0.5 rounded-md">
                        {item.odds.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded text-white/30 hover:text-rose-400"
                        title="Remove selection"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Stake & Payout Controls */}
          {items.length > 0 && (
            <div className="shrink-0 p-2.5 bg-[#101217] border-t border-[#20232A] flex flex-col gap-2">
              {/* Total Odds */}
              <div className="flex items-center justify-between text-xs px-0.5">
                <span className="text-white/50">Total Odds:</span>
                <span className="font-mono font-bold text-sm text-white">
                  {totalOdds.toFixed(2)}
                </span>
              </div>

              {/* Stake Input */}
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40 font-mono font-bold text-xs">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    min={10}
                    value={stake || ""}
                    onChange={(e) => setStake(Number(e.target.value))}
                    placeholder="Stake amount"
                    className="w-full bg-[#1C2029] border border-[#343C4D] focus:border-[#FEE500] rounded-lg pl-7 pr-3 py-2 text-xs font-mono font-bold text-white outline-none"
                  />
                </div>

                {/* Quick Chips */}
                <div className="flex items-center gap-1.5">
                  {quickChips.map((c) => (
                    <button
                      key={c}
                      onClick={() => setStake((prev) => (prev ? prev + c : c))}
                      className="flex-1 py-1.5 rounded-md bg-[#282D3A] hover:bg-[#353D4E] border border-[#343C4D] text-[10px] font-mono text-white/80 hover:text-white"
                    >
                      +{c}
                    </button>
                  ))}
                  <button
                    onClick={() => setStake(balance.cash)}
                    className="px-2.5 py-1.5 rounded-md bg-[#282D3A] hover:bg-[#353D4E] border border-[#343C4D] text-[10px] font-mono text-[#FEE500] font-bold"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Potential Payout */}
              <div className="flex items-center justify-between text-xs pt-1.5 border-t border-white/[0.08]">
                <span className="text-white/60">Potential Win:</span>
                <span className="font-mono font-bold text-sm text-[#FEE500]">
                  {currency.symbol}{grandTotalWin.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Parimatch Place Bet Button */}
              <button
                onClick={handlePlaceBet}
                disabled={isPlacing || items.length === 0 || stake <= 0}
                className="w-full py-3 rounded-xl bg-[#FEE500] hover:bg-[#FFF033] text-[#111317] font-black text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isPlacing ? (
                  <span>Placing Bet...</span>
                ) : (
                  <span>PLACE BET</span>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* My Bets Tab */
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
          {openBets?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center text-white/30 gap-1.5">
              <Clock className="w-7 h-7 text-white/20" />
              <div className="font-semibold text-xs text-white/60">No Active Bets</div>
              <div className="text-[11px] text-white/40 max-w-[170px]">
                Your placed bets will appear here.
              </div>
            </div>
          ) : (
            openBets.map((bet: any) => (
              <div
                key={bet.id}
                className="p-3 rounded-xl bg-[#282D3A] border border-[#343C4D] flex flex-col gap-1.5 shadow-sm"
              >
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="font-mono text-white/70 font-semibold">{bet.id}</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px]">
                    ACTIVE
                  </span>
                </div>

                <div className="text-xs font-bold text-white truncate">
                  {bet.items?.[0]?.selection || bet.items?.[0]?.selectionName || "Single"}
                </div>
                <div className="text-[10.5px] text-white/50 truncate">
                  {bet.items?.[0]?.matchTitle || "Match"}
                </div>

                <div className="pt-1.5 border-t border-white/[0.05] flex items-center justify-between text-[10.5px]">
                  <span className="text-white/40">Stake: ₹{bet.stake}</span>
                  <span className="font-mono font-bold text-[#FEE500]">To Win: ₹{bet.potentialWin}</span>
                </div>

                {bet.cashOutOffer && (
                  <button
                    onClick={() => handleCashOut(bet.id, bet.cashOutOffer)}
                    className="w-full py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold transition-colors mt-0.5"
                  >
                    Cash Out ₹{bet.cashOutOffer}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </aside>
  );
}
