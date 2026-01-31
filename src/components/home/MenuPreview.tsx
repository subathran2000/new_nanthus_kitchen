import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { commonButtonStyle } from '../common/ButtonStyles';
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
                gap: { xs: '1.5rem', md: '2rem' },
                padding: { xs: '4rem 1rem', md: '0rem 2rem' },
                position: 'relative',

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
                        color: '#FF8C00',
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
                        fontFamily: "'Inter', sans-serif",
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
                        background: 'linear-gradient(90deg, #FF8C00, transparent)',
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
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 4, md: 8 },
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
                        width: isMobile ? '100%' : '500px',
                    }}
                >
                    <Box
                        sx={{
                            background: 'transparent',
                            backdropFilter: 'none',
                            padding: { xs: '1rem', md: '2rem' },
                            borderRadius: '0',
                            border: 'none',
                            boxShadow: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            textAlign: { xs: 'center', md: 'left' },
                            alignItems: { xs: 'center', md: 'flex-start' },
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#FF8C00',
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
                                    color: '#FF8C00',
                                    mx: 1,
                                    textShadow: '0 0 20px rgba(255, 140, 0, 0.4)',
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
                            sx={commonButtonStyle}
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
