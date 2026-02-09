import { IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

const navButtonSx = {
  position: "fixed" as const,
  top: { xs: "20px", md: "30px" },
  bgcolor: "rgba(255, 140, 0, 0.15)",
  border: "2px solid rgba(255, 140, 0, 0.4)",
  color: "#FF8C00",
  width: { xs: "48px", md: "56px" },
  height: { xs: "48px", md: "56px" },
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  // Perfect circle buttons
  borderRadius: "50%",
  boxShadow:
    "0 8px 32px rgba(255, 140, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  zIndex: 2000,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    bgcolor: "rgba(255, 140, 0, 0.25)",
    transform: "scale(1.08) translateY(-2px)",
    boxShadow:
      "0 12px 40px rgba(255, 140, 0, 0.4), 0 0 20px rgba(255, 140, 0, 0.3)",
    borderColor: "rgba(255, 140, 0, 0.6)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
};

const iconSx = { fontSize: { xs: "24px", md: "28px" } };

export interface NavButtonsProps {
  onHome?: () => void;
  onBack?: () => void;
}

/**
 * Shared Home and Back navigation buttons. Renders only the buttons whose handlers are provided.
 */
export default function NavButtons({ onHome, onBack }: NavButtonsProps) {
  return (
    <>
      {onBack != null && (
        <IconButton
          onClick={onBack}
          aria-label="Back"
          sx={{ ...navButtonSx, left: { xs: "16px", md: "32px" } }}
        >
          <ArrowBack sx={iconSx} />
        </IconButton>
      )}
      {onHome != null && (
        <IconButton
          onClick={onHome}
          aria-label="Go to home page"
          sx={{ ...navButtonSx, right: { xs: "16px", md: "32px" } }}
        >
          <HomeIcon sx={iconSx} />
        </IconButton>
      )}
    </>
  );
}
