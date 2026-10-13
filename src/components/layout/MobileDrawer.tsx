"use client";

import React from "react";
import { 
  X, 
  Gift, 
  ShieldCheck, 
  User, 
  LogOut,
  ChevronRight,
  Headphones,
  Sun,
  Moon
} from "lucide-react";
import { SportIcon } from "@/components/ui/SportIcon";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ProductTab } from "@/types";
import { cn } from "@/lib/utils";

export function MobileDrawer() {
  const { isMobileDrawerOpen, closeMobileDrawer, activeTab, setActiveTab, openModal, theme, toggleTheme } = useUI();
  const { user, isAuthenticated, logout } = useAuth();
  const { currency, balance } = useWallet();

  if (!isMobileDrawerOpen) return null;

  const handleNav = (tab: ProductTab) => {
    setActiveTab(tab);
    closeMobileDrawer();
  };

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div onClick={closeMobileDrawer} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      {/* Drawer Body */}
      <div className="relative w-4/5 max-w-xs h-full bg-[#1C2029] border-r border-[#2E3544] shadow-2xl p-4 flex flex-col justify-between overflow-y-auto custom-scrollbar z-10">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <BrandLogo width={140} height={40} priority />
            <button
              onClick={closeMobileDrawer}
              className="p-1.5 rounded-xl bg-white/[0.05] text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Section */}
          {isAuthenticated ? (
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-white">{user?.username}</div>
                <div className="font-mono text-xs font-bold text-[#FEE500] mt-0.5">
                  {currency.symbol}{balance.cash.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
              </div>
              <button
                onClick={() => {
                  closeMobileDrawer();
                  openModal("deposit");
                }}
                className="px-3 py-1.5 rounded-xl bg-[#FEE500] text-black font-extrabold text-xs shadow-md"
              >
                Deposit
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  closeMobileDrawer();
                  openModal("auth", { authMode: "login" });
                }}
                className="py-2 rounded-xl bg-white/[0.05] text-xs font-bold text-white text-center"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  closeMobileDrawer();
                  openModal("auth", { authMode: "register" });
                }}
                className="py-2 rounded-xl bg-[#FEE500] text-black text-xs font-black text-center shadow-md"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Nav Items */}
          <div className="flex flex-col gap-1 text-xs">
            {[
              { id: "sports", label: "Sportsbook", sportIcon: "trophy" },
              { id: "live", label: "Live In-Play", sportIcon: "live", isLive: true },
              { id: "casino", label: "Casino Slots", sportIcon: "slot-machine" },
              { id: "live-casino", label: "Live Dealers 4K", sportIcon: "casino", tag: "NEW" },
              { id: "instant-games", label: "Instant & Crash", sportIcon: "bolt", tag: "HOT" },
              { id: "virtuals", label: "Virtual Sports", sportIcon: "football" },
              { id: "predictions", label: "Predictions", sportIcon: "esports" },
              { id: "promotions", label: "Promotions", icon: Gift, tag: "₹100K" },
              { id: "admin", label: "Backoffice Admin", icon: ShieldCheck, tag: "OPS" },
              { id: "account", label: "My Account & KYC", icon: User },
            ].map((item) => {
              const Icon = (item as any).icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id as ProductTab)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold",
                    isActive
                      ? "bg-[#FEE500] text-black font-bold shadow-md"
                      : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    {item.sportIcon ? (
                      <SportIcon
                        name={item.sportIcon}
                        size={16}
                        className={cn(isActive ? "text-black" : "text-[#FEE500]")}
                      />
                    ) : Icon ? (
                      <Icon className="w-4 h-4" />
                    ) : null}
                    <span>{item.label}</span>
                  </div>
                  {item.tag && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-black bg-amber-500/20 text-amber-300">
                      {item.tag}
                    </span>
                  )}
                  {item.isLive && (
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme Switcher in Mobile Drawer */}
        <div className="pt-3 pb-1 border-t border-white/[0.06]">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-bold text-white transition-all"
          >
            <div className="flex items-center gap-2">
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#FEE500]" />
              ) : (
                <Moon className="w-4 h-4 text-amber-500" />
              )}
              <span>Theme Mode</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.08] text-white/70 uppercase">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06] text-xs">
          <button
            onClick={() => {
              closeMobileDrawer();
              openModal("responsibleGaming");
            }}
            className="flex items-center gap-2 text-white/50 hover:text-white py-1"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Responsible Gaming (18+)</span>
          </button>

          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                closeMobileDrawer();
              }}
              className="flex items-center gap-2 text-red-400/80 hover:text-red-400 py-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
