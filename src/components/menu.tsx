import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Box, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, IconButton, Typography, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Caustics, Environment, Cloud, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Image1 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image2 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image3 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image4 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image5 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image6 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image7 from "../assets/images/new_nanthus_kitchen_logo.png";
import Image8 from "../assets/images/new_nanthus_kitchen_logo.png";

const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image1, Image2];

// --- Data Types ---
type MenuItem = { name: string; desc?: string; price: string; image: string; subCatTitle?: string };
type SubCategory = { title: string; items: MenuItem[] };
type MainCategory = { id: string; title: string; subtitle: string; image: string; subCategories: SubCategory[] };

const menuData: MainCategory[] = [
    {
        id: 'breakfast',
        title: 'BREAKFAST',
        subtitle: 'Start your day with elegance',
        image: Image1,
        subCategories: [
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
                    { name: 'Iced Tea', desc: 'Lemon & mint', price: '$3', image: images[1] },
                ]
            }
        ]
    },
    {
        id: 'lunch',
        title: 'LUNCH',
        subtitle: 'Midday culinary artistry',
        image: Image2,
        subCategories: [
            {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },  
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            }
        ]
    },
    {
        id: 'dinner',
        title: 'DINNER',
        subtitle: 'An unforgettable evening feast',
        image: Image3,
        subCategories: [
            {
                title: 'Starters',
                items: [
                    { name: 'Lobster Bisque', desc: 'Cognac cream, chives', price: '$24', image: images[1] },
                    { name: 'Steak Tartare', desc: 'Hand-cut filet, quail egg, crostini', price: '$26', image: images[2] }
                ]
            },
            {
                title: 'Mains',
                items: [
                    { name: 'Pan-Seared Salmon', desc: 'Lemon butter, seasonal veg', price: '$34', image: images[3] },
                    { name: 'Ribeye Steak', desc: '12oz, herb butter, fries', price: '$45', image: images[4] },
                    { name: 'Truffle Risotto', desc: 'Wild mushrooms, parmesan crisp', price: '$30', image: images[5] }
                ]
            },
            {
                title: 'Desserts',
                items: [
                    { name: 'Chocolate Fondant', desc: 'Warm center, vanilla gelato', price: '$16', image: images[6] },
                    { name: 'Lemon Tart', desc: 'Candied lemon, cream', price: '$14', image: images[7] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },    
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            },
                        {
                title: 'Ocean Fresh',
                items: [
                    { name: 'Crispy Calamari', desc: 'Lightly fried, served with citrus aioli', price: '$24', image: images[5] },
                    { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter capers', price: '$28', image: images[6] }
                ]
            },
            {
                title: 'Garden & Farm',
                items: [
                    { name: 'Wagyu Burger', desc: 'Brioche bun, onion jam, truffle fries', price: '$32', image: images[7] },
                    { name: 'Ancient Grains Bowl', desc: 'Quinoa, roasted vegetables, tahini dressing', price: '$22', image: images[0] }
                ]
            }
        ]
    }
];

// --- 3D Background Components ---

const BackgroundScene = () => {
    const bubbleRef = useRef<any>(null)
    const logoTex = useTexture(Image1)

    useFrame((_, delta) => {
        if (bubbleRef.current) {
            bubbleRef.current.rotation.y += delta * 0.35
        }
    })

    return (
        <group>
            <Caustics
                color="#00ffff"
                position={[0, -5, 0]}
                lightSource={[5, 5, -10]}
                worldRadius={10}
                ior={1.1}
                intensity={0.2}
                causticsOnly={false}
                backside={false}
            />
            <Sparkles count={300} scale={15} size={4} speed={0.6} opacity={0.6} color="#aaccff" />
            <Sparkles count={150} scale={10} size={10} speed={0.2} opacity={0.2} color="#ffffff" />
            <Cloud opacity={0.1} speed={0.1} segments={10} position={[0, -5, -10]} color="#aaccff" />
            <ambientLight intensity={0.5} color="#001e36" />
            <spotLight position={[0, 20, 0]} intensity={2} angle={0.5} penumbra={1} color="#ccffff" castShadow />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
            <Environment preset="city" blur={1} />
            <mesh ref={bubbleRef} position={[0, 1.5, -6]} scale={[2.6, 2.6, 2.6]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial map={logoTex} toneMapped={false} transparent={true} />
            </mesh>
        </group>
    )
}

// --- Component: Category Selection ---

const CategorySelection = ({ onSelect }: { onSelect: (category: MainCategory) => void }) => {
    return (
        <Box sx={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            background: 'rgba(0, 30, 54, 0.4)', // Slight overlay
            backdropFilter: 'blur(5px)'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 4, md: 8 },
                maxWidth: '1200px',
                width: '100%',
                padding: 4,
                justifyContent: 'center'
            }}>
                {menuData.map((cat, index) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        style={{ flex: 1, maxWidth: '350px' }}
                    >
                        <Box
                            onClick={() => onSelect(cat)}
                            sx={{
                                position: 'relative',
                                aspectRatio: '3/4',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.4s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    borderColor: '#D9A756',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                    '& .cat-bg': { transform: 'scale(1.1)' },
                                    '& .cat-overlay': { opacity: 0.8 }
                                }
                            }}
                        >
                            <Box className="cat-bg" sx={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundImage: `url(${cat.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transition: 'transform 0.8s ease',
                                opacity: 0.6
                            }} />
                            <Box className="cat-overlay" sx={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                background: 'linear-gradient(to top, rgba(0,30,54,1) 0%, rgba(0,30,54,0.2) 100%)',
                                opacity: 0.6,
                                transition: 'opacity 0.4s ease'
                            }} />

                            <Box sx={{ mt: 'auto', p: 4, position: 'relative', zIndex: 2, textAlign: 'center' }}>
                                <Typography variant="h4" sx={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 700,
                                    color: '#fff',
                                    letterSpacing: '0.1em',
                                    mb: 1
                                }}>
                                    {cat.title}
                                </Typography>
                                <div style={{ width: '40px', height: '2px', background: '#D9A756', margin: '0 auto 12px auto' }} />
                                <Typography variant="body2" sx={{
                                    color: '#aaccff',
                                    fontFamily: "'Courier New', Courier, monospace",
                                    fontSize: '0.85rem'
                                }}>
                                    {cat.subtitle}
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
};


// --- Component: Spiral Menu ---

const SpiralMenu = ({ category, onBack }: { category: MainCategory, onBack: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const tinyRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [open, setOpen] = useState(false)
    const [selectedSubIndex, setSelectedSubIndex] = useState<number | null>(null)

    // Use SubCategories directly as the cards
    const spiralItems = category.subCategories;

    const getResponsiveValues = () => {
        if (typeof window === "undefined") return { radius: 800, spacing: 250 };
        const width = window.innerWidth;
        if (width < 480) return { radius: 300, spacing: 150 };
        if (width < 768) return { radius: 400, spacing: 180 };
        if (width < 1024) return { radius: 600, spacing: 200 };
        return { radius: 800, spacing: 250 };
    };

    useEffect(() => {
        const prevOverflowX = document.documentElement.style.overflowX;
        document.documentElement.style.overflowX = "hidden";

        const cards = cardsRef.current;
        const total = cards.length;
        const { radius, spacing } = getResponsiveValues();

        // Main spiral cards initialization
        cards.forEach((card, i) => {
            if (!card) return;
            const angle = (i / total) * Math.PI * 2;
            const y = i * spacing;

            gsap.set(card, {
                rotationY: (angle * 180) / Math.PI,
                transformOrigin: `50% 50% ${-radius}px`,
                y: y,
                xPercent: -50,
                yPercent: -50,
                left: "50%",
                top: "50%",
                opacity: 1,
            });
        });

        // Auto-rotation
        gsap.to(cards, {
            rotationY: "+=360",
            duration: 20,
            repeat: -1,
            ease: "none",
            stagger: { each: 0.3, repeat: -1 },
        });

        // Continuous upward scroll
        gsap.to(cards, {
            y: `-=${total * spacing}`,
            duration: total * 2,
            repeat: -1,
            ease: "none",
            modifiers: {
                y: (y) => {
                    const val = parseFloat(y);
                    const limit = total * spacing;
                    // Wrap around logic
                    return `${(val % limit + limit) % limit}px`;
                },
            },
            stagger: { each: 0.3 },
        });

        // Tiny floating images - particle effect
        const tinyElements = tinyRefs.current;
        const isMobileView = window.innerWidth < 768;

        tinyElements.forEach((el) => {
            if (!el || !containerRef.current) return;

            const vw = containerRef.current.clientWidth || window.innerWidth;
            const vh = containerRef.current.clientHeight || window.innerHeight;
            // Fewer particles on mobile for better performance
            const count = isMobileView ? 15 : 40;
            const imgSize = isMobileView ? 12 : 20;

            el.innerHTML = ""; // clear previous tiny images
            for (let j = 0; j < count; j++) {
                const imgEl = document.createElement("div");
                imgEl.classList.add("tiny-img");
                imgEl.style.width = `${imgSize}px`;
                imgEl.style.height = `${imgSize}px`;
                imgEl.style.borderRadius = "50%";
                // Use random images from the global images array for particles
                imgEl.style.background = `url(${images[j % images.length]}) center/cover no-repeat`;
                imgEl.style.position = "absolute";
                imgEl.style.willChange = "transform";
                imgEl.style.opacity = "0.6";

                // random position constrained to container bounds
                const x = Math.random() * Math.max(0, vw - imgSize);
                const y = Math.random() * Math.max(0, vh - imgSize);
                imgEl.style.left = `${x}px`;
                imgEl.style.top = `${y}px`;

                el.appendChild(imgEl);

                // random floating animation
                const duration = isMobileView ? 10 : 5;
                const movement = isMobileView ? 40 : 100;
                gsap.to(imgEl, {
                    x: "+=" + (Math.random() * movement - movement / 2),
                    y: "+=" + (Math.random() * movement - movement / 2),
                    duration: duration + Math.random() * 5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }
        });

        return () => {
            gsap.killTweensOf(cards);
            tinyElements.forEach(el => {
                if (el) gsap.killTweensOf(el.children);
            });
            document.documentElement.style.overflowX = prevOverflowX;
        };
    }, [spiralItems.length]);

    const getModalContent = () => {
        if (selectedSubIndex === null) return null;
        return spiralItems[selectedSubIndex];
    };
    const activeSubCat = getModalContent();

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
            sx={{
                perspective: "1500px",
                width: "100%",
                height: "100%", // Fit parent
                position: "absolute", top: 0, left: 0,
                transformStyle: "preserve-3d",
                '&::before': {
                    content: '""',
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 60%)',
                    pointerEvents: 'none', zIndex: 1,
                },
            }}
        >
            {/* Back Button */}
            <Tooltip title="Back to Categories" placement="right">
                <IconButton
                    onClick={onBack}
                    sx={{
                        position: 'absolute',
                        top: 25,
                        left: 25,
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
                            transform: 'scale(1.1) translateX(-5px)',
                            boxShadow: '0 0 20px rgba(217, 167, 86, 0.3)'
                        }
                    }}
                >
                    <ArrowBackIcon sx={{ fontSize: 28 }} />
                </IconButton>
            </Tooltip>

            {/* Category Title Overlay */}
            <Box sx={{
                position: 'absolute',
                top: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 50,
                textAlign: 'center',
                pointerEvents: 'none',
                width: '100%'
            }}>
                <Typography variant="overline" sx={{ color: '#D9A756', letterSpacing: '0.5em', fontSize: '0.8rem' }}>
                    {category.subtitle}
                </Typography>
                <Typography variant="h3" sx={{
                    color: '#fff',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 100,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    textShadow: '0 0 20px rgba(0,255,255,0.4)',
                    fontSize: { xs: '2rem', md: '3rem' }
                }}>
                    {category.title}
                </Typography>
            </Box>

            {/* Spiral Cards (SubCategories) */}
            {spiralItems.map((subCat, i) => (
                <Box
                    key={i}
                    onClick={() => {
                        setSelectedSubIndex(i);
                        setOpen(true);
                    }}
                    ref={(el: HTMLDivElement | null) => {
                        cardsRef.current[i] = el;
                    }}
                    className="spiral-card"
                    sx={{
                        width: "90%",
                        maxWidth: "600px",
                        aspectRatio: "16/9",
                        background: `url(${subCat.items[0]?.image || Image1}) center/cover no-repeat`,
                        borderRadius: "24px",
                        position: "absolute",
                        boxShadow: "0 25px 50px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)",
                        opacity: 0,
                        border: "1px solid rgba(0, 255, 255, 0.3)",
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'border-color 0.3s ease',
                        '&:hover': {
                            borderColor: '#D9A756'
                        }
                    }}
                >
                    {/* Particle Container */}
                    <Box
                        ref={(el: HTMLDivElement | null) => {
                            tinyRefs.current[i] = el;
                        }}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            overflow: 'hidden',
                            borderRadius: '24px',
                            pointerEvents: 'none'
                        }}
                    />

                    <Box sx={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(to top, rgba(0,30,54,0.95), rgba(0,30,54,0.6))',
                        p: 3,
                        borderRadius: '0 0 24px 24px',
                        borderTop: '1px solid rgba(0,255,255,0.1)',
                        zIndex: 2
                    }}>
                        <Typography variant="h5" sx={{
                            color: '#fff',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                        }}>
                            {subCat.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#D9A756', fontFamily: "'Courier New', monospace", fontSize: '0.8rem' }}>
                            {subCat.items.length} Items
                        </Typography>
                    </Box>
                </Box>
            ))}

            {/* SubCategory Detail Modal (List of Items) */}
            <AnimatePresence>
                {open && (
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        maxWidth="md"
                        fullWidth
                        PaperProps={{
                            component: motion.div,
                            initial: { opacity: 0, y: 100, scale: 0.9 },
                            animate: { opacity: 1, y: 0, scale: 1 },
                            exit: { opacity: 0, y: 100, scale: 0.9 },
                            transition: { duration: 0.5, type: 'spring', bounce: 0.3 },
                            sx: {
                                background: "linear-gradient(135deg, rgba(0, 30, 54, 0.9) 0%, rgba(0, 10, 20, 0.95) 100%)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(0, 255, 255, 0.15)",
                                borderRadius: "32px",
                                color: "#aaccff",
                                boxShadow: "0 0 50px rgba(0, 255, 255, 0.1), inset 0 0 100px rgba(0,0,0,0.5)",
                                overflow: 'hidden',
                                m: 2,
                                maxHeight: '85vh',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                                    background: 'linear-gradient(90deg, transparent, #D9A756, transparent)',
                                    opacity: 0.8
                                }
                            }
                        }}
                    >
                        {activeSubCat && (
                            <>
                                <DialogTitle sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 4,
                                    pb: 2,
                                    background: 'linear-gradient(to bottom, rgba(0, 255, 255, 0.05), transparent)',
                                }}>
                                    <Box>
                                        <Typography variant="overline" sx={{
                                            color: '#D9A756',
                                            letterSpacing: '0.3em',
                                            fontSize: '0.75rem',
                                            display: 'block',
                                            mb: 1
                                        }}>
                                            Selected Category
                                        </Typography>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontWeight: 700,
                                                letterSpacing: '0.02em',
                                                textTransform: 'uppercase',
                                                color: '#fff',
                                                fontFamily: "'Outfit', sans-serif",
                                                fontSize: { xs: '1.8rem', md: '2.5rem' },
                                                textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                                            }}
                                        >
                                            {activeSubCat.title}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        onClick={() => setOpen(false)}
                                        sx={{
                                            color: '#00ffff',
                                            border: '1px solid rgba(0, 255, 255, 0.2)',
                                            background: 'rgba(0,0,0,0.2)',
                                            '&:hover': {
                                                background: '#D9A756',
                                                color: '#000',
                                                transform: 'rotate(90deg)',
                                                borderColor: '#D9A756'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent sx={{ p: 0, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <List sx={{ p: 3, pt: 1 }}>
                                        {activeSubCat.items.map((it, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                            >
                                                <ListItem
                                                    sx={{
                                                        flexDirection: { xs: 'column', sm: 'row' },
                                                        alignItems: { xs: 'flex-start', sm: 'center' },
                                                        p: 3,
                                                        mb: 2,
                                                        borderRadius: '24px',
                                                        background: 'rgba(255, 255, 255, 0.02)',
                                                        border: '1px solid rgba(0, 255, 255, 0.05)',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        '&:hover': {
                                                            background: 'rgba(255, 255, 255, 0.05)',
                                                            borderColor: '#D9A756',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                                                            '& .price-tag': { color: '#D9A756', transform: 'scale(1.1)' },
                                                            '& .item-image': { transform: 'scale(1.05)' }
                                                        }
                                                    }}
                                                >
                                                    <Box
                                                        className="item-image"
                                                        sx={{
                                                            width: { xs: '100%', sm: '120px' },
                                                            height: { xs: '150px', sm: '120px' },
                                                            borderRadius: '16px',
                                                            background: `url(${it.image}) center/cover no-repeat`,
                                                            mr: { xs: 0, sm: 3 },
                                                            mb: { xs: 2, sm: 0 },
                                                            border: '1px solid rgba(0, 255, 255, 0.1)',
                                                            flexShrink: 0,
                                                            transition: 'transform 0.4s ease',
                                                            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                                                        }}
                                                    />
                                                    <ListItemText
                                                        primary={
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                                <Typography sx={{
                                                                    fontWeight: 700,
                                                                    color: '#fff',
                                                                    fontSize: '1.4rem',
                                                                    fontFamily: "'Outfit', sans-serif",
                                                                    letterSpacing: '0.02em',
                                                                }}>
                                                                    {it.name}
                                                                </Typography>
                                                                <Typography className="price-tag" sx={{
                                                                    color: '#00ffff',
                                                                    fontWeight: 700,
                                                                    fontSize: '1.4rem',
                                                                    fontFamily: "'Outfit', sans-serif",
                                                                    transition: 'all 0.3s ease',
                                                                    display: { xs: 'block', sm: 'block' }
                                                                }}>
                                                                    {it.price}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        secondary={
                                                            <Typography sx={{
                                                                color: 'rgba(170, 204, 255, 0.7)',
                                                                fontSize: '1rem',
                                                                fontFamily: "'Courier New', Courier, monospace",
                                                                lineHeight: 1.6,
                                                                maxWidth: '90%'
                                                            }}>
                                                                {it.desc}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            </motion.div>
                                        ))}
                                    </List>
                                </DialogContent>
                            </>
                        )}
                    </Dialog>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 1024px) { .spiral-card { max-width: 500px; } }
                @media (max-width: 768px) { .spiral-card { max-width: 350px; } }
                @media (max-width: 480px) { .spiral-card { max-width: 280px; } }
            `}</style>
        </Box>
    )

}

// --- Main Page Component ---
const MenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null);
    const navigate = useNavigate();

    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            background: "#001e36",
            overflow: "hidden",
            position: "relative",
        }}>
            {/* Global Home Button (only visible in Category View) */}
            <AnimatePresence>
                {!selectedCategory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', top: 25, right: 25, zIndex: 100 }}
                    >
                        <Tooltip title="Back to Home" placement="left">
                            <IconButton
                                onClick={() => navigate('/')}
                                sx={{
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Background - Persistent */}
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

            {/* View Switching */}
            <AnimatePresence mode="wait">
                {!selectedCategory ? (
                    <CategorySelection key="categories" onSelect={setSelectedCategory} />
                ) : (
                    <SpiralMenu key="spiral" category={selectedCategory} onBack={() => setSelectedCategory(null)} />
                )}
            </AnimatePresence>
        </Box>
    );
};

export default MenuPage;
