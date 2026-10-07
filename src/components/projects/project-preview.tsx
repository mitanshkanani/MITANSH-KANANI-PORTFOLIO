"use client";

import { BrowserFrame } from "@/components/projects/browser-frame";
import { LiveIframePreview } from "@/components/projects/live-iframe-preview";
import { GocoIdePreview } from "@/components/projects/goco-ide-preview";
import { CodePreview } from "@/components/projects/code-preview";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * ProjectPreview — single entry point that renders the correct visual
 * preview for a project based on its `preview.kind`, always wrapped in a
 * browser/window frame for consistent "product shot" presentation.
 */
export function ProjectPreview({
    project,
    className,
    contentClassName,
}: {
    project: Project;
    className?: string;
    contentClassName?: string;
}) {
    const { preview, title, liveUrl, githubUrl } = project;
    const frameUrl =
        preview.url ?? liveUrl ?? githubUrl ?? "local://preview";

    return (
        <BrowserFrame
            url={frameUrl}
            className={className}
            contentClassName={cn("min-h-0", contentClassName)}
        >
            {preview.kind === "iframe" && preview.url ? (
                <LiveIframePreview
                    url={preview.url}
                    title={title}
                    timeoutMs={preview.timeoutMs}
                />
            ) : preview.kind === "goco-ide" ? (
                <GocoIdePreview />
            ) : (
                <CodePreview />
            )}
        </BrowserFrame>
    );
}
