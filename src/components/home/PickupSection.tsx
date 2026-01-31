import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from '../common/ButtonStyles';
import StoreIcon from '@mui/icons-material/Store';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const PickupSection: React.FC = () => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: { xs: '2rem', md: '4rem 2rem' },
                color: '#fff',
                position: 'relative',
                zIndex: 10
            }}
        >
            {/* Overline */}
            <Typography
                variant="overline"
                sx={{
                    color: '#FF8C00',
                    letterSpacing: '0.2em',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    mb: 1,
                    display: 'block'
                }}
            >
                ORDER ONLINE
            </Typography>

            {/* Title */}
            <Typography
                variant="h2"
                sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 400,
                    fontSize: { xs: '2.5rem', md: '5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    color: '#fff',
                    '& span': {
                        color: '#FF8C00',
                    }
                }}
            >
                ORDER FOR<br />
                <span style={{ color: '#FF8C00' }}>PICKUP</span>
            </Typography>

            {/* Description */}
            <Typography
                variant="body1"
                sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    maxWidth: '600px',
                    mb: 5,
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 300
                }}
            >
                Enjoy our authentic Jaffna cuisine at home. Order online and pick up from either of our two convenient locations.
            </Typography>

            {/* Icons Info */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 6 },
                    mb: 6,
                    color: '#FF8C00' // Gold icons
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <StoreIcon fontSize="medium" />
                    <Typography sx={{ color: '#fff', fontFamily: '"Inter", sans-serif', fontWeight: 300 }}>
                        Pickup Only - Two Locations
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AccessTimeIcon fontSize="medium" />
                    <Typography sx={{ color: '#fff', fontFamily: '"Inter", sans-serif', fontWeight: 300 }}>
                        Ready in 20-30 mins
                    </Typography>
                </Box>
            </Box>

            {/* Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 3,
                    width: '100%',
                    justifyContent: 'center'
                }}
            >
                <Button
                    variant="outlined"
                    sx={commonButtonStyle}
                >
                    SCARBOROUGH
                </Button>

                <Button
                    variant="outlined"
                    sx={commonButtonStyle}
                >
                    MARKHAM
                </Button>
            </Box>
        </Box>
    );
};

export default PickupSection;
