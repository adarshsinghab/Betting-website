"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Check,
  X,
  Lock,
  Unlock,
  AlertTriangle,
  Server,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

interface PendingWithdrawal {
  id: string;
  user: string;
  amount: number;
  method: string;
  account: string;
  riskScore: "LOW" | "MED" | "HIGH";
  requestedAt: string;
}

const INITIAL_WITHDRAWALS: PendingWithdrawal[] = [
  {
    id: "WTH-2026-9102",
    user: "usr_bantu_vip (Aarav S.)",
    amount: 25000,
    method: "UPI FastPay",
    account: "aarav.sharma@okhdfcbank",
    riskScore: "LOW",
    requestedAt: "4 mins ago",
  },
  {
    id: "WTH-2026-9103",
    user: "usr_rahul_99",
    amount: 50000,
    method: "Bank IMPS",
    account: "HDFC A/C: 502000847291",
    riskScore: "LOW",
    requestedAt: "12 mins ago",
  },
  {
    id: "WTH-2026-9104",
    user: "usr_crypto_whale",
    amount: 150000,
    method: "USDT TRC-20",
    account: "TJn8...K8tN",
    riskScore: "MED",
    requestedAt: "28 mins ago",
  },
];

export function AdminDashboard() {
  const { addToast } = useUI();
  const [withdrawals, setWithdrawals] = useState<PendingWithdrawal[]>(INITIAL_WITHDRAWALS);
  const [marketSuspended, setMarketSuspended] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "withdrawals" | "fixtures" | "health">("overview");

  const handleApproveWithdrawal = (id: string, amount: number) => {
    setWithdrawals((prev) => prev.filter((w) => w.id !== id));
    addToast({
      type: "success",
      message: `Withdrawal ${id} (₹${amount.toLocaleString()}) approved and IMPS payout webhook fired.`,
    });
  };

  const handleRejectWithdrawal = (id: string) => {
    setWithdrawals((prev) => prev.filter((w) => w.id !== id));
    addToast({
      type: "info",
      message: `Withdrawal ${id} rejected and funds refunded to user wallet.`,
    });
  };

  const toggleMarketSuspension = () => {
    setMarketSuspended((prev) => !prev);
    addToast({
      type: marketSuspended ? "success" : "error",
      message: marketSuspended
        ? "All sports markets reopened for real-time betting."
        : "Emergency Market Suspension activated across all in-play fixtures.",
    });
  };

  return (
    <div className="flex flex-col gap-6 py-3 select-none">
      {/* 1. Admin Top Banner */}
      <div className="relative rounded-3xl glass-card border border-rose-500/30 overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-rose-950/40 via-[#120B0E] to-black shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>OPERATOR BACKOFFICE & RISK ENGINE</span>
              </span>
              <span className="text-xs text-white/50 font-mono">Role: Super Admin (CTO)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Betting Bantu Platform Command Center
            </h2>
          </div>

          {/* Emergency Kill Switch */}
          <button
            onClick={toggleMarketSuspension}
            className={cn(
              "px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 transition-all shadow-xl",
              marketSuspended
                ? "bg-emerald-500 text-black shadow-emerald-500/20"
                : "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
            )}
          >
            {marketSuspended ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{marketSuspended ? "RE-OPEN ALL MARKETS" : "EMERGENCY SUSPEND MARKETS"}</span>
          </button>
        </div>
      </div>

      {/* 2. Executive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Gross Gaming Revenue (GGR)",
            value: "₹48,240,000",
            trend: "+14.2% MoM",
            isUp: true,
            icon: DollarSign,
          },
          {
            label: "24h Platform Turnover",
            value: "₹312,500,000",
            trend: "+8.9% 24h",
            isUp: true,
            icon: TrendingUp,
          },
          {
            label: "Active Concurrent Players",
            value: "14,892",
            trend: "94% verified",
            isUp: true,
            icon: Users,
          },
          {
            label: "Bookmaker Margin",
            value: "7.84%",
            trend: "Target 7.50%",
            isUp: true,
            icon: Activity,
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl sm:rounded-3xl border border-white/[0.08] p-5 flex flex-col justify-between gap-3 bg-[#0B0C12]"
          >
            <div className="flex items-center justify-between text-white/50">
              <span className="text-[11px] font-semibold uppercase tracking-wider">{kpi.label}</span>
              <div className="w-7 h-7 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/80">
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white">{kpi.value}</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{kpi.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Pending Withdrawals" },
          { id: "fixtures", label: "Odds & Margin Controls" },
          { id: "health", label: "Provider SLA & Health" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === tab.id
                ? "bg-[#FEE500] text-black shadow-md"
                : "text-white/60 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Tab Body: Pending Withdrawals Queue */}
      {activeTab === "overview" && (
        <div className="glass-card rounded-3xl border border-white/[0.08] p-5 flex flex-col gap-4 bg-[#0A0B10]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Pending High-Value Withdrawal Approvals ({withdrawals.length})
              </h3>
              <p className="text-xs text-white/50">
                Idempotent auto-settlement queue with AML risk scoring.
              </p>
            </div>
            <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-time Ledger Sync Active</span>
            </div>
          </div>

          {withdrawals.length === 0 ? (
            <div className="p-8 text-center text-white/40 text-xs">
              All withdrawal requests have been settled. Queue is clear.
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {withdrawals.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#FEE500]">{item.id}</span>
                      <span className="text-xs font-bold text-white">{item.user}</span>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold",
                          item.riskScore === "LOW"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        )}
                      >
                        Risk: {item.riskScore}
                      </span>
                    </div>
                    <div className="text-xs text-white/50">
                      {item.method} • <span className="font-mono text-white/70">{item.account}</span> • {item.requestedAt}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-base font-mono font-black text-white">
                      ₹{item.amount.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleApproveWithdrawal(item.id, item.amount)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1 shadow-md transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleRejectWithdrawal(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1 border border-rose-500/30 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. Tab Body: Provider SLA & Health */}
      {activeTab === "health" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: "Sportradar Realtime Feed",
              type: "Sports / In-play Odds",
              latency: "38ms",
              status: "Operational",
              uptime: "99.99%",
            },
            {
              name: "Pragmatic Play RGS Engine",
              type: "Slots & HTML5 Demos",
              latency: "62ms",
              status: "Operational",
              uptime: "99.95%",
            },
            {
              name: "Spribe Aviator Microservice",
              type: "Crash & Instant Games",
              latency: "22ms",
              status: "Operational",
              uptime: "100.0%",
            },
            {
              name: "Evolution Gaming Stream",
              type: "Live Dealers Ultra-HD",
              latency: "74ms",
              status: "Operational",
              uptime: "99.92%",
            },
            {
              name: "Razorpay / Cashfree UPI Gateway",
              type: "Instant Payments",
              latency: "140ms",
              status: "Operational",
              uptime: "99.98%",
            },
            {
              name: "Redis High-Throughput Cache",
              type: "In-memory Odds Buffer",
              latency: "2ms",
              status: "Operational",
              uptime: "100.0%",
            },
          ].map((srv, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl border border-white/[0.08] p-4 flex flex-col justify-between gap-3 bg-[#0B0C12]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-xs text-white">{srv.name}</h4>
                  <div className="text-[11px] text-white/40">{srv.type}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  {srv.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.06] text-white/60">
                <span>Latency: <strong className="font-mono text-white">{srv.latency}</strong></span>
                <span>Uptime: <strong className="font-mono text-[#FEE500]">{srv.uptime}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Tab Body: Fixtures & Odds Margins */}
      {activeTab === "fixtures" && (
        <div className="glass-card rounded-3xl border border-white/[0.08] p-5 flex flex-col gap-4 bg-[#0A0B10]">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Risk & Margin Multipliers by Sport
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { sport: "Cricket IPL", currentMargin: "5.5%", riskLevel: "Normal" },
              { sport: "Football Premier League", currentMargin: "4.8%", riskLevel: "Low" },
              { sport: "Tennis Grand Slams", currentMargin: "6.2%", riskLevel: "Normal" },
              { sport: "Basketball NBA", currentMargin: "5.0%", riskLevel: "Low" },
              { sport: "Esports CS2 & Valorant", currentMargin: "7.5%", riskLevel: "High" },
              { sport: "Virtual Sports", currentMargin: "8.5%", riskLevel: "Automated" },
            ].map((f, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{f.sport}</div>
                  <div className="text-[10px] text-white/40">Risk: {f.riskLevel}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-[#FEE500]">{f.currentMargin}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">Active</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
