/**
 * Work-experience data — sourced exclusively from Mitansh Kanani's resume.
 *
 * Nothing is invented. Every bullet, metric and technology is directly
 * traceable to the verified resume document.
 */

export interface Experience {
    slug: string;
    company: string;
    role: string;
    type: "full-time" | "internship" | "co-founder";
    startDate: string;
    endDate: string;
    location?: string;
    description: string;
    highlights: string[];
    technologies: string[];
    metrics?: { value: string; label: string }[];
    /** A brief one-liner positioning the company. */
    companyDescription?: string;
    current?: boolean;
}

export const experiences: Experience[] = [
    {
        slug: "goco",
        company: "GOCO",
        role: "Co-Founder & Technical Lead",
        type: "co-founder",
        startDate: "Jan 2025",
        endDate: "Present",
        current: true,
        companyDescription:
            "A programming language, compiler, and desktop IDE built for learners.",
        description:
            "Leading the design and development of the GOCO programming language and its desktop IDE — from compiler internals and language features to the matchmaking backend and developer tooling.",
        highlights: [
            "Developed a custom IDE for the GOCO programming language (Vite, later migrated to Electron), implementing core language features, input sequences, display functions, and arrays across 50+ code operations.",
            "Engineered an advanced text editor with compiler integration, cutting compilation time by 60% and enabling debug execution of 50+ GOCO programs for 10+ developers.",
            "Led a cross-functional team of 5 interns through a 3-month product expansion cycle, reviewing architectures and validating implementations merged via GitHub pull requests.",
            "Architected a hierarchical 1-vs-1 matchmaking backend (Node.js, Sequelize, PostgreSQL on Supabase) expanding search city → region → global over ~90 seconds before bot fallback; tested with ~30 concurrent students without matchmaking failures.",
            "Directed expansion of the GOCO language — functions with default parameters, broadened expressions, 2D/3D arrays, and new math and array standard-library modules.",
            "Guided development of a competitive-programming match interface with JSON-based test-case validation, and directed course-platform restructuring into three access tiers with question-level locking.",
        ],
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
            { value: "50+", label: "code operations" },
            { value: "5", label: "engineers led" },
        ],
    },
    {
        slug: "rogue-code",
        company: "Rogue Code",
        role: "Software Developer Intern",
        type: "internship",
        startDate: "Jun 2024",
        endDate: "Aug 2024",
        companyDescription: "Software development studio.",
        description:
            "Built backend systems and data tooling during a summer internship — from scheduling algorithms to automated reporting.",
        highlights: [
            "Worked with Firebase Realtime Database for dynamic data storage and retrieval.",
            "Implemented a greedy algorithm with prompt engineering (using Claude AI for logic iteration) to build and optimize scheduling, achieving +62% efficiency gains via analysis of multi-dataset dry runs.",
            "Developed backend functionality using Node.js and Express.js with RESTful APIs to support data editing and deletion.",
            "Implemented an Excel data export feature via xlsx library, reducing manual reporting by 80%.",
        ],
        technologies: [
            "Node.js",
            "Express.js",
            "Firebase",
            "Claude AI",
            "xlsx",
        ],
        metrics: [
            { value: "62%", label: "scheduling efficiency" },
            { value: "80%", label: "less manual reporting" },
        ],
    },
];
