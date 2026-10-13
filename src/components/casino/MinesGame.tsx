"use client";

import React, { useState } from "react";
import { 
  Bomb, 
  Gem, 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  Coins,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";
import { useWallet } from "@/context/WalletContext";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

type TileState = "hidden" | "gem" | "mine";

export function MinesGame() {
  const { balance, updateBalance, currency } = useWallet();
  const { addToast } = useUI();

  const [gridSize] = useState(25);
  const [mineCount, setMineCount] = useState(3);
  const [stake, setStake] = useState(100);

  // Game state
  const [isPlaying, setIsPlaying] = useState(false);
  const [mineLocations, setMineLocations] = useState<Set<number>>(new Set());
  const [revealedTiles, setRevealedTiles] = useState<Map<number, TileState>>(new Map());
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gemsFound, setGemsFound] = useState(0);

  // Multiplier progression based on mine count
  const calculateNextMultiplier = (gems: number, mines: number) => {
    let mult = 1.0;
    for (let i = 0; i < gems; i++) {
      mult *= (25 - i) / (25 - mines - i);
    }
    return +(mult * 0.96).toFixed(2); // 4% house edge
  };

  const handleStartGame = () => {
    if (balance.cash < stake) {
      addToast({ type: "error", message: "Insufficient balance." });
      return;
    }
    updateBalance(-stake, "cash");

    // Randomize mine locations
    const mines = new Set<number>();
    while (mines.size < mineCount) {
      mines.add(Math.floor(Math.random() * gridSize));
    }

    setMineLocations(mines);
    setRevealedTiles(new Map());
    setCurrentMultiplier(1.00);
    setGemsFound(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const handleTileClick = (index: number) => {
    if (!isPlaying || isGameOver || revealedTiles.has(index)) return;

    if (mineLocations.has(index)) {
      // Hit a mine!
      const newRevealed = new Map(revealedTiles);
      mineLocations.forEach((m) => newRevealed.set(m, "mine"));
      setRevealedTiles(newRevealed);
      setIsGameOver(true);
      setIsPlaying(false);
      addToast({ type: "error", message: "BOOM! You hit a mine!" });
    } else {
      // Uncovered a gem!
      const newRevealed = new Map(revealedTiles);
      newRevealed.set(index, "gem");
      const nextGems = gemsFound + 1;
      const nextMult = calculateNextMultiplier(nextGems, mineCount);

      setRevealedTiles(newRevealed);
      setGemsFound(nextGems);
      setCurrentMultiplier(nextMult);

      if (nextGems === gridSize - mineCount) {
        // Uncovered all gems! Auto cash out!
        handleCashout();
      }
    }
  };

  const handleCashout = () => {
    if (!isPlaying || isGameOver || gemsFound === 0) return;
    const win = +(stake * currentMultiplier).toFixed(2);
    updateBalance(win, "cash");
    setIsPlaying(false);
    setIsGameOver(true);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#10B981", "#FEE500", "#3B82F6"],
    });

    addToast({
      type: "success",
      message: `Cashed out ${currency.symbol}${win.toLocaleString()} (${currentMultiplier.toFixed(2)}x)!`,
    });
  };

  return (
    <div className="w-full glass-card rounded-2xl border border-white/[0.08] p-4 sm:p-6 flex flex-col md:flex-row gap-6 select-none">
      {/* Left Control Panel */}
      <div className="w-full md:w-64 flex flex-col gap-4">
        <div>
          <div className="text-sm font-bold text-white flex items-center gap-1.5">
            <Bomb className="w-4 h-4 text-red-400" />
            <span>MINES 5x5</span>
          </div>
          <div className="text-xs text-white/40 mt-0.5">Pick gems, dodge bombs, cash out anytime.</div>
        </div>

        {/* Stake Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-white/60 font-semibold">Bet Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-white/40 text-xs font-bold">{currency.symbol}</span>
            <input
              type="number"
              disabled={isPlaying}
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              className="w-full bg-[#141420] border border-white/[0.1] rounded-xl pl-8 pr-3 py-2 font-mono font-bold text-white text-sm outline-none"
            />
          </div>
        </div>

        {/* Mines Count Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-white/60 font-semibold">Number of Mines</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 3, 5, 10].map((count) => (
              <button
                key={count}
                disabled={isPlaying}
                onClick={() => setMineCount(count)}
                className={cn(
                  "py-1.5 rounded-lg text-xs font-mono font-bold transition-all",
                  mineCount === count
                    ? "bg-[#FEE500] text-black"
                    : "bg-white/[0.05] text-white/60 hover:text-white"
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-2 flex flex-col gap-2">
          {!isPlaying ? (
            <button
              onClick={handleStartGame}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FEE500] to-[#F59E0B] text-black font-extrabold text-sm shadow-[0_0_20px_rgba(254,229,0,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>BET {currency.symbol}{stake}</span>
            </button>
          ) : (
            <button
              disabled={gemsFound === 0}
              onClick={handleCashout}
              className={cn(
                "w-full py-3 rounded-xl font-extrabold text-sm transition-all flex flex-col items-center justify-center shadow-lg active:scale-95",
                gemsFound > 0
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              )}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider">CASH OUT</span>
              <span className="font-mono text-base font-black">
                {currency.symbol}{(stake * currentMultiplier).toFixed(0)} ({currentMultiplier.toFixed(2)}x)
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Right: 5x5 Minefield Grid */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="grid grid-cols-5 gap-2 sm:gap-2.5 p-3 rounded-2xl bg-[#09090E] border border-white/[0.06] shadow-inner max-w-[360px] w-full aspect-square">
          {Array.from({ length: 25 }).map((_, i) => {
            const state = revealedTiles.get(i);
            const isRevealed = state !== undefined;

            return (
              <button
                key={i}
                disabled={!isPlaying || isGameOver || isRevealed}
                onClick={() => handleTileClick(i)}
                className={cn(
                  "rounded-xl font-bold flex items-center justify-center transition-all duration-200 aspect-square text-lg shadow-sm active:scale-95",
                  !isRevealed
                    ? "bg-[#161622] hover:bg-[#1E1E2E] border border-white/[0.08]"
                    : state === "gem"
                    ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "bg-red-500/30 border border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-bounce"
                )}
              >
                {state === "gem" && <Gem className="w-6 h-6 animate-pulse" />}
                {state === "mine" && <Bomb className="w-6 h-6" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
