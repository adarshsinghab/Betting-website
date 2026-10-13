import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    currency: "USD",
    cashBalance: 1250.0,
    bonusBalance: 300.0,
    withdrawableBalance: 1250.0,
    pendingBetsCount: 3,
    vipTier: "Platinum VIP",
    vipPoints: 14200,
  });
}
