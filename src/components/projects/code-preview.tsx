"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Static, syntax-highlighted code + terminal previews for projects that have
 * no embeddable live site (ML-Java-Pipeline, CNN Shape Classification).
 *
 * These deliberately avoid pretending a demo exists — they show the *shape*
 * of the engineering work (real Java structure, real CLI flow) instead.
 */

type Tok = { t: string; c?: string };

const JAVA_CLASS: Record<string, string> = {
    kw: "text-[oklch(0.72_0.16_300)] dark:text-[oklch(0.78_0.14_300)]",
    type: "text-[oklch(0.62_0.16_250)] dark:text-[oklch(0.74_0.13_250)]",
    str: "text-[oklch(0.6_0.14_140)] dark:text-[oklch(0.72_0.13_140)]",
    num: "text-[oklch(0.65_0.16_45)] dark:text-[oklch(0.78_0.14_55)]",
    cmt: "text-white/35 italic",
    anno: "text-[oklch(0.72_0.13_55)]",
};

// Representative slice of the from-scratch CNN forward pass in pure Java.
const CNN_CODE: Tok[][] = [
    [{ t: "// forward pass — convolution → ReLU → pool", c: "cmt" }],
    [{ t: "public", c: "kw" }, { t: " " }, { t: "double", c: "type" }, { t: "[][] " }, { t: "forward" }, { t: "(" }, { t: "double", c: "type" }, { t: "[][] input) {" }],
    [{ t: "    double", c: "type" }, { t: "[][] conv = " }, { t: "convolve" }, { t: "(input, kernel);" }],
    [{ t: "    double", c: "type" }, { t: "[][] act  = " }, { t: "relu" }, { t: "(conv);" }],
    [{ t: "    return", c: "kw" }, { t: " " }, { t: "maxPool" }, { t: "(act, " }, { t: "2", c: "num" }, { t: ");" }],
    [{ t: "}" }],
    [{ t: "" }],
    [{ t: "@PostMapping", c: "anno" }, { t: "(" }, { t: '"/predict"', c: "str" }, { t: ")" }],
    [{ t: "public", c: "kw" }, { t: " Prediction " }, { t: "classify" }, { t: "(" }, { t: "@RequestParam", c: "anno" }, { t: " MultipartFile img) {" }],
    [{ t: "    return", c: "kw" }, { t: " net." }, { t: "predict" }, { t: "(img);  " }, { t: "// { shape, confidence }", c: "cmt" }],
    [{ t: "}" }],
];

const TERMINAL_LINES = [
    { text: "$ mvn -q exec:java", kind: "cmd" as const },
    { text: "Select dataset:", kind: "out" as const },
    { text: "  [1] iris.csv   [2] housing.csv", kind: "muted" as const },
    { text: "> 1", kind: "in" as const },
    { text: "CSVReader → 150 rows · 5 columns", kind: "ok" as const },
    { text: "pre-processing… [in progress]", kind: "warn" as const },
];

export function CodePreview({ className }: { className?: string }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

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

    return (
        <div
            ref={ref}
            className={cn(
                "absolute inset-0 flex flex-col bg-[oklch(0.16_0.008_60)] p-4 font-mono text-[0.78rem] leading-relaxed",
                className
            )}
        >
            {CNN_CODE.map((line, i) => (
                <motion.div
                    key={i}
                    className="flex gap-3 whitespace-pre"
                    initial={reduce || !inView ? false : { opacity: 0, y: 4 }}
                    animate={inView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                >
                    <span className="w-5 select-none text-right text-white/20">{i + 1}</span>
                    <span>
                        {line.map((tok, j) => (
                            <span key={j} className={tok.c ? JAVA_CLASS[tok.c] : "text-white/85"}>
                                {tok.t}
                            </span>
                        ))}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}

export function TerminalPreview({ className }: { className?: string }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [visible, setVisible] = useState(0);

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

    useEffect(() => {
        if (!inView) return;
        if (reduce) {
            setVisible(TERMINAL_LINES.length);
            return;
        }
        TERMINAL_LINES.forEach((_, i) => {
            setTimeout(() => setVisible(i + 1), 400 + i * 520);
        });
    }, [inView, reduce]);

    return (
        <div
            ref={ref}
            className={cn(
                "absolute inset-0 flex flex-col bg-[oklch(0.14_0.008_60)] p-4 font-mono text-[0.78rem] leading-relaxed",
                className
            )}
        >
            <div className="mb-2 flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
                <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
                ml-java-pipeline · maven
            </div>
            <div className="space-y-1.5">
                {TERMINAL_LINES.slice(0, visible).map((line, i) => (
                    <div
                        key={i}
                        className={cn(
                            line.kind === "cmd" && "text-white/85",
                            line.kind === "out" && "text-white/60",
                            line.kind === "muted" && "text-white/35",
                            line.kind === "in" && "text-[oklch(0.8_0.14_55)]",
                            line.kind === "ok" && "text-emerald-400/80",
                            line.kind === "warn" && "text-amber-400/80"
                        )}
                    >
                        {line.text}
                    </div>
                ))}
                {inView && visible < TERMINAL_LINES.length && !reduce && (
                    <span className="inline-block h-3.5 w-2 animate-pulse bg-white/60" aria-hidden />
                )}
            </div>
        </div>
    );
}
