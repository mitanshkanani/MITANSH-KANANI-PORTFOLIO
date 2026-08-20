"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { statusMeta, type ProjectStatus } from "@/lib/projects";

/**
 * SectionLabel — small monospaced eyebrow used to introduce sections.
 * Communicates a "technical documentation" register.
 */
export function SectionLabel({
    index,
    children,
    className,
}: {
    index?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
                className
            )}
        >
            {index && (
                <span className="text-brand tabular-nums">{index}</span>
            )}
            <span className="h-px w-8 bg-border" aria-hidden />
            <span>{children}</span>
        </div>
    );
}

/**
 * StatusBadge — live/in-progress indicator with a colored dot.
 */
export function StatusBadge({
    status,
    className,
}: {
    status: ProjectStatus;
    className?: string;
}) {
    const meta = statusMeta[status];
    const isLive = status === "shipped";
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-foreground/80 backdrop-blur",
                className
            )}
        >
            <span className="relative flex size-1.5">
                {isLive && (
                    <span
                        className={cn(
                            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                            meta.dot
                        )}
                        aria-hidden
                    />
                )}
                <span className={cn("relative inline-flex size-1.5 rounded-full", meta.dot)} />
            </span>
            {meta.label}
        </span>
    );
}

/**
 * TechBadge — single technology pill.
 */
export function TechBadge({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md border border-border/80 bg-muted/40 px-2 py-0.5 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground",
                className
            )}
        >
            {children}
        </span>
    );
}

/**
 * MetricStat — large number + supporting label. Used for verified metrics.
 */
export function MetricStat({
    value,
    label,
    className,
}: {
    value: string;
    label: string;
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col", className)}>
            <span className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {value}
            </span>
            <span className="mt-0.5 text-xs leading-snug text-muted-foreground">
                {label}
            </span>
        </div>
    );
}

/**
 * MagneticButton — subtle pointer-follow effect on a link/button.
 * Falls back to a plain element under reduced motion.
 */
export function MagneticButton({
    children,
    className,
    strength = 0.35,
}: {
    children: ReactNode;
    className?: string;
    strength?: number;
}) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    function handleMove(e: React.MouseEvent<HTMLDivElement>) {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
        setPos({ x, y });
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={() => setPos({ x: 0, y: 0 })}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
            className={cn("inline-flex", className)}
        >
            {children}
        </motion.div>
    );
}
