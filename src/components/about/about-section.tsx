"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
    motion,
    AnimatePresence,
    useReducedMotion,
    useInView,
} from "motion/react";
import {
    Bot,
    Cpu,
    Rocket,
    Users,
    Search,
    Wrench,
    Lightbulb,
    Brain,
    TrendingUp,
} from "lucide-react";
import { Reveal, EASE } from "@/components/motion-primitives";

/**
 * AboutSection — premium "About Me" section.
 *
 * Content is sourced directly from user specifications. Nothing is invented.
 *
 * This iteration refines (does not rebuild) the existing concept:
 * - Intro overlay: masked word-rise for the name, choreographed accent lines,
 *   ambient grid + brand glow, and a smooth cross-fade into the portfolio.
 * - Trait cards keep their 3D tilt + cursor glow but are grouped under clearer
 *   hierarchy ("How I work").
 * - AI/ML and Finance are promoted to richer, interactive "focus area" cards
 *   with lightweight SVG visualizations (a forward-pass neural net and a
 *   drawing market tape) that react to hover / focus / in-view.
 *
 * Every animation degrades gracefully under prefers-reduced-motion.
 */

const TITLES = ["Founder", "Software Engineer", "AI/ML Engineer", "Quant"];

const TRAITS = [
    {
        icon: Cpu,
        title: "AI-first engineering",
        description:
            "I understand systems bottom-up and go deep internally — no black-box thinking. I use AI-assisted development and automation to implement faster without losing that depth.",
    },
    {
        icon: Rocket,
        title: "Early-stage ownership",
        description:
            "I thrive on early-stage work where I have ownership of the overall system and can shape technical direction.",
    },
    {
        icon: Users,
        title: "Lead & mentor",
        description:
            "I enjoy leading projects and teams, mentoring people, and sharing what I've learned along the way.",
    },
    {
        icon: Search,
        title: "End-to-end understanding",
        description:
            "I prefer understanding systems end-to-end — deep technical understanding over just calling libraries and APIs.",
    },
    {
        icon: Lightbulb,
        title: "Experiment & iterate",
        description:
            "I like experimenting with different approaches until the right result is achieved — iteration over assumption.",
    },
    {
        icon: Wrench,
        title: "Hard problems",
        description:
            "I gravitate toward difficult technical problems — compilers, language design, systems that require thinking from first principles.",
    },
    {
        icon: Bot,
        title: "AI automation",
        description:
            "I enjoy working with AI agents and automated workflows — using them to cut repetitive work and build faster. If a task can be automated, it should be.",
    },
];

/* ─────────────────────────── Rotating Title ─────────────────────────── */

function RotatingTitle() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % TITLES.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    /*
     * Title sits in its own block-level container so it is never overlapped
     * by the "Mitansh Kanani." heading above. Height accommodates ascenders
     * and descenders on every role string.
     */
    return (
        <span
            className="relative block h-[1.2em] w-full overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={TITLES[index]}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-x-0 top-0 block whitespace-nowrap text-gradient"
                >
                    {TITLES[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

/* ────────────────────── Magnetic 3D Trait Card ────────────────────── */

function TraitCard({
    trait,
    index,
}: {
    trait: (typeof TRAITS)[0];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [hovered, setHovered] = useState(false);

    function handleMove(e: React.MouseEvent) {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        setTilt({ x: dy * -5, y: dx * 5 });
        setGlowPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    }

    function handleLeave() {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
    }

    const Icon = trait.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleLeave}
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                    mass: 0.5,
                }}
                style={{ perspective: 800, transformStyle: "preserve-3d" }}
                className="group relative h-full"
            >
                <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card/60 p-6 backdrop-blur transition-colors duration-300 hover:border-brand/40 hover:bg-card/90">
                    {/* Cursor-following radial glow */}
                    {hovered && (
                        <div
                            className="pointer-events-none absolute inset-0 -z-0 opacity-25 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(280px circle at ${glowPos.x}% ${glowPos.y}%, var(--brand), transparent 60%)`,
                            }}
                            aria-hidden
                        />
                    )}

                    {/* Index number */}
                    <span className="absolute right-4 top-4 font-mono text-[0.65rem] tabular-nums text-muted-foreground/40 transition-colors group-hover:text-brand/50">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Icon with animated reaction */}
                    <motion.div
                        animate={hovered ? { scale: 1.1, rotate: -6 } : { scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="relative z-10 mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background/80 text-muted-foreground transition-colors duration-300 group-hover:border-brand/50 group-hover:text-brand"
                    >
                        <Icon className="size-[18px]" />
                    </motion.div>

                    {/* Content */}
                    <h4 className="relative z-10 text-sm font-semibold text-foreground">
                        {trait.title}
                    </h4>
                    <p className="relative z-10 mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
                        {trait.description}
                    </p>

                    {/* Bottom accent line on hover */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-brand/60 to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hovered ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────── Focus-area visualizations (AI/ML + Finance) ─────────────── */

// Node layout for a tiny 3-layer network: input(3) → hidden(4) → output(2).
const NN_X = [20, 100, 180];
const NN_LAYERS = [
    [26, 50, 74],
    [16, 39, 61, 84],
    [39, 61],
];

function NeuralNetViz({
    live,
    reduce,
}: {
    live: boolean;
    reduce: boolean | null;
}) {
    const lines: { x1: number; y1: number; x2: number; y2: number; k: string }[] =
        [];
    for (let l = 0; l < NN_LAYERS.length - 1; l++) {
        NN_LAYERS[l].forEach((y1, i) => {
            NN_LAYERS[l + 1].forEach((y2, j) => {
                lines.push({ x1: NN_X[l], y1, x2: NN_X[l + 1], y2, k: `${l}-${i}-${j}` });
            });
        });
    }

    return (
        <svg
            viewBox="0 0 200 100"
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full"
            aria-hidden
        >
            {lines.map((ln) => (
                <line
                    key={ln.k}
                    x1={ln.x1}
                    y1={ln.y1}
                    x2={ln.x2}
                    y2={ln.y2}
                    stroke="var(--brand)"
                    strokeWidth="0.6"
                    strokeOpacity="0.18"
                    vectorEffect="non-scaling-stroke"
                />
            ))}
            {NN_LAYERS.map((layer, l) =>
                layer.map((y, i) => (
                    <motion.circle
                        key={`${l}-${i}`}
                        cx={NN_X[l]}
                        cy={y}
                        r={4}
                        fill="var(--brand)"
                        initial={false}
                        animate={
                            live && !reduce
                                ? { opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }
                                : { opacity: 0.75, scale: 1 }
                        }
                        style={{ transformOrigin: `${NN_X[l]}px ${y}px` }}
                        transition={
                            live && !reduce
                                ? {
                                    duration: 1.3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: l * 0.32 + i * 0.05,
                                }
                                : { duration: 0.3 }
                        }
                    />
                ))
            )}
        </svg>
    );
}

const MARKET_LINE = "M4,80 L28,72 L52,76 L76,58 L100,63 L124,44 L148,51 L172,30 L196,16";

function MarketViz({
    live,
    reduce,
}: {
    live: boolean;
    reduce: boolean | null;
}) {
    return (
        <svg
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden
        >
            <defs>
                <linearGradient id="mkt-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Area under the tape */}
            <motion.path
                d={`${MARKET_LINE} L196,100 L4,100 Z`}
                fill="url(#mkt-fill)"
                initial={false}
                animate={{ opacity: live ? 1 : 0.35 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* The tape line */}
            <motion.path
                d={MARKET_LINE}
                fill="none"
                stroke="var(--brand)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? false : { pathLength: 0 }}
                animate={reduce ? { pathLength: 1 } : { pathLength: live ? 1 : 0.12 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
            />

            {/* Latest-print marker */}
            <motion.circle
                cx={196}
                cy={16}
                r={3}
                fill="var(--brand)"
                vectorEffect="non-scaling-stroke"
                animate={
                    live && !reduce ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.85 }
                }
                transition={
                    live && !reduce
                        ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.3 }
                }
            />
        </svg>
    );
}

/* ─────────────────────────── Focus-area card ─────────────────────────── */

function FocusCard({
    icon: Icon,
    eyebrow,
    title,
    description,
    caption,
    viz,
    delay,
}: {
    icon: typeof Brain;
    eyebrow: string;
    title: string;
    description: string;
    caption: string;
    viz: (live: boolean, reduce: boolean | null) => React.ReactNode;
    delay: number;
}) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { margin: "-40px" });
    const [active, setActive] = useState(false);
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

    // "Live" when scrolled into view, intensified on hover / focus.
    const live = inView || active;

    function handleMove(e: React.MouseEvent) {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setGlowPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay }}
            onMouseMove={handleMove}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            tabIndex={0}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur transition-colors duration-300 hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            {/* Cursor glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{
                    background: `radial-gradient(360px circle at ${glowPos.x}% ${glowPos.y}%, color-mix(in oklch, var(--brand) 22%, transparent), transparent 60%)`,
                }}
            />

            {/* Visualization panel */}
            <div className="relative z-10 h-28 w-full overflow-hidden border-b border-border/70 bg-background/40 sm:h-32">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
                />
                <div className="absolute inset-0 p-3">{viz(live, reduce)}</div>
            </div>

            {/* Body */}
            <div className="relative z-10 flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2.5">
                    <motion.span
                        animate={active && !reduce ? { rotate: -6, scale: 1.08 } : { rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 16 }}
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground transition-colors duration-300 group-hover:border-brand/50 group-hover:text-brand group-focus-visible:border-brand/50 group-focus-visible:text-brand"
                    >
                        <Icon className="size-4" />
                    </motion.span>
                    <div className="flex flex-col">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                            {eyebrow}
                        </span>
                        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    </div>
                </div>

                <p className="text-[0.85rem] leading-relaxed text-muted-foreground">
                    {description}
                </p>

                {/* Caption / interaction hint */}
                <div className="mt-4 flex items-center gap-2 border-t border-border/70 pt-3">
                    <span className="relative flex size-1.5">
                        {!reduce && (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60" />
                        )}
                        <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                    </span>
                    <span className="font-mono text-[0.68rem] text-muted-foreground">
                        {caption}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────── Intro Overlay Animation ─────────────────────── */

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
    const reduce = useReducedMotion();

    useEffect(() => {
        if (reduce) {
            onComplete();
            return;
        }
        const timer = setTimeout(onComplete, 2400);
        return () => clearTimeout(timer);
    }, [onComplete, reduce]);

    if (reduce) return null;

    const words = ["Mitansh", "Kanani"];

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.8, ease: EASE }}
        >
            {/* Ambient background */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <motion.div
                    className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    transition={{ duration: 1, ease: EASE }}
                />
                <motion.div
                    className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[130px]"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.3, ease: EASE }}
                />
            </div>

            <motion.div
                className="relative flex flex-col items-center px-6"
                initial={{ opacity: 1 }}
                animate={{ y: [0, 0, -10] }}
                transition={{ duration: 2, ease: EASE, times: [0, 0.7, 1] }}
            >
                {/* Top accent line */}
                <motion.div
                    className="mb-7 h-px bg-gradient-to-r from-transparent via-brand to-transparent"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "min(70vw, 22rem)", opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                />

                {/* Name — masked word rise */}
                <h1 className="flex flex-wrap items-baseline justify-center gap-x-[0.3em] font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                    {words.map((word, i) => (
                        <span
                            key={word}
                            className="relative block overflow-hidden py-[0.06em]"
                        >
                            <motion.span
                                className="block"
                                initial={{ y: "115%" }}
                                animate={{ y: "0%" }}
                                transition={{
                                    duration: 0.9,
                                    delay: 0.25 + i * 0.12,
                                    ease: EASE,
                                }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                {/* Subtitle */}
                <motion.p
                    className="mt-5 font-mono text-[0.7rem] uppercase text-muted-foreground sm:text-xs"
                    initial={{ opacity: 0, letterSpacing: "0.15em" }}
                    animate={{ opacity: 1, letterSpacing: "0.4em" }}
                    transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
                >
                    Founder · Engineer · Builder
                </motion.p>

                {/* Bottom accent line */}
                <motion.div
                    className="mt-7 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: "min(50vw, 14rem)" }}
                    transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                />
            </motion.div>
        </motion.div>
    );
}

/* ───────────────────────── About Section ───────────────────────── */

export function AboutSection() {
    const [introComplete, setIntroComplete] = useState(false);
    const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

    return (
        <>
            {/* Cinematic intro overlay on fresh page load */}
            <AnimatePresence>
                {!introComplete && <IntroOverlay onComplete={handleIntroComplete} />}
            </AnimatePresence>

            <section
                id="about"
                aria-labelledby="about-heading"
                className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
            >
                {/* Background ambience */}
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
                    <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/8 blur-[120px]" />
                </div>

                <div className="mx-auto max-w-6xl px-5 sm:px-8">
                    {/* Eyebrow */}
                    <Reveal>
                        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            <span className="h-px w-8 bg-brand" aria-hidden />
                            About
                        </div>
                    </Reveal>

                    {/* Name + rotating title */}
                    <Reveal delay={0.05}>
                        <h1
                            id="about-heading"
                            className="mt-6 max-w-4xl font-heading text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                        >
                            Mitansh Kanani.
                        </h1>
                        <div className="mt-2 max-w-4xl font-heading text-3xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
                            <RotatingTitle />
                        </div>
                    </Reveal>

                    {/* Intro paragraphs */}
                    <Reveal delay={0.1}>
                        <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                            <p>
                                I&apos;m building{" "}
                                <span className="font-medium text-foreground">GOCO</span> — a
                                programming language, its compiler, and a full desktop IDE. I
                                work across language features, compiler-related systems,
                                developer tooling, and the broader GOCO ecosystem.
                            </p>
                            <p>
                                Before GOCO, the idea of designing your own programming language
                                felt like something reserved for large teams with years of
                                experience. But when you believe deeply enough in a problem, you
                                find a way to solve it — even if the path doesn&apos;t exist
                                yet. That conviction is how GOCO went from an idea to a working
                                language with its own IDE, matchmaking system, and team of
                                engineers.
                            </p>
                        </div>
                    </Reveal>

                    {/* ── How I work — trait cards ── */}
                    <Reveal delay={0.05} className="mt-16">
                        <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                            <span className="text-brand">01</span>
                            <span className="h-px w-8 bg-border" aria-hidden />
                            How I work
                        </div>
                    </Reveal>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {TRAITS.slice(0, 6).map((trait, i) => (
                            <TraitCard key={trait.title} trait={trait} index={i} />
                        ))}
                    </div>
                    {/* 7th card — wider, centered below the 3×2 grid */}
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="sm:col-span-2 lg:col-start-2 lg:col-span-1">
                            <TraitCard trait={TRAITS[6]} index={6} />
                        </div>
                    </div>

                    {/* ── Where I go deep — interactive focus areas ── */}
                    <Reveal delay={0.05} className="mt-16">
                        <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                            <span className="text-brand">02</span>
                            <span className="h-px w-8 bg-border" aria-hidden />
                            Where I go deep
                        </div>
                    </Reveal>

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <FocusCard
                            icon={Brain}
                            eyebrow="Focus area"
                            title="AI / ML Mindset"
                            description="I like going deep into AI and ML — understanding what happens internally rather than treating libraries as black boxes. When I build a CNN, I implement every layer and both forward and backward propagation by hand. When I use an API, I want to understand the model architecture behind it."
                            caption="Forward pass, layer by layer"
                            viz={(live, reduce) => <NeuralNetViz live={live} reduce={reduce} />}
                            delay={0.05}
                        />
                        <FocusCard
                            icon={TrendingUp}
                            eyebrow="Personal interest"
                            title="Finance & Markets"
                            description="Finance and trading are personal interests, not professional experience. I enjoy learning about financial markets, trading strategies, crypto, stocks, and how financial systems work at a structural level — curiosity-driven exploration outside of engineering."
                            caption="Curiosity-driven, not professional"
                            viz={(live, reduce) => <MarketViz live={live} reduce={reduce} />}
                            delay={0.1}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}