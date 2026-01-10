
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const CreativeFooter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 5000);
            setEmail('');
        }
    };

    return (
        <Box sx={{
            width: '100%',
            position: 'relative',
            mt: 20,
            pb: 8,
            overflow: 'visible',
            color: '#fff',
            fontFamily: '"Outfit", sans-serif'
        }}>
            {/* Decor Glows */}
            <Box sx={{
                position: 'absolute',
                bottom: '0%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '300px',
                background: 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 4, position: 'relative', zIndex: 1 }}>

                {/* Newsletter Section - Floating Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '40px',
                        border: '1px solid rgba(0, 255, 255, 0.15)',
                        p: { xs: 4, md: 8 },
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Animated Border Reveal */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0, left: 0,
                            width: '200px',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                            animation: 'moveLine 4s infinite linear'
                        }} />

                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <AutoAwesomeIcon sx={{ color: '#D9A756', mr: 2, fontSize: '2rem' }} />
                                <Typography variant="overline" sx={{ color: '#D9A756', letterSpacing: '0.4em' }}>
                                    THE SPICE CIRCLE
                                </Typography>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '3.5rem' }, lineHeight: 1.1 }}>
                                Join Our <span style={{ color: '#00ffff' }}>Secret</span> Kitchen.
                            </Typography>
                            <Typography sx={{ color: '#aaccff', opacity: 0.8, maxWidth: '500px' }}>
                                Receive exclusive invitations to tasting events, secret traditional recipes, and culinary stories that you won't find anywhere else.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1, width: '100%' }}>
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                color: '#fff',
                                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: 0,
                                                px: 4,
                                                py: 2.5,
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                fontSize: '1.1rem',
                                                transition: 'all 0.3s ease',
                                                '&:focus-within': {
                                                    borderColor: '#00ffff',
                                                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)'
                                                }
                                            }
                                        }}
                                    />
                                    <AnimatePresence>
                                        {!subscribed ? (
                                            <motion.div exit={{ opacity: 0, scale: 0.9 }}>
                                                <Button
                                                    type="submit"
                                                    variant="outlined"
                                                    disabled={!email}
                                                    sx={{
                                                        borderColor: 'rgba(0, 255, 255, 0.4)',
                                                        color: '#00ffff',
                                                        borderRadius: 0,
                                                        px: 6,
                                                        py: 2,
                                                        fontWeight: 300,
                                                        textTransform: 'uppercase',
                                                        fontSize: '0.9rem',
                                                        letterSpacing: '0.3em',
                                                        width: '100%',
                                                        transition: 'all 0.4s ease',
                                                        '&:hover': {
                                                            borderColor: '#D9A756',
                                                            bgcolor: '#D9A756',
                                                            color: '#001e36',
                                                            boxShadow: '0 0 30px rgba(217, 167, 86, 0.4)'
                                                        },
                                                        '&.Mui-disabled': {
                                                            borderColor: 'rgba(0, 255, 255, 0.1)',
                                                            color: 'rgba(0, 255, 255, 0.2)'
                                                        }
                                                    }}
                                                >
                                                    Subscribe for Aromas
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                sx={{ textAlign: 'center' }}
                                            >
                                                <Typography sx={{ color: '#00ffff', fontWeight: 600 }}>
                                                    Welcome to the Circle! Check your inbox soon.
                                                </Typography>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </motion.div>

                {/* Footer Bottom */}
                <Box sx={{ mt: 10, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', mb: 1, letterSpacing: '2px' }}>
                            NANTHU'S <span style={{ color: '#00ffff' }}>KITCHEN</span>
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaccff', opacity: 0.6 }}>
                            © 2026 Nanthu's Kitchen. Crafted with passion & spice.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {[InstagramIcon, FacebookIcon, TwitterIcon].map((Icon, i) => (
                            <IconButton
                                key={i}
                                component={motion.button}
                                whileHover={{ y: -5, color: '#D9A756' }}
                                sx={{
                                    color: '#00ffff',
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    '&:hover': { bgcolor: 'rgba(217, 167, 86, 0.1)' }
                                }}
                            >
                                <Icon />
                            </IconButton>
                        ))}
                    </Box>
                </Box>
            </Box>

            <style>{`
                @keyframes moveLine {
                    0% { left: -200px; }
                    100% { left: 100%; }
                }
            `}</style>
        </Box>
    );
};

export default CreativeFooter;
