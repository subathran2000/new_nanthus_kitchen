import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Box, useTheme, useMediaQuery, IconButton, Typography, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


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
    mealType: ["Lunch", "Dinner"],
    subCategories: [
      {
        title: "Vegetarian",
        items: [
          {
            id: 101,
            name: "Bruschetta",
            description: "Toasted bread, tomato, basil, olive oil",
            price: "$6.00",
            imageUrl: img1,
          },
          {
            id: 102,
            name: "Stuffed Mushrooms",
            description: "Spinach and cheese stuffed mushrooms",
            price: "$8.00",
            imageUrl: img2,
          },
        ],
      },
      {
        title: "Non-Vegetarian",
        items: [
          {
            id: 103,
            name: "Crispy Calamari",
            description: "Lightly fried, served with citrus aioli",
            price: "$12.00",
            imageUrl: img3,
          },
          {
            id: 104,
            name: "Chicken Wings",
            description: "Spicy buffalo wings with blue cheese dip",
            price: "$10.00",
            imageUrl: img4,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Mains",
    imageUrl: img2,
    mealType: ["Lunch", "Dinner"],
    subCategories: [
      {
        title: "Pasta",
        items: [
          {
            id: 201,
            name: "Carbonara",
            description: "Creamy sauce, pancetta, parmesan",
            price: "$16.00",
            imageUrl: img5,
          },
          {
            id: 202,
            name: "Arrabbiata",
            description: "Spicy tomato sauce, garlic, chili",
            price: "$14.00",
            imageUrl: img6,
          },
        ],
      },
      {
        title: "Grill",
        items: [
          {
            id: 203,
            name: "Ribeye Steak",
            description: "12oz, herb butter, fries",
            price: "$28.00",
            imageUrl: img1,
            options: [
              { label: "Rare", price: "$28" },
              { label: "Medium", price: "$28" },
              { label: "Well Done", price: "$28" },
            ],
          },
          {
            id: 204,
            name: "Grilled Salmon",
            description: "Lemon butter sauce, asparagus",
            price: "$24.00",
            imageUrl: img2,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Desserts",
    imageUrl: img3,
    mealType: ["Lunch", "Dinner"],
    subCategories: [
      {
        title: "Cakes",
        items: [
          {
            id: 301,
            name: "Chocolate Lava Cake",
            description: "Warm molten center, vanilla ice cream",
            price: "$9.00",
            imageUrl: img3,
          },
          {
            id: 302,
            name: "Cheesecake",
            description: "New York style, berry compote",
            price: "$8.00",
            imageUrl: img4,
          },
        ],
      },
      {
        title: "Ice Cream",
        items: [
          {
            id: 303,
            name: "Sundae",
            description: "Three scoops, chocolate sauce, nuts",
            price: "$7.00",
            imageUrl: img5,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Beverages",
    imageUrl: img4,
    mealType: ["Breakfast", "Lunch", "Dinner"],
    subCategories: [
      {
        title: "Hot",
        items: [
          {
            id: 401,
            name: "Espresso",
            description: "Single shot",
            price: "$3.00",
            imageUrl: img6,
          },
          {
            id: 402,
            name: "Cappuccino",
            description: "Espresso, steamed milk, foam",
            price: "$4.50",
            imageUrl: img1,
          },
        ],
      },
      {
        title: "Cold",
        items: [
          {
            id: 403,
            name: "Iced Latte",
            description: "Espresso, cold milk, ice",
            price: "$5.00",
            imageUrl: img2,
          },
          {
            id: 404,
            name: "Fresh Juice",
            description: "Orange, Apple, or Watermelon",
            price: "$6.00",
            imageUrl: img3,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Specials",
    imageUrl: img5,
    mealType: ["Dinner"],
    subCategories: [
      {
        title: "Chef's Choice",
        items: [
          {
            id: 501,
            name: "Truffle Risotto",
            description: "Wild mushrooms, truffle oil, parmesan",
            price: "$22.00",
            imageUrl: img4,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Vegan",
    imageUrl: img6,
    mealType: ["Breakfast", "Lunch", "Dinner"],
    subCategories: [
      {
        title: "Bowls",
        items: [
          {
            id: 601,
            name: "Buddha Bowl",
            description: "Quinoa, avocado, chickpeas, tahini",
            price: "$15.00",
            imageUrl: img5,
          },
        ],
      },
    ],
  },
];



interface SpiralBackgroundProps {
    activeCategory?: string;
    images?: string[];
}

const SpiralBackground: React.FC<SpiralBackgroundProps> = ({ activeCategory = "Starters" }) => {
    // The prompt logic relies on menuData filtering based on activeCategory

    // Note: The prompt used 'filteredItems' from 'menuData' based on 'activeCategory'.
    // If 'activeCategory' is just a string, we filter.
    // If the category name doesn't match 'mealType' perfectly (e.g. "Lunch" vs "Lunnjjch"), it might fail.
    // Note: User prompt has "Lunnjjch" in one item. I kept it as is from prompt.

    const filteredItems = menuData.filter(item => item.mealType.includes(activeCategory));
    // Fallback if no items found (e.g. if activeCategory doesn't match)
    const itemsToUse = filteredItems.length > 0 ? filteredItems : menuData;

    const isSpiral = itemsToUse.length >= 3;

    const spiralItems = itemsToUse;

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
        if (width < 480) return { radius: 300, spacing: 180 };
        if (width < 768) return { radius: 400, spacing: 200 };
        if (width < 1024) return { radius: 600, spacing: 220 };
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

            if (Math.abs(targetTransition - transitionRef.current) < 0.001) {
                transitionRef.current = targetTransition;
            }

            const t = transitionRef.current;

            cards.forEach((card, i) => {
                if (!card) return;

                // --- SPIRAL CALCS ---
                const offset = i * spacing;
                let spiralY = offset + scrollYRef.current;

                // Center spiral vertically
                spiralY -= totalHeight / 2;

                // NEW SPIRAL LOGIC
                const progress = spiralY / totalHeight;
                const angle = progress * Math.PI * 2 * 4; // Use the multiplier 4 for more curve
                const isVisibleSpiral = spiralY >= minScroll && spiralY <= maxScroll;

                // --- VERTICAL CALCS ---
                const vertSpacing = isMobile ? 80 : 120;

                const vertY = (i - (total - 1) / 2) * vertSpacing;

                // --- INTERPOLATION ---
                const currentLeftPct = 50 + (15 - 50) * t;
                const currentY = spiralY * (1 - t) + vertY * t;
                const currentRotationY = ((angle * 180) / Math.PI) * (1 - t);
                const currentTZ = -radius * (1 - t);

                // If fully visible in spiral or transitioning to list
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

        // Touch support for mobile
        let touchStartY = 0;
        let touchLastY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            if (openRef.current) return;
            touchStartY = e.touches[0].clientY;
            touchLastY = touchStartY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (openRef.current) return;
            e.preventDefault(); // Prevent page scrolling
            const touchY = e.touches[0].clientY;
            const deltaY = touchLastY - touchY;
            touchLastY = touchY;

            const newTargetScroll = targetScrollYRef.current - deltaY * 2; // Adjust sensitivity
            targetScrollYRef.current = Math.max(minScroll, Math.min(maxScroll, newTargetScroll));
        };

        const handleTouchEnd = () => {
            touchStartY = 0;
            touchLastY = 0;
        };

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd);

        const ticker = gsap.ticker.add(() => {
            // Only scroll calculation if not fully open (or you can let it run but it won't affect vertical y)
            if (!openRef.current) {
                scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * 0.1;
            }
            updateCards();
        });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
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

                            opacity: 0,
                            border: open && selected === i ? "2px solid #FF8C00" : "1px solid rgba(0, 255, 255, 0.3)",
                            boxShadow: open && selected === i
                                ? "0 0 30px rgba(255, 140, 0, 0.6), 0 25px 50px rgba(0,0,0,0.8)"
                                : "0 25px 50px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)",
                            cursor: 'pointer',
                            userSelect: 'none',
                        }}
                    >
                        {/* Selected Item Overlay */}
                        {open && selected === i && (
                            <Box
                                className="card-overlay"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'rgba(0, 30, 54, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    p: 2,
                                    borderTop: '1px solid rgba(255, 140, 0, 0.5)',
                                    animation: 'fadeIn 0.5s ease-out'
                                }}
                            >
                                <Typography variant="h6" sx={{ color: '#FF8C00', fontWeight: 700, textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
                                    {item.title}
                                </Typography>
                            </Box>
                        )}
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
                    gap: isMobile ? 1.5 : 3,
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
                                <Typography variant="h6" sx={{ color: '#FF8C00', fontWeight: 700, textAlign: 'center' }}>
                                    {item.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Side-panel Detail View (Premium Orange Theme - No Images) */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: { xs: '100%', md: '60%', lg: '65%' },
                    background: "rgba(0, 15, 27, 0.95)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    borderLeft: "2px solid rgba(255, 140, 0, 0.3)",
                    boxShadow: "-10px 0 50px rgba(0,0,0,0.5)",
                    zIndex: 1000,
                    transform: open ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 0,
                    overflow: 'hidden'
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        top: 100,
                        right: 25,
                        zIndex: 1100,
                        color: '#FF8C00',
                        bgcolor: 'rgba(255,140,0,0.1)',
                        '&:hover': {
                            bgcolor: 'rgba(255,140,0,0.2)',
                            transform: 'rotate(90deg)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Content Container */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: { xs: 4, md: 8 },
                        pt: { xs: 12, md: 10 },
                        '&::-webkit-scrollbar': { width: '4px' },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': { background: '#FF8C00', borderRadius: '4px' }
                    }}
                >


                    {/* Title Header */}
                    <Box sx={{
                        p: { xs: 4, md: 5 },
                        pb: 0,
                        textAlign: 'center'
                    }}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: '#FF8C00',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                textShadow: '0 0 20px rgba(255, 140, 0, 0.4)',
                                fontSize: { xs: '2rem', md: '3rem' }
                            }}
                        >
                            {selectedCategory?.title}
                        </Typography>
                        <Box sx={{ width: '60px', height: '2px', bgcolor: 'rgba(0, 255, 255, 0.3)', mx: 'auto', mt: 2 }} />
                    </Box>

                    {/* Menu Content */}
                    <Box
                        sx={{
                            p: { xs: 3, md: 5 },
                            pt: 2,
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': { width: '4px' },
                            '&::-webkit-scrollbar-track': { background: 'transparent' },
                            '&::-webkit-scrollbar-thumb': { background: '#FF8C00', borderRadius: '4px' }
                        }}
                    >
                        {selectedCategory?.subCategories.map((sub, idx) => (
                            <Box key={idx} sx={{ mb: 6 }}>
                                <Typography variant="h5" sx={{
                                    color: '#FF8C00',
                                    fontWeight: 600,
                                    mb: 3,
                                    fontFamily: "'Inter', sans-serif", // Courier or Monospace would match reference closer, but user asked for fonts. Sticking to Inter.
                                    letterSpacing: '0.05em',
                                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                                }}>
                                    {sub.title}
                                </Typography>
                                <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {sub.items.map((item) => (
                                        <ListItem
                                            key={item.id}
                                            sx={{
                                                p: 0,
                                                mb: 2.5,
                                                borderRadius: '16px',
                                                background: 'rgba(0, 20, 35, 0.5)', // Default dark background
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                // Left accent bar (hidden by default)
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    bottom: 0,
                                                    width: '6px',
                                                    background: '#FF8C00', // Orange accent
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                    zIndex: 1
                                                },
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, rgba(0, 30, 54, 0.95) 0%, rgba(0, 50, 85, 0.85) 100%)',
                                                    borderColor: '#FF8C00',
                                                    boxShadow: '0 0 25px rgba(255, 140, 0, 0.15), inset 0 0 20px rgba(255, 140, 0, 0.05)',
                                                    transform: 'translateX(8px)',
                                                    '&::before': {
                                                        opacity: 1
                                                    },
                                                    // Target child elements on hover
                                                    '& .item-image': {
                                                        boxShadow: '0 0 20px rgba(255, 140, 0, 0.5)',
                                                        borderColor: '#FF8C00',
                                                    },
                                                    '& .price-pill': {
                                                        bgcolor: '#FF8C00',
                                                        color: '#001e36',
                                                        boxShadow: '0 0 20px rgba(255, 140, 0, 0.6)',
                                                        borderColor: '#FF8C00'
                                                    }
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                                                {/* Image Section */}
                                                <Box
                                                    className="item-image"
                                                    sx={{
                                                        width: '100px',
                                                        height: '100px',
                                                        minWidth: '100px',
                                                        background: `url(${item.imageUrl}) center/cover no-repeat`,
                                                        m: 2,
                                                        ml: 3, // Extra spacing for the left accent bar
                                                        borderRadius: '12px',
                                                        transition: 'all 0.4s ease',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                                                    }}
                                                />

                                                {/* Content Section */}
                                                <Box sx={{ flex: 1, px: 2, py: 2 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                                                        <Typography sx={{
                                                            color: '#fff',
                                                            fontWeight: 700,
                                                            fontSize: '1.2rem',
                                                            fontFamily: "'Inter', sans-serif",
                                                            letterSpacing: '0.02em'
                                                        }}>
                                                            {item.name}
                                                        </Typography>
                                                    </Box>

                                                    <Typography sx={{
                                                        color: 'rgba(170, 204, 255, 0.6)',
                                                        fontSize: '0.9rem',
                                                        lineHeight: 1.5,
                                                        mb: 1,
                                                        fontFamily: "'Inter', sans-serif",
                                                        maxWidth: '90%'
                                                    }}>
                                                        {item.description}
                                                    </Typography>
                                                </Box>

                                                {/* Price Section */}
                                                <Box sx={{ pr: 3, display: 'flex', alignItems: 'center' }}>
                                                    <Box
                                                        className="price-pill"
                                                        sx={{
                                                            bgcolor: 'transparent',
                                                            color: '#FF8C00',
                                                            border: '1px solid rgba(255, 140, 0, 0.6)',
                                                            px: 2.5,
                                                            py: 1,
                                                            borderRadius: '50px',
                                                            fontWeight: 700,
                                                            fontSize: '1rem',
                                                            fontFamily: "'Inter', sans-serif",
                                                            transition: 'all 0.4s ease',
                                                            letterSpacing: '0.05em'
                                                        }}
                                                    >
                                                        {item.price}
                                                    </Box>
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
                    background: rgba(255, 140, 0, 0.4); 
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 140, 0, 0.6); 
                }

                @media (max-width: 1024px) { .spiral-card { max-width: 350px; } }
                @media (max-width: 768px) { .spiral-card { max-width: 300px; } }
                @media (max-width: 480px) { .spiral-card { max-width: 250px; } }
                @media (max-width: 375px) { .spiral-card { max-width: 200px; } }
            `}</style>
            </Box>
        </Box>
    );
};

export default SpiralBackground;
