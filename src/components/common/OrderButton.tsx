import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface OrderButtonProps {
    onClick?: () => void;
}

import { Button } from '@mui/material';


const OrderButton: React.FC<OrderButtonProps> = ({ onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
            style={{
                zIndex: 1000,
            }}
        >
            <Button
                variant="contained"
                onClick={onClick}
                startIcon={<ShoppingCartIcon />}
                sx={{
                    bgcolor: '#FF8C00',
                    color: '#001e36',
                    borderRadius: '50px',
                    px: { xs: 3, sm: 5 },
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: { xs: '0.75rem', md: '0.9rem' },
                    letterSpacing: '0.1em',
                    boxShadow: '0 8px 20px rgba(255, 140, 0, 0.3)',
                    '&:hover': {
                        bgcolor: '#e67e00',
                        boxShadow: '0 12px 25px rgba(255, 140, 0, 0.4)',
                        transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    fontFamily: '"Outfit", sans-serif',
                }}
            >
                Order Now
            </Button>
        </motion.div>
    );
};

export default OrderButton;
