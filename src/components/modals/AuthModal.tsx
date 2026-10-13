"use client";

import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Lock, 
  Mail,
  Zap
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

export function AuthModal() {
  const { modals, closeModal, addToast } = useUI();
  const { login, register } = useAuth();

  const isOpen = modals.auth.isOpen;
  const initialMode = modals.auth.data?.authMode || "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedBonus, setSelectedBonus] = useState<"sports" | "casino">("sports");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      const success = await login(username || "VIP_Player", password || "pass123");
      if (success) {
        addToast({ type: "success", message: `Welcome back, ${username || "VIP_Player"}!` });
        closeModal("auth");
      }
    } else {
      const success = await register(
        username || "New_Player",
        email || "player@bantu.com",
        password || "pass123",
        phone || "+91 98765 43210"
      );
      if (success) {
        addToast({
          type: "success",
          message: "Account created! 150% Welcome Bonus activated in your wallet!",
        });
        closeModal("auth");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#212631] border border-[#2E3544] shadow-2xl p-6 flex flex-col gap-5 overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => closeModal("auth")}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#282D3A] hover:bg-[#353D4E] text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Logo & Tabs */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <BrandLogo width={180} height={44} priority />

          {/* Mode Switcher */}
          <div className="w-full grid grid-cols-2 p-1 rounded-xl bg-[#1C2029] border border-[#2E3544] mt-2">
            <button
              onClick={() => setMode("login")}
              className={cn(
                "py-2 rounded-xl text-xs font-bold transition-all",
                mode === "login"
                  ? "bg-[#FEE500] text-black shadow-md"
                  : "text-white/60 hover:text-white"
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={cn(
                "py-2 rounded-xl text-xs font-bold transition-all",
                mode === "register"
                  ? "bg-[#FEE500] text-black shadow-md"
                  : "text-white/60 hover:text-white"
              )}
            >
              Join Now (Bonus)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {mode === "register" && (
            <>
              {/* Bonus Selector Cards */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBonus("sports")}
                  className={cn(
                    "p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all",
                    selectedBonus === "sports"
                      ? "bg-[#FEE500]/15 border-[#FEE500] text-white"
                      : "bg-white/[0.03] border-white/[0.06] text-white/50"
                  )}
                >
                  <span className="text-[10px] font-bold text-[#FEE500] uppercase">SPORTS BONUS</span>
                  <span className="text-xs font-black">150% UP TO ₹50,000</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBonus("casino")}
                  className={cn(
                    "p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all",
                    selectedBonus === "casino"
                      ? "bg-amber-500/15 border-amber-500 text-white"
                      : "bg-white/[0.03] border-white/[0.06] text-white/50"
                  )}
                >
                  <span className="text-[10px] font-bold text-amber-400 uppercase">CASINO BONUS</span>
                  <span className="text-xs font-black">150% + 250 SPINS</span>
                </button>
              </div>

              {/* Phone Input */}
              <div className="relative">
                <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  placeholder="Mobile Number (+91)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#12121A] border border-white/[0.1] focus:border-[#FEE500] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white outline-none"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#12121A] border border-white/[0.1] focus:border-[#FEE500] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white outline-none"
                />
              </div>
            </>
          )}

          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              placeholder={mode === "login" ? "Username or Phone Number" : "Choose Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#12121A] border border-white/[0.1] focus:border-[#FEE500] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#12121A] border border-white/[0.1] focus:border-[#FEE500] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white outline-none"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FEE500] to-[#F59E0B] text-black font-extrabold text-sm shadow-[0_0_20px_rgba(254,229,0,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 mt-1"
          >
            <span>{mode === "login" ? "LOG IN" : "REGISTER & CLAIM BONUS"}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Security badge footer */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-white/40 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL Encrypted • 18+ Responsible Gaming</span>
        </div>
      </div>
    </div>
  );
}
