/**
 * Education & technical-skills data — sourced exclusively from the resume.
 */

export interface Education {
    institution: string;
    degree: string;
    field: string;
    cgpa: string;
    startYear: string;
    endYear: string;
    location: string;
    coursework: string[];
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export const education: Education = {
    institution: "SVKM's Dwarkadas J. Sanghvi College of Engineering",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Engineering",
    cgpa: "9.03/10",
    startYear: "2022",
    endYear: "2026",
    location: "Mumbai, India",
    coursework: [
        "Compiler Design",
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
    ],
};

export const technicalSkills: SkillCategory[] = [
    {
        category: "Languages",
        items: ["Java", "JavaScript", "Python"],
    },
    {
        category: "Frameworks & Libraries",
        items: [
            "React.js",
            "Node.js",
            "Express.js",
            "Spring Boot",
            "TailwindCSS",
            "Electron.js",
            "NumPy",
            "Pandas",
        ],
    },
    {
        category: "Databases",
        items: ["SQL", "PostgreSQL"],
    },
    {
        category: "Tools & Technologies",
        items: [
            "Git",
            "Figma",
            "Blender",
            "HTML5",
            "CSS3",
            "Jupyter",
            "3D Model Creation",
            "Vercel",
            "Render",
        ],
    },
    {
        category: "AI/Tools",
        items: [
            "Prompt Engineering",
            "ElevenLabs",
            "OpenAI & Gemini APIs",
            "Cursor AI",
            "DeepSeek AI",
            "Claude AI",
            "GitHub Copilot",
        ],
    },
];
