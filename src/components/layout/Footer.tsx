"use client";

import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  HelpCircle, 
  Smartphone 
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useUI } from "@/context/UIContext";

export function Footer() {
  const { setActiveTab, openModal } = useUI();

  return (
    <footer className="w-full bg-[#14171E] border-t border-[#2E3544] pt-8 pb-24 lg:pb-10 text-xs select-none">
      <div className="max-w-[1540px] mx-auto px-4 flex flex-col gap-6">
        {/* Top Row: Brand & Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 flex flex-col gap-2">
            <BrandLogo width={180} height={42} />
            <p className="text-white/50 text-xs leading-relaxed max-w-sm mt-2">
              Betting Bantu is a premier sports betting and in-play odds platform with instant payouts and provably fair casino gaming.
            </p>
            <div className="flex items-center gap-3 text-white/40 pt-1 text-[11px]">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-white/40" />
                <span>Curaçao 8048/JAZ</span>
              </div>
            </div>
          </div>

          {/* Col 2: Sportsbook */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Sports
            </h4>
            <div className="flex flex-col gap-1 text-white/60 text-xs">
              <button onClick={() => setActiveTab("sports")} className="hover:text-white text-left transition-colors">
                Cricket (IPL)
              </button>
              <button onClick={() => setActiveTab("sports")} className="hover:text-white text-left transition-colors">
                Premier League
              </button>
              <button onClick={() => setActiveTab("live")} className="hover:text-red-400 text-left transition-colors flex items-center gap-1">
                <span>Live In-Play</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>
              <button onClick={() => setActiveTab("esports")} className="hover:text-white text-left transition-colors">
                CS2 Esports
              </button>
            </div>
          </div>

          {/* Col 3: Casino & Games */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Casino
            </h4>
            <div className="flex flex-col gap-1 text-white/60 text-xs">
              <button onClick={() => setActiveTab("instant-games")} className="hover:text-white text-left transition-colors">
                Aviator Crash
              </button>
              <button onClick={() => setActiveTab("instant-games")} className="hover:text-white text-left transition-colors">
                Mines 5x5
              </button>
              <button onClick={() => setActiveTab("casino")} className="hover:text-white text-left transition-colors">
                Slots & Jackpots
              </button>
              <button onClick={() => setActiveTab("live-casino")} className="hover:text-white text-left transition-colors">
                Live Roulette
              </button>
            </div>
          </div>

          {/* Col 4: Platform & Support */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Support
            </h4>
            <div className="flex flex-col gap-1 text-white/60 text-xs">
              <button onClick={() => openModal("responsibleGaming")} className="hover:text-white text-left transition-colors">
                Responsible Gaming (18+)
              </button>
              <button onClick={() => openModal("notifications")} className="hover:text-white text-left transition-colors">
                24/7 VIP Support
              </button>
              <button onClick={() => openModal("deposit")} className="hover:text-[#FEE500] text-left transition-colors">
                Instant UPI Deposit
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Bar */}
        <div className="py-2.5 px-3 rounded-xl bg-[#1C2029] border border-[#2E3544] flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="text-white/40 font-semibold uppercase">Supported Gateways:</span>
          <div className="flex flex-wrap items-center gap-2 font-mono text-white/70">
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">UPI / BHIM</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">Google Pay</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">PhonePe</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">Paytm</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">USDT</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">IMPS Bank</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#2E3544] text-[10.5px] text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 font-bold">18+</span>
            <span>Gambling can be addictive. Play responsibly.</span>
          </div>
          <div>© 2026 BETTING BANTU. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
