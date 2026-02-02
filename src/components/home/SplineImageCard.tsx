import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import gsap from 'gsap';

interface SplineImageCardProps {
    src: string;
    alt: string;
    rotationX: number;
    rotationY: number;
    mouseX?: number; // Optional normalized mouse X (-1 to 1)
    mouseY?: number; // Optional normalized mouse Y (-1 to 1)
    sx?: SxProps<Theme>;
}

const SplineImageCard: React.FC<SplineImageCardProps> = ({ src, alt, rotationX, rotationY, mouseX = 0, mouseY = 0, sx }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const reflectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!cardRef.current || !reflectionRef.current || !imageRef.current) return;

        // Smooth movement for coordinated rotation
        gsap.to(cardRef.current, {
            rotationX,
            rotationY,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true
        });

        // Dynamic reflection and parallax based on normalized mouse coords
        gsap.to(reflectionRef.current, {
            xPercent: mouseX * 40,
            yPercent: mouseY * 40,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true
        });

        gsap.to(imageRef.current, {
            x: mouseX * 12,
            y: mouseY * 12,
            duration: 0.8,
            ease: "power2.out",
            overwrite: true
        });
    }, [rotationX, rotationY, mouseX, mouseY]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: 1200,
                ...sx
            }}
        >
            <Box
                ref={cardRef}
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 0 1px rgba(255,255,255,0.2)',
                    transformStyle: 'preserve-3d',
                    background: '#000',
                    border: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                {/* Main Image with Parallax */}
                <Box
                    component="img"
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    sx={{
                        width: '120%',
                        height: '120%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: '-10%',
                        left: '-10%',
                        filter: 'brightness(0.9) contrast(1.1)',
                        transition: 'filter 0.4s ease',
                    }}
                />

                {/* Glossy Dynamic Reflection */}
                <Box
                    ref={reflectionRef}
                    sx={{
                        position: 'absolute',
                        inset: '-100%',
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        zIndex: 2,
                        mixBlendMode: 'plus-lighter',
                    }}
                />

                {/* "Spline" Style Vibrant Glass Border */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '1.25rem',
                        border: '1.5px solid rgba(255,255,255,0.2)', // Sharper border for cluster overlap
                        pointerEvents: 'none',
                        zIndex: 3,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.15) 100%)',
                        boxShadow: 'inset 0 0 15px rgba(255,255,255,0.08)',
                    }}
                />

                {/* Subtle Inner Glow */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '1.25rem',
                        pointerEvents: 'none',
                        zIndex: 4,
                        boxShadow: 'inset 0 0 40px rgba(255,255,255,0.02)',
                    }}
                />
            </Box>
        </Box>
    );
};

export default SplineImageCard;
