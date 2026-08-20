import type { Metadata } from "next";
import { PortfolioContent } from "@/components/portfolio-content";

export const metadata: Metadata = {
    title: "Mitansh Kanani — Portfolio",
    description:
        "Mitansh Kanani — Founder, Software Engineer, AI/ML Engineer. Building GOCO (a programming language, compiler and IDE), AI-assisted platforms, and full-stack systems.",
    openGraph: {
        title: "Mitansh Kanani — Portfolio",
        description:
            "Founder at GOCO. Building a programming language, compiler, and IDE. Software engineer focused on compilers, developer tooling, and applied machine learning.",
        type: "website",
        url: "/",
    },
    alternates: { canonical: "/" },
};

/**
 * Root page — Server Component for SEO metadata.
 *
 * The interactive, multi-section portfolio body lives in PortfolioContent
 * (a Client Component) so Lucide icon components embedded in project data
 * never cross the RSC serialization boundary.
 */
export default function HomePage() {
    return <PortfolioContent />;
}
