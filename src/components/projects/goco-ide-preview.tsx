"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * GocoIdePreview — bespoke IDE mockup for the GOCO project.
 *
 * gocoide.com sends `X-Frame-Options: DENY`, so a live iframe is impossible.
 * Rather than fight the security policy, this recreates the *idea* of the
 * GOCO IDE: a syntax-highlighted editor for the GOCO language plus a
 * simulated compile + run cycle, giving the flagship project a strong,
 * on-brand visual narrative instead of a generic screenshot.
 */

// A small, representative GOCO program. Token typing is intentional — GOCO
// uses `display` for output and `input` sequences (per the language spec).
type Tok = { t: string; c?: string };

const CODE_LINES: Tok[][] = [
    [{ t: "func", c: "kw" }, { t: " " }, { t: "factorial", c: "fn" }, { t: "(" }, { t: "n", c: "var" }, { t: " = ", c: "op" }, { t: "5", c: "num" }, { t: ") {" }],
    [{ t: "  var", c: "kw" }, { t: " result", c: "var" }, { t: " = ", c: "op" }, { t: "1", c: "num" }],
    [{ t: "  loop", c: "kw" }, { t: " i", c: "var" }, { t: " in ", c: "op" }, { t: "1", c: "num" }, { t: "..", c: "op" }, { t: "n", c: "var" }, { t: " {" }],
    [{ t: "    result", c: "var" }, { t: " = ", c: "op" }, { t: "result * i", c: "var" }],
    [{ t: "  }" }],
    [{ t: "  display", c: "fn" }, { t: " ", c: "" }, { t: '"factorial → "', c: "str" }, { t: " + ", c: "op" }, { t: "result", c: "var" }],
    [{ t: "  return", c: "kw" }, { t: " result", c: "var" }],
    [{ t: "}" }],
    [{ t: "" }],
    [{ t: "factorial", c: "fn" }, { t: "(" }, { t: "6", c: "num" }, { t: ")" }],
];

const TOKEN_CLASS: Record<string, string> = {
    kw: "text-[oklch(0.72_0.16_300)] dark:text-[oklch(0.78_0.14_300)]",
    fn: "text-[oklch(0.62_0.16_250)] dark:text-[oklch(0.74_0.13_250)]",
    str: "text-[oklch(0.6_0.14_140)] dark:text-[oklch(0.72_0.13_140)]",
    num: "text-[oklch(0.65_0.16_45)] dark:text-[oklch(0.78_0.14_55)]",
    op: "text-[oklch(0.62_0.14_20)] dark:text-[oklch(0.74_0.13_20)]",
    var: "text-foreground/80",
};

const OUTPUT_LINES = [
    { text: "$ goco run factorial.goco", kind: "cmd" as const },
    { text: "compiling… done in 0.12s", kind: "muted" as const },
    { text: "factorial → 720", kind: "out" as const },
    { text: "process finished · exit 0", kind: "ok" as const },
];

export function GocoIdePreview({ className }: { className?: string }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [running, setRunning] = useState(false);
    const [visibleOut, setVisibleOut] = useState(0);

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

    // Auto-run the demo once when it first scrolls into view.
    useEffect(() => {
        if (!inView) return;
        runProgram();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    function runProgram() {
        if (reduce) {
            setVisibleOut(OUTPUT_LINES.length);
            return;
        }
        setRunning(true);
        setVisibleOut(0);
        OUTPUT_LINES.forEach((_, i) => {
            setTimeout(() => {
                setVisibleOut(i + 1);
                if (i === OUTPUT_LINES.length - 1) setRunning(false);
            }, 550 + i * 480);
        });
    }

    return (
        <div ref={ref} className={cn("absolute inset-0 flex flex-col bg-[oklch(0.16_0.008_60)] font-mono text-[0.8rem]", className)}>
            {/* Editor toolbar */}
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
                <div className="flex items-center gap-2 text-white/50">
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[0.65rem] tracking-wide text-white/70">
                        factorial.goco
                    </span>
                    <span className="text-[0.65rem] text-white/30">GOCO</span>
                </div>
                <button
                    type="button"
                    onClick={runProgram}
                    disabled={running}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[oklch(0.7_0.15_55)] px-2 py-1 text-[0.65rem] font-medium text-[oklch(0.16_0.02_60)] transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.7_0.15_55)] focus-visible:ring-offset-1 focus-visible:ring-offset-[oklch(0.16_0.008_60)]"
                >
                    <Play className="size-3 fill-current" aria-hidden />
                    {running ? "running…" : "Run"}
                </button>
            </div>

            {/* Editor body */}
            <div className="flex-1 overflow-hidden p-3 leading-relaxed">
                {CODE_LINES.map((line, i) => (
                    <motion.div
                        key={i}
                        className="flex gap-3 whitespace-pre"
                        initial={reduce || !inView ? false : { opacity: 0, x: -6 }}
                        animate={inView ? { opacity: 1, x: 0 } : undefined}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                    >
                        <span className="w-5 select-none text-right text-white/20">{i + 1}</span>
                        <span>
                            {line.map((tok, j) => (
                                <span key={j} className={tok.c ? TOKEN_CLASS[tok.c] : "text-white/85"}>
                                    {tok.t}
                                </span>
                            ))}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Console / output */}
            <div className="h-[42%] shrink-0 border-t border-white/10 bg-black/30 p-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
                    <Circle className={cn("size-1.5 fill-current", running ? "text-amber-400 animate-pulse" : "text-emerald-400")} aria-hidden />
                    console
                </div>
                <div className="space-y-1">
                    {OUTPUT_LINES.slice(0, visibleOut).map((line, i) => (
                        <div
                            key={i}
                            className={cn(
                                "text-[0.72rem]",
                                line.kind === "cmd" && "text-white/80",
                                line.kind === "muted" && "text-white/35",
                                line.kind === "out" && "text-[oklch(0.8_0.14_55)]",
                                line.kind === "ok" && "text-emerald-400/80"
                            )}
                        >
                            {line.text}
                        </div>
                    ))}
                    {running && (
                        <span className="inline-block h-3 w-1.5 animate-pulse bg-[oklch(0.7_0.15_55)]" aria-hidden />
                    )}
                </div>
            </div>
        </div>
    );
}
