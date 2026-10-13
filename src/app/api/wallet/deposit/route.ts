import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, method } = body;

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid deposit amount." },
        { status: 400 }
      );
    }

    const txId = "TX-BB-" + Math.floor(100000 + Math.random() * 900000);

    return NextResponse.json({
      success: true,
      transactionId: txId,
      amount: numAmount,
      method: method || "UPI / Instant Deposit",
      status: "COMPLETED",
      creditedBalance: numAmount,
      bonusAwarded: Math.round(numAmount * 0.5),
      message: `Deposit of $${numAmount} successfully credited to wallet!`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Deposit processing failed" },
      { status: 500 }
    );
  }
}
