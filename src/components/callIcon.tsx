import React from 'react';
import { Box, Tooltip, Zoom } from '@mui/material';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';

const CallIcon = () => {
    return (
        <Tooltip
            title="Call Us"
            placement="left"
            TransitionComponent={Zoom}
            arrow
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        '& .MuiTooltip-arrow': {
                            color: 'rgba(0, 0, 0, 0.8)',
                        },
                        fontSize: '14px',
                        padding: '5px 15px',
                        borderRadius: '20px',
                    }
                }
            }}
        >
            <Box
                component="a"
                href="tel:+1234567890" // Replace with actual number if known, or keep generic
                sx={{
                    position: 'fixed',
                    bottom: { xs: '100px', md: '30px' },
                    right: { xs: '20px', md: '30px' },
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#D9A756',
                    zIndex: 1000,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        background: '#D9A756',
                        color: '#fff',
                        boxShadow: '0 0 20px rgba(217, 167, 86, 0.6)',
                    }
                }}
            >
                <PhoneRoundedIcon sx={{ fontSize: '30px' }} />
            </Box>
        </Tooltip>
    );
};

export default CallIcon;
