// components/experience.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const EXPERIENCE_ITEMS = [
  {
    title: "Software Engineer & Research Roles",
    bullets: [
      "AI/ML & HPC research at LSU (HPX, CFD, PyTorch).",
      "Open-source tooling for developer productivity and eye-tracking research.",
      "Backend + Flutter work for apps used by LSU students and research groups.",
    ],
    className:
      "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
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
]

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
