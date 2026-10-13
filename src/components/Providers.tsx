"use client";

import React, { ReactNode } from "react";
import { UIProvider } from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";
import { WalletProvider } from "@/context/WalletContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { BetSlipProvider } from "@/context/BetSlipContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <AuthProvider>
        <WalletProvider>
          <FavoritesProvider>
            <BetSlipProvider>{children}</BetSlipProvider>
          </FavoritesProvider>
        </WalletProvider>
      </AuthProvider>
    </UIProvider>
  );
}
