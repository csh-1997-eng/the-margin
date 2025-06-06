// components/ServerRecentList.tsx   ← still a SERVER component
import { safeFetch } from "@/lib/safe-fetch";

export type DisplayItem = {
  id: string;
  title: string;
  date: string;
  url: string;
  thumbnail?: string;
};

interface Props<T> {
  heading: string;
  limit?: number;
  fetcher: () => Promise<T[]>;
  map: (item: T) => DisplayItem;
}

export default async function ServerRecentList<T>({
  heading,
  limit = 5,
  fetcher,
  map,
}: Props<T>) {
  // 1) get data on the server; safeFetch logs & returns [] on failure
  const raw = await safeFetch(fetcher);
  // 2) slice & map to a display‑ready shape
  const items = raw.slice(0, limit).map(map);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">{heading}</h2>

      {items.length === 0 ? (
        <p className="italic">
          No {heading.toLowerCase()} available yet.
        </p>
      ) : (
        <ul className="divide-y">
          {items.map((item) => (
            <li key={item.id} className="py-3">
              <a href={item.url} target="_blank" className="hover:underline">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    className="w-full rounded mb-1"
                    alt={item.title}
                  />
                )}
                <h3 className="font-medium">{item.title}</h3>
                <time className="text-xs text-gray-500 block">
                  {new Date(item.date).toLocaleDateString()}
                </time>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
