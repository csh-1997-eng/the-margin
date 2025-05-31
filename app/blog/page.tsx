import type { Metadata } from "next"
import RecentBlogPosts from "@/components/recent-blog-posts"

export const metadata: Metadata = {
  title: "Blog | Personal Hub",
  description: "Read my latest blog posts about web development, tech, and more.",
}

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <RecentBlogPosts limit={10} />
      </div>
    </div>
  )
}
