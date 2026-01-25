import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity } from 'framer-motion';

const Sparkles: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Track scroll for the "line" effect
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Transform scroll velocity into a vertical scale factor
    // When scrolling fast, scaleY increases (stretching into a line)
    const rawScaleY = useTransform(scrollVelocity, [-2000, 0, 2000], [15, 1, 15]);
    const scaleY = useSpring(rawScaleY, { stiffness: 200, damping: 20 });

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

    // Generate static stars
    const stars = Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        depth: Math.random() * 0.05 + 0.01,
    }));

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
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
                        scaleY: scaleY, // Apply stretch to background stars
                        width: star.size,
                        height: star.size,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 0 8px 2px rgba(255, 255, 255, 1)',
                    }}
                />
            ))}

            {/* Single Mouse Follower (No Stretch) */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: followerX,
                    y: followerY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                    pointerEvents: 'none',
                    zIndex: 10000,
                }}
            />
        </div>
    );
};

export default Sparkles;
