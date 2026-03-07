import { IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

const navButtonSx = {
  position: "fixed" as const,
  top: { xs: "20px", md: "30px" },
  bgcolor: "rgba(0, 0, 0, 0.7)", // Darker for premium feel
  border: "1px solid rgba(197, 160, 89, 0.4)", // Muted gold border
  color: "#C5A059", // Gold icons
  width: { xs: "48px", md: "56px" },
  height: { xs: "48px", md: "56px" },
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "50%",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  zIndex: 2000,
  transition: "all 0.4s ease",
  
  "&:hover": {
    bgcolor: "#C5A059",
    color: "#000",
    transform: "scale(1.1) rotate(5deg)", // Added a slight elegant rotation
    boxShadow: "0 0 25px rgba(197, 160, 89, 0.4)",
    borderColor: "#D4AF37",
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
