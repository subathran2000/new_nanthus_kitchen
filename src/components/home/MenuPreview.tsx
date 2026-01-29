import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Import local images
import mainImage from "../../assets/images/restaurent.jpg";

const MenuPreview: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: '3rem', md: '5rem' },
                padding: { xs: '2rem 1rem', md: '4rem 2rem' },
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                    opacity: 0.03,
                    pointerEvents: 'none',
                    zIndex: 0,
                }
            }}
        >
            {/* Heading Above All */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center' }}
            >
                <Typography
                    variant="overline"
                    sx={{
                        color: '#FFD700',
                        letterSpacing: '0.6em',
                        mb: 2,
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: 400
                    }}
                >
                    KITCHEN MAGIC
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 300,
                        textTransform: 'uppercase',
                        letterSpacing: { xs: '0.3em', md: '0.5em' },
                        color: '#fff',
                        fontSize: { xs: '1.8rem', md: '3.5rem' },
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                    }}
                >
                    OUR MENU
                </Typography>
                <Box
                    sx={{
                        width: '60px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #FFD700, transparent)',
                        margin: '1.5rem auto 0',
                        borderRadius: '2px'
                    }}
                />
            </motion.div>

            {/* Main Content Area: Image + Overlapping Card */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Large Main Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{
                        y: [0, -10, 0],
                        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    style={{ width: '100%', zIndex: 1 }}
                >
                    <Box
                        sx={{
                            width: isMobile ? '100%' : '85%',
                            height: { xs: '300px', sm: '450px', md: '550px' },
                            background: `url(${mainImage}) center/cover no-repeat`,
                            borderRadius: { xs: '24px', md: '40px' },
                            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Subtle overlay gradient */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(135deg, rgba(0, 30, 54, 0.2), transparent)',
                            }}
                        />
                    </Box>
                </motion.div>

                {/* Overlapping Dark Card */}
                <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    style={{
                        zIndex: 2,
                        width: isMobile ? '92%' : '500px',
                        marginTop: isMobile ? '-80px' : 0,
                        position: isMobile ? 'relative' : 'absolute',
                        bottom: isMobile ? 'auto' : '-100px',
                        right: isMobile ? 'auto' : '-80px',
                    }}
                >
                    <Box
                        sx={{
                            background: 'rgba(12, 12, 12, 0.95)',
                            backdropFilter: 'blur(20px)',
                            padding: { xs: '2.5rem', md: '4rem' },
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#D9A756',
                                letterSpacing: '0.4em',
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}
                        >
                            CONCEPT
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 800,
                                fontSize: { xs: '1.8rem', md: '2.8rem' },
                                color: '#fff',
                                textShadow: '0 5px 15px rgba(0,0,0,0.5)',
                                '& span': {
                                    color: '#00ffff',
                                    mx: 1,
                                    textShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
                                }
                            }}
                        >
                            DESIGN <span>&</span> TASTE
                        </Typography>

                        <Box sx={{ width: '40px', height: '1px', background: 'rgba(255, 255, 255, 0.2)', my: 1 }} />

                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                maxWidth: '380px',
                                mb: 2,
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 300,
                            }}
                        >
                            Experience the perfect fusion of culinary artistry and modern design.
                            Our menu is a curated collection of flavors, textures, and visual
                            delights crafted to elevate your dining journey.
                        </Typography>

                        <Button
                            variant="outlined"
                            onClick={() => window.location.href = '/menu-new'}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                alignSelf: 'flex-start',
                                borderColor: 'rgba(0, 255, 255, 0.5)',
                                color: '#00ffff',
                                padding: '0.8rem 2rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                letterSpacing: '0.2em',
                                fontWeight: 600,
                                mt: 1,
                                textTransform: 'uppercase',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: '#00ffff',
                                    background: 'rgba(0, 255, 255, 0.05)',
                                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                                    paddingRight: '2.5rem'
                                }
                            }}
                        >
                            EXPLORE MENU
                        </Button>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
};

export default MenuPreview;
