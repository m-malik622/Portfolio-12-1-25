"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Technologies, cn } from "@/lib/utils";

type CodeSample = {
  label: string; // e.g. "main.dart"
  url: string; // raw GitHub URL
  repoUrl?: string;
  challenge?: string;
};

interface ProjectsProps {
  selectedTechs: Set<string>;
}

type Project = {
  id: string;
  title: string;
  year: string;
  summary: string;
  tech: { name: string; category: string }[];
  details: string[];
  highlights?: string[];
  userExperience?: string[];
  image?: string;
  screens?: string[];
  codeSamples?: CodeSample[];
  repoUrl?: string;
  showCodePreview?: boolean;
};

/* ------------------------- Helpers ------------------------- */

function guessLanguage(label: string): string {
  const lower = label.toLowerCase();

  if (lower.endsWith(".dart")) return "dart";
  if (lower.endsWith(".ts") || lower.endsWith(".tsx")) return "typescript";
  if (lower.endsWith(".js") || lower.endsWith(".jsx")) return "javascript";
  if (lower.endsWith(".py")) return "python";
  if (lower.endsWith(".go")) return "go";
  if (lower.endsWith(".cpp") || lower.endsWith(".cc") || lower.endsWith(".hpp"))
    return "cpp";
  if (lower.endsWith(".java")) return "java";

  return "text";
}

function ExpandableList({
  title,
  items,
  initialCount = 3,
}: {
  title: string;
  items: string[];
  initialCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, initialCount);
  const isTruncated = items.length > initialCount;

  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-300">
        {title}
      </h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-200">
        {visibleItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {isTruncated && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 text-[11px] font-medium text-amber-300 hover:text-amber-200 underline underline-offset-2"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

/* ------------------------ CodePreview ------------------------ */
function CodePreview({ sample }: { sample: CodeSample }) {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(sample.url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!cancelled) {
          setCode(text);
          setError(null);
          setExpanded(false); // reset when switching samples
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Failed to load code snippet.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [sample.url]);

  const language = guessLanguage(sample.label);

  // --- truncation logic ---
  const totalLines = code ? code.split("\n").length : 0;
  const hasMore = totalLines > 80;

  let displayCode = code ?? "";
  if (code && hasMore && !expanded) {
    displayCode = code.split("\n").slice(0, 80).join("\n");
  }

  return (
    <motion.div
      layout
      initial={false}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      className="flex flex-col gap-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-300">
            Code – {sample.label}
          </h3>
          {sample.challenge && (
            <p className="text-[11px] text-slate-300">
              <span className="font-semibold">Challenge:</span>{" "}
              {sample.challenge}
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

      {/* Code container — height animates smoothly */}
      <div
        className={[
          "relative overflow-y-auto overflow-x-hidden rounded-md bg-black/90",
          "transition-[max-height] duration-300 ease-out",
          expanded ? "max-h-[80vh]" : "max-h-[40vh] md:max-h-[60vh]",
        ].join(" ")}
      >
        {loading && <p className="px-2 py-1 text-xs">Loading code...</p>}
        {error && <p className="px-2 py-1 text-xs text-red-300">{error}</p>}
        {code && (
          <>
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                background: "transparent",
                fontSize: "0.72rem", // good on phone
                padding: "0.75rem",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
              codeTagProps={{
                style: {
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                },
              }}
              wrapLongLines
            >
              {displayCode}
            </SyntaxHighlighter>

            {/* fade only when collapsed */}
            {hasMore && !expanded && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/95 to-black/0" />
            )}
          </>
        )}
      </div>

      {/* View more / Show less */}
      {hasMore && (
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
    </motion.div>
  );
}
/* ------------------------ Projects Data ------------------------ */
const projects: Project[] = [
  {
    id: "heritera",
    title: "Project Heritera",
    year: "2025",
    summary:
      "A full-stack platform where users discover unique Louisiana heritage languages and share custom-made courses with the public or friends. Built using Django, React, and JWT-based authentication.",
    tech: [
      Technologies.PYTHON,
      Technologies.DJANGO,
      Technologies.FASTAPI,
      Technologies.REACT,
      Technologies.VERCEL,
      Technologies.JAVASCRIPT,
      Technologies.TYPESCRIPT,
      Technologies.NODE_JS,
      Technologies.CSS,
      Technologies.DOCKER,
      Technologies.GCP,
      Technologies.POSTGRESQL,
      Technologies.STORYBOOK,
      Technologies.GITHUB_ACTIONS,
      Technologies.UNIT_TESTING,
    ],
    details: [
      "Built full-stack web application with Django backend and React frontend to showcase cultural language content.",
      "Implemented role-based authentication and secure access using JWT tokens.",
      "Added automated testing workflows using Django Test Framework and React Storybook for component-level testing.",
      "Designed course-sharing system where users can create, publish, and share lessons publicly or privately.",
    ],
    highlights: [
      "Full-Stack Testing (Django Test + Storybook)",
      "JWT Authentication System",
      "Course Sharing & Heritage Content Platform",
    ],
    userExperience: [
      "Users browse public heritage-language courses with clean navigation and fast search.",
      "Creators can upload lessons, edit content, and publish courses for friends or the community.",
      "Authentication keeps personal courses private unless explicitly shared.",
    ],
    image: "",
    screens: [],
    repoUrl: "",
    showCodePreview: true,
    codeSamples: [],
  },

  {
    id: "geaux-app",
    title: "Geaux App – GDG@LSU Project Lead",
    year: "2025",
    summary:
      "Led 30+ developers in building a cross-platform campus app for LSU students, featuring events, organizations, and personalized campus discovery. Oversaw architecture, technical roadmap, and engineering workflow.",
    tech: [
      Technologies.FLUTTER,
      Technologies.TYPESCRIPT,
      Technologies.SUPABASE,
      Technologies.GCP,
      Technologies.NODE_JS,
      Technologies.SELENIUM,
    ],
    details: [
      "Designed high-level architecture for a Flutter-based mobile + web ecosystem using Provider for state management.",
      "Led sprint planning, PR review pipelines, and onboarding for 30+ developers ranging from beginner to advanced.",
      "Created client–server communication model using Supabase, middleware caching, and GCP VM routing.",
      "Established guidelines for modular Flutter development and scalable backend design.",
    ],
    highlights: [
      "Leadership of 30+ Developers",
      "Cross-Platform Architecture",
      "Campus Events, Orgs & Discovery Modules",
    ],
    userExperience: [
      "Students browse events, organizations, and recommendations tailored to campus life.",
      "Organizations post announcements and media visible instantly in the feed.",
      "Users enjoy consistent mobile + web experience built with Flutter.",
      "Middleware optimizes storage and reduces Supabase cost.",
    ],
    image: "",
    screens: [],
    repoUrl: "",
    showCodePreview: false,
  },

  {
    id: "gdsc-website",
    title: "GDSC LSU Website",
    year: "2024",
    summary:
      "A modern club website, serving as the central hub for LSU’s Google Developer Student Club.",
    tech: [
      Technologies.JAVASCRIPT,
      Technologies.TYPESCRIPT,
      Technologies.REACT,
      Technologies.HTML,
      Technologies.NODE_JS,
      Technologies.CSS,
      Technologies.VERCEL,
      Technologies.DOCKER,
      Technologies.FIREBASE,
    ],
    details: [
      "Designed and built interactive landing pages using Flutter Web.",
      "Implemented backend utilities in Go to support dynamic updates.",
      "Created responsive layouts and component-driven UI for rapid iteration.",
    ],
    highlights: [
      "Flutter Web",
      "Go Backend Utilities",
      "Club Branding Experience",
    ],
    userExperience: [
      "Visitors browse upcoming events, projects, and club resources.",
      "Mobile-first layout ensures smooth experience across all browsers.",
      "Admins update content through simple backend scripts.",
    ],
    image: "",
    screens: [],
    repoUrl: "",
    showCodePreview: false,
  },

  {
    id: "tutor-llm",
    title: "Tutor LLM – Multi-Agent Tutoring System",
    year: "2025",
    summary:
      "An AI tutoring platform supporting 100+ students across 25+ CS and physics topics. Uses a supervisor-based multi-agent system to deliver structured explanations and personalized help.",
    tech: [
      Technologies.LANGCHAIN,
      Technologies.FASTMCP,
      Technologies.PYTHON,
      Technologies.DJANGO,
      Technologies.REACT,
      Technologies.AWS,
      Technologies.TYPESCRIPT,
      Technologies.NODE_JS,
      Technologies.CSS,
      Technologies.SELENIUM,
      Technologies.GITHUB_ACTIONS,
    ],
    details: [
      "Built supervised multi-agent LLM system using LangChain with 3 specialized tutor models.",
      "Implemented FastAPI backend hosted on AWS with scalable endpoints.",
      "Built modern React frontend deployed on Vercel for seamless student access.",
      "Integrated topic routing, memory, and reasoning tools for consistent explanations.",
    ],
    highlights: [
      "Multi-Agent LLM System",
      "100+ Real Student Users",
      "AWS Deployment + React Frontend",
    ],
    userExperience: [
      "Students pick a topic and instantly receive structured tutoring responses.",
      "Supervisor agent routes questions to the correct domain tutor (CS, physics, etc.).",
      "Progress persists across sessions with account-based storage.",
    ],
    image: "",
    screens: [],
    repoUrl: "",
    showCodePreview: true,
    codeSamples: [],
  },

  {
    id: "professor-index",
    title: "Professor Index App – Research Project",
    year: "2024",
    summary:
      "A large-scale scraping and ETL pipeline collecting 8,000+ professor profiles and 14,000+ course records using Selenium and BeautifulSoup.",
    tech: [
      Technologies.PYTHON,
      Technologies.SUPABASE,
      Technologies.BEAUTIFUL_SOUP,
      Technologies.SELENIUM,
      Technologies.UNIT_TESTING,
      // ETL is a concept, not a specific technology from your list
    ],
    details: [
      "Developed and maintained 30+ scrapers for professor and course websites.",
      "Optimized ETL workflows to improve data access speed by 45%.",
      "Served 150+ student users with a searchable professor/course discovery tool.",
    ],
    highlights: ["Large-Scale ETL", "30+ Scrapers", "Research Collaboration"],
    userExperience: [
      "Students search for professors and compare ratings across departments.",
      "Data refreshes automatically with nightly scraping jobs.",
      "ETL optimizations reduce lookup delays and improve UX.",
    ],
    image: "",
    screens: [],
    repoUrl: "",
    showCodePreview: false,
  },

  {
    id: "auto-video-editor",
    title: "Automated Video Editor API",
    year: "2024",
    summary:
      "A Python-based API for automating video editing tasks for a YouTube channel with 2M+ subscribers. Handles trimming, transitions, overlays, and rendering.",
    tech: [
      Technologies.PYTHON,
      Technologies.MOVIEPY,
      Technologies.UNIT_TESTING,
    ],
    details: [
      "Built API to trim, merge, and enhance clips automatically.",
      "Added automated transitions, text overlays, and final render pipeline.",
      "Reduced manual video editing workload by over 70%.",
    ],
    highlights: [
      "MoviePy Automation",
      "YouTube API Integration",
      "70% Editing Time Reduction",
    ],
    userExperience: [
      "Creators upload raw clips and receive fully edited videos automatically.",
      "API handles rendering and uploads edited videos directly to YouTube draft.",
      "Configurable presets allow style consistency across content.",
    ],
    image: "",
    screens: [],
    repoUrl: "",
    showCodePreview: false,
  },

  {
    id: "social-media-app",
    title: "Social Media App – Confidential Prototype",
    year: "2023",
    summary:
      "A prototype social media platform built using HTML, CSS, and JavaScript, focused on user profiles, authentication, and responsive UI.",
    tech: [
      Technologies.HTML,
      Technologies.CSS,
      Technologies.JAVASCRIPT,
      Technologies.SELENIUM,
    ],
    details: [
      "Developed early-stage blueprint for a confidential social platform.",
      "Implemented login authentication and basic profile system.",
      "Designed responsive front-end layout optimized for mobile.",
    ],
    highlights: ["Auth Prototype", "Responsive UI", "Frontend Engineering"],
    userExperience: [
      "Users create accounts, log in, and view profile data.",
      "UI adapts smoothly across devices.",
      "Demo served as foundation for later iterations.",
    ],
    image: "",
    screens: [],
    repoUrl: "",
    showCodePreview: false,
  },
];

/* ------------------------ Component ------------------------ */

export default function Projects({ selectedTechs }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const filteredProjects =
    selectedTechs.size === 0
      ? projects
      : projects.filter((project) =>
          project.tech.some((tech) => selectedTechs.has(tech.name)),
        );

  return (
    <section id="projects" className="relative min-h-screen space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold text-slate-950">
          Highlighted Projects
        </h2>
        <span className="hidden text-xs uppercase tracking-[0.2em] text-amber-300/80 md:inline">
          Selected work
        </span>
      </div>

      {/* Grid of preview cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveProject(project);
              setActiveSampleIndex(0);
              setActiveScreenIndex(0);
            }}
            className="cursor-pointer"
          >
            <Card
              className={cn(
                "h-full border border-slate-200 bg-white/90 backdrop-blur shadow-sm shadow-slate-900/10 hover:border-purple-300 transition-all",
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base text-slate-950">
                    {project.title}
                  </CardTitle>
                  <span className="text-[11px] font-medium text-amber-700">
                    {project.year}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="line-clamp-3 text-slate-700">{project.summary}</p>
                <div className="flex min-h-11 flex-wrap gap-2 text-[11px]">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="border border-purple-300/80 bg-purple-100/90 text-purple-900"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-amber-700">
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
            className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
              {/* Top bar */}
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 md:px-8">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    onClick={() => setActiveProject(null)}
                  >
                    ← Back
                  </Button>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      Project
                    </span>
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm font-semibold text-slate-950 md:text-base">
                        {activeProject.title}
                      </h1>
                      <span className="rounded-full border border-amber-300/70 bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                        {activeProject.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden flex-wrap gap-2 text-[11px] md:flex">
                    {activeProject.tech.map((tech) => (
                      <Badge
                        key={tech.name}
                        variant="secondary"
                        className="border border-purple-300/80 bg-purple-100/90 text-purple-900"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                  {activeProject.repoUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-amber-300 bg-amber-100 text-xs text-amber-900 hover:bg-amber-200"
                    >
                      <a
                        href={activeProject.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Repo
                      </a>
                    </Button>
                  )}
                </div>
              </header>

              {/* Main content */}
              <main
                className={
                  "grid gap-4 px-4 py-4 md:px-8 md:py-6 lg:py-8 " +
                  (activeProject.showCodePreview !== false &&
                  activeProject.codeSamples &&
                  activeProject.codeSamples.length > 0
                    ? "md:grid-cols-2"
                    : "md:grid-cols-1")
                }
              >
                {/* LEFT: images + description */}
                <section className="space-y-4 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-900/10 md:p-6">
                  {(activeProject.screens &&
                    activeProject.screens.length > 0) ||
                  activeProject.image ? (
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <div className="inline-block overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm shadow-slate-900/10">
                          <Image
                            src={
                              activeProject.screens &&
                              activeProject.screens.length > 0
                                ? activeProject.screens[activeScreenIndex]
                                : (activeProject.image as string)
                            }
                            alt={activeProject.title}
                            width={360}
                            height={780}
                            className="block h-auto w-full max-w-40 md:max-w-48 object-contain"
                          />
                        </div>
                      </div>

                      {activeProject.screens &&
                        activeProject.screens.length > 1 && (
                          <div className="flex justify-center gap-2 overflow-x-auto pt-1">
                            {activeProject.screens.map((src, idx) => {
                              const isActive = idx === activeScreenIndex;
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
                                    alt={`${activeProject.title} screen ${
                                      idx + 1
                                    }`}
                                    width={80}
                                    height={160}
                                    className="block h-auto w-auto max-h-16 object-contain"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        )}
                    </div>
                  ) : null}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-950 md:text-2xl">
                        {activeProject.title}
                      </h2>
                      <p className="text-sm text-slate-700">
                        {activeProject.summary}
                      </p>
                    </div>

                    {activeProject.highlights &&
                      activeProject.highlights.length > 0 && (
                        <ExpandableList
                          title="Highlights"
                          items={activeProject.highlights}
                          initialCount={3}
                        />
                      )}

                    <ExpandableList
                      title="What I did"
                      items={activeProject.details}
                      initialCount={3}
                    />

                    {activeProject.userExperience && (
                      <ExpandableList
                        title="User Experience"
                        items={activeProject.userExperience}
                        initialCount={3}
                      />
                    )}

                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] md:hidden">
                      {activeProject.tech.map((tech) => (
                        <Badge
                          key={tech.name}
                          variant="outline"
                          className="border-purple-300 bg-purple-50 text-purple-900"
                        >
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </section>

                {/* RIGHT: code panel – only if enabled */}
                {activeProject.showCodePreview !== false &&
                  activeProject.codeSamples &&
                  activeProject.codeSamples.length > 0 && (
                    <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-900/10 md:p-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                          Code Samples
                        </span>

                        <div className="inline-flex flex-wrap gap-2 rounded-lg bg-slate-100 p-1">
                          {activeProject.codeSamples.map((sample, idx) => {
                            const isActive = idx === activeSampleIndex;
                            return (
                              <button
                                key={sample.label}
                                type="button"
                                onClick={() => setActiveSampleIndex(idx)}
                                className={[
                                  "min-w-20 rounded-md px-3 py-1 text-[11px] font-mono transition",
                                  isActive
                                    ? "border border-amber-300 bg-white text-amber-800 shadow-sm shadow-slate-900/10"
                                    : "border border-transparent bg-transparent text-slate-700 hover:bg-white hover:text-amber-800",
                                ].join(" ")}
                              >
                                {sample.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="min-h-[220px] max-h-[55vh] md:min-h-[340px] md:max-h-none">
                        <CodePreview
                          sample={
                            activeProject.codeSamples[
                              activeSampleIndex
                            ] as CodeSample
                          }
                        />
                      </div>
                    </section>
                  )}
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
