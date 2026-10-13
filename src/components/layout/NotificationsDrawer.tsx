"use client";

import React, { useState } from "react";
import {
  X,
  Bell,
  CheckCircle2,
  Trophy,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  type: "win" | "deposit" | "withdraw" | "promo" | "match";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "win",
    title: "Bet Won! +₹4,725.00",
    message: "Your single bet on Mumbai Indians vs CSK (Match Winner) has been settled as WON.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: "notif-2",
    type: "deposit",
    title: "Deposit Confirmed: ₹15,000.00",
    message: "UPI FastPay transfer credited successfully to your Main Balance.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "notif-3",
    type: "promo",
    title: "VIP Royalty Cashback: ₹1,000.00",
    message: "Weekly VIP Tier-2 turnover cashback has been credited to your wallet with 1x wagering.",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "notif-4",
    type: "match",
    title: "Live Kickoff: Arsenal vs Chelsea",
    message: "The Premier League showdown has commenced. In-play pitch radar and live odds are now active.",
    time: "Yesterday",
    read: true,
  },
];

export function NotificationsDrawer() {
  const { modals, closeModal } = useUI();
  const isOpen = modals.notifications?.isOpen;

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full bg-[#0A0B10] border-l border-white/[0.1] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0E0F16]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FEE500]/10 text-[#FEE500] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white flex items-center gap-2">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#FEE500] text-black font-mono font-bold text-[10px]">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-white/40">Real-time alerts & settlements</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-[11px] text-[#FEE500] hover:underline font-semibold"
              >
                Mark read
              </button>
            )}
            <button
              onClick={() => closeModal("notifications")}
              className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center gap-3 my-auto">
              <Bell className="w-10 h-10 text-white/20" />
              <div className="text-white/60 text-sm font-semibold">No notifications right now</div>
              <div className="text-white/30 text-xs max-w-xs">
                When you place bets, win rounds, or deposit, real-time alerts will appear here.
              </div>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all flex items-start gap-3",
                  notif.read
                    ? "bg-white/[0.02] border-white/[0.05] text-white/70"
                    : "bg-white/[0.05] border-[#FEE500]/30 text-white shadow-md"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold",
                    notif.type === "win"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : notif.type === "deposit"
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                      : notif.type === "promo"
                      ? "bg-[#FEE500]/20 text-[#FEE500] border border-[#FEE500]/30"
                      : "bg-white/[0.06] text-white/70 border border-white/[0.1]"
                  )}
                >
                  {notif.type === "win" ? (
                    <Trophy className="w-4 h-4" />
                  ) : notif.type === "deposit" ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : notif.type === "promo" ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-xs text-white truncate">{notif.title}</span>
                    <span className="text-[10px] text-white/40 shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-white/[0.08] bg-[#0E0F16] flex items-center justify-between">
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear history</span>
            </button>

            <span className="text-[11px] text-white/40">WebSocket Live Connected</span>
          </div>
        )}
      </div>
    </div>
  );
}
