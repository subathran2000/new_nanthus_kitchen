import { useRef, useEffect, type FC } from 'react';
import { Box, keyframes } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { motion, useInView, useMotionValue, animate, useTransform, type MotionValue } from 'framer-motion';

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

// Scroll mode: folded when out of view, unfolded when in view
const SCROLL_CRUNCH = 0.5;
const SCROLL_SKEW = 20;

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

const springTransition = { type: "spring" as const, stiffness: 120, damping: 24 };

/**
 * Individual fold strip — extracted so hooks are called at the top level
 * of a component rather than inside a `.map()` loop (Rules of Hooks).
 */
const FoldStrip: FC<{
    index: number;
    src: string;
    mode: 'scroll' | 'auto';
    progress: MotionValue<number>;
}> = ({ index, src, mode, progress }) => {
    const isOdd = index % 2 !== 0;
    const backgroundPosition = `${(index / (FOLDS - 1)) * 100}%`;

    const skewY = useTransform(
        progress,
        [0, 1],
        [isOdd ? -SCROLL_SKEW : SCROLL_SKEW, 0]
    );

    const brightnessProgress = useTransform(
        progress,
        [0, 1],
        [isOdd ? 0.7 : 1.3, 1]
    );

    const filter = useTransform(brightnessProgress, (b: number) => `brightness(${b})`);

    return (
        <Box
            component={mode === 'auto' ? 'div' : motion.div}
            style={mode === 'scroll' ? { skewY, filter } : {}}
            sx={{
                flex: 1,
                backgroundImage: `url(${src})`,
                backgroundSize: `${FOLDS * 100}% 100%`,
                backgroundPosition: `${backgroundPosition} center`,
                backgroundRepeat: "no-repeat",
                height: "100%",
                transformOrigin: isOdd ? "left" : "right",
                borderRadius:
                    index === 0 ? "32px 0 0 32px" :
                        index === FOLDS - 1 ? "0 32px 32px 0" : "0",
                zIndex: index === Math.floor(FOLDS / 2) ? 10 : 1,
                animation: mode === 'auto'
                    ? `${isOdd ? oddFoldAnimation : evenFoldAnimation} ${DURATION} ${DELAY} ease-in-out infinite`
                    : 'none',
            }}
        />
    );
};

/** Indices array created once to avoid re-creating on every render. */
const FOLD_INDICES = Array.from({ length: FOLDS }, (_, i) => i);

const AccordionFoldImage: FC<AccordionFoldImageProps> = ({ src, sx, mode = 'scroll' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Use IntersectionObserver (via useInView) - works with R3F ScrollControls & custom scroll
    const isInView = useInView(containerRef, {
        amount: 0.25, // Unfold when 25% of accordion is visible
        margin: "-50px", // Slight margin so it triggers a bit before fully entering
    });

    // Animated values: folded (0) -> unfolded (1) based on scroll visibility
    const progress = useMotionValue(isInView ? 1 : 0);

    // Sync progress with isInView
    useEffect(() => {
        animate(progress, isInView ? 1 : 0, springTransition);
    }, [isInView, progress]);

    const scaleX = useTransform(progress, [0, 1], [SCROLL_CRUNCH, 1]);

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
            {FOLD_INDICES.map((i) => (
                <FoldStrip
                    key={i}
                    index={i}
                    src={src}
                    mode={mode}
                    progress={progress}
                />
            ))}
        </Box>
    );
};

export default AccordionFoldImage;
