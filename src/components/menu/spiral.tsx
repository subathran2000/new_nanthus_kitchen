import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Box, useTheme, useMediaQuery, IconButton, Typography, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Canvas } from '@react-three/fiber';
// import { Sparkles as Sparkles3D, Caustics, Environment, Cloud } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

import Sparkles from "../common/Sparkles";

import img1 from "../../assets/images/restaurent.jpg";
import img2 from "../../assets/images/special_bg.png";
import img3 from "../../assets/images/bg4.jpg";
import img4 from "../../assets/images/background.jpg";
import img5 from "../../assets/images/bg2.jpg";
import img6 from "../../assets/images/blue-paint-brush-stroke-effect.jpg";

export interface ItemOption {
    label: string;
    price: string;
}

export interface FoodItem {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    options?: ItemOption[];
}

export interface SubCategory {
    title: string;
    items: FoodItem[];
}

export interface MainCategory {
    id: number;
    title: string;
    imageUrl: string;
    mealType: string[];
    subCategories: SubCategory[];
}

export const menuData: MainCategory[] = [
    {
        id: 1,
        title: "Starters",
        imageUrl: img1,
        mealType: ['Lunch', 'Dinner'],
        subCategories: [
            {
                title: "Vegetarian",
                items: [
                    { id: 101, name: "Bruschetta", description: "Toasted bread, tomato, basil, olive oil", price: "$6.00", imageUrl: img1 },
                    { id: 102, name: "Stuffed Mushrooms", description: "Spinach and cheese stuffed mushrooms", price: "$8.00", imageUrl: img2 },
                ]
            },
            {
                title: "Non-Vegetarian",
                items: [
                    { id: 103, name: "Crispy Calamari", description: "Lightly fried, served with citrus aioli", price: "$12.00", imageUrl: img3 },
                    { id: 104, name: "Chicken Wings", description: "Spicy buffalo wings with blue cheese dip", price: "$10.00", imageUrl: img4 },
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Mains",
        imageUrl: img2,
        mealType: ['Lunch', 'Dinner'],
        subCategories: [
            {
                title: "Pasta",
                items: [
                    { id: 201, name: "Carbonara", description: "Creamy sauce, pancetta, parmesan", price: "$16.00", imageUrl: img5 },
                    { id: 202, name: "Arrabbiata", description: "Spicy tomato sauce, garlic, chili", price: "$14.00", imageUrl: img6 },
                ]
            },
            {
                title: "Grill",
                items: [
                    { id: 203, name: "Ribeye Steak", description: "12oz, herb butter, fries", price: "$28.00", imageUrl: img1, options: [{ label: "Rare", price: "$28" }, { label: "Medium", price: "$28" }, { label: "Well Done", price: "$28" }] },
                    { id: 204, name: "Grilled Salmon", description: "Lemon butter sauce, asparagus", price: "$24.00", imageUrl: img2 },
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Desserts",
        imageUrl: img3,
        mealType: ['Lunch', 'Dkjjinner'],
        subCategories: [
            {
                title: "Cakes",
                items: [
                    { id: 301, name: "Chocolate Lava Cake", description: "Warm molten center, vanilla ice cream", price: "$9.00", imageUrl: img3 },
                    { id: 302, name: "Cheesecake", description: "New York style, berry compote", price: "$8.00", imageUrl: img4 },
                ]
            },
            {
                title: "Ice Cream",
                items: [
                    { id: 303, name: "Sundae", description: "Three scoops, chocolate sauce, nuts", price: "$7.00", imageUrl: img5 },
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Beverages",
        imageUrl: img4,
        mealType: ['Breakfast', 'Lunch', 'Dinner'],
        subCategories: [
            {
                title: "Hot",
                items: [
                    { id: 401, name: "Espresso", description: "Single shot", price: "$3.00", imageUrl: img6 },
                    { id: 402, name: "Cappuccino", description: "Espresso, steamed milk, foam", price: "$4.50", imageUrl: img1 },
                ]
            },
            {
                title: "Cold",
                items: [
                    { id: 403, name: "Iced Latte", description: "Espresso, cold milk, ice", price: "$5.00", imageUrl: img2 },
                    { id: 404, name: "Fresh Juice", description: "Orange, Apple, or Watermelon", price: "$6.00", imageUrl: img3 },
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Specials",
        imageUrl: img5,
        mealType: ['Dinner'],
        subCategories: [
            {
                title: "Chef's Choice",
                items: [
                    { id: 501, name: "Truffle Risotto", description: "Wild mushrooms, truffle oil, parmesan", price: "$22.00", imageUrl: img4 },
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Vegan",
        imageUrl: img6,
        mealType: ['Breakfast', 'Lunch', 'Dinner'],
        subCategories: [
            {
                title: "Bowls",
                items: [
                    { id: 601, name: "Buddha Bowl", description: "Quinoa, avocado, chickpeas, tahini", price: "$15.00", imageUrl: img5 },
                ]
            }
        ]
    }
];

// --- 3D Background Components ---

// const BackgroundScene = () => {
//     return (
//         <group>
//             {/* Caustics Effect */}
//             <Caustics
//                 color="#00ffff"
//                 position={[0, -5, 0]}
//                 lightSource={[5, 5, -10]}
//                 worldRadius={10}
//                 ior={1.1}
//                 intensity={0.2}
//                 causticsOnly={false}
//                 backside={false}
//             >
//             </Caustics>

//             {/* Bubbles */}
//             <Sparkles3D count={300} scale={15} size={4} speed={0.6} opacity={0.6} color="#aaccff" />
//             <Sparkles3D count={150} scale={10} size={10} speed={0.2} opacity={0.2} color="#ffffff" />

//             {/* Subtle Cloud/Fog for depth */}
//             <Cloud opacity={0.1} speed={0.1} segments={10} position={[0, -5, -10]} color="#aaccff" />

//             {/* Lighting */}
//             <ambientLight intensity={0.5} color="#001e36" />
//             <spotLight position={[0, 20, 0]} intensity={2} angle={0.5} penumbra={1} color="#ccffff" castShadow />
//             <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />

//             {/* Environment for reflections */}
//             <Environment preset="city" blur={1} />
//         </group>
//     )
// }

interface SpiralBackgroundProps {
    activeCategory?: string;
    images?: string[];
}

const SpiralBackground: React.FC<SpiralBackgroundProps> = ({ activeCategory = "Starters", images }) => {
    // If we have images passed as prop, we might use them, but the prompt logic relies on menuData
    // I will prioritize menuData filtering but keeping the structure

    // Note: The prompt used 'filteredItems' from 'menuData' based on 'activeCategory'.
    // If 'activeCategory' is just a string, we filter.
    // If the category name doesn't match 'mealType' perfectly (e.g. "Lunch" vs "Lunnjjch"), it might fail.
    // Note: User prompt has "Lunnjjch" in one item. I kept it as is from prompt.

    const filteredItems = menuData.filter(item => item.mealType.includes(activeCategory));
    // Fallback if no items found (e.g. if activeCategory doesn't match)
    const itemsToUse = filteredItems.length > 0 ? filteredItems : menuData;

    const isSpiral = itemsToUse.length >= 3;

    const spiralItems = isSpiral
        ? [...itemsToUse, ...itemsToUse, ...itemsToUse, ...itemsToUse].slice(0, 20)
        : itemsToUse; // for non-spiral mode use itemsToUse directly

    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<number | null>(null)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const openRef = useRef(open)
    openRef.current = open

    const scrollYRef = useRef(0)
    const targetScrollYRef = useRef(0)
    const transitionRef = useRef(0);

    // Reset scroll when category changes
    useEffect(() => {
        scrollYRef.current = 0;
        targetScrollYRef.current = 0;
    }, [activeCategory]);

    const getResponsiveValues = () => {
        if (typeof window === "undefined") return { radius: 800, spacing: 250 };
        const width = window.innerWidth;
        if (width < 375) return { radius: 250, spacing: 140 };
        if (width < 480) return { radius: 320, spacing: 180 };
        if (width < 768) return { radius: 450, spacing: 200 };
        if (width < 1024) return { radius: 650, spacing: 220 };
        return { radius: 800, spacing: 250 };
    };

    useEffect(() => {
        // Only run the spiral GSAP logic when we are in spiral mode
        if (!isSpiral) return;

        const prevOverflowX = document.documentElement.style.overflowX;
        document.documentElement.style.overflowX = "hidden";

        const cards = cardsRef.current;
        const total = cards.length; // Use current cards length

        const { radius, spacing } = getResponsiveValues();
        const totalHeight = total * spacing;

        const minScroll = -totalHeight / 2;
        const maxScroll = totalHeight / 2;

        const updateCards = () => {
            // 1. Calculate Transition Progress (0 = Spiral, 1 = Vertical)
            const targetTransition = openRef.current ? 1 : 0;
            transitionRef.current += (targetTransition - transitionRef.current) * 0.1;

            // Snap if close to finish to avoid endless micro-calcs (optional, but good for perf)
            if (Math.abs(targetTransition - transitionRef.current) < 0.001) {
                transitionRef.current = targetTransition;
            }

            const t = transitionRef.current;

            cards.forEach((card, i) => {
                if (!card) return;

                // --- SPIRAL CALCS ---
                const offset = i * spacing;
                let spiralY = offset + scrollYRef.current;
                spiralY -= totalHeight / 2;

                const progress = spiralY / totalHeight;
                const angle = progress * Math.PI * 2 * 4;
                const isVisibleSpiral = spiralY >= minScroll && spiralY <= maxScroll;

                // --- VERTICAL CALCS ---
                // Vertical column on the left (e.g., 20% from left)
                // Stack items based on index, centered vertically
                const vertSpacing = isMobile ? 80 : 120; // Tighter spacing for vertical list
                // Calculate y position relative to center (0)
                const vertY = (i - (total - 1) / 2) * vertSpacing;

                // --- INTERPOLATION ---
                // Lerp properties
                const currentLeftPct = 50 + (15 - 50) * t; // 50% -> 15%
                const currentY = spiralY * (1 - t) + vertY * t;
                const currentRotationY = (angle * 180 / Math.PI) * (1 - t); // angle -> 0
                const currentTZ = -radius * (1 - t); // -radius -> 0 (flat)

                // Opacity: If t > 0, we want items to be visible even if they were out of spiral view?
                // Or should we respect the vertical list bounds?
                // Let's fade them in if they become part of the vertical list
                // Use a simple blend: if mostly vertical, show all (or clip if massive list).
                // Let's assume we show them. 
                const opacity = (isVisibleSpiral ? 1 : 0) * (1 - t) + 1 * t;

                gsap.set(card, {
                    y: currentY,
                    rotationY: currentRotationY,
                    transformOrigin: `50% 50% ${currentTZ}px`,
                    xPercent: -50,
                    yPercent: -50,
                    left: `${currentLeftPct}%`,
                    top: "50%",
                    opacity: opacity,
                    zIndex: Math.round(Math.cos(angle) * 100 * (1 - t)) + 10
                });
            });
        };

        const handleWheel = (e: WheelEvent) => {
            if (openRef.current) return;
            const newTargetScroll = targetScrollYRef.current - e.deltaY * 0.5;
            targetScrollYRef.current = Math.max(minScroll, Math.min(maxScroll, newTargetScroll));
        };

        window.addEventListener("wheel", handleWheel);

        const ticker = gsap.ticker.add(() => {
            // Only scroll calculation if not fully open (or you can let it run but it won't affect vertical y)
            if (!openRef.current) {
                scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * 0.1;
            }
            updateCards();
        });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            gsap.ticker.remove(ticker);
            document.documentElement.style.overflowX = prevOverflowX;
        };
    }, [isSpiral, spiralItems, isMobile]); // depend on isSpiral and spiralItems

    const displayedItems = isSpiral ? spiralItems : itemsToUse;
    const selectedCategory = selected !== null ? displayedItems[selected % displayedItems.length] : null;

    return (
        <Box
            ref={containerRef}
            sx={{
                perspective: "1500px",
                width: "100%",
                height: "100vh",
                background: "#001e36", // Kept from original file
                overflow: "hidden",
                position: "relative",
                transform: "translateZ(0)",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                fontFamily: "'Courier New', Courier, monospace",
                color: "#aaccff",
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                },
            }}
        >
            {/* 3D Background */}
            {/* <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <color attach="background" args={['#001e36']} />
                    <fog attach="fog" args={['#001e36', 5, 25]} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Canvas>
            </Box> */}

            {/* Sparkles Background (2D from prompt) */}
            <Sparkles />

            {/* Cards: center 1-2 items; spiral layout for 3+ items */}
            {isSpiral ? (
                // Spiral layout (positions set by GSAP)
                displayedItems.map((item, i) => (
                    <Box
                        key={i}
                        onClick={() => {
                            setSelected(i)
                            setOpen(true)
                        }}
                        ref={(el: HTMLDivElement | null) => {
                            cardsRef.current[i] = el;
                        }}
                        className="spiral-card"
                        sx={{
                            width: "90%",
                            maxWidth: "400px",
                            aspectRatio: "1/1",
                            background: `url(${item.imageUrl}) center/cover no-repeat`,
                            borderRadius: "16px",
                            position: "absolute",
                            boxShadow:
                                "0 25px 50px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)",
                            opacity: 0,
                            border: "1px solid rgba(0, 255, 255, 0.3)",
                            cursor: 'pointer',
                            userSelect: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            overflow: 'hidden',
                            '&:hover .card-overlay': {
                                transform: 'translateY(0)',
                            }
                        }}
                    >
                        <Box
                            className="card-overlay"
                            sx={{
                                background: 'rgba(0, 30, 54, 0.8)',
                                backdropFilter: 'blur(10px)',
                                p: 2,
                                transform: 'translateY(0)',
                                transition: 'transform 0.3s ease-in-out',
                                borderTop: '1px solid rgba(0, 255, 255, 0.2)',
                            }}
                        >
                            <Typography variant="h6" sx={{ color: '#00ffff', fontWeight: 700, textAlign: 'center' }}>
                                {item.title}
                            </Typography>
                        </Box>
                    </Box>
                ))
            ) : (
                // Centered layout for 1-2 items
                <Box sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? 2 : 4,
                    flexDirection: isMobile ? 'column' : 'row',
                    px: 2
                }}>
                    {displayedItems.map((item, i) => (
                        <Box
                            key={i}
                            onClick={() => { setSelected(i); setOpen(true) }}
                            ref={(el: HTMLDivElement | null) => { cardsRef.current[i] = el; }}
                            className="spiral-card"
                            sx={{
                                width: isMobile ? '90%' : '360px',
                                height: '420px',
                                background: `url(${item.imageUrl}) center/cover no-repeat`,
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                border: '1px solid rgba(0,255,255,0.12)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                overflow: 'hidden'
                            }}
                        >
                            <Box className="card-overlay" sx={{
                                background: 'rgba(0, 30, 54, 0.8)',
                                backdropFilter: 'blur(10px)',
                                p: 2,
                                transform: 'translateY(0)',
                                transition: 'transform 0.3s ease-in-out',
                                borderTop: '1px solid rgba(0, 255, 255, 0.2)',
                            }}>
                                <Typography variant="h6" sx={{ color: '#00ffff', fontWeight: 700, textAlign: 'center' }}>
                                    {item.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Inline Details Panel (Replaces Modal) */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: { xs: '100%', md: '60%', lg: '65%' },
                    background: "rgba(0, 30, 54, 0.85)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    borderLeft: "1px solid rgba(0, 255, 255, 0.2)",
                    boxShadow: "-10px 0 50px rgba(0,0,0,0.5)",
                    zIndex: 100, // Below nav buttons (2000)
                    transform: open ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 3, md: 6 },
                    pt: { xs: 10, md: 12 }, // Space for nav buttons
                    overflowY: 'auto'
                }}
            >
                {/* Close Button & Title Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4,
                    borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                    pb: 2
                }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: '#00ffff',
                            fontFamily: "'Courier New', Courier, monospace",
                            textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                            fontSize: { xs: '1.5rem', md: '2.5rem' }
                        }}
                    >
                        {selectedCategory?.title || 'Menu'}
                    </Typography>

                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            color: '#00ffff',
                            border: '1px solid rgba(0, 255, 255, 0.3)',
                            '&:hover': {
                                background: 'rgba(0, 255, 255, 0.1)',
                                transform: 'rotate(90deg)',
                                transition: 'all 0.3s ease'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                    {selectedCategory?.subCategories.map((sub, idx) => (
                        <Box key={idx} sx={{ mb: 6 }}>
                            <Typography variant="h4" sx={{
                                color: '#D9A756',
                                fontWeight: 700,
                                mb: 3,
                                fontFamily: "'Courier New', Courier, monospace",
                                borderBottom: '1px solid rgba(217, 167, 86, 0.3)',
                                pb: 1,
                                display: 'inline-block',
                                fontSize: { xs: '1.2rem', md: '1.8rem' }
                            }}>
                                {sub.title}
                            </Typography>
                            <List sx={{ pt: 1 }}>
                                {sub.items.map((item, i) => (
                                    <ListItem
                                        key={item.id}
                                        sx={{
                                            flexDirection: isMobile ? 'column' : 'row',
                                            alignItems: isMobile ? 'flex-start' : 'center',
                                            p: 3,
                                            mb: 2,
                                            borderRadius: '20px',
                                            background: 'rgba(0, 255, 255, 0.03)',
                                            border: '1px solid rgba(0, 255, 255, 0.05)',
                                            borderLeft: '4px solid transparent',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&:hover': {
                                                background: 'rgba(0, 255, 255, 0.08)',
                                                transform: 'translateX(10px)',
                                                borderColor: 'rgba(0, 255, 255, 0.2)',
                                                borderLeftColor: '#D9A756',
                                                '& .item-image': {
                                                    transform: 'scale(1.1)',
                                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
                                                    borderColor: 'rgba(0, 255, 255, 0.5)'
                                                },
                                                '& .price-tag': {
                                                    background: '#D9A756',
                                                    color: '#000',
                                                    transform: 'scale(1.05)',
                                                    boxShadow: '0 0 15px rgba(217, 167, 86, 0.5)'
                                                }
                                            },
                                            animation: open ? `fadeInRight 0.5s ease forwards ${i * 0.05 + 0.3}s` : 'none',
                                            opacity: 0,
                                            transform: 'translateX(20px)'
                                        }}
                                    >
                                        <Box
                                            className="item-image"
                                            sx={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '16px',
                                                background: `url(${item.imageUrl}) center/cover no-repeat`,
                                                mr: 3,
                                                mb: isMobile ? 2 : 0,
                                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                                flexShrink: 0,
                                                transition: 'all 0.4s ease'
                                            }}
                                        />
                                        <ListItemText
                                            primary={
                                                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.4rem', fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                                                    {item.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography sx={{ color: 'rgba(170, 204, 255, 0.85)', fontSize: '1rem', mt: 1, fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.5 }}>
                                                        {item.description}
                                                    </Typography>
                                                    {item.options && (
                                                        <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
                                                            {item.options.map((opt, oIdx) => (
                                                                <Typography key={oIdx} variant="caption" sx={{
                                                                    color: '#00ffff',
                                                                    border: '1px solid rgba(0, 255, 255, 0.3)',
                                                                    px: 1.5,
                                                                    py: 0.5,
                                                                    borderRadius: '6px',
                                                                    fontSize: '0.8rem',
                                                                    cursor: 'default',
                                                                    '&:hover': {
                                                                        background: 'rgba(0, 255, 255, 0.1)'
                                                                    }
                                                                }}>
                                                                    {opt.label}: {opt.price}
                                                                </Typography>
                                                            ))}
                                                        </Box>
                                                    )}
                                                </Box>
                                            }
                                        />
                                        <Box sx={{ textAlign: 'right', ml: 2, minWidth: '80px' }}>
                                            <Box
                                                className="price-tag"
                                                sx={{
                                                    background: 'rgba(217, 167, 86, 0.15)',
                                                    border: '1px solid #D9A756',
                                                    color: '#D9A756',
                                                    px: 2,
                                                    py: 1,
                                                    borderRadius: '12px',
                                                    fontWeight: 800,
                                                    fontSize: '1.2rem',
                                                    fontFamily: "'Courier New', Courier, monospace",
                                                    transition: 'all 0.3s ease',
                                                    whiteSpace: 'nowrap',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {item.price}
                                            </Box>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ))}
                </Box>
            </Box>

            <style>{`
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: rgba(0, 30, 54, 0.5); 
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(0, 255, 255, 0.3); 
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 255, 255, 0.5); 
                }

                @media (max-width: 1024px) { .spiral-card { max-width: 350px; } }
                @media (max-width: 768px) { .spiral-card { max-width: 300px; } }
                @media (max-width: 480px) { .spiral-card { max-width: 250px; } }
                @media (max-width: 375px) { .spiral-card { max-width: 200px; } }
            `}</style>
        </Box>
    );
};

export default SpiralBackground;