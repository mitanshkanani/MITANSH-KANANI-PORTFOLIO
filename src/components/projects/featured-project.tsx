"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/brand-icons";
import { ProjectPreview } from "@/components/projects/project-preview";
import {
    MetricStat,
    SectionLabel,
    StatusBadge,
    TechBadge,
} from "@/components/projects/primitives";

/**
 * FeaturedProject — large, editorial two-column layout for the most
 * important projects. Preview sits on one side, narrative on the other.
 * The `flip` prop alternates the side so a stack of featured projects
 * reads with rhythm rather than repetition.
 */
export function FeaturedProject({
    project,
    index,
    flip = false,
    emphasis = false,
}: {
    project: Project;
    index: string;
    flip?: boolean;
    emphasis?: boolean;
}) {
    const Icon = project.icon;

    return (
        <article
            className="group relative"
            aria-labelledby={`project-${project.slug}`}
        >
            <div
                className={cn(
                    "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
                    flip && "lg:[&>*:first-child]:order-2"
                )}
            >
                {/* Preview side */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative min-w-0"
                >

                    {/* Soft accent glow behind the frame */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                        style={{
                            background: `radial-gradient(60% 60% at 50% 40%, ${project.accent}, transparent 70%)`,
                        }}
                    />
                    <div
                        className={cn(
                            "aspect-[4/3] w-full overflow-hidden rounded-xl",
                            emphasis && "sm:aspect-[16/10]"
                        )}
                    >
                        <ProjectPreview project={project} className="h-full" />
                    </div>
                </motion.div>

                {/* Narrative side */}
                <div className="flex min-w-0 flex-col">

                    <div className="flex items-center justify-between gap-4">
                        <SectionLabel index={index}>{project.category}</SectionLabel>
                        <StatusBadge status={project.status} />
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                        <span
                            className="flex size-10 items-center justify-center rounded-xl border border-border bg-card"
                            style={{ color: project.accent }}
                            aria-hidden
                        >
                            <Icon className="size-5" />
                        </span>
                        <h3
                            id={`project-${project.slug}`}
                            className={cn(
                                "font-heading font-semibold tracking-tight text-foreground",
                                emphasis ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
                            )}
                        >
                            {project.title}
                        </h3>
                    </div>

                    <p className="mt-3 text-base font-medium text-foreground/90 sm:text-lg">
                        {project.tagline}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                    </p>

                    {/* Highlights — show a curated subset to avoid data-dumping */}
                    <ul className="mt-5 space-y-2.5">
                        {project.highlights.slice(0, emphasis ? 4 : 3).map((h) => (
                            <li key={h} className="flex gap-2.5 text-sm text-foreground/80">
                                <span
                                    className="mt-2 size-1 shrink-0 rounded-full"
                                    style={{ backgroundColor: project.accent }}
                                    aria-hidden
                                />
                                <span className="leading-relaxed">{h}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Metrics */}
                    {project.metrics.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-5">
                            {project.metrics.map((m) => (
                                <MetricStat key={m.label} value={m.value} label={m.label} />
                            ))}
                        </div>
                    )}

                    {/* Tech */}
                    <div className="mt-6 flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                            <TechBadge key={t}>{t}</TechBadge>
                        ))}
                    </div>

                    {/* Meta + actions */}
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-muted-foreground">
                            {project.role} · {project.timeframe}
                        </span>
                        <div className="ml-auto flex items-center gap-2">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                    <GithubIcon className="size-4" aria-hidden />
                                    Code

                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="group/cta inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                    Visit live site
                                    <ArrowUpRight className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
