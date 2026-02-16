"use client";

import { useEffect } from "react";
import SkillsCardGallery from "@/components/ui/skills-card-gallery";
import Lenis from "lenis";

const skillsData = [
    {
        title: "Programming Languages",
        description:
            "Versatile across systems, scripting, and web development languages.",
        category: "Languages",
        tags: ["Python", "R", "Java", "JavaScript", "TypeScript", "C++", "SQL", "NoSQL", "HTML", "CSS"],
    },
    {
        title: "AI & Data Science",
        description:
            "Building intelligent models and extracting insights from complex datasets.",
        category: "AI / ML",
        tags: ["PyTorch", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Plotly", "Hugging Face"],
    },
    {
        title: "Web, Embedded & Architecture",
        description:
            "Full-stack web development and embedded systems design.",
        category: "Full-Stack",
        tags: ["React", "Vue.js", "Node.js", "Django", "FastAPI", "Streamlit", "WebSocket", "OpenDLV", "Arduino"],
    },
    {
        title: "Cloud, DevOps & Databases",
        description:
            "Deploying and orchestrating production-grade infrastructure.",
        category: "DevOps",
        tags: ["Docker", "Kubernetes", "GCP", "GitLab CI/CD", "Vercel", "PostgreSQL", "MongoDB", "SQLite"],
    },
    {
        title: "Frameworks & Tools",
        description:
            "Development environments and productivity tooling for agile delivery.",
        category: "Tooling",
        tags: ["Android Studio", "VS Code", "Agile/Scrum", "Office 365", "Google Suite"],
    },
    {
        title: "Languages",
        description:
            "Multilingual communication for global collaboration.",
        category: "Communication",
        tags: ["English (Fluent)", "Hindi (Fluent)", "Swedish (Intermediate)"],
    },
];

export default function SkillsPage() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    return (
        <div className="dark min-h-screen bg-[#020202] selection:bg-white selection:text-black">
            <main className="relative w-full overflow-x-hidden">
                <SkillsCardGallery cards={skillsData} />
            </main>
        </div>
    );
}
