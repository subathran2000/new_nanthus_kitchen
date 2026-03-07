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
          // Royal Obsidian & Gold Aesthetic
          background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
          color: "#C5A059", // Premium Gold
          border: "1px solid #C5A059",
          borderRadius: "2px", // Sharper, more tailored corners
          px: { xs: 3, sm: 4, md: 5 },
          py: { xs: 1.5, md: 2 },
          fontWeight: 500,
          textTransform: "uppercase",
          fontSize: { xs: "0.75rem", md: "0.85rem" },
          letterSpacing: "0.3em", // Luxury spacing
          fontFamily: "'Outfit', sans-serif",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          whiteSpace: "nowrap",
          transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
          
          "&:hover": {
            background: "#C5A059",
            color: "#000",
            borderColor: "#D4AF37",
            transform: "translateY(-4px)",
            boxShadow: "0 15px 35px rgba(197, 160, 89, 0.3)",
          },
          "&:active": {
            transform: "translateY(-1px)",
          },
        }}
      >
        Order Online
      </Button>
    </motion.div>
  );
};

export default OrderButton;