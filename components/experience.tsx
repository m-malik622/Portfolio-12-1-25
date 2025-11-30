// components/experience.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const EXPERIENCE_ITEMS = [
  {
    
    title: "AI/LLM Developer Intern - Our Lady of the Lake",
    bullets: [
      "Reduced staff search time by 70% by integrating hospital tools and resources into a unified MCP-driven platform.",
      "Delivered fast, reliable enterprise access by building and deploying an MCP server integrated with Microsoft Teams.",
      "Used Microsoft Foundry AI, Azure containers, and Redis caching to provide centralized high-performance knowledge access.",
    ],
    className: "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
  },
  {
    title: "Eyetracker Plugin Developer - Ai4SE LAB",
    bullets: [
      "Developed an open-source JetBrains standalone plugin using Java, Python, and Docker to simplify setup and eliminate system-level issues.",
      "Implemented Tobii-Fusion eye-tracker to detect developer gaze and distinguish between handwritten and AI/Copilot-generated code.",
      "Reduced configuration failure by 80% through optimization and improved developer experience.",
    ],
    className: "border border-white/15 bg-amber-900/30 backdrop-blur-md shadow-lg shadow-amber/30",
  },
  {
    title: "Machine Learning Engineer - WISE Research",
    bullets: [
      "Reduced CFD computation time by 20× by optimizing C++ multithreaded execution.",
      "Integrated AI-based prediction models into the OpenFOAM workflow to accelerate simulation results.",
    ],
    className: "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
  },
    {
    title: "Board Member & Project Lead — GDG @ LSU",
    bullets: [
      "Hosted and organized hackathons for LSU students.",
      "Built and led development of the GDG@LSU.org website.",
      "Project Lead for GeauxApp, on track to launch for LSU students in Spring 2026.",
      "Ran workshops in C++, parallel programming, and Flutter.",
    ],
    className:
      "border border-purple-400/40 bg-purple-900/25 backdrop-blur-md shadow-lg shadow-purple-900/40",
  },
  {
    title: "Software Engineer - Stellar Group",
    bullets: [
      "Increased HPX shared-thread execution performance by 30% by optimizing GCC-linked subsystem bottlenecks.",
      "Enabled higher scalability for parallel C++ applications.",
    ],
    className: "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
  },
  {
    title: "Fullstack Developer - LSU",
    bullets: [
      "Developed a mobile app using Dart and Flutter to replace paper forms, improving construction site workflows.",
      "Worked on backend and Flutter app development for LSU students and research groups.",
    ],
    className: "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
  },
];


export default function Experience() {
  return (
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
        {EXPERIENCE_ITEMS.map((item, index) => (
          <Card key={index} className={item.className}>
            <CardHeader>
              <CardTitle className="text-base text-slate-50">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-slate-200">
              <ul className="list-disc space-y-1 pl-5">
                {item.bullets.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
