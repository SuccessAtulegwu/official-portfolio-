import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = (data?.name || "").toString();
    const email = (data?.email || "").toString();
    const message = (data?.message || "").toString();
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}