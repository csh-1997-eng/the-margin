import type { Metadata } from "next"
import RecentVideos from "@/components/recent-videos"

export const metadata: Metadata = {
  title: "YouTube | Personal Hub",
  description: "Watch my latest videos about web development, tech, and more.",
}

export default function YoutubePage() {
  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">YouTube Videos</h1>
        <RecentVideos limit={12} />
      </div>
    </div>
  )
}
