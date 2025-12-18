import React, { useRef, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { motion } from 'framer-motion'
import CelebrationIcon from '@mui/icons-material/Celebration'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

const services = [
    {
        id: 1,
        title: 'Exquisite Weddings',
        description: 'Make your special day truly magical with our tailored menus and underwater-themed presentation.',
        icon: <CelebrationIcon sx={{ fontSize: 40, color: '#00ffff' }} />,
    },
    {
        id: 2,
        title: 'Corporate Galas',
        description: 'Impress clients and partners with a sophisticated dining experience that dives deep into excellence.',
        icon: <BusinessCenterIcon sx={{ fontSize: 40, color: '#00ffff' }} />,
    },
    {
        id: 3,
        title: 'Private Banquets',
        description: 'From intimate gatherings to grand feasts, we curate every detail for an unforgettable voyage.',
        icon: <RestaurantMenuIcon sx={{ fontSize: 40, color: '#00ffff' }} />,
    }
]

const SpotlightCard = ({ title, description, icon, index }: { title: string, description: string, icon: React.ReactNode, index: number }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{ height: '100%' }}
        >
            <div
                ref={divRef}
                onMouseMove={handleMouseMove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    padding: '2rem',
                    boxSizing: 'border-box',
                    display: 'flex', // Make it flex container
                    flexDirection: 'column', // Stack children vertically
                }}
            >
                <div
                    style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -1, // Adjust slightly to cover border
                        left: -1,
                        right: -1,
                        bottom: -1,
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 255, 255, 0.15), transparent 40%)`,
                        transition: 'opacity 0.2s',
                        borderRadius: '16px', // Match parent radius
                        zIndex: 0, // Behind content
                    }}
                />

                {/* Border Spotlight */}
                <div
                    style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 255, 255, 0.4), transparent 40%)`,
                        padding: '1px', // The border width
                        borderRadius: '16px',
                        zIndex: 1,
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                    }}
                />

                <Box sx={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        background: 'rgba(0, 30, 54, 0.5)',
                        border: '1px solid rgba(0, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3
                    }}>
                        {icon}
                    </Box>

                    <Typography variant="h5" sx={{
                        color: '#fff',
                        mb: 2,
                        fontWeight: 600,
                        letterSpacing: '-0.01em'
                    }}>
                        {title}
                    </Typography>

                    <Typography variant="body2" sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 4,
                        lineHeight: 1.6,
                        flex: 1 // Push button to bottom
                    }}>
                        {description}
                    </Typography>

                    <Button variant="text" sx={{
                        color: '#00ffff',
                        padding: 0,
                        minWidth: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.85rem',
                        alignSelf: 'flex-start',
                        '&:hover': {
                            background: 'transparent',
                            color: '#fff',
                            textShadow: '0 0 8px rgba(0, 255, 255, 0.8)'
                        }
                    }}>
                        Learn More →
                    </Button>
                </Box>
            </div>
        </motion.div>
    );
};

const CateringSection = () => {
    return (
        <Box sx={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, -8, 0] }} // Floating flair
                transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.8 },
                    default: { duration: 0.8 }
                }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <Typography variant="overline" sx={{ color: '#D9A756', letterSpacing: '0.6em', mb: 3, display: 'block', fontWeight: 300, fontSize: '0.9rem' }}>
                    EXCLUSIVE EVENTS
                </Typography>
                <Typography variant="h2" sx={{
                    fontWeight: 100,
                    mb: 4,
                    color: '#fff',
                    letterSpacing: '0.2em',
                    fontSize: { xs: '2.5rem', md: '5rem' },
                    textShadow: '0 0 40px rgba(0, 255, 255, 0.2)',
                    fontFamily: '"Outfit", sans-serif',
                    textTransform: 'uppercase'
                }}>
                    ABYSSAL CATERING
                </Typography>
                <div style={{ width: '60px', height: '1px', background: 'rgba(0, 255, 255, 0.4)', margin: '0 auto 3rem auto' }} />
                <Typography variant="body1" sx={{
                    color: '#aaccff',
                    maxWidth: '650px',
                    mx: 'auto',
                    fontSize: '1.2rem',
                    fontWeight: 300,
                    lineHeight: 2,
                    opacity: 0.7,
                    letterSpacing: '0.02em',
                    mb: 4
                }}>
                    Elevate your special occasions with culinary artistry inspired by the depths
                    of the ocean and the pinnacle of modern design.
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => window.location.href = '/catering'}
                    sx={{
                        borderColor: 'rgba(0, 255, 255, 0.3)',
                        color: '#00ffff',
                        borderRadius: 0,
                        px: 4,
                        py: 1.2,
                        fontSize: '0.75rem',
                        letterSpacing: '0.3em',
                        fontWeight: 400,
                        transition: 'all 0.4s ease',
                        '&:hover': {
                            borderColor: '#D9A756',
                            color: '#001e36',
                            bgcolor: '#D9A756',
                            boxShadow: '0 0 20px rgba(217, 167, 86, 0.3)'
                        }
                    }}
                >
                    BOOK AN EVENT
                </Button>
            </motion.div>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',       // 1 column on mobile
                    md: 'repeat(3, 1fr)' // 3 columns on tablet/desktop
                },
                gap: 3,
                width: '100%'
            }}>
                {services.map((service, index) => (
                    <SpotlightCard
                        key={service.id}
                        index={index}
                        title={service.title}
                        description={service.description}
                        icon={service.icon}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default CateringSection
