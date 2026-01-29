import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, IconButton, DialogContent } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CateringForm from './CateringForm';

// Import local images
import cateringImage from "../../assets/images/bg2.jpg";

const CateringSection: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '1400px',
                margin: '5rem auto 10rem',
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: { xs: '2rem', md: '0' },
            }}
        >
            {/* Header Section (Centered) */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: { xs: 6, md: 10 },
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant="overline"
                    sx={{
                        color: '#FFD700',
                        letterSpacing: '0.6em',
                        fontSize: '0.8rem',
                        display: 'block',
                        mb: 2,
                        fontWeight: 400
                    }}
                >
                    EXPERIENCE THE BEST
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 300,
                        color: '#fff',
                        fontSize: { xs: '1.8rem', md: '3.5rem' },
                        letterSpacing: { xs: '0.3em', md: '0.5em' },
                        textTransform: 'uppercase',
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                        lineHeight: 1.1,
                    }}
                >
                    CATERING
                </Typography>
                <div style={{ width: '40px', height: '1px', background: 'rgba(0, 255, 255, 0.3)', marginTop: '2rem' }} />
            </Box>

            {/* Content Section: Side-by-Side Text & Image */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', md: 'row' }, // Text left, Image right on desktop
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 6, md: 10 },
                    width: '100%',
                    px: { xs: 2, md: 0 }
                }}
            >
                {/* Left Side: Description & Button */}
                <Box sx={{ maxWidth: '500px', textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#ccc',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                            mb: 4,
                            fontWeight: 300,
                        }}
                    >
                        Elevate your next gathering with the distinct flavors of Nanthus.
                        From corporate luncheons to grand weddings, we bring a touch
                        of culinary excellence to every occasion, crafting memories through taste.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => setIsFormOpen(true)}
                        sx={{
                            background: '#D9A756',
                            color: '#000',
                            padding: '1rem 2.5rem',
                            borderRadius: '0',
                            fontSize: '0.9rem',
                            letterSpacing: '0.2em',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            '&:hover': {
                                background: '#fff',
                            }
                        }}
                    >
                        Inquire Now
                    </Button>
                </Box>

                {/* Right Side: Image & Frame */}
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: '100%', md: '500px' }, // Match frame/image width
                        height: { xs: '380px', md: '600px' }, // Match frame/image height
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* The Yellow Offset Border Frame */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px', // Adjusted for relative positioning
                            width: '100%',
                            height: '100%',
                            border: '2px solid #D9A756', // Thinner, elegant border or keep thick? Reference said "frame size". Keeping thick based on prev instructions but user said "frame also seems like the saem as a image frame size"
                            // User previously asked for frame size same as image.
                            // I will keep the 15px solid border but align it perfectly or offset slightly?
                            // "make the yellow frame also seems like the saem as a image frame size"
                            // Let's make it same size but offset.
                            borderWidth: '15px',
                            zIndex: 1,
                            transform: 'translate(20px, 20px)' // Offset
                        }}
                    />

                    {/* Main Image */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${cateringImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                            filter: 'grayscale(20%) contrast(110%)',
                        }}
                    />
                </Box>
            </Box>

            {/* Popup Dialog */}
            <Dialog
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '36px',
                        background: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                    }
                }}
                BackdropProps={{
                    sx: {
                        backdropFilter: 'blur(5px)',
                        backgroundColor: 'transparent',
                    }
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <IconButton
                        onClick={() => setIsFormOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: -10,
                            top: -10,
                            color: 'rgba(255,255,255,0.5)',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 0.3s ease',
                            zIndex: 10,
                            '&:hover': {
                                color: '#00ffff',
                                bgcolor: 'rgba(0,0,0,0.8)',
                                transform: 'rotate(90deg)',
                                borderColor: '#00ffff'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <DialogContent sx={{ p: 0, overflowY: 'auto', '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-track': { background: 'transparent' }, '&::-webkit-scrollbar-thumb': { background: '#00ffff', borderRadius: '4px' } }}>
                        <CateringForm isPopup={true} />
                    </DialogContent>
                </Box>
            </Dialog>
        </Box>
    );
};

export default CateringSection;
