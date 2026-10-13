"use client";

import React from "react";
import { Receipt, ChevronRight, Zap } from "lucide-react";
import { useBetSlip } from "@/context/BetSlipContext";
import { useWallet } from "@/context/WalletContext";
import { useUI } from "@/context/UIContext";

export function MobileFloatingBetBar() {
  const { items, potentialWin } = useBetSlip();
  const { currency } = useWallet();
  const { openModal } = useUI();

  if (items.length === 0) return null;

  return (
    <div className="lg:hidden fixed bottom-[70px] inset-x-0 z-30 px-3 py-1.5 pointer-events-none select-none animate-in slide-in-from-bottom-2 duration-150">
      <div 
        onClick={() => openModal("mobileBetslip")}
        className="pointer-events-auto w-full max-w-md mx-auto rounded-xl bg-[#282D3A] border border-[#3E4658] p-2.5 flex items-center justify-between shadow-2xl active:scale-[0.99] transition-transform cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FEE500] text-[#111317] flex items-center justify-center font-black text-xs shadow-sm">
            {items.length}
          </div>
          <div>
            <div className="font-extrabold text-xs text-white flex items-center gap-1.5">
              <span>{items.length === 1 ? "1 Selection Selected" : `${items.length} Selections in Slip`}</span>
            </div>
            <div className="text-[11px] font-mono font-bold text-[#FEE500]">
              Potential Return: {currency.symbol}{potentialWin.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal("mobileBetslip");
          }}
          className="px-3.5 py-1.5 rounded-lg bg-[#FEE500] hover:bg-[#FFF033] text-[#111317] font-black text-xs flex items-center gap-1 shadow-sm shrink-0"
        >
          <span>PLACE BET</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
