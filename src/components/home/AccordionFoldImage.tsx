import { useRef } from 'react';
import { Box, keyframes } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface AccordionFoldImageProps {
    src: string;
    alt?: string;
    sx?: SxProps<Theme>;
    mode?: 'scroll' | 'auto';
}

const FOLDS = 5;
const SKEW_VAL = 15; // deg
const CRUNCH_VAL = 0.6;
const DURATION = '4s';
const DELAY = '1s';

// CSS Keyframes for 'auto' mode
const crunchAnimation = keyframes`
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(${CRUNCH_VAL}); }
`;

const oddFoldAnimation = keyframes`
  0%, 100% { transform: skewY(0deg); filter: brightness(1); }
  50% { transform: skewY(${SKEW_VAL}deg); filter: brightness(1.25); }
`;

const evenFoldAnimation = keyframes`
  0%, 100% { transform: skewY(0deg); filter: brightness(1); }
  50% { transform: skewY(-${SKEW_VAL}deg); filter: brightness(0.75); }
`;

const AccordionFoldImage: React.FC<AccordionFoldImageProps> = ({ src, sx, mode = 'scroll' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center", "end start"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Scale: Folded (0.5) -> Open (1) -> Folded (0.5)
    // We use a constant for the crunch factor in scroll mode
    const SCROLL_CRUNCH = 0.5;
    const SCROLL_SKEW = 20;

    const scaleX = useTransform(smoothProgress, [0, 0.5, 1], [SCROLL_CRUNCH, 1, SCROLL_CRUNCH]);

    return (
        <Box
            ref={containerRef}
            component={mode === 'auto' ? 'div' : motion.div}
            style={mode === 'scroll' ? { scaleX } : {}}
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                perspective: "1200px",
                animation: mode === 'auto' ? `${crunchAnimation} ${DURATION} ${DELAY} ease-in-out infinite` : 'none',
                ...sx,
            }}
        >
            {[...Array(FOLDS)].map((_, i) => {
                const isOdd = i % 2 !== 0;
                const backgroundPosition = `${(i / (FOLDS - 1)) * 100}%`;

                // Hooks must be called unconditionally if we use them, 
                // but here we are using transforms only for scroll mode.
                // However, useTransform must be called at top level or in a loop but consistently.
                // To keep it clean, we'll define transformations for scroll mode here.

                // Skew: max skew at edges, 0 at center
                const skewY = useTransform(
                    smoothProgress,
                    [0, 0.5, 1],
                    [isOdd ? -SCROLL_SKEW : SCROLL_SKEW, 0, isOdd ? -SCROLL_SKEW : SCROLL_SKEW]
                );

                // Brightness: darker when folded, normal when open
                const brightnessProgress = useTransform(
                    smoothProgress,
                    [0, 0.5, 1],
                    [isOdd ? 0.7 : 1.3, 1, isOdd ? 0.7 : 1.3]
                );

                const filter = useTransform(brightnessProgress, (b) => `brightness(${b})`);

                return (
                    <Box
                        key={i}
                        component={mode === 'auto' ? 'div' : motion.div}
                        style={mode === 'scroll' ? {
                            skewY,
                            filter,
                        } : {}}
                        sx={{
                            flex: 1,
                            backgroundImage: `url(${src})`,
                            backgroundSize: `${FOLDS * 100}% 100%`,
                            backgroundPosition: `${backgroundPosition} center`,
                            backgroundRepeat: "no-repeat",
                            height: "100%",
                            transformOrigin: isOdd ? "left" : "right",
                            borderRadius:
                                i === 0 ? "32px 0 0 32px" :
                                    i === FOLDS - 1 ? "0 32px 32px 0" : "0",
                            zIndex: i === Math.floor(FOLDS / 2) ? 10 : 1,
                            animation: mode === 'auto'
                                ? `${isOdd ? oddFoldAnimation : evenFoldAnimation} ${DURATION} ${DELAY} ease-in-out infinite`
                                : 'none',
                        }}
                    />
                );
            })}
        </Box>
    );
};

export default AccordionFoldImage;
