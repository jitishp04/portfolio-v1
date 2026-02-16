"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface SkillCardData {
    title: string;
    description: string;
    category: string;
    tags: string[];
}

interface SkillsCardGalleryProps {
    cards?: SkillCardData[];
    title?: string;
}

const SkillsCardGallery: React.FC<SkillsCardGalleryProps> = ({
    cards = [],
    title = "SKILLS",
}) => {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 25;
            const y = (e.clientY - rect.top - rect.height / 2) / 25;
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Enter" || e.key === " ") {
            setFlippedIndex(flippedIndex === index ? null : index);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-[#020202] flex items-center justify-center p-8"
            style={{ perspective: "1500px" }}
        >
            {/* Ambient floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white opacity-[0.04]"
                        style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 20}s linear infinite`,
                            animationDelay: `${Math.random() * 20}s`,
                        }}
                    />
                ))}
            </div>

            {/* Bento mask overlay */}
            <div className="fixed inset-0 pointer-events-none bento-mask opacity-10 z-[100]" />

            {/* Back button */}
            <a
                href="/"
                className="fixed top-8 left-8 z-50 flex items-center gap-3 group"
            >
                <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white transition-all duration-500">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:stroke-black stroke-white transition-colors duration-500"
                    >
                        <path
                            d="M19 12H5M5 12L12 19M5 12L12 5"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <span className="font-mono text-[11px] font-bold text-white uppercase tracking-[0.2em]">
                    Back
                </span>
            </a>

            {/* Page header */}
            <div className="fixed top-8 right-8 z-50 flex items-center gap-3">
                <div className="relative w-2.5 h-2.5 bg-white rounded-full">
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
                </div>
                <span className="font-mono text-[11px] font-bold text-white tracking-[0.2em] uppercase">
                    {title}
                </span>
            </div>

            <div
                className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 w-full max-w-7xl"
                style={{
                    transform: `rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                {cards.map((card, index) => {
                    const isFlipped = flippedIndex === index;

                    return (
                        <motion.div
                            key={index}
                            className="relative cursor-pointer"
                            style={{
                                perspective: "1000px",
                                minHeight: "280px",
                            }}
                            onClick={() =>
                                setFlippedIndex(isFlipped ? null : index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            tabIndex={0}
                            aria-expanded={isFlipped}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100,
                            }}
                        >
                            {/* Card inner — handles the 3D flip */}
                            <div
                                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: isFlipped
                                        ? "rotateY(180deg)"
                                        : "rotateY(0deg)",
                                    minHeight: "280px",
                                }}
                            >
                                {/* ═══ FRONT FACE ═══ */}
                                <div
                                    className="absolute inset-0 glass-panel rounded-xl p-8 flex flex-col justify-between group"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                    }}
                                >
                                    {/* Subtle gradient orb */}
                                    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/[0.03] blur-xl" />

                                    {/* Category badge */}
                                    <span className="text-[9px] font-mono font-bold px-3 py-1 rounded-full border border-white/10 text-white/50 uppercase tracking-widest w-fit">
                                        {card.category}
                                    </span>

                                    {/* Title + description */}
                                    <div className="mt-6 flex-1">
                                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                            {card.title}
                                        </h3>
                                        <p className="text-white/40 font-mono text-[11px] leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* Click hint */}
                                    <div className="mt-6 flex items-center gap-2 text-white/20 group-hover:text-white/50 transition-colors duration-500">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="stroke-current"
                                        >
                                            <path
                                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
                                            Click to explore
                                        </span>
                                    </div>
                                </div>

                                {/* ═══ BACK FACE ═══ */}
                                <div
                                    className="absolute inset-0 glass-panel rounded-xl p-8 flex flex-col"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        background: "rgba(2, 2, 2, 0.95)",
                                        backdropFilter: "blur(20px)",
                                    }}
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[9px] font-mono font-bold px-3 py-1 rounded-full border border-white/10 text-white/50 uppercase tracking-widest">
                                            {card.category}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFlippedIndex(null);
                                            }}
                                            className="text-white/30 hover:text-white transition-colors"
                                            aria-label="Close"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-white mb-5 tracking-tight">
                                        {card.title}
                                    </h3>

                                    {/* Tag bubbles */}
                                    <div className="flex flex-wrap gap-2">
                                        {card.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-[10px] font-mono px-4 py-2 rounded-full border border-white/10 text-white/70 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/25 hover:text-white transition-all duration-300 cursor-default"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillsCardGallery;
