import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function POST() {
  try {
    // Revalidate all content caches
    revalidateTag("blog-posts")
    revalidateTag("youtube-videos")
    revalidateTag("tweets")

    return NextResponse.json({
      message: "Content refreshed successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error refreshing content:", error)
    return NextResponse.json({ error: "Failed to refresh content" }, { status: 500 })
  }
}
