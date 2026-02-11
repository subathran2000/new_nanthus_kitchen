import type { SxProps, Theme } from '@mui/material';

/**
 * Common button style - Elegant outlined style with orange accent
 * Used for primary CTAs across the site
 */
export const commonButtonStyle: SxProps<Theme> = {
  backgroundColor: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  color: "#F5A623",
  borderRadius: "0px",
  px: { xs: 3, sm: 5, md: 6 },
  py: { xs: 1.5, md: 2 },
  minHeight: { xs: 44, md: "auto" },
  fontWeight: 400,
  textTransform: "uppercase",
  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
  letterSpacing: "0.3em",
  transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  fontFamily: "'Outfit', sans-serif",
  position: "relative",
  overflow: "hidden",
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  "&:hover": {
    borderColor: "#F5A623",
    backgroundColor: "#F5A623",
    color: "#000000",
    boxShadow: "0 0 40px rgba(59, 130, 246, 0.3)",
    transform: "translateY(-4px)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
  "&.Mui-disabled": {
    borderColor: "rgba(255, 255, 255, 0.1)",
    color: "rgba(255, 255, 255, 0.2)",
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
