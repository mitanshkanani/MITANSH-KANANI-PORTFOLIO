"use client";

import { MotionConfig } from "motion/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { FeaturedProject } from "@/components/projects/featured-project";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionLabel } from "@/components/projects/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import {
    featuredProject,
    secondaryFeatured,
    restProjects,
} from "@/lib/projects";

/**
 * ProjectsPageContent — client-side composition of the Projects page.
 *
 * Why this exists: the page route (`page.tsx`) stays a Server Component so
 * it can export SEO `metadata`. But the project data embeds Lucide icon
 * *components* (functions), which cannot be serialized across the RSC
 * server→client boundary. By importing the data directly inside this
 * Client Component, the icons resolve in the client bundle and never cross
 * that boundary — no serialization error, and metadata stays server-side.
 */
export function ProjectsPageContent() {
    return (
        <MotionConfig reducedMotion="user">
            <SiteHeader />
            <main id="work" className="relative">
                <ProjectsHero />

                {/* FEATURED — editorial, high-emphasis layouts */}
                <section
                    id="featured"
                    aria-labelledby="featured-heading"
                    className="mx-auto max-w-6xl scroll-mt-24 px-5 sm:px-8"
                >
                    <Reveal className="flex flex-col gap-3">
                        <SectionLabel index="01">Featured</SectionLabel>
                        <h2
                            id="featured-heading"
                            className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                        >
                            Work I&apos;d put my name on first.
                        </h2>
                    </Reveal>

                    <div className="mt-12 flex flex-col gap-20 sm:gap-28 lg:gap-32">
                        {/* GOCO — flagship, gets strongest emphasis */}
                        <FeaturedProject project={featuredProject} index="01" emphasis />

                        {/* Remaining featured projects, alternating sides */}
                        {secondaryFeatured.map((project, i) => (
                            <FeaturedProject
                                key={project.slug}
                                project={project}
                                index={String(i + 2).padStart(2, "0")}
                                flip={i % 2 === 0}
                            />
                        ))}
                    </div>
                </section>

                {/* ARCHIVE — grid of remaining work */}
                <section
                    id="archive"
                    aria-labelledby="archive-heading"
                    className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-5 sm:mt-36 sm:px-8"
                >
                    <Reveal className="flex flex-col gap-3">
                        <SectionLabel index="02">Archive</SectionLabel>
                        <h2
                            id="archive-heading"
                            className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                        >
                            More systems, tools and experiments.
                        </h2>
                    </Reveal>

                    <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {restProjects.map((project) => (
                            <StaggerItem key={project.slug} className="h-full">
                                <ProjectCard project={project} />
                            </StaggerItem>
                        ))}
                    </Stagger>
                </section>

                <div className="mt-28 sm:mt-36">
                    <SiteFooter />
                </div>
            </main>
        </MotionConfig>
    );
}
