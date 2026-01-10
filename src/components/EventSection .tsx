import { Apps, EmojiEvents, Public, Terrain } from '@mui/icons-material'
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'

const CharacterSection = () => {
    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.down('sm'))
    const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isLg = useMediaQuery(theme.breakpoints.up('lg'))

    const cardStyle = {
        bgcolor: 'rgba(0, 30, 54, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.1)',
        color: '#aaccff',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        overflow: 'hidden', // Contain effects
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

    const columns = isSm ? 1 : isMd ? 2 : 3
    const spacing = isSm ? 2 : 4

    return (
        <Box sx={{ py: { xs: 6, md: 10 }, position: 'relative', overflowX: 'hidden' }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
                <Masonry columns={columns} spacing={spacing} sx={{ m: 0 }}>

                    {/* Item 1: Hero Text & Brand */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={itemVariants}>
                        <Box sx={{ ...cardStyle, p: { xs: 2, md: 4 }, height: '100%' }}>
                            <Typography variant="body1" sx={{ fontSize: { xs: '0.95rem', md: '1.1rem' }, fontStyle: 'italic', lineHeight: 1.8, mb: 4, color: '#aaccff' }}>
                                &ldquo;In every spice, we find a story of tradition.
                                Join us on a journey where heritage meets the art of fine dining.&rdquo;
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
                                <Apps sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, color: '#00ffff', opacity: 0.8 }} />
                                <Box
                                    sx={{ ml: { xs: 1.5, md: 2 }, display: 'flex', flexDirection: 'column' }}
                                    component={motion.div}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Typography variant="overline" sx={{ color: '#D9A756', display: 'block', mb: -0.5, letterSpacing: { xs: '0.15em', md: '0.35em' }, fontWeight: 300, fontSize: { xs: '0.6rem', md: '0.85rem' } }}>
                                        CULINARY ETHOS
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, color: '#fff', fontWeight: 100, letterSpacing: '0.12em', fontFamily: '"Outfit", sans-serif' }}>
                                        SPICE MASTER
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
                                    src="https://images.unsplash.com/photo-1596797038558-b6118b76c886?q=80&w=2127&auto=format&fit=crop"
                                    alt="Spices"
                                    style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease', height: 'auto', objectFit: 'contain' }}
                                />
                            </Box>
                        </motion.div>
                    </motion.div>

                    {/* Item 3: Feature Section */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={itemVariants}>
                        <Box sx={{ ...cardStyle, p: { xs: 3, md: 5 }, bgcolor: 'rgba(0, 255, 255, 0.05)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <EmojiEvents sx={{ fontSize: { xs: '2.8rem', md: '4rem' }, color: '#00ffff' }} />
                            </Box>
                            <Typography sx={{ lineHeight: 1.8, mb: 3, textAlign: 'center' }}>
                                Award-winning menus that blend traditional recipes with modern flair.
                                Recognized for excellence in flavor profile and culinary presentation.
                            </Typography>
                            <Box sx={{ textAlign: 'center' }}>
                                <Button variant="outlined" sx={{
                                    mt: { xs: 3, md: 6 },
                                    borderColor: 'rgba(0, 255, 255, 0.3)',
                                    color: '#00ffff',
                                    borderRadius: 0,
                                    px: { xs: 3, md: 6 },
                                    py: { xs: 1, md: 1.5 },
                                    fontSize: { xs: '0.75rem', md: '0.8rem' },
                                    letterSpacing: '0.35em',
                                    fontWeight: 300,
                                    transition: 'all 0.4s ease',
                                    '&:hover': {
                                        borderColor: '#D9A756',
                                        color: '#001e36',
                                        bgcolor: '#D9A756',
                                        boxShadow: '0 0 30px rgba(217, 167, 86, 0.4)'
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
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop"
                                    alt="Plated Dish"
                                    style={{ width: '100%', display: 'block', height: 'auto', objectFit: 'contain' }}
                                />
                            </Box>
                        </motion.div>
                    </motion.div>

                    {/* Item 5: Text Block */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={itemVariants}>
                        <Box sx={{ ...cardStyle, p: { xs: 3, md: 5 } }}>
                            <Typography variant="overline" sx={{ color: '#D9A756', display: 'block', mb: 1.5, letterSpacing: { xs: '0.2em', md: '0.4em' }, fontWeight: 300 }}>
                                AROMATIC ARTISTRY
                            </Typography>
                            <Box
                                component={motion.div}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Typography variant="h4" sx={{
                                    textTransform: 'uppercase',
                                    fontSize: { xs: '1.4rem', md: '2rem' },
                                    fontWeight: 100,
                                    mb: 3,
                                    color: '#fff',
                                    letterSpacing: '0.12em',
                                    fontFamily: '"Outfit", sans-serif',
                                    position: 'relative',
                                    overflow: 'hidden', // Contain shimmer effect
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
                                    Spice Alchemy
                                </Typography>
                            </Box>
                            <div style={{ width: '30px', height: '1px', background: 'rgba(0, 255, 255, 0.2)', marginBottom: '2rem' }} />
                            <Typography sx={{ lineHeight: 1.8, mb: 2 }}>
                                Our kitchen works like a symphony of spices. Carefully balanced
                                flavors and fresh ingredients create a dining experience that
                                resonates with every bite.
                            </Typography>
                            <style>
                                {`
                                @keyframes shimmer {
                                    0% { left: -100%; }
                                    100% { left: 100%; }
                                }
                                `}
                            </style>
                            <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Public sx={{ color: '#00ffff', fontSize: { xs: '1.6rem', md: '2rem' } }} />
                                <Terrain sx={{ color: '#00ffff', fontSize: { xs: '1.6rem', md: '2rem' } }} />
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
                                    src="https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=2070&auto=format&fit=crop"
                                    alt="Fresh Ingredients"
                                    style={{ width: '100%', display: 'block', height: 'auto', objectFit: 'contain' }}
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
