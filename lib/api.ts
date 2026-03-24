import { unstable_cache } from "next/cache"
import { Post, Video } from "@/lib/data-types"
import { parseSubstackFeed } from "@/lib/blog"
import { getLatestVideos } from "@/lib/youtube"
const getCachedBlogPosts = unstable_cache(
  async () => parseSubstackFeed(25),
  ["blog-posts-cache"],
  { revalidate: 300, tags: ["blog-posts"] },
)

const getCachedYoutubeVideos = unstable_cache(
  async () => getLatestVideos(25),
  ["youtube-videos-cache"],
  { revalidate: 300, tags: ["youtube-videos"] },
)

export async function fetchBlogPosts(limit = 25): Promise<Post[]> {
  const posts = await getCachedBlogPosts()
  return posts.slice(0, limit)
}

export async function fetchYoutubeVideos(limit = 25): Promise<Video[]> {
  const videos = await getCachedYoutubeVideos()
  return videos.slice(0, limit)
}

