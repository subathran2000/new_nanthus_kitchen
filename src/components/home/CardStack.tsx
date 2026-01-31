import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { SpecialItem } from '../../data/specialItems';

interface CardStackProps {
    items: SpecialItem[];
    onCenterCardChange?: (item: SpecialItem) => void;
}

const CardStack: React.FC<CardStackProps> = ({ items, onCenterCardChange }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [exitX, setExitX] = useState<number>(0);

    const activeItem = items[activeIndex];

    const handleNext = () => {
        if (exitX !== 0) return;
        setExitX(300);
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
            setExitX(0);
        }, 200);
    };

    const handlePrev = () => {
        if (exitX !== 0) return;
        setExitX(-300);
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
            setExitX(0);
        }, 200);
    };

    // Autoplay
    React.useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // Change card every 5 seconds

        return () => clearInterval(interval);
    }, [activeIndex, exitX]); // Re-subscribe if index changes or animation state changes to avoid collisions

    // Detect change and notify parent (optional)
    React.useEffect(() => {
        if (onCenterCardChange && activeItem) {
            onCenterCardChange(activeItem);
        }
    }, [activeIndex, items, onCenterCardChange]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            handleNext();
        } else if (info.offset.x < -threshold) {
            handlePrev();
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Arrows */}
            <IconButton
                onClick={handlePrev}
                whileTap={{ scale: 0.9 }}
                component={motion.button}
                sx={{
                    position: 'absolute',
                    left: { xs: '10px', md: '-60px' },
                    zIndex: 10,
                    color: '#FF8C00',
                    bgcolor: 'rgba(0, 30, 54, 0.6)',
                    border: '1px solid rgba(255, 140, 0, 0.2)',
                    backdropFilter: 'blur(4px)',
                    '&:hover': { bgcolor: 'rgba(255, 140, 0, 0.1)' }
                }}
            >
                <ChevronLeft />
            </IconButton>

            <IconButton
                onClick={handleNext}
                whileTap={{ scale: 0.9 }}
                component={motion.button}
                sx={{
                    position: 'absolute',
                    right: { xs: '10px', md: '-60px' },
                    zIndex: 10,
                    color: '#FF8C00',
                    bgcolor: 'rgba(0, 30, 54, 0.6)',
                    border: '1px solid rgba(255, 140, 0, 0.2)',
                    backdropFilter: 'blur(4px)',
                    '&:hover': { bgcolor: 'rgba(255, 140, 0, 0.1)' }
                }}
            >
                <ChevronRight />
            </IconButton>

            {/* 
               Better approach for "Stack":
               Render the "Active" card on top (draggable).
               Render the "Next" cards underneath (static/animated into place).
            */}

            {/* Background Cards (Decorations) */}
            <Box
                key={`card-${(activeIndex + 2) % items.length}`}
                sx={{
                    position: 'absolute',
                    width: '85%',
                    height: '90%',
                    borderRadius: '20px',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    transform: 'scale(0.9) translateY(40px)',
                    zIndex: 0,
                    opacity: 0.5,
                    backgroundImage: `url(${items[(activeIndex + 2) % items.length]?.src})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            />
            <Box
                key={`card-${(activeIndex + 1) % items.length}`}
                sx={{
                    position: 'absolute',
                    width: '90%',
                    height: '95%',
                    borderRadius: '20px',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    transform: 'scale(0.95) translateY(20px)',
                    zIndex: 1,
                    opacity: 0.8,
                    backgroundImage: `url(${items[(activeIndex + 1) % items.length]?.src})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    transition: 'all 0.3s ease'
                }}
            />

            {/* Active Draggable Card */}
            <motion.div
                key={activeIndex}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: 2,
                    cursor: 'grab',
                    x: 0,
                    opacity: 1,
                    scale: 1,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                animate={{
                    x: exitX !== 0 ? (exitX > 0 ? 500 : -500) : 0,
                    opacity: exitX !== 0 ? 0 : 1,
                    rotate: exitX !== 0 ? (exitX > 0 ? 20 : -20) : 0
                }}
                transition={{ duration: 0.3 }}
                whileTap={{ cursor: 'grabbing', scale: 1.05 }}
            >
                <Box
                    component="img"
                    src={activeItem.src}
                    alt={activeItem.alt}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '20px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        pointerEvents: 'none',
                        bgcolor: 'rgba(0,0,0,0.2)' // Subtle background for contain fit
                    }}
                />
            </motion.div>
        </Box>
    );
};

export default CardStack;
