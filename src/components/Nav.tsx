import React, { useState } from 'react';
import { Box, Stack, Tooltip, Zoom, useTheme, useMediaQuery } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import logo from '../assets/images/new_nanthus_kitchen_logo.png';

const Nav = () => {
    const [activeNav, setActiveNav] = useState('#home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navItems = [
        { id: '#home', label: 'Home', icon: <HomeRoundedIcon /> },
        { id: '#menu', label: 'Menu', icon: <RestaurantMenuRoundedIcon /> },
        { id: '#about', label: 'About', icon: <InfoRoundedIcon /> },
        { id: '#contact', label: 'Contact', icon: <PhoneRoundedIcon /> },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <Stack
                sx={{
                    position: 'fixed',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                    alignItems: 'center',
                    gap: 2,
                    display: { xs: 'none', md: 'flex' },
                }}
            >
                <Stack
                    component="nav"
                    sx={{
                        padding: '20px 10px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                        alignItems: 'center',
                        gap: 3,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Tooltip
                        title="Nanthus Kitchen"
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
                            component="img"
                            src={logo}
                            alt="Nanthus Kitchen Logo"
                            sx={{
                                width: '40px',
                                height: 'auto',
                                cursor: 'pointer',
                                filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))',
                                transition: 'transform 0.3s ease',
                                marginBottom: '20px',
                                transform: 'scale(1.5)',
                                '&:hover': {
                                    transform: 'scale(1.7)',
                                }
                            }}
                            onClick={() => window.location.href = '#home'}
                        />
                    </Tooltip>

                    {navItems.map((item) => (
                        <Tooltip
                            key={item.id}
                            title={item.label}
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
                                href={item.id}
                                onClick={() => setActiveNav(item.id)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    color: activeNav === item.id ? '#D9A756' : 'rgba(255, 255, 255, 0.7)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#fff',
                                        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                                    },
                                    '& svg': {
                                        fontSize: '24px',
                                        filter: activeNav === item.id ? 'drop-shadow(0 0 5px rgba(217, 167, 86, 0.5))' : 'none',
                                    }
                                }}
                            >
                                {item.icon}
                            </Box>
                        </Tooltip>
                    ))}
                </Stack>

                <Tooltip
                    title="Order Now"
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
                        sx={{
                            width: '50px',
                            height: '50px',
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
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                background: '#D9A756',
                                color: '#fff',
                                boxShadow: '0 0 20px rgba(217, 167, 86, 0.6)',
                            }
                        }}
                    >
                        <ShoppingBagRoundedIcon sx={{ fontSize: '24px' }} />
                    </Box>
                </Tooltip>
            </Stack>

            {/* Mobile Top Bar */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '15px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    display: { xs: 'flex', md: 'none' },
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Nanthus Kitchen Logo"
                    sx={{
                        width: '32px',
                        height: 'auto',
                        cursor: 'pointer',
                        transform: { xs: 'scale(1.2)', sm: 'scale(1.8)' }, // Further reduced scale for xs
                        marginLeft: { xs: '0', sm: '10px' }, // Removed margin on xs
                        transition: 'transform 0.3s ease',
                    }}
                    onClick={() => window.location.href = '#home'}
                />
                <Box
                    sx={{
                        color: '#D9A756',
                        cursor: 'pointer',
                        paddingRight: { xs: '5px', sm: '0' }
                    }}
                >
                    <ShoppingBagRoundedIcon sx={{ fontSize: '24px' }} />
                </Box>
            </Stack>

            {/* Orbital Mobile Menu */}
            <Box
                sx={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 2000,
                    pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.5s ease',
                    background: isMobileMenuOpen ? 'rgba(0, 30, 54, 0.9)' : 'transparent',
                    backdropFilter: isMobileMenuOpen ? 'blur(10px)' : 'none',
                }}
            >
                {/* Menu List */}
                <Box
                    component="ul"
                    sx={{
                        position: 'absolute',
                        bottom: { xs: '20px', sm: '30px' }, // Anchored at bottom
                        left: '50%',
                        width: 0,
                        height: 0,
                        m: 0,
                        p: 0,
                        listStyle: 'none',
                        // animation: 'menu-rotation 60s linear infinite', // Disable rotation for fixed arc
                        opacity: isMobileMenuOpen ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                    }}
                >
                        // Distribute items in an arc upwards
                    // Narrowing arc for small screens to prevent clipping
                    const baseAngle = isMobile ? -50 : -60;
                    const angleStep = isMobile ? 33 : 40;
                    const angle = baseAngle + (index * angleStep);
                    const radius = isMobile ? 110 : 160; // Slightly reduced radius

                    return (
                    <Box
                        component="li"
                        key={item.id}
                        sx={{
                            position: 'absolute',
                            left: '-25px', // Centered (half of 50px width)
                            transformOrigin: `25px ${radius}px`,
                            opacity: 0,
                            animation: isMobileMenuOpen ? `appear 0.5s forwards ${index * 0.1}s` : 'none',
                            transform: `rotate(${angle}deg)`,
                            top: `-${radius}px`,
                        }}
                    >
                        <Box
                            component="a"
                            onClick={() => {
                                setActiveNav(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50px',
                                height: '50px',
                                textDecoration: 'none',
                                color: '#fff',
                                position: 'relative',
                                transform: `rotate(${-angle}deg)`, // Counter-rotate
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    background: '#D9A756',
                                    animation: 'scaling 3s linear infinite',
                                    boxShadow: '0 0 15px rgba(217, 167, 86, 0.4)',
                                }
                            }}
                        >
                            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex' }}>
                                {React.cloneElement(item.icon as React.ReactElement, { sx: { fontSize: '24px', color: '#fff' } } as any)}
                            </Box>
                        </Box>
                    </Box>
                    );
                    })}
                </Box>

                {/* Center Toggle Button */}
                <Box
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    sx={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#001E36',
                        border: '2px solid #D9A756',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2001,
                        boxShadow: '0 0 20px rgba(217, 167, 86, 0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        pointerEvents: 'auto',
                    }}
                >
                    <Box
                        component="img"
                        src={logo}
                        alt="Menu"
                        sx={{
                            width: '35px',
                            height: 'auto',
                            transition: 'all 0.3s ease',
                            transform: isMobileMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default Nav;
