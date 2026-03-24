import Link from "next/link"
import { siteConfig } from "@/lib/site"

const proofPoints = [
  {
    title: "Editorial Lens",
    body: "The Margin focuses on strategy, systems, execution, and the decisions that compound into leverage.",
  },
  {
    title: "Formats",
    body: "The work moves across writing, video, and live commentary so an idea can evolve from note to narrative to conversation.",
  },
  {
    title: "Founder-Led",
    body: "Cole Hoffman shapes the voice, framing, and point of view while building a longer-term media company around the publication.",
  },
]

export default function EditorialProof() {
  return (
    <div className="panel rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#C45A3C]">05</p>
          <h2 className="font-display mt-2 text-5xl leading-none md:text-6xl">Editorial Footprint</h2>
          <p className="mt-4 max-w-2xl text-sm text-[#d2ccc3] md:text-base">
            The Margin is designed to feel like a publication, not a portfolio: recurring ideas, multiple formats,
            and a founder-led point of view.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-[#C45A3C]">
          <Link href={siteConfig.routes.writing} className="hover:text-[#E8E5E0]">
            Writing
          </Link>
          <Link href={siteConfig.routes.video} className="hover:text-[#E8E5E0]">
            Video
          </Link>
          <Link href={siteConfig.routes.feed} className="hover:text-[#E8E5E0]">
            Feed
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {proofPoints.map((point) => (
          <article key={point.title} className="rounded-2xl border border-[#E8E5E0]/15 bg-[#111111]/70 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#C45A3C]">{point.title}</p>
            <p className="mt-3 text-sm leading-6 text-[#d2ccc3]">{point.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
