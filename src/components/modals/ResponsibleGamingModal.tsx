"use client";

import React, { useState } from "react";
import { 
  X, 
  ShieldCheck, 
  Clock, 
  Lock, 
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { useUI } from "@/context/UIContext";

export function ResponsibleGamingModal() {
  const { modals, closeModal, addToast } = useUI();
  const isOpen = modals.responsibleGaming.isOpen;

  const [depositLimit, setDepositLimit] = useState(10000);
  const [sessionLimit, setSessionLimit] = useState(60);

  if (!isOpen) return null;

  const handleSaveLimits = () => {
    addToast({
      type: "success",
      message: `Deposit limit set to ₹${depositLimit.toLocaleString()} / day. Session reminder: ${sessionLimit} mins.`,
    });
    closeModal("responsibleGaming");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl glass-card border border-white/[0.1] shadow-2xl p-6 flex flex-col gap-5">
        <button
          onClick={() => closeModal("responsibleGaming")}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">Responsible Gaming</h3>
            <p className="text-xs text-white/50">Stay in control of your play & limits.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="text-white/70 font-semibold">Daily Deposit Limit (₹)</label>
            <input
              type="number"
              value={depositLimit}
              onChange={(e) => setDepositLimit(Number(e.target.value))}
              className="w-full bg-[#141420] border border-white/[0.1] rounded-xl px-3.5 py-2 font-mono text-white text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/70 font-semibold">Session Time Limit (Minutes)</label>
            <input
              type="number"
              value={sessionLimit}
              onChange={(e) => setSessionLimit(Number(e.target.value))}
              className="w-full bg-[#141420] border border-white/[0.1] rounded-xl px-3.5 py-2 font-mono text-white text-sm outline-none"
            />
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-start gap-2 mt-1">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Underage gambling is strictly prohibited (18+ only). If you feel you need a break, you can request self-exclusion anytime.</span>
          </div>
        </div>

        <button
          onClick={handleSaveLimits}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold text-xs shadow-lg hover:brightness-110 transition-all"
        >
          Save Responsible Gaming Limits
        </button>
      </div>
    </div>
  );
}
