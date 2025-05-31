import { type NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    // YouTube webhook verification
    const challenge = request.nextUrl.searchParams.get("hub.challenge")
    if (challenge) {
      return new NextResponse(challenge)
    }

    // Process YouTube webhook notification
    const body = await request.text()

    // Parse the XML notification from YouTube
    if (body.includes("<feed")) {
      // Revalidate YouTube videos cache
      revalidateTag("youtube-videos")
    }

    return NextResponse.json({
      message: "YouTube content refreshed",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error processing YouTube webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}
