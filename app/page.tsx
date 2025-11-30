"use client"

import Hero from "@/components/hero"
import Projects from "@/components/projects"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-foreground">
      {/* Animated LSU glow background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Purple / gold blobs */}
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-purple-600/40 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -right-10 h-80 w-80 rounded-full bg-amber-400/40 blur-3xl animate-[pulse_14s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,255,0.18)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(251,191,36,0.18)_0,_transparent_55%)]" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(148,163,184,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.4)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10 md:py-16">
        {/* HERO */}
        <Hero />

        {/* Tech stack */}
        <section className="space-y-4" aria-labelledby="tech-stack-heading">
          <h2
            id="tech-stack-heading"
            className="text-2xl font-semibold text-white"
          >
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Flutter",
              "Go",
              "Python · PyTorch",
              "C++ · HPX",
              "AWS · Amplify · DynamoDB",
              "Supabase",
              "Next.js · React",
              "PostgreSQL",
            ].map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="bg-white/10 text-xs text-slate-100 backdrop-blur"
              >
                {item}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="space-y-4"
          aria-labelledby="experience-heading"
        >
          <h2
            id="experience-heading"
            className="text-2xl font-semibold text-white"
          >
            Experience
          </h2>

          <div className="space-y-4">
            {/* Software / Research roles */}
            <Card className="border-white/10 bg-slate-900/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base text-slate-50">
                  Software Engineer & Research Roles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-slate-300">
                <p>· AI/ML & HPC research at LSU (HPX, CFD, PyTorch).</p>
                <p>· Open-source tooling for developer productivity and eye-tracking research.</p>
                <p>· Backend + Flutter work for apps used by LSU students and research groups.</p>
              </CardContent>
            </Card>

            {/* GDG @ LSU leadership */}
            <Card className="border-purple-400/30 bg-slate-900/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base text-purple-100">
                  Board Member & Project Lead — GDG @ LSU
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-200">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Hosted and organized hackathons for LSU students.</li>
                  <li>
                    Built and led development of the{" "}
                    <span className="font-semibold">GDG@LSU.org</span> website.
                  </li>
                  <li>
                    Project Lead for <span className="font-semibold">GeauxApp</span>, on track to
                    launch for LSU students in Spring 2026.
                  </li>
                  <li>
                    Ran workshops across topics like <span className="font-semibold">C++</span>,{" "}
                    <span className="font-semibold">parallel programming</span>, and{" "}
                    <span className="font-semibold">Flutter</span>.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects */}
        <Projects />

        {/* Footer */}
        <footer className="mt-4 border-t border-white/10 pt-4 text-xs text-slate-400">
          © {new Date().getFullYear()} Dina Taing. Built with Next.js & shadcn/ui.
        </footer>
      </div>
    </main>
  )
}
