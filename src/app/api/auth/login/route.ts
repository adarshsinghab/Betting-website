import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter your username/email and password." },
        { status: 400 }
      );
    }

    // Simulate authenticated session response
    return NextResponse.json({
      success: true,
      token: "jwt_bantu_session_" + Date.now(),
      user: {
        id: "usr-live-01",
        username: identifier.split("@")[0] || "VIP_Player",
        email: identifier.includes("@") ? identifier : `${identifier}@bettingbantu.com`,
        vipTier: "Platinum VIP",
        kycStatus: "verified",
        currency: "USD",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
