import React, { useRef, useState } from 'react'
import { Box, Typography, Button, Dialog, IconButton, DialogContent } from '@mui/material'
import { motion } from 'framer-motion'
import CelebrationIcon from '@mui/icons-material/Celebration'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import CloseIcon from '@mui/icons-material/Close'
import CateringForm from './CateringForm'

const services = [
    {
        id: 1,
        title: 'Bespoke Weddings',
        description: 'Make your special day truly magical with our tailored menus and elegant culinary presentation.',
        icon: <CelebrationIcon sx={{ fontSize: 40, color: '#00ffff' }} />,
    },
    {
        id: 2,
        title: 'Corporate Galas',
        description: 'Impress clients and partners with a sophisticated dining experience that speaks of excellence.',
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
            <Box
                ref={divRef}
                onMouseMove={handleMouseMove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    p: { xs: 2.5, sm: 4 }, // Responsive padding
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
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

                </Box>
            </Box>
        </motion.div>
    );
};

const CateringSection = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

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
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, -8, 0] }} // Floating flair
                transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.8 },
                    default: { duration: 0.8 }
                }}
                viewport={{ once: true }}
                sx={{ textAlign: 'center', marginBottom: { xs: '3rem', md: '5rem' }, width: '100%' }}
            >
                <Typography variant="overline" sx={{
                    color: '#D9A756',
                    letterSpacing: { xs: '0.2em', sm: '0.6em' },
                    mb: 3,
                    display: 'block',
                    fontWeight: 300,
                    fontSize: { xs: '0.65rem', sm: '0.9rem' }
                }}>
                    EXCLUSIVE EVENTS
                </Typography>
                <Typography variant="h2" sx={{
                    fontWeight: 100,
                    mb: 4,
                    color: '#fff',
                    letterSpacing: { xs: '0.05em', sm: '0.2em' },
                    fontSize: { xs: '1.5rem', sm: '3rem', md: '5rem' },
                    textShadow: '0 0 40px rgba(0, 255, 255, 0.2)',
                    fontFamily: '"Outfit", sans-serif',
                    textTransform: 'uppercase'
                }}>
                    NEW NANTHU'S CATERING
                </Typography>
                <div style={{ width: '60px', height: '1px', background: 'rgba(0, 255, 255, 0.4)', margin: '0 auto 3rem auto' }} />
                <Typography variant="body1" sx={{
                    color: '#aaccff',
                    maxWidth: '650px',
                    mx: 'auto',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    fontWeight: 300,
                    lineHeight: { xs: 1.6, sm: 2 },
                    opacity: 0.7,
                    letterSpacing: '0.02em',
                    mb: 4
                }}>
                    Elevate your special occasions with culinary artistry inspired by
                    centuries of tradition and the pinnacle of modern design.
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => setIsFormOpen(true)}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        borderColor: 'rgba(0, 255, 255, 0.4)',
                        color: '#00ffff',
                        borderRadius: 0,
                        px: { xs: 5, sm: 8 },
                        py: 2,
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.8rem', md: '1rem' },
                        letterSpacing: { xs: '0.2em', md: '0.3em' },
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: 'rgba(0, 30, 54, 0.6)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                            borderColor: '#D9A756',
                            bgcolor: '#D9A756',
                            color: '#001e36',
                            boxShadow: '0 0 30px rgba(217, 167, 86, 0.4)',
                        },
                    }}
                >
                    INQUIRE NOW
                </Button>

                <Dialog
                    open={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '24px',
                            background: 'transparent',
                            boxShadow: 'none',
                            maxHeight: '90vh',
                            m: 2
                        }
                    }}
                    BackdropProps={{
                        sx: {
                            backdropFilter: 'blur(5px)',
                            backgroundColor: 'transparent'
                        }
                    }}
                >
                    <DialogContent sx={{
                        p: 0,
                        overflow: 'hidden',
                        position: 'relative',
                        background: 'transparent'
                    }}>
                        <IconButton
                            onClick={() => setIsFormOpen(false)}
                            sx={{
                                position: 'absolute',
                                right: 20,
                                top: 20,
                                color: 'rgba(255, 255, 255, 0.5)',
                                zIndex: 10,
                                '&:hover': {
                                    color: '#fff',
                                    background: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Box sx={{
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(255, 255, 255, 0.05)',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 255, 255, 0.2)',
                                borderRadius: '4px',
                            }
                        }}>
                            <CateringForm isPopup={true} />
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>

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
