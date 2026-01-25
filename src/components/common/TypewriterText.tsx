import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface TypewriterTextProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    stagger?: number;
    as?: React.ElementType; // allow 'h2', 'p', 'span' etc.
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    className,
    style,
    delay = 0,
    stagger = 0.05,
    as: Component = 'div'
}) => {
    // Split text into characters
    const characters = Array.from(text);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    // Refined variants for stable layout
    const stableCharVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <Component className={className} style={{ ...style, display: 'inline-block' }}>
            <motion.span
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
            >
                {characters.map((char, index) => (
                    <motion.span key={index} variants={stableCharVariants}>
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.span>
        </Component>
    );
};

export default TypewriterText;
