"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Shared easing + timing so every animation on the page feels like part
 * of the same system rather than a pile of unrelated effects.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal — fades + lifts content into view once, on scroll.
 *
 * Animation *values* are intentionally constant (never branched on
 * `useReducedMotion`) so the server-rendered HTML and the first client
 * render are byte-identical → no hydration mismatch. Reduced-motion is
 * handled globally by <MotionConfig reducedMotion="user">, which strips
 * transform animations (snapping to target) while keeping opacity fades.
 */
export function Reveal({
    children,
    delay = 0,
    y = 18,
    once = true,
    className,
    as = "div",
    ...props
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    once?: boolean;
    className?: string;
    as?: keyof typeof motion;
} & Omit<HTMLMotionProps<"div">, "children">) {
    const Comp = motion[as] as typeof motion.div;

    return (
        <Comp
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay }}
            {...props}
        >
            {children}
        </Comp>
    );
}

/**
 * Stagger — parent container that reveals its <StaggerItem> children in
 * sequence. Pair with StaggerItem for lists / grids.
 */
export function Stagger({
    children,
    className,
    delayChildren = 0.05,
    staggerChildren = 0.08,
}: {
    children: ReactNode;
    className?: string;
    delayChildren?: number;
    staggerChildren?: number;
}) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
                hidden: {},
                show: {
                    transition: { delayChildren, staggerChildren },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className,
    y = 16,
}: {
    children: ReactNode;
    className?: string;
    y?: number;
}) {
    const variants: Variants = {
        hidden: { opacity: 0, y },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: EASE },
        },
    };
    return (
        <motion.div className={className} variants={variants}>
            {children}
        </motion.div>
    );
}

export { EASE };
