// components/experience.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Experience() {
  return (
    <section id="experience" className="space-y-4">
      <h2 className="text-2xl font-semibold">Experience</h2>

      <div className="space-y-3">
        {/* Technical / Research roles */}
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/40">
          <CardHeader>
            <CardTitle>Software Engineer / Research Roles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>· AI/ML & HPC research at LSU (HPX, CFD, PyTorch).</p>
            <p>· Open-source tooling for developer productivity and eye-tracking research.</p>
            <p>· Leading Flutter & backend projects for LSU tech clubs and hackathons.</p>
          </CardContent>
        </Card>

        {/* GDG @ LSU leadership / achievements */}
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/40">
          <CardHeader>
            <CardTitle>Board Member – Google Developer Group @ LSU</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>· Hosted and helped organize a university hackathon for LSU students.</p>
            <p>· Built and led development of the GDG@LSU website (gdg@lsu.org) to showcase events and projects.</p>
            <p>· Project Lead for <strong>GeauxApp</strong>, a campus discovery app on track for release in Spring 2026.</p>
            <p>· Hosted a variety of technical workshops, including C++, parallel programming, and Flutter.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
