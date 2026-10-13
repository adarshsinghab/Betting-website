import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, provider, mode } = body;

    if (!gameId) {
      return NextResponse.json(
        { success: false, error: "Game ID is required to generate session." },
        { status: 400 }
      );
    }

    const sessionToken = "session_bantu_" + Math.random().toString(36).substring(2, 12);
    // Dynamic launcher URL simulation for Spribe Aviator, Evolution, Pragmatic Play
    const gameUrl = `https://demo.spribe.co/launch/${gameId}?token=${sessionToken}&mode=${mode || "real"}`;

    return NextResponse.json({
      success: true,
      gameId,
      provider: provider || "Spribe",
      sessionToken,
      gameUrl,
      mode: mode || "real",
      rtp: 97.2,
      maxMultiplier: "10,000x",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Game launch failed" },
      { status: 500 }
    );
  }
}
