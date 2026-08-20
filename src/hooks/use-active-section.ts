"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Tracks which section is currently visible in the viewport.
 * Uses IntersectionObserver to detect which section ID is most visible.
 */
export function useActiveSection(sectionIds: string[]): string {
    const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            // Find the entry with the highest intersection ratio
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visible.length > 0) {
                setActiveId(visible[0].target.id);
            }
        },
        []
    );

    useEffect(() => {
        observerRef.current = new IntersectionObserver(handleIntersect, {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0, 0.1, 0.25, 0.5],
        });

        const observer = observerRef.current;

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds, handleIntersect]);

    return activeId;
}
