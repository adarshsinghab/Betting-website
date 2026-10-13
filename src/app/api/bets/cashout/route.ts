import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketId, currentCashoutValue } = body;

    if (!ticketId) {
      return NextResponse.json(
        { success: false, error: "Ticket ID required for cash out." },
        { status: 400 }
      );
    }

    const value = Number(currentCashoutValue) || 50.0;

    return NextResponse.json({
      success: true,
      ticketId,
      status: "CASHED_OUT",
      cashoutAmount: value,
      cashedOutAt: new Date().toISOString(),
      message: `Successfully cashed out $${value} to wallet!`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Cash out failed" },
      { status: 500 }
    );
  }
}
