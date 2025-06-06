export type Post = {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  url: string
}

export type Video = {
  id: string
  title: string
  description?: string
  date: string
  views?: string
  thumbnail: string
  duration?: string
  tags?: string[]
  slug?: string
  url: string
}
export type Tweet = {
  id: string;
  content: string;
  date: string;
  likes: number;
  retweets: number;
  replies: number;
  author: {
    name: string;
    handle: string;
    avatar: string;
  }
  hasImage?: boolean;
  imageUrl?: string;
  url: string;
};