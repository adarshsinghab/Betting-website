"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Bell, 
  Plus, 
  Menu,
  ChevronDown,
  User,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import { cn } from "@/lib/utils";
import { ProductTab } from "@/types";

interface NavItem {
  id: ProductTab;
  label: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "sports", label: "Sports" },
  { id: "live", label: "Live In-Play" },
  { id: "casino", label: "Casino" },
  { id: "live-casino", label: "Live Casino" },
  { id: "instant-games", label: "Aviator & Crash" },
  { id: "promotions", label: "Promotions", badge: "BONUS" },
];

export function MainHeader() {
  const { activeTab, setActiveTab, openModal, toggleMobileDrawer } = useUI();
  const { user, isAuthenticated } = useAuth();
  const { balance, currency } = useWallet();
  const [isMounted, setIsMounted] = useState(false);
  const [oddsFormat, setOddsFormat] = useState<"decimal" | "fractional" | "american">("decimal");
  const [showOddsDropdown, setShowOddsDropdown] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="w-full bg-[#1C2029] border-b border-[#2E3544] px-3 sm:px-6 h-[54px] sm:h-[58px] flex items-center justify-between gap-3 select-none sticky top-0 z-40">
      {/* Left: Mobile Hamburger + Brand Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={toggleMobileDrawer}
          className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors active:scale-95"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        <div 
          onClick={() => setActiveTab("sports")} 
          className="cursor-pointer flex items-center py-1"
        >
          <BrandLogo 
            priority 
            className="h-8 sm:h-9" 
            width={160} 
            height={38} 
          />
        </div>
      </div>

      {/* Center: Desktop Navigation Items (PariMatch Style) */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "relative px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all",
                isActive
                  ? "bg-[#FEE500] text-[#111317] shadow-sm font-extrabold"
                  : "text-white/80 hover:text-white hover:bg-[#252A36]"
              )}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "ml-1.5 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold leading-none inline-block",
                    isActive ? "bg-black text-[#FEE500]" : "bg-[#FEE500]/20 text-[#FEE500]"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Search, Odds Selector, Balance & Deposit */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search button */}
        <button
          onClick={() => openModal("search")}
          className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-[#252A36] hover:bg-[#2C3342] border border-[#32394A] text-white/70 hover:text-white text-xs transition-colors flex items-center gap-2"
          title="Search matches or games"
        >
          <Search className="w-4 h-4 text-white/70" />
          <span className="hidden xl:inline text-white/50 text-xs">Search</span>
        </button>

        {/* Odds Format Selector (Desktop) */}
        <div className="relative hidden xl:block">
          <button
            onClick={() => setShowOddsDropdown(!showOddsDropdown)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#252A36] border border-[#32394A] text-white/80 text-xs hover:text-white transition-colors"
          >
            <span className="text-white/40">Odds:</span>
            <span className="font-semibold capitalize text-white">{oddsFormat}</span>
            <ChevronDown className="w-3 h-3 text-white/40 ml-0.5" />
          </button>

          {showOddsDropdown && (
            <div className="absolute right-0 top-full mt-1.5 w-32 rounded-lg bg-[#212631] border border-[#2E3544] shadow-2xl py-1 z-50 flex flex-col">
              {(["decimal", "fractional", "american"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    setOddsFormat(fmt);
                    setShowOddsDropdown(false);
                  }}
                  className="px-3 py-1.5 text-left text-xs text-white/80 hover:bg-[#2A303D] hover:text-[#FEE500] transition-colors capitalize flex items-center justify-between"
                >
                  <span>{fmt}</span>
                  {oddsFormat === fmt && <span className="w-1.5 h-1.5 rounded-full bg-[#FEE500]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Wallet Balance + Solid PariMatch Yellow Deposit Button */}
        {isMounted && isAuthenticated ? (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex flex-col items-end leading-none px-2 sm:px-2.5 py-1 rounded-lg bg-[#212631] border border-[#2E3544]">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold hidden sm:block">
                BALANCE
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono tabular-nums">
                {currency.symbol}{balance.cash.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
              </span>
            </div>

            {/* Signature Solid Yellow Deposit Button */}
            <button
              onClick={() => openModal("deposit")}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#FEE500] hover:bg-[#FFF033] text-[#111317] font-black text-xs active:scale-95 transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>DEPOSIT</span>
            </button>

            {/* User Profile */}
            <button
              onClick={() => setActiveTab("account")}
              className="w-8 h-8 rounded-lg bg-[#252A36] border border-[#32394A] flex items-center justify-center text-xs font-bold text-white hover:border-[#FEE500] transition-colors ml-0.5"
              title="Account Menu"
            >
              <User className="w-4 h-4 text-white/80" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal("auth", { authMode: "login" })}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => openModal("auth", { authMode: "register" })}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#FEE500] hover:bg-[#FFF033] text-[#111317] font-black text-xs active:scale-95 transition-all"
            >
              JOIN NOW
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
