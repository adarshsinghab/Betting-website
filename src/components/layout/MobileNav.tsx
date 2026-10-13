"use client";

import React from "react";
import { Menu } from "lucide-react";
import { SportIcon } from "@/components/ui/SportIcon";
import { useUI } from "@/context/UIContext";
import { useBetSlip } from "@/context/BetSlipContext";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const { activeTab, setActiveTab, toggleMobileDrawer, openModal } = useUI();
  const { items } = useBetSlip();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#1C2029]/95 backdrop-blur-xl border-t border-[#2E3544] px-3 py-1.5 flex items-center justify-between select-none shadow-lg"
    >
      {/* 1. Sports */}
      <button
        onClick={() => setActiveTab("sports")}
        className={cn(
          "flex-1 flex flex-col items-center gap-1 py-1 rounded-lg transition-all",
          activeTab === "sports" ? "text-[#FEE500]" : "text-white/60 hover:text-white"
        )}
      >
        <SportIcon name="trophy" size={17} />
        <span className="text-[10px] font-bold">Sports</span>
      </button>

      {/* 2. Live */}
      <button
        onClick={() => setActiveTab("live")}
        className={cn(
          "flex-1 flex flex-col items-center gap-1 py-1 rounded-lg transition-all",
          activeTab === "live" ? "text-red-400" : "text-white/60 hover:text-white"
        )}
      >
        <div className="relative">
          <SportIcon name="live" size={17} />
          <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
        </div>
        <span className="text-[10px] font-bold">In-Play</span>
      </button>

      {/* 3. Center BetSlip Floating Button */}
      <button
        onClick={() => openModal("mobileBetslip")}
        className="flex-1 flex flex-col items-center relative -top-3"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#FEE500] text-[#111317] flex items-center justify-center shadow-[0_4px_16px_rgba(254,229,0,0.35)] active:scale-95 transition-transform">
          <SportIcon name="receipt" size={24} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#111317] text-[#FEE500] border-2 border-[#FEE500] font-black text-[10px] flex items-center justify-center">
              {items.length}
            </span>
          )}
        </div>
        <span className="text-[10px] font-black text-white mt-0.5 tracking-tight">Betslip</span>
      </button>

      {/* 4. Casino */}
      <button
        onClick={() => setActiveTab("casino")}
        className={cn(
          "flex-1 flex flex-col items-center gap-1 py-1 rounded-lg transition-all",
          activeTab === "casino" ? "text-[#FEE500]" : "text-white/60 hover:text-white"
        )}
      >
        <SportIcon name="chip" size={17} />
        <span className="text-[10px] font-bold">Casino</span>
      </button>

      {/* 5. Menu Drawer */}
      <button
        onClick={toggleMobileDrawer}
        className="flex-1 flex flex-col items-center gap-1 py-1 rounded-lg text-white/60 hover:text-white transition-all"
      >
        <Menu className="w-4 h-4" />
        <span className="text-[10px] font-bold">Menu</span>
      </button>
    </nav>
  );
}
