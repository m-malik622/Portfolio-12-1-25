// components/tech-stack.tsx
import { Badge } from "@/components/ui/badge";

const stackItems = [
  // Languages & Frameworks
  "Dart · Flutter",
  "Go",
  "Python · FastAPI · PyTorch",
  "Java · Spring Boot",
  "JavaScript · TypeScript · React · Next.js",
  "C · C++",

  // Cloud & DevOps
  "AWS · Amplify · DynamoDB · Lambda",
  "Docker",

  // Databases
  "PostgreSQL",
  "Supabase · Realtime · Storage",
  "Firebase",

  // Communication & Infrastructure
  "GitHub Actions",

  // Testing
  "Unit Testing",
  "Property Testing · Jqwik"
];

export default function TechStack() {
  return (
    <section className="space-y-4">
      <h2 id="tech-stack-heading" className="text-2xl font-semibold text-white">
        {" "}
        Tech Stack{" "}
      </h2>
      <div className="flex flex-wrap gap-2">
        {stackItems.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    </section>
  );
}
