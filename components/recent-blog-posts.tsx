import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CalendarIcon, Clock } from "lucide-react"
import { fetchBlogPosts } from "@/lib/api"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
}

interface RecentBlogPostsProps {
  limit?: number
}

export default async function RecentBlogPosts({ limit = 3 }: RecentBlogPostsProps) {
  const allPosts = await fetchBlogPosts()
  const posts = allPosts.slice(0, limit)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recent Blog Posts</h2>
        <Link href="/blog" className="text-sm text-primary hover:underline">
          View all posts
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                <Link
                  href={post.url}
                  className="hover:underline"
                  target={post.url.startsWith("http") ? "_blank" : "_self"}
                >
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
