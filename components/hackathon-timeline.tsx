"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  StarIcon,
  PlayIcon,
  ChartSplineIcon,
  AwardIcon,
  GlobeIcon,
  UserRound,
  PencilRulerIcon,
  Gamepad2Icon,
} from "lucide-react";
/* ------------------------ Component ------------------------ */

export default function HackathonTimeline({}) {
  return (
    <section id="hackathons" className="relative min-h-screen space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold text-white">
          My Hackathon Journey
        </h2>
        <span className="hidden text-xs uppercase tracking-[0.2em] text-amber-300/80 md:inline">
          TimeLine
        </span>
      </div>
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="cursor-pointer"
      >
        <Card
          className={cn(
            "h-full border border-white/10 bg-slate-900/80 backdrop-blur shadow-md shadow-purple-900/40 hover:border-purple-400/50 hover:shadow-purple-500/40 transition-all",
          )}
        >
          <CardContent className="space-y-2 pt-6 text-sm">
            <VerticalTimeline lineColor="rgba(168, 133, 255, 0.2)">
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgba(239, 68, 68, 0.2)",
                  color: "#f1f5f9",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(239, 68, 68, 0.2)",
                }}
                date="Upcoming"
                iconStyle={{ background: "rgb(239, 68, 68)", color: "#fff" }}
                icon={<Gamepad2Icon />}
              >
                <h3 className="vertical-timeline-element-title">
                  Preparing for Chillennium
                </h3>

                <h4 className="vertical-timeline-element-subtitle">
                  Texas A&amp;M University
                </h4>

                <p>
                  Currently preparing for Chillennium, a large-scale game
                  development hackathon, focusing on game design, rapid
                  prototyping, and collaborative development in a competitive
                  environment.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="Nov. 2025"
                contentStyle={{
                  background: "rgba(20, 184, 166, 0.2)",
                  color: "#f1f5f9",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(20, 184, 166, 0.2)",
                }}
                iconStyle={{ background: "rgb(20, 184, 166)", color: "#fff" }}
                icon={<PencilRulerIcon />}
              >
                <div className="space-y-3">
                  <h3 className="vertical-timeline-element-title font-semibold">
                    GeauxHack 2025
                  </h3>

                  <p className="!font-normal text-sm">
                    Co-hosted GeauxHack as President of the Google Developer
                    Student Club at LSU, partnering with SASE to help run one of
                    the university’s largest hackathons.
                  </p>

                  <div className="!font-normal text-sm space-y-2">
                    <p>
                      <strong className="text-teal-200">Role:</strong> Helped
                      lead large-scale event organization, coordination, and
                      long-term planning across multiple teams and stakeholders.
                    </p>

                    <p>
                      <strong className="text-teal-200">Lesson:</strong>{" "}
                      Organizing a hackathon requires far more foresight than
                      participating, from logistics and timelines to contingency
                      planning.
                    </p>

                    <p>
                      <strong className="text-teal-200">Advice:</strong>{" "}
                      Successful large events are built months in advance —
                      clear leadership and preparation enable everyone else to
                      focus on creating.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Image
                      src="/hackathon/1763029311862.jpeg"
                      alt="Me at GeauxHack 2023"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                </div>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="Mar. 2025"
                contentStyle={{
                  background: "rgba(234, 88, 12, 0.2)",
                  color: "#f1f5f9",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(234, 88, 12, 0.2)",
                }}
                iconStyle={{ background: "rgb(234, 88, 12)", color: "#fff" }}
                icon={<UserRound />}
              >
                <div className="space-y-3">
                  <h3 className="vertical-timeline-element-title font-semibold">
                    GeauxCASH — Hackathon Mentor
                  </h3>

                  <p className="!font-normal text-sm">
                    Served as a mentor at GeauxCASH, helping teams navigate both
                    technical challenges and early-stage product decisions
                    throughout the hackathon.
                  </p>

                  <div className="!font-normal text-sm space-y-2">
                    <p>
                      <strong className="text-orange-200">Role:</strong>{" "}
                      Assisted teams with Git workflows, React and Firebase
                      issues, feature scoping, and evaluating potential
                      tradeoffs and consequences of design decisions.
                    </p>

                    <p>
                      <strong className="text-orange-200">Lesson:</strong>{" "}
                      Teaching and debugging others exposes common pitfalls
                      teams face at all levels, strengthening both technical
                      intuition and product thinking.
                    </p>

                    <p>
                      <strong className="text-orange-200">Advice:</strong>{" "}
                      Strong hackathons succeed through preparation and
                      redundancy — good organizers plan backups for their
                      backups, allowing participants to focus on building and
                      learning.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Image
                      src="/hackathon/1749607098522.jpeg"
                      alt="Me at GeauxHack 2023"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="Feb. 2025"
                contentStyle={{
                  background: "rgba(168, 85, 247, 0.2)",
                  color: "#f1f5f9",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(168, 85, 247, 0.2)",
                }}
                iconStyle={{ background: "rgb(168, 85, 247)", color: "#fff" }}
                icon={<GlobeIcon />}
              >
                <div className="space-y-3">
                  <h3 className="vertical-timeline-element-title font-semibold">
                    Hacklytics 2025 — Georgia Tech
                  </h3>

                  <p className="!font-normal text-sm">
                    After receiving admission and travel reimbursement, I
                    competed in Georgia Tech’s data science hackathon and
                    experienced hackathons at a much larger and more competitive
                    scale.
                  </p>

                  <div className="!font-normal text-sm space-y-2">
                    <p>
                      <strong className="text-purple-200">Project:</strong>{" "}
                      <em>ClaimCure</em> — an AI-powered tool that analyzes
                      hospital bills to detect potential errors or inflated
                      charges, compares them to standard rates, and drafts a
                      formal appeal email to billing departments.
                    </p>

                    <p>
                      <strong className="text-purple-200">Lesson:</strong>{" "}
                      Large-scale hackathons require different preparation, from
                      travel logistics to adapting to diverse team workflows and
                      tech stacks.
                    </p>

                    <p>
                      <strong className="text-purple-200">Advice:</strong> When
                      competing at scale, plan early, manage energy carefully,
                      and adjust expectations — the learning and connections can
                      matter more than prizes.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Image
                      src="/hackathon/claimcure.png"
                      alt="Me at GeauxHack 2023"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                      src="/hackathon/1749607098453.jpeg"
                      alt="Me at GeauxHack 2023"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                </div>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="Oct. 2024"
                contentStyle={{
                  background: "rgba(59, 130, 246, 0.2)",
                  color: "#f1f5f9",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(59, 130, 246, 0.2)",
                }}
                iconStyle={{ background: "rgb(59, 130, 246)", color: "#fff" }}
                icon={<AwardIcon />}
              >
                <div className="space-y-3">
                  <h3 className="vertical-timeline-element-title font-semibold">
                    GeauxHack 2024
                  </h3>

                  <p className="!font-normal text-sm">
                    With more hackathon and web development experience, I teamed
                    up with both familiar and new faces and competed in the
                    advanced bracket, earning 1st place.
                  </p>

                  <div className="!font-normal text-sm space-y-2">
                    <p>
                      <strong className="text-blue-200">Project:</strong>{" "}
                      <em>Journey Buddies</em> — a platform that helps users
                      connect with others worldwide to attend popular events
                      together, featuring messaging, friend systems, security
                      protections, and an interactive map with a sleek,
                      adventurous UI.
                    </p>

                    <p>
                      <strong className="text-blue-200">Lesson:</strong> Success
                      comes from understanding each team member’s strengths and
                      assigning tasks accordingly, especially when time is the
                      biggest constraint.
                    </p>

                    <p>
                      <strong className="text-blue-200">Advice:</strong> Plan
                      beyond just code — account for sleep, time management, and
                      presentation rules early to maximize both development and
                      rehearsal time.
                    </p>
                  </div>
                  <Image
                    src="/hackathon/Screenshot from 2026-01-19 04-52-05.png"
                    alt="Me at GeauxHack 2023"
                    width={200}
                    height={200}
                    className="rounded-lg object-cover shadow-md"
                  />
                  <Image
                    src="/hackathon/486403014_1083587893796859_2787485154372720737_n.jpg"
                    alt="Me at GeauxHack 2023"
                    width={200}
                    height={200}
                    className="rounded-lg object-cover shadow-md"
                  />
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="Feb. 2024"
                contentStyle={{
                  background: "rgba(34, 197, 94, 0.2)",
                  color: "#f1f5f9",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(34, 197, 94, 0.2)",
                }}
                iconStyle={{ background: "rgb(34, 197, 94)", color: "#fff" }}
                icon={<ChartSplineIcon />}
              >
                <div className="space-y-3">
                  <h3 className="vertical-timeline-element-title font-semibold">
                    WICS Geaux Hack the Globe 2024
                  </h3>

                  <p className="!font-normal text-sm">
                    An assistive-tech focused hackathon where I worked with
                    like-minded developers and learned that impactful software
                    is a continuous, evolving solution rather than a one-time
                    fix.
                  </p>

                  <div className="!font-normal text-sm space-y-2">
                    <p>
                      <strong className="text-emerald-200">Project:</strong> An
                      AI-powered system using custom object detection to alert
                      users with vision or hearing impairments about nearby
                      hazards and potential threats.
                    </p>

                    <p>
                      <strong className="text-emerald-200">Lesson:</strong> A
                      strong technical solution alone isn’t enough. Good UI/UX,
                      clear problem alignment, and effective presentation matter
                      just as much.
                    </p>

                    <p>
                      <strong className="text-emerald-200">Advice:</strong> Plan
                      carefully, consider privacy and edge cases early, and
                      remember that how you present your idea can define how
                      it’s judged.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Image
                      src="/hackathon/Screenshot from 2026-01-19 04-12-44.png"
                      alt="Me at GeauxHack 2023"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                </div>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="Oct. 2023"
                contentStyle={{
                  background: "rgba(217, 119, 6, 0.2)",
                  color: "#f1f5f9",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(217, 119, 6, 0.2)",
                }}
                iconStyle={{ background: "rgb(217, 119, 6)", color: "#fff" }}
                icon={<PlayIcon />}
              >
                <div className="space-y-3">
                  <h3 className="vertical-timeline-element-title font-semibold">
                    GeauxHack 2023
                  </h3>
                  <p className="!font-normal text-sm">
                    My first hackathon experience where I built a working
                    website and learned Git and JavaScript, which I use daily
                    even today.
                  </p>
                  <div className="!font-normal text-sm space-y-2">
                    <p>
                      <strong className="text-amber-200">Lesson:</strong>{" "}
                      Hackathons are incredibly beneficial for learning new
                      technologies. The best way to learn is by doing, and I
                      highly advise attending one.
                    </p>
                    <p>
                      <strong className="text-amber-200">Project:</strong> A
                      simple website where you can set multiple timers. It was
                      my first webpage, so we'll leave it at that! ¯\_(ᵕ—ᴗ—)_/¯
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Image
                      src="/hackathon/482026566_1071894231632892_5929968987922277735_n.jpg"
                      alt="Me at GeauxHack 2023"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                      src="/hackathon/gallery.jpg"
                      alt="Me at GeauxHack 2023"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(126, 87, 194)", color: "#fff" }}
                icon={<StarIcon />}
              />
            </VerticalTimeline>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
