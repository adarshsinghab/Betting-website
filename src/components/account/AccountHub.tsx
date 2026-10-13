"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Wallet, 
  ShieldCheck, 
  History, 
  Award, 
  ArrowUpRight, 
  ArrowDownLeft, 
  LogOut,
  Settings,
  CreditCard,
  BadgeCheck,
  Zap,
  RotateCw
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import { useUI } from "@/context/UIContext";
import { paymentProvider } from "@/lib/providers/paymentProvider";
import { NormalizedLedgerEntry } from "@/lib/providers/types";
import { cn } from "@/lib/utils";

export function AccountHub() {
  const { user, logout } = useAuth();
  const { balance, currency } = useWallet();
  const { openModal, addToast } = useUI();
  const [ledger, setLedger] = useState<NormalizedLedgerEntry[]>([]);
  const [loadingLedger, setLoadingLedger] = useState(true);

  useEffect(() => {
    paymentProvider.getLedger("usr_bantu_vip").then((entries) => {
      setLedger(entries);
      setLoadingLedger(false);
    });
  }, []);

  const handleLogout = () => {
    logout();
    addToast({ type: "info", message: "Logged out successfully" });
  };

  const refreshLedger = () => {
    setLoadingLedger(true);
    paymentProvider.getLedger("usr_bantu_vip").then((entries) => {
      setLedger(entries);
      setLoadingLedger(false);
    });
  };

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* 1. Profile Header Card */}
      <div className="glass-card rounded-2xl sm:rounded-3xl border border-white/[0.08] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-[2px] shadow-xl">
            <div className="w-full h-full rounded-[14px] bg-[#0E0E16] flex items-center justify-center text-xl font-black text-[#FEE500]">
              {user?.username?.slice(0, 2).toUpperCase() || "BB"}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">{user?.username || "Player"}</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#FEE500]/20 border border-[#FEE500]/40 text-[#FEE500] font-mono text-[10px] font-black uppercase">
                VIP TIER: {user?.vipTier || "PLATINUM"}
              </span>
            </div>
            <div className="text-xs text-white/50">{user?.email || "verified_user@bantu.com"}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-red-500/20 text-white/60 hover:text-red-400 border border-white/[0.07] hover:border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* 2. Wallet Balance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-2xl p-4 border border-white/[0.08] flex flex-col justify-between gap-3">
          <div>
            <span className="text-[11px] text-white/40 uppercase font-semibold">Real Cash Balance</span>
            <div className="text-2xl font-black font-mono text-white tabular-nums mt-0.5">
              {currency.symbol}{balance.cash.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => openModal("deposit")}
              className="py-2 rounded-xl bg-[#FEE500] text-black font-black text-xs shadow-md hover:bg-[#FEE500]/90 transition-all"
            >
              Deposit
            </button>
            <button
              onClick={() => openModal("withdraw")}
              className="py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs border border-white/[0.1] transition-all"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-white/[0.08] flex flex-col justify-between gap-3">
          <div>
            <span className="text-[11px] text-white/40 uppercase font-semibold">Bonus Betting Balance</span>
            <div className="text-2xl font-black font-mono text-[#FEE500] tabular-nums mt-0.5">
              {currency.symbol}{balance.bonus.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="text-[10px] text-white/40">Wagering Requirement: 12% Complete • 1x Turnover</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-white/[0.08] flex flex-col justify-between gap-3">
          <div>
            <span className="text-[11px] text-white/40 uppercase font-semibold">VIP Loyalty Cashback</span>
            <div className="text-2xl font-black font-mono text-emerald-400 tabular-nums mt-0.5">
              {currency.symbol}1,250.00
            </div>
          </div>
          <button
            onClick={() => addToast({ type: "success", message: "Cashback claimed to main wallet!" })}
            className="w-full py-2 rounded-xl bg-white/[0.08] hover:bg-emerald-500 hover:text-black text-white font-bold text-xs transition-all"
          >
            Claim Cashback
          </button>
        </div>
      </div>

      {/* 3. Account Settings & Verification status */}
      <div className="glass-card rounded-2xl p-5 border border-white/[0.08] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Security & KYC Verification Status</span>
          </h3>

          <button
            onClick={() => openModal("kyc")}
            className="px-3 py-1.5 rounded-xl bg-[#FEE500]/10 border border-[#FEE500]/30 text-[#FEE500] hover:bg-[#FEE500] hover:text-black transition-all text-xs font-bold flex items-center gap-1.5"
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Manage KYC & Tiers</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <span className="text-white/60">Phone Verification (OTP)</span>
            <span className="text-emerald-400 font-bold">VERIFIED</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <span className="text-white/60">PAN & Aadhaar KYC</span>
            <span className="text-emerald-400 font-bold">TIER 2 VERIFIED (₹1M Limit)</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <span className="text-white/60">Two-Factor Authentication (2FA)</span>
            <span className="text-[#FEE500] font-bold">ENABLED (TOTP)</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <span className="text-white/60">Fast Withdrawal Channel</span>
            <span className="text-emerald-400 font-bold">INSTANT UPI FASTPAY</span>
          </div>
        </div>
      </div>

      {/* 4. Auditable Financial Ledger & Transaction History */}
      <div className="glass-card rounded-2xl p-5 border border-white/[0.08] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-[#FEE500]" />
              <span>Auditable Wallet Ledger & Transaction History</span>
            </h3>
            <p className="text-xs text-white/40 mt-0.5">Immutable record of deposits, bets, wins, and withdrawals</p>
          </div>

          <button
            onClick={refreshLedger}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white transition-colors"
            title="Refresh Ledger"
          >
            <RotateCw className={cn("w-3.5 h-3.5", loadingLedger && "animate-spin text-[#FEE500]")} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase text-[10px] font-mono">
                <th className="pb-3 font-semibold">Ref ID & Date</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold text-right">Amount</th>
                <th className="pb-3 font-semibold text-right">Balance After</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {ledger.map((entry) => {
                const isCredit = entry.amount > 0;
                return (
                  <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono">
                      <div className="font-bold text-white/80">{entry.referenceId}</div>
                      <div className="text-[10px] text-white/40">{new Date(entry.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="py-3 uppercase text-[11px] font-bold">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px]",
                          entry.type === "deposit" || entry.type === "bet_win" || entry.type === "bonus"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : entry.type === "withdrawal"
                            ? "bg-sky-500/20 text-sky-400"
                            : "bg-amber-500/20 text-amber-300"
                        )}
                      >
                        {entry.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 text-white/70 max-w-xs truncate">{entry.description}</td>
                    <td className="py-3 text-right font-mono font-bold">
                      <span className={isCredit ? "text-emerald-400" : "text-white"}>
                        {isCredit ? `+₹${entry.amount.toLocaleString()}` : `-₹${Math.abs(entry.amount).toLocaleString()}`}
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono text-white/60">
                      ₹{entry.balanceAfter.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold",
                          entry.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        )}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
