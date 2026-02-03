import React from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBack from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
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

    const navButtonStyle = {
        position: 'absolute' as const,
        top: '40px',
        bgcolor: 'rgba(255, 140, 0, 0.1)',
        border: '2px solid rgba(255, 140, 0, 0.3)',
        color: '#FF8C00',
        width: '50px',
        height: '50px',
        backdropFilter: 'blur(10px)',
        zIndex: 20,
        '&:hover': {
            bgcolor: 'rgba(255, 140, 0, 0.2)',
            transform: 'scale(1.1)',
            boxShadow: '0 0 30px rgba(255, 140, 0, 0.6)',
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { stiffness: 100, damping: 15 }
        }
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: '#001e36', overflow: 'hidden' }}>

            {/* Background Texture - simple gradient or noise could go here, keeping it clean dark navy as requested */}
            <Box sx={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(20, 50, 80, 0.5) 0%, #001e36 80%)'
            }} />

            {/* Navigation Buttons */}
            <IconButton onClick={onBack} sx={{ ...navButtonStyle, left: '40px' }}>
                <ArrowBack />
            </IconButton>
            <IconButton onClick={onHome} sx={{ ...navButtonStyle, right: '40px' }}>
                <HomeIcon />
            </IconButton>

            {/* Main Content */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4
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
                        mb: { xs: 4, md: 8 },
                        textShadow: '0 0 30px rgba(255,140,0,0.3)',
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        textAlign: 'center',
                        letterSpacing: '0.05em'
                    }}
                >
                    SELECT MENU
                </MotionTypography>

                {/* Cards Container */}
                <MotionBox
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    sx={{
                        display: 'flex',
                        gap: { xs: 3, md: 6 },
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        perspective: '1000px'
                    }}
                >
                    {menuTypes.map((type) => (
                        <MotionBox
                            key={type}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.05,
                                rotateY: 5,
                                zIndex: 10
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelectCategory(type)}
                            sx={{
                                position: 'relative',
                                width: { xs: '280px', md: '320px' },
                                height: { xs: '160px', md: '450px' }, // Tall cards on desktop, shorter on mobile
                                borderRadius: '20px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                transition: 'box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 30px 60px rgba(255,140,0,0.2), 0 0 20px rgba(255,140,0,0.2)',
                                    borderColor: 'rgba(255,140,0,0.5)'
                                }
                            }}
                        >
                            {/* Card Image */}
                            <Box
                                sx={{
                                    position: 'absolute', inset: 0,
                                    backgroundImage: `url(${getCategoryImage(type)})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    transition: 'transform 0.5s ease',
                                    transform: 'scale(1.0)',
                                    '.MuiBox-root:hover &': { // Select parent hover using MUI class strategy or direct descendant
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            />

                            {/* Gradient Overlay */}
                            <Box sx={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to top, rgba(0,30,54,1) 0%, rgba(0,30,54,0.6) 30%, rgba(0,30,54,0.3) 60%, transparent 100%)'
                            }} />

                            {/* Dynamic Accent Border (Bottom) */}
                            <Box sx={{
                                position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px',
                                background: 'linear-gradient(90deg, transparent, #FF8C00, transparent)',
                                opacity: 0.8
                            }} />

                            {/* Text Content */}
                            <Box sx={{
                                position: 'absolute', bottom: 0, left: 0, width: '100%',
                                p: { xs: 3, md: 5 },
                                display: 'flex', flexDirection: 'column', alignItems: 'center'
                            }}>
                                <Typography variant="overline" sx={{
                                    color: '#FF8C00', fontWeight: 700, letterSpacing: '0.2em', mb: 1,
                                    opacity: 0.9
                                }}>
                                    EXPLORE
                                </Typography>
                                <Typography variant="h3" sx={{
                                    color: '#fff',
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 800,
                                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {type}
                                </Typography>

                                {/* Decorative Line */}
                                <Box
                                    component={motion.div}
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '40px' }}
                                    sx={{ height: '2px', bgcolor: '#FF8C00', mt: 2 }}
                                />
                            </Box>
                        </MotionBox>
                    ))}
                </MotionBox>
            </Box>
        </Box>
    );
}
