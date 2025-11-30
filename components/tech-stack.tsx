// components/tech-stack.tsx
import { Badge } from "@/components/ui/badge"

const stackItems = [
  // Languages
  "Dart (Flutter)",
  "Go",
  "Python",
  "Java",
  "JavaScript / TypeScript",
  "C / C++",
  "HTML / CSS",

  // Mobile & Frontend
  "Flutter",
  "React",
  "Next.js",

  // Backend & APIs
  "FastAPI",
  "Spring Boot",

  // AI / ML
  "PyTorch",

  // Cloud & DevOps
  "AWS · Amplify · DynamoDB · Lambda",
  "Supabase",
  "Firebase",
  "Docker",
  "GCP Cloud Run",

  // Databases
  "PostgreSQL",
  "DynamoDB",

  // Tools & Testing
  "JUnit",
  "GitHub Actions",
  "WebSockets"
];


export default function TechStack() {
  return (
    <section className="space-y-4">
        <h2 id="tech-stack-heading" className="text-2xl font-semibold text-white"> Tech Stack </h2>
      <div className="flex flex-wrap gap-2">
        {stackItems.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    </section>
  )
}
