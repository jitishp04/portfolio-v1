"use client";

import { useEffect } from "react";
import FloatingCardGallery from "@/components/ui/floating-card-gallery";
import Lenis from "lenis";

const cardData = [
    {
        title: "Immersive Virtual Reality",
        description:
            "Explore how VR is transforming the way we interact with digital environments.",
        fullDescription:
            "Virtual Reality technology is revolutionizing industries from gaming to healthcare. By creating fully immersive digital environments, VR enables users to experience scenarios that would otherwise be impossible, dangerous, or prohibitively expensive in the real world.",
        image:
            "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        author: "Sophia Chen",
        category: "Technology",
        tags: ["Virtual Reality", "Technology", "Innovation", "Digital Experience"],
    },
    {
        title: "Quantum Computing Breakthroughs",
        description:
            "Recent advances in quantum computing are promising to solve previously impossible problems.",
        fullDescription:
            "Quantum computers leverage the strange properties of quantum mechanics to process information in ways that classical computers cannot. Recent breakthroughs have brought us closer to quantum supremacy.",
        image:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        author: "Robert Jiang",
        category: "Science",
        tags: ["Quantum", "Computing", "Research", "Future Tech"],
    },
    {
        title: "Sustainable Architecture",
        description:
            "How eco-friendly building designs are shaping our urban landscapes.",
        fullDescription:
            "Sustainable architecture focuses on creating buildings that minimize environmental impact through energy efficiency, resource conservation, and harmony with the natural environment.",
        image:
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        author: "Emma Rodriguez",
        category: "Design",
        tags: ["Architecture", "Sustainability", "Urban Design", "Eco-friendly"],
    },
    {
        title: "Neuroscience of Creativity",
        description:
            "New research reveals how the brain generates innovative ideas.",
        fullDescription:
            "Scientists are uncovering the neural mechanisms behind creative thinking. Using advanced imaging techniques, researchers can observe how different brain regions collaborate during creative processes.",
        image:
            "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        avatar: "https://randomuser.me/api/portraits/men/87.jpg",
        author: "Marcus Taylor",
        category: "Science",
        tags: ["Neuroscience", "Creativity", "Brain", "Research"],
    },
    {
        title: "Autonomous Transportation",
        description:
            "Self-driving vehicles are transforming how we think about mobility.",
        fullDescription:
            "Autonomous vehicles use a combination of sensors, cameras, radar, and artificial intelligence to navigate without human input. As this technology matures, it promises to reduce accidents and ease congestion.",
        image:
            "https://images.unsplash.com/photo-1562519819-016930ada31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        author: "Leila Johnson",
        category: "Technology",
        tags: ["Autonomous", "Transportation", "AI", "Future Mobility"],
    },
    {
        title: "Deep Ocean Discoveries",
        description: "Exploring the mysteries of Earth's final frontier.",
        fullDescription:
            "The deep ocean remains one of the least explored regions on Earth. Recent expeditions have discovered new species, underwater geological features, and insights into how life adapts to extreme conditions.",
        image:
            "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        author: "David Nakamura",
        category: "Environment",
        tags: ["Oceanography", "Marine Biology", "Exploration", "Discovery"],
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
                <FloatingCardGallery cards={cardData} />
            </main>
        </div>
    );
}
