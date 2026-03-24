import Link from "next/link"
import { Linkedin, Youtube, Twitter } from "lucide-react"
import { siteConfig } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E5E0]/10 bg-[#0A0A0A]">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-[#d2ccc3]">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-[#d2ccc3] hover:text-[#C45A3C] transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href={siteConfig.links.youtube} target="_blank" rel="noopener noreferrer">
              <Youtube className="h-5 w-5 text-[#d2ccc3] hover:text-[#C45A3C] transition-colors" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href={siteConfig.links.x} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 text-[#d2ccc3] hover:text-[#C45A3C] transition-colors" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
