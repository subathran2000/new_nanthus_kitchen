import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import SplineImageCard from './SplineImageCard';
import logoReflect from "../../assets/images/restaurent.jpg";
import img5 from "../../assets/images/5.jpeg";
import imgChef from "../../assets/images/5451355.jpg";
import imgBg4 from "../../assets/images/bg4.jpg";
import imgDish from "../../assets/images/signature_dish_orb.png";
import imgSpecial from "../../assets/images/special_bg.png";

interface HeroImageGridProps {
    variant?: 'desktop' | 'mobile-top' | 'mobile-bottom';
    onSpecialsClick?: () => void;
}

const HeroImageGrid: React.FC<HeroImageGridProps> = ({ variant = 'desktop', onSpecialsClick }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const { innerWidth: width, innerHeight: height } = window;
        const x = (e.clientX - width / 2) / (width / 2); // -1 to 1
        const y = (e.clientY - height / 2) / (height / 2); // -1 to 1

        const maxRotX = 12;
        const maxRotY = 12;

        setRotation({
            x: -y * maxRotX,
            y: x * maxRotY
        });
        setMousePos({ x, y });
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const { innerWidth: width, innerHeight: height } = window;
            const x = (touch.clientX - width / 2) / (width / 2);
            const y = (touch.clientY - height / 2) / (height / 2);

            const maxRotX = 15;
            const maxRotY = 15;

            setRotation({
                x: -y * maxRotX,
                y: x * maxRotY
            });
            setMousePos({ x, y });
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [handleMouseMove, handleTouchMove]);

    const allImages = [
        { src: logoReflect, alt: "Restaurant Interior" },
        { src: img5, alt: "Culinary Art" },
        { src: imgChef, alt: "Chef at Work" },
        { src: imgDish, alt: "Signature Dish" },
        { src: imgBg4, alt: "Ambience" },
        { src: imgSpecial, alt: "Gourmet Experience" }
    ];

    // --- CONFIGURATIONS ---

    // 1. DESKTOP: Full Cluster (Right Aligned)
    const desktopConfigs = [
        { top: '5%', left: '20%', width: { md: '30%' }, height: { md: '30%' }, zIndex: 5 },
        { top: '15%', left: '72%', width: { md: '28%' }, height: { md: '26%' }, zIndex: 3 },
        { top: '40%', left: '15%', width: { md: '34%' }, height: { md: '34%' }, zIndex: 6 },
        { top: '45%', left: '65%', width: { md: '35%' }, height: { md: '30%' }, zIndex: 4 },
        { top: '70%', left: '30%', width: { md: '40%' }, height: { md: '28%' }, zIndex: 7 },
        { top: '65%', left: '76%', width: { md: '24%' }, height: { md: '24%' }, zIndex: 2 }
    ];

    // 2. MOBILE TOP: 2 Images (Above Text)
    // Overlapping visual for the top
    const mobileTopConfigs = [
        { top: '10%', left: '5%', width: '50%', height: '80%', zIndex: 2 },
        { top: '20%', left: '45%', width: '45%', height: '70%', zIndex: 3 },
    ];

    // 3. MOBILE BOTTOM: 4 Images (Below Text)
    // 2x2 Cluster feeling
    const mobileBottomConfigs = [
        { top: '0%', left: '5%', width: '50%', height: '50%', zIndex: 4 }, // imgChef
        { top: '15%', left: '45%', width: '45%', height: '45%', zIndex: 3 }, // imgDish
        { top: '55%', left: '10%', width: '40%', height: '40%', zIndex: 5 }, // imgBg4
        { top: '45%', left: '55%', width: '35%', height: '35%', zIndex: 2 }, // imgSpecial
    ];

    let renderImages: typeof allImages = [];
    let renderConfigs: any[] = [];

    if (variant === 'desktop') {
        renderImages = allImages;
        renderConfigs = desktopConfigs;
    } else if (variant === 'mobile-top') {
        renderImages = allImages.slice(0, 2);
        renderConfigs = mobileTopConfigs;
    } else if (variant === 'mobile-bottom') {
        renderImages = allImages.slice(2, 6);
        renderConfigs = mobileBottomConfigs;
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: { xs: '1500px', md: '2500px' },
            overflow: 'visible',
            position: 'relative'
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                overflow: 'visible'
            }}>
                {renderImages.map((img, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            position: 'absolute',
                            top: renderConfigs[idx].top,
                            left: renderConfigs[idx].left,
                            width: renderConfigs[idx].width,
                            height: renderConfigs[idx].height,
                            zIndex: renderConfigs[idx].zIndex,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <SplineImageCard
                            src={img.src}
                            alt={img.alt}
                            rotationX={rotation.x}
                            rotationY={rotation.y}
                            mouseX={mousePos.x}
                            mouseY={mousePos.y}
                            sx={{ width: '100%', height: '100%' }}
                            onClick={img.alt === "Gourmet Experience" ? onSpecialsClick : undefined}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HeroImageGrid;
