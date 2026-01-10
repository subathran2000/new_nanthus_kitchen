import React, { useState } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const cats = {
    'Saffron': {
        name: 'The Golden Thread',
        code: '1591147573177-8fa7f7324c08',
        desc: 'Hand-picked Kashmiri saffron for royal flavors'
    },
    'Cardamom': {
        name: 'Queen of Spices',
        code: '1615485925601-8314032d80bc',
        desc: 'Aromatic green cardamom seeds for a citrusy finish'
    },
    'Curry Leaf': {
        name: 'Heritage Aroma',
        code: '1631522295624-9b883084d5f8',
        desc: 'Tempered in oil to release the soul of South India'
    },
    'Turmeric': {
        name: 'Natural Essence',
        code: '1615484477770-938ee96f4eee',
        desc: 'Earth-born gold with healing and flavorful properties'
    },
    'Black Pepper': {
        name: 'King of Spices',
        code: '1599940824399-b8b1f0a2db0c',
        desc: 'Pure Malabar pepper for a sharp, bold kick'
    },
    'Star Anise': {
        name: 'Exotic Flair',
        code: '1615485246743-34863c04809e',
        desc: 'Licorice-like sweetness for an oriental touch'
    },
    'Clove': {
        name: 'Ancient Spice',
        code: '1615485496464-967b5e85c163',
        desc: 'Pungent and warm, the secret to deep infusions'
    }
};

const entries = Object.entries(cats);
const n = entries.length;
const m = 15;

function rand(max: number, min: number) {
    return +(min + (max - min) * Math.random()).toFixed(2);
}

const angles = entries.map(() => rand(m, -1 * m));

// Styled components to encapsulate the complex CSS logic
const LuminousSection = styled(Box)(({ theme }) => ({
    '--t': '.8s',
    display: 'grid',
    minHeight: '80vh', // increased height
    placeContent: 'center',
    background: 'transparent',
    color: '#f1f5f9',
    fontFamily: "'Poppins', sans-serif",
    overflow: 'visible',
    position: 'relative',
    perspective: '1000px',
}));

const LuminousContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridGap: '2em 6em',
    gridTemplate: 'repeat(2, max-content) 1fr max-content/ max-content 1fr',
    counterReset: 'k calc(1 + var(--k)) n var(--n)',
    transition: '--p 0s var(--t), --v var(--t)',
    width: '100%',
    maxWidth: '80vw', // Use viewport width for maximum impact
    position: 'relative',

    '&::before': {
        gridArea: '1/ 2',
        width: '3ch',
        textAlign: 'right',
        content: "counter(k) '/' counter(n)",
        color: '#00ffff',
        fontFamily: 'inherit',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
    },
}));

const CardArticle = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridArea: '1/ 1/ -1/ -1',
    gridTemplate: 'subgrid/ subgrid',
    position: 'relative',
    transition: 'z-index var(--t) cubic-bezier(1, -.9, 0, 1.9)',

    '--abs-top': 'max(var(--k) - var(--i), var(--i) - var(--k))',
    '--not-top': 'min(1, var(--abs-top))',
    '--top': 'calc(1 - var(--not-top))',

    '--val-mov': '((1 - var(--fwd))*var(--p) + var(--fwd)*var(--k) - var(--i))',
    '--abs-mov': 'max(var(--val-mov), -1*var(--val-mov))',
    '--not-mov': 'min(1, var(--abs-mov))',
    '--mov': 'calc(1 - var(--not-mov))',
}));

const CardImage = styled('img')({
    '--sin': 'sin(var(--prg)*.5turn)',
    gridArea: '1/ 1/ -1',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)',
    height: '40em', // Significantly increased height
    aspectRatio: '0.75', // Slightly tall portrait
    objectFit: 'cover',
    borderRadius: '1em',
    translate: 'calc(-150%*var(--mov)*sqrt(var(--sin)))',
    rotate: 'calc((1 - var(--sin))*var(--a))',
    width: '100%',
    maxWidth: '600px', // Allow it to be quite wide
});

const CardTitle = styled(Typography)({
    gridArea: '2/ 2',
    margin: 0,
    translate: '0 calc(var(--not-top)*1lh)',
    opacity: 'var(--top)',
    transition: '.5*var(--t) calc(var(--top)*.5*var(--t))',
    transitionProperty: 'translate, opacity',

    // Aesthetic updates
    fontSize: '3.5rem !important',
    fontWeight: '700 !important',
    color: '#fff',
    textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
    lineHeight: '1.1',
    marginBottom: '0.5rem !important',
});

const CardDesc = styled(Typography)({
    gridArea: '3/ 2',
    color: '#aaccff', // Light blue
    fontStyle: 'normal',
    fontSize: '1.2rem',
    translate: '0 calc(var(--not-top)*1lh)',
    opacity: 'var(--top)',
    transition: '.5*var(--t) calc(var(--top)*.5*var(--t))',
    transitionProperty: 'translate, opacity',
    maxWidth: '400px',
});

export default function LuminousCard() {
    const [k, setK] = useState(0);

    const handleNext = () => {
        setK((prev) => (prev + 1) % n);
    };

    const handlePrev = () => {
        setK((prev) => (prev - 1 + n) % n);
    };

    // Auto-transition effect
    React.useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 4000); // 4 seconds interval

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>
                {`
                @property --p {
                    syntax: '<number>';
                    initial-value: 0;
                    inherits: true;
                }
                @property --v {
                    syntax: '<number>';
                    initial-value: 0;
                    inherits: true;
                }
                `}
            </style>
            <LuminousSection>
                <LuminousContainer
                    style={{
                        '--n': n,
                        '--k': k,
                        // Math logic ported from CSS:
                        '--p': 'var(--k)',
                        '--abs-p': 'max(var(--k) - var(--p), var(--p) - var(--k))',
                        '--end': 'clamp(0, var(--abs-p) - 1, 1)',
                        '--diff': 'calc(var(--k) - var(--p))',
                        // Clamping large numbers to 1 or -1 for sign
                        '--sign-diff': 'clamp(-1, var(--diff) * 10000, 1)',
                        '--dir': 'calc((1 - 2*var(--end)) * var(--sign-diff))',
                        '--fwd': 'calc(.5*(1 + var(--dir)))',
                        '--v': 'var(--k)',
                        '--abs-v': 'max(var(--v) - var(--p), var(--p) - var(--v))',
                        '--prg': 'calc(var(--abs-v)/(1 - var(--end) + var(--end)*(var(--n) - 1)))'
                    } as React.CSSProperties}
                >
                    {entries.map(([key, val], i) => {
                        // JS Calculation for z-index to ensure correct stacking
                        let diff = (i - k) % n;
                        if (diff < 0) diff += n;
                        // To show current on top, and others behind. 
                        // If i == k, zIndex should be max.
                        // We want the stack to look like:
                        // k (top), k+1 (under), k+2 (under)... 
                        // So z-index should decrease as we move away from k?
                        // Actually, the original CSS logic was: 
                        // z-index: mod(calc(var(--n) - 1 + var(--i) - var(--k)), var(--n));
                        // Let's replicate EXACTLY that.
                        const zIndex = (n - 1 + i - k + 2 * n) % n;

                        return (
                            <CardArticle
                                key={key}
                                style={{
                                    '--i': i,
                                    '--a': `${angles[i]}deg`,
                                    zIndex: zIndex
                                } as React.CSSProperties}
                            >
                                <CardTitle variant="h4" component="h2">
                                    {key}
                                </CardTitle>
                                <CardDesc variant="body1" component="em">
                                    {val.name}
                                </CardDesc>
                                <CardImage
                                    src={`https://images.unsplash.com/photo-${val.code}?w=400`}
                                    alt={val.desc}
                                />
                            </CardArticle>
                        );
                    })}

                    <Box sx={{
                        display: 'flex',
                        gap: '2em',
                        gridArea: '4/ 2',
                        zIndex: 100,
                        pointerEvents: 'auto',
                        position: 'relative',
                        marginTop: '40px'
                    }}>
                        <IconButton
                            onClick={handlePrev}
                            aria-label="previous"
                            sx={{
                                width: '70px',
                                height: '70px',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backgroundColor: 'rgba(0, 30, 54, 0.6)', // Dark blue transparent
                                color: '#00ffff', // Cyan icon
                                backdropFilter: 'blur(5px)',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <ArrowBackIosNewIcon fontSize="large" />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            aria-label="next"
                            sx={{
                                width: '70px',
                                height: '70px',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backgroundColor: 'rgba(0, 30, 54, 0.6)',
                                color: '#00ffff',
                                backdropFilter: 'blur(5px)',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <ArrowForwardIosIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </LuminousContainer>
            </LuminousSection>
        </>
    );
}
