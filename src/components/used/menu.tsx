import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Box } from "@mui/material";
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Caustics, Environment, Cloud, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, List, ListItem, ListItemText, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'

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
    const bubbleRef = useRef<any>(null)
    const logoTex = useTexture(Image1)

    useFrame((state, delta) => {
        if (bubbleRef.current) {
            // Rotate only horizontally around Y axis; remove X rotation and vertical bobbing
            bubbleRef.current.rotation.y += delta * 0.35
        }
    })

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

            {/* Rotating logo bubble (subtle, behind other scene elements) */}
            <mesh ref={bubbleRef} position={[0, 1.5, -6]} scale={[2.6, 2.6, 2.6]}>
                <sphereGeometry args={[1, 64, 64]} />
                {/* Use a basic material so the bubble shows only the logo texture without environment reflections */}
                <meshBasicMaterial
                    map={logoTex}
                    toneMapped={false}
                    transparent={true}
                />
            </mesh>
        </group>
    )
}

const LandingPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<number | null>(null)
    const openRef = useRef(open)
    openRef.current = open

    const scrollYRef = useRef(0)
    const targetScrollYRef = useRef(0)

    // Example menu data for cards (you can replace with real menu later)
    const menus: { title: string; items: { name: string; desc?: string; price: string; image: string }[] }[] = [
        {
            title: 'Starters',
            items: [
                { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$8', image: images[0] },
                { name: 'Bruschetta', desc: 'Toasted bread, tomato, basil, olive oil', price: '$6', image: images[1] },
                { name: 'Seasonal Soup', desc: 'Chef\'s selection', price: '$5', image: images[2] }
            ]
        },
        {
            title: 'Mains',
            items: [
                { name: 'Pan-Seared Salmon', desc: 'Lemon butter, seasonal veg', price: '$18', image: images[3] },
                { name: 'Ribeye Steak', desc: '12oz, herb butter, fries', price: '$24', image: images[4] },
                { name: 'Vegan Bowl', desc: 'Quinoa, roasted veg, tahini', price: '$14', image: images[5] }
            ]
        },
        {
            title: 'Desserts',
            items: [
                { name: 'Chocolate Fondant', desc: 'Warm center, vanilla gelato', price: '$7', image: images[6] },
                { name: 'Lemon Tart', desc: 'Candied lemon, cream', price: '$6', image: images[7] }
            ]
        },
        {
            title: 'Beverages',
            items: [
                { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] },
                { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] }, { name: 'House Coffee', desc: 'Freshly brewed', price: '$3', image: images[0] },
                { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] },

            ]
        }
    ]




    const getResponsiveValues = () => {
        if (typeof window === "undefined") return { radius: 800, spacing: 250 };
        const width = window.innerWidth;
        if (width < 480) return { radius: 300, spacing: 180 };
        if (width < 768) return { radius: 400, spacing: 200 };
        if (width < 1024) return { radius: 600, spacing: 220 };
        return { radius: 800, spacing: 250 };
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

        // Scroll limits to prevent infinite looping
        const minScroll = -totalHeight / 2;
        const maxScroll = totalHeight / 2;

        // Initial setup
        const updateCards = () => {
            cards.forEach((card, i) => {
                if (!card) return;

                // Calculate base Y position based on index and scroll
                const offset = i * spacing;
                let y = offset + scrollYRef.current;

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
            if (openRef.current) return; // Do not scroll background if popup is open
            const newTargetScroll = targetScrollYRef.current - e.deltaY * 0.5;
            // Clamp the scroll to prevent looping
            targetScrollYRef.current = Math.max(minScroll, Math.min(maxScroll, newTargetScroll));
        };

        window.addEventListener("wheel", handleWheel);

        // Animation loop
        const ticker = gsap.ticker.add(() => {
            // Smooth interpolation
            scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * 0.1;
            updateCards();
        });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            gsap.ticker.remove(ticker);
            // restore document overflow-x
            document.documentElement.style.overflowX = prevOverflowX;
        };
    }, []);

    const navigate = useNavigate();

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
            {/* Home Navigation Button */}
            <Tooltip title="Back to Home" placement="left">
                <IconButton
                    onClick={() => navigate('/')}
                    sx={{
                        position: 'absolute',
                        top: 25,
                        right: 25,
                        zIndex: 100,
                        background: 'rgba(0, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 255, 255, 0.2)',
                        color: '#00ffff',
                        padding: 1.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: 'rgba(217, 167, 86, 0.2)',
                            borderColor: '#D9A756',
                            color: '#D9A756',
                            transform: 'scale(1.1) rotate(-10deg)',
                            boxShadow: '0 0 20px rgba(217, 167, 86, 0.3)'
                        }
                    }}
                >
                    <HomeIcon sx={{ fontSize: 28 }} />
                </IconButton>
            </Tooltip>
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
                        background: `url(${src}) center/cover no-repeat`,
                        borderRadius: "16px",
                        position: "absolute",
                        boxShadow:
                            "0 25px 50px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)",
                        opacity: 0,
                        border: "1px solid rgba(0, 255, 255, 0.3)", // Cyan border accent
                        cursor: 'pointer',
                        userSelect: 'none'
                        // zIndex will be set by GSAP
                    }}
                />
            ))}

            {/* Modal for clicked card */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        background: "rgba(0, 30, 54, 0.6)",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                        border: "1px solid rgba(0, 255, 255, 0.2)",
                        borderRadius: "32px",
                        color: "#aaccff",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        overflow: 'hidden',
                        margin: 2
                    }
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 3,
                    background: 'rgba(0, 255, 255, 0.05)',
                    borderBottom: '1px solid rgba(0, 255, 255, 0.1)'
                }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: '#00ffff',
                            fontFamily: "'Courier New', Courier, monospace",
                            textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                        }}
                    >
                        {selected !== null ? menus[selected % menus.length].title : 'Menu'}
                    </Typography>
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            color: '#00ffff',
                            '&:hover': {
                                background: 'rgba(0, 255, 255, 0.1)',
                                transform: 'rotate(90deg)',
                                transition: 'all 0.3s ease'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
                    <List sx={{ pt: 3, pb: 2 }}>
                        {selected !== null && menus[selected % menus.length].items.map((it, idx) => (
                            <ListItem
                                key={idx}
                                sx={{
                                    alignItems: 'center',
                                    pt: 2.5,
                                    pb: 2.5,
                                    mb: 2,
                                    borderRadius: '16px',
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
                                        borderLeftColor: '#D9A756', // Gold accent on hover
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
                                    animation: `fadeInRight 0.5s ease forwards ${idx * 0.1}s`,
                                    opacity: 0,
                                    transform: 'translateX(20px)'
                                }}
                            >
                                <Box
                                    className="item-image"
                                    sx={{
                                        width: '65px',
                                        height: '65px',
                                        borderRadius: '14px',
                                        background: `url(${it.image}) center/cover no-repeat`,
                                        mr: 2.5,
                                        border: '1px solid rgba(0, 255, 255, 0.2)',
                                        flexShrink: 0,
                                        transition: 'all 0.4s ease'
                                    }}
                                />
                                <ListItemText
                                    primary={
                                        <Typography sx={{
                                            fontWeight: 700,
                                            color: '#ffffff',
                                            fontSize: '1.2rem',
                                            fontFamily: "'Courier New', Courier, monospace",
                                            letterSpacing: '0.02em',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                        }}>
                                            {it.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography sx={{
                                            color: 'rgba(170, 204, 255, 0.85)',
                                            fontSize: '0.95rem',
                                            mt: 0.5,
                                            fontFamily: "'Courier New', Courier, monospace",
                                            lineHeight: 1.4
                                        }}>
                                            {it.desc}
                                        </Typography>
                                    }
                                />
                                <Box sx={{ textAlign: 'right', ml: 2 }}>
                                    <Box
                                        className="price-tag"
                                        sx={{
                                            background: 'rgba(217, 167, 86, 0.15)',
                                            border: '1px solid #D9A756',
                                            color: '#D9A756',
                                            px: 2,
                                            py: 0.8,
                                            borderRadius: '12px',
                                            fontWeight: 800,
                                            fontSize: '1.1rem',
                                            fontFamily: "'Courier New', Courier, monospace",
                                            transition: 'all 0.3s ease',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {it.price}
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>

            <style>{`
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 1024px) { .spiral-card { max-width: 350px; } }
                @media (max-width: 768px) { .spiral-card { max-width: 300px; } }
                @media (max-width: 480px) { .spiral-card { max-width: 250px; } }
            `}</style>
        </Box>
    );
};

export default LandingPage;
