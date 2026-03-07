import type { SxProps, Theme } from '@mui/material';

/**
 * Common button style - Elegant outlined style with orange accent
 * Used for primary CTAs across the site
 */
export const commonButtonStyle: SxProps<Theme> = {
  // Keep the rectangular shape from the original design
  borderRadius: "4px", 
  px: { xs: 4, md: 6 },
  py: { xs: 1.5, md: 2 },
  
  // Apply the "Royal" colors from the navButton design
  bgcolor: "rgba(0, 0, 0, 0.7)", 
  border: "1px solid #C5A059", // Premium Gold border
  color: "#C5A059", // Gold text
  
  // Luxury effects from your navButton code
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  
  // Typography
  fontSize: { xs: "0.75rem", md: "0.85rem" },
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.3em",
  fontFamily: "'Outfit', sans-serif",

  transition: "all 0.4s ease",

  "&:hover": {
    bgcolor: "#C5A059", // Flip colors on hover
    color: "#000",
    transform: "translateY(-4px)", // Premium lift effect
    boxShadow: "0 0 25px rgba(197, 160, 89, 0.4)",
    borderColor: "#D4AF37",
  },
};

/**
 * Secondary button style - More subtle, for less prominent actions
 */
export const secondaryButtonStyle: SxProps<Theme> = {
  backgroundColor: "transparent",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "rgba(255, 255, 255, 0.7)",
  borderRadius: "4px",
  px: { xs: 3, sm: 4, md: 5 },
  py: { xs: 1.25, md: 1.75 },
  minHeight: { xs: 44, md: "auto" },
  fontWeight: 400,
  textTransform: "uppercase",
  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
  letterSpacing: "0.15em",
  transition: "all 0.3s ease",
  fontFamily: "'Inter', sans-serif",
  "&:hover": {
    borderColor: "rgba(255, 255, 255, 0.4)",
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
};
