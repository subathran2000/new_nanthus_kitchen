import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface OrderButtonProps {
    onClick?: () => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({ onClick }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
            style={{
                zIndex: 1000,
            }}
        >
            <motion.button
                onClick={onClick}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: isMobile ? '0.8rem' : '1rem 2rem',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                    fontWeight: 700,
                    color: '#000',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: isMobile ? '45px' : 'auto',
                    minHeight: isMobile ? '45px' : 'auto',
                }}
            >
                {/* Animated background glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                        borderRadius: '50px',
                        pointerEvents: 'none',
                    }}
                />

                {/* Button content */}
                <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
                    {isMobile ? <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} /> : 'Order Now'}
                </span>

                {/* Sparkle effect */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%',
                        width: '8px',
                        height: '8px',
                        background: '#FFF',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px #FFF',
                        pointerEvents: 'none',
                    }}
                />
            </motion.button>

            {/* Floating badge */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: '#FF4444',
                    color: '#FFF',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(255, 68, 68, 0.5)',
                }}
            >
                🔥
            </motion.div>
        </motion.div>
    );
};

export default OrderButton;
