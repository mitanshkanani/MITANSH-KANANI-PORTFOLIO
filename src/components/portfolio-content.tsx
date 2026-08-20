"use client";

import { MotionConfig } from "motion/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutSection } from "@/components/about/about-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { EducationSection } from "@/components/education/education-section";
import { ContactSection } from "@/components/contact/contact-section";

/* ── Projects components — imported directly, never modified ── */
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
 * PortfolioContent — single-page composition of all portfolio sections.
 *
 * About → Experience → Projects → Education → Contact
 *
 * The Projects section is embedded inline using the exact same components
 * from the original projects-page-content.tsx — nothing is rebuilt.
 */
export function PortfolioContent() {
    return (
        <MotionConfig reducedMotion="user">
            <SiteHeader />
            <main className="relative">
                {/* ───── ABOUT ───── */}
                <AboutSection />

                {/* ───── EXPERIENCE ───── */}
                <ExperienceSection />

                {/* ───── PROJECTS (existing, untouched) ───── */}
                <div id="projects" className="scroll-mt-20">
                    <ProjectsHero />

                    <section
                        id="featured"
                        aria-labelledby="featured-heading"
                        className="mx-auto max-w-6xl scroll-mt-24 px-5 sm:px-8"
                    >
                        <Reveal className="flex flex-col gap-3">
                            <SectionLabel index="02">Featured</SectionLabel>
                            <h2
                                id="featured-heading"
                                className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                            >
                                Work I&apos;d put my name on first.
                            </h2>
                        </Reveal>

                        <div className="mt-12 flex flex-col gap-20 sm:gap-28 lg:gap-32">
                            <FeaturedProject
                                project={featuredProject}
                                index="01"
                                emphasis
                            />
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

                    <div className="mt-28 sm:mt-36" />
                </div>

                {/* ───── EDUCATION ───── */}
                <EducationSection />

                {/* ───── CONTACT ───── */}
                <ContactSection />

                {/* ───── FOOTER ───── */}
                <SiteFooter />
            </main>
        </MotionConfig>
    );
}
