"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/projects";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    GithubIcon,
    LinkedinIcon,
    LeetcodeIcon,
    KaggleIcon,
} from "@/components/brand-icons";
import { useActiveSection } from "@/hooks/use-active-section";
import { EASE } from "@/components/motion-primitives";

/**
 * SiteHeader — sticky top navigation with active-section indication,
 * mobile hamburger menu, and smooth scroll click handling.
 */

const NAV = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV.map((n) => n.href.slice(1));

const SOCIALS = [
    { label: "GitHub", href: socialLinks.github, Icon: GithubIcon },
    { label: "LinkedIn", href: socialLinks.linkedin, Icon: LinkedinIcon },
    { label: "LeetCode", href: socialLinks.leetcode, Icon: LeetcodeIcon },
    { label: "Kaggle", href: socialLinks.kaggle, Icon: KaggleIcon },
];

export function SiteHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeSection = useActiveSection(SECTION_IDS);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                // Update URL hash without jumping
                window.history.pushState(null, "", href);
            }
            setMobileOpen(false);
        },
        []
    );

    return (
        <>
            <motion.header
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="fixed inset-x-0 top-0 z-50"
            >
                <div
                    className={cn(
                        "border-b transition-colors duration-300",
                        scrolled
                            ? "border-border bg-background/80 backdrop-blur-md"
                            : "border-transparent bg-transparent"
                    )}
                >
                    <nav
                        aria-label="Primary"
                        className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8"
                    >
                        {/* Wordmark */}
                        <a
                            href="#about"
                            onClick={(e) => handleNavClick(e, "#about")}
                            className="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-card font-mono text-sm font-semibold text-foreground">
                                MK
                            </span>
                            <span className="hidden text-sm font-medium tracking-tight text-foreground sm:block">
                                Mitansh Kanani
                            </span>
                        </a>

                        {/* Center nav — desktop */}
                        <ul className="mx-auto hidden items-center gap-1 md:flex">
                            {NAV.map((item) => {
                                const sectionId = item.href.slice(1);
                                const isActive = activeSection === sectionId;
                                return (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className={cn(
                                                "relative rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                isActive
                                                    ? "text-foreground"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                            aria-current={isActive ? "true" : undefined}
                                        >
                                            {item.label}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="nav-active-indicator"
                                                    className="absolute inset-x-1 -bottom-[1px] h-0.5 rounded-full bg-brand"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 380,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Right cluster */}
                        <div className="ml-auto flex items-center gap-1 md:ml-0">
                            <div className="hidden items-center gap-0.5 sm:flex">
                                {SOCIALS.map(({ label, href, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        aria-label={label}
                                        className="inline-flex size-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    >
                                        <Icon className="size-4" />
                                    </a>
                                ))}
                            </div>
                            <span
                                className="mx-1 hidden h-5 w-px bg-border sm:block"
                                aria-hidden
                            />
                            <ThemeToggle />

                            {/* Mobile menu button */}
                            <button
                                type="button"
                                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileOpen}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="ml-1 inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 backdrop-blur transition-colors hover:text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {mobileOpen ? (
                                    <X className="size-4" />
                                ) : (
                                    <Menu className="size-4" />
                                )}
                            </button>
                        </div>
                    </nav>
                </div>
            </motion.header>

            {/* Mobile slide-down menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-lg md:hidden"
                    >
                        <nav aria-label="Mobile navigation" className="px-5 py-4">
                            <ul className="flex flex-col gap-1">
                                {NAV.map((item) => {
                                    const sectionId = item.href.slice(1);
                                    const isActive = activeSection === sectionId;
                                    return (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                onClick={(e) =>
                                                    handleNavClick(e, item.href)
                                                }
                                                className={cn(
                                                    "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                                                    isActive
                                                        ? "bg-brand/10 text-brand"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                                aria-current={
                                                    isActive ? "true" : undefined
                                                }
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Social links in mobile menu */}
                            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 sm:hidden">
                                {SOCIALS.map(({ label, href, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        aria-label={label}
                                        className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-foreground/70 transition-colors hover:text-foreground"
                                    >
                                        <Icon className="size-4" />
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
