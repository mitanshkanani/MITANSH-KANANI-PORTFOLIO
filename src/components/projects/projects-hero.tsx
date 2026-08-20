"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { EASE } from "@/components/motion-primitives";
import { projects } from "@/lib/projects";

/**
 * ProjectsHero — editorial opening for the Projects section.
 *
 * Removed the disconnected "Engineering that ships as product" heading.
 * Now leads with the descriptive subhead and stat strip directly.
 */

const disciplines = [
    "Programming languages",
    "Developer tools",
    "AI systems",
    "Full-stack apps",
    "ML from scratch",
];

export function ProjectsHero() {
    const shipped = projects.filter((p) => p.status === "shipped").length;
    const stats = [
        { value: String(projects.length), label: "Selected projects" },
        { value: `${shipped}`, label: "Shipped & live" },
        { value: "1", label: "Language + IDE" },
    ];

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    };
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE },
        },
    };

    return (
        <section
            className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24"
            aria-labelledby="projects-heading"
        >
            {/* Ambient background */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.4] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
                <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {/* Eyebrow */}
                    <motion.div
                        variants={item}
                        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
                    >
                        <span className="h-px w-8 bg-brand" aria-hidden />
                        Selected Work · 2024—Present
                    </motion.div>

                    {/* Descriptive subhead — no invented slogan */}
                    <motion.p
                        variants={item}
                        id="projects-heading"
                        className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                    >
                        A programming language and its compiler, a desktop IDE, AI
                        platforms, and machine learning implemented from first
                        principles. These are the projects behind that work.
                    </motion.p>

                    {/* Discipline chips */}
                    <motion.ul
                        variants={item}
                        className="mt-8 flex flex-wrap gap-2"
                        aria-label="Areas of work"
                    >
                        {disciplines.map((d) => (
                            <li
                                key={d}
                                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-foreground/75 backdrop-blur"
                            >
                                {d}
                            </li>
                        ))}
                    </motion.ul>

                    {/* Stat strip */}
                    <motion.dl
                        variants={item}
                        className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8"
                    >
                        {stats.map((s) => (
                            <div key={s.label} className="flex flex-col">
                                <dt className="order-2 mt-1 text-xs text-muted-foreground">
                                    {s.label}
                                </dt>
                                <dd className="order-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                    {s.value}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>

                {/* Scroll cue */}
                <motion.a
                    href="#featured"
                    aria-label="Scroll to featured work"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mt-16 hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
                >
                    <span>Featured work</span>
                    <motion.span
                        animate={{ y: [0, 4, 0] }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="inline-flex"
                    >
                        <ArrowDown className="size-3.5" aria-hidden />
                    </motion.span>
                </motion.a>
            </div>
        </section>
    );
}
