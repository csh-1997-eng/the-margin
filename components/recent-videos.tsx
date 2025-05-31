import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CalendarIcon, Eye } from "lucide-react"
import { fetchYouTubeVideos } from "@/lib/api"

type Video = {
  id: string
  title: string
  description: string
  date: string
  views: string
  thumbnail: string
  duration: string
  tags: string[]
  slug: string
  url: string
}

interface RecentVideosProps {
  limit?: number
}

export default async function RecentVideos({ limit = 3 }: RecentVideosProps) {
  const allVideos = await fetchYouTubeVideos()
  const videos = allVideos.slice(0, limit)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recent Videos</h2>
        <Link href="/youtube" className="text-sm text-primary hover:underline">
          View all videos
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="relative">
              <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-40 object-cover" />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                <Link href={video.url} className="hover:underline" target="_blank" rel="noopener noreferrer">
                  {video.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {video.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-1">
                {video.tags.map((tag) => (
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
