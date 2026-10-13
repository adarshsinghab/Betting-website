"use client";

import React from "react";
import { X } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { MatchDetailCenter } from "@/components/sportsbook/MatchDetailCenter";

export function MatchDetailModal() {
  const { modals, closeModal } = useUI();
  const isOpen = modals.matchDetail.isOpen;
  const match = modals.matchDetail.data?.match;

  if (!isOpen || !match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl glass-card border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] bg-[#0A0B0E]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#0E1015] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FEE500] animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Comprehensive Match Center
            </span>
          </div>

          <button
            onClick={() => closeModal("matchDetail")}
            className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-6 bg-[#07080B]">
          <MatchDetailCenter
            matchId={match.id}
            initialMatch={match}
            onBack={() => closeModal("matchDetail")}
          />
        </div>
      </div>
    </div>
  );
}
