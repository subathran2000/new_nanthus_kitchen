import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Box } from "@mui/material";
import { Canvas } from '@react-three/fiber';
import { Sparkles, Caustics, Environment, Cloud } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

import Image1 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image2 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image3 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image4 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image5 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image6 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image7 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image8 from "../assets/images/new_nanthus_kitchen_logo.png";

const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image1, Image2, Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image1, Image2];

// --- 3D Background Components ---

const BackgroundScene = () => {
    return (
        <group>
            {/* Caustics Effect */}
            <Caustics
                color="#00ffff"
                position={[0, -5, 0]}
                lightSource={[5, 5, -10]}
                worldRadius={10}
                ior={1.1}
                intensity={0.2}
                causticsOnly={false}
                backside={false}
            >
            </Caustics>

            {/* Bubbles */}
            <Sparkles count={300} scale={15} size={4} speed={0.6} opacity={0.6} color="#aaccff" />
            <Sparkles count={150} scale={10} size={10} speed={0.2} opacity={0.2} color="#ffffff" />

            {/* Subtle Cloud/Fog for depth */}
            <Cloud opacity={0.1} speed={0.1} segments={10} position={[0, -5, -10]} color="#aaccff" />

            {/* Lighting */}
            <ambientLight intensity={0.5} color="#001e36" />
            <spotLight position={[0, 20, 0]} intensity={2} angle={0.5} penumbra={1} color="#ccffff" castShadow />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />

            {/* Environment for reflections */}
            <Environment preset="city" blur={1} />
        </group>
    )
}

const LandingPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);




    // Responsive radius and spacing based on viewport
    const getResponsiveValues = () => {
        if (typeof window === "undefined") return { radius: 800, spacing: 250 };
        const width = window.innerWidth;
        if (width < 480) return { radius: 300, spacing: 180 };
        if (width < 768) return { radius: 400, spacing: 200 };
        if (width < 1024) return { radius: 600, spacing: 220 };
        return { radius: 800, spacing: 250 };
    };

    const shuffleArray = (arr: string[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    useEffect(() => {
        // prevent global horizontal scrolling while this component is mounted
        // We removed this restriction in index.css, but we might want to keep it local if needed
        // But for now, let's stick to the previous logic
        const prevOverflowX = document.documentElement.style.overflowX;
        document.documentElement.style.overflowX = "hidden";

        const cards = cardsRef.current;
        const total = cards.length;
        const { radius, spacing } = getResponsiveValues();
        const totalHeight = total * spacing;

        // State for scroll position
        let scrollY = 0;
        let targetScrollY = 0;

        // Scroll limits to prevent infinite looping
        const minScroll = -totalHeight / 2;
        const maxScroll = totalHeight / 2;

        // Initial setup
        const updateCards = () => {
            cards.forEach((card, i) => {
                if (!card) return;

                // Calculate base Y position based on index and scroll
                const offset = i * spacing;
                let y = offset + scrollY;

                // Center the spiral vertically
                y -= totalHeight / 2;

                // Calculate angle based on Y position for the spiral effect
                // Increased multiplier to make the spiral more pronounced
                const progress = y / totalHeight;
                const angle = progress * Math.PI * 2 * 4; // Multiplied by 4 for more curve

                // Hide cards that are outside the visible range
                const isVisible = y >= minScroll && y <= maxScroll;

                gsap.set(card, {
                    y: y,
                    rotationY: (angle * 180) / Math.PI,
                    transformOrigin: `50% 50% ${-radius}px`,
                    xPercent: -50,
                    yPercent: -50,
                    left: "50%",
                    top: "50%",
                    opacity: isVisible ? 1 : 0,
                    zIndex: Math.round(Math.cos(angle) * 100) + 10
                });
            });
        };

        // Wheel event handler with scroll limits
        const handleWheel = (e: WheelEvent) => {
            const newTargetScroll = targetScrollY - e.deltaY * 0.5;
            // Clamp the scroll to prevent looping
            targetScrollY = Math.max(minScroll, Math.min(maxScroll, newTargetScroll));
        };

        window.addEventListener("wheel", handleWheel);

        // Animation loop
        const ticker = gsap.ticker.add(() => {
            // Smooth interpolation
            scrollY += (targetScrollY - scrollY) * 0.1;
            updateCards();
        });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            gsap.ticker.remove(ticker);
            // restore document overflow-x
            document.documentElement.style.overflowX = prevOverflowX;
        };
    }, []);

    return (
        <Box
            ref={containerRef}
            sx={{
                perspective: "1500px",
                width: "100%",
                height: "100vh",
                background: "#001e36", // Deep blue background base
                overflow: "hidden",
                position: "relative",
                transform: "translateZ(0)",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                fontFamily: "'Courier New', Courier, monospace", // Tech font
                color: "#aaccff", // Light blue text
            }}
        >
            {/* 3D Background */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <color attach="background" args={['#001e36']} />
                    <fog attach="fog" args={['#001e36', 5, 25]} />
                    <BackgroundScene />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Canvas>
            </Box>

            {/* Spiral Cards */}
            {images.map((src, i) => (
                <Box
                    key={i}
                    ref={(el: HTMLDivElement | null) => {
                        cardsRef.current[i] = el;
                    }}
                    className="spiral-card"
                    sx={{
                        width: "90%",
                        maxWidth: "400px",
                        aspectRatio: "1/1",
                        background: `url(${src}) center/cover no-repeat`,
                        borderRadius: "16px",
                        position: "absolute",
                        boxShadow:
                            "0 25px 50px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)",
                        opacity: 0,
                        border: "1px solid rgba(0, 255, 255, 0.3)", // Cyan border accent
                        // zIndex will be set by GSAP
                    }}
                >

                </Box>
            ))}

            <style>{`

        @media (max-width: 1024px) { .spiral-card { max-width: 350px; } }
        @media (max-width: 768px) { .spiral-card { max-width: 300px; } }
        @media (max-width: 480px) { .spiral-card { max-width: 250px; } }
      `}</style>
        </Box>
    );
};

export default LandingPage;
