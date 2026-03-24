import type { Metadata } from "next"
import RecentBlogPosts from "@/components/recent-blog-posts"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: `Writing | ${siteConfig.shortName}`,
  description: "Essays, notes, and long-form analysis from The Margin.",
}

export default function BlogPage() {
  return (
    <div className="container py-10 md:py-14">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#C45A3C]">Editorial Archive</p>
          <h1 className="font-display mt-3 text-5xl leading-none md:text-6xl">Writing</h1>
        </div>
        <RecentBlogPosts limit={10} />
      </div>
    </div>
  )
}
