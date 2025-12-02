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
  title: "Data Science & Software Engineering Intern — BASF Geismar, LA",
  bullets: [
    "Built 2 Databricks pipelines with PySpark to track 40M+ invoice records, reducing manual queries by 73%.",
    "Developed a Python-based config manager for 400+ machines across site with full dev/prod environment support.",
    "Fine-tuned Azure ML models and built a Power Automate workflow to flag 1,000+ invoice–contract discrepancies, reducing manual verification time."
  ],
  className:
    "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
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
},
{
  title: "Software Engineering Researcher — Professor Index App",
  bullets: [
    "Built 30+ Selenium/BeautifulSoup scrapers, collecting 8K+ professor and 14K+ course records.",
    "Optimized Python ETL pipeline, improving data access speed by 45% for 150+ student users.",
  ],
  className:
    "border border-white/15 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/30",
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
