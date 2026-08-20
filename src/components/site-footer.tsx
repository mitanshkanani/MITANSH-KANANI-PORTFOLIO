"use client";

import { ArrowUpRight, ArrowUp } from "lucide-react";
import { socialLinks } from "@/lib/projects";
import {
    GithubIcon,
    LinkedinIcon,
    LeetcodeIcon,
} from "@/components/brand-icons";

/**
 * SiteFooter — closing band with a direct CTA and profile links.
 *
 * Now links to the on-page Contact section and keeps the direct email
 * CTA. Profile links remain unchanged.
 */

const links = [
    { label: "GitHub", href: socialLinks.github, Icon: GithubIcon },
    { label: "LinkedIn", href: socialLinks.linkedin, Icon: LinkedinIcon },
    { label: "LeetCode", href: socialLinks.leetcode, Icon: LeetcodeIcon },
];

function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteFooter() {
    return (
        <footer className="relative overflow-hidden border-t border-border">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -bottom-24 -z-10 mx-auto h-64 w-[42rem] max-w-full rounded-full bg-brand/10 blur-[120px]"
            />
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            Open to opportunities
                        </p>
                        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            Let&apos;s build something worth shipping.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            I&apos;m Mitansh Kanani, a computer engineering student focused on
                            compilers, developer tooling and applied machine learning. The
                            fastest way to reach me is email.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <a
                                href={socialLinks.email}
                                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                mitanshkanani@outlook.com
                                <ArrowUpRight
                                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    aria-hidden
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => scrollTo("contact")}
                                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                Send a message
                                <ArrowUp className="size-3.5" aria-hidden />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {links.map(({ label, href, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={label}
                                className="inline-flex size-11 items-center justify-center rounded-xl border border-border text-foreground/70 transition-colors hover:border-foreground/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                <Icon className="size-4.5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>© {new Date().getFullYear()} Mitansh Kanani.</span>
                    <span className="font-mono">
                        Built with Next.js, Tailwind CSS &amp; Motion.
                    </span>
                </div>
            </div>
        </footer>
    );
}
