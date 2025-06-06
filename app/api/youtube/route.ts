import { NextResponse } from "next/server";
import { getLatestVideos } from "@/lib/youtube";

export const revalidate = 300; // 5‑min ISR

export async function GET() {
  try {
    const videos = await getLatestVideos(5); // [] if none
    return NextResponse.json(videos);
  } catch (err) {
    console.error("YouTube route error:", err);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
}
