"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Static, syntax-highlighted code preview for projects that have no
 * embeddable live site (CNN Shape Classification).
 *
 * This deliberately avoids pretending a demo exists — it shows the *shape*
 * of the engineering work (real Java structure) instead.
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
