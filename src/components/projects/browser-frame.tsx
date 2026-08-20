"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * BrowserFrame — a lightweight browser chrome mockup used to house live
 * iframe previews and screenshots. Gives embedded sites a deliberate,
 * "product shot" framing instead of looking like a random embed.
 */
export function BrowserFrame({
    url,
    children,
    className,
    contentClassName,
    onReload,
}: {
    url: string;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    onReload?: () => void;
}) {
    // Show a clean host label rather than the full URL.
    let host = url;
    try {
        host = new URL(url).host.replace(/^www\./, "");
    } catch {
        /* keep raw string */
    }

    return (
        <div
            className={cn(
                "flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
                className
            )}
        >
            {/* Top chrome bar */}
            <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-3 py-2.5">
                <div className="flex items-center gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-red-400/80" />
                    <span className="size-2.5 rounded-full bg-amber-400/80" />
                    <span className="size-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 rounded-md border border-border/70 bg-background/70 px-2.5 py-1">
                    <svg
                        viewBox="0 0 24 24"
                        className="size-3 shrink-0 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                    >
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="truncate font-mono text-[0.7rem] text-muted-foreground">
                        {host}
                    </span>
                </div>
                {onReload ? (
                    <button
                        type="button"
                        onClick={onReload}
                        aria-label="Reload preview"
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="size-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden
                        >
                            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                            <path d="M21 3v6h-6" />
                        </svg>
                    </button>
                ) : (
                    <span className="size-5" aria-hidden />
                )}
            </div>

            {/* Content */}
            <div className={cn("relative flex-1 overflow-hidden bg-background", contentClassName)}>
                {children}
            </div>
        </div>
    );
}
