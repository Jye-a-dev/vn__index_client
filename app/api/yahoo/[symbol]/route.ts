import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {

    const { symbol } = await params;

    const url =
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json"
      },
      cache: "no-store"
    });

    const data = await res.json();

    return NextResponse.json(data);

  } catch (error) {

    console.error("Yahoo API error:", error);

    return NextResponse.json(
      { error: "Fetch failed" },
      { status: 500 }
    );

  }
}