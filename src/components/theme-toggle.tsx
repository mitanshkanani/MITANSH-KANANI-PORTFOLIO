"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * ThemeToggle — premium toggle that feels like a small physical mechanism.
 *
 * Design:  A rounded pill-shaped track with a sliding knob. The knob
 * contains a sun/moon icon that morphs between states. The track subtly
 * changes its background gradient. The knob's position slides between
 * left (light) and right (dark) with a spring physics transition.
 *
 * Accessible: keyboard-operable, has proper aria attributes, respects
 * reduced-motion, and the current state is announced.
 */
export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const reduce = useReducedMotion();

    useEffect(() => setMounted(true), []);

    const isDark = mounted && resolvedTheme === "dark";

    const toggle = useCallback(() => {
        setTheme(isDark ? "light" : "dark");
    }, [isDark, setTheme]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        },
        [toggle]
    );

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label={
                !mounted
                    ? "Toggle theme"
                    : isDark
                      ? "Switch to light theme"
                      : "Switch to dark theme"
            }
            title="Toggle theme"
            onClick={toggle}
            onKeyDown={handleKeyDown}
            className={cn(
                "group relative inline-flex h-8 w-[52px] shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                mounted && isDark
                    ? "bg-[hsl(230,15%,15%)] border-white/10"
                    : "bg-[hsl(45,40%,92%)] border-black/10",
                className
            )}
        >
            {/* Track decoration — stars (dark) / rays (light) */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                {/* Tiny stars visible in dark mode */}
                <span
                    className={cn(
                        "absolute left-2 top-1/2 -translate-y-1/2 text-[5px] leading-none transition-opacity duration-500",
                        mounted && isDark ? "opacity-60" : "opacity-0"
                    )}
                    aria-hidden
                >
                    ✦
                </span>
                <span
                    className={cn(
                        "absolute left-[14px] top-[6px] text-[4px] leading-none transition-opacity duration-500 delay-100",
                        mounted && isDark ? "opacity-40" : "opacity-0"
                    )}
                    aria-hidden
                >
                    ✦
                </span>

                {/* Small cloud hint visible in light mode */}
                <span
                    className={cn(
                        "absolute right-[10px] top-1/2 -translate-y-1/2 text-[6px] leading-none transition-opacity duration-500",
                        mounted && !isDark ? "opacity-40" : "opacity-0"
                    )}
                    aria-hidden
                >
                    ☁
                </span>
            </span>

            {/* Sliding knob */}
            <motion.span
                layout
                animate={{
                    x: mounted && isDark ? 22 : 2,
                }}
                transition={
                    reduce
                        ? { duration: 0 }
                        : {
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                              mass: 0.8,
                          }
                }
                className={cn(
                    "relative z-10 flex size-6 items-center justify-center rounded-full shadow-md transition-colors duration-300",
                    mounted && isDark
                        ? "bg-[hsl(230,20%,25%)] shadow-brand/20"
                        : "bg-white shadow-amber-400/30"
                )}
            >
                {/* Sun icon */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute size-3.5"
                    animate={{
                        scale: mounted && isDark ? 0 : 1,
                        rotate: mounted && isDark ? -90 : 0,
                        opacity: mounted && isDark ? 0 : 1,
                    }}
                    transition={
                        reduce ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }
                    aria-hidden
                    style={{ color: "hsl(40, 90%, 50%)" }}
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                </motion.svg>

                {/* Moon icon */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute size-3.5"
                    animate={{
                        scale: mounted && isDark ? 1 : 0,
                        rotate: mounted && isDark ? 0 : 90,
                        opacity: mounted && isDark ? 1 : 0,
                    }}
                    transition={
                        reduce ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }
                    aria-hidden
                    style={{ color: "hsl(220, 60%, 75%)" }}
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </motion.svg>
            </motion.span>
        </button>
    );
}
