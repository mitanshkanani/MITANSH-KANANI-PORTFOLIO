"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Loader2, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * LiveIframePreview — lazily mounts a real live-site iframe once it scrolls
 * into view, with a load timeout fallback in case a site silently blocks
 * embedding (X-Frame-Options / CSP frame-ancestors) at runtime.
 *
 * Interaction is gated behind a click-to-interact overlay so that scrolling
 * the page doesn't get "trapped" inside the iframe on touch devices.
 */
export function LiveIframePreview({
    url,
    title,
    className,
    timeoutMs = 8000,
}: {
    url: string;
    title: string;
    className?: string;
    /** Time to wait for the frame to load before assuming it was blocked. */
    timeoutMs?: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const [interactive, setInteractive] = useState(false);

    // Mount iframe only when scrolled near viewport.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // If the frame never loads within the window, assume it was blocked.
    useEffect(() => {
        if (!inView || loaded) return;
        const timeout = setTimeout(() => {
            if (!loaded) setFailed(true);
        }, timeoutMs);
        return () => clearTimeout(timeout);
    }, [inView, loaded, timeoutMs]);

    return (
        <div ref={containerRef} className={cn("absolute inset-0", className)}>
            {/* Loading shimmer */}
            {inView && !loaded && !failed && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background">
                    <Loader2 className="size-5 animate-spin text-brand" aria-hidden />
                    <span className="font-mono text-xs text-muted-foreground">
                        loading live preview…
                    </span>
                </div>
            )}

            {/* Blocked / failed fallback */}
            {failed && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background p-6 text-center">
                    <p className="max-w-xs text-sm text-muted-foreground">
                        This site can&apos;t be embedded here, but it&apos;s live and ready to explore.
                    </p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        Open live site
                        <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                </div>
            )}

            {/* Click-to-interact overlay (keeps scroll smooth until user opts in) */}
            {loaded && !failed && !interactive && (
                <button
                    type="button"
                    onClick={() => setInteractive(true)}
                    className="group absolute inset-0 z-10 flex items-end justify-center bg-transparent pb-4 focus-visible:outline-none"
                    aria-label={`Interact with the live ${title} preview`}
                >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/85 px-3 py-1.5 font-mono text-[0.7rem] text-foreground/80 opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <MousePointerClick className="size-3.5" aria-hidden />
                        click to interact
                    </span>
                </button>
            )}

            {inView && !failed && (
                <iframe
                    src={url}
                    title={`Live preview of ${title}`}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    className={cn(
                        "h-full w-full border-0 bg-white transition-opacity duration-500",
                        loaded ? "opacity-100" : "opacity-0",
                        interactive ? "pointer-events-auto" : "pointer-events-none"
                    )}
                />
            )}
        </div>
    );
}
