"use client";

import React from "react";
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { useUI } from "@/context/UIContext";

export function InvestorPitchModal() {
  const { modals, closeModal } = useUI();
  const isOpen = modals.investorPitch?.isOpen;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#212631] border border-[#2E3544] shadow-2xl p-6 sm:p-8 flex flex-col gap-5 overflow-hidden">
        <button
          onClick={() => closeModal("investorPitch")}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-[#FEE500] text-[#111317] font-black text-xs uppercase tracking-wider">
            INVESTOR BRIEF
          </span>
          <span className="text-xs text-white/50 font-mono">Seed Round • Commercial API Integration</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Betting Bantu — Production Architecture & Licensing Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">
            The frontend, state architecture, and sportsbook engine are 100% complete. Seeking Seed Capital to finalize commercial enterprise API licensing and official game provider ingestion.
          </p>
        </div>

        {/* Budget Allocation Breakdown */}
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 font-bold">
            CAPITAL ALLOCATION & API LICENSING
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#282D3A] border border-[#343C4D] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FEE500]">Sportradar Live Odds LFX</span>
                <span className="font-mono font-bold text-white text-[11px]">₹45L / $55K</span>
              </div>
              <p className="text-white/60 text-[11px]">
                Official cricket (IPL, ICC), football (EPL, UCL), and global in-play telemetry feed ingestion.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#282D3A] border border-[#343C4D] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400">Evolution Live Casino</span>
                <span className="font-mono font-bold text-white text-[11px]">₹60L / $72K</span>
              </div>
              <p className="text-white/60 text-[11px]">
                High-definition Indian tables: Super Andar Bahar, Teen Patti 20-20, Lightning Roulette, and Blackjack.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#282D3A] border border-[#343C4D] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">Spribe Aviator Crash Engine</span>
                <span className="font-mono font-bold text-white text-[11px]">₹25L / $30K</span>
              </div>
              <p className="text-white/60 text-[11px]">
                Certified crash multiplier server integration with multiplayer websocket lobby synchronization.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#282D3A] border border-[#343C4D] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400">Indian Banking & Escrow</span>
                <span className="font-mono font-bold text-white text-[11px]">₹35L / $42K</span>
              </div>
              <p className="text-white/60 text-[11px]">
                Instant UPI (Google Pay, PhonePe, Paytm) automated webhook reconciliation and reserve escrow liquidity.
              </p>
            </div>
          </div>
        </div>

        {/* Ready Architecture Pillars */}
        <div className="p-3.5 rounded-xl bg-[#1C2029] border border-[#2E3544] flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-white/80 font-medium">Modular REST/WSS Adapter</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-white/80 font-medium">Provably Fair Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-white/80 font-medium">Full Mobile PWA UX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
