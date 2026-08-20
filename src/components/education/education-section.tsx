"use client";

import { GraduationCap, BookOpen, Code2, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { SectionLabel, TechBadge } from "@/components/projects/primitives";
import { education, technicalSkills } from "@/lib/education";

/**
 * EducationSection — institution details, coursework, and technical skills.
 * All data sourced from the resume.
 */

export function EducationSection() {
    return (
        <section
            id="education"
            aria-labelledby="education-heading"
            className="relative py-20 sm:py-28"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal className="flex flex-col gap-3">
                    <SectionLabel index="03">Education</SectionLabel>
                    <h2
                        id="education-heading"
                        className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                    >
                        Academic foundation.
                    </h2>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
                    {/* Institution card — larger */}
                    <Reveal className="lg:col-span-3">
                        <div className="group h-full rounded-xl border border-border bg-card/60 p-6 backdrop-blur transition-colors duration-300 hover:border-brand/30 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/80 text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                                    <GraduationCap className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                                        {education.institution}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-brand">
                                        {education.degree} in {education.field}
                                    </p>
                                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Calendar className="size-3" aria-hidden />
                                            {education.startYear} – {education.endYear}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="size-3" aria-hidden />
                                            {education.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CGPA highlight */}
                            <div className="mt-6 flex items-baseline gap-2 border-t border-border pt-5">
                                <span className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                    {education.cgpa.split("/")[0]}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    / {education.cgpa.split("/")[1]} CGPA
                                </span>
                            </div>
                        </div>
                    </Reveal>

                    {/* Coursework card */}
                    <Reveal delay={0.1} className="lg:col-span-2">
                        <div className="group h-full rounded-xl border border-border bg-card/60 p-6 backdrop-blur transition-colors duration-300 hover:border-brand/30 sm:p-8">
                            <div className="mb-4 flex items-center gap-2.5">
                                <div className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground">
                                    <BookOpen className="size-4" />
                                </div>
                                <h3 className="text-sm font-medium text-foreground">
                                    Relevant Coursework
                                </h3>
                            </div>
                            <ul className="space-y-2.5">
                                {education.coursework.map((course) => (
                                    <li
                                        key={course}
                                        className="flex items-center gap-2.5 text-sm text-muted-foreground"
                                    >
                                        <span
                                            className="h-1 w-1 shrink-0 rounded-full bg-brand"
                                            aria-hidden
                                        />
                                        {course}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>

                {/* Technical skills grid */}
                <Reveal delay={0.15} className="mt-8">
                    <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur sm:p-8">
                        <div className="mb-5 flex items-center gap-2.5">
                            <div className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground">
                                <Code2 className="size-4" />
                            </div>
                            <h3 className="text-sm font-medium text-foreground">
                                Technical Skills
                            </h3>
                        </div>

                        <Stagger
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            delayChildren={0.1}
                            staggerChildren={0.05}
                        >
                            {technicalSkills.map((category) => (
                                <StaggerItem key={category.category}>
                                    <div>
                                        <h4 className="mb-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                                            {category.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {category.items.map((item) => (
                                                <TechBadge key={item}>{item}</TechBadge>
                                            ))}
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
