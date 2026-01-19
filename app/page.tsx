"use client";

import AnimatedBackground from "@/components/animated-background";
import { useState } from "react";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Introduction from "@/components/introduction";
import Projects from "@/components/projects";
import SiteFooter from "@/components/site-footer";
import TechStack from "@/components/tech-stack";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // This import is not used, can be removed

export default function Home() {
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());

  const handleTechToggle = (techName: string) => {
    setSelectedTechs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(techName)) {
        newSet.delete(techName);
      } else {
        newSet.add(techName);
      }
      return newSet;
    });
  };

  const handleClearFilters = () => {
    setSelectedTechs(new Set());
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-foreground">
      {/* Animated LSU glow background */}
      <AnimatedBackground />

      {/* Background layer (blobs + grid), kept behind content */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Purple / gold blobs */}
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-purple-600/40 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -right-10 h-80 w-80 rounded-full bg-amber-400/40 blur-3xl animate-[pulse_14s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,255,0.18)_0,transparent_55%),radial-gradient(circle_at_bottom,rgba(251,191,36,0.18)_0,transparent_55%)]" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(148,163,184,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.4)_1px,transparent_1px)] bg-size-[32px_32px]" />
      </div>

      {/* Main content */}
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10 md:py-16">
        {/* HERO */}
        <Hero />
        {/* Introduction */}
        <Introduction />
        {/* Tech stack */}
        <TechStack
          selectedTechs={selectedTechs}
          onTechToggle={handleTechToggle}
          onClear={handleClearFilters}
        />
        {/* Experience */}
        <Experience selectedTechs={selectedTechs} />
        {/* Projects */}
        <Projects selectedTechs={selectedTechs} />
        {/* Footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
