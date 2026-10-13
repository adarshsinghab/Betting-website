"use client";

import React from "react";
import { MainHeader } from "@/components/layout/MainHeader";
import { SportsSubNav } from "@/components/layout/SportsSubNav";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { BetSlipPanel } from "@/components/betslip/BetSlipPanel";
import { MobileFloatingBetBar } from "@/components/betslip/MobileFloatingBetBar";
import { SportsHome } from "@/components/sportsbook/SportsHome";
import { LiveHub } from "@/components/live/LiveHub";
import { CasinoHub } from "@/components/casino/CasinoHub";
import { LiveCasinoLobby } from "@/components/casino/LiveCasinoLobby";
import { InstantGamesHub } from "@/components/casino/InstantGamesHub";
import { VirtualSportsHub } from "@/components/virtuals/VirtualSportsHub";
import { PredictionsHub } from "@/components/predictions/PredictionsHub";
import { EsportsHub } from "@/components/esports/EsportsHub";
import { PromotionsHub } from "@/components/promotions/PromotionsHub";
import { AccountHub } from "@/components/account/AccountHub";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { useUI } from "@/context/UIContext";

export default function Home() {
  const { activeTab } = useUI();
  const isSportsView = activeTab === "sports" || activeTab === "live";

  return (
    <div className="h-screen w-full bg-[#171A21] text-[#F3F4F6] flex flex-col overflow-hidden selection:bg-[#FEE500] selection:text-black">
      {/* 1. Fixed Top Header & Sports Sub-Nav */}
      <div className="shrink-0 z-40 w-full flex flex-col shadow-sm">
        <MainHeader />
        <SportsSubNav />
      </div>

      {/* 2. Independent 3-Column Viewport Shell (Zero Parent Drag) */}
      <main className="flex-1 min-h-0 w-full max-w-[1680px] mx-auto px-2 sm:px-4 flex gap-4 overflow-hidden pt-2">
        {/* Left Column: Fixed Navigation Directory (Desktop 1280px+) */}
        {isSportsView && (
          <div className="hidden xl:block shrink-0 w-56 h-full overflow-y-auto custom-scrollbar pb-6">
            <LeftSidebar />
          </div>
        )}

        {/* Center Column: The ONLY independently scrolling content feed */}
        <section className="flex-1 h-full overflow-y-auto custom-scrollbar px-1 pb-20 lg:pb-8 flex flex-col justify-between">
          <div className="flex-1 flex flex-col gap-3">
            {activeTab === "sports" && <SportsHome />}
            {activeTab === "live" && <LiveHub />}
            {activeTab === "casino" && <CasinoHub />}
            {activeTab === "live-casino" && <LiveCasinoLobby />}
            {activeTab === "instant-games" && <InstantGamesHub />}
            {activeTab === "virtuals" && <VirtualSportsHub />}
            {activeTab === "predictions" && <PredictionsHub />}
            {activeTab === "esports" && <EsportsHub />}
            {activeTab === "promotions" && <PromotionsHub />}
            {activeTab === "account" && <AccountHub />}
            {activeTab === "admin" && <AdminDashboard />}
          </div>

          {/* Footer at end of center feed */}
          <div className="pt-8">
            <Footer />
          </div>
        </section>

        {/* Right Column: Bet Slip (Desktop 1024px+) - 100% Fixed & Anchored */}
        {isSportsView && (
          <div className="hidden lg:block shrink-0 w-72 xl:w-80 h-full flex flex-col pb-6">
            <BetSlipPanel />
          </div>
        )}
      </main>

      {/* 3. Mobile Persistent Floating Bet Action Bar (Thumb Zone Ergonomics) */}
      <MobileFloatingBetBar />

      {/* 4. Mobile Bottom App Bar */}
      <MobileNav />
    </div>
  );
}
