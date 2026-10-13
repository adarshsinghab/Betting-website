"use client";

import React from "react";
import { 
  Gift, 
  Sparkles, 
  Crown, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { MOCK_PROMOTIONS } from "@/data/mock/promotions";
import { cn } from "@/lib/utils";

export function PromotionsHub() {
  const { openModal } = useUI();

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl sm:rounded-3xl border border-[#FEE500]/30 overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-black shadow-2xl">
        <div className="max-w-xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FEE500] text-black font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3 fill-black" />
              <span>OFFICIAL PROMOTIONS</span>
            </span>
            <span className="text-xs text-amber-300 font-bold">₹2.5 CRORE TOTAL PRIZE POOL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Claim Your 150% Welcome Bonus
          </h2>

          <p className="text-xs sm:text-sm text-white/60">
            Deposit now via UPI, PhonePe, Paytm or Crypto to unlock up to ₹100,000 in bonus betting credits with instant wagering.
          </p>

          <button
            onClick={() => openModal("deposit")}
            className="w-fit px-6 py-3 rounded-xl bg-gradient-to-r from-[#FEE500] to-[#F59E0B] text-black font-extrabold text-xs shadow-[0_0_25px_rgba(254,229,0,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 mt-2"
          >
            <span>CLAIM ₹100K BONUS NOW</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Promotions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_PROMOTIONS.map((promo) => (
          <div
            key={promo.id}
            className="glass-card rounded-2xl p-5 border border-white/[0.08] hover:border-[#FEE500]/40 transition-all flex flex-col justify-between gap-4 shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-white/[0.08] text-[#FEE500] font-bold text-[10px] uppercase tracking-wider">
                  {promo.tag || "BONUS"}
                </span>
                <span className="text-[11px] text-white/40">Code: <b className="text-white font-mono">{promo.code || "BANTU150"}</b></span>
              </div>

              <h3 className="text-lg font-extrabold text-white">
                {promo.title}
              </h3>

              <p className="text-xs text-white/60">
                {promo.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
              <div className="text-xs">
                <span className="text-white/40">Max Bonus: </span>
                <span className="font-mono font-bold text-emerald-400">
                  ₹{promo.maxBonus?.toLocaleString() || "100,000"}
                </span>
              </div>

              <button
                onClick={() => openModal("deposit")}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-[#FEE500] hover:text-black text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                <span>Activate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
