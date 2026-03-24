export const siteConfig = {
  name: "The Margin",
  shortName: "The Margin",
  founderName: "Cole Hoffman",
  founderRole: "Founder and Editor",
  description: "Founder-led media company exploring strategy, systems, and execution.",
  location: "New York, NY",
  generator: "the-margin",
  ogImage: "/branding/margin_logo_transparent.png",
  links: {
    github: "https://github.com/csh-1997-eng",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/connect2colehoffman/",
    youtube: "https://www.youtube.com/@lordcolton.mp3",
    x: "https://x.com/lordcolton_exe",
    writing: process.env.SUBSTACK_URL || "https://colehoffman.substack.com",
    contact: process.env.NEXT_PUBLIC_CONTACT_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` : "mailto:hello@the-margin.com",
  },
  routes: {
    writing: "/blog",
    video: "/youtube",
    feed: "/x-feed",
  },
}
