import { Post, Video, Tweet } from "@/lib/data-types"

export async function fetchBlogPosts() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res  = await fetch(`${base}/api/blog`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("blog fetch failed");
  return res.json() as Promise<Post[]>;
}

export async function fetchYoutubeVideos(): Promise<Video[]> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // dev fallback

  // hit your JSON API route — note the /api/ prefix
  const res = await fetch(`${base}/api/youtube`, {
    next: { revalidate: 300 }, // 5‑min ISR
  });

  if (!res.ok) throw new Error("youtube fetch failed");

  return res.json() as Promise<Video[]>;
}


export async function fetchTweets() {
  // free embed widget supplies tweets; server fetch not used
  return [] as Promise<Tweet[]>[];
}

// // API functions to fetch real data from various sources
// export interface BlogPost {
//   id: string
//   title: string
//   excerpt: string
//   date: string
//   readTime: string
//   tags: string[]
//   slug: string
//   url: string
// }

// export interface Video {
//   id: string
//   title: string
//   description: string
//   date: string
//   views: string
//   thumbnail: string
//   duration: string
//   tags: string[]
//   slug: string
//   url: string
// }



// // Blog API - Replace with your blog's RSS feed or API
// export async function fetchBlogPosts(): Promise<BlogPost[]> {
//   try {
//     // Example for RSS feed parsing (you can replace with your blog's API)
//     const RSS_URL = process.env.BLOG_RSS_URL || "https://your-blog.com/rss.xml"

//     const response = await fetch(RSS_URL, {
//       next: { revalidate: 300 }, // Revalidate every 5 minutes
//     })

//     if (!response.ok) {
//       throw new Error("Failed to fetch blog posts")
//     }

//     const rssText = await response.text()

//     // Parse RSS (you might want to use a library like 'rss-parser' for production)
//     // This is a simplified example
//     const posts = parseRSSFeed(rssText)

//     return posts
//   } catch (error) {
//     console.error("Error fetching blog posts:", error)
//     // Return mock data as fallback
//     return getMockBlogPosts()
//   }
// }

// // YouTube API - Requires YouTube Data API v3 key
// export async function fetchYouTubeVideos(): Promise<Video[]> {
//   try {
//     const API_KEY = process.env.YOUTUBE_API_KEY
//     const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

//     if (!API_KEY || !CHANNEL_ID) {
//       throw new Error("YouTube API credentials not configured")
//     }

//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`,
//       {
//         next: { revalidate: 300 }, // Revalidate every 5 minutes
//       },
//     )

//     if (!response.ok) {
//       throw new Error("Failed to fetch YouTube videos")
//     }

//     const data = await response.json()

//     // Get video statistics for view counts and duration
//     const videoIds = data.items.map((item: any) => item.id.videoId).join(",")
//     const statsResponse = await fetch(
//       `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=statistics,contentDetails`,
//       {
//         next: { revalidate: 300 },
//       },
//     )

//     const statsData = await statsResponse.json()

//     const videos: Video[] = data.items.map((item: any, index: number) => {
//       const stats = statsData.items[index]
//       return {
//         id: item.id.videoId,
//         title: item.snippet.title,
//         description: item.snippet.description,
//         date: new Date(item.snippet.publishedAt).toLocaleDateString(),
//         views: formatViewCount(stats?.statistics?.viewCount || "0"),
//         thumbnail: item.snippet.thumbnails.medium.url,
//         duration: formatDuration(stats?.contentDetails?.duration || "PT0S"),
//         tags: item.snippet.tags || [],
//         slug: item.id.videoId,
//         url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
//       }
//     })

//     return videos
//   } catch (error) {
//     console.error("Error fetching YouTube videos:", error)
//     return getMockVideos()
//   }
// }

// // X (Twitter) API - Requires Twitter API v2 Bearer Token
// export async function fetchTweets(): Promise<never[]> {
//   // You might still return mock data here if other parts
//   // of the site expect Tweet[], but the live widget does
//   // its own fetching in the browser.
//   return []
// }

// // Helper functions
// function parseRSSFeed(rssText: string): BlogPost[] {
//   // This is a simplified RSS parser
//   // In production, use a proper RSS parsing library like 'rss-parser'
//   const items: BlogPost[] = []

//   try {
//     // Basic regex parsing (replace with proper XML parser)
//     const itemMatches = rssText.match(/<item[^>]*>[\s\S]*?<\/item>/g) || []

//     itemMatches.forEach((item, index) => {
//       const title = item.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] || ""
//       const description = item.match(/<description[^>]*>([\s\S]*?)<\/description>/)?.[1] || ""
//       const link = item.match(/<link[^>]*>([\s\S]*?)<\/link>/)?.[1] || ""
//       const pubDate = item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1] || ""

//       items.push({
//         id: index.toString(),
//         title: title.replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
//         excerpt:
//           description
//             .replace(/<!\[CDATA\[|\]\]>/g, "")
//             .replace(/<[^>]*>/g, "")
//             .trim()
//             .substring(0, 150) + "...",
//         date: new Date(pubDate).toLocaleDateString(),
//         readTime: `${Math.ceil(description.length / 1000)} min read`,
//         tags: [],
//         slug: link.split("/").pop() || "",
//         url: link,
//       })
//     })
//   } catch (error) {
//     console.error("Error parsing RSS feed:", error)
//   }

//   return items
// }

// function formatViewCount(count: string): string {
//   const num = Number.parseInt(count)
//   if (num >= 1000000) {
//     return `${(num / 1000000).toFixed(1)}M views`
//   } else if (num >= 1000) {
//     return `${(num / 1000).toFixed(1)}K views`
//   }
//   return `${num} views`
// }

// function formatDuration(duration: string): string {
//   // Parse ISO 8601 duration (PT4M13S -> 4:13)
//   const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
//   if (!match) return "0:00"

//   const hours = Number.parseInt(match[1] || "0")
//   const minutes = Number.parseInt(match[2] || "0")
//   const seconds = Number.parseInt(match[3] || "0")

//   if (hours > 0) {
//     return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//   }
//   return `${minutes}:${seconds.toString().padStart(2, "0")}`
// }

// function formatRelativeTime(date: Date): string {
//   const now = new Date()
//   const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

//   if (diffInSeconds < 60) return `${diffInSeconds}s`
//   if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
//   if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
//   if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`
//   return `${Math.floor(diffInSeconds / 604800)}w`
// }

// // Fallback mock data functions
// function getMockBlogPosts(): BlogPost[] {
//   return [
//     {
//       id: "1",
//       title: "Getting Started with Next.js 15",
//       excerpt: "Learn about the latest features in Next.js 15 and how to use them in your projects.",
//       date: "May 25, 2025",
//       readTime: "5 min read",
//       tags: ["Next.js", "React", "Web Development"],
//       slug: "getting-started-with-nextjs-15",
//       url: "/blog/getting-started-with-nextjs-15",
//     },
//     // ... other mock posts
//   ]
// }

// function getMockVideos(): Video[] {
//   return [
//     {
//       id: "1",
//       title: "React Server Components Explained",
//       description: "A deep dive into React Server Components and how they work in Next.js.",
//       date: "May 28, 2025",
//       views: "15K views",
//       thumbnail: "/placeholder.svg?height=180&width=320",
//       duration: "12:34",
//       tags: ["React", "Next.js", "Server Components"],
//       slug: "react-server-components",
//       url: "https://youtube.com/watch?v=example",
//     },
//     // ... other mock videos
//   ]
// }

// function getMockTweets(): Tweet[] {
//   return [
//     {
//       id: "1",
//       content:
//         "Just launched my new portfolio site! Check it out and let me know what you think. Built with @nextjs and @tailwindcss 🚀",
//       date: "2h",
//       likes: 42,
//       retweets: 12,
//       replies: 5,
//       author: {
//         name: "John Doe",
//         handle: "johndoe",
//         avatar: "/placeholder.svg?height=40&width=40",
//       },
//       hasImage: true,
//       imageUrl: "/placeholder.svg?height=300&width=500",
//       url: "https://twitter.com/johndoe/status/example",
//     },
//     // ... other mock tweets
//   ]
// }
