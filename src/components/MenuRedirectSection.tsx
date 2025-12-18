import React from 'react'
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const MenuRedirectSection = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box sx={{
            position: 'relative',
            width: '100vw',
            maxWidth: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            minHeight: isMobile ? 'auto' : '80vh', // Reduced from 100vh to fit better
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: isMobile ? 10 : 5 // Added some padding instead of hard 100vh
        }}>
            {/* Background is explicitly transparent as requested to show underlying 3D scene */}

            <Box sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                p: 2,
                flexDirection: isMobile ? 'column' : 'row'
            }}>
                {/* Large Background Graphic/Image (Left/Center) */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    sx={{
                        position: isMobile ? 'relative' : 'absolute',
                        left: isMobile ? 'auto' : '5%',
                        width: isMobile ? '100%' : '55%',
                        height: isMobile ? '300px' : '70vh',
                        zIndex: 1,
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                        alt="Culinary Art"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Overlay gradient for text readability if needed, or aesthetic */}
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)'
                    }} />
                </Box>

                {/* Smaller Accent Image (Top Center/Right) */}
                {
                    !isMobile && (
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            sx={{
                                    position: 'absolute',
                                    right: '20%',
                                    top: '-1100%',
                                    width: '25%',
                                    height: '40vh',
                                    zIndex: 3,
                                    borderRadius: '8px', // slightly rounded for nicer overlay
                                    overflow: 'hidden',
                                    boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                                    border: '1px solid rgba(0, 255, 255, 0.3)'
                                }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9f4?q=80&w=1999&auto=format&fit=crop"
                                alt="Chef Detail"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </Box>
                    )
                }

                {/* Content Box (Bottom Right Overlap) */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: 50, y: 50 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                    sx={{
                        position: isMobile ? 'relative' : 'absolute',
                        right: isMobile ? 'auto' : '5%',
                        top: isMobile ? 'auto' : '10%', // Switched from bottom to top to guarantee top visibility
                        width: isMobile ? '90%' : '38%',
                        mt: isMobile ? -5 : 0,
                        bgcolor: 'rgba(15, 15, 15, 0.95)', // Nearly opaque for elegance
                        backdropFilter: 'blur(30px)',
                        p: isMobile ? 4 : 8,
                        pt: isMobile ? 7 : 12, // Significant top padding for floating text
                        zIndex: 3,
                        borderRadius: '4px',
                        border: '1px solid rgba(0, 255, 255, 0.2)',
                        boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.8)'
                    }}
                >
                    {/* Decorative Glow */}
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '80%',
                        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        zIndex: -1
                    }} />

                    <Typography variant="overline" sx={{
                        color: '#D9A756', // Gold
                        letterSpacing: '0.5em', // Extreme tracking
                        fontWeight: 300,
                        mb: 3,
                        display: 'block',
                        fontSize: '0.85rem',
                        opacity: 0.9
                    }}>
                        CONCEPT
                    </Typography>

                    <Box
                        component={motion.div}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Typography variant="h3" sx={{
                            fontWeight: 100, // Ultra thin 
                            mb: 4,
                            color: '#fff',
                            fontFamily: '"Outfit", sans-serif',
                            lineHeight: 1,
                            letterSpacing: '0.15em',
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            textTransform: 'uppercase',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)',
                                animation: 'shimmer 5s infinite linear',
                            },
                        }}>
                            Design <span style={{ color: '#00ffff', fontWeight: 300 }}>&</span> Taste
                        </Typography>
                    </Box>
                    <style>
                        {`
                            @keyframes shimmer {
                                0% { left: -100%; }
                                100% { left: 100%; }
                            }
                        `}
                    </style>
                    <div style={{ width: '50px', height: '1px', background: 'rgba(0, 255, 255, 0.4)', marginBottom: '3rem' }} />

                    <Typography variant="body1" sx={{
                        color: '#aaccff', // Light Blue/Cyan tint
                        mb: 5,
                        lineHeight: 2,
                        fontWeight: 300,
                        fontSize: '1.05rem',
                        opacity: 0.8
                    }}>
                        Experience the perfect fusion of culinary artistry and modern design.
                        Our menu is a curated collection of flavors, textures, and visual delights
                        crafted to elevate your dining journey.
                    </Typography>

                    <Button
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            borderColor: '#00ffff',
                            color: '#00ffff',
                            borderRadius: '0', // Sharp corners for elegance
                            px: 5,
                            py: 1.8,
                            fontWeight: 400,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            fontSize: '0.85rem',
                            position: 'relative',
                            zIndex: 10, // Ensure it's on top of all visual overlays
                            overflow: 'hidden',
                            '&:hover': {
                                bgcolor: '#D9A756', // Yellow Hover
                                color: '#001E36',
                                borderColor: '#D9A756',
                                boxShadow: '0 0 30px rgba(217, 167, 86, 0.4)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onClick={() => window.location.href = '/menu'}
                    >
                        Explore Menu
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default MenuRedirectSection
