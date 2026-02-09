import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import NavButtons from '../common/NavButtons';
import { menuData } from "../../data/menuData";
import type { MealType } from "../../types";

// Helper to get image for category
const getCategoryImage = (type: string) => {
    const match = menuData.find((cat) => cat.mealType.includes(type as MealType));
    return match?.imageUrl || "";
};

interface InteractiveMenuProps {
    onSelectCategory: (category: string) => void;
    onBack: () => void;
    onHome: () => void;
}

// Create motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function InteractiveMenu({ onSelectCategory, onBack, onHome }: InteractiveMenuProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Extract unique menu types: ["Breakfast", "Lunch", "Dinner"]
    const menuTypes = Array.from(new Set(menuData.flatMap(d => d.mealType)));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 120, damping: 16 }
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                bgcolor: 'transparent',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: { xs: 6, md: 4 },
            }}
        >

            <NavButtons onBack={onBack} onHome={onHome} />

            {/* Main Content */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 1000,
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, md: 4 },
                }}
            >
                <MotionTypography
                    variant="h2"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    sx={{
                        color: '#fff',
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        mb: { xs: 4, md: 6 },
                        textShadow: '0 0 30px rgba(255,140,0,0.3)',
                        fontSize: { xs: '2.3rem', md: '3.2rem' },
                        textAlign: 'center',
                        letterSpacing: '0.04em'
                    }}
                >
                    SELECT MENU
                </MotionTypography>

                {/* NEW: compact, pill-style option row (mobile) and segmented layout (desktop) */}
                <MotionBox
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    sx={{
                        width: '100%',
                        maxWidth: 900,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2.5, sm: 3.5 },
                        justifyContent: 'center',
                        alignItems: 'stretch'
                    }}
                >
                    {menuTypes.map((type) => (
                        <MotionBox
                            key={type}
                            variants={cardVariants}
                            whileHover={{
                                y: -6,
                                boxShadow: '0 18px 35px rgba(0,0,0,0.45)',
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelectCategory(type)}
                            sx={{
                                flex: 1,
                                minWidth: { xs: '100%', sm: 0 },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: { xs: 1.8, sm: 2.2 },
                                borderRadius: 999,
                                cursor: 'pointer',
                                background: 'rgba(0,0,0,0.35)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                transition: 'all 0.25s ease-out',
                                backdropFilter: 'blur(10px)',
                                overflow: 'hidden'
                            }}
                        >
                            {/* circular thumbnail */}
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    width: { xs: 56, sm: 62 },
                                    height: { xs: 56, sm: 62 },
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '2px solid rgba(255,140,0,0.7)',
                                    boxShadow: '0 0 18px rgba(255,140,0,0.5)',
                                    backgroundImage: `url(${getCategoryImage(type)})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />

                            {/* text block */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: '#FF8C00',
                                        letterSpacing: '0.18em',
                                        fontSize: { xs: '0.65rem', sm: '0.7rem' }
                                    }}
                                >
                                    MENU
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#fff',
                                        fontWeight: 700,
                                        fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                        letterSpacing: '0.04em',
                                        textTransform: 'uppercase',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {type}
                                </Typography>
                                <Typography
                                    sx={{
                                        mt: 0.5,
                                        color: 'rgba(255,255,255,0.7)',
                                        fontSize: { xs: '0.75rem', sm: '0.8rem' }
                                    }}
                                >
                                    Tap to explore our {type.toLowerCase()} dishes.
                                </Typography>
                            </Box>

                            {/* right chevron / indicator */}
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    width: 34,
                                    height: 34,
                                    borderRadius: '50%',
                                    border: '1px solid rgba(255,140,0,0.7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FF8C00',
                                    fontSize: '1rem',
                                    bgcolor: 'rgba(255,140,0,0.08)'
                                }}
                            >
                                ⇢
                            </Box>
                        </MotionBox>
                    ))}
                </MotionBox>
            </Box>
        </Box>
    );
}
