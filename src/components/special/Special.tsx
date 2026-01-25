import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


interface ImageData {
    src: string;
    alt: string;
    title: string;
    description: string;
}

// --- 3D Background Components ---



const Coverflow3D: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const routeTo = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const imageData: ImageData[] = [
        {
            src: 'https://i.pinimg.com/736x/29/af/f8/29aff8a83317d3eb09ecfbeb347688e2.jpg',
            alt: 'Mountain Landscape',
            title: 'Mountain Landscape',
            description: 'Majestic peaks covered in snow during golden hour'
        },
        {
            src: 'https://i.pinimg.com/736x/29/af/f8/29aff8a83317d3eb09ecfbeb347688e2.jpg',
            alt: 'Forest Path',
            title: 'Forest Path',
            description: 'A winding trail through ancient woodland'
        },
        {
            src: 'https://i.pinimg.com/736x/29/af/f8/29aff8a83317d3eb09ecfbeb347688e2.jpg',
            alt: 'Lake Reflection',
            title: 'Lake Reflection',
            description: 'Serene waters mirroring the surrounding landscape'
        },
        {
            src: 'https://i.pinimg.com/736x/29/af/f8/29aff8a83317d3eb09ecfbeb347688e2.jpg',
            alt: 'Ocean Sunset',
            title: 'Ocean Sunset',
            description: 'Golden hour over endless ocean waves'
        },
        {
            src: 'https://i.pinimg.com/736x/29/af/f8/29aff8a83317d3eb09ecfbeb347688e2.jpg',
            alt: 'Desert Dunes',
            title: 'Desert Dunes',
            description: 'Rolling sand dunes under vast blue skies'
        },
        {
            src: 'https://i.pinimg.com/736x/29/af/f8/29aff8a83317d3eb09ecfbeb347688e2.jpg',
            alt: 'Starry Night',
            title: 'Starry Night',
            description: 'Countless stars illuminating the dark sky'
        },
        {
            src: 'https://i.pinimg.com/736x/29/af/f8/29aff8a83317d3eb09ecfbeb347688e2.jpg',
            alt: 'Waterfall',
            title: 'Waterfall',
            description: 'Cascading water through lush green forest'
        }
    ];

    const navigate = (direction: number) => {
        if (isAnimating) return;

        setIsAnimating(true);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) {
            newIndex = imageData.length - 1;
        } else if (newIndex >= imageData.length) {
            newIndex = 0;
        }

        setCurrentIndex(newIndex);

        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };

    const goToIndex = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);

        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };

    const startAutoplay = () => {
        autoplayIntervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageData.length);
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

        if (offset > imageData.length / 2) {
            offset = offset - imageData.length;
        } else if (offset < -imageData.length / 2) {
            offset = offset + imageData.length;
        }

        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);

        const spacing = isSmall ? 150 : isMobile ? 180 : 220;
        let translateX = offset * spacing;
        let translateZ = -absOffset * (isSmall ? 150 : 200);
        let rotateY = -sign * Math.min(absOffset * 60, 60);
        let opacity = 1 - absOffset * 0.2;
        let scale = 1 - absOffset * 0.1;

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

    const cardSize = isSmall ? 180 : isMobile ? 200 : 300;

    return (
        <Box
            component="section"
            sx={{
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
            }}
        >

            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Home Button */}
                <IconButton
                    onClick={() => routeTo('/')}
                    sx={{
                        position: 'absolute',
                        top: { xs: '20px', md: '40px' },
                        right: { xs: '20px', md: '40px' },
                        bgcolor: 'rgba(0, 255, 255, 0.1)',
                        border: '2px solid rgba(0, 255, 255, 0.3)',
                        color: '#00ffff',
                        width: { xs: '40px', sm: '40px', md: '40px' },
                        height: { xs: '40px', sm: '40px', md: '40px' },
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)',
                        zIndex: 1001,
                        '&:hover': {
                            bgcolor: 'rgba(0, 255, 255, 0.2)',
                            transform: 'scale(1.1)',
                            boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)',
                        },
                    }}
                >
                    <Home />
                </IconButton>

                {/* Title and Description */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: { xs: '20px', md: '40px' },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'white',
                        textAlign: 'center',
                        zIndex: 200,
                        width: '90%',
                        maxWidth: '600px',
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '24px', sm: '32px', md: '48px' },
                            fontWeight: 700,
                            mb: 1,
                            color: '#fff',
                            textShadow: '0 0 20px rgba(0,255,255,0.5)',
                            animation: 'fadeIn 0.6s forwards',
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
                        {imageData[currentIndex].title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '14px', sm: '16px', md: '18px' },
                            color: '#aaccff',
                            opacity: 0.9,
                        }}
                    >
                        {imageData[currentIndex].description}
                    </Typography>
                </Box>

                {/* Coverflow Container */}
                <Box
                    ref={containerRef}
                    tabIndex={0}
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        perspective: '1200px',
                        position: 'relative',
                        outline: 'none',
                    }}
                >
                    {/* Coverflow Items */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '400px',
                        }}
                    >
                        {imageData.map((item, index) => (
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
                                    transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    ...getItemStyle(index),
                                }}
                            >
                                {/* Card Cover */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '10px',
                                        boxShadow: index === currentIndex
                                            ? '0 40px 80px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.4), 0 0 100px rgba(0, 255, 255, 0.2)'
                                            : '0 30px 60px rgba(0, 0, 0, 0.9), 0 10px 30px rgba(0, 0, 0, 0.7)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transformStyle: 'preserve-3d',
                                        bgcolor: '#001e36',
                                        border: index === currentIndex ? '2px solid rgba(0, 255, 255, 0.5)' : '2px solid rgba(255, 255, 255, 0.1)',
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
                                            objectFit: 'cover',
                                            borderRadius: '10px',
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
                                        borderRadius: '10px',
                                        transform: 'scaleY(-1)',
                                        opacity: 0.4,
                                        filter: 'blur(2px)',
                                        backgroundImage: `url(${item.src})`,
                                        backgroundSize: 'cover',
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
                                            background: 'linear-gradient(to bottom, rgba(0, 30, 54, 0) 0%, rgba(0, 30, 54, 0.6) 50%, rgba(0, 30, 54, 1) 100%)',
                                        },
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>

                    {/* Navigation Buttons */}
                    <IconButton
                        onClick={() => {
                            handleUserInteraction();
                            navigate(-1);
                        }}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: { xs: '10px', sm: '20px', md: '120px' },
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(0, 255, 255, 0.1)',
                            border: '2px solid rgba(0, 255, 255, 0.3)',
                            color: '#00ffff',
                            width: { xs: '40px', sm: '40px', md: '40px' },
                            height: { xs: '40px', sm: '40px', md: '40px' },
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)',
                            zIndex: 1001,
                            '&:hover': {
                                bgcolor: 'rgba(0, 255, 255, 0.2)',
                                transform: 'translateY(-50%) scale(1.1)',
                                boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)',
                            },
                        }}
                    >
                        <ChevronLeft sx={{ fontSize: { xs: '20px', md: '24px' } }} />
                    </IconButton>

                    <IconButton
                        onClick={() => {
                            handleUserInteraction();
                            navigate(1);
                        }}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: { xs: '10px', sm: '20px', md: '120px' },
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(0, 255, 255, 0.1)',
                            border: '2px solid rgba(0, 255, 255, 0.3)',
                            color: '#00ffff',
                            width: { xs: '40px', sm: '40px', md: '40px' },
                            height: { xs: '40px', sm: '40px', md: '40px' },
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)',
                            zIndex: 1001,
                            '&:hover': {
                                bgcolor: 'rgba(0, 255, 255, 0.2)',
                                transform: 'translateY(-50%) scale(1.1)',
                                boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)',
                            },
                        }}
                    >
                        <ChevronRight sx={{ fontSize: { xs: '24px', md: '32px' } }} />
                    </IconButton>

                    {/* Dots Indicator */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: '60px', md: '80px' },
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '12px',
                            zIndex: 200,
                            padding: '10px 20px',
                        }}
                    >
                        {[-2, -1, 0, 1, 2].map((offset) => {
                            const index = (currentIndex + offset + imageData.length) % imageData.length;
                            // Determine scale based on offset (0 is center/current)
                            let scale = 1;
                            let opacity = 1;

                            if (offset === 0) {
                                scale = 1.5; // Center (Big)
                                opacity = 1;
                            } else if (Math.abs(offset) === 1) {
                                scale = 1; // Neighbors (Medium)
                                opacity = 0.7;
                            } else {
                                scale = 0.6; // Outer (Small)
                                opacity = 0.4;
                            }

                            return (
                                <Box
                                    key={`${index}-${offset}`} // Unique key for the window position
                                    onClick={() => {
                                        handleUserInteraction();
                                        goToIndex(index);
                                    }}
                                    sx={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        bgcolor: offset === 0
                                            ? '#00ffff'
                                            : 'rgba(0, 255, 255, 0.8)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        transform: `scale(${scale})`,
                                        opacity: opacity,
                                        boxShadow: offset === 0 ? '0 0 10px rgba(0, 255, 255, 0.8)' : 'none',
                                        '&:hover': {
                                            opacity: 1,
                                            transform: `scale(${scale * 1.2})`,
                                        },
                                    }}
                                />
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Coverflow3D;
