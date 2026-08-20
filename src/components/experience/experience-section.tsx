"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Briefcase, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, EASE } from "@/components/motion-primitives";
import { SectionLabel, TechBadge } from "@/components/projects/primitives";
import { experiences } from "@/lib/experience";

/**
 * ExperienceSection — interactive vertical timeline for work experience.
 *
 * Data is sourced from lib/experience.ts which maps 1:1 to the resume.
 */

function TimelineCard({
    experience,
    index,
}: {
    experience: (typeof experiences)[0];
    index: number;
}) {
    const [expanded, setExpanded] = useState(index === 0);
    const isActive = experience.current;

    return (
        <Reveal delay={index * 0.1} className="relative">
            <div className="flex gap-4 sm:gap-6 lg:gap-8">
                {/* Timeline spine */}
                <div className="relative flex flex-col items-center">
                    {/* Dot */}
                    <div
                        className={cn(
                            "relative z-10 flex size-4 shrink-0 items-center justify-center rounded-full border-2 mt-1.5",
                            isActive
                                ? "border-brand bg-brand"
                                : "border-muted-foreground/40 bg-background"
                        )}
                    >
                        {isActive && (
                            <span
                                className="absolute inline-flex size-4 animate-ping rounded-full bg-brand/50"
                                aria-hidden
                            />
                        )}
                    </div>
                    {/* Connecting line */}
                    <div className="h-full w-px bg-border" aria-hidden />
                </div>

                {/* Card content */}
                <div className="mb-10 w-full min-w-0 pb-2">
                    <button
                        type="button"
                        onClick={() => setExpanded(!expanded)}
                        className="group w-full cursor-pointer rounded-xl border border-border bg-card/60 p-5 text-left backdrop-blur transition-all duration-300 hover:border-brand/30 hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
                        aria-expanded={expanded}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                                        {experience.company}
                                    </h3>
                                    {isActive && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[0.68rem] font-medium text-brand">
                                            <span className="relative flex size-1.5">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                                                <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                                            </span>
                                            Current
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-sm font-medium text-brand">
                                    {experience.role}
                                </p>
                                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Calendar className="size-3" aria-hidden />
                                        {experience.startDate} – {experience.endDate}
                                    </span>
                                    {experience.type === "internship" && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Briefcase className="size-3" aria-hidden />
                                            Internship
                                        </span>
                                    )}
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: expanded ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="shrink-0 text-muted-foreground"
                            >
                                <ChevronDown className="size-5" />
                            </motion.div>
                        </div>

                        {/* Metrics strip */}
                        {experience.metrics && (
                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                                {experience.metrics.map((m) => (
                                    <div key={m.label} className="flex flex-col">
                                        <span className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                            {m.value}
                                        </span>
                                        <span className="text-[0.7rem] text-muted-foreground">
                                            {m.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Expandable details */}
                        <AnimatePresence initial={false}>
                            {expanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: EASE }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-5 border-t border-border pt-5">
                                        {/* Description */}
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {experience.description}
                                        </p>

                                        {/* Highlights */}
                                        <ul className="mt-4 space-y-2.5">
                                            {experience.highlights.map((h, i) => (
                                                <li
                                                    key={i}
                                                    className="flex gap-2.5 text-[0.82rem] leading-relaxed text-muted-foreground"
                                                >
                                                    <span
                                                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand"
                                                        aria-hidden
                                                    />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Technologies */}
                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {experience.technologies.map((tech) => (
                                                <TechBadge key={tech}>{tech}</TechBadge>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </Reveal>
    );
}

export function ExperienceSection() {
    return (
        <section
            id="experience"
            aria-labelledby="experience-heading"
            className="relative py-20 sm:py-28"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal className="flex flex-col gap-3">
                    <SectionLabel index="01">Experience</SectionLabel>
                    <h2
                        id="experience-heading"
                        className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                    >
                        Where I&apos;ve built things.
                    </h2>
                </Reveal>

                <div className="mt-12 max-w-3xl">
                    {experiences.map((exp, i) => (
                        <TimelineCard key={exp.slug} experience={exp} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
