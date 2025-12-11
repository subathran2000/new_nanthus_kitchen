import React from 'react';
import { Box, Stack, Tooltip, Zoom } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Social = () => {
    const socialLinks = [
        { id: 'instagram', label: 'Instagram', icon: <InstagramIcon />, url: '#' },
        { id: 'facebook', label: 'Facebook', icon: <FacebookIcon />, url: '#' },
        { id: 'whatsapp', label: 'WhatsApp', icon: <WhatsAppIcon />, url: '#' },
    ];

    return (
        <Stack
            sx={{
                position: 'fixed',
                left: '30px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1000,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                gap: 2,
            }}
        >
            {socialLinks.map((item) => (
                <Tooltip
                    key={item.id}
                    title={item.label}
                    placement="right"
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
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'rgba(255, 255, 255, 0.7)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                background: '#D9A756',
                                color: '#fff',
                                boxShadow: '0 0 20px rgba(217, 167, 86, 0.6)',
                            },
                            '& svg': {
                                fontSize: '24px',
                            }
                        }}
                    >
                        {item.icon}
                    </Box>
                </Tooltip>
            ))}
        </Stack>
    );
};

export default Social;
