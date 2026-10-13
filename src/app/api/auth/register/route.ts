import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, phone } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Username, email, and password are required." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully! 150% Welcome Bonus unlocked.",
      token: "jwt_bantu_reg_" + Date.now(),
      user: {
        id: "usr-" + Math.random().toString(36).substring(2, 9),
        username,
        email,
        phone: phone || "+1 555-0192",
        vipTier: "Silver VIP",
        kycStatus: "pending",
        cashBalance: 100.0,
        bonusBalance: 150.0,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Registration failed" },
      { status: 500 }
    );
  }
}
