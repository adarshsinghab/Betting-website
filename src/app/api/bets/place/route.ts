import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { selections, stake, betType } = body;

    if (!selections || !Array.isArray(selections) || selections.length === 0) {
      return NextResponse.json(
        { success: false, error: "No selections in bet slip." },
        { status: 400 }
      );
    }

    const numStake = Number(stake);
    if (!numStake || numStake <= 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid stake amount." },
        { status: 400 }
      );
    }

    // Compute combined odds
    const totalOdds = Number(
      selections.reduce((acc: number, sel: any) => acc * (sel.odds || 1.5), 1).toFixed(2)
    );

    const ticketId = "TICKET-BB-" + Math.floor(100000 + Math.random() * 900000);
    const potentialReturn = Number((numStake * totalOdds).toFixed(2));

    return NextResponse.json({
      success: true,
      ticketId,
      betType: betType || "SINGLE",
      stake: numStake,
      totalOdds,
      potentialReturn,
      status: "OPEN",
      placedAt: new Date().toISOString(),
      message: `Bet Ticket ${ticketId} placed successfully!`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Bet placement failed" },
      { status: 500 }
    );
  }
}
