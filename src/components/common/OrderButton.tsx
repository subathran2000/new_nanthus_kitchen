import React from 'react';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';

interface OrderButtonProps {
  onClick?: () => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
      style={{ zIndex: 1000 }}
    >
      <Button
        variant="contained"
        onClick={onClick}
        startIcon={<ShoppingCartIcon />}
        sx={{
          background: 'linear-gradient(90deg, #FF8C00, #F4511E)',
          color: '#fff',
          borderRadius: '50px',
          px: { xs: 3, sm: 5 },
          py: 1.5,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: { xs: '0.75rem', md: '0.9rem' },
          letterSpacing: '0.2em',
          boxShadow: '0 5px 15px rgba(255, 140, 0, 0.3)',
          '&:hover': {
            filter: 'brightness(1.1)',
            boxShadow: '0 8px 25px rgba(255, 140, 0, 0.4)',
            transform: 'translateY(-2px)',
            background: 'linear-gradient(90deg, #FF8C00, #F4511E)',
          },
          transition: 'all 0.3s ease',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        Order Online
      </Button>
    </motion.div>
  );
};

export default OrderButton;
