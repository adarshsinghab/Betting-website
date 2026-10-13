"use client";

import React from "react";
import { useBetSlip } from "@/context/BetSlipContext";
import { BetSlipItem } from "@/types";
import { cn } from "@/lib/utils";

interface OddsButtonProps {
  label: string;
  odds: number;
  betItem: Omit<BetSlipItem, "id" | "odds">;
  previousOdds?: number;
  disabled?: boolean;
  className?: string;
}

export function OddsButton({
  label,
  odds,
  betItem,
  previousOdds,
  disabled = false,
  className,
}: OddsButtonProps) {
  const { items, addItem, removeItem } = useBetSlip();

  // Deterministic ID for this specific bet
  const itemId = `${betItem.matchId}-${betItem.market}-${betItem.selection}`;
  const isSelected = items.some((item) => item.id === itemId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;

    if (isSelected) {
      removeItem(itemId);
    } else {
      addItem({
        ...betItem,
        id: itemId,
        odds,
      });
    }
  };

  const isUp = previousOdds && odds > previousOdds;
  const isDown = previousOdds && odds < previousOdds;

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-150 active:scale-95 select-none",
        isSelected
          ? "bg-[#FEE500] border-[#FEE500] text-black shadow-[0_0_15px_rgba(254,229,0,0.35)] font-bold"
          : "bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.07] text-white/80 hover:text-white odds-btn-unselected",
        disabled && "opacity-40 cursor-not-allowed",
        isUp && "flash-up",
        isDown && "flash-down",
        className
      )}
    >
      <span className={cn("text-[11px] truncate mr-1.5", isSelected ? "text-black/80" : "text-white/50")}>
        {label}
      </span>
      <span
        className={cn(
          "font-mono font-bold text-xs tabular-nums",
          isSelected ? "text-black" : "text-[#FEE500]"
        )}
      >
        {odds.toFixed(2)}
      </span>
    </button>
  );
}
