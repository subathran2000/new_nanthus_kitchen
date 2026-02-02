import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Sparkles: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Scroll velocity tracking removed - no expansion effect

    // Smooth springs for the background parallax (slower, floaty)
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Smooth spring for the single cursor follower (faster, responsive)
    const followerX = useSpring(mouseX, { stiffness: 500, damping: 30 });
    const followerY = useSpring(mouseY, { stiffness: 500, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    // Generate static stars - Doubled density as requested
    const stars = Array.from({ length: 300 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 4 + 0.5, // More size variety
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        depth: Math.random() * 0.08 + 0.01, // More parallax depth variety
    }));

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
            }}
        >
            {/* Background Stars with Parallax and Scroll Stretch */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        // Parallax movement
                        x: useTransform(springX, (value) => (value - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * star.depth),
                        y: useTransform(springY, (value) => (value - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * star.depth),
                        // scaleY removed - no scroll expansion
                        width: star.size,
                        height: star.size,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
                    }}
                />
            ))}

            {/* Cursor Follower - Simple white glow */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 70%)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: followerX,
                    y: followerY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
};

export default Sparkles;