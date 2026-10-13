"use client";

import React, { useState } from "react";
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  CreditCard, 
  Zap, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import confetti from "canvas-confetti";
import { useUI } from "@/context/UIContext";
import { useWallet } from "@/context/WalletContext";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS = [
  { id: "upi", name: "Instant UPI / QR", fee: "0%", time: "Instant (10s)", tag: "POPULAR" },
  { id: "phonepe", name: "PhonePe / GPay", fee: "0%", time: "Instant", tag: "FAST" },
  { id: "paytm", name: "Paytm Wallet", fee: "0%", time: "Instant" },
  { id: "crypto", name: "Crypto (USDT / BTC)", fee: "0%", time: "2-5 mins", tag: "+5% BONUS" },
  { id: "netbanking", name: "IMPS / NetBanking", fee: "0%", time: "Instant" },
];

export function DepositModal() {
  const { modals, closeModal, addToast } = useUI();
  const { currency, deposit } = useWallet();
  const isOpen = modals.deposit.isOpen;

  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [amount, setAmount] = useState(1000);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const handleDeposit = async () => {
    if (amount < 100) {
      addToast({ type: "error", message: "Minimum deposit is ₹100" });
      return;
    }

    setIsProcessing(true);
    // Simulate UPI processing
    setTimeout(async () => {
      const success = await deposit(amount, selectedMethod);
      setIsProcessing(false);
      if (success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#FEE500", "#10B981", "#FFFFFF"],
        });
        addToast({
          type: "success",
          message: `Successfully deposited ${currency.symbol}${amount.toLocaleString()} into your wallet!`,
        });
        closeModal("deposit");
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-[#212631] border border-[#2E3544] shadow-2xl p-5 sm:p-6 flex flex-col gap-4 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => closeModal("deposit")}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#282D3A] hover:bg-[#353D4E] text-white/60 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-lg font-black text-white">Deposit Funds</h2>
          </div>
          <p className="text-xs text-white/50 mt-0.5">
            Instant credit with 0% fee. Choose your preferred method.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {PAYMENT_METHODS.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setSelectedMethod(pm.id)}
              className={cn(
                "p-2.5 rounded-xl border text-left flex flex-col justify-between gap-1.5 transition-colors",
                selectedMethod === pm.id
                  ? "bg-[#2F3646] border-[#FEE500] text-white"
                  : "bg-[#282D3A] border-[#343C4D] text-white/70 hover:text-white hover:bg-[#303746]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">{pm.name}</span>
                {pm.tag && (
                  <span className="text-[8.5px] px-1.5 py-0.2 rounded font-extrabold bg-[#FEE500] text-black">
                    {pm.tag}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">{pm.time}</span>
            </button>
          ))}
        </div>

        {/* Deposit Amount Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-white/70">Enter Amount ({currency.symbol})</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-white/50 font-bold text-sm">
              {currency.symbol}
            </span>
            <input
              type="number"
              min="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-[#181A22] border border-[#242834] focus:border-[#FEE500] rounded-lg pl-8 pr-3 py-2 font-mono font-bold text-white text-sm outline-none"
            />
          </div>

          {/* Quick Amount Chips */}
          <div className="grid grid-cols-5 gap-1.5 pt-0.5">
            {quickAmounts.map((q) => (
              <button
                key={q}
                onClick={() => setAmount(q)}
                className={cn(
                  "py-1 rounded-lg font-mono text-xs font-semibold transition-colors",
                  amount === q
                    ? "bg-[#FEE500] text-black font-bold"
                    : "bg-[#1E212B] text-white/70 hover:text-white"
                )}
              >
                +{q}
              </button>
            ))}
          </div>
        </div>

        {/* Simulated UPI QR Preview */}
        {selectedMethod === "upi" && (
          <div className="p-2.5 rounded-xl bg-[#0F1116] border border-[#20232A] flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
              <QrCode className="w-10 h-10 text-black" />
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-white">Scan & Pay via Any UPI App</span>
              <span className="text-white/40 text-[10.5px]">Google Pay, PhonePe, Paytm, BHIM</span>
              <span className="text-emerald-400 text-[10px] font-mono mt-0.5">VPA: bantu.pay@yesbank</span>
            </div>
          </div>
        )}

        {/* Action CTA */}
        <button
          disabled={isProcessing || amount < 100}
          onClick={handleDeposit}
          className="w-full py-3 rounded-lg bg-[#FEE500] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <span>Authorizing Payment...</span>
          ) : (
            <>
              <span>PAY {currency.symbol}{amount.toLocaleString()}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] text-white/40">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Protected by NPCI Certified Payment Gateway</span>
        </div>
      </div>
    </div>
  );
}
