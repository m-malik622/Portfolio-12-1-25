"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type CodeSample = {
  label: string           // e.g. "main.dart"
  url: string             // raw GitHub URL
  repoUrl?: string
  challenge?: string
}

type Project = {
  id: string
  title: string
  year: string
  summary: string
  tech: string[]
  details: string[]
  highlights?: string[]
  userExperience?: string[]
  image?: string
  screens?: string[]
  codeSamples?: CodeSample[]
}

function CodePreview({ sample }: { sample: CodeSample }) {
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const res = await fetch(sample.url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        if (!cancelled) {
          setCode(text)
          setError(null)
          setExpanded(false) // reset when switching samples
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) {
          setError("Failed to load code snippet.")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [sample.url])

  let displayCode = code ?? ""
  let isTruncated = false

  if (code && !expanded) {
    const lines = code.split("\n")
    if (lines.length > 80) {
      displayCode = lines.slice(0, 80).join("\n")
      isTruncated = true
    }
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-300">
            Code – {sample.label}
          </h3>
          {sample.challenge && (
            <p className="text-[11px] text-slate-300">
              <span className="font-semibold">Challenge:</span> {sample.challenge}
            </p>
          )}
        </div>

        {sample.repoUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-md border-amber-400/60 bg-amber-400/10 text-xs text-amber-100 hover:bg-amber-400/20"
          >
            <a href={sample.repoUrl} target="_blank" rel="noreferrer">
              View Repo
            </a>
          </Button>
        )}
      </div>

      <div className="relative flex-1 overflow-auto rounded-md bg-black/90 p-4 text-xs font-mono text-emerald-200">
        {loading && <p>Loading code...</p>}
        {error && <p>{error}</p>}
        {code && (
          <>
            <pre className="whitespace-pre">{displayCode}</pre>
            {!expanded && isTruncated && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/95 to-black/0" />
            )}
          </>
        )}
      </div>

      {isTruncated && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-amber-200 hover:bg-amber-400/10"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "View more"}
          </Button>
        </div>
      )}
    </div>
  )
}

// TODO: replace YOUR_USER + paths with your actual GitHub raw URLs + repos
const projects: Project[] = [
  {
    id: "municipal",
    title: "Municipal – Hazard Reporting App",
    year: "2024",
    summary:
      "A real-time hazardous infrastructure reporting app built with Flutter, AWS Amplify, DynamoDB, and AWS Lambda. Municipal empowers citizens to quickly report hazardous issues such as potholes, broken streetlights, flooding, unsafe intersections, and other municipal problems. Reports appear instantly on an interactive map, enabling rapid response and improved public safety.",
    tech: ["Flutter", "AWS Amplify", "DynamoDB", "Lambda"],
    details: [
      "Designed and built the end-to-end mobile app, from Flutter UI to AWS backend.",
      "Implemented geo-tagged reports with photos, categories, and status tracking.",
      "Integrated AWS Amplify, DynamoDB, and Lambda for a scalable serverless architecture.",
    ],
    highlights: [
      "Awarded Best Capstone Project.",
      "Nominated for the Engineering Excellence Award in Louisiana.",
    ],
    userExperience: [
      "Citizens open the app and immediately see a map of nearby reported hazards.",
      "To submit a new report, users take a photo, select a category, and confirm their location.",
      "The report appears on the map in real time, and users can track its status as the municipality updates it.",
    ],
    image: "/projects/municipal-cover.png",
    screens: [
      "/projects/muncipal/1.png",
      "/projects/muncipal/2.jpg",
      "/projects/muncipal/3.jpg",
      "/projects/muncipal/4.png",
    ],
    codeSamples: [
      {
        label: "LandingPage.dart",
        url: "https://raw.githubusercontent.com/dtaing11/MuniciPal/refs/heads/master/municipal/lib/Page/LandingPage.dart",
        repoUrl: "https://github.com/dtaing11/MuniciPal/tree/master/municipal",
        challenge:
          "Designing a custom map marker while ensuring accurate placement and preventing visual clutter when multiple reports appear."
      },
    ],
  },
  {
    id: "SportApp",
    title: "PickleKing – Pickleball Ranking App",
    year: "2024",
    summary:
      "A cross-platform Pickleball tracking app built with Flutter and Supabase. This app helps players play with friends, create groups, track match results, and rank themselves to see who is the best.",
    tech: ["Flutter", "Provider", "PostgreSQL", "Supabase"],
    details: [
      "Designed and built the end-to-end mobile app using Flutter with Provider for clean state management.",
      "Implemented player profiles, match recording, and dynamic ELO/Glicko updates backed by Supabase Postgres.",
      "Integrated Supabase Auth for secure user authentication and session management across devices.",
      "Built real-time leaderboards and match updates using Supabase Realtime for instant syncing.",
      "Used Supabase Storage to handle profile avatars and uploaded images.",
    ],
    highlights: ["ELO Ranking System", "Live Score Update", "Groups & Club"],
    userExperience: [
      "Players open the app and instantly see their current rating, recent matches, and active groups.",
      "To start a game, users create or join a match lobby with friends and record scores as soon as the match ends.",
      "Rankings update immediately after each game, allowing players to see real-time changes powered by ELO/Glicko.",
      "Users explore leaderboards to compare rankings across friends, local clubs, or custom groups they join.",
      "Each player can review detailed match history, including opponents, scorelines, and rating changes.",
      "Groups provide a community space where players can track shared leaderboards and compete within their club.",
      "The experience is seamless across iOS and Android, giving players consistent access to stats anytime, anywhere.",
    ],
    image: "/projects/municipal-cover.png",
    screens: [
      "/projects/pickleball/1.png",
      "/projects/pickleball/2.png",
      "/projects/pickleball/3.png",
      "/projects/pickleball/4.png",
      "/projects/pickleball/5.png",
    ],
    codeSamples: [
      {
        label: "LandingPage.dart",
        url: "https://raw.githubusercontent.com/dtaing11/MuniciPal/refs/heads/master/municipal/lib/Page/LandingPage.dart",
        repoUrl: "https://github.com/YOUR_USER/eyetracking-plugin",
        challenge:
          "Create a custom icon to place on map and calculate positions while keeping the map from looking cluttered.",
      },
      {
        label: "python_bridge.py",
        url: "https://raw.githubusercontent.com/YOUR_USER/eyetracking-plugin/main/python/bridge.py",
        repoUrl: "https://github.com/YOUR_USER/eyetracking-plugin",
        challenge:
          "Streaming Tobii events in a robust line-based JSON protocol that works across OSes.",
      },
    ],
  },
  {
    id: "eyetracking-plugin",
    title: "Eye-Tracking JetBrains Plugin",
    year: "2025 - Present",
    summary:
      "IntelliJ plugin integrating Tobii eye-tracking data for AI4SE research on how developers read and debug code.",
    tech: ["Java", "IntelliJ Platform SDK", "Docker", "Python"],
    details: [
      "Implemented the IntelliJ plugin layer that subscribes to gaze events from a Python/Tobii service.",
      "Mapped raw gaze coordinates onto editor elements like lines, tokens, and panels.",
      "Logged time-series gaze data and IDE context for later ML analysis.",
    ],
    highlights: [
      "Actively used by an AI4SE research community.",
      "Built to be open-source and extensible for future studies.",
    ],
    userExperience: [
      "Researchers install the plugin and run coding or debugging tasks inside IntelliJ.",
      "While the developer works, gaze points are streamed without interrupting their workflow.",
      "After a session, logs are exported for analysis of gaze patterns and attention hotspots.",
    ],
    image: "/projects/eyetracking-plugin.png",
    codeSamples: [
      {
        label: "GazeListener.java",
        url: "https://raw.githubusercontent.com/YOUR_USER/eyetracking-plugin/main/src/main/java/.../GazeListener.java",
        repoUrl: "https://github.com/YOUR_USER/eyetracking-plugin",
        challenge:
          "Mapping raw gaze coordinates to editor elements while keeping the plugin responsive.",
      },
      {
        label: "python_bridge.py",
        url: "https://raw.githubusercontent.com/YOUR_USER/eyetracking-plugin/main/python/bridge.py",
        repoUrl: "https://github.com/YOUR_USER/eyetracking-plugin",
        challenge:
          "Streaming Tobii events in a robust line-based JSON protocol that works across OSes.",
      },
    ],
  },
  {
    id: "texas-holdem",
    title: "Texas Hold'em Engine",
    year: "2025",
    summary:
      "Go-based Texas Hold'em engine with WebSocket multiplayer support and Cloud Run deployment.",
    tech: ["Go", "WebSockets", "Cloud Run"],
    details: [
      "Implemented full Texas Hold'em rules, including blinds, betting rounds, and showdown logic.",
      "Exposed a WebSocket API for players, spectators, and a host controller.",
      "Deployed the engine as a stateless service on Cloud Run for simple scaling.",
    ],
    highlights: [
      "Supports bots, simulations, and real-time multiplayer.",
      "Designed protocol so multiple front-ends (CLI, web, mobile) can reuse the same engine.",
    ],
    userExperience: [
      "Players connect via a client that speaks a simple WebSocket protocol to the engine.",
      "A host can create tables, start hands, and manage the game flow.",
      "All players see community cards, pot updates, and actions in real time.",
    ],
    image: "/projects/texas-holdem.png",
    codeSamples: [
      {
        label: "server.go",
        url: "https://raw.githubusercontent.com/YOUR_USER/texas-holdem-engine/main/cmd/server/main.go",
        repoUrl: "https://github.com/YOUR_USER/texas-holdem-engine",
        challenge:
          "Coordinating game state across multiple WebSocket connections with minimal race conditions.",
      },
      {
        label: "engine.go",
        url: "https://raw.githubusercontent.com/YOUR_USER/texas-holdem-engine/main/internal/engine/engine.go",
        repoUrl: "https://github.com/YOUR_USER/texas-holdem-engine",
        challenge:
          "Structuring the engine so AI bots and human players can share the same core logic.",
      },
    ],
  },
  {
    id: "hpc-ml-cfd",
    title: "HPC & ML for CFD",
    year: "2024–2025",
    summary:
      "Runtime and ML optimizations to reduce CFD simulation time and accelerate engineering workflows.",
    tech: ["C++", "HPX", "ML", "CFD"],
    details: [
      "Optimized HPX-based C++ simulation components to better utilize shared-thread execution.",
      "Experimented with ML models to approximate CFD outputs and reduce full simulation runs.",
      "Benchmarked performance and accuracy tradeoffs with research collaborators.",
    ],
    highlights: [
      "Bridges traditional HPC with modern ML acceleration.",
      "Targets large speedups for engineers waiting on long-running CFD jobs.",
    ],
    userExperience: [
      "Engineers submit CFD jobs through their usual workflow.",
      "Behind the scenes, runtime optimizations and ML shortcuts reduce turnaround time.",
      "For some workloads, they can choose ML-accelerated prediction instead of full simulation.",
    ],
    image: "/projects/hpc-ml-cfd.png",
    codeSamples: [
      {
        label: "solver.cpp",
        url: "https://raw.githubusercontent.com/YOUR_USER/hpc-ml-cfd/main/src/solver.cpp",
        repoUrl: "https://github.com/YOUR_USER/hpc-ml-cfd",
        challenge:
          "Tuning HPX parallelism while keeping numerical behavior stable and predictable.",
      },
      {
        label: "ml_model.py",
        url: "https://raw.githubusercontent.com/YOUR_USER/hpc-ml-cfd/main/ml/model.py",
        repoUrl: "https://github.com/YOUR_USER/hpc-ml-cfd",
        challenge:
          "Designing a model that’s accurate enough for engineers to trust as a shortcut.",
      },
    ],
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeSampleIndex, setActiveSampleIndex] = useState(0)
  const [activeScreenIndex, setActiveScreenIndex] = useState(0)

  useEffect(() => {
    setActiveSampleIndex(0)
    setActiveScreenIndex(0)
  }, [activeProject?.id])

  return (
    <section id="projects" className="relative min-h-screen space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold text-white">Highlighted Projects</h2>
        <span className="hidden text-xs uppercase tracking-[0.2em] text-amber-300/80 md:inline">
          Selected work
        </span>
      </div>

      {/* Grid of preview cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveProject(project)}
            className="cursor-pointer"
          >
            <Card className="h-full border border-white/10 bg-slate-900/80 backdrop-blur shadow-md shadow-purple-900/40 hover:border-purple-400/50 hover:shadow-purple-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base text-slate-50">
                    {project.title}
                  </CardTitle>
                  <span className="text-[11px] font-medium text-amber-300">
                    {project.year}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="line-clamp-3 text-slate-300">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-100 border border-purple-400/40"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-amber-300">
                  Click to open full case study →
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Full-screen project view */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Page container */}
            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
              {/* Top bar */}
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-3 md:px-8">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-100 hover:bg-slate-800/80"
                    onClick={() => setActiveProject(null)}
                  >
                    ← Back
                  </Button>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      Project
                    </span>
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm font-semibold text-slate-50 md:text-base">
                        {activeProject.title}
                      </h1>
                      <span className="rounded-full bg-amber-400/15 px-2 py-[2px] text-[11px] font-medium text-amber-300 border border-amber-400/40">
                        {activeProject.year}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden flex-wrap gap-2 text-[11px] md:flex">
                  {activeProject.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="bg-purple-500/30 text-purple-50 border border-purple-400/60"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </header>

              {/* Main content: 1 or 2 columns depending on codeSamples */}
              <main
                className={
                  "grid gap-4 px-4 py-4 md:px-8 md:py-6 lg:py-8 " +
                  (activeProject.codeSamples?.length ? "md:grid-cols-2" : "md:grid-cols-1")
                }
              >
                {/* LEFT: images + description */}
                <section className="space-y-4 rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-xl shadow-purple-900/40 md:p-6">
                  {/* Main screenshot area */}
                  {(activeProject.screens && activeProject.screens.length > 0) ||
                  activeProject.image ? (
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <div className="inline-block overflow-hidden rounded-[1.75rem] border border-slate-700 bg-black shadow-xl shadow-black/60">
                          <Image
                            src={
                              activeProject.screens && activeProject.screens.length > 0
                                ? activeProject.screens[activeScreenIndex]
                                : (activeProject.image as string)
                            }
                            alt={activeProject.title}
                            width={360}
                            height={780}
                            className="block h-auto w-full max-w-[10rem] md:max-w-[12rem] object-contain"
                          />
                        </div>
                      </div>

                      {/* Thumbnails */}
                      {activeProject.screens && activeProject.screens.length > 1 && (
                        <div className="flex justify-center gap-2 overflow-x-auto pt-1">
                          {activeProject.screens.map((src, idx) => {
                            const isActive = idx === activeScreenIndex
                            return (
                              <button
                                key={src}
                                type="button"
                                onClick={() => setActiveScreenIndex(idx)}
                                className={[
                                  "flex items-center justify-center rounded-xl border px-1 py-1 transition",
                                  isActive
                                    ? "border-amber-400 ring-2 ring-amber-400/60 bg-black"
                                    : "border-slate-600 bg-black hover:border-amber-300/80",
                                ].join(" ")}
                              >
                                <Image
                                  src={src}
                                  alt={`${activeProject.title} screen ${idx + 1}`}
                                  width={80}
                                  height={160}
                                  className="block h-auto w-auto max-h-16 object-contain"
                                />
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* Text content below */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-50 md:text-2xl">
                        {activeProject.title}
                      </h2>
                      <p className="text-sm text-slate-300">
                        {activeProject.summary}
                      </p>
                    </div>

                    {activeProject.highlights && activeProject.highlights.length > 0 && (
                      <div className="space-y-1">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                          Highlights
                        </h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-200">
                          {activeProject.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-1">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                        What I did
                      </h3>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-200">
                        {activeProject.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>

                    {activeProject.userExperience && (
                      <div className="space-y-1">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                          User Experience
                        </h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-200">
                          {activeProject.userExperience.map((ux, i) => (
                            <li key={i}>{ux}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech on small screens */}
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] md:hidden">
                      {activeProject.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="border-purple-400/60 text-purple-100"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </section>

                {/* RIGHT: code panel – only if there is code */}
                {activeProject.codeSamples && activeProject.codeSamples.length > 0 && (
                  <section className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-xl shadow-purple-900/40 md:p-6">
                    {/* Tabs */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                        Code Samples
                      </span>

                      <div className="inline-flex flex-wrap gap-2 rounded-lg bg-slate-800/80 p-1">
                        {activeProject.codeSamples.map((sample, idx) => {
                          const isActive = idx === activeSampleIndex
                          return (
                            <button
                              key={sample.label}
                              type="button"
                              onClick={() => setActiveSampleIndex(idx)}
                              className={[
                                "min-w-[80px] rounded-md px-3 py-1 text-[11px] font-mono transition",
                                isActive
                                  ? "bg-slate-950 text-amber-200 border border-amber-400/70 shadow-sm shadow-amber-400/40"
                                  : "bg-slate-800 text-slate-200 border border-transparent hover:bg-slate-900 hover:text-amber-100",
                              ].join(" ")}
                            >
                              {sample.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Code viewer – only this scrolls */}
                    <div className="min-h-[260px] md:min-h-[340px]">
                      <CodePreview
                        sample={
                          activeProject.codeSamples[activeSampleIndex] as CodeSample
                        }
                      />
                    </div>
                  </section>
                )}
              </main>

              {/* Mobile close at bottom */}
              <footer className="flex items-center justify-center border-t border-white/10 bg-slate-950/90 px-4 py-2 md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-500 text-slate-100 hover:bg-slate-800"
                  onClick={() => setActiveProject(null)}
                >
                  Close
                </Button>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
