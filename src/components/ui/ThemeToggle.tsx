"use client";

import React from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-8 right-8 z-[110] w-10 h-10 rounded-full border border-foreground/15 bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-foreground/10 transition-all duration-500 cursor-pointer"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? (
                /* Sun icon */
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-foreground transition-colors duration-500"
                >
                    <circle cx="12" cy="12" r="5" strokeWidth="2" />
                    <path
                        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            ) : (
                /* Moon icon */
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-foreground transition-colors duration-500"
                >
                    <path
                        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
