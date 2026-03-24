"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { siteConfig } from "@/lib/site"

const navigation = [
  { name: "Front Page", href: siteConfig.routes.home },
  { name: "Margin Notes", href: siteConfig.routes.writing },
  { name: "Broadcast", href: siteConfig.routes.video },
  { name: "Signal", href: siteConfig.routes.feed },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 36)
      setHidden(y > 80)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full py-3 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between px-1 md:px-2 transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/branding/margin_logo_transparent.png"
                alt="The Margin wordmark"
                width={760}
                height={760}
                className="h-14 w-auto shrink-0"
                priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-5">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative inline-flex items-center text-xs uppercase tracking-[0.2em] transition-colors ${
                    isActive ? "text-[#C45A3C] nav-pulse-text" : "text-[#d2ccc3] hover:text-[#E8E5E0]"
                  }`}
                >
                  <span className="nav-shutter nav-glitch-word" data-text={item.name}>
                    {item.name}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#C45A3C] transition-all duration-300 ${
                      isActive ? "w-full nav-pulse-line" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            })}
            <Link
              href={siteConfig.routes.about}
              className={`group relative inline-flex items-center text-xs uppercase tracking-[0.2em] transition-colors ${
                pathname === siteConfig.routes.about ? "text-[#C45A3C] nav-pulse-text" : "text-[#C45A3C] hover:text-[#E8E5E0]"
              }`}
            >
              <span className="nav-shutter nav-glitch-word" data-text="About">
                About
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#C45A3C] transition-all duration-300 ${
                  pathname === siteConfig.routes.about ? "w-full nav-pulse-line" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </nav>

          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#E8E5E0] hover:bg-[#E8E5E0]/10"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container pt-2">
            <div className="panel rounded-2xl p-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-xs uppercase tracking-[0.18em] transition-colors hover:text-[#C45A3C] ${
                    pathname === item.href ? "text-[#C45A3C]" : "text-[#d2ccc3]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={siteConfig.routes.about}
                className="block text-xs uppercase tracking-[0.18em] text-[#C45A3C] transition-colors hover:text-[#E8E5E0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
