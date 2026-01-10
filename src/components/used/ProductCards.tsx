import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components based on provided CSS but adapted for the Theme
const Container = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: '3rem',
    padding: '2rem 0', // Add padding for spacing
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        height: 'auto',
    },
}));

const Card = styled(Box)<{ cardColor: string }>(({ theme, cardColor }) => ({
    position: 'relative',
    padding: '1.5rem',
    width: '350px',
    height: '400px', // Reduced height since buttons are gone

    // Glassmorphism & Theme Styles - DEEP OCEAN THEME
    background: 'rgba(0, 30, 54, 0.6)', // Deep blue transparent (Theme color #001e36)
    backdropFilter: 'blur(12px)',
    border: `1px solid rgba(0, 255, 255, 0.3)`, // Fixed Cyan border
    borderRadius: '1.5rem',
    boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`,

    color: '#ffffff',
    cursor: 'pointer',
    fontFamily: '"Poppins", sans-serif',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy transition

    '&:hover': {
        transform: 'translateY(-10px)',
        // Glow effect with Theme Cyan
        boxShadow: `0 0 30px rgba(0, 255, 255, 0.4), 0 0 10px rgba(0, 255, 255, 0.2)`,
        border: `1px solid #00ffff`,
        background: 'rgba(0, 30, 54, 0.8)',
    },

    '&:hover .product-image': {
        transform: 'translate(-1.5rem, -5rem) rotate(-20deg) scale(1.1)',
        filter: `drop-shadow(0 20px 30px ${cardColor}60)`, // Keep shoe shadow colored? User said "border hover... no other colors". I'll keep shoe shadow as context.
    },

    // Cyan accent line at bottom
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '20%',
        width: '60%',
        height: '2px',
        background: `linear-gradient(90deg, transparent, #00ffff, transparent)`,
        opacity: 0.5,
        transition: 'opacity 0.3s',
    },
    '&:hover::after': {
        opacity: 1,
    }
}));

const ProductImageWrapper = styled(Box)({
    height: '220px',
    width: '100%',
    transform: 'translate(0, 0)',
    transition: 'all 500ms cubic-bezier(0.23, 1, 0.32, 1)',
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
        maxWidth: '100%',
        maxHeight: '100%',
        userSelect: 'none',
        objectFit: 'contain',
    },
});

const ProductInfo = styled(Box)({
    textAlign: 'center',
    marginTop: '1rem',
});

const ProductTitle = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 700,
    fontFamily: '"Poppins", sans-serif',
    letterSpacing: '0.5px',
    color: '#ffffff',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.3)', // Subtle cyan glow
});

const ProductDesc = styled(Typography)({
    margin: '0.5rem 0',
    fontSize: '0.9rem',
    fontWeight: 400,
    fontFamily: '"Poppins", sans-serif',
    color: '#aaccff', // Theme Light Blue
});

const ProductPrice = styled(Typography)<{ priceColor: string }>(({ priceColor }) => ({
    fontSize: '1.4rem',
    fontWeight: 600,
    fontFamily: '"Poppins", sans-serif',
    color: priceColor, // Keep product specific color for price to match shoe
    textShadow: `0 0 10px ${priceColor}80`,
    marginTop: '0.5rem',
}));

export default function ProductCards() {
    return (
        <Container className="container">
            <Card cardColor="#D9A756">
                <ProductImageWrapper className="product-image">
                    <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400" alt="Special Biryani" draggable="false" />
                </ProductImageWrapper>
                <ProductInfo className="product-info">
                    <ProductTitle variant="h5">Nanthu's Biryani</ProductTitle>
                    <ProductDesc>Authentic Malabar style Dum Biryani with secret spices.</ProductDesc>
                </ProductInfo>
            </Card>

            <Card cardColor="#00ffff">
                <ProductImageWrapper className="product-image">
                    <img src="https://images.unsplash.com/photo-1630409351241-e90e7f5e434d?q=80&w=400" alt="Prawn Curry" draggable="false" />
                </ProductImageWrapper>
                <ProductInfo className="product-info">
                    <ProductTitle variant="h5">Malabar Prawns</ProductTitle>
                    <ProductDesc>Fresh prawns simmered in coconut milk and kokum.</ProductDesc>
                </ProductInfo>
            </Card>

            <Card cardColor="#ffffff">
                <ProductImageWrapper className="product-image">
                    <img src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=400" alt="Ghee Roast" draggable="false" />
                </ProductImageWrapper>
                <ProductInfo className="product-info">
                    <ProductTitle variant="h5">Ghee Roast Dosa</ProductTitle>
                    <ProductDesc>Paper-thin crispy dosa served with signature chutneys.</ProductDesc>
                </ProductInfo>
            </Card>
        </Container>
    );
}
