import React from 'react'
import { Apps, EmojiEvents, Public, Terrain } from '@mui/icons-material'
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'

const CharacterSection = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const cardStyle = {
        bgcolor: 'rgba(0, 30, 54, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.1)',
        color: '#aaccff',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
            border: '1px solid rgba(0, 255, 255, 0.5)',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
            transform: 'translateY(-5px)'
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" }
        }
    }

    const floatVariants: Variants = {
        float: {
            y: [0, -15, 0],
            rotate: [0, 1, -1, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <Box sx={{ py: 10, position: 'relative' }}>
            <Container maxWidth="lg">
                <Masonry columns={isMobile ? 1 : 2} spacing={4}>

                    {/* Item 1: Hero Text & Brand */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={itemVariants}>
                        <Box sx={{ ...cardStyle, p: 4, height: '100%' }}>
                            <Typography variant="body1" sx={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.8, mb: 4, color: '#aaccff' }}>
                                &ldquo;In the depths of the unknown, we find the true essence of discovery.
                                Immerse yourself in a world where technology meets fluid design.&rdquo;
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 3,
                                bgcolor: 'rgba(0, 255, 255, 0.05)',
                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <motion.div
                                    animate={{ x: [-100, 400] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100px',
                                        height: '100%',
                                        background: 'linear-gradient(to right, transparent, rgba(0,255,255,0.1), transparent)',
                                        transform: 'skewX(-20deg)'
                                    }}
                                />
                                <Apps sx={{ fontSize: '3rem', color: '#00ffff', opacity: 0.8 }} />
                                <Box
                                    sx={{ ml: 2, display: 'flex', flexDirection: 'column' }}
                                    component={motion.div}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Typography variant="overline" sx={{ color: '#D9A756', display: 'block', mb: -0.5, letterSpacing: '0.4em', fontWeight: 300 }}>
                                        DESIGN IDENTITY
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontSize: '2rem', color: '#fff', fontWeight: 100, letterSpacing: '0.15em', fontFamily: '"Outfit", sans-serif' }}>
                                        EXPLORER
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>

                    {/* Item 2: Image 1 - Floating */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={itemVariants}
                    >
                        <motion.div variants={floatVariants} animate="float">
                            <Box sx={{ overflow: 'hidden', ...cardStyle, p: 0, border: 'none' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1580019542155-247062e19ce4?q=80&w=2127&auto=format&fit=crop"
                                    alt="Abstract Liquid"
                                    style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }}
                                />
                            </Box>
                        </motion.div>
                    </motion.div>

                    {/* Item 3: Feature Section */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={itemVariants}>
                        <Box sx={{ ...cardStyle, p: 5, bgcolor: 'rgba(0, 255, 255, 0.05)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <EmojiEvents sx={{ fontSize: '4rem', color: '#00ffff' }} />
                            </Box>
                            <Typography sx={{ lineHeight: 1.8, mb: 3, textAlign: 'center' }}>
                                Award-winning immersive experiences that push the boundaries of web GL.
                                Recognized for excellence in interaction design and visual fluidity.
                            </Typography>
                            <Box sx={{ textAlign: 'center' }}>
                                <Button variant="outlined" sx={{
                                    borderColor: '#00ffff',
                                    color: '#00ffff',
                                    py: 1, px: 4,
                                    borderRadius: 0,
                                    '&:hover': {
                                        borderColor: '#fff',
                                        color: '#001e36',
                                        bgcolor: '#00ffff'
                                    }
                                }}
                                 onClick={() => window.location.href = '/gallery'}
                                >
                                    Explore Events
                                </Button>
                            </Box>
                        </Box>
                    </motion.div>

                    {/* Item 4: Image 2 - Floating Delayed */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={itemVariants}
                    >
                        <motion.div variants={floatVariants} animate="float" transition={{ delay: 1 }}>
                            <Box sx={{ overflow: 'hidden', ...cardStyle, p: 0, border: 'none' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop"
                                    alt="Digital Art"
                                    style={{ width: '100%', display: 'block' }}
                                />
                            </Box>
                        </motion.div>
                    </motion.div>

                    {/* Item 5: Text Block */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={itemVariants}>
                        <Box sx={{ ...cardStyle, p: 5 }}>
                            <Typography variant="overline" sx={{ color: '#D9A756', display: 'block', mb: 1.5, letterSpacing: '0.4em', fontWeight: 300 }}>
                                CORE CONCEPT
                            </Typography>
                            <Box
                                component={motion.div}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Typography variant="h4" sx={{
                                    textTransform: 'uppercase',
                                    fontSize: '2rem',
                                    fontWeight: 100,
                                    mb: 3,
                                    color: '#fff',
                                    letterSpacing: '0.15em',
                                    fontFamily: '"Outfit", sans-serif',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.05), transparent)',
                                        animation: 'shimmer 8s infinite linear',
                                    },
                                }}>
                                    Fluid Dynamics
                                </Typography>
                            </Box>
                            <div style={{ width: '30px', height: '1px', background: 'rgba(0, 255, 255, 0.2)', marginBottom: '2rem' }} />
                            <Typography sx={{ lineHeight: 1.8, mb: 2 }}>
                                Our interfaces mimic the natural flow of water. Seamless transitions and organic
                                movements create an experience that feels alive and responsive to your touch.
                            </Typography>
                            <style>
                                {`
                                @keyframes shimmer {
                                    0% { left: -100%; }
                                    100% { left: 100%; }
                                }
                                `}
                            </style>
                            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                <Public sx={{ color: '#00ffff' }} />
                                <Terrain sx={{ color: '#00ffff' }} />
                            </Box>
                        </Box>
                    </motion.div>

                    {/* Item 6: Image 3 - Floating Delayed More */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={itemVariants}
                    >
                        <motion.div variants={floatVariants} animate="float" transition={{ delay: 2 }}>
                            <Box sx={{ overflow: 'hidden', ...cardStyle, p: 0, border: 'none' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                                    alt="Neon Waves"
                                    style={{ width: '100%', display: 'block' }}
                                />
                            </Box>
                        </motion.div>
                    </motion.div>

                </Masonry>
            </Container>
        </Box>
    )
}

export default CharacterSection
