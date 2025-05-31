import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ProfileSection() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <img src="/placeholder.svg?height=128&width=128" alt="Profile" className="object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">John Doe</h1>
            <p className="text-muted-foreground mb-4">Full Stack Developer | Content Creator | Tech Enthusiast</p>
            <p className="mb-4 max-w-2xl">
              I build web applications, create technical content, and share my journey in tech. This hub aggregates all
              my online presence in one place.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button asChild>
                <Link href="/resume">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
