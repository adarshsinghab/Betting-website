"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { BetSlipItem, BetType, PlacedBet } from "@/types";
import { INITIAL_PLACED_BETS } from "@/data/mock/user";
import { useWallet } from "./WalletContext";
import { useUI } from "./UIContext";
import confetti from "canvas-confetti";

interface ModernBetItem {
  id: string;
  matchId?: string;
  eventId?: string;
  matchTitle?: string;
  eventName?: string;
  market?: string;
  marketName?: string;
  selection?: string;
  selectionName?: string;
  odds: number;
  sport?: string;
  sportSlug?: any;
}

interface BetSlipContextType {
  // Dual-API support for items / selections
  items: any[];
  selections: BetSlipItem[];
  addItem: (item: any) => void;
  addSelection: (item: Omit<BetSlipItem, "id">) => void;
  removeItem: (id: string) => void;
  removeSelection: (selectionId: string) => void;
  clearSlip: () => void;
  hasSelection: (selectionId: string) => boolean;

  betType: any;
  setBetType: (type: any) => void;
  stake: number;
  setStake: React.Dispatch<React.SetStateAction<number>>;
  addStakeAmount: (increment: number) => void;
  clearStake: () => void;

  totalOdds: number;
  potentialWin: number;
  potentialReturn: number;
  bonusMultiplier: number;

  betSlipTab: "betslip" | "mybets";
  setBetSlipTab: (tab: "betslip" | "mybets") => void;

  placeBetState: "idle" | "processing" | "accepted" | "rejected" | "odds_changed";
  isPlacing: boolean;
  placedTicketRef: string | null;
  placeBet: () => Promise<boolean>;
  resetPlaceBetState: () => void;

  placedBets: any[];
  openBets: any[];
  cashOut: (betId: string) => Promise<boolean>;
  cashOutBet: (betId: string) => void;
  simulateOddsChange: () => void;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export function BetSlipProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<any[]>([
    {
      id: "sel-csk-1",
      matchId: "m-1",
      eventId: "m-1",
      matchTitle: "CSK vs Mumbai Indians",
      eventName: "CSK vs Mumbai Indians",
      sportSlug: "cricket",
      competitionName: "IPL 2026",
      marketId: "mkt-winner",
      marketName: "Match Winner",
      market: "Match Winner",
      selectionId: "sel-csk",
      selectionName: "Chennai Super Kings",
      selection: "Chennai Super Kings",
      odds: 1.85,
      isLive: true,
      currentScore: "148/3 (16.2 ov)",
    },
  ]);

  const [betType, setBetType] = useState<any>("single");
  const [stake, setStake] = useState<number>(100);
  const [betSlipTab, setBetSlipTab] = useState<"betslip" | "mybets">("betslip");
  const [placeBetState, setPlaceBetState] = useState<
    "idle" | "processing" | "accepted" | "rejected" | "odds_changed"
  >("idle");
  const [placedTicketRef, setPlacedTicketRef] = useState<string | null>(null);
  const [placedBets, setPlacedBets] = useState<any[]>([
    {
      id: "BET-94820",
      timestamp: "Today, 18:45",
      type: "parlay",
      items: [
        { selection: "India to win", odds: 1.65 },
        { selection: "Real Madrid to win", odds: 1.85 },
      ],
      selections: [],
      stake: 500,
      totalOdds: 3.05,
      potentialWin: 1525,
      potentialReturn: 1525,
      status: "open",
      cashOutOffer: 680,
      cashOutAvailable: true,
    },
  ]);

  const { deductForBet, creditWinnings } = useWallet();
  const { addToast } = useUI();

  const hasSelection = (selectionId: string) => {
    return selections.some((s) => (s.selectionId || s.id) === selectionId);
  };

  const addItem = (item: any) => {
    const newItem = {
      ...item,
      id: item.id || `item-${Math.random().toString(36).substring(2, 9)}`,
      selection: item.selection || item.selectionName,
      selectionName: item.selectionName || item.selection,
      market: item.market || item.marketName,
      marketName: item.marketName || item.market,
      matchTitle: item.matchTitle || item.eventName,
      eventName: item.eventName || item.matchTitle,
    };

    setSelections((prev) => {
      // Remove any bet with the same id or match/selection
      const filtered = prev.filter((p) => p.id !== newItem.id);
      return [...filtered, newItem];
    });

    addToast({
      type: "gold",
      message: `${newItem.selection} (${newItem.odds.toFixed(2)}) added to Bet Slip.`,
    });
  };

  const addSelection = (item: Omit<BetSlipItem, "id">) => {
    addItem(item);
  };

  const removeItem = (id: string) => {
    setSelections((prev) => prev.filter((s) => s.id !== id && s.selectionId !== id));
  };

  const removeSelection = (selectionId: string) => {
    removeItem(selectionId);
  };

  const clearSlip = () => {
    setSelections([]);
    setPlaceBetState("idle");
  };

  const addStakeAmount = (increment: number) => {
    setStake((prev) => (prev ? prev + increment : increment));
  };

  const clearStake = () => {
    setStake(0);
  };

  // Bonus calculation
  const bonusMultiplier =
    selections.length >= 8
      ? 1.5
      : selections.length >= 6
      ? 1.3
      : selections.length >= 4
      ? 1.15
      : selections.length >= 3
      ? 1.05
      : 1.0;

  let totalOdds = 1.0;
  if (selections.length === 0) {
    totalOdds = 0;
  } else if (betType === "single") {
    totalOdds = selections[0]?.odds || 1.0;
  } else {
    totalOdds = selections.reduce((acc, curr) => acc * curr.odds, 1.0);
  }

  const potentialReturn = +(stake * totalOdds * bonusMultiplier).toFixed(2);

  const placeBet = async (): Promise<boolean> => {
    if (selections.length === 0 || stake <= 0) return false;

    setPlaceBetState("processing");
    await new Promise((resolve) => setTimeout(resolve, 800));

    const deducted = deductForBet(stake);
    if (!deducted) {
      setPlaceBetState("rejected");
      addToast({
        type: "error",
        message: "Insufficient wallet balance to place bet.",
      });
      return false;
    }

    const ticket = "BET-" + Math.floor(100000 + Math.random() * 900000);
    setPlacedTicketRef(ticket);

    const newPlacedBet = {
      id: ticket,
      timestamp: "Just now",
      type: betType,
      items: [...selections],
      selections: [...selections],
      stake,
      totalOdds,
      potentialWin: potentialReturn,
      potentialReturn,
      status: "open",
      cashOutOffer: +(stake * 0.95).toFixed(0),
      cashOutAvailable: true,
    };

    setPlacedBets((prev) => [newPlacedBet, ...prev]);
    setPlaceBetState("accepted");
    setSelections([]);
    return true;
  };

  const cashOut = async (betId: string): Promise<boolean> => {
    const bet = placedBets.find((b) => b.id === betId);
    if (!bet || !bet.cashOutOffer) return false;

    creditWinnings(bet.cashOutOffer, betId);
    setPlacedBets((prev) =>
      prev.map((b) =>
        b.id === betId
          ? { ...b, status: "cashed_out", cashOutOffer: 0, cashOutAvailable: false }
          : b
      )
    );
    return true;
  };

  const cashOutBet = (betId: string) => {
    cashOut(betId);
  };

  const resetPlaceBetState = () => setPlaceBetState("idle");
  const simulateOddsChange = () => {};

  return (
    <BetSlipContext.Provider
      value={{
        items: selections,
        selections,
        addItem,
        addSelection,
        removeItem,
        removeSelection,
        clearSlip,
        hasSelection,
        betType,
        setBetType,
        stake,
        setStake,
        addStakeAmount,
        clearStake,
        totalOdds,
        potentialWin: potentialReturn,
        potentialReturn,
        bonusMultiplier,
        betSlipTab,
        setBetSlipTab,
        placeBetState,
        isPlacing: placeBetState === "processing",
        placedTicketRef,
        placeBet,
        resetPlaceBetState,
        placedBets,
        openBets: placedBets.filter((b) => b.status === "open"),
        cashOut,
        cashOutBet,
        simulateOddsChange,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
}

export function useBetSlip() {
  const context = useContext(BetSlipContext);
  if (!context) throw new Error("useBetSlip must be used within a BetSlipProvider");
  return context;
}
