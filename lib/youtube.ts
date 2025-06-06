// lib/youtube.ts
import { Video } from "@/lib/data-types";

export async function getLatestVideos(limit = 5): Promise<Video[]> {
  try {
    const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } =
      process.env as Record<string, string>;

    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      throw new Error("Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID");
    }

    /* ---------- 1. uploads playlist ID ---------- */
    const chanRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );

    if (!chanRes.ok) {
      const body = await chanRes.json().catch(() => ({}));
      throw new Error(
        `channel lookup ${chanRes.status} – ${body.error?.errors?.[0]?.reason ?? "unknown"}`
      );
    }

    const chan = await chanRes.json();
    const uploads =
      chan?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploads) {
      console.warn("YouTube channel has no uploads playlist");
      return [];
    }

    /* ---------- 2. playlist items ---------- */
    const plRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploads}&maxResults=${limit}&key=${YOUTUBE_API_KEY}`
    );

    if (!plRes.ok) {
      const body = await plRes.json().catch(() => ({}));
      throw new Error(
        `playlistItems ${plRes.status} – ${body.error?.errors?.[0]?.reason ?? "unknown"}`
      );
    }

    const pl = await plRes.json();

    return (
      pl.items
        ?.map((v: any) => v?.snippet)
        ?.filter(Boolean)
        ?.map(
          (s: any): Video => ({
            id: s.resourceId.videoId,
            title: s.title,
            date: s.publishedAt,
            thumbnail: s.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${s.resourceId.videoId}`,
          })
        ) ?? []
    );
  } catch (err) {
    // One central place to log; UI will show "No videos yet" because we return []
    console.error("YouTube getLatestVideos error:", err);
    return [];
  }
}
