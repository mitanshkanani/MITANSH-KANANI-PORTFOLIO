"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/brand-icons";
import { ProjectPreview } from "@/components/projects/project-preview";
import { StatusBadge, TechBadge } from "@/components/projects/primitives";

/**
 * ProjectCard — compact card for secondary projects. Uses a spotlight
 * pointer-follow glow (React Bits-style) and a live-ish preview thumbnail.
 * Everything degrades gracefully under reduced motion.
 */
export function ProjectCard({ project }: { project: Project }) {
    const reduce = useReducedMotion();
    const cardRef = useRef<HTMLElement>(null);
    const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
    const Icon = project.icon;

    function handleMove(e: React.MouseEvent<HTMLElement>) {
        if (reduce || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    return (
        <motion.article
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={() => setSpot(null)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-foreground/15"
            aria-labelledby={`card-${project.slug}`}
        >
            {/* Pointer spotlight */}
            {spot && (
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(220px circle at ${spot.x}px ${spot.y}px, ${project.accent}22, transparent 70%)`,
                    }}
                />
            )}

            {/* Preview thumbnail */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border">
                <ProjectPreview project={project} className="h-full rounded-none border-0 shadow-none" />
            </div>

            {/* Body */}
            <div className="relative z-10 flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <span
                            className="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
                            style={{ color: project.accent }}
                            aria-hidden
                        >
                            <Icon className="size-4" />
                        </span>
                        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                            {project.category}
                        </span>
                    </div>
                    <StatusBadge status={project.status} />
                </div>

                <h3
                    id={`card-${project.slug}`}
                    className="mt-4 font-heading text-xl font-semibold tracking-tight text-foreground"
                >
                    {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((t) => (
                        <TechBadge key={t}>{t}</TechBadge>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="inline-flex items-center font-mono text-[0.72rem] text-muted-foreground">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                    <span className="font-mono text-xs text-muted-foreground">
                        {project.timeframe}
                    </span>
                    <div className="ml-auto flex items-center gap-1.5">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={`${project.title} source code on GitHub`}
                                className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:border-foreground/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <GithubIcon className="size-4" />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="group/cta inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                Live
                                <ArrowUpRight className="size-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
