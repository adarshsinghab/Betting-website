"use client";

import React, { useState } from "react";
import {
  X,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  Zap,
  Clock,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useUI } from "@/context/UIContext";
import { useWallet } from "@/context/WalletContext";
import { paymentProvider } from "@/lib/providers/paymentProvider";
import { cn } from "@/lib/utils";

export function WithdrawModal() {
  const { modals, closeModal, addToast } = useUI();
  const { balance, updateBalance, currency } = useWallet();
  const isOpen = modals.withdraw.isOpen;

  const [method, setMethod] = useState<"upi" | "bank" | "usdt">("upi");
  const [amount, setAmount] = useState<number>(2000);
  const [vpa, setVpa] = useState("aarav.sharma@okhdfcbank");
  const [accountNumber, setAccountNumber] = useState("50100293819283");
  const [ifsc, setIfsc] = useState("HDFC0001890");
  const [accountName, setAccountName] = useState("Aarav Sharma");
  const [usdtAddress, setUsdtAddress] = useState("TJn8XkGvB9X7sLmQ32zFwYr1A6e4PqK8tN");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successTicket, setSuccessTicket] = useState<{ id: string; arrival: string } | null>(null);

  if (!isOpen) return null;

  const withdrawableCash = balance.cash;
  const quickAmounts = [1000, 2500, 5000, 10000, withdrawableCash];

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount < 500) {
      addToast({ type: "error", message: "Minimum withdrawal amount is ₹500" });
      return;
    }

    if (amount > withdrawableCash) {
      addToast({
        type: "error",
        message: `Requested ₹${amount.toLocaleString()} exceeds available cash ₹${withdrawableCash.toLocaleString()}`,
      });
      return;
    }

    setIsProcessing(true);

    try {
      const details: Record<string, string> =
        method === "upi"
          ? { vpa, name: accountName }
          : method === "bank"
          ? { accountNumber, ifsc, accountName }
          : { usdtAddress };

      const res = await paymentProvider.requestWithdrawal(method, amount, details);

      // Deduct from local wallet state
      updateBalance(-amount, "cash");

      setIsProcessing(false);
      setSuccessTicket({ id: res.withdrawalId, arrival: res.estimatedArrival });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FEE500", "#10B981", "#FFFFFF"],
      });

      addToast({
        type: "success",
        message: `Withdrawal request for ${currency.symbol}${amount.toLocaleString()} queued for automatic settlement.`,
      });
    } catch (err: any) {
      setIsProcessing(false);
      addToast({ type: "error", message: err.message || "Withdrawal request failed" });
    }
  };

  const handleClose = () => {
    setSuccessTicket(null);
    closeModal("withdraw");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-[#14161E] border border-[#242834] shadow-2xl p-5 sm:p-6 flex flex-col gap-4 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#1E212B] hover:bg-[#282D3A] text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FEE500] animate-ping" />
            <h2 className="text-lg font-black text-white">Instant Withdrawal</h2>
          </div>
          <p className="text-xs text-white/50 mt-0.5">
            Auditable payout ledger with 24/7 automated IMPS and UPI dispatch.
          </p>
        </div>

        {/* Balance Overview Card */}
        <div className="p-3 rounded-xl bg-[#181A22] border border-[#242834] flex items-center justify-between">
          <div>
            <div className="text-[10.5px] text-white/40 uppercase font-semibold">Withdrawable Cash</div>
            <div className="text-lg font-black font-mono text-[#FEE500] mt-0.5">
              {currency.symbol}{withdrawableCash.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10.5px] text-white/40 uppercase font-semibold">Locked Bonus</div>
            <div className="text-xs font-mono font-bold text-white/60 mt-0.5">
              {currency.symbol}{balance.bonus.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {successTicket ? (
          /* Payout Confirmation Screen */
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Payout Dispatched</h3>
              <p className="text-xs text-white/60 mt-1">
                Ref ID: <span className="font-mono text-emerald-300">{successTicket.id}</span>
              </p>
              <p className="text-xs text-white/50 mt-0.5">Estimated arrival: {successTicket.arrival}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl bg-[#FEE500] text-black font-extrabold text-xs shadow-lg hover:bg-[#FEE500]/90 transition-colors mt-2"
            >
              Done & Return to Lobby
            </button>
          </div>
        ) : (
          <form onSubmit={handleWithdraw} className="flex flex-col gap-4">
            {/* Method Switcher */}
            <div className="flex items-center p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setMethod("upi")}
                className={cn(
                  "flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                  method === "upi" ? "bg-[#FEE500] text-black shadow-md" : "text-white/60 hover:text-white"
                )}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>UPI FastPay</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod("bank")}
                className={cn(
                  "flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                  method === "bank" ? "bg-[#FEE500] text-black shadow-md" : "text-white/60 hover:text-white"
                )}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank IMPS</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod("usdt")}
                className={cn(
                  "flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                  method === "usdt" ? "bg-[#FEE500] text-black shadow-md" : "text-white/60 hover:text-white"
                )}
              >
                <span>USDT TRC20</span>
              </button>
            </div>

            {/* Form Fields */}
            {method === "upi" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/60">UPI ID / VPA</label>
                <input
                  type="text"
                  required
                  value={vpa}
                  onChange={(e) => setVpa(e.target.value)}
                  placeholder="e.g. yourname@oksbi"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FEE500]/50"
                />
              </div>
            )}

            {method === "bank" && (
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-xs font-semibold text-white/60">Account Holder Name</label>
                  <input
                    type="text"
                    required
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FEE500]/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/60">Account Number</label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FEE500]/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/60">IFSC Code</label>
                  <input
                    type="text"
                    required
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-[#FEE500]/50"
                  />
                </div>
              </div>
            )}

            {method === "usdt" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/60">Tether USDT TRC-20 Address</label>
                <input
                  type="text"
                  required
                  value={usdtAddress}
                  onChange={(e) => setUsdtAddress(e.target.value)}
                  placeholder="T..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FEE500]/50"
                />
              </div>
            )}

            {/* Amount Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white/60">Withdrawal Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-mono text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  min={500}
                  max={withdrawableCash}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-8 pr-3 py-2 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#FEE500]/50"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {quickAmounts.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAmount(Math.min(q, withdrawableCash))}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[11px] font-mono text-white/70 hover:text-white shrink-0"
                  >
                    {idx === quickAmounts.length - 1 ? "Max Cash" : `₹${q.toLocaleString()}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-[11px] text-white/40">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>0% Commission • VIP Fast-Track</span>
              </div>
              <span>Daily Limit: ₹500,000</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || withdrawableCash < 500}
              className="w-full py-3 rounded-2xl bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-extrabold text-sm shadow-xl shadow-[#FEE500]/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Submitting Ledger Request...</span>
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Withdraw {currency.symbol}{amount.toLocaleString()}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
