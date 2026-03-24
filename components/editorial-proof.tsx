import Link from "next/link"
import { siteConfig } from "@/lib/site"

const proofPoints = [
  {
    title: "Editorial Lens",
    lines: [
      "Strategy, systems, execution, and the decisions that compound into leverage.",
      "Focus on how things actually work, not how they are presented.",
    ],
  },
  {
    title: "Formats",
    lines: [
      "Ideas move.",
      "From note to narrative to conversation. Each format exists to push the thinking further.",
    ],
  },
  {
    title: "Founder-Led",
    lines: [
      "Shaped by a single point of view.",
      "Not consensus. Not committee.",
      "Built deliberately, over time.",
    ],
  },
]

export default function EditorialProof() {
  return (
    <div className="panel rounded-3xl p-6 md:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#C45A3C]">05</p>
        <h2 className="font-display mt-2 text-5xl leading-none md:text-6xl">Editorial Footprint</h2>
        <div className="mt-4 max-w-2xl space-y-1 text-sm text-[#d2ccc3] md:text-base">
          <p>The Margin is a publication, not a portfolio.</p>
          <p>Recurring ideas. Multiple formats. A clear point of view.</p>
        </div>
      </div>

      <div className="mt-6 border-y border-[#E8E5E0]/12 py-4">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.18em] text-[#C45A3C] md:gap-x-10">
          <Link href={siteConfig.routes.writing} className="hover:text-[#E8E5E0]">
            Margin Notes
          </Link>
          <Link href={siteConfig.routes.video} className="hover:text-[#E8E5E0]">
            Broadcast
          </Link>
          <Link href={siteConfig.routes.feed} className="hover:text-[#E8E5E0]">
            Signal
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {proofPoints.map((point) => (
          <article key={point.title} className="rounded-2xl border border-[#E8E5E0]/15 bg-[#111111]/70 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#C45A3C]">{point.title}</p>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[#d2ccc3]">
              {point.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
