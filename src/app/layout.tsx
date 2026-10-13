import type { Metadata } from "next";
import "./globals.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import { Providers } from "@/components/Providers";
import { AuthModal } from "@/components/modals/AuthModal";
import { DepositModal } from "@/components/modals/DepositModal";
import { SearchModal } from "@/components/modals/SearchModal";
import { GamePlayModal } from "@/components/modals/GamePlayModal";
import { MatchDetailModal } from "@/components/modals/MatchDetailModal";
import { ResponsibleGamingModal } from "@/components/modals/ResponsibleGamingModal";
import { InvestorPitchModal } from "@/components/modals/InvestorPitchModal";
import { WithdrawModal } from "@/components/modals/WithdrawModal";
import { KycVerificationModal } from "@/components/modals/KycVerificationModal";
import { NotificationsDrawer } from "@/components/layout/NotificationsDrawer";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { MobileBetslipDrawer } from "@/components/betslip/MobileBetslipDrawer";
import { ToastContainer } from "@/components/ui/ToastContainer";

export const metadata: Metadata = {
  title: "BETTING BANTU | Luxury Sportsbook, In-Play Odds & Casino",
  description:
    "Betting Bantu is the premier luxury sports betting, in-play odds, prediction markets, and online casino platform. Play Smarter, Win Bigger.",
  icons: {
    icon: "/brand/secondary-logo-dark.png",
    apple: "/brand/secondary-logo-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#171A21] text-[#F3F4F6] min-h-screen flex flex-col antialiased selection:bg-[#FEE500] selection:text-black">
        <Providers>
          {children}

          {/* Global Modals & Overlay Drawers */}
          <AuthModal />
          <DepositModal />
          <WithdrawModal />
          <KycVerificationModal />
          <NotificationsDrawer />
          <SearchModal />
          <GamePlayModal />
          <MatchDetailModal />
          <ResponsibleGamingModal />
          <InvestorPitchModal />
          <MobileDrawer />
          <MobileBetslipDrawer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
