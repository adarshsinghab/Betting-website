"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Wallet, Transaction } from "@/types";
import { INITIAL_WALLET, INITIAL_TRANSACTIONS } from "@/data/mock/user";

interface CurrencyInfo {
  code: string;
  symbol: string;
}

interface BalanceInfo {
  cash: number;
  bonus: number;
}

interface WalletContextType {
  wallet: Wallet;
  balance: BalanceInfo;
  currency: CurrencyInfo;
  transactions: Transaction[];
  updateBalance: (delta: number, type?: "cash" | "bonus") => void;
  deposit: (amount: number, method: string) => Promise<boolean>;
  withdraw: (amount: number, method: string) => Promise<{ success: boolean; message: string }>;
  deductForBet: (amount: number) => boolean;
  creditWinnings: (amount: number, betId: string) => void;
  claimCashback: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<Wallet>(INITIAL_WALLET);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const currency: CurrencyInfo = {
    code: wallet.currency || "INR",
    symbol: "₹",
  };

  const balance: BalanceInfo = {
    cash: wallet.cashBalance,
    bonus: wallet.bonusBalance,
  };

  const updateBalance = (delta: number, type: "cash" | "bonus" = "cash") => {
    setWallet((prev) => ({
      ...prev,
      cashBalance: type === "cash" ? Math.max(0, prev.cashBalance + delta) : prev.cashBalance,
      bonusBalance: type === "bonus" ? Math.max(0, prev.bonusBalance + delta) : prev.bonusBalance,
    }));
  };

  const deposit = async (amount: number, method: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setWallet((prev) => ({
      ...prev,
      cashBalance: prev.cashBalance + amount,
    }));

    const newTx: Transaction = {
      id: "tx-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      type: "deposit",
      amount,
      status: "completed",
      method,
      reference: "DEP-" + Math.floor(100000 + Math.random() * 900000),
    };

    setTransactions((prev) => [newTx, ...prev]);
    return true;
  };

  const withdraw = async (
    amount: number,
    method: string
  ): Promise<{ success: boolean; message: string }> => {
    if (amount > wallet.cashBalance) {
      return { success: false, message: "Insufficient available cash balance." };
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    setWallet((prev) => ({
      ...prev,
      cashBalance: prev.cashBalance - amount,
    }));

    const newTx: Transaction = {
      id: "tx-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      type: "withdrawal",
      amount,
      status: "completed",
      method,
      reference: "WTH-" + Math.floor(100000 + Math.random() * 900000),
    };

    setTransactions((prev) => [newTx, ...prev]);
    return { success: true, message: "Withdrawal processed successfully." };
  };

  const deductForBet = (amount: number): boolean => {
    if (wallet.cashBalance < amount) return false;
    setWallet((prev) => ({
      ...prev,
      cashBalance: prev.cashBalance - amount,
    }));

    const newTx: Transaction = {
      id: "tx-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      type: "bet",
      amount: -amount,
      status: "completed",
      reference: "BET-" + Math.floor(10000 + Math.random() * 90000),
    };

    setTransactions((prev) => [newTx, ...prev]);
    return true;
  };

  const creditWinnings = (amount: number, betId: string) => {
    setWallet((prev) => ({
      ...prev,
      cashBalance: prev.cashBalance + amount,
    }));

    const newTx: Transaction = {
      id: "tx-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      type: "win",
      amount,
      status: "completed",
      reference: "WIN-" + betId,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const claimCashback = (amount: number) => {
    setWallet((prev) => ({
      ...prev,
      cashBalance: prev.cashBalance + amount,
    }));

    const newTx: Transaction = {
      id: "tx-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      type: "bonus",
      amount,
      status: "completed",
      method: "VIP Cashback",
      reference: "CB-" + Math.floor(1000 + Math.random() * 9000),
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        balance,
        currency,
        transactions,
        updateBalance,
        deposit,
        withdraw,
        deductForBet,
        creditWinnings,
        claimCashback,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within a WalletProvider");
  return context;
}
