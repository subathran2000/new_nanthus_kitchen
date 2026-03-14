import { IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

const navButtonSx = {
  position: "fixed" as const,
  top: { xs: "20px", md: "30px" },
  bgcolor: "#FFFFFF",
  border: "1px solid #E2E6ED",
  color: "#1A1D23",
  width: { xs: "48px", md: "56px" },
  height: { xs: "48px", md: "56px" },
  borderRadius: "50%",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
  zIndex: 2000,
  transition: "all 0.3s ease",

  "&:hover": {
    bgcolor: "#2B7DE9",
    color: "#fff",
    borderColor: "#2B7DE9",
    transform: "scale(1.05)",
    boxShadow: "0 4px 16px rgba(43, 125, 233, 0.25)",
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
