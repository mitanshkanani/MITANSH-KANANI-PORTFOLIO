"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
    Blocks,
    Rocket,
    Users,
    Search,
    Brain,
    Wrench,
    Lightbulb,
    TrendingUp,
} from "lucide-react";
import { Reveal, EASE } from "@/components/motion-primitives";

/**
 * AboutSection — premium "About Me" section.
 *
 * Content sourced directly from user specifications. Nothing is invented.
 *
 * Changes from original:
 *  - RotatingTitle uses block-level layout so titles are never clipped
 *    behind the name heading.
 *  - Trait cards use 3D tilt + cursor-following glow + animated icons.
 *  - Intro overlay provides a cinematic page-load experience.
 */

const TITLES = ["Founder", "Software Engineer", "AI/ML Engineer", "Quant"];

const TRAITS = [
    {
        icon: Blocks,
        title: "Build from scratch",
        description:
            "I prefer building projects from the ground up — understanding every layer rather than assembling pre-built pieces.",
    },
    {
        icon: Rocket,
        title: "Early-stage ownership",
        description:
            "I thrive on early-stage work where I have ownership of the overall system and can shape technical direction.",
    },
    {
        icon: Users,
        title: "Lead & mentor",
        description:
            "I enjoy leading projects and teams, mentoring people, and sharing what I've learned along the way.",
    },
    {
        icon: Search,
        title: "End-to-end understanding",
        description:
            "I prefer understanding systems end-to-end — deep technical understanding over just calling libraries and APIs.",
    },
    {
        icon: Lightbulb,
        title: "Experiment & iterate",
        description:
            "I like experimenting with different approaches until the right result is achieved — iteration over assumption.",
    },
    {
        icon: Wrench,
        title: "Hard problems",
        description:
            "I gravitate toward difficult technical problems — compilers, language design, systems that require thinking from first principles.",
    },
];

/* ─────────────────────────── Rotating Title ─────────────────────────── */

function RotatingTitle() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % TITLES.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    /*
     * FIX: The title sits in its own block-level container so it is
     * never overlapped by the "Mitansh Kanani." heading above.
     * Height is set to 1.2em of the heading font size to accommodate
     * descenders + ascenders on every role string.
     */
    return (
        <span
            className="relative block h-[1.2em] w-full overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={TITLES[index]}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-x-0 top-0 block whitespace-nowrap text-gradient"
                >
                    {TITLES[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

/* ────────────────────── Magnetic 3D Trait Card ────────────────────── */

function TraitCard({
    trait,
    index,
}: {
    trait: (typeof TRAITS)[0];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [hovered, setHovered] = useState(false);

    function handleMove(e: React.MouseEvent) {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        setTilt({ x: dy * -6, y: dx * 6 });
        setGlowPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    }

    function handleLeave() {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
    }

    const Icon = trait.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleLeave}
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                    mass: 0.5,
                }}
                style={{ perspective: 800, transformStyle: "preserve-3d" }}
                className="group relative h-full"
            >
                <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card/60 p-6 backdrop-blur transition-colors duration-300 hover:border-brand/40 hover:bg-card/90">
                    {/* Cursor-following radial glow */}
                    {hovered && (
                        <div
                            className="pointer-events-none absolute inset-0 -z-0 opacity-25 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(280px circle at ${glowPos.x}% ${glowPos.y}%, var(--brand), transparent 60%)`,
                            }}
                            aria-hidden
                        />
                    )}

                    {/* Index number */}
                    <span className="absolute right-4 top-4 font-mono text-[0.65rem] tabular-nums text-muted-foreground/40 transition-colors group-hover:text-brand/40">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Icon with animated reaction */}
                    <motion.div
                        animate={
                            hovered
                                ? { scale: 1.1, rotate: -6 }
                                : { scale: 1, rotate: 0 }
                        }
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                        }}
                        className="relative z-10 mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background/80 text-muted-foreground transition-colors duration-300 group-hover:border-brand/50 group-hover:text-brand"
                    >
                        <Icon className="size-[18px]" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="relative z-10 text-sm font-semibold text-foreground">
                        {trait.title}
                    </h3>
                    <p className="relative z-10 mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
                        {trait.description}
                    </p>

                    {/* Bottom accent line on hover */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-brand/60 to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hovered ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────── Intro Overlay Animation ─────────────────────── */

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
    const reduce = useReducedMotion();

    useEffect(() => {
        if (reduce) {
            onComplete();
            return;
        }
        const timer = setTimeout(onComplete, 2200);
        return () => clearTimeout(timer);
    }, [onComplete, reduce]);

    if (reduce) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.7, ease: EASE }}
        >
            <div className="relative flex flex-col items-center">
                {/* Top accent line */}
                <motion.div
                    className="absolute -top-4 h-px w-0 bg-gradient-to-r from-transparent via-brand to-transparent"
                    animate={{ width: "120%" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                />

                {/* Name */}
                <motion.h1
                    className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                >
                    Mitansh Kanani
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                >
                    Founder · Engineer · Builder
                </motion.p>

                {/* Bottom accent line */}
                <motion.div
                    className="absolute -bottom-4 h-px w-0 bg-gradient-to-r from-transparent via-brand to-transparent"
                    animate={{ width: "120%" }}
                    transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                />
            </div>
        </motion.div>
    );
}

/* ───────────────────────── About Section ───────────────────────── */

export function AboutSection() {
    const [introComplete, setIntroComplete] = useState(false);
    const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

    return (
        <>
            {/* Cinematic intro overlay on fresh page load */}
            <AnimatePresence>
                {!introComplete && (
                    <IntroOverlay onComplete={handleIntroComplete} />
                )}
            </AnimatePresence>

            <section
                id="about"
                aria-labelledby="about-heading"
                className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
            >
                {/* Background ambience */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10"
                >
                    <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
                    <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/8 blur-[120px]" />
                </div>

                <div className="mx-auto max-w-6xl px-5 sm:px-8">
                    {/* Eyebrow */}
                    <Reveal>
                        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            <span className="h-px w-8 bg-brand" aria-hidden />
                            About
                        </div>
                    </Reveal>

                    {/*
                     * Name + Rotating title
                     *
                     * FIX: Title is now a separate block element below the name,
                     * so "Software Engineer" and "AI/ML Engineer" are never
                     * clipped or hidden behind "Mitansh Kanani."
                     */}
                    <Reveal delay={0.05}>
                        <h1
                            id="about-heading"
                            className="mt-6 max-w-4xl font-heading text-4xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                        >
                            Mitansh Kanani.
                        </h1>
                        <div className="mt-2 max-w-4xl font-heading text-4xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
                            <RotatingTitle />
                        </div>
                    </Reveal>

                    {/* Intro paragraphs */}
                    <Reveal delay={0.1}>
                        <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                            <p>
                                I&apos;m currently building{" "}
                                <span className="font-medium text-foreground">
                                    GOCO
                                </span>{" "}
                                — a programming language, its compiler, and a full
                                desktop IDE. I work across language features,
                                compiler-related systems, developer tooling, and the
                                broader GOCO ecosystem.
                            </p>
                            <p>
                                Before GOCO, the idea of designing your own programming
                                language felt like something reserved for large teams
                                with years of experience. But when you believe deeply
                                enough in a problem, you find a way to solve it — even
                                if the path doesn&apos;t exist yet. That conviction is
                                how GOCO went from an idea to a working language with
                                its own IDE, matchmaking system, and a team of
                                engineers.
                            </p>
                        </div>
                    </Reveal>

                    {/* ── Trait cards — 3D tilt, glow, animated icons ── */}
                    <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {TRAITS.map((trait, i) => (
                            <TraitCard key={trait.title} trait={trait} index={i} />
                        ))}
                    </div>

                    {/* AI/ML + Finance blocks */}
                    <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <Reveal delay={0.05}>
                            <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
                                <div className="mb-3 flex items-center gap-2.5">
                                    <div className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground">
                                        <Brain className="size-4" />
                                    </div>
                                    <h3 className="text-sm font-medium text-foreground">
                                        AI / ML Mindset
                                    </h3>
                                </div>
                                <p className="text-[0.85rem] leading-relaxed text-muted-foreground">
                                    I like going deep into AI and ML — understanding
                                    what happens internally rather than treating
                                    libraries as black boxes. When I build a CNN, I
                                    implement every layer and both forward and backward
                                    propagation by hand. When I use an API, I want to
                                    understand the model architecture behind it.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
                                <div className="mb-3 flex items-center gap-2.5">
                                    <div className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground">
                                        <TrendingUp className="size-4" />
                                    </div>
                                    <h3 className="text-sm font-medium text-foreground">
                                        Finance & Markets
                                    </h3>
                                </div>
                                <p className="text-[0.85rem] leading-relaxed text-muted-foreground">
                                    Finance and trading are personal interests, not
                                    professional experience. I enjoy learning about
                                    financial markets, trading strategies, crypto,
                                    stocks, and how financial systems work at a
                                    structural level — curiosity-driven exploration
                                    outside of engineering.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
