import type { LucideIcon } from "lucide-react";
import {
    BrainCircuit,
    Cpu,
    HeartHandshake,
    Landmark,
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

export type PreviewKind = "iframe" | "goco-ide" | "code";

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
        /** How long to wait before assuming the frame was blocked (slow cold starts). */
        timeoutMs?: number;
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
        slug: "ai-credit-risk",
        title: "AI Credit Risk & Loan Approval Engine",
        tagline: "An end-to-end credit-risk engine that turns a loan application into an explainable approve / review / decline decision.",
        description:
            "Built on 1.35M resolved LendingClub loans, the engine estimates each applicant's probability of default and wraps it in a decision layer — risk bands, approve/review/decline thresholds, expected loss and SHAP reason codes. The model never sees LendingClub's own grade or rate, yet out-ranks LendingClub's pricing on a sealed out-of-time test set. Deployed as a FastAPI + Docker web app.",
        highlights: [
            "Audited all 151 columns for data leakage, used an out-of-time train/validation/test split, and verified the fitted preprocessing pipeline with 72 automated audits.",
            "Benchmarked 5 models (baseline → Logistic Regression → Random Forest → LightGBM → XGBoost) and shipped a monotonic, calibrated LightGBM: ROC-AUC 0.746 vs 0.715 for LendingClub's own pricing on a sealed 212,801-loan test set.",
            "Decision layer with risk bands, expected loss (PD × EAD × LGD) and SHAP reason codes — approved loans defaulted at 11.6% vs 20.1%, cutting loss per dollar lent from 13.6% to 6.2%.",
            "Deployed with a checksummed model bundle; removed zip code after a fairness ablation and added audit-driven guardrails (out-of-scope referral, affordability rules, strict input validation).",
        ],
        role: "Author",
        timeframe: "Sep 2026 – Oct 2026",
        status: "shipped",
        category: "AI / ML",
        technologies: ["Python", "LightGBM", "SHAP", "FastAPI", "Docker"],
        metrics: [
            { value: "0.746", label: "test ROC-AUC" },
            { value: "1.35M", label: "loans modelled" },
            { value: "72", label: "automated audits" },
        ],
        featured: true,
        // Hosted on Render's free tier — a cold start can take ~50s, so wait longer than the default.
        preview: {
            kind: "iframe",
            url: "https://credit-risk-engine-dhib.onrender.com",
            embeddable: true,
            timeoutMs: 75000,
        },
        liveUrl: "https://credit-risk-engine-dhib.onrender.com",
        githubUrl: "https://github.com/mitanshkanani/AI-Credit-Risk-Loan-Approval-Engine",
        icon: Landmark,
        accent: "oklch(0.7 0.13 200)",
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
    kaggle: "https://www.kaggle.com/mitanshkanani",
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
