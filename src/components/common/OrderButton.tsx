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
      transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      style={{ zIndex: 1000 }}
    >
      <Button
        variant="contained"
        onClick={onClick}
        startIcon={<ShoppingCartIcon sx={{ fontSize: { xs: 16, md: 18 } }} />}
        sx={{
          background: "linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)",
          color: "#fff",
          borderRadius: "4px",
          px: { xs: 2.5, sm: 4 },
          py: { xs: 1.25, md: 1.5 },
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: { xs: "0.7rem", md: "0.8rem" },
          letterSpacing: "0.15em",
          boxShadow: "0 4px 20px rgba(255, 140, 0, 0.3)",
          fontFamily: "'Inter', sans-serif",
          border: "none",
          "&:hover": {
            background: "linear-gradient(135deg, #FFB84D 0%, #FF8C00 100%)",
            boxShadow: "0 6px 30px rgba(255, 140, 0, 0.4)",
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Order Online
      </Button>
    </motion.div>
  );
};

export default OrderButton;
