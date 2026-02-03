import type { SxProps, Theme } from "@mui/material";

/**
 * Centralized form input styles used across ContactForm, CateringForm
 * Reduces duplication and ensures consistency
 */
export const formInputStyle: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    background: "rgba(255, 255, 255, 0.03)",
    transition: "all 0.3s ease",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    "& fieldset": {
      borderColor: "rgba(255, 140, 0, 0.15)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 140, 0, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF8C00",
    },
    "& input": {
      color: "#fff",
      padding: "12px 14px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: "0.85rem",
    fontFamily: "'Inter', sans-serif",
    "&.Mui-focused": {
      color: "#FF8C00",
    },
  },
  "& .MuiInputAdornment-root svg": {
    color: "rgba(255, 140, 0, 0.4)",
  },
  "& .Mui-focused .MuiInputAdornment-root svg": {
    color: "#FF8C00",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 1,
    padding: "12px 14px",
  },
};

/**
 * Reusable form submit button style
 */
export const formButtonStyle: SxProps<Theme> = {
  background:
    "linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 200, 100, 0.1))",
  border: "1px solid rgba(255, 140, 0, 0.3)",
  color: "#FF8C00",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  fontSize: "0.9rem",
  borderRadius: "8px",
  py: 1.5,
  transition: "all 0.3s ease",
  "&:hover": {
    background:
      "linear-gradient(135deg, rgba(255, 140, 0, 0.4), rgba(255, 200, 100, 0.2))",
    boxShadow: "0 0 30px rgba(255, 140, 0, 0.5)",
    border: "1px solid rgba(255, 140, 0, 0.6)",
  },
  "&:active": {
    transform: "scale(0.98)",
  },
};

/**
 * Responsive form container style
 */
export const formContainerStyle: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  bgcolor: "transparent",
};

/**
 * Form column style for left visual section
 */
export const formLeftColumnStyle: SxProps<Theme> = {
  flex: 1,
  p: { xs: 4, md: 6 },
  position: "relative",
  display: { xs: "none", md: "flex" },
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  overflow: "hidden",
  minHeight: { xs: "250px", md: "auto" },
};

/**
 * Form column style for right form section
 */
export const formRightColumnStyle: SxProps<Theme> = {
  flex: 1,
  p: { xs: 3, md: 6 },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 3,
};

/**
 * Form title style
 */
export const formTitleStyle: SxProps<Theme> = {
  fontSize: { xs: "1.8rem", md: "2.5rem" },
  fontWeight: 300,
  mb: 2,
  background: "linear-gradient(135deg, #FF8C00, #FFB84D)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/**
 * Form description style
 */
export const formDescriptionStyle: SxProps<Theme> = {
  fontSize: { xs: "0.95rem", md: "1.1rem" },
  color: "rgba(255, 255, 255, 0.7)",
  lineHeight: 1.6,
  mb: 3,
};

/**
 * Success message animation style
 */
export const successMessageStyle: SxProps<Theme> = {
  background: "rgba(76, 175, 80, 0.2)",
  border: "1px solid rgba(76, 175, 80, 0.5)",
  borderRadius: "8px",
  p: 2,
  color: "#4CAF50",
  textAlign: "center",
};
