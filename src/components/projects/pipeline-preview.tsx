"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
    Database,
    Search,
    ListChecks,
    Wand2,
    Target,
    Boxes,
    LineChart,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PipelinePreview — interactive visualization of the ML-Java-Pipeline CLI flow.
 *
 * Renders the seven-stage workflow as a vertical, connected sequence:
 *   Dataset → Inspection → Column Selection → Preprocessing →
 *   Task Selection → Model Selection → Evaluation
 *
 * Honest status: stages 1–4 are marked "built" (verified in the repo), while
 * stages 5–7 are marked "planned" (task/model/eval are still in development).
 *
 * Behaviour:
 * - In view, an active highlight auto-advances down the stages (subtle pulse
 *   travels the connector line). Matches the existing TerminalPreview pattern.
 * - Hovering / focusing a stage pins it (pauses auto-play) — desktop nicety.
 * - Under reduced motion, everything renders static with no travelling pulse.
 * - Theme-aware (light/dark) via design tokens; readable at thumbnail + mobile.
 */

type Stage = {
    label: string;
    icon: typeof Database;
    built: boolean;
};

const STAGES: Stage[] = [
    { label: "Dataset", icon: Database, built: true },
    { label: "Inspection", icon: Search, built: true },
    { label: "Column Selection", icon: ListChecks, built: true },
    { label: "Preprocessing", icon: Wand2, built: true },
    { label: "Task Selection", icon: Target, built: false },
    { label: "Model Selection", icon: Boxes, built: false },
    { label: "Evaluation", icon: LineChart, built: false },
];

const BUILT_COUNT = STAGES.filter((s) => s.built).length;

export function PipelinePreview({ className }: { className?: string }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [active, setActive] = useState(0);
    const [pinned, setPinned] = useState<number | null>(null);

    // Start once scrolled into view (cheap, disconnects after firing).
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { rootMargin: "120px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Auto-advance the active stage while in view and not pinned.
    useEffect(() => {
        if (!inView || reduce || pinned !== null) return;
        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % STAGES.length);
        }, 1400);
        return () => clearInterval(id);
    }, [inView, reduce, pinned]);

    // Under reduced motion, show the full built path as "reached".
    const current = reduce ? BUILT_COUNT - 1 : pinned ?? active;

    return (
        <div
            ref={ref}
            className={cn(
                "absolute inset-0 flex flex-col overflow-hidden bg-background",
                className
            )}
        >
            {/* Ambient grid + brand wash, consistent with section backgrounds */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-dots opacity-[0.5] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
                <div className="absolute -top-10 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
            </div>

            {/* Header row */}
            <div className="relative z-10 flex items-center justify-between gap-2 border-b border-border/70 px-3.5 py-2">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    CLI workflow
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-2 py-0.5 font-mono text-[0.6rem] text-muted-foreground backdrop-blur">
                    <span className="size-1.5 rounded-full bg-amber-500" aria-hidden />
                    {BUILT_COUNT}/{STAGES.length} built
                </span>
            </div>

            {/* Stages */}
            <ul
                className="relative z-10 flex flex-1 flex-col justify-between px-3.5 py-3"
                aria-label="ML pipeline stages"
            >
                {STAGES.map((stage, i) => {
                    const Icon = stage.icon;
                    const isActive = i === current;
                    const isReached = i <= current;
                    const isLast = i === STAGES.length - 1;

                    return (
                        <li key={stage.label} className="relative">
                            {/* Connector segment to the next node */}
                            {!isLast && (
                                <span
                                    aria-hidden
                                    className="absolute left-[13px] top-[26px] h-[calc(100%-8px)] w-px -translate-x-1/2 bg-border"
                                >
                                    <motion.span
                                        className={cn(
                                            "absolute inset-0 origin-top",
                                            stage.built && STAGES[i + 1]?.built
                                                ? "bg-brand/60"
                                                : "bg-amber-500/40"
                                        )}
                                        initial={false}
                                        animate={{ scaleY: i < current ? 1 : 0 }}
                                        transition={{ duration: reduce ? 0 : 0.4, ease: "easeInOut" }}
                                    />
                                </span>
                            )}

                            <button
                                type="button"
                                onMouseEnter={() => !reduce && setPinned(i)}
                                onMouseLeave={() => setPinned(null)}
                                onFocus={() => setPinned(i)}
                                onBlur={() => setPinned(null)}
                                aria-current={isActive ? "step" : undefined}
                                className="group/stage flex w-full items-center gap-2.5 rounded-md py-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {/* Node */}
                                <span className="relative flex size-[26px] shrink-0 items-center justify-center">
                                    {/* Active pulse ring */}
                                    {isActive && !reduce && (
                                        <motion.span
                                            className={cn(
                                                "absolute inset-0 rounded-lg",
                                                stage.built ? "bg-brand/25" : "bg-amber-500/25"
                                            )}
                                            initial={{ scale: 0.7, opacity: 0.8 }}
                                            animate={{ scale: 1.35, opacity: 0 }}
                                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                                            aria-hidden
                                        />
                                    )}
                                    <span
                                        className={cn(
                                            "relative flex size-[26px] items-center justify-center rounded-lg border transition-colors duration-300",
                                            stage.built
                                                ? isReached
                                                    ? "border-brand/60 bg-brand/15 text-brand"
                                                    : "border-border bg-card text-muted-foreground"
                                                : isReached
                                                    ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                    : "border-dashed border-border bg-card text-muted-foreground/70"
                                        )}
                                    >
                                        <Icon className="size-3.5" aria-hidden />
                                    </span>
                                </span>

                                {/* Label + status */}
                                <span className="flex min-w-0 flex-1 items-center gap-2">
                                    <span
                                        className={cn(
                                            "truncate text-[0.72rem] font-medium transition-colors duration-300",
                                            isActive
                                                ? "text-foreground"
                                                : isReached
                                                    ? "text-foreground/80"
                                                    : "text-muted-foreground"
                                        )}
                                    >
                                        {stage.label}
                                    </span>
                                    {stage.built ? (
                                        <Check
                                            className="size-3 shrink-0 text-brand/70"
                                            aria-label="built"
                                        />
                                    ) : (
                                        <span className="shrink-0 rounded-full border border-amber-500/40 px-1.5 py-px font-mono text-[0.52rem] uppercase tracking-wide text-amber-600 dark:text-amber-400">
                                            wip
                                        </span>
                                    )}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
