// components/tech-stack.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Technologies } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tech = { name: string; category: string };

interface TechStackProps {
  selectedTechs: Set<string>;
  onTechToggle: (techName: string) => void;
  onClear: () => void;
}

export default function TechStack({
  selectedTechs,
  onTechToggle,
  onClear,
}: TechStackProps) {
  const groupedByCategory = Object.values(Technologies).reduce(
    (acc, tech) => {
      const { category } = tech;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tech);
      return acc;
    },
    {} as Record<string, Tech[]>,
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2
          id="tech-stack-heading"
          className="text-2xl font-semibold text-slate-950"
        >
          Filter Experiences and Projects
        </h2>
        {selectedTechs.size > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onClear}
            className="border border-red-300 bg-red-100 text-red-900 hover:bg-red-200"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
        {Object.entries(groupedByCategory).map(([category, techs]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-medium text-slate-700">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <Badge
                  key={tech.name}
                  variant="secondary"
                  onClick={() => onTechToggle(tech.name)}
                  className={cn(
                    "transition-all hover:bg-slate-100",
                    selectedTechs.has(tech.name) &&
                      "border border-purple-300 bg-purple-100 text-purple-900 shadow-sm shadow-slate-900/10 hover:bg-purple-200",
                  )}
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
