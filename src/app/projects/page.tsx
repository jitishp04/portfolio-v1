"use client";

import { useEffect } from "react";
import FloatingCardGallery from "@/components/ui/floating-card-gallery";
import Lenis from "lenis";

const cardData = [
    {
        title: "CyberSafe AI",
        description:
            "An AI-powered cybersecurity solution for threat detection and prevention.",
        fullDescription:
            "CyberSafe AI leverages machine learning and artificial intelligence to identify, analyse, and mitigate cybersecurity threats in real time. The system provides proactive defence mechanisms across digital infrastructure.",
        image: "/cyberSafeAi.png",
        category: "AI / Security",
        tags: ["AI", "Cybersecurity", "Machine Learning", "Threat Detection"],
    },
    {
        title: "Autonomous Vehicle",
        description:
            "Self-driving vehicle system built on embedded platforms and computer vision.",
        fullDescription:
            "An autonomous driving project utilising computer vision, sensor fusion, and embedded systems to enable real-time navigation and obstacle avoidance for self-driving vehicles.",
        image: "/car.png",
        category: "Embedded / AI",
        tags: ["Autonomous Driving", "Computer Vision", "OpenDLV", "Embedded Systems"],
    },
    {
        title: "Dentigo",
        description:
            "A digital health application streamlining dental clinic workflows.",
        fullDescription:
            "Dentigo is a healthcare-focused application designed to digitise and optimise dental clinic operations, from patient management to appointment scheduling and treatment tracking.",
        image: "/dentigo1.png",
        category: "Health Tech",
        tags: ["Healthcare", "Full-Stack", "Patient Management", "Digital Health"],
    },
    {
        title: "Travel Buddy",
        description:
            "A smart travel companion app for planning and discovering destinations.",
        fullDescription:
            "Travel Buddy helps users plan trips, discover new destinations, and organise itineraries. The app combines intelligent recommendations with a seamless user experience for modern travellers.",
        image: "/travel-buddy.png",
        category: "Mobile / Web",
        tags: ["Travel", "Mobile App", "Recommendations", "UX Design"],
    },
    {
        title: "Snake Game",
        description:
            "A classic snake game reimagined with modern graphics and gameplay.",
        fullDescription:
            "A modern take on the classic Snake game, featuring enhanced graphics, smooth animations, and engaging gameplay mechanics built with a focus on clean code and game development principles.",
        image: "/snake1.png",
        category: "Game Dev",
        tags: ["Game Development", "Graphics", "Animation", "Interactive"],
    },
    {
        title: "Wio Terminal IoT",
        description:
            "IoT project using the Wio Terminal for sensor data collection and display.",
        fullDescription:
            "An Internet of Things project leveraging the Wio Terminal platform for real-time sensor data acquisition, processing, and visualisation. Demonstrates embedded programming and hardware integration.",
        image: "/WioTerminalSetupImage.jpg",
        category: "IoT / Embedded",
        tags: ["IoT", "Wio Terminal", "Sensors", "Arduino", "Embedded"],
    },
    {
        title: "Analytics Reports",
        description:
            "Data analytics and reporting dashboard for business intelligence.",
        fullDescription:
            "A comprehensive data analytics and reporting solution that transforms raw data into actionable insights through interactive dashboards, automated report generation, and data visualisation.",
        image: "/reports.png",
        category: "Data Science",
        tags: ["Data Analytics", "Reporting", "Dashboards", "Visualisation"],
    },
    {
        title: "Random Generator",
        description:
            "A utility tool for generating randomised data and outputs.",
        fullDescription:
            "A versatile random generation tool designed for various use cases, from test data generation to creative applications. Built with a focus on true randomness and customisation options.",
        image: "/random.png",
        category: "Utility",
        tags: ["Randomisation", "Utility", "Data Generation", "Tools"],
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
        <div className="dark min-h-screen bg-[#020202] selection:bg-white selection:text-black">
            <main className="relative w-full overflow-x-hidden">
                <FloatingCardGallery cards={cardData} maxCards={8} />
            </main>
        </div>
    );
}
