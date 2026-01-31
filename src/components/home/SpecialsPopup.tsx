import React, { useState } from 'react';
import { Box, Typography, IconButton, Modal, Fade, Backdrop } from '@mui/material';
import { Close, RestaurantMenu } from '@mui/icons-material';
import { specialItems } from '../../data/specialItems';
import CardStack from './CardStack';

interface SpecialsPopupProps {
    open: boolean;
    onClose: () => void;
}

const SpecialsPopup: React.FC<SpecialsPopupProps> = ({ open, onClose }) => {
    const [currentItem, setCurrentItem] = useState(specialItems[0]);

    // Keep track of current item for the text description side
    // The CardStack handles the visual cycling

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 30, 54, 0.8)',
                    }
                }
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '800px', md: '1000px' },
                        height: { xs: '80vh', md: '600px' },
                        bgcolor: 'rgba(0, 15, 27, 0.8)',
                        border: '1px solid rgba(255, 140, 0, 0.3)',
                        borderRadius: '20px',
                        boxShadow: '0 0 50px rgba(255, 140, 0, 0.2)',
                        p: 0,
                        outline: 'none',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10, // Move to right of the whole modal or just content? 
                            // Actually if it's top right of modal, it might be on top of text on desktop.
                            // Let's keep it safe.
                            zIndex: 100,
                            color: '#FF8C00',
                            bgcolor: 'rgba(255,140,0,0.1)',
                            '&:hover': { bgcolor: 'rgba(255,140,0,0.2)' }
                        }}
                    >
                        <Close />
                    </IconButton>

                    {/* Card Stack Section */}
                    <Box
                        sx={{
                            flex: 1.2, // Give more space to cards
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 4,
                            perspective: '1000px',
                            minHeight: { xs: '400px', md: 'auto' } // Height for mobile
                        }}
                    >
                        <Box sx={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '500px' }}>
                            <CardStack
                                items={specialItems}
                                onCenterCardChange={setCurrentItem}
                            />
                        </Box>
                    </Box>

                    {/* Content Section */}
                    <Box
                        sx={{
                            flex: 0.8,
                            p: { xs: 3, md: 5 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            background: 'linear-gradient(135deg, rgba(0, 15, 27, 0.95), rgba(0, 5, 10, 0.98))',
                            borderLeft: { md: '1px solid rgba(255, 140, 0, 0.1)' }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                            <RestaurantMenu sx={{ color: '#FF8C00' }} />
                            <Typography
                                variant="overline"
                                sx={{
                                    color: '#FF8C00',
                                    letterSpacing: '3px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                TODAY'S SPECIAL
                            </Typography>
                        </Box>

                        <Typography
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontFamily: "'Playfair Display', serif",
                                mb: 2,
                                textShadow: '0 0 20px rgba(255, 140, 0, 0.3)',
                                fontSize: { xs: '1.8rem', md: '2.5rem' }
                            }}
                        >
                            {currentItem.title}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: '#aaccff',
                                mb: 4,
                                lineHeight: 1.6
                            }}
                        >
                            {currentItem.description}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                            <Box
                                onClick={() => window.location.href = '/special'}
                                sx={{
                                    py: 1.5,
                                    px: 4,
                                    background: 'linear-gradient(90deg, #FF8C00, #F4511E)',
                                    color: '#fff',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem',
                                    boxShadow: '0 10px 25px rgba(255, 140, 0, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 15px 35px rgba(255, 140, 0, 0.4)',
                                        filter: 'brightness(1.1)'
                                    }
                                }}
                            >
                                View All Specials <span style={{ marginLeft: '6px' }}>→</span>
                            </Box>
                        </Box>

                        <Typography variant="caption" sx={{ mt: 3, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                            Swipe cards to explore more
                        </Typography>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default SpecialsPopup;
