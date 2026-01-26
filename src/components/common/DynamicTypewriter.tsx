import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicTypewriterProps {
    phrases: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
    className?: string;
}

const DynamicTypewriter: React.FC<DynamicTypewriterProps> = ({
    phrases,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 2000,
    className = "",
}) => {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[index];

        const handleTyping = () => {
            if (!isDeleting) {
                // Typing
                if (displayText.length < currentPhrase.length) {
                    setDisplayText(currentPhrase.substring(0, displayText.length + 1));
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting
                if (displayText.length > 0) {
                    setDisplayText(currentPhrase.substring(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        };

        const timer = setTimeout(
            handleTyping,
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, index, phrases, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <div className={`dynamic-typewriter ${className}`} style={{ minHeight: '1.2em', display: 'flex', alignItems: 'center' }}>
            <motion.span
                initial={{ opacity: 1 }}
                className="typewriter-text"
            >
                {displayText}
            </motion.span>
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1em',
                    backgroundColor: 'currentColor',
                    marginLeft: '4px'
                }}
            />
        </div>
    );
};

export default DynamicTypewriter;
