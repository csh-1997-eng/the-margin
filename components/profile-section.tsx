import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/site"

const focusAreas = [
  "how systems actually behave under pressure",
  "how incentives shape decisions",
  "and how non-obvious ideas turn into real outcomes",
]

export default function ProfileSection() {
  return (
    <Card className="relative overflow-hidden border-[#E8E5E0]/15 bg-[#111111]/70">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/media/laguna.jpeg')" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/62 via-[#0A0A0A]/72 to-[#0A0A0A]/86" aria-hidden="true" />
      <CardContent className="relative z-10 p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border border-[#E8E5E0]/20">
            <img
              src="/media/headshot.JPG"
              alt={`${siteConfig.founderName}, founder of ${siteConfig.name}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C45A3C]">Founder Note</p>
            <h3 className="font-display mt-2 mb-2 text-4xl">{siteConfig.name}</h3>
            <p className="mb-4 text-[#d2ccc3]">Founded by {siteConfig.founderName}</p>
            <p className="mb-4 max-w-2xl text-[#E8E5E0]">The Margin is where the real notes are.</p>
            <div className="mb-4 max-w-2xl space-y-1 text-[#d2ccc3]">
              <p>Not the headline.</p>
              <p>Not the consensus.</p>
              <p>The part people skip,</p>
              <p>but the part that actually matters.</p>
            </div>
            <div className="mb-4 max-w-2xl space-y-1 text-[#d2ccc3]">
              <p>In investing, that&apos;s where alpha lives.</p>
              <p>In writing, it&apos;s where the thinking happens.</p>
              <p>In strategy, it&apos;s where you find what others miss.</p>
            </div>
            <p className="mb-3 max-w-2xl text-[#d2ccc3]">This is a media company focused on:</p>
            <ul className="mb-4 max-w-2xl space-y-2 text-[#d2ccc3]">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-3">
                  <span className="mt-1 text-[#C45A3C]">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
            <p className="max-w-2xl text-[#d2ccc3]">Across markets, technology, psychology, and history.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
