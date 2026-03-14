import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../common/NavButtons';
import { ROUTES } from '../../constants/routes';

import { specialItems } from '../../data/specialItems';

const SpecialsPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const routerNavigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const navigate = (direction: number) => {
        if (isAnimating) return;

        setIsAnimating(true);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) {
            newIndex = specialItems.length - 1;
        } else if (newIndex >= specialItems.length) {
            newIndex = 0;
        }

        setCurrentIndex(newIndex);

        setTimeout(() => {
            setIsAnimating(false);
        }, 400);
    };

    const goToIndex = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);

        setTimeout(() => {
            setIsAnimating(false);
        }, 400);
    };

    const startAutoplay = () => {
        autoplayIntervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % specialItems.length);
        }, 4000);
    };

    const stopAutoplay = () => {
        if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
            autoplayIntervalRef.current = null;
        }
    };

    const handleUserInteraction = () => {
        stopAutoplay();
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                handleUserInteraction();
                navigate(-1);
            }
            if (e.key === 'ArrowRight') {
                handleUserInteraction();
                navigate(1);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('keydown', handleKeyDown);
            return () => container.removeEventListener('keydown', handleKeyDown);
        }
    }, [currentIndex, isAnimating]);

    // Touch/swipe support
    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isSwiping) return;

            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;

            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!isSwiping) return;

            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const swipeThreshold = 30;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
                handleUserInteraction();

                if (diffX > 0) {
                    navigate(1);
                } else {
                    navigate(-1);
                }
            }

            isSwiping = false;
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('touchstart', handleTouchStart, { passive: true });
            container.addEventListener('touchmove', handleTouchMove, { passive: false });
            container.addEventListener('touchend', handleTouchEnd, { passive: true });

            return () => {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [currentIndex, isAnimating]);

    // Start autoplay on mount
    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, []);

    const getItemStyle = (index: number) => {
        let offset = index - currentIndex;

        if (offset > specialItems.length / 2) {
            offset = offset - specialItems.length;
        } else if (offset < -specialItems.length / 2) {
            offset = offset + specialItems.length;
        }

        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);

        const spacing = isSmall ? 250 : isMobile ? 300 : 400;
        let translateX = offset * spacing;
        const translateZ = -absOffset * (isSmall ? 200 : 300);
        const rotateY = -sign * Math.min(absOffset * 60, 60);
        let opacity = 1 - absOffset * 0.2;
        const scale = 1 - absOffset * 0.1;

        if (absOffset > 3) {
            opacity = 0;
            translateX = sign * 800;
        }

        return {
            transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            opacity,
            zIndex: 100 - absOffset
        };
    };

    const cardSize = isSmall ? 280 : isMobile ? 350 : 450;

    return (
        <Box
            component="section"
            sx={{
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                bgcolor: '#F5F7FA',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 10,
                    overflow: 'hidden',
                }}
            >
                <NavButtons onHome={() => routerNavigate(ROUTES.HOME)} />

                {/* Heading */}
                <Box
                    sx={{
                        flexShrink: 0,
                        width: '100%',
                        px: { xs: 2, sm: 3 },
                        pt: { xs: 10, sm: 11, md: 12 },
                        pb: { xs: 2, sm: 3 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: { xs: 72, sm: 80, md: 96 },
                        boxSizing: 'border-box',
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontSize: { xs: 'clamp(18px, 5vw, 24px)', sm: 'clamp(24px, 4vw, 32px)', md: 'clamp(28px, 3.5vw, 48px)' },
                            fontWeight: 700,
                            color: '#1A1D23',
                            textAlign: 'center',
                            fontFamily: "'Playfair Display', Georgia, serif",
                            animation: 'fadeIn 0.6s forwards',
                            maxWidth: '90%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.2,
                            '@keyframes fadeIn': {
                                from: {
                                    opacity: 0,
                                    transform: 'translateY(-10px)',
                                },
                                to: {
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                },
                            },
                        }}
                    >
                        {specialItems[currentIndex].title}
                    </Typography>
                </Box>

                {/* Coverflow Container */}
                <Box
                    ref={containerRef}
                    tabIndex={0}
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        perspective: '1200px',
                        position: 'relative',
                        outline: 'none',
                        py: { xs: 1, sm: 2 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: { xs: 'min(420px, 55vh)', sm: 'min(520px, 60vh)', md: '600px' },
                            maxHeight: '600px',
                        }}
                    >
                        {specialItems.map((item, index) => (
                            <Box
                                key={index}
                                onClick={() => {
                                    handleUserInteraction();
                                    goToIndex(index);
                                }}
                                sx={{
                                    position: 'absolute',
                                    width: `${cardSize}px`,
                                    height: `${cardSize}px`,
                                    transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    ...getItemStyle(index),
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '12px',
                                        boxShadow: index === currentIndex
                                            ? '0 8px 32px rgba(43, 125, 233, 0.2), 0 16px 48px rgba(0,0,0,0.12)'
                                            : '0 4px 16px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.06)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transformStyle: 'preserve-3d',
                                        bgcolor: '#FFFFFF',
                                        border: index === currentIndex ? '2px solid #2B7DE9' : '1px solid #E2E6ED',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.src}
                                        alt={item.alt}
                                        loading="lazy"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: '12px',
                                            display: 'block',
                                        }}
                                    />
                                </Box>

                                {/* Reflection */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '12px',
                                        transform: 'scaleY(-1)',
                                        opacity: 0.15,
                                        filter: 'blur(2px)',
                                        backgroundImage: `url(${item.src})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        overflow: 'hidden',
                                        pointerEvents: 'none',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(to bottom, rgba(245, 247, 250, 0) 0%, rgba(245, 247, 250, 0.6) 50%, rgba(245, 247, 250, 1) 100%)',
                                        },
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>

                    {/* Navigation Buttons */}
                    <IconButton
                        aria-label="Previous special"
                        onClick={() => {
                            handleUserInteraction();
                            navigate(-1);
                        }}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: { xs: '20px', md: '120px' },
                            transform: 'translateY(-50%)',
                            bgcolor: '#FFFFFF',
                            border: '1px solid #E2E6ED',
                            color: '#1A1D23',
                            width: { xs: '45px', md: '48px' },
                            height: { xs: '45px', md: '48px' },
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            zIndex: 1001,
                            '&:hover': {
                                bgcolor: '#2B7DE9',
                                color: '#fff',
                                borderColor: '#2B7DE9',
                                transform: 'translateY(-50%) scale(1.05)',
                                boxShadow: '0 4px 16px rgba(43, 125, 233, 0.25)',
                            },
                        }}
                    >
                        <ChevronLeft sx={{ fontSize: { xs: '24px', md: '28px' } }} />
                    </IconButton>

                    <IconButton
                        aria-label="Next special"
                        onClick={() => {
                            handleUserInteraction();
                            navigate(1);
                        }}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: { xs: '20px', md: '120px' },
                            transform: 'translateY(-50%)',
                            bgcolor: '#FFFFFF',
                            border: '1px solid #E2E6ED',
                            color: '#1A1D23',
                            width: { xs: '45px', md: '48px' },
                            height: { xs: '45px', md: '48px' },
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            zIndex: 1001,
                            '&:hover': {
                                bgcolor: '#2B7DE9',
                                color: '#fff',
                                borderColor: '#2B7DE9',
                                transform: 'translateY(-50%) scale(1.05)',
                                boxShadow: '0 4px 16px rgba(43, 125, 233, 0.25)',
                            },
                        }}
                    >
                        <ChevronRight sx={{ fontSize: { xs: '24px', md: '28px' } }} />
                    </IconButton>
                </Box>

                {/* Bottom: dots + description */}
                <Box
                    sx={{
                        flexShrink: 0,
                        width: '100%',
                        px: { xs: 2, sm: 3 },
                        pt: { xs: 2, sm: 3 },
                        pb: { xs: 3, sm: 4, md: 5 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: { xs: 1.5, sm: 2 },
                        zIndex: 200,
                        maxWidth: '800px',
                        mx: 'auto',
                        boxSizing: 'border-box',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: '12px', padding: '10px 20px' }}>
                        {[-2, -1, 0, 1, 2].map((offset) => {
                            const index = (currentIndex + offset + specialItems.length) % specialItems.length;
                            let scale = 1;
                            let opacity = 1;
                            if (offset === 0) {
                                scale = 1.5;
                                opacity = 1;
                            } else if (Math.abs(offset) === 1) {
                                scale = 1;
                                opacity = 0.7;
                            } else {
                                scale = 0.6;
                                opacity = 0.4;
                            }
                            return (
                                <Box
                                    key={`${index}-${offset}`}
                                    onClick={() => {
                                        handleUserInteraction();
                                        goToIndex(index);
                                    }}
                                    sx={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        bgcolor: offset === 0 ? '#2B7DE9' : '#A0A8B8',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        transform: `scale(${scale})`,
                                        opacity,
                                        boxShadow: offset === 0 ? '0 0 8px rgba(43, 125, 233, 0.4)' : 'none',
                                        '&:hover': {
                                            opacity: 1,
                                            transform: `scale(${scale * 1.2})`,
                                        },
                                    }}
                                />
                            );
                        })}
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                color: '#5A6177',
                                textAlign: 'center',
                                lineHeight: 1.6,
                                maxWidth: '600px',
                                width: '100%',
                            }}
                        >
                            {specialItems[currentIndex].description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SpecialsPage;
