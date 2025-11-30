// components/tech-stack.tsx
import { Badge } from "@/components/ui/badge"

const stackItems = [
  "Flutter",
  "Go",
  "Python · PyTorch",
  "C++ · HPX",
  "AWS · Amplify · DynamoDB",
  "Supabase",
  "Next.js · React",
  "PostgreSQL",
]

export default function TechStack() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Tech Stack</h2>
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
