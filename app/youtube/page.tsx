// src/app/youtube/page.tsx
import RecentVideos from "@/components/recent-videos";

export const metadata = {
  title: "YouTube | Personal Hub",
  description: "Watch my latest videos.",
};

export default function YouTubePage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">YouTube</h1>
      <RecentVideos limit={10} />
    </main>
  );
}
