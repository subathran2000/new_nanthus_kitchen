import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SpecialItem } from "../../types";

interface CardStackProps {
    items: SpecialItem[];
    onCenterCardChange?: (item: SpecialItem) => void;
}

const CardStack: React.FC<CardStackProps> = ({ items, onCenterCardChange }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(handleNext, 3000);
        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        if (onCenterCardChange) {
            onCenterCardChange(items[activeIndex]);
        }
    }, [activeIndex, items, onCenterCardChange]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.x > 100) handlePrev();
        else if (info.offset.x < -100) handleNext();
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="region"
            aria-label="Special offers carousel"
            aria-roledescription="carousel"
        >
            {/* Navigation Controls */}
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: -20,
                right: -20,
                transform: 'translateY(-50%)',
                display: 'flex',
                justifyContent: 'space-between',
                zIndex: 20,
                pointerEvents: 'none'
            }}>
                <IconButton
                    onClick={handlePrev}
                    aria-label="Previous special offer"
                    sx={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        color: '#F5A623',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(8px)',
                        pointerEvents: 'auto',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: { xs: 'scale(0.8)', md: 'scale(1)' },
                        '&:hover': {
                            bgcolor: '#F5A623',
                            borderColor: '#F5A623',
                            color: '#000',
                            transform: { xs: 'scale(0.85)', md: 'scale(1.1)' },
                            boxShadow: '0 10px 30px rgba(245, 166, 35, 0.3)'
                        }
                    }}
                >
                    <ChevronLeft size={24} />
                </IconButton>
                <IconButton
                    onClick={handleNext}
                    aria-label="Next special offer"
                    sx={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        color: '#F5A623',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(8px)',
                        pointerEvents: 'auto',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: { xs: 'scale(0.8)', md: 'scale(1)' },
                        '&:hover': {
                            bgcolor: '#F5A623',
                            borderColor: '#F5A623',
                            color: '#000',
                            transform: { xs: 'scale(0.85)', md: 'scale(1.1)' },
                            boxShadow: '0 10px 30px rgba(245, 166, 35, 0.3)'
                        }
                    }}
                >
                    <ChevronRight size={24} />
                </IconButton>
            </Box>

            <Box sx={{ position: 'relative', width: '100%', height: '100%', perspective: '1200px' }}>
                <AnimatePresence initial={false} custom={direction}>
                    {items.map((item, index) => {
                        const isCenter = index === activeIndex;
                        const isNext = index === (activeIndex + 1) % items.length;
                        const isPrev = index === (activeIndex - 1 + items.length) % items.length;

                        if (!isCenter && !isNext && !isPrev) return null;

                        let x = 0;
                        let scale = 0.8;
                        let zIndex = 0;
                        let opacity = 0;
                        let rotateY = 0;

                        if (isCenter) {
                            x = 0;
                            scale = 1;
                            zIndex = 5;
                            opacity = 1;
                            rotateY = 0;
                        } else if (isNext) {
                            x = 120;
                            scale = 0.85;
                            zIndex = 3;
                            opacity = 0.4;
                            rotateY = -25;
                        } else if (isPrev) {
                            x = -120;
                            scale = 0.85;
                            zIndex = 3;
                            opacity = 0.4;
                            rotateY = 25;
                        }

                        return (
                            <motion.div
                                key={index}
                                custom={direction}
                                initial={{ opacity: 0, scale: 0.5, x: direction * 200 }}
                                animate={{
                                    x,
                                    scale,
                                    zIndex,
                                    opacity,
                                    rotateY,
                                    filter: isCenter ? 'blur(0px)' : 'blur(2px)'
                                }}
                                exit={{ opacity: 0, scale: 0.5, x: -direction * 200 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                drag={isCenter ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={handleDragEnd}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: isCenter ? 'grab' : 'default',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        boxShadow: isCenter ? '0 30px 60px rgba(0,0,0,0.5)' : '0 10px 20px rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        bgcolor: '#111'
                                    }}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        referrerPolicy="no-referrer"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    {isCenter && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                p: 3,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                                display: { xs: 'block', md: 'none' }
                                            }}
                                        >
                                            <div className="text-white font-medium">{item.title}</div>
                                        </Box>
                                    )}
                                </Box>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </Box>
        </Box>
    );
};

export default CardStack;
