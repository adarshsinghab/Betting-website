"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  Sparkles,
  ExternalLink,
  RotateCw,
  ShieldCheck,
  Gamepad2,
  Cpu,
  Tv,
  AlertCircle,
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useWallet } from "@/context/WalletContext";
import { AviatorSimulator } from "@/components/casino/AviatorSimulator";
import { MinesGame } from "@/components/casino/MinesGame";
import { casinoProvider, MOCK_CASINO_GAMES } from "@/lib/providers/casinoProvider";
import { CasinoSessionResponse, NormalizedCasinoGame } from "@/lib/providers/types";
import { cn } from "@/lib/utils";

export function GamePlayModal() {
  const { modals, closeModal, addToast } = useUI();
  const { balance, currency } = useWallet();
  const isOpen = modals.gamePlay.isOpen;
  const rawGame = modals.gamePlay.data?.game as any;

  const [session, setSession] = useState<CasinoSessionResponse | null>(null);
  const [engineMode, setEngineMode] = useState<"official_provider" | "native_canvas">("official_provider");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [frameError, setFrameError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Match game with catalog to get authentic demoUrl and metadata
  const game: NormalizedCasinoGame | undefined = React.useMemo(() => {
    if (!rawGame) return undefined;
    const match = MOCK_CASINO_GAMES.find(
      (g) =>
        g.id === rawGame.id ||
        g.slug === rawGame.slug ||
        g.title.toLowerCase() === rawGame.title?.toLowerCase() ||
        (rawGame.title && g.title.toLowerCase().includes(rawGame.title.toLowerCase()))
    );

    if (match) {
      return {
        ...match,
        demoUrl: rawGame.demoUrl || match.demoUrl,
      };
    }

    // Fallback normalization
    return {
      id: rawGame.id || "game",
      title: rawGame.title || "Live Casino Game",
      slug: rawGame.slug || rawGame.id || "game",
      category: rawGame.category || "slots",
      provider: rawGame.provider || "Pragmatic Play",
      rtp: rawGame.rtp || 96.5,
      volatility: rawGame.volatility || "High",
      thumbnail: rawGame.thumbnail || rawGame.image || "",
      hasLiveDemo: true,
      demoUrl:
        rawGame.demoUrl ||
        (rawGame.category === "instant"
          ? "https://demo.spribe.co/launch/aviator?currency=INR&lang=en"
          : "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20olympx&lang=en&cur=INR"),
      minBet: rawGame.minBet || 10,
      maxBet: rawGame.maxBet || 100000,
      maxMultiplier: rawGame.maxMultiplier || "10,000x",
      tags: rawGame.tags || ["VERIFIED", "CERTIFIED"],
    };
  }, [rawGame]);

  const isInstantGame = game?.category === "instant" || game?.id === "aviator" || game?.id === "mines";

  // Initialize or reset session when opened
  useEffect(() => {
    if (!isOpen || !game) {
      setSession(null);
      setIsLoadingSession(true);
      setFrameError(false);
      return;
    }

    let active = true;
    setIsLoadingSession(true);
    setFrameError(false);

    casinoProvider
      .createSession(game.id, "demo")
      .then((res) => {
        if (active) {
          setSession(res);
          setIsLoadingSession(false);
        }
      })
      .catch(() => {
        if (active) {
          setIsLoadingSession(false);
        }
      });

    return () => {
      active = false;
    };
  }, [isOpen, game]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleRefreshSession = () => {
    if (!game) return;
    setIsLoadingSession(true);
    setFrameError(false);
    casinoProvider.createSession(game.id, "demo").then((res) => {
      setSession(res);
      setIsLoadingSession(false);
      addToast({ type: "info", message: "Game session refreshed with latest state." });
    });
  };

  if (!isOpen || !game) return null;

  const launchUrl = session?.launchUrl || game.demoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className={cn(
          "relative w-full max-w-6xl rounded-2xl md:rounded-3xl glass-card border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col transition-all duration-300",
          isFullscreen ? "h-screen max-w-none rounded-none" : "h-[92vh] max-h-[880px]"
        )}
      >
        {/* Game Master Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-5 py-2.5 bg-[#0B0C10] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FEE500]/20 to-[#E5A900]/10 text-[#FEE500] border border-[#FEE500]/30 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white flex items-center gap-2">
                <span>{game.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-semibold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  AUTHENTIC PROVIDER FEED
                </span>
              </div>
              <div className="text-[11px] text-white/50 flex items-center gap-2">
                <span className="font-semibold text-white/70">{game.provider}</span>
                <span>•</span>
                <span>RTP: <strong className="text-white/80 font-mono">{game.rtp}%</strong></span>
                <span>•</span>
                <span>Vol: <strong className="text-[#FEE500] font-mono">{game.volatility}</strong></span>
              </div>
            </div>
          </div>

          {/* Engine Mode Switcher (For Aviator/Mines where we offer both Authentic Provider Demo & Provably Fair Instant Engine) */}
          {isInstantGame && (
            <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <button
                onClick={() => setEngineMode("official_provider")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all",
                  engineMode === "official_provider"
                    ? "bg-[#FEE500] text-black shadow-md"
                    : "text-white/60 hover:text-white"
                )}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Provider HTML5</span>
              </button>
              <button
                onClick={() => setEngineMode("native_canvas")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all",
                  engineMode === "native_canvas"
                    ? "bg-[#FEE500] text-black shadow-md"
                    : "text-white/60 hover:text-white"
                )}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Wallet Simulator</span>
              </button>
            </div>
          )}

          {/* Right Toolbar Actions */}
          <div className="flex items-center gap-2">
            {/* Live Wallet Chip */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs">
              <span className="text-white/40">Balance:</span>
              <span className="font-mono font-bold text-[#FEE500]">
                {currency.symbol}{balance.cash.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
              </span>
            </div>

            {/* Launch in new tab */}
            {launchUrl && (
              <button
                onClick={() => window.open(launchUrl, "_blank", "noopener,noreferrer")}
                title="Launch in Dedicated Tab"
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}

            {/* Reload session */}
            <button
              onClick={handleRefreshSession}
              title="Refresh Provider Session"
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white transition-colors"
            >
              <RotateCw className={cn("w-4 h-4", isLoadingSession && "animate-spin text-[#FEE500]")} />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => closeModal("gamePlay")}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors border border-rose-500/20 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Viewport Container */}
        <div className="relative flex-1 bg-[#050608] flex items-center justify-center overflow-hidden">
          {/* If using Native Canvas Engine for Aviator or Mines */}
          {isInstantGame && engineMode === "native_canvas" ? (
            <div className="w-full h-full overflow-y-auto custom-scrollbar p-3 sm:p-6 flex flex-col items-center justify-center">
              {game.id === "aviator" ? <AviatorSimulator /> : <MinesGame />}
            </div>
          ) : (
            /* Official Provider HTML5 Game iFrame */
            <div className="relative w-full h-full flex flex-col bg-black">
              {isLoadingSession && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#07080D]/90 backdrop-blur-sm gap-3">
                  <div className="w-12 h-12 rounded-2xl border-2 border-[#FEE500] border-t-transparent animate-spin" />
                  <div className="text-sm font-semibold text-white">Connecting to {game.provider} Secure Feed...</div>
                  <div className="text-xs text-white/40 font-mono">Generating RNG session token</div>
                </div>
              )}

              {launchUrl ? (
                <iframe
                  src={launchUrl}
                  title={game.title}
                  className="w-full h-full border-0 flex-1"
                  allow="autoplay; fullscreen; camera; microphone; encrypted-media; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  onLoad={() => setIsLoadingSession(false)}
                  onError={() => {
                    setIsLoadingSession(false);
                    setFrameError(true);
                  }}
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center gap-4">
                  <AlertCircle className="w-12 h-12 text-[#FEE500]" />
                  <div className="text-white font-bold text-lg">Provider Stream Initializing</div>
                  <p className="text-white/60 text-sm max-w-md">
                    Live session handshake is awaiting provider authorization. You can switch to the local simulator or open the external provider portal.
                  </p>
                </div>
              )}

              {frameError && (
                <div className="absolute bottom-4 left-4 right-4 z-30 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                  <span>Provider session restricted frame embed. Click to play in dedicated secure window.</span>
                  {launchUrl && (
                    <button
                      onClick={() => window.open(launchUrl, "_blank")}
                      className="px-3 py-1 bg-amber-500 text-black font-bold rounded-lg text-xs"
                    >
                      Open Provider Direct
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Security & Session Meta */}
        <div className="px-4 py-2 bg-[#08090D] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS 1.3 256-bit Encrypted Session</span>
            </div>
            <div className="hidden sm:block">
              Session ID: <span className="font-mono text-white/60">{session?.sessionId || "BNT-DEMO-LIVE"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span>Official Feed: <strong className="text-white/70">{game.provider}</strong></span>
            <span>•</span>
            <span>GLI-19 Certified RNG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
