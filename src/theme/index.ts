import { createTheme } from "@mui/material/styles";

// Design tokens - Single source of truth for colors
// Based on the New Nanthu's Kitchen logo: Blue, Orange, White, Black
export const colors = {
  primary: {
    main: "#2B7DE9",       // Logo Blue
    light: "#5B9DF0",      // Lighter Blue
    dark: "#1B5FB5",       // Deeper Blue
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#F5A623",       // Logo Orange
    light: "#FFB84D",      // Lighter Orange
    dark: "#D48A0F",       // Deeper Orange
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#FFFFFF",    // Clean White
    paper: "#F5F7FA",      // Soft Gray
    light: "#EEF1F6",      // Subtle Gray (for alternating sections)
  },
  text: {
    primary: "#1A1D23",    // Near-black for body text
    secondary: "#5A6177",  // Medium gray for secondary text
    disabled: "#A0A8B8",   // Muted gray
  },
  error: {
    main: "#E53E3E",
  },
  success: {
    main: "#38A169",
  },
  divider: "#E2E6ED",
};

// Create and export the theme
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: colors.primary,
    secondary: colors.secondary,
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: colors.text,
    error: colors.error,
    success: colors.success,
    divider: colors.divider,
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "12px 32px",
          transition: "all 0.3s ease",
          fontWeight: 600,
        },
        contained: {
          backgroundColor: colors.primary.main,
          color: "#fff",
          boxShadow: "0 2px 8px rgba(43, 125, 233, 0.25)",
          "&:hover": {
            backgroundColor: colors.primary.dark,
            boxShadow: "0 4px 16px rgba(43, 125, 233, 0.35)",
            transform: "translateY(-1px)",
          },
          "&:focus-visible": {
            outline: `2px solid ${colors.primary.main}`,
            outlineOffset: "2px",
          },
        },
        outlined: {
          borderColor: colors.primary.main,
          color: colors.primary.main,
          "&:hover": {
            borderColor: colors.primary.dark,
            backgroundColor: "rgba(43, 125, 233, 0.04)",
          },
          "&:focus-visible": {
            outline: `2px solid ${colors.primary.main}`,
            outlineOffset: "2px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            background: colors.background.paper,
            "& fieldset": {
              borderColor: colors.divider,
            },
            "&:hover fieldset": {
              borderColor: colors.primary.light,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary.main,
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.text.secondary,
            "&.Mui-focused": {
              color: colors.primary.main,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:focus-visible": {
            outline: `2px solid ${colors.primary.main}`,
            outlineOffset: "2px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          border: `1px solid ${colors.divider}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
        },
      },
    },
  },
});

export default theme;
