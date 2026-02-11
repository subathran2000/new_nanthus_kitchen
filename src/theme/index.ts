import { createTheme } from "@mui/material/styles";

// Design tokens - Single source of truth for colors
// Based on the New Nanthu's Kitchen logo: blue, golden yellow, white
export const colors = {
  primary: {
    main: "#F5A623",
    light: "#FFD166",
    dark: "#D4880C",
    contrastText: "#0A1628",
  },
  secondary: {
    main: "#3B82F6",
    light: "#60A5FA",
    dark: "#1D4ED8",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#0A1628",
    paper: "rgba(10, 22, 40, 0.95)",
    light: "#0F1D32",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(180, 210, 255, 0.7)",
    disabled: "rgba(180, 210, 255, 0.35)",
  },
  error: {
    main: "#FF6B6B",
  },
  success: {
    main: "#4CAF50",
  },
  divider: "rgba(59, 130, 246, 0.12)",
};

// CSS custom properties for use in CSS files
export const cssVariables = {
  "--color-primary": colors.primary.main,
  "--color-primary-light": colors.primary.light,
  "--color-secondary": colors.secondary.main,
  "--color-background": colors.background.default,
  "--color-background-paper": colors.background.paper,
  "--color-text-primary": colors.text.primary,
  "--color-text-secondary": colors.text.secondary,
};

// Create and export the theme
export const theme = createTheme({
  palette: {
    mode: "dark",
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
      "'Inter', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 900,
      letterSpacing: "0.1em",
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
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
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
      letterSpacing: "0.1em",
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
          borderRadius: 0,
          padding: "12px 32px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        contained: {
          background: `linear-gradient(90deg, ${colors.primary.main}, ${colors.primary.light})`,
          boxShadow: `0 5px 15px rgba(59, 130, 246, 0.3)`,
          "&:hover": {
            boxShadow: `0 8px 25px rgba(59, 130, 246, 0.4)`,
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderColor: "rgba(59, 130, 246, 0.3)",
          color: colors.primary.main,
          backdropFilter: "blur(10px)",
          "&:hover": {
            borderColor: colors.primary.main,
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.03)",
            "& fieldset": {
              borderColor: "rgba(59, 130, 246, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(59, 130, 246, 0.4)",
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary.main,
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.4)",
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
            transform: "scale(1.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(15, 29, 50, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(59, 130, 246, 0.12)",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5)",
        },
      },
    },
  },
});

export default theme;
