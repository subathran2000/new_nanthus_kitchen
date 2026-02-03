import type { SxProps, Theme } from '@mui/material';

/**
 * Common button style - Elegant outlined style with orange accent
 * Used for primary CTAs across the site
 */
export const commonButtonStyle: SxProps<Theme> = {
  backgroundColor: "rgba(0,30,54,0.3)",
  border: "1px solid rgba(255, 140, 0, 0.4)",
  color: "#FF8C00",
  borderRadius: "4px",
  px: { xs: 4, sm: 6 },
  py: { xs: 1.5, md: 2 },
  fontWeight: 500,
  textTransform: "uppercase",
  fontSize: { xs: "0.75rem", md: "0.875rem" },
  letterSpacing: "0.2em",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  fontFamily: "'Inter', sans-serif",
  position: "relative",
  overflow: "hidden",
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  "&:hover": {
    borderColor: "#FF8C00",
    backgroundColor: "rgba(255, 140, 0, 0.15)",
    color: "#FFB84D",
    boxShadow: "0 0 30px rgba(255, 140, 0, 0.3)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
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
    backgroundColor: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '4px',
    px: { xs: 3, sm: 5 },
    py: { xs: 1.25, md: 1.75 },
    fontWeight: 400,
    textTransform: 'uppercase',
    fontSize: { xs: '0.7rem', md: '0.8rem' },
    letterSpacing: '0.15em',
    transition: 'all 0.3s ease',
    fontFamily: "'Inter', sans-serif",
    '&:hover': {
        borderColor: 'rgba(255, 255, 255, 0.4)',
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
};
