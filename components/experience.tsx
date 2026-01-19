// components/experience.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Technologies, cn } from "@/lib/utils";

interface ExperienceProps {
  selectedTechs: Set<string>;
}

const EXPERIENCE_ITEMS = [
  {
    title: "AI/LLM Developer Intern - Our Lady of the Lake",
    bullets: [
      "Reduced staff search time by 70% by integrating hospital tools and resources into a unified MCP-driven platform.",
      "Delivered fast, reliable enterprise access by building and deploying an MCP server integrated with Microsoft Teams.",
      "Used Microsoft Foundry AI, Azure containers, and Redis caching to provide centralized high-performance knowledge access.",
    ],
    className:
      "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
    technologies: [
      Technologies.PYTHON,
      Technologies.REACT,
      Technologies.AWS,
      Technologies.FASTAPI,
    ],
  },
  {
    title: "Data Science & Software Engineering Intern — BASF Geismar, LA",
    bullets: [
      "Built 2 Databricks pipelines with PySpark to track 40M+ invoice records, reducing manual queries by 73%.",
      "Developed a Python-based config manager for 400+ machines across site with full dev/prod environment support.",
      "Fine-tuned Azure ML models and built a Power Automate workflow to flag 1,000+ invoice–contract discrepancies, reducing manual verification time.",
    ],
    className:
      "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
    technologies: [Technologies.PYTHON, Technologies.GCP],
  },
  {
    title: "President — Google Developer Group @ LSU",
    bullets: [
      "Designed and developed the official GDSC@LSU website used by 150+ students. gdsclsu.org",
      "Led 30+ developers, creating client–server architecture and technical roadmaps for Flutter web and mobile projects.",
      "Organized Geaux Hackathon and GDSC events, managing 11 officers and collaborating with GDG chapter leads and industry partners. https://www.linkedin.com/company/gdsclsu",
    ],
    className:
      "border border-purple-400/40 bg-purple-900/25 backdrop-blur-md shadow-lg shadow-purple-900/40",
    technologies: [
      Technologies.FLUTTER,
      Technologies.GO,
      Technologies.SUPABASE,
    ],
  },
  {
    title: "Supplemental Instructor — LSU Computer Science Department",
    bullets: [
      "Conducted 20+ structured Java, data structures, and algorithms reviews for 200+ students.",
      "Delivered 4 lectures to 70+ students covering algorithm limitations, applications, and live Java implementations.",
      "Reduced fail rate by 36% through debugging sessions, algorithm walkthroughs, and code optimization practice.",
    ],
    className:
      "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
    technologies: [Technologies.JAVA],
  },
  {
    title: "Software Engineering Researcher — Professor Index App",
    bullets: [
      "Built 30+ Selenium/BeautifulSoup scrapers, collecting 8K+ professor and 14K+ course records.",
      "Optimized Python ETL pipeline, improving data access speed by 45% for 150+ student users.",
    ],
    className:
      "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
    technologies: [Technologies.PYTHON],
  },
];

export default function Experience({ selectedTechs }: ExperienceProps) {
  const filteredItems =
    selectedTechs.size === 0
      ? EXPERIENCE_ITEMS
      : EXPERIENCE_ITEMS.filter((item) =>
          item.technologies.some((tech) => selectedTechs.has(tech.name)),
        );

  return (
    <section
      id="experience"
      className="space-y-4 transition-opacity duration-300"
      aria-labelledby="experience-heading"
    >
      <h2 id="experience-heading" className="text-2xl font-semibold text-white">
        Experience
      </h2>

      <div className="space-y-4 ">
        {filteredItems.map((item, index) => (
          <Card key={index} className={cn(item.className, "transition-all")}>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <CardTitle className="text-base text-slate-50">
                {item.title}
              </CardTitle>
              {/* Desktop: Tech badges on the right */}
              {item.technologies && (
                <div className="hidden shrink-0 md:flex flex-wrap gap-2 justify-end">
                  {item.technologies.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-100 border border-purple-400/40"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-slate-200">
              <ul className="list-disc space-y-1 pl-5">
                {item.bullets.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
              {/* Mobile: Tech badges at the bottom */}
              {item.technologies && (
                <div className="flex flex-wrap gap-2 pt-2 md:hidden">
                  {item.technologies.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-100 border border-purple-400/40"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
