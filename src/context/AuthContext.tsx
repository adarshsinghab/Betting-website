"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile } from "@/types";
import { INITIAL_USER } from "@/data/mock/user";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (identifier: string, password?: string) => Promise<boolean>;
  register: (username: string, email: string, phone?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateKycTier: (tier: 1 | 2 | 3) => void;
  toggle2FA: () => void;
  quickSwitchUser: (mode: "vip" | "new" | "guest") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);

  const login = async (identifier: string): Promise<boolean> => {
    // Simulate auth latency
    await new Promise((resolve) => setTimeout(resolve, 600));
    setUser({
      ...INITIAL_USER,
      email: identifier.includes("@") ? identifier : INITIAL_USER.email,
      username: identifier.split("@")[0] || INITIAL_USER.username,
    });
    return true;
  };

  const register = async (username: string, email: string, phone: string = "", password?: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUser({
      id: "usr-bb-" + Math.floor(1000 + Math.random() * 9000),
      username,
      email,
      phone,
      isVerified: false,
      kycTier: 1,
      twoFactorEnabled: false,
      currency: "USD",
      vipTier: "Bronze",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateKycTier = (tier: 1 | 2 | 3) => {
    if (user) {
      setUser({ ...user, kycTier: tier, isVerified: tier >= 2 });
    }
  };

  const toggle2FA = () => {
    if (user) {
      setUser({ ...user, twoFactorEnabled: !user.twoFactorEnabled });
    }
  };

  const quickSwitchUser = (mode: "vip" | "new" | "guest") => {
    if (mode === "guest") {
      setUser(null);
    } else if (mode === "vip") {
      setUser(INITIAL_USER);
    } else {
      setUser({
        id: "usr-bb-newbie",
        username: "NewRookie",
        email: "rookie@bantu.com",
        phone: "+254 700 000 111",
        isVerified: false,
        kycTier: 1,
        twoFactorEnabled: false,
        currency: "USD",
        vipTier: "Bronze",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateKycTier,
        toggle2FA,
        quickSwitchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
