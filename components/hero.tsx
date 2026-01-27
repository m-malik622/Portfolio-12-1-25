"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation"; // Next.js router

const SLIDE_INTERVAL = 5000;

const slides = [
  {
    background: "/hero/heritera.png",
    title: "Check Out My New Website Vivan",
    text: "Developed by Me with the assistance of William(kle47@lsu.edu) to help preserve Louisiana Creole. Come learn new content or make your own quizzes",
    cta: "Check It Out",
    link: "https://heritera.org",
  },
  {
    background: "/hero/gdglsu.jpeg",
    title: "Join or Sponsor the Google Developer Group @ LSU",
    text: "We help grow, connect, and give back to aspiring and experienced developers in Baton Rouge - Malik, President of GDSC@LSU",
    cta: "Learn More",
    link: "https://gdsclsu.org/",
  },
  {
    background: "/hero/construction.jpg",
    title: "Use AI to help prepare for exams",
    text: "Course Context AI is a recent MCP server I made that uses verified student submitted documents across different courses to help future students prepare for exams, digest materials, or analyze what professors like to see. It can be used with a plethora of other MCP servers on clients like Cursor, Claude, or VSC",
    cta: "Coming out Mar 13th 2026",
    link: "",
  },
  {
    background: "/hero/1762997369059.jpeg",
    title: "Follow My Hackathon Journey",
    text: "As a Participant, Winner, Mentor, and Organizer where I share valuable insights on what I learned as developer, teammate, and host.",
    cta: "Go To Section",
    link: "#hackathons",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: { x: 0 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

export default function Hero() {
  const [[index, direction], setState] = useState([0, 1]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const paginate = (newDirection: number) => {
    setState(([prev]) => [
      (prev + newDirection + slides.length) % slides.length,
      newDirection,
    ]);
  };

  // Autoslide
  useEffect(() => {
    intervalRef.current = setInterval(
      () => paginate(1),
      SLIDE_INTERVAL,
    ) as unknown as NodeJS.Timeout;
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  const resetTimer = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    intervalRef.current = setInterval(
      () => paginate(1),
      SLIDE_INTERVAL,
    ) as unknown as NodeJS.Timeout;
  };

  return (
    <section className="relative flex h-[60vh] items-center justify-center px-4">
      <div className="relative h-[60vh] w-full max-w-6xl overflow-hidden rounded-3xl shadow-xl">
        {/* Glow behind carousel - disabled on mobile for performance */}
        <div
          className="absolute inset-0 z-0 rounded-3xl
             bg-gradient-to-tr from-purple-500/50 via-indigo-400/40 to-amber-400/40
             filter blur-3xl
             hidden sm:block animate-pulseGlow"
        />

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            style={{ willChange: "transform" }}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              const velocity = info.velocity.x;

              // Detect swipe with both distance and velocity
              if (info.offset.x < -swipeThreshold || velocity < -500) {
                paginate(1);
                resetTimer();
              }
              if (info.offset.x > swipeThreshold || velocity > 500) {
                paginate(-1);
                resetTimer();
              }
            }}
          >
            <SlideContent slide={slides[index]} router={router} />
          </motion.div>
        </AnimatePresence>

        {/* Desktop arrows */}
        <button
          onClick={() => {
            paginate(-1);
            resetTimer();
          }}
          className="absolute left-6 top-[55%] z-20 hidden -translate-y-1/2 text-white/80 hover:text-white sm:block transition"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={() => {
            paginate(1);
            resetTimer();
          }}
          className="absolute right-6 top-[55%] z-20 hidden -translate-y-1/2 text-white/80 hover:text-white sm:block transition"
        >
          <ChevronRight size={32} />
        </button>

        {/* Mobile navigation (arrows + dots) */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/40 backdrop-blur-sm px-4 py-2.5 sm:hidden">
          <button
            onClick={() => {
              paginate(-1);
              resetTimer();
            }}
            className="p-1 text-white/70 hover:text-white active:scale-95 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>

          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setState([i, i > index ? 1 : -1]);
                resetTimer();
              }}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "bg-white w-3" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}

          <button
            onClick={() => {
              paginate(1);
              resetTimer();
            }}
            className="p-1 text-white/70 hover:text-white active:scale-95 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- */
/* Slide Content */
/* ------------------------------- */
function SlideContent({
  slide,
  router,
}: {
  slide: (typeof slides)[number];
  router: ReturnType<typeof useRouter>;
}) {
  const handleClick = () => {
    if (!slide.link) return; // do nothing if link is empty
    if (slide.link.startsWith("http")) {
      window.open(slide.link, "_blank"); // external
    } else {
      router.push(slide.link); // internal
    }
  };

  return (
    <>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slide.background})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div
        className="relative z-10 flex h-full flex-col px-6 py-6 sm:px-12
                overflow-y-auto sm:overflow-y-visible"
      >
        {/* Text */}
        <div className="mt-20 max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">{slide.text}</p>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* CTA */}
        <div className="flex justify-center pb-24 sm:justify-start sm:pb-4">
          <Button
            size="lg"
            variant={"secondary"}
            className="rounded-full px-8 py-6"
            onClick={handleClick}
          >
            {slide.cta}
          </Button>
        </div>
      </div>
    </>
  );
}
