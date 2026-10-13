"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CasinoGame, Match, ProductTab, SportType } from "@/types";

export type ModalType =
  | null
  | "auth"
  | "auth-login"
  | "auth-register"
  | "deposit"
  | "withdraw"
  | "kyc"
  | "notifications"
  | "search"
  | "responsibleGaming"
  | "responsible-gaming"
  | "gamePlay"
  | "game-play"
  | "matchDetail"
  | "match-detail"
  | "investorPitch"
  | "investor-pitch"
  | "mobileBetslip";

export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "gold";
  title?: string;
  message: string;
}

interface ModalState {
  isOpen: boolean;
  data?: any;
}

interface UIContextType {
  // Navigation
  activeTab: ProductTab;
  setActiveTab: (tab: ProductTab) => void;
  activeProductTab: string;
  setActiveProductTab: (tab: string) => void;
  activeSport: SportType | "all";
  setActiveSport: (sport: SportType | "all") => void;
  activeSportSlug: string;
  setActiveSportSlug: (slug: string) => void;

  // Mobile Drawers
  isMobileDrawerOpen: boolean;
  toggleMobileDrawer: () => void;
  closeMobileDrawer: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  mobileBetslipOpen: boolean;
  setMobileBetslipOpen: (open: boolean) => void;

  // Modals System
  modals: Record<string, ModalState>;
  openModal: (type: string, data?: any) => void;
  closeModal: (type?: string) => void;
  activeModal: ModalType;

  // Direct Shortcuts
  activeGame: CasinoGame | null;
  playGame: (game: CasinoGame) => void;
  activeMatchDetail: Match | null;
  openMatchDetail: (match: Match) => void;
  closeMatchDetail: () => void;

  // Search & Toasts
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;

  // Theme Management
  theme: "dark" | "light";
  toggleTheme: () => void;
  setTheme: (theme: "dark" | "light") => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<ProductTab>("sports");
  const [activeSport, setActiveSportState] = useState<SportType | "all">("all");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [theme, setThemeState] = useState<"dark" | "light">("dark");

  const [activeGame, setActiveGame] = useState<CasinoGame | null>(null);
  const [activeMatchDetail, setActiveMatchDetail] = useState<Match | null>(null);

  // Synchronize theme on initial mount - Luxury Dark default
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("bb_theme") as "dark" | "light" | null;
      if (saved === "light") {
        setThemeState("light");
        applyTheme("light");
      } else {
        setThemeState("dark");
        applyTheme("dark");
      }
    } catch {
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (t: "dark" | "light") => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (t === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      }
    }
  };

  const setTheme = (newTheme: "dark" | "light") => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("bb_theme", newTheme);
    } catch {}
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  // Unified modals state
  const [modals, setModals] = useState<Record<string, ModalState>>({
    auth: { isOpen: false },
    deposit: { isOpen: false },
    withdraw: { isOpen: false },
    kyc: { isOpen: false },
    notifications: { isOpen: false },
    search: { isOpen: false },
    responsibleGaming: { isOpen: false },
    gamePlay: { isOpen: false },
    matchDetail: { isOpen: false },
    investorPitch: { isOpen: false },
    mobileBetslip: { isOpen: false },
  });

  const setActiveTab = (tab: ProductTab) => {
    setActiveTabState(tab);
  };

  const setActiveSport = (sport: SportType | "all") => {
    setActiveSportState(sport);
  };

  const toggleMobileDrawer = () => setIsMobileDrawerOpen((prev) => !prev);
  const closeMobileDrawer = () => setIsMobileDrawerOpen(false);

  const openModal = (type: string, data?: any) => {
    setModals((prev) => ({
      ...prev,
      [type]: { isOpen: true, data },
    }));
  };

  const closeModal = (type?: string) => {
    if (type) {
      setModals((prev) => ({
        ...prev,
        [type]: { isOpen: false, data: undefined },
      }));
    } else {
      // Close all modals
      setModals((prev) => {
        const next: Record<string, ModalState> = {};
        Object.keys(prev).forEach((key) => {
          next[key] = { isOpen: false };
        });
        return next;
      });
    }
  };

  const playGame = (game: CasinoGame) => {
    setActiveGame(game);
    openModal("gamePlay", { game });
  };

  const openMatchDetail = (match: Match) => {
    setActiveMatchDetail(match);
    openModal("matchDetail", { match });
  };

  const closeMatchDetail = () => {
    setActiveMatchDetail(null);
    closeModal("matchDetail");
  };

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <UIContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeProductTab: activeTab,
        setActiveProductTab: (t: string) => setActiveTab(t as ProductTab),
        activeSport,
        setActiveSport,
        activeSportSlug: activeSport,
        setActiveSportSlug: (s: string) => setActiveSport(s as SportType),

        isMobileDrawerOpen,
        toggleMobileDrawer,
        closeMobileDrawer,
        mobileMenuOpen: isMobileDrawerOpen,
        setMobileMenuOpen: (open: boolean) => setIsMobileDrawerOpen(open),
        mobileBetslipOpen: modals.mobileBetslip?.isOpen || false,
        setMobileBetslipOpen: (open: boolean) =>
          open ? openModal("mobileBetslip") : closeModal("mobileBetslip"),

        modals,
        openModal,
        closeModal,
        activeModal: null,

        activeGame,
        playGame,
        activeMatchDetail,
        openMatchDetail,
        closeMatchDetail,

        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,

        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
}
