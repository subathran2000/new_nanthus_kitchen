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
          background: "#2B7DE9",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          px: { xs: 3, sm: 4, md: 5 },
          py: { xs: 1.25, md: 1.5 },
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: { xs: "0.75rem", md: "0.85rem" },
          letterSpacing: "0.1em",
          fontFamily: "'Inter', sans-serif",
          boxShadow: "0 2px 8px rgba(43, 125, 233, 0.3)",
          whiteSpace: "nowrap",
          transition: "all 0.3s ease",

          "&:hover": {
            background: "#1B5FB5",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 16px rgba(43, 125, 233, 0.4)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        }}
      >
        Order Online
      </Button>
    </motion.div>
  );
};

export default OrderButton;
