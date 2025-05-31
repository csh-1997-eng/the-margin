import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Briefcase, GraduationCap, Award, Code } from "lucide-react"

export const metadata: Metadata = {
  title: "Resume | Personal Hub",
  description: "My professional experience, education, and skills.",
}

export default function ResumePage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Resume</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Personal Info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <img src="/placeholder.svg?height=128&width=128" alt="Profile" className="object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">John Doe</h2>
                <p className="text-xl text-muted-foreground mb-4">Full Stack Developer</p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> john@example.com
                  </p>
                  <p>
                    <strong>Location:</strong> San Francisco, CA
                  </p>
                  <p>
                    <strong>Website:</strong> johndoe.dev
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Experienced Full Stack Developer with over 5 years of expertise in building modern web applications.
              Specialized in React, Next.js, Node.js, and cloud technologies. Passionate about creating performant,
              accessible, and user-friendly applications. Strong background in leading development teams and mentoring
              junior developers.
            </p>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">Senior Frontend Developer</h3>
                  <p className="text-muted-foreground">TechCorp Inc.</p>
                </div>
                <p className="text-sm text-muted-foreground">Jan 2023 - Present</p>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Led the frontend development of the company's flagship SaaS product</li>
                <li>Implemented a component library that improved development speed by 40%</li>
                <li>Mentored junior developers and conducted code reviews</li>
                <li>Reduced bundle size by 35% through code splitting and lazy loading</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                  <p className="text-muted-foreground">WebSolutions LLC</p>
                </div>
                <p className="text-sm text-muted-foreground">Mar 2020 - Dec 2022</p>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Developed and maintained multiple client websites and web applications</li>
                <li>Implemented RESTful APIs and database schemas</li>
                <li>Integrated third-party services and payment gateways</li>
                <li>Improved site performance and SEO rankings for clients</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">Junior Web Developer</h3>
                  <p className="text-muted-foreground">Digital Agency Co.</p>
                </div>
                <p className="text-sm text-muted-foreground">Jun 2018 - Feb 2020</p>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Built responsive websites for various clients</li>
                <li>Collaborated with designers to implement UI/UX designs</li>
                <li>Maintained existing client websites and fixed bugs</li>
                <li>Assisted in the development of internal tools</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">Master of Science in Computer Science</h3>
                  <p className="text-muted-foreground">Stanford University</p>
                </div>
                <p className="text-sm text-muted-foreground">2016 - 2018</p>
              </div>
              <p>Specialized in Human-Computer Interaction and Web Technologies</p>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
                  <p className="text-muted-foreground">University of California, Berkeley</p>
                </div>
                <p className="text-sm text-muted-foreground">2012 - 2016</p>
              </div>
              <p>Minor in User Experience Design</p>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                    "Redux",
                    "GraphQL",
                  ].map((skill) => (
                    <div key={skill} className="bg-muted px-3 py-1 rounded-full text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "REST APIs", "Firebase"].map(
                    (skill) => (
                      <div key={skill} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">DevOps & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {["Git", "GitHub", "CI/CD", "Docker", "AWS", "Vercel", "Jest", "Cypress"].map((skill) => (
                    <div key={skill} className="bg-muted px-3 py-1 rounded-full text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Other</h3>
                <div className="flex flex-wrap gap-2">
                  {["UI/UX Design", "Figma", "Agile", "Scrum", "Technical Writing", "SEO", "Accessibility"].map(
                    (skill) => (
                      <div key={skill} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">AWS Certified Developer - Associate</h3>
                <p className="text-sm text-muted-foreground">2023</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Google Professional Cloud Developer</h3>
                <p className="text-sm text-muted-foreground">2022</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Meta Frontend Developer Professional Certificate</h3>
                <p className="text-sm text-muted-foreground">2021</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
