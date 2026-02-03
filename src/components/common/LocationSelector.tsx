import React from 'react';
import { Box, IconButton, Typography, Modal, Fade, Backdrop } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Import local images
import restaurantImg from "../../assets/images/restaurent.jpg";

interface Location {
    name: string;
    address: string;
    phone: string;
}

interface LocationSelectorProps {
    open: boolean;
    onClose: () => void;
    onSelectLocation: (locationName: string) => void;
}

const locations: Location[] = [
    {
        name: 'SCARBOROUGH',
        address: '80 Nashdene Rd, Scarborough, ON',
        phone: '(416) 299 1999'
    },
    {
        name: 'MARKHAM',
        address: '72-30 Karachi Dr, Markham, ON',
        phone: '(289) 554 5999'
    }
];

const LocationSelector: React.FC<LocationSelectorProps> = ({ open, onClose, onSelectLocation }) => {
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
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
                        width: { xs: '95%', sm: '800px', md: '1000px' },
                        maxWidth: '1000px',
                        height: { xs: 'auto', md: '600px' },
                        maxHeight: { xs: '90vh', md: '600px' },
                        bgcolor: 'rgba(0, 0, 0, 0.9)',
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
                            top: 15,
                            right: 15,
                            zIndex: 100,
                            color: '#FF8C00',
                            bgcolor: 'rgba(255,140,0,0.1)',
                            '&:hover': {
                                bgcolor: 'rgba(255,140,0,0.2)',
                                transform: 'rotate(90deg)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Left Column: Visual/Branding */}
                    <Box
                        sx={{
                            flex: 1,
                            p: { xs: 4, md: 6 },
                            position: 'relative',
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            overflow: 'hidden',
                            minHeight: { xs: '200px', md: 'auto' }
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url("${restaurantImg}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                zIndex: 0,
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8))',
                                }
                            }}
                        />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'relative', zIndex: 1 }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                                <RestaurantIcon sx={{ color: '#FF8C00', fontSize: '2rem' }} />
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: '#FF8C00',
                                        letterSpacing: '4px',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ORDER ONLINE
                                </Typography>
                            </Box>

                            <Typography
                                variant="h3"
                                sx={{
                                    color: '#fff',
                                    fontFamily: "'Playfair Display', serif",
                                    mb: 3,
                                    textShadow: '0 0 20px rgba(255, 140, 0, 0.3)',
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    fontWeight: 700,
                                    lineHeight: 1.1
                                }}
                            >
                                Freshly <br />
                                <span style={{ color: '#FF8C00' }}>Prepared</span> <br />
                                For You
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 1.6,
                                    fontSize: '1rem',
                                    maxWidth: '300px',
                                    fontWeight: 300,
                                    opacity: 0.9
                                }}
                            >
                                Choose your nearest branch and explore our authentic flavors today.
                            </Typography>
                        </motion.div>
                    </Box>

                    {/* Right Column: Selection Cards */}
                    <Box
                        sx={{
                            flex: 1.2,
                            p: { xs: 3, md: 5 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(20px)',
                            borderLeft: { md: '1px solid rgba(255, 140, 0, 0.1)' }
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fff',
                                fontFamily: "'Playfair Display', serif",
                                mb: 4,
                                textAlign: 'center',
                                letterSpacing: '1px'
                            }}
                        >
                            Select Your Location
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {locations.map((location, index) => (
                                <motion.div
                                    key={location.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Box
                                        sx={{
                                            p: 3,
                                            borderRadius: '16px',
                                            background: 'rgba(255, 140, 0, 0.03)',
                                            border: '1px solid rgba(255, 140, 0, 0.1)',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                background: 'rgba(255, 140, 0, 0.08)',
                                                borderColor: 'rgba(255, 140, 0, 0.4)',
                                                transform: 'translateY(-3px)',
                                                boxShadow: '0 10px 30px rgba(255, 140, 0, 0.1)'
                                            }
                                        }}
                                        onClick={() => onSelectLocation(location.name)}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                                            <Box sx={{
                                                p: 1.5,
                                                borderRadius: '12px',
                                                bgcolor: 'rgba(255, 140, 0, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <LocationOnIcon sx={{ color: '#FF8C00' }} />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ color: '#fff', fontWeight: 'bold', letterSpacing: '1px' }}>
                                                    {location.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                                    {location.address}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1, ml: 1 }}>
                                            <PhoneIcon sx={{ color: 'rgba(255, 140, 0, 0.6)', fontSize: '0.9rem' }} />
                                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                                {location.phone}
                                            </Typography>
                                        </Box>

                                        <Box
                                            component="button"
                                            sx={{
                                                width: '100%',
                                                py: 1.5,
                                                background: 'linear-gradient(90deg, #FF8C00, #F4511E)',
                                                border: 'none',
                                                borderRadius: '50px',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: '0.85rem',
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase',
                                                cursor: 'pointer',
                                                boxShadow: '0 5px 15px rgba(255, 140, 0, 0.2)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    filter: 'brightness(1.1)',
                                                    boxShadow: '0 8px 20px rgba(255, 140, 0, 0.3)'
                                                }
                                            }}
                                        >
                                            Order Now <span style={{ marginLeft: '4px' }}>→</span>
                                        </Box>
                                    </Box>
                                </motion.div>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default LocationSelector;
