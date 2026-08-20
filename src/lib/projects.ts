import type { LucideIcon } from "lucide-react";
import {
    Boxes,
    BrainCircuit,
    Cpu,
    HeartHandshake,
    ShieldCheck,
    Terminal,
} from "lucide-react";

/**
 * Project data model.
 *
 * Every factual claim here is sourced from Mitansh Kanani's resume and/or the
 * live project sites. Nothing is invented — metrics, technologies and outcomes
 * map directly to verifiable sources.
 */

export type ProjectStatus = "shipped" | "completed" | "ongoing" | "research" | "coming-soon";

export type PreviewKind = "iframe" | "goco-ide" | "code" | "terminal" | "pipeline";

export type ProjectCategory =
    | "Developer Tools"
    | "AI / ML"
    | "Full-Stack"
    | "Systems";

export interface ProjectMetric {
    /** Short value, e.g. "60%" or "10+". */
    value: string;
    /** What the value describes, e.g. "faster compilation". */
    label: string;
}

export interface ProjectLink {
    href: string;
    label: string;
}

export interface Project {
    slug: string;
    title: string;
    /** One-line positioning statement. */
    tagline: string;
    /** Longer narrative used in the detail view. */
    description: string;
    /** Bullet-point highlights, each a verifiable achievement. */
    highlights: string[];
    role: string;
    timeframe: string;
    status: ProjectStatus;
    category: ProjectCategory;
    /** Ordered from most to least important for display emphasis. */
    technologies: string[];
    metrics: ProjectMetric[];
    featured: boolean;
    /** Controls how the visual preview renders. */
    preview: {
        kind: PreviewKind;
        /** Present when kind === "iframe". */
        url?: string;
        /** Whether the site was verified to allow iframe embedding. */
        embeddable?: boolean;
    };
    liveUrl?: string;
    githubUrl?: string;
    icon: LucideIcon;
    /** Accent used sparingly for per-project identity (oklch-friendly hsl-ish). */
    accent: string;
}

export const projects: Project[] = [
    {
        slug: "goco",
        title: "GOCO",
        tagline: "A programming language, its compiler, and a full IDE — built for learners.",
        description:
            "GOCO is a beginner-first programming language with its own simplified syntax, backed by a custom desktop IDE. It removes accidental complexity so new programmers focus on logic, then grows with them through a competitive 1-vs-1 coding arena.",
        highlights: [
            "Designed and built a custom IDE for the GOCO language — starting on Vite, later migrated to Electron — implementing core language features across 50+ code operations.",
            "Engineered an advanced editor with compiler integration that cut compilation time by 60% and enabled debug execution of 50+ GOCO programs for 10+ developers.",
            "Led a cross-functional team of 5 interns through a 3-month expansion cycle, reviewing architectures and validating implementations via GitHub pull requests.",
            "Architected a hierarchical 1-vs-1 matchmaking backend (Node.js, Sequelize, PostgreSQL on Supabase) that widens city → region → global over ~90s before bot fallback; tested with ~30 concurrent students without failures.",
            "Directed language expansion — default parameters, broadened expressions, 2D/3D arrays, and new math and array standard-library modules.",
            "Guided a competitive-programming match interface with JSON-based test-case validation and a three-tier course platform with question-level locking.",
        ],
        role: "Co-Founder & Technical Lead",
        timeframe: "Jan 2025 – Present",
        status: "shipped",
        category: "Developer Tools",
        technologies: [
            "Electron.js",
            "JavaCC",
            "Node.js",
            "PostgreSQL",
            "Sequelize",
            "Supabase",
            "Vite",
        ],
        metrics: [
            { value: "60%", label: "faster compilation" },
            { value: "50+", label: "language operations" },
            { value: "5", label: "engineers led" },
        ],
        featured: true,
        preview: { kind: "goco-ide", url: "https://gocoide.com/", embeddable: false },
        liveUrl: "https://gocoide.com/",
        icon: Terminal,
        accent: "oklch(0.7 0.15 55)",
    },
    {
        slug: "cnn-shape-classification",
        title: "CNN Shape Classification",
        tagline: "A convolutional neural network implemented from scratch in pure Java — zero ML frameworks.",
        description:
            "A from-scratch CNN in pure Java — no deep-learning framework — with every layer (Convolution, ReLU, MaxPooling, Flatten, Fully Connected) and both forward and backward propagation written by hand. Trained on 500+ generated images using gradient descent optimization, achieving 90%+ accuracy on triangle-vs-square recognition. Exposed through a Spring Boot REST API for real-time shape prediction via image upload.",
        highlights: [
            "Implemented complete CNN layers — Convolution, ReLU, MaxPooling, Flatten and Fully Connected — with custom forward and backward propagation in pure Java.",
            "Achieved 90%+ accuracy on triangle-vs-square recognition via automatic training on 500+ generated images with gradient-descent optimization.",
            "Built a Spring Boot REST API (@RestController, @Service, @PostMapping) accepting image uploads and returning real-time shape predictions with probability scores in JSON.",
        ],
        role: "Author",
        timeframe: "Sep 2025 – Oct 2025",
        status: "completed",
        category: "AI / ML",
        technologies: ["Java", "Spring Boot", "CNN"],
        metrics: [
            { value: "90%+", label: "accuracy" },
            { value: "500+", label: "training images" },
            { value: "0", label: "ML frameworks used" },
        ],
        featured: true,
        preview: { kind: "code" },
        githubUrl: "https://github.com/mitanshkanani/JavaCNNShaper",
        icon: Cpu,
        accent: "oklch(0.68 0.15 25)",
    },
    {
        slug: "ml-java-pipeline",
        title: "ML-Java-Pipeline",
        tagline:
            "A Java CLI that turns raw CSVs into model-ready data — built to remove repetitive ML preprocessing.",
        description:
            "An in-progress Java command-line ML pipeline (Maven, JLine) for small-to-medium projects, designed to reduce repetitive manual preprocessing. The intended flow is: select a dataset, inspect it, choose columns interactively, run automated preprocessing, then pick an ML task and model to train and evaluate. Dataset selection, inspection, interactive column selection, and the first preprocessing stage (null analysis + column removal with saved output) are working today; task selection, model selection, and training/evaluation are still being built.",
        highlights: [
            "Interactive CLI built with JLine — arrow-key dataset selection that scans the local data/ folder using a raw-mode terminal renderer.",
            "Dataset inspection previews columns and rows and reports null values per column (and in total) to guide cleaning decisions.",
            "Arrow-key column selector (toggle + proceed) feeds an automated preprocessing step that removes selected columns and writes the processed CSV back to the repo's data/ output path.",
            "Designed to reduce repetitive manual ML preparation work by approximately 80% (a design objective, not a measured result) — task selection, model selection, and evaluation are in active development.",
        ],
        role: "Author",
        timeframe: "2025 – Present",
        status: "ongoing",
        category: "AI / ML",
        technologies: ["Java", "Maven", "JLine"],
        metrics: [
            { value: "~80%", label: "manual prep reduction (goal)" },
            { value: "4 / 7", label: "pipeline stages built" },
            { value: "WIP", label: "task · model · eval" },
        ],
        featured: true,
        preview: { kind: "pipeline" },
        githubUrl: "https://github.com/mitanshkanani/ML-JAVA-PIPELINE",
        icon: Boxes,
        accent: "oklch(0.7 0.13 60)",
    },
    {
        slug: "moneyoverflow",
        title: "MoneyOverflow",
        tagline: "AI-assisted financial literacy platform with a full learning ecosystem.",
        description:
            "A comprehensive financial-education platform pairing structured learning paths with AI-driven assistance. It combines interactive modules, calculators, live financial news and a community Q&A into a single guided experience.",
        highlights: [
            "Built an AI-enabled financial literacy platform with 10+ learning modules, financial blogs, real-time news, 5+ calculators, gamified quizzes, investment simulation and community Q&A.",
            "Implemented AI automation via the Gemini API to power intelligent Q&A responses, blog summaries, financial analytics and a learning-assistant chatbot.",
            "Designed a comprehensive financial-education learning path serving 50+ users across integrated frontend and backend modules.",
            "Created a responsive blog page with dynamic content loading for latest financial news, reducing load time by 40%.",
        ],
        role: "Full-Stack Developer",
        timeframe: "May 2025 – Jun 2025",
        status: "shipped",
        category: "Full-Stack",
        technologies: [
            "React.js",
            "Node.js",
            "Express.js",
            "Mongoose",
            "Gemini API",
        ],
        metrics: [
            { value: "10+", label: "learning modules" },
            { value: "50+", label: "users served" },
            { value: "40%", label: "faster blog load" },
        ],
        featured: true,
        preview: {
            kind: "iframe",
            url: "https://moneyoverflow.vercel.app/",
            embeddable: true,
        },
        liveUrl: "https://moneyoverflow.vercel.app/",
        githubUrl: "https://github.com/MonilMehta/MoneyOverflow",
        icon: BrainCircuit,
        accent: "oklch(0.7 0.14 150)",
    },
    {
        slug: "socialflow",
        title: "SocialFlow",
        tagline: "Privacy-first social networking for authentic, close-circle sharing.",
        description:
            "A social platform built around privacy and intent rather than reach. It centers end-to-end encrypted conversations, trusted circles and pressure-free sharing designed to reduce social-media anxiety.",
        highlights: [
            "A privacy-first social network centered on end-to-end encrypted conversations, so user data stays with the user.",
            "Trusted-circle sharing model that keeps moments within a curated group of close friends and family.",
            "Interaction design focused on mental well-being — authentic sharing without likes-driven validation pressure.",
        ],
        role: "Developer",
        timeframe: "2025",
        status: "shipped",
        category: "Full-Stack",
        technologies: ["React.js", "Node.js", "TailwindCSS"],
        metrics: [
            { value: "E2E", label: "encrypted by design" },
            { value: "0%", label: "data tracking" },
        ],
        featured: false,
        preview: {
            kind: "iframe",
            url: "https://socialfloww.vercel.app/",
            embeddable: true,
        },
        liveUrl: "https://socialfloww.vercel.app/",
        icon: ShieldCheck,
        accent: "oklch(0.68 0.15 280)",
    },

    {
        slug: "nurturenest",
        title: "NurtureNest",
        tagline: "A non-profit donation platform focused on child welfare and education.",
        description:
            "Built at the NFC 3.0 hackathon (Hack Panthers), NurtureNest is a donation platform for social impact — surfacing causes across education, healthcare and child welfare, and making the flow from donor to impact clear and trustworthy.",
        highlights: [
            "A donation platform for social causes spanning education, community development and child welfare.",
            "Presents cause-focused programs — literacy, healthcare, nutrition and child-protection initiatives.",
            "Communicates a transparent donation flow so donors can see how contributions create impact.",
        ],
        role: "Hackathon Team (Hack Panthers)",
        timeframe: "NFC 3.0",
        status: "shipped",
        category: "Full-Stack",
        technologies: ["React.js", "Node.js", "TailwindCSS"],
        metrics: [
            { value: "NFC 3.0", label: "hackathon build" },
        ],
        featured: false,
        preview: {
            kind: "iframe",
            url: "https://nfc-3-0-hack-panthers.vercel.app/",
            embeddable: true,
        },
        liveUrl: "https://nfc-3-0-hack-panthers.vercel.app/",
        icon: HeartHandshake,
        accent: "oklch(0.7 0.13 340)",
    },
];

export const featuredProject = projects.find((p) => p.slug === "goco")!;
export const secondaryFeatured = projects.filter(
    (p) => p.featured && p.slug !== "goco"
);
export const restProjects = projects.filter((p) => !p.featured);

export const socialLinks = {
    github: "https://github.com/mitanshkanani",
    linkedin: "https://www.linkedin.com/in/mitansh-kanani-9a80812b6/",
    leetcode: "https://leetcode.com/u/Altair2004/",
    email: "mailto:mitanshkanani@outlook.com",
};

export const statusMeta: Record<
    ProjectStatus,
    { label: string; dot: string }
> = {
    shipped: { label: "Live", dot: "bg-emerald-500" },
    completed: { label: "Code", dot: "bg-sky-500" },
    ongoing: { label: "In Progress", dot: "bg-amber-500" },
    research: { label: "Research", dot: "bg-sky-500" },
    "coming-soon": { label: "Coming Soon", dot: "bg-violet-500" },
};
