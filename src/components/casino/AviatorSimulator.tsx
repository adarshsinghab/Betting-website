"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Plane, 
  Play, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  History, 
  Users, 
  TrendingUp, 
  RotateCcw,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";
import { useWallet } from "@/context/WalletContext";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

interface BetRow {
  id: string;
  user: string;
  stake: number;
  cashedOutMultiplier?: number;
}

export function AviatorSimulator() {
  const { balance, updateBalance, currency } = useWallet();
  const { addToast } = useUI();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game States: 'betting' (countdown) | 'flying' | 'crashed'
  const [gameState, setGameState] = useState<"betting" | "flying" | "crashed">("betting");
  const [countdown, setCountdown] = useState(5);
  const [multiplier, setMultiplier] = useState(1.00);
  const [crashTarget, setCrashTarget] = useState(2.50);

  // Player controls
  const [stake, setStake] = useState(100);
  const [hasBet, setHasBet] = useState(false);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [cashedAmount, setCashedAmount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // History of past multipliers
  const [history, setHistory] = useState<number[]>([1.42, 3.84, 1.12, 5.60, 2.04, 1.88, 12.40, 1.05]);

  // Simulated live multiplayer bets
  const [liveBets, setLiveBets] = useState<BetRow[]>([
    { id: "1", user: "Vikram***_IN", stake: 500, cashedOutMultiplier: 1.85 },
    { id: "2", user: "Rajesh99", stake: 1000 },
    { id: "3", user: "Player_772", stake: 250, cashedOutMultiplier: 2.10 },
    { id: "4", user: "Amit_VIP", stake: 5000 },
    { id: "5", user: "Pooja_88", stake: 300, cashedOutMultiplier: 1.45 },
  ]);

  // Handle countdown before flight
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "betting") {
      setMultiplier(1.00);
      setHasCashedOut(false);
      setCashedAmount(0);

      // Pick random crash point (from 1.10x up to 15.00x)
      const target = Math.random() < 0.25 
        ? +(1.05 + Math.random() * 0.45).toFixed(2)
        : +(1.50 + Math.random() * 6.50 + (Math.random() < 0.1 ? 8 : 0)).toFixed(2);
      setCrashTarget(target);

      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      } else {
        setGameState("flying");
      }
    }
    return () => clearTimeout(timer);
  }, [gameState, countdown]);

  // Flight simulation loop
  useEffect(() => {
    let animId: number;
    let currentMult = 1.00;
    const startTime = Date.now();

    if (gameState === "flying") {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        // Exponential multiplier curve: 1 + 0.1 * t^1.5
        currentMult = +(1 + Math.pow(elapsed * 0.9, 1.55)).toFixed(2);

        if (currentMult >= crashTarget) {
          setMultiplier(crashTarget);
          setGameState("crashed");
          setHistory((h) => [crashTarget, ...h.slice(0, 10)]);
          clearInterval(interval);

          // Reset to betting after 3.5 seconds
          setTimeout(() => {
            setCountdown(5);
            setHasBet(false);
            setGameState("betting");
          }, 3500);
        } else {
          setMultiplier(currentMult);
        }
      }, 40);

      return () => clearInterval(interval);
    }
  }, [gameState, crashTarget]);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw coordinate grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (gameState === "flying" || gameState === "crashed") {
      const progress = Math.min((multiplier - 1.00) / (crashTarget * 0.9), 1);
      const endX = 40 + progress * (width - 120);
      const endY = height - 40 - Math.pow(progress, 1.4) * (height - 100);

      // Draw flight curve
      ctx.beginPath();
      ctx.moveTo(40, height - 40);
      ctx.quadraticCurveTo(width * 0.35, height - 40, endX, endY);
      ctx.strokeStyle = gameState === "crashed" ? "#EF4444" : "#FEE500";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw gradient under curve
      ctx.lineTo(endX, height - 40);
      ctx.lineTo(40, height - 40);
      const grad = ctx.createLinearGradient(0, endY, 0, height - 40);
      grad.addColorStop(0, gameState === "crashed" ? "rgba(239, 68, 68, 0.3)" : "rgba(254, 229, 0, 0.3)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw Supersonic Jet
      if (gameState === "flying") {
        ctx.save();
        ctx.translate(endX, endY);
        // Angle jet slightly upwards
        ctx.rotate(-0.35);

        // Jet Body
        ctx.fillStyle = "#FF0033";
        ctx.beginPath();
        ctx.ellipse(0, 0, 18, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cockpit
        ctx.fillStyle = "#FEE500";
        ctx.beginPath();
        ctx.ellipse(6, -2, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wings
        ctx.fillStyle = "#CC0029";
        ctx.beginPath();
        ctx.moveTo(-4, -6);
        ctx.lineTo(2, -16);
        ctx.lineTo(8, -6);
        ctx.fill();

        // Exhaust Fire
        ctx.fillStyle = "#FFA500";
        ctx.beginPath();
        ctx.moveTo(-18, -3);
        ctx.lineTo(-28 - Math.random() * 8, 0);
        ctx.lineTo(-18, 3);
        ctx.fill();

        ctx.restore();
      }
    }
  }, [gameState, multiplier, crashTarget]);

  // Handle Player Placing Bet
  const handlePlaceBet = () => {
    if (stake <= 0) return;
    if (balance.cash < stake) {
      addToast({ type: "error", message: "Insufficient balance to place bet." });
      return;
    }
    updateBalance(-stake, "cash");
    setHasBet(true);
    addToast({ type: "success", message: `Bet of ${currency.symbol}${stake} placed for round!` });
  };

  // Handle Cashout
  const handleCashout = () => {
    if (!hasBet || hasCashedOut || gameState !== "flying") return;
    const win = +(stake * multiplier).toFixed(2);
    updateBalance(win, "cash");
    setHasCashedOut(true);
    setCashedAmount(win);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#10B981", "#FEE500", "#FFFFFF"],
    });

    addToast({
      type: "success",
      message: `CASHED OUT @ ${multiplier.toFixed(2)}x! Won ${currency.symbol}${win.toLocaleString()}!`,
    });
  };

  return (
    <div className="w-full glass-card rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col select-none">
      {/* Top Banner: Past Multiplier History Ribbon */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#09090E] border-b border-white/[0.06] text-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <History className="w-3.5 h-3.5 text-white/40 shrink-0" />
          {history.map((m, idx) => (
            <span
              key={idx}
              className={cn(
                "px-2 py-0.5 rounded-md font-mono font-bold text-[10px] whitespace-nowrap shrink-0",
                m >= 10
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : m >= 2
                  ? "bg-purple-500/20 text-purple-300"
                  : "bg-blue-500/15 text-blue-300"
              )}
            >
              {m.toFixed(2)}x
            </span>
          ))}
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-white/40 hover:text-white p-1 rounded transition-colors shrink-0 ml-2"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
        </button>
      </div>

      {/* Main Canvas & Flight Arena */}
      <div className="relative w-full h-[220px] sm:h-[260px] bg-gradient-to-b from-[#0B0B12] to-[#060608] flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={260}
          className="absolute inset-0 w-full h-full"
        />

        {/* Multiplier Center Display */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
          {gameState === "betting" ? (
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-white/40 text-[11px] font-semibold uppercase tracking-widest">
                NEXT ROUND STARTS IN
              </span>
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#FEE500] tabular-nums animate-pulse">
                {countdown}s
              </span>
            </div>
          ) : gameState === "flying" ? (
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-extrabold font-mono text-white tabular-nums tracking-tight drop-shadow-[0_4px_24px_rgba(254,229,0,0.3)]">
                {multiplier.toFixed(2)}x
              </span>
              <span className="text-[11px] text-white/50 font-bold uppercase tracking-wider mt-0.5">
                MULTIPLIER FLYING
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-3xl sm:text-5xl font-extrabold font-mono text-red-500 tabular-nums drop-shadow-[0_4px_24px_rgba(239,68,68,0.5)]">
                FLEW AWAY!
              </span>
              <span className="text-base font-mono font-bold text-red-400 mt-0.5">
                @ {multiplier.toFixed(2)}x
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Betting Controls & Action Dashboard */}
      <div className="p-2.5 sm:p-3 bg-[#0A0A10] border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Stake Adjustment */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStake((s) => Math.max(10, s - 50))}
            className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold flex items-center justify-center text-sm"
          >
            -
          </button>
          <div className="relative">
            <span className="absolute left-2.5 top-2 text-white/40 text-xs font-bold">{currency.symbol}</span>
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              className="w-28 sm:w-36 bg-[#141420] border border-white/[0.1] rounded-xl pl-6 pr-2 py-1.5 text-center font-mono font-bold text-white text-sm outline-none"
            />
          </div>
          <button
            onClick={() => setStake((s) => s + 50)}
            className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold flex items-center justify-center text-sm"
          >
            +
          </button>
          <button
            onClick={() => setStake((s) => s * 2)}
            className="px-2.5 py-1.5 rounded-xl bg-white/[0.06] text-white/70 hover:text-white text-xs font-mono font-bold"
          >
            2X
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="w-full sm:w-64">
          {!hasBet ? (
            <button
              onClick={handlePlaceBet}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FEE500] to-[#F59E0B] hover:brightness-110 active:scale-95 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(254,229,0,0.35)] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>BET {currency.symbol}{stake}</span>
            </button>
          ) : hasCashedOut ? (
            <div className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-center text-xs flex flex-col items-center">
              <span>CASHED OUT!</span>
              <span className="font-mono text-sm font-extrabold">+{currency.symbol}{cashedAmount.toLocaleString()}</span>
            </div>
          ) : gameState === "flying" ? (
            <button
              onClick={handleCashout}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 active:scale-95 text-black font-extrabold text-sm shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex flex-col items-center justify-center"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider">CASH OUT</span>
              <span className="font-mono text-base font-black">
                {currency.symbol}{(stake * multiplier).toFixed(0)} ({multiplier.toFixed(2)}x)
              </span>
            </button>
          ) : gameState === "crashed" ? (
            <div className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-center text-xs">
              WAITING FOR NEXT ROUND...
            </div>
          ) : (
            <div className="w-full py-3 rounded-xl bg-white/[0.08] text-white/60 font-bold text-center text-xs">
              BET PLACED! STARTING...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
