import { Promotion } from "@/types";

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "promo-welcome",
    title: "Triple Crown Welcome Package",
    category: "welcome",
    subtitle: "300% Bonus up to $1,500 + 100 Free Spins",
    bonusTag: "300% MATCH",
    description: "Kick off your journey with our flagship welcome bundle across your first three deposits.",
    expiryDate: "2026-12-31",
    minDeposit: 20,
    wageringRequirement: "5x on Sports (min odds 1.50) or 30x on Casino",
    terms: [
      "Available to newly registered verified accounts only.",
      "Minimum qualifying deposit is $20.",
      "Bonus funds expire 30 days after activation.",
      "General Terms & Conditions apply.",
    ],
    promoCode: "BANTU300",
  },
  {
    id: "promo-sports-boost",
    title: "100% Multi-Bet Accumulator Boost",
    category: "sports",
    subtitle: "Earn up to 100% extra cash on 4+ selection accumulators",
    bonusTag: "+100% BOOST",
    description: "Build an accumulator of 4 or more selections at minimum odds of 1.25 per leg and get automatically boosted payout.",
    expiryDate: "2026-12-31",
    terms: [
      "Minimum 4 legs required.",
      "Each leg must have minimum odds of 1.25.",
      "Maximum extra payout is $10,000.",
    ],
  },
  {
    id: "promo-vip-cashback",
    title: "Weekly VIP Black Elite Cashback",
    category: "vip",
    subtitle: "15% Uncapped Weekly Net Loss Cashback",
    bonusTag: "15% CASHBACK",
    description: "Every Monday, receive 15% instant real cash back on net losses without wagering restrictions.",
    expiryDate: "Ongoing",
    terms: [
      "Calculated automatically every Monday at 00:00 UTC.",
      "Credited directly to main cash balance.",
      "Zero wagering requirement.",
    ],
  },
  {
    id: "promo-crash-rain",
    title: "Spribe Aviator Crash Daily Free Bets",
    category: "casino",
    subtitle: "$2,500 Dropped Randomly into Chat Every Day",
    bonusTag: "$2.5K RAIN",
    description: "Catch the rain in the live Aviator game room every hour from 18:00 to 23:00 UTC.",
    expiryDate: "2026-10-31",
    terms: [
      "Active players with bets placed in the last 15 minutes are eligible.",
      "First come, first served on rain claim button.",
    ],
  },
];
