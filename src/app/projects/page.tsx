"use client";

import { useEffect } from "react";
import FloatingCardGallery from "@/components/ui/floating-card-gallery";
import Lenis from "lenis";

const cardData = [
    {
        title: "CyberSafe AI",
        description:
            "An AI-powered web application for identifying and flagging toxic content.",
        fullDescription:
            "CyberSafeAI is a web application designed to combat the rising cyber crime linked to social media use by identifying and flagging toxic text. Users can upload messages, tweets, or other text for toxicity analysis.",
        image: "/cyberSafeAi.png",
        category: "AI and ML Systems Development",
        tags: ["Django", "BERT LLM", "Docker", "Kubernetes", "GCP", "SQLite", "Gitlab CI/CD"],
        githubUrl: "https://github.com/jitishp04/CyberSafeAI",
    },
    {
        title: "Steering Wheel Algorithm",
        description:
            "Cyber-physical system with OpenDLV for data extraction and processing.",
        fullDescription:
            "Engineering a real-time algorithm for adjusting car steering based on image recognition, sensor data, and angular velocity, integrating OpenDLV for data extraction and processing.",
        image: "/car.png",
        category: "Miniature car data extraction",
        tags: [
            "CMake",
            "Docker",
            "OpenDLV",
        ],
        githubUrl: "https://github.com/jitishp04/steering-wheel-algorithm",
    },
    {
        title: "Financial Data Pipeline",
        description:
            "Real-time technical analysis dashboard for financial market data.",
        fullDescription:
            "Financial data pipeline processing technical indicators for 10-15 tickers in under 600ms. Deployed an interactive dashboard using Streamlit and Plotly to provide indicators like RSI, SMA, and Cross detection for US equities.",
        image: "/finance.jpg",
        category: "Financial Data Science",
        tags: [
            "Streamlit",
            "Plotly",
            "Pandas",
            "Yahoo Finance API",
            "NumPy",
        ],
        githubUrl: "https://github.com/jitishp04/Automated_TA_financial_portfolio_dashboard",
    },
    {
        title: "Dentigo",
        description:
            "A digital health application streamlining dental clinic workflows.",
        fullDescription:
            "The system provides a web-based GUI that allows users to search for available appointments, view them on an interactive map, and book or cancel appointments.",
        image: "/dentigo1.png",
        category: "Microservices-Distributed Systems Development",
        tags: ["MQTT", "Node.js", "Docker", "PostgreSQL", "Gitlab CI/CD", "Vue.js", "Tailwind CSS"],
        githubUrl: "https://github.com/jitishp04/DENTIGO",
    },
    {
        title: "Travel Buddy",
        description:
            "A smart travel companion app for planning and discovering destinations.",
        fullDescription:
            "A full-stack travel web-app, which allows you to search places to visit in the area using Google Maps API, create journals, and checklists.",
        image: "/travel-buddy.png",
        category: "Web development",
        tags: ["ExpressJS", "Node.js", "MongoDB", "Google Maps API", "Postman", "Vue.js"],
        githubUrl: "https://github.com/jitishp04/Travel-Buddy",
    },
    {
        title: "Wio Terminal IoT",
        description:
            "IoT project using the Wio Terminal for sensor data collection and display connected with an android app.",
        fullDescription:
            "HOME4U is a smart home system that provides users with the experience of monitoring home security from a distance and enjoying smart control of their home through devices.",
        image: "/WioTerminalSetupImage.jpg",
        category: "Arduino and Android",
        tags: ["Figma", "Android Studio", "MQTT", "Arduino", "Node.js", "Docker", "Gradle", "SQLite"],
        githubUrl: "https://github.com/placeholder/wio-terminal-iot",
    },

    {
        title: "Snake Game",
        description:
            "A classic snake game reimagined with modern graphics and gameplay.",
        fullDescription:
            "Snake game with a GUI, music, leaderboard features, made for proffesionals to beginners to be able to toggle speed of the snake.",
        image: "/snake1.png",
        category: "Java and JavaFx project",
        tags: ["JavaFx", "Maven"],
        githubUrl: "https://github.com/placeholder/snake-game",
    },
    {
        title: "Reports and Research Papers",
        description:
            "Reports and research papers",
        image: "/reports.png",
        category: "Reports and Research Papers",
        linkButtons: [
            { label: "bachelor thesis", url: "https://github.com/jitishp04/Research-Papers/blob/main/Final%20Thesis(merged).docx%20(1).pdf" },
            { label: "Change Management Report", url: "https://github.com/jitishp04/Research-Papers/blob/main/ChangeManagement.pdf" },
            { label: "Software Development Methodologies", url: "https://github.com/jitishp04/Research-Papers/blob/main/SoftwareDevelopmentMethodologies.pdf" },
        ],
    },
    {
        title: "Other Coding Works",
        description:
            "Coding labs and other coding works",
        image: "/random.png",
        category: "Other Coding Works",
        linkButtons: [
            { label: "AI-systems Labs", url: "https://github.com/jitishp04/Software-Engineering-for-AI-Systems" },
            { label: "Arduino and C labs", url: "https://github.com/jitishp04/Embedded-Systems-Arduino-C-" },
            { label: "Software Architecture Labs", url: "https://github.com/jitishp04/Software-Architecture-Assignment" },
        ],
    },
];

export default function ProjectsPage() {
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
        <div className="min-h-screen selection:bg-[var(--portfolio-selection-bg)] selection:text-[var(--portfolio-selection-text)]" style={{ backgroundColor: 'var(--portfolio-surface)' }}>
            <main className="relative w-full overflow-x-hidden">
                <FloatingCardGallery cards={cardData} maxCards={9} />
            </main>
        </div>
    );
}
