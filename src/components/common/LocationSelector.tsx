import React from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

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
    if (!open) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 30, 54, 0.75)',
                backdropFilter: 'blur(10px)',
                zIndex: 3000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                animation: 'fadeIn 0.3s ease'
            }}
            onClick={onClose}
        >
            <Box
                sx={{
                    background: 'rgba(0, 30, 54, 0.85)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(0, 255, 255, 0.2)',
                    borderRadius: '32px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    width: '100%',
                    maxWidth: { xs: '500px', md: '900px' },
                    position: 'relative',
                    animation: 'slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    overflow: 'hidden'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: { xs: 15, md: 25 },
                        right: { xs: 15, md: 25 },
                        color: '#00ffff',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        zIndex: 1,
                        '&:hover': {
                            background: 'rgba(0, 255, 255, 0.1)',
                            transform: 'rotate(90deg)',
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    <CloseIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
                </IconButton>

                {/* Header */}
                <Box sx={{ p: { xs: 2.5, md: 4 }, pb: { xs: 2, md: 3 }, background: 'rgba(0, 255, 255, 0.05)', borderBottom: '1px solid rgba(0, 255, 255, 0.1)', textAlign: 'center' }}>
                    <Typography
                        sx={{
                            fontSize: { xs: '1.5rem', md: '2rem' },
                            fontWeight: 700,
                            color: '#00ffff',
                            letterSpacing: '0.1em',
                            mb: 1,
                            fontFamily: "'Courier New', Courier, monospace",
                            textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                            textTransform: 'uppercase'
                        }}
                    >
                        SELECT YOUR LOCATION
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: '0.85rem', md: '1rem' },
                            color: 'rgba(170, 204, 255, 0.85)',
                            fontWeight: 300,
                            fontFamily: "'Courier New', Courier, monospace"
                        }}
                    >
                        Choose your nearest location to place an order
                    </Typography>
                </Box>

                {/* Location Cards - Side by Side on Desktop */}
                <Box sx={{
                    p: { xs: 2.5, md: 4 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: { xs: 2, md: 3 }
                }}>
                    {locations.map((location) => (
                        <Box
                            key={location.name}
                            sx={{
                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                borderRadius: '20px',
                                p: { xs: 2.5, md: 3 },
                                background: 'rgba(0, 255, 255, 0.03)',
                                borderLeft: '4px solid transparent',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    background: 'rgba(0, 255, 255, 0.08)',
                                    transform: 'translateY(-5px)',
                                    borderColor: 'rgba(0, 255, 255, 0.3)',
                                    borderLeftColor: '#D9A756',
                                    boxShadow: '0 10px 30px rgba(0, 255, 255, 0.2)'
                                }
                            }}
                        >
                            {/* Location Name */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOnIcon sx={{ color: '#FFD700', fontSize: { xs: '1.5rem', md: '1.8rem' }, mr: 1.5 }} />
                                <Typography
                                    sx={{
                                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                                        fontWeight: 700,
                                        color: '#fff',
                                        letterSpacing: '0.05em',
                                        fontFamily: "'Courier New', Courier, monospace"
                                    }}
                                >
                                    {location.name}
                                </Typography>
                            </Box>

                            {/* Address */}
                            <Typography
                                sx={{
                                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                                    color: 'rgba(170, 204, 255, 0.85)',
                                    mb: 1.5,
                                    ml: 5,
                                    fontFamily: "'Courier New', Courier, monospace",
                                    lineHeight: 1.5
                                }}
                            >
                                {location.address}
                            </Typography>

                            {/* Phone */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5, ml: 5 }}>
                                <PhoneIcon sx={{ color: 'rgba(0, 255, 255, 0.6)', fontSize: '1rem', mr: 1 }} />
                                <Typography
                                    sx={{
                                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                                        color: 'rgba(170, 204, 255, 0.85)',
                                        fontFamily: "'Courier New', Courier, monospace"
                                    }}
                                >
                                    {location.phone}
                                </Typography>
                            </Box>

                            {/* Order Button */}
                            <Button
                                onClick={() => onSelectLocation(location.name)}
                                sx={{
                                    width: '100%',
                                    background: '#FFD700',
                                    color: '#000',
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    fontWeight: 700,
                                    py: { xs: 1.2, md: 1.5 },
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontFamily: "'Courier New', Courier, monospace",
                                    mt: 'auto',
                                    '&:hover': {
                                        background: '#D9A756',
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 5px 20px rgba(255, 215, 0, 0.4)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Order from {location.name.charAt(0) + location.name.slice(1).toLowerCase()}
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </Box>
    );
};

export default LocationSelector;
