"use client";

import React from "react";
import { X } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { BetSlipPanel } from "./BetSlipPanel";

export function MobileBetslipDrawer() {
  const { modals, closeModal } = useUI();
  const isOpen = modals.mobileBetslip.isOpen;

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div onClick={() => closeModal("mobileBetslip")} className="fixed inset-0" />
      <div className="relative z-10 w-full max-h-[85vh] bg-[#212631] rounded-t-2xl border-t border-[#2E3544] shadow-2xl flex flex-col overflow-hidden">
        {/* Mobile drag handle bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2E3544] bg-[#1C2029]">
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />
          <button
            onClick={() => closeModal("mobileBetslip")}
            className="p-1 rounded-lg bg-white/[0.05] text-white/50 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <BetSlipPanel />
        </div>
      </div>
    </div>
  );
}
