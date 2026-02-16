"use client";

import React, { useState, useEffect } from "react";

const ScrollIndicator: React.FC = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Hide when near bottom or after scrolling a bit
            setVisible(scrollTop < docHeight - 100 && docHeight > 200);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 transition-opacity duration-700"
            style={{ opacity: visible ? 1 : 0 }}
        >
            {/* Vertical line */}
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
                <div className="absolute inset-x-0 w-full h-4 bg-white/60 rounded-full animate-scroll-line" />
            </div>

            {/* Scroll text */}
            <span
                className="font-mono text-[8px] text-white/30 uppercase tracking-[0.3em] animate-pulse"
                style={{ writingMode: "vertical-rl" }}
            >
                Scroll
            </span>

            {/* Bouncing chevron */}
            <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-white/30 animate-bounce"
            >
                <path
                    d="M6 9l6 6 6-6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default ScrollIndicator;
