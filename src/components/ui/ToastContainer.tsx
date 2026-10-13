"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from "lucide-react";
import { useUI } from "@/context/UIContext";

export function ToastContainer() {
  const { toasts, removeToast } = useUI();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-3.5 rounded-xl border shadow-2xl flex items-start gap-3 backdrop-blur-md animate-in slide-in-from-right duration-200 ${
            t.type === "success"
              ? "bg-[#112218]/95 border-bb-success/50 text-white"
              : t.type === "error"
              ? "bg-[#221111]/95 border-bb-danger/50 text-white"
              : t.type === "gold"
              ? "bg-[#1F1A10]/95 border-bb-gold/60 text-white"
              : "bg-[#141418]/95 border-bb-border-strong text-white"
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {t.type === "success" && <CheckCircle2 className="w-4 h-4 text-bb-success" />}
            {t.type === "error" && <AlertCircle className="w-4 h-4 text-bb-danger" />}
            {t.type === "gold" && <Sparkles className="w-4 h-4 text-bb-gold-bright" />}
            {t.type === "info" && <Info className="w-4 h-4 text-bb-silver" />}
          </div>

          <div className="flex-1 text-xs">
            <p className="font-extrabold">{t.title}</p>
            <p className="text-[11px] text-bb-silver-muted mt-0.5">{t.message}</p>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="text-bb-text-muted hover:text-white p-0.5 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
