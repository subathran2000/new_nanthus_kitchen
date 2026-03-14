import type { SxProps, Theme } from '@mui/material';

/**
 * Common button style - Primary CTA with logo blue
 * Used for primary CTAs across the site
 */
export const commonButtonStyle: SxProps<Theme> = {
  borderRadius: "8px",
  px: { xs: 4, md: 5 },
  py: { xs: 1.5, md: 1.75 },

  bgcolor: "#2B7DE9",
  border: "1px solid #2B7DE9",
  color: "#fff",

  boxShadow: "0 2px 8px rgba(43, 125, 233, 0.25)",

  fontSize: { xs: "0.8rem", md: "0.85rem" },
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "'Inter', sans-serif",

  transition: "all 0.3s ease",

  "&:hover": {
    bgcolor: "#1B5FB5",
    color: "#fff",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 16px rgba(43, 125, 233, 0.35)",
    borderColor: "#1B5FB5",
  },
  "&:focus-visible": {
    outline: "2px solid #2B7DE9",
    outlineOffset: "2px",
  },
};

/**
 * Secondary button style - Outlined, for less prominent actions
 */
export const secondaryButtonStyle: SxProps<Theme> = {
  backgroundColor: "transparent",
  border: "1px solid #E2E6ED",
  color: "#1A1D23",
  borderRadius: "8px",
  px: { xs: 3, sm: 4, md: 5 },
  py: { xs: 1.25, md: 1.5 },
  minHeight: { xs: 44, md: "auto" },
  fontWeight: 600,
  textTransform: "uppercase",
  fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
  letterSpacing: "0.08em",
  transition: "all 0.3s ease",
  fontFamily: "'Inter', sans-serif",
  "&:hover": {
    borderColor: "#2B7DE9",
    color: "#2B7DE9",
    backgroundColor: "rgba(43, 125, 233, 0.04)",
  },
  "&:focus-visible": {
    outline: "2px solid #2B7DE9",
    outlineOffset: "2px",
  },
};

/**
 * Accent button style - Orange accent for special CTAs
 */
export const accentButtonStyle: SxProps<Theme> = {
  borderRadius: "8px",
  px: { xs: 4, md: 5 },
  py: { xs: 1.5, md: 1.75 },

  bgcolor: "#F5A623",
  border: "1px solid #F5A623",
  color: "#fff",

  boxShadow: "0 2px 8px rgba(245, 166, 35, 0.25)",

  fontSize: { xs: "0.8rem", md: "0.85rem" },
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "'Inter', sans-serif",

  transition: "all 0.3s ease",

  "&:hover": {
    bgcolor: "#D48A0F",
    color: "#fff",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 16px rgba(245, 166, 35, 0.35)",
    borderColor: "#D48A0F",
  },
  "&:focus-visible": {
    outline: "2px solid #F5A623",
    outlineOffset: "2px",
  },
};
