import type { Metadata } from "next"
import TweetsWidget from "@/components/x-feed"

export const metadata: Metadata = {
  title: "X Feed | Personal Hub",
  description: "My latest posts on X (formerly Twitter).",
}

export default function XFeedPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">X Feed</h1>
        <TweetsWidget />
      </div>
    </div>
  )
}
