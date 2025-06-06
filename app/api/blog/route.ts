import { NextResponse } from "next/server";
import { parseSubstackFeed } from "@/lib/blog";   // pure helper

export const revalidate = 300;

export async function GET() {
  try {
    const posts = await parseSubstackFeed(5);  // returns [] on empty
    return NextResponse.json(posts);
  } catch (err) {
    console.error("Substack route error:", err);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
}
