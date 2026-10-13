"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  BadgeCheck,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useUI } from "@/context/UIContext";
import { kycProvider } from "@/lib/providers/kycProvider";
import { cn } from "@/lib/utils";

export function KycVerificationModal() {
  const { modals, closeModal, addToast } = useUI();
  const isOpen = modals.kyc.isOpen;

  const [docType, setDocType] = useState<"aadhaar" | "pan" | "passport">("aadhaar");
  const [docNumber, setDocNumber] = useState("4920 8920 1928");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      await kycProvider.submitDocument("usr_bantu_vip", {
        type: docType,
        documentNumber: docNumber,
        frontImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      });

      setIsVerifying(false);
      setVerifiedSuccess(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10B981", "#FEE500", "#FFFFFF"],
      });

      addToast({
        type: "success",
        message: "Identity verified! Account upgraded to Tier 2 with ₹1,000,000 daily limit.",
      });
    } catch (err: any) {
      setIsVerifying(false);
      addToast({ type: "error", message: err.message || "Verification failed" });
    }
  };

  const handleClose = () => {
    setVerifiedSuccess(false);
    setFileUploaded(false);
    closeModal("kyc");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl glass-card border border-white/[0.12] shadow-2xl p-6 flex flex-col gap-5 overflow-hidden bg-[#0A0B10]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <h2 className="text-xl font-extrabold text-white">KYC & Identity Verification</h2>
          </div>
          <p className="text-xs text-white/50 mt-1">
            Compliant with Curacao eGaming AML directives. Unlock unlimited deposits and withdrawals.
          </p>
        </div>

        {verifiedSuccess ? (
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 gap-3 text-center">
            <BadgeCheck className="w-14 h-14 text-emerald-400" />
            <h3 className="font-extrabold text-base text-white">Verification Approved</h3>
            <p className="text-xs text-white/70 max-w-xs">
              Your {docType.toUpperCase()} credentials have been authenticated via encrypted OCR verification.
            </p>
            <div className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold mt-1">
              TIER 2 VERIFIED VIP • ₹1,000,000 LIMIT
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl bg-[#FEE500] text-black font-extrabold text-xs shadow-lg hover:bg-[#FEE500]/90 transition-colors mt-3"
            >
              Continue Playing
            </button>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            {/* Document Selector */}
            <div className="flex items-center p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              {[
                { id: "aadhaar", label: "Aadhaar Card" },
                { id: "pan", label: "PAN Card" },
                { id: "passport", label: "Passport" },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDocType(d.id as any)}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-xs font-bold transition-all",
                    docType === d.id ? "bg-[#FEE500] text-black shadow-md" : "text-white/60 hover:text-white"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Document Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/60">
                {docType === "aadhaar"
                  ? "12-Digit Aadhaar Number"
                  : docType === "pan"
                  ? "10-Digit PAN Number"
                  : "Passport Number"}
              </label>
              <input
                type="text"
                required
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                placeholder="XXXX-XXXX-XXXX"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#FEE500]/50"
              />
            </div>

            {/* Simulated Document Upload Dropzone */}
            <div
              onClick={() => setFileUploaded(true)}
              className={cn(
                "p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all",
                fileUploaded
                  ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-300"
                  : "border-white/[0.12] hover:border-white/[0.25] bg-white/[0.02]"
              )}
            >
              {fileUploaded ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <span className="text-xs font-bold text-white">document_scan_front.jpg attached</span>
                  <span className="text-[10px] text-emerald-400 font-mono">2.4 MB • High Resolution</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-white/40" />
                  <span className="text-xs font-semibold text-white">Upload Front Photo of {docType.toUpperCase()}</span>
                  <span className="text-[10px] text-white/40">PNG, JPG, or PDF up to 10MB (Click to browse)</span>
                </>
              )}
            </div>

            {/* Privacy & Encryption Note */}
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Documents are AES-256 encrypted and automatically purged following verification.</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-2xl bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-extrabold text-sm shadow-xl shadow-[#FEE500]/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Processing OCR Biometric Verification...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit for Instant Verification</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
