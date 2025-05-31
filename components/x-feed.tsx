import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Repeat, Share2, Twitter } from "lucide-react"
import { fetchTweets } from "@/lib/api"
import Link from "next/link"

type Tweet = {
  id: string
  content: string
  date: string
  likes: number
  retweets: number
  replies: number
  author: {
    name: string
    handle: string
    avatar: string
  }
  hasImage?: boolean
  imageUrl?: string
  url: string
}

interface XFeedProps {
  limit?: number
}

export default async function XFeed({ limit = 5 }: XFeedProps) {
  const allTweets = await fetchTweets()
  const tweets = allTweets.slice(0, limit)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">X Feed</h2>
        <a href="/x-feed" className="text-sm text-primary hover:underline">
          View all posts
        </a>
      </div>

      <div className="space-y-4">
        {tweets.map((tweet) => (
          <Card key={tweet.id}>
            <CardHeader className="pb-2 flex flex-row items-start space-y-0 space-x-3">
              <Avatar className="h-10 w-10">
                <img src={tweet.author.avatar || "/placeholder.svg"} alt={tweet.author.name} />
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{tweet.author.name}</span>
                  <Twitter className="h-4 w-4 text-sky-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  @{tweet.author.handle} · {tweet.date}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{tweet.content}</p>
              {tweet.hasImage && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <img src={tweet.imageUrl || "/placeholder.svg"} alt="Tweet image" className="w-full h-auto" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full text-muted-foreground">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <MessageCircle className="h-4 w-4" />
                  <span>{tweet.replies}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <Repeat className="h-4 w-4" />
                  <span>{tweet.retweets}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <Heart className="h-4 w-4" />
                  <span>{tweet.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-xs" asChild>
                  <Link href={tweet.url} target="_blank" rel="noopener noreferrer">
                    <Share2 className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
