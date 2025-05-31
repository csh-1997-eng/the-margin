import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LiveFeed from "@/components/live-feed"
import ChatbotWidget from "@/components/chatbot-widget"
import RecentBlogPosts from "@/components/recent-blog-posts"
import RecentVideos from "@/components/recent-videos"
import XFeed from "@/components/x-feed"
import ProfileSection from "@/components/profile-section"

export default function Home() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-8">
          <ProfileSection />

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="x">X Feed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-8">
              <RecentBlogPosts limit={2} />
              <RecentVideos limit={2} />
              <XFeed limit={3} />
            </TabsContent>
            <TabsContent value="blog">
              <RecentBlogPosts limit={6} />
            </TabsContent>
            <TabsContent value="youtube">
              <RecentVideos limit={6} />
            </TabsContent>
            <TabsContent value="x">
              <XFeed limit={10} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="space-y-8">
          <LiveFeed />
          <ChatbotWidget />
        </div>
      </div>
    </div>
  )
}
