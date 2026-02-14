"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardData {
    title: string;
    description: string;
    fullDescription?: string;
    image: string;
    avatar: string;
    author: string;
    category: string;
    tags?: string[];
}

interface FloatingCardGalleryProps {
    cards?: CardData[];
    maxCards?: number;
}

const FloatingCardGallery: React.FC<FloatingCardGalleryProps> = ({
    cards = [],
    maxCards = 6,
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
            setActiveIndex(activeIndex === index ? null : index);
        }
    };

    const displayCards = cards.slice(0, maxCards);

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
                    PROJECTS
                </span>
            </div>

            <motion.div
                className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 w-full max-w-7xl"
                style={{
                    transform: `rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                {displayCards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="relative group cursor-pointer"
                        onClick={() =>
                            setActiveIndex(activeIndex === index ? null : index)
                        }
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        tabIndex={0}
                        aria-expanded={activeIndex === index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            z: activeIndex === index ? 100 : 0,
                            scale: activeIndex === index ? 1.05 : 1,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100,
                        }}
                        whileHover={{
                            z: 30,
                            scale: 1.03,
                            transition: { duration: 0.2 },
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Glow effect — monochrome white */}
                        <motion.div
                            className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100"
                            animate={{
                                opacity: activeIndex === index ? 0.4 : 0,
                                boxShadow: `0 0 40px 2px rgba(255, 255, 255, 0.15)`,
                            }}
                            transition={{ duration: 0.4 }}
                            style={{
                                background: `linear-gradient(135deg, rgba(255,255,255,0.08), transparent 80%)`,
                            }}
                        />

                        {/* Card content — glass-panel style */}
                        <motion.div
                            className="relative rounded-xl glass-panel p-6 h-full flex flex-col overflow-hidden"
                            style={{
                                transformStyle: "preserve-3d",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                            }}
                        >
                            {/* Subtle gradient orb */}
                            <div
                                className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/[0.03] blur-xl"
                                style={{
                                    transform: `translateZ(${Math.random() * 10 + 10}px)`,
                                }}
                            />

                            {/* Card image */}
                            <div
                                className="w-full h-40 mb-4 overflow-hidden rounded-lg"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ transform: `translateZ(20px)` }}
                                />
                            </div>

                            {/* Card text */}
                            <motion.div
                                style={{ transform: "translateZ(30px)" }}
                                transition={{ duration: 0.4 }}
                            >
                                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                    {card.title}
                                </h3>
                                <p className="text-white/40 text-sm mb-4 line-clamp-2 font-mono text-[11px] leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>

                            <div
                                className="mt-auto flex items-center justify-between"
                                style={{ transform: "translateZ(40px)" }}
                            >
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/15">
                                        <img
                                            src={card.avatar}
                                            alt={card.author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="ml-2 text-[10px] font-mono text-white/30">
                                        {card.author}
                                    </span>
                                </div>

                                <span className="text-[9px] font-mono font-bold px-3 py-1 rounded-full border border-white/10 text-white/50 uppercase tracking-widest">
                                    {card.category}
                                </span>
                            </div>
                        </motion.div>

                        {/* Expanded overlay */}
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    className="absolute inset-0 glass-panel rounded-xl p-6 z-50 flex flex-col"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        transform: "translateZ(60px)",
                                        background: "rgba(2, 2, 2, 0.95)",
                                        backdropFilter: "blur(20px)",
                                    }}
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveIndex(null);
                                        }}
                                        className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                                        aria-label="Close"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
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

                                    <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
                                        {card.title}
                                    </h2>
                                    <p className="text-white/40 text-sm mb-6 font-mono text-[11px] leading-relaxed">
                                        {card.fullDescription || card.description}
                                    </p>

                                    {card.tags && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {card.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[9px] font-mono px-3 py-1 rounded-full border border-white/10 text-white/50 uppercase tracking-widest"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-auto">
                                        <button className="flex items-center gap-4 group/btn">
                                            <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover/btn:bg-white transition-all duration-500">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="group-hover/btn:stroke-black stroke-white transition-colors duration-500"
                                                >
                                                    <path
                                                        d="M7 17L17 7M17 7H8M17 7V16"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-mono text-[11px] font-bold text-white uppercase tracking-[0.2em]">
                                                Learn More
                                            </span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default FloatingCardGallery;
