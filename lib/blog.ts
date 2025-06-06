import { XMLParser } from "fast-xml-parser";
import { Post } from "@/lib/data-types"

export async function parseSubstackFeed(limit = 5): Promise<Post[]> {
  const base = process.env.SUBSTACK_URL;
  if (!base) throw new Error("SUBSTACK_URL missing");

  const res = await fetch(`${base}/feed`);
  if (!res.ok) throw new Error("RSS fetch failed");

  const xml  = await res.text();
  const json = new XMLParser().parse(xml);
  const items = json?.rss?.channel?.item ?? [];

  return items.slice(0, limit).map((p: any) => ({
    id:    p.guid?.["#text"] || p.link,
    title: p.title,
    date:  p.pubDate,
    url:   p.link,
  }));
}
